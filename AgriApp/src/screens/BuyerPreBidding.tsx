import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
  owner?: string; // owner phone extracted from key
};

type Bid = {
  lotId: string;
  lotOwner?: string;
  bidder: string | null;
  bidValue: string;
  createdAt: number;
};

export default function BuyerPreBidding() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bidValues, setBidValues] = useState<Record<string, string>>({}); // lotId -> current input
  const [placing, setPlacing] = useState<Record<string, boolean>>({}); // lotId -> bool

  useEffect(() => {
    loadAllRegisteredLots();
  }, []);

  // Load all REGISTERED_LOTS_<phone> keys and flatten
  const loadAllRegisteredLots = async () => {
    setLoading(true);
    try {
      const keys = await AsyncStorage.getAllKeys();
      const lotKeys = keys.filter((k) => k.startsWith('REGISTERED_LOTS_'));
      if (lotKeys.length === 0) {
        setLots([]);
        setLoading(false);
        return;
      }
      const pairs = await AsyncStorage.multiGet(lotKeys);
      const aggregated: Lot[] = [];
      pairs.forEach(([key, json]) => {
        try {
          if (!json) return;
          const parsed: Lot[] = JSON.parse(json);
          const owner = key.replace('REGISTERED_LOTS_', '');
          parsed.forEach((l) => {
            aggregated.push({ ...l, owner });
          });
        } catch (err) {
          console.warn('Failed parse registered lots for key', key, err);
        }
      });
      // Sort newest first by createdAt (optional)
      aggregated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setLots(aggregated);
    } catch (err) {
      console.error('loadAllRegisteredLots error', err);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Failed to load lots');
    } finally {
      setLoading(false);
    }
  };

  const onChangeBidValue = (lotId: string, text: string) => {
    // allow only numeric values and decimals
    const cleaned = text.replace(/[^0-9.]/g, '');
    setBidValues((s) => ({ ...s, [lotId]: cleaned }));
  };

  const placeBid = async (lot: Lot) => {
    const value = (bidValues[lot.id] || '').trim();
    if (!value) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_bid_value') ?? 'Please enter a bid value');
      return;
    }
    // simple numeric check
    if (isNaN(Number(value))) {
      Alert.alert(t('error_title') ?? 'Error', t('invalid_bid') ?? 'Please enter a valid number');
      return;
    }

    setPlacing((s) => ({ ...s, [lot.id]: true }));

    try {
      const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
      if (!bidder) {
        Alert.alert(t('error_title') ?? 'Error', 'Please login to place a bid');
        return;
      }

      const bid: Bid = {
        lotId: lot.id,
        lotOwner: lot.owner,
        bidder,
        bidValue: value,
        createdAt: Date.now(),
      };

      // store bids per lot: key BIDS_LOT_<lotId> => JSON array
      const bidKey = `BIDS_LOT_${lot.id}`;
      const existing = await AsyncStorage.getItem(bidKey);
      let arr: Bid[] = [];
      if (existing) {
        try {
          arr = JSON.parse(existing);
          if (!Array.isArray(arr)) arr = [];
        } catch {
          arr = [];
        }
      }
      arr.unshift(bid);
      await AsyncStorage.setItem(bidKey, JSON.stringify(arr));

      // also store quick lookup per buyer (optional) under BIDS_BY_BUYER_<buyerPhone>
      const buyerKey = `BIDS_BY_BUYER_${bidder}`;
      try {
        const existingByBuyer = await AsyncStorage.getItem(buyerKey);
        let byBuyer: Bid[] = existingByBuyer ? JSON.parse(existingByBuyer) : [];
        byBuyer.unshift(bid);
        await AsyncStorage.setItem(buyerKey, JSON.stringify(byBuyer));
      } catch (err) {
        // non-fatal
      }

      Alert.alert(t('success_title') ?? 'Success', t('bid_placed') ?? 'Your bid has been placed');
      // clear input for the lot
      setBidValues((s) => ({ ...s, [lot.id]: '' }));
    } catch (err) {
      console.error('placeBid error', err);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Failed to place bid');
    } finally {
      setPlacing((s) => ({ ...s, [lot.id]: false }));
    }
  };

  const renderLot = ({ item }: { item: Lot }) => {
    return (
      <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: '#ccc' }]}>
        <View style={styles.lotRow}>
          <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} — {item.grade}</Text>
          <Text style={[styles.small, { color: theme.text }]}>Owner: {item.owner ?? 'unknown'}</Text>
        </View>

        <View style={styles.lotDetails}>
          <Text style={[styles.detailText, { color: theme.text }]}>Quantity: <Text style={{ fontWeight: '700' }}>{item.quantity}</Text></Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Mandi: <Text style={{ fontWeight: '700' }}>{item.mandi}</Text></Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Auction Date: <Text style={{ fontWeight: '700' }}>{item.expectedArrival}</Text></Text>
        </View>

        <View style={styles.bidRow}>
          <TextInput
            value={bidValues[item.id] || ''}
            onChangeText={(t) => onChangeBidValue(item.id, t)}
            placeholder={t('enter_bid_value') ?? 'Enter your bid value'}
            placeholderTextColor={theme.placeholder ?? '#999'}
            keyboardType="numeric"
            style={[styles.bidInput, { color: theme.text, borderColor: theme.text }]}
          />
          <TouchableOpacity
            onPress={() => placeBid(item)}
            style={[styles.placeBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]}
            disabled={!!placing[item.id]}
          >
            {placing[item.id] ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.placeBtnText]}>{t('place_bid') ?? 'Place Bid'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          data={lots}
          keyExtractor={(i) => i.id}
          renderItem={renderLot}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={{ color: theme.text }}>{t('no_lots_available') ?? 'No pre-registered lots available at the moment'}</Text>
            </View>
          }
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  lotCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  lotRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  lotTitle: { fontSize: 16, fontWeight: '700' },
  small: { fontSize: 12 },

  lotDetails: { marginBottom: 10 },
  detailText: { fontSize: 14, marginBottom: 4 },

  bidRow: { flexDirection: 'row', alignItems: 'center' },
  bidInput: { flex: 1, borderWidth: 1, borderRadius: 6, padding: 10, marginRight: 8 },
  placeBtn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  placeBtnText: { color: '#fff', fontWeight: '700' },

  emptyBox: { padding: 18, alignItems: 'center', justifyContent: 'center' },
});

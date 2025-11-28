import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
};

export default function PreRegisterLot() {
  const navigation = useNavigation<PropsNav>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [crop, setCrop] = useState('');
  const [grade, setGrade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mandi, setMandi] = useState('');
  const [expectedArrival, setExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  const STORAGE_KEY = (p: string) => `REGISTERED_LOTS_${p}`;

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
      setPhone(p);
      if (p) {
        AsyncStorage.getItem(STORAGE_KEY(p)).then((j) => {
          if (j) {
            try {
              setLots(JSON.parse(j));
            } catch (e) {
              console.warn('Failed parse lots', e);
            }
          }
        });
      }
    });
  }, []);

  const saveLotsToStorage = async (newLots: Lot[]) => {
    if (!phone) return;
    await AsyncStorage.setItem(STORAGE_KEY(phone), JSON.stringify(newLots));
  };

  const validateAndAdd = async () => {
    if (!crop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
    if (!quantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
    if (!mandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');
    // expectedArrival optional, but if provided basic format check could be added

    const newLot: Lot = {
      id: `${Date.now()}`,
      crop,
      grade: grade || '-',
      quantity,
      mandi,
      expectedArrival: expectedArrival || '-',
      createdAt: Date.now(),
    };

    const newLots = [newLot, ...lots];
    setLots(newLots);
    await saveLotsToStorage(newLots);

    // clear inputs
    setCrop('');
    setGrade('');
    setQuantity('');
    setMandi('');
    setExpectedArrival('');

    Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added');
  };

  const removeLot = async (id: string) => {
    const filtered = lots.filter((l) => l.id !== id);
    setLots(filtered);
    if (phone) await AsyncStorage.setItem(STORAGE_KEY(phone), JSON.stringify(filtered));
  };

  const goBack = () => navigation.navigate('Dashboard' as any);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title')}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>{t('pre_register_subtitle')}</Text>

        <View style={[styles.formBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
          <TextInput
            placeholder={t('select_crop') ?? 'select crop'}
            placeholderTextColor={theme.text ?? '#999'}
            value={crop}
            onChangeText={setCrop}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          />

          <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
          <TextInput
            placeholder={t('select_grade') ?? 'select grade'}
            placeholderTextColor={theme.text ?? '#999'}
            value={grade}
            onChangeText={setGrade}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          />

          <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
          <TextInput
            placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
            placeholderTextColor={theme.text}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label')}</Text>
              <TextInput
                placeholder={t('select_mandi') ?? 'select mandi'}
                placeholderTextColor={theme.text}
                value={mandi}
                onChangeText={setMandi}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.text }]}>{t('arrival_label')}</Text>
              <TextInput
                placeholder={t('enter_date') ?? 'dd-mm-yy'}
                placeholderTextColor={theme.text}
                value={expectedArrival}
                onChangeText={setExpectedArrival}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={validateAndAdd}>
            <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot')}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 12 }} />

        <Text style={[styles.title, { color: theme.text }]}>{t('your_registered_lots')}</Text>

        {lots.length === 0 ? (
          <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
            <Text style={{ color: theme.text }}>{t('no_lots')}</Text>
          </View>
        ) : (
          <FlatList
            data={lots}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.lotItem, { borderColor: '#ccc', backgroundColor: theme.background }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('crop')}: </Text>{item.crop}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('grade_label')}: </Text>{item.grade}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('quantity_label')}: </Text>{item.quantity}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('mandi_label')}: </Text>{item.mandi}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
                </View>

                <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 13, marginBottom: 12 },

  formBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
  label: { fontSize: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },

  addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  addBtnText: { fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },

  lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
  lotText: { marginBottom: 6 },

  removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
  removeBtnText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row' },
});

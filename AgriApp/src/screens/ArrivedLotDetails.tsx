// src/screens/ArrivedLotDetails.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type RouteParams = RouteProp<RootStackParamList, 'ArrivedLotDetails'>;

export default function ArrivedLotDetails() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const arrivedLotId = (route.params as any)?.arrivedLotId;

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      if (!arrivedLotId) {
        Alert.alert(t('error_title') ?? 'Error', t('missing_id') ?? 'Missing arrived lot id');
        navigation.goBack();
        return;
      }
      setLoading(true);
      try {
        const res = await api.get(`/mandiOfficialAuction/mandi/arrivedLots/${arrivedLotId}`);
        if (res.status >= 200 && res.status < 300) {
          setDetail(res.data);
        } else {
          throw new Error(res.data?.message ?? `Status ${res.status}`);
        }
      } catch (err: any) {
        console.log('arrived lot details error', err?.response?.data ?? err?.message ?? err);
        Alert.alert(t('error_title') ?? 'Error', t('fetch_arrived_lot_failed') ?? 'Failed to fetch arrived lot details');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [arrivedLotId, navigation, t]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8, color: theme.text }}>{t('loading') ?? 'Loading...'}</Text>
      </SafeAreaView>
    );
  }

  if (!detail) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>{t('no_details') ?? 'No details available'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 8 }}>
          <Text style={{ color: theme.primary ?? '#2b6cb0', fontWeight: '700' }}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('arrived_lot_details') ?? 'Arrived Lot Details'}</Text>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('lot_id') ?? 'Lot ID'}</Text>
          <Text style={{ color: theme.text }}>{detail.arrivedLotId ?? detail.ArrivedLotId ?? '-'}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
          <Text style={{ color: theme.text }}>{detail.cropName ?? detail.CropName ?? '-'}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
          <Text style={{ color: theme.text }}>{detail.grade ?? detail.Grade ?? '-'}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label') ?? 'Quantity'}</Text>
          <Text style={{ color: theme.text }}>{String(detail.quantity ?? detail.Quantity ?? '-')}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi'}</Text>
          <Text style={{ color: theme.text }}>{detail.mandiName ?? detail.MandiName ?? '-'}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('owner') ?? 'Owner'}</Text>
          <Text style={{ color: theme.text }}>{detail.lotOwnerName ?? detail.LotOwnerName ?? '-'}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('mobile') ?? 'Mobile'}</Text>
          <Text style={{ color: theme.text }}>{detail.mobileNum ?? detail.MobileNum ?? '-'}</Text>
        </View>

        <View style={[styles.row, { borderColor: theme.text }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('status') ?? 'Status'}</Text>
          <Text style={{ color: theme.text }}>{detail.status ?? detail.Status ?? '-'}</Text>
        </View>

        {detail.qrCodeUrl ? (
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: theme.text, fontWeight: '700' }}>{t('qr_code') ?? 'QR Code'}</Text>
            <Text style={{ color: theme.text }}>{detail.qrCodeUrl}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  row: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  label: { fontWeight: '700', marginBottom: 6 },
});

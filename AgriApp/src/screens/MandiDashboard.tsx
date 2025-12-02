import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import GraphChart from '../components/GraphChart';

type Auction = {
  date: string;
  time: string;
  crop: string;
  lots: number;
  status: 'Completed' | 'Scheduled';
};

const mockAuctionSchedule: Auction[] = [
  { date: '2025-11-10', time: '09:00 AM', crop: 'Onion', lots: 25, status: 'Completed' },
  { date: '2025-11-11', time: '09:00 AM', crop: 'Potato', lots: 30, status: 'Completed' },
  { date: '2025-11-12', time: '09:00 AM', crop: 'Tomato', lots: 18, status: 'Scheduled' },
  { date: '2025-11-13', time: '09:00 AM', crop: 'Wheat', lots: 40, status: 'Scheduled' },
];

const mockCropQuantity = [
  { crop: 'Onion', quantity: 2500 },
  { crop: 'Potato', quantity: 3200 },
  { crop: 'Tomato', quantity: 1800 },
  { crop: 'Wheat', quantity: 4500 },
  { crop: 'Rice', quantity: 3800 },
];

const distribution = [
  { name: 'Onion', value: 2500, color: '#10b981' },
  { name: 'Potato', value: 3200, color: '#3b82f6' },
  { name: 'Tomato', value: 1800, color: '#ef4444' },
  { name: 'Wheat', value: 4500, color: '#f59e0b' },
  { name: 'Rice', value: 3800, color: '#8b5cf6' },
];

export default function MandiDashboard({ navigation }: any) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const totalQuantity = useMemo(() => mockCropQuantity.reduce((s, i) => s + i.quantity, 0), []);
  const totalFarmers = 1248; // sample
  const buyersCount = 456;
  const todaysPrice = 12;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.smallBtn, { borderColor: theme.text,backgroundColor: theme.primary }]}>
            <Text style={{ color: theme.text }}>{t('back') ?? 'Back'}</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.title, { color: theme.primary }]}>{t('mandiDashboard') ?? 'Mandi Dashboard'}</Text>
            <Text style={[styles.sub, { color: theme.text }]}>{t('delhiAzadpurMandi') ?? 'Azadpur Mandi, Delhi'}</Text>
          </View>

          <View style={{ width: 48 }} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.text }]}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{t('totalFarmers') ?? 'Total Farmers'}</Text>
            <Text style={[styles.cardValue, { color: theme.primary }]}>{totalFarmers}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.text }]}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{t('quantity') ?? 'Quantity'}</Text>
            <Text style={[styles.cardValue, { color: theme.primary }]}>{totalQuantity} Q</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.text }]}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{t('todaysPrice') ?? "Today's Price"}</Text>
            <Text style={[styles.cardValue, { color: theme.primary }]}>{todaysPrice}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.text }]}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{t('buyer') ?? 'Buyers'}</Text>
            <Text style={[styles.cardValue, { color: theme.primary }]}>{buyersCount}</Text>
          </View>
        </View>

        {/* Charts */}
        <View style={[styles.panel, { borderColor: theme.text }]}>
          <Text style={[styles.panelTitle, { color: theme.text }]}>{t('quantity') ?? 'Quantity'}</Text>
          {/* Reuse GraphChart if it supports a generic bar chart by passing filters or a mode */}
          <View style={{ height: 220, marginTop: 10 }}>
          <GraphChart filters={{}} />
            {/* If GraphChart does not accept props like smallMode/data, replace with your actual chart component */}
          </View>
        </View>

        {/* Distribution (simple visual) */}
        <View style={[styles.panel, { borderColor: theme.text }]}>
          <Text style={[styles.panelTitle, { color: theme.text }]}>{t('analytics') ?? 'Analytics'}</Text>
          <View style={{ marginTop: 12 }}>
            {distribution.map((d) => {
              const pct = Math.round((d.value / totalQuantity) * 100);
              return (
                <View key={d.name} style={styles.distRow}>
                  <View style={[styles.colorBox, { backgroundColor: d.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: '600' }}>{d.name}</Text>
                    <Text style={{ color: theme.text, fontSize: 12 }}>{d.value} Q • {pct}%</Text>
                  </View>
                  <View style={{ width: 60, alignItems: 'flex-end' }}>
                    <Text style={{ color: theme.text }}>{pct}%</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Farmer Contributions (simple list) */}
        <View style={[styles.panel, { borderColor: theme.text }]}>
          <Text style={[styles.panelTitle, { color: theme.text }]}>{t('networkFarmers') ?? 'Network Farmers'}</Text>
          <FlatList
            data={[
              { name: 'Ramesh Kumar', qty: 150 },
              { name: 'Suresh Patil', qty: 200 },
              { name: 'Vijay Singh', qty: 180 },
              { name: 'Prakash Rao', qty: 220 },
            ]}
            keyExtractor={(i) => i.name}
            renderItem={({ item }) => (
              <View style={styles.listRow}>
                <View>
                  <Text style={{ color: theme.text }}>{item.name}</Text>
                  <Text style={{ color: theme.text, fontSize: 12 }}>{item.qty} Q</Text>
                </View>
                <Text style={{ color: theme.text }}>{/* Placeholder for sparkline or percent */}</Text>
              </View>
            )}
          />
        </View>

        {/* Auction Schedule */}
        <View style={[styles.panel, { borderColor: theme.text }]}>
          <Text style={[styles.panelTitle, { color: theme.text }]}>{t('auctionDate') ?? 'Auction Schedule'}</Text>
          <View style={{ marginTop: 12 }}>
            {mockAuctionSchedule.map((a, idx) => (
              <View key={idx} style={[styles.auctionRow, { borderColor: theme.text }]}>
                <View>
                  <Text style={{ color: theme.text, fontWeight: '600' }}>{a.crop}</Text>
                  <Text style={{ color: theme.text, fontSize: 12 }}>{new Date(a.date).toLocaleDateString()} • {a.time}</Text>
                  <Text style={{ color: theme.text, fontSize: 12 }}>{a.lots} {t('lot')}</Text>
                </View>
                <View>
                  <Text style={[styles.badge, a.status === 'Completed' ? styles.badgeSuccess : styles.badgeInfo]}>
                    {a.status === 'Completed' ? t('approved') ?? 'Completed' : t('pending') ?? 'Scheduled'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* // Back button //
        <View style={{ marginTop: 20, marginBottom: 60 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.primaryBtn, { backgroundColor: theme.primary }]}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>{t('back') ?? 'Back'}</Text>
          </TouchableOpacity>
        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  smallBtn: { padding: 8, borderWidth: 1, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: '800' },
  sub: { fontSize: 13, color: '#666' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  card: { flex: 0.48, padding: 12, borderWidth: 1, borderRadius: 10 },
  cardLabel: { fontSize: 12, color: '#666' },
  cardValue: { fontSize: 18, fontWeight: '800' },

  panel: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: 'transparent' },
  panelTitle: { fontWeight: '700', fontSize: 16 },

  distRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  colorBox: { width: 18, height: 18, borderRadius: 4, marginRight: 12 },

  listRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#eee' },

  auctionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontWeight: '700' },
  badgeSuccess: { backgroundColor: '#d1fae5', color: '#065f46' },
  badgeInfo: { backgroundColor: '#dbeafe', color: '#1e3a8a' },

  primaryBtn: { padding: 14, borderRadius: 10, alignItems: 'center' },
});

// src/screens/AuctionDetail.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // update path if needed
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type RouteProps = RouteProp<RootStackParamList, 'AuctionDetail'>;

export default function AuctionDetailScreen() {
  const route = useRoute<RouteProps>();
  const { auctionId } = route.params;
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [auction, setAuction] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await api.get('/mandiOfficialAuction/mandi/auction/' + auctionId); // adapt endpoint if necessary
        if (!mounted) return;
        setAuction(res.data);
      } catch (err) {
        console.log('Failed to load auction', err);
        Alert.alert(t('error_title') ?? 'Error', t('fetch_auction_failed') ?? 'Failed to fetch auction details.');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [auctionId, t]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator />
        <Text style={{ color: theme.text, marginTop: 8 }}>{t('loading') ?? 'Loading...'}</Text>
      </SafeAreaView>
    );
  }

  if (!auction) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>{t('no_data') ?? 'No auction found.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { color: theme.text }]}>{auction.cropName ?? 'Auction'}</Text>
        <Text style={{ color: theme.text, marginTop: 8 }}>{t('mandi') ?? 'Mandi'}: {auction.mandiName}</Text>
        <Text style={{ color: theme.text, marginTop: 4 }}>{t('assigned_officer_label') ?? 'Assigned Officer'}: {auction.assignedOfficerName}</Text>
        <Text style={{ color: theme.text, marginTop: 4 }}>{t('scheduled_at_label') ?? 'Scheduled At'}: {auction.scheduledAt ? new Date(auction.scheduledAt).toLocaleString() : '-'}</Text>
        {/* Add more fields as needed */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700' },
});

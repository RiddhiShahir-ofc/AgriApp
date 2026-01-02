import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getMandiPrices } from '../services/mandiPriceApi';

type Props = {
  district: string;
  mandi: string;
  days?: number; // default 1
};

export default function MandiPriceSummary({
  district,
  mandi,
  days = 1,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!district || !mandi) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await getMandiPrices({
          district,
          market: mandi,
          days,
        });
        setData(res?.data?.[0] ?? null);
      } catch (e) {
        console.log('Mandi price error', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [district, mandi, days]);

  if (!district || !mandi) {
    return <Text>Select district and mandi</Text>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!data) {
    return <Text>No price data available</Text>;
  }

  return (
    <View style={{ padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontWeight: '700', marginBottom: 6 }}>
        Today’s Price (₹ / kg)
      </Text>

      <Text>Predicted: ₹{data.pred_price_kg}</Text>
      <Text>Minimum: ₹{data.min_kg}</Text>
      <Text>Maximum: ₹{data.max_kg}</Text>
      <Text>Average: ₹{data.avg_kg}</Text>
    </View>
  );
}

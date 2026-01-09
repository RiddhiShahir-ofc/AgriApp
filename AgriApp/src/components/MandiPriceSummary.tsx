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
  // const [data, setData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    
    if (!district || !mandi || !days) return;

    const load = async () => {
      try {
        // console.log('Fetching mandi prices for', { district, mandi, days });
        setLoading(true);
        const res = await getMandiPrices({
          district,
          market: mandi,
          days,
        });
        // setData(res?.data?.[0] ?? null);
        setData(res?.data ?? []);
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

  // return (
  //   <View style={{ padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5' }}>
  //     <Text style={{ fontWeight: '700', marginBottom: 6 }}>
  //       Today’s Price (₹ / kg)
  //     </Text>

  //     <Text>Predicted: ₹{data.pred_price_kg}</Text>
  //     <Text>Minimum: ₹{data.min_kg}</Text>
  //     <Text>Maximum: ₹{data.max_kg}</Text>
  //     <Text>Average: ₹{data.avg_kg}</Text>
  //   </View>
  // );
  return (
  <View style={{ padding: 12 }}>
    {data.map((dayEntry, index) => (
      <View key={index} style={{ padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5', marginBottom: 10 }}>
        <Text style={{ fontWeight: '700', marginBottom: 4 }}>Date: {dayEntry.date || 'N/A'}</Text>
        <Text>Predicted: ₹{dayEntry.pred_price_kg}</Text>
        <Text>Minimum: ₹{dayEntry.min_kg}</Text>
        <Text>Maximum: ₹{dayEntry.max_kg}</Text>
        <Text>Average: ₹{dayEntry.avg_kg}</Text>
      </View>
    ))}
  </View>
);
}

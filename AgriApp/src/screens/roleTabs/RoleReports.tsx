// src/screens/roleTabs/RoleReports.tsx
import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getJSON } from '../../services/mockapi';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const screenWidth = Dimensions.get('window').width - 32;

export default function RoleReports({ role }: { role: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<number[]>([]);

  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      try {
        const res = await getJSON(`/api/role-data/${role}?section=reports`);
        setData(res.chart || [10,20,30,40]);
      } catch (e) {
        setData([10,20,30,40]);
      } finally {
        setLoading(false);
      }
    })();
  }, [role]);

  if (loading) return <ActivityIndicator style={{marginTop:20}} />;

  return (
   <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={styles.title}>{role.toUpperCase()} — Reports</Text>
      <LineChart
        data={{ labels:['A','B','C','D'], datasets:[{ data }] }}
        width={screenWidth}
        height={180}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(43,108,176, ${opacity})`,
          labelColor: () => '#666',
        }}
        bezier
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:20, fontWeight:'700', marginBottom:8 },
});

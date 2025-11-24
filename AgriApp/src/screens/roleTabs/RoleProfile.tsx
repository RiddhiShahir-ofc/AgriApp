// src/screens/roleTabs/RoleProfile.tsx
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';  
import { getJSON } from '../../services/mockapi';

export default function RoleProfile({ role }: { role: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      try {
        const res = await getJSON(`/api/role-data/${role}?section=profile`);
        setData(res);
      } catch (e) {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [role]);

  if (loading) return <ActivityIndicator style={{marginTop:20}} />;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={styles.title}>{role.toUpperCase()} — Profile</Text>
      <Text>Basic data (mock):</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:20, fontWeight:'700', marginBottom:8 },
});

// src/screens/roleTabs/RoleNotifications.tsx
import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { getJSON } from '../../services/mockapi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function RoleNotifications({ role }: { role: string }) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<any[]>([]);

  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      try {
        const res = await getJSON(`/api/role-data/${role}?section=notifications`);
        setNotes(res.notifications || []);
      } catch (e) {
        setNotes([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [role]);

  if (loading) return <ActivityIndicator style={{marginTop:20}} />;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={styles.title}>{role.toUpperCase()} — Notifications</Text>
      <FlatList data={notes} keyExtractor={(_,i) => String(i)} renderItem={({item}) => <Text style={styles.item}>• {item}</Text>} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:20, fontWeight:'700', marginBottom:8 },
  item: { marginVertical:6 },
});

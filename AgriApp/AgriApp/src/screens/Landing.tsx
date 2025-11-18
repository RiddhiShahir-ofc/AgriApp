import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GraphChart from '../components/GraphChart';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function Landing({ navigation }: Props) {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to AgriApp</Text>

     <Text style={styles.subtitle}>Select preferred Language</Text>
      <View style={styles.langRow}>
        <TouchableOpacity onPress={() => setLang('en')} style={[styles.langBtn, lang === 'en' && styles.active]}>
          <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLang('hi')} style={[styles.langBtn, lang === 'hi' && styles.active]}>
          <Text>हिंदी</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => setLang('mr')} style={[styles.langBtn, lang === 'mr' && styles.active]}>
          <Text>मराठी</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Overview</Text>

      <TouchableOpacity style={styles.graphWrap} onPress={() => navigation.navigate('Register', { fromGraph: true })}>
        <GraphChart />
      </TouchableOpacity>

      <Text style={styles.hint}>Selected: {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff',justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  langBtn: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  active: { backgroundColor: '#eee' },
  subtitle: { fontSize: 18, marginBottom: 12 },
  graphWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
  hint: { marginTop: 12, color: '#666' },
});

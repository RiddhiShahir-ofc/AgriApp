import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function FarmerDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const [profile, setProfile] = useState<any>(null);

  // useEffect(() => {
  //   AsyncStorage.getItem('farmerProfile').then(p => p && setProfile(JSON.parse(p)));
  // }, []);

  const goBack = () => navigation.navigate('Dashboard');

  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
   <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}><Text style={styles.backText}>{t('back')}</Text></TouchableOpacity>
      <Text style={[styles.title,{color:theme.text}]}>{t('farmer_dashboard')}</Text>

      <Text style={[styles.text,{color:theme.text}]}>{t('farmer_message')}</Text>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  text: { fontSize: 16, color: '#333' },
  backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },
  backBtn: { alignSelf: 'flex-start', backgroundColor: '#edf2f7', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
});

import React from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function AnchorRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();
 
  const handleSubmit = () => {
    Alert.alert(
      t('success_title'),
      t('anchor_reg_success'),
      [
        {
          text: t('ok'),
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'AnchorDashboard' }] }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.input}]}>{t('anchor_registration')}</Text>
      <TextInput placeholder={t('name')} style={[styles.input,{color:theme.input}]} />
      <TextInput placeholder={t('company_reg_number')} style={[styles.input,{color:theme.input}]} />
      <TextInput placeholder={t('company_address')} style={[styles.input,{color:theme.input}]} />
      <TextInput placeholder={t('contact_person')} style={[styles.input,{color:theme.input}]} />
      <TextInput placeholder={t('contact_number')} style={[styles.input,{color:theme.input}]} />
      <TextInput placeholder={t('email')} style={[styles.input,{color:theme.input}]} />
      <TextInput placeholder={t('estimated_users')} style={[styles.input,{color:theme.input}]} />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>{t('register')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});


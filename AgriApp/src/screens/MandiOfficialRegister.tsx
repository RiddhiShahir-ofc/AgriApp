import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function MandiOfficialRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleSubmit = () => {
    Alert.alert(
      t('success_title'),
      t('mandi_official_reg_success'),
      [
        {
          text: t('ok'),
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MandiOfficialDashboard' }] }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.text}]}>{t('mandi_official_reg')}</Text>
      <TextInput placeholder={t('official_name')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TextInput placeholder={t('official_id')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TextInput placeholder={t('assigned_mandi')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TextInput placeholder={t('location')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TextInput placeholder={t('official_role')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TextInput placeholder={t('email_id')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
      <Text style={[styles.btnText,{color:theme.text}]}>{t('register')}</Text>
        
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { fontWeight: '700' },
});


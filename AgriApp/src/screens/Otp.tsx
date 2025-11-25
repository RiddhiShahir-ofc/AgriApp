import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { verifyOtp } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OTP({ navigation, route }: Props) {
  const phone = route?.params?.phone || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const {t} = useLanguage();

  const onVerify = async () => {
    setLoading(true);
    const ok = await verifyOtp(phone, otp);
    setLoading(false);
    if (t('ok')) {
      await AsyncStorage.setItem('LOGGED_IN_USER', phone);
      Alert.alert(t('success_title'), t('success_logged_in'));
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    } else {
      Alert.alert(t('failed_title'), t('failed_incorrect_otp'));
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.text}]}>{t('verify_otp')}</Text>
       <Text style={[styles.subtitle,{color:theme.text}]}>{t('otp_sent_to') + ' ' + phone}</Text>
      <TextInput value={otp} onChangeText={setOtp} keyboardType="number-pad" placeholder={t('enter_otp_placeholder')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text}]} />
      <TouchableOpacity style={styles.btn} onPress={onVerify} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('verify_button')}</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginTop: 16 },
  btn: { marginTop: 12, backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  subtitle: { fontSize: 18, marginBottom: 12 },
});

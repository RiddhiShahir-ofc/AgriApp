import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { sendOtp } from '../../services/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const {theme} = useTheme();
  const {t} = useLanguage();

  const onSend = async () => {
    if (!phone || phone.length < 10 || phone.length > 10) return Alert.alert(t('enter_valid_phone_alert'));
    const code = await sendOtp(phone); // returns code for testing
    Alert.alert(t('otp_sent'), t('otp_code_is') + code);
    navigation.navigate('Otp', { phone });
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <Text style={[styles.title, {color :theme.text}]}>{t('enter_mobile_number')}</Text>
      <TextInput keyboardType="phone-pad" placeholder={t('mobile_placeholder')}  style={[styles.input,{color :theme.text}]} placeholderTextColor={theme.text} value={phone} onChangeText={setPhone} />
      <TouchableOpacity style={styles.btn} onPress={onSend}>
        <Text style={[styles.btnText, {color :theme.text}]}>{t('send_otp')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { fontWeight: '700' },
});

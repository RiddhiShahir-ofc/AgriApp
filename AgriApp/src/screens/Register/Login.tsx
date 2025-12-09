import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
//import { sendOtp } from '../../services/mockauth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {sendOtp} from '../../services/auth';

import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const {t} = useLanguage();

  // const onSend = async () => {
  //   if (!phone || phone.length < 10 || phone.length > 10) return Alert.alert(t('enter_valid_phone_alert'));
  //   const code = await sendOtp(phone); // returns code for testing
  //   Alert.alert(t('otp_sent'), t('otp_code_is') + code);
  //   navigation.navigate('Otp', { phone });
  // };

  const onSend = async () => {
    if (!phone || phone.length !== 10) {
      return Alert.alert(t('error_title'), t('enter_valid_phone_alert'));
    }

    setLoading(true);
    try {
      const data = await sendOtp(phone); // will be the response object
      // attempt to extract OTP if backend provided it (dev only)
      const otpFromServer = data?.code ?? data?.otp ?? null;
      const message = data?.message ?? 'OTP sent';
      //Alert.alert(t('otp_sent'), t('otp_code_is') + {otpFromServer});

      // show OTP only if backend explicitly returned it (dev/testing)
      if (otpFromServer) {
        // ensure it's string
        const otpStr = typeof otpFromServer === 'object' ? JSON.stringify(otpFromServer) : String(otpFromServer);
        Alert.alert(t('otp_sent'), `${message}\nCode: ${otpStr}`);
      } else {
        Alert.alert(t('otp_sent'));
      }

      navigation.navigate('Otp', { phone });
    } catch (err: any) {
      console.error('sendOtp error:', err.response?.data ?? err.message ?? err);
      const msg = err.response?.data?.message ?? err.message ?? 'Failed to send OTP';
      Alert.alert(t('error_title'), msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <Text style={[styles.title, {color :theme.text}]}>{t('enter_mobile_number')}</Text>
      <TextInput keyboardType="phone-pad" placeholder={t('mobile_placeholder')}  style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={phone} onChangeText={setPhone} />
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

import React, { useState } from 'react';
import {TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { sendOtp } from '../services/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const onContinue = async () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10 || cleaned.length > 10) return Alert.alert('Invalid', 'Enter valid mobile number');
    setLoading(true);
    const res = await sendOtp(cleaned);
    setLoading(false);
    Alert.alert('OTP sent (demo)', `OTP: ${res}`);
    navigation.navigate('Otp', { phone: cleaned });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Enter 10 Digit Mobile Number" style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={onContinue} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnText}>Send OTP</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 10 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});

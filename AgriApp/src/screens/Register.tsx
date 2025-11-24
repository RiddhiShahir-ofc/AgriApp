import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { sendOtp } from '../services/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [phone, setPhone] = useState('');

  const onSend = async () => {
    if (!phone || phone.length < 10 || phone.length > 10) return Alert.alert('Enter a valid 10 digit phone number');
    const code = await sendOtp(phone); // returns code for testing
    Alert.alert('OTP Sent', `For demo the OTP is ${code}`);
    navigation.navigate('Otp', { phone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Mobile Number</Text>
      <TextInput keyboardType="phone-pad" placeholder="Enter your 10 digit Mobile number" value={phone} onChangeText={setPhone} style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={onSend}>
        <Text style={styles.btnText}>Send OTP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});

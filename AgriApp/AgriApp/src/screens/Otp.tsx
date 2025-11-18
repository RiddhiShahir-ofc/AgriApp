import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { verifyOtp } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OTP({ navigation, route }: Props) {
  const phone = route?.params?.phone || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    setLoading(true);
    const ok = await verifyOtp(phone, otp);
    setLoading(false);
    if (ok) {
      await AsyncStorage.setItem('LOGGED_IN_USER', phone);
      Alert.alert('Success', 'Logged in');
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    } else {
      Alert.alert('Failed', 'Incorrect OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text>OTP Sent to Mobile Number {phone}</Text>
      <TextInput value={otp} onChangeText={setOtp} keyboardType="number-pad" placeholder="Enter OTP" style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={onVerify} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnText}>Verify</Text>}
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
});

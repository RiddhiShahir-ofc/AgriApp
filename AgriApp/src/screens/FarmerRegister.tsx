import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { registerRole } from '../services/auth';

export default function FarmerRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const [name, setName] = useState('');
  // const [village, setVillage] = useState('');
  // const [crop, setCrop] = useState('');

  const handleSubmit = async () => {
    // try {
    //   const res = await registerRole('farmer', { name, village, crop });

      Alert.alert(
        'Success',
        'Farmer registration successful !',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'FarmerDashboard' }],
              });
            },
          },
        ]
      );
    // } catch (e: any) {
    //   Alert.alert('Error', e.message || 'Farmer Registration failed');
    // }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Farmer Registration</Text>
      {/* <TextInput placeholder="Farmer Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Village location" value={village} onChangeText={setVillage} style={styles.input} />
      <TextInput placeholder="Interested Crop" value={crop} onChangeText={setCrop} style={styles.input} /> */}

        <TextInput placeholder="Farmer Name" style={styles.input} />
      <TextInput placeholder="Village location" style={styles.input} />
      <TextInput placeholder="Interested Crop" style={styles.input} />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Register</Text>
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

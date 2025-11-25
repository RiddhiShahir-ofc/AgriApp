import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, Alert,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addRole } from '.././utils/storage'; 

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function BuyerRegister() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [buyername, setBuyerName] = useState('');
  const [businessentity, setBusinessEntity] = useState('');
  const [businessid, setBusinessID] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [intrestedcrops, setIntrestedCrops] = useState('');

  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleSubmit =async () => {

    if (!buyername || !businessentity || !businessid || !email || !location || !intrestedcrops) {

      return Alert.alert(t('missing_fields'));

    }

    // Save role with phone and record role registration

    const phone = await AsyncStorage.getItem('LOGGED_IN_USER') || 'unknown';

    if (phone) await addRole(phone, "buyer");

    await AsyncStorage.setItem('LOGGED_IN_ROLE', 'buyer');

    // Save buyer profile example

    await AsyncStorage.setItem('farmerProfile', JSON.stringify({ buyername, businessentity, businessid, email, location, intrestedcrops, phone }));

    Alert.alert(
      t('success_title'),
      t('buyer_reg_success'),
      [
        {
          text: t('ok'),
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'BuyerDashboard' }] }),
        },
      ]
    );
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color :theme.text}]}>{t('buyer_reg')}</Text>
      <TextInput placeholder={t('buyer_name')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={buyername} onChangeText={setBuyerName} />
      <TextInput placeholder={t('business_name')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={businessentity} onChangeText={setBusinessEntity} />
      <TextInput placeholder={t('business_id')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={businessid} onChangeText={setBusinessID}/>
      <TextInput placeholder={t('email_id')} keyboardType="email-address" style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={email} onChangeText={setEmail} />
      <TextInput placeholder={t('location')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={location} onChangeText={setLocation}/>
      <TextInput placeholder={t('intrested_crop')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={intrestedcrops} onChangeText={setIntrestedCrops}/>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
      <Text style={styles.btnText}>{t('register')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});


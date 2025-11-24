import React,{ useState } from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, Alert,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';
import { addRole } from '.././utils/storage'; 

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SellerRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [sellername, setSellerName] = useState('');
  const [businessname, setBusinessName] = useState('');
  const [primarycrop, setPrimaryCrop] = useState('');
  const [location, setLocation] = useState('');

  const { theme } = useTheme();
  const { t } = useLanguage();

    const handleSubmit = async () => {

    if (!sellername || !businessname || !primarycrop || !location) {

      return Alert.alert('Missing Data', 'Please fill all fields.');

    }

      // Save role with phone and record role registration

    const phone = await AsyncStorage.getItem('LOGGED_IN_USER') || 'unknown';

    if (!phone) {
      return Alert.alert('Error', 'Phone number not found in session');
    }

    if (phone) await addRole(phone, "seller");  

    await AsyncStorage.setItem('LOGGED_IN_ROLE', 'seller');

    // Save seller profile

    //await AsyncStorage.setItem('sellerProfile', JSON.stringify({ sellername, businessname,location, primarycrop, phone }));
        await AsyncStorage.setItem(
      `SELLER_PROFILE_${phone}`,
      JSON.stringify({ sellername, businessname, primarycrop, location })
    );
  
    Alert.alert(
      t('success_title'),
      t('seller_reg_success'),
      [
        {
          text: t('ok'),
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'SellerDashboard' }] }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.text}]}>{t('seller_reg')}</Text>
      <TextInput placeholder={t('seller_name')} style={[styles.input,{color:theme.input}]}value={sellername} onChangeText={setSellerName} />
      <TextInput placeholder={t('business_name')} style={[styles.input,{color:theme.input}]}value={businessname} onChangeText={setBusinessName} />
      <TextInput placeholder={t('primary_crop')} style={[styles.input,{color:theme.text}]}value={primarycrop} onChangeText={setPrimaryCrop} />
      <TextInput placeholder={t('location')} style={[styles.input,{color:theme.input}]} placeholderTextColor={theme.text} value={location} onChangeText={setLocation} />
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

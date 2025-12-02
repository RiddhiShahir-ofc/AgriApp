// import React,{ useState } from 'react';
// import {Text, TextInput, TouchableOpacity, StyleSheet, Alert,View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RootStackParamList } from '../../App';
// import { addRole } from '.././utils/storage'; 

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// export default function SellerRegister() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const [sellername, setSellerName] = useState('');
//   const [businessname, setBusinessName] = useState('');
//   const [primarycrop, setPrimaryCrop] = useState('');
//   const [location, setLocation] = useState('');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//     const handleSubmit = async () => {

//     if (!sellername || !businessname || !primarycrop || !location) {

//       return Alert.alert('Missing Data', 'Please fill all fields.');

//     }

//       // Save role with phone and record role registration

//     const phone = await AsyncStorage.getItem('LOGGED_IN_USER') || 'unknown';

//     if (!phone) {
//       return Alert.alert('Error', 'Phone number not found in session');
//     }

//     if (phone) await addRole(phone, "seller");  

//     await AsyncStorage.setItem('LOGGED_IN_ROLE', 'seller');

//     // Save seller profile

//     //await AsyncStorage.setItem('sellerProfile', JSON.stringify({ sellername, businessname,location, primarycrop, phone }));
//         await AsyncStorage.setItem(
//       `SELLER_PROFILE_${phone}`,
//       JSON.stringify({ sellername, businessname, primarycrop, location })
//     );
  
//     Alert.alert(
//       t('success_title'),
//       t('seller_reg_success'),
//       [
//         {
//           text: t('ok'),
//           onPress: () => navigation.reset({ index: 0, routes: [{ name: 'SellerDashboard' }] }),
//         },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
//       <Text style={[styles.title,{color:theme.text}]}>{t('seller_reg')}</Text>
//       <TextInput placeholder={t('seller_name')} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={sellername} onChangeText={setSellerName} />
//       <TextInput placeholder={t('business_name')} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={businessname} onChangeText={setBusinessName} />
//       <TextInput placeholder={t('primary_crop')} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={primarycrop} onChangeText={setPrimaryCrop} />
//       <TextInput placeholder={t('location')} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={location} onChangeText={setLocation} />
//       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
//       <Text style={[styles.btnText,{color:theme.text}]}>{t('register')}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
//     }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   input: { borderWidth: 1 ,borderRadius: 8, padding: 10, marginBottom: 10 },
//   btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
//   btnText: { fontWeight: '700' },
// });

import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import { RootStackParamList } from '../../App';
import { addRole } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<RootStackParamList, 'SellerRegister'>;

const SellerRegister: React.FC = () => {
  const navigation = useNavigation<PropsNav>();

  const [sellerName, setSellerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');

  // crops for multi-select
  const [openCrops, setOpenCrops] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [cropItems, setCropItems] = useState<{ label: string; value: string }[]>(
    []
  );

  const [submitting, setSubmitting] = useState(false);

  const { theme } = useTheme();
  const { t } = useLanguage();

  // ------------- Load crops from /api/crops -----------------
  useEffect(() => {
    const loadCrops = async () => {
      try {
        const res = await api.get('/crops');
        const data = res.data;

        const mapped = data
          .map((c: any) => {
            const rawId =
              c.id ??
              c.cropId ??
              c.cropID ??
              c.CropId ??
              c.CropID ??
              null;
            const name =
              c.name ??
              c.cropName ??
              c.CropName ??
              '';

            if (!rawId || !name) return null;

            return {
              label: String(name),
              value: String(rawId),
            };
          })
          .filter(Boolean) as { label: string; value: string }[];

        setCropItems(mapped);

        if (!mapped.length) {
          console.warn('SellerRegister: /crops returned empty or invalid data', data);
        }
      } catch (err) {
        console.log('SellerRegister crops fetch error:', err);
        Alert.alert(
          t('error_title') ?? 'Error',
          'Failed to load crops. Please check /api/crops.'
        );
      }
    };

    loadCrops();
  }, [t]);

  // ------------- Call backend /api/seller/register ----------------
  const registerSellerOnBackend = async (): Promise<void> => {
    const cropIds = selectedCrops
      .map((v) => Number(v))
      .filter((n) => !Number.isNaN(n));

    const payload = {
      sellerName: sellerName,
      businessName: businessName || null,
      location: location,
      profilePhotoUrl: null, // can wire file upload later
      cropIds,
    };

    console.log('SellerRegister payload:', payload);

    const res = await api.post('/seller/register', payload);
    console.log('SellerRegister response:', res.status, res.data);

    if (!res.status.toString().startsWith('2')) {
      throw new Error(res.data?.message || 'Seller registration failed');
    }
  };

  // ------------- Submit handler ----------------
  const handleSubmit = async () => {
    if (!sellerName || !businessName || !location) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('fill_fields') ?? 'Please fill all required fields'
      );
    }

    if (!selectedCrops.length) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('select_crops') ?? 'Please select at least one crop'
      );
    }

    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (!token) {
        setSubmitting(false);
        return Alert.alert(
          t('error_title') ?? 'Error',
          // t('not_logged_in') ??
            'You must be logged in to register as a seller.'
        );
      }

      // 1) call backend
      await registerSellerOnBackend();

      // 2) mark role locally
      const phone =
        (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
      if (phone) await addRole(phone, 'seller');
      await AsyncStorage.setItem('LOGGED_IN_ROLE', 'seller');

      // 3) store local seller profile snapshot
      await AsyncStorage.setItem(
        `SELLER_PROFILE_${phone}`,
        JSON.stringify({
          sellerName,
          businessName,
          location,
          cropIds: selectedCrops,
        })
      );

      Alert.alert(
        t('success_title') ?? 'Success',
        t('seller_reg_success') ?? 'Seller registered successfully',
        [
          {
            text: t('ok') ?? 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'SellerDashboard' }],
              }),
          },
        ]
      );
    } catch (err: any) {
      console.log(
        'Seller registration error:',
        err?.response?.data ?? err?.message ?? err
      );
      const msg =
        err?.response?.data?.message ??
        t('seller_reg_failed') ??
        'Seller registration failed';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('seller_reg')}
        </Text>

        <TextInput
          placeholder={t('seller_name')}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          placeholderTextColor={theme.text}
          value={sellerName}
          onChangeText={setSellerName}
        />
        <TextInput
          placeholder={t('business_name')}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          placeholderTextColor={theme.text}
          value={businessName}
          onChangeText={setBusinessName}
        />
        <TextInput
          placeholder={t('location')}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          placeholderTextColor={theme.text}
          value={location}
          onChangeText={setLocation}
        />

        {/* Multi-select CropIds */}
        <View style={{ zIndex: 2000, marginBottom: 10 }}>
          <DropDownPicker
            multiple
            open={openCrops}
            value={selectedCrops}
            items={cropItems}
            setOpen={setOpenCrops}
            setValue={setSelectedCrops}
            setItems={setCropItems}
            placeholder={t('intrested_crop')}
            listMode="MODAL"
            modalTitle={t('intrested_crop')}
            searchable
            zIndex={2000}
            zIndexInverse={1000}
            style={{ borderColor: theme.text }}
          />
        </View>
        <Text style={{ fontSize: 12, color: theme.text, marginBottom: 8 }}>
          Crops loaded: {cropItems.length}
        </Text>

        <TouchableOpacity
          style={[styles.btn, submitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.btnText}>
            {submitting
              ? (t('loading') ?? 'Submitting...')
              : t('register')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerRegister;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: {
    backgroundColor: '#2b6cb0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});

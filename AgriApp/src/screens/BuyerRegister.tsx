// import React, {useState} from 'react';
// import {Text, TextInput, TouchableOpacity, StyleSheet, Alert,View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { addRole } from '.././utils/storage'; 

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// import { registerBuyer } from '../services/buyer';

// export default function BuyerRegister() {

//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const [buyername, setBuyerName] = useState('');
//   const [businessentity, setBusinessEntity] = useState('');
//   const [businessid, setBusinessID] = useState('');
//   const [email, setEmail] = useState('');
//   const [location, setLocation] = useState('');
//   const [intrestedcrops, setIntrestedCrops] = useState('');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const handleSubmit =async () => {

//     if (!buyername || !businessentity || !businessid || !location || !intrestedcrops) {

//       return Alert.alert(t('missing_fields'));

//     }

//   //   const payload = {
//   //   buyername: buyername,
//   //   businessentity: businessentity,
//   //   businessid: businessid,
//   //   location: location,
//   //   intrestedcrops: intrestedcrops, // can be "1,2,3"
//   //   email: email // ignored by backend unless added
//   // };

//   // try {
//     // const response = await registerBuyer(payload);

//     // Save role with phone and record role registration

//     const phone = await AsyncStorage.getItem('LOGGED_IN_USER') || 'unknown';

//     if (phone) await addRole(phone, "buyer");

//     await AsyncStorage.setItem('LOGGED_IN_ROLE', 'buyer');

//     // Save buyer profile example

//     //await AsyncStorage.setItem('farmerProfile', JSON.stringify({ buyername, businessentity, businessid, email, location, intrestedcrops, phone }));

//     Alert.alert(
//       t('success_title'),
//       t('buyer_reg_success'),
//       [
//         {
//           text: t('ok'),
//           onPress: () => navigation.reset({ index: 0, routes: [{ name: 'BuyerDashboard' }] }),
//         },
//       ]
//     );

//   //   } catch (err: any) {
//   //   console.log("Buyer registration error:", err.response?.data ?? err.message);
//   //   Alert.alert(
//   //     t('error_title'),
//   //     err.response?.data?.message || t('buyer_reg_failed') 
//   //   );
//   // }
//   };


//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
//       <Text style={[styles.title,{color :theme.text}]}>{t('buyer_reg')}</Text>
//       <TextInput placeholder={t('buyer_name')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={buyername} onChangeText={setBuyerName} />
//       <TextInput placeholder={t('business_name')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={businessentity} onChangeText={setBusinessEntity} />
//       <TextInput placeholder={t('business_id')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={businessid} onChangeText={setBusinessID}/>
//       <TextInput placeholder={t('email_id')} keyboardType="email-address" style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={email} onChangeText={setEmail} />
//       <TextInput placeholder={t('location')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={location} onChangeText={setLocation}/>
//       <TextInput placeholder={t('intrested_crop')} style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={intrestedcrops} onChangeText={setIntrestedCrops}/>
//       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
//       <Text style={styles.btnText}>{t('register')}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
//   btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
//   btnText: { color: '#fff', fontWeight: '700' },
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
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import { addRole } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<RootStackParamList, 'BuyerRegister'>;

const BuyerRegister: React.FC = () => {
  const navigation = useNavigation<PropsNav>();

  const [buyerName, setBuyerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessId, setBusinessID] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  // multi-select crops for InterestedCropIds
  const [openCrops, setOpenCrops] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [cropItems, setCropItems] = useState<{ label: string; value: string }[]>(
    []
  );

  const [submitting, setSubmitting] = useState(false);

  const { theme } = useTheme();
  const { t } = useLanguage();

  // -------- Load crops from backend (same idea as FarmerRegister) ----------
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
      } catch (err) {
        console.log('Buyer crops fetch error:', err);
      }
    };

    loadCrops();
  }, []);

  // --------------------- Call /buyer/register backend ----------------------
  const registerBuyerOnBackend = async (): Promise<void> => {
    // convert selected crop ids (string) -> number[]
    const interestedCropIds = selectedCrops
      .map((v) => Number(v))
      .filter((n) => !Number.isNaN(n));

    const payload = {
      buyerName: buyerName,
      businessId: businessId || null,
      businessName: businessName,
      location: location || null,
      profilePhotoUrl: null, // you can add image upload later if needed
      interestedCropIds,
      // email is not part of BuyerRegisterRequest; extra fields will be ignored by ASP.NET by default
      email,
    };

    const res = await api.post('/buyer/register', payload);
    if (!res.status.toString().startsWith('2')) {
      throw new Error(res.data?.message || 'Buyer registration failed');
    }
  };

  // ---------------------- Submit handler -----------------------------------
  const handleSubmit = async () => {
    if (!buyerName || !businessName || !businessId || !location) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('fill_fields') ?? 'Please fill all required fields'
      );
    }

    if (!selectedCrops.length) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('select_crops') ?? 'Please select at least one interested crop'
      );
    }

    setSubmitting(true);
    try {
      // ensure user is logged in and has a token
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (!token) {
        setSubmitting(false);
        return Alert.alert(
          t('error_title') ?? 'Error',
          // t('not_logged_in') ??
            'You must be logged in to register as a buyer.'
        );
      }

      // 1) call backend /buyer/register
      await registerBuyerOnBackend();

      // 2) mark role locally
      const phone =
        (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
      if (phone) await addRole(phone, 'buyer');
      await AsyncStorage.setItem('LOGGED_IN_ROLE', 'buyer');

      // 3) optionally save a local profile snapshot
      const buyerProfile = {
        buyerName,
        businessName,
        businessId,
        email,
        location,
        interestedCropIds: selectedCrops,
        phone,
      };
      await AsyncStorage.setItem(
        'buyerProfile',
        JSON.stringify(buyerProfile)
      );

      Alert.alert(
        t('success_title') ?? 'Success',
        t('buyer_reg_success') ?? 'Buyer registered successfully',
        [
          {
            text: t('ok') ?? 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'BuyerDashboard' }],
              }),
          },
        ]
      );
    } catch (err: any) {
      console.log(
        'Buyer registration error:',
        err?.response?.data ?? err?.message ?? err
      );
      const msg =
        err?.response?.data?.message ??
        t('buyer_reg_failed') ??
        'Buyer registration failed';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ----------------------------- UI ----------------------------------------
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('buyer_reg')}
        </Text>

        <TextInput
          placeholder={t('buyer_name')}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          placeholderTextColor={theme.text}
          value={buyerName}
          onChangeText={setBuyerName}
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
          placeholder={t('business_id')}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          placeholderTextColor={theme.text}
          value={businessId}
          onChangeText={setBusinessID}
        />
        <TextInput
          placeholder={t('email_id')}
          keyboardType="email-address"
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          placeholderTextColor={theme.text}
          value={email}
          onChangeText={setEmail}
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

        {/* Multi-select Interested Crops */}
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
          modalProps={{ animationType: 'slide' }}
          style={{ marginBottom: 10 }}
        />

        <TouchableOpacity
          style={[styles.btn, submitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.btnText}>
            {submitting
              ? t('loading') ?? 'Submitting...'
              : t('register')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuyerRegister;

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

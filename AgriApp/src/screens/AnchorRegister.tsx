// // import React from 'react';
// // import {Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // export default function AnchorRegister() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();
 
// //   const handleSubmit = () => {
// //     Alert.alert(
// //       t('success_title'),
// //       t('anchor_reg_success'),
// //       [
// //         {
// //           text: t('ok'),
// //           onPress: () => navigation.reset({ index: 0, routes: [{ name: 'AnchorDashboard' }] }),
// //         },
// //       ]
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
// //       <Text style={[styles.title,{color:theme.text}]}>{t('anchor_registration')}</Text>
// //       <TextInput placeholder={t('name')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('company_reg_number')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('company_address')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('contact_person')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('contact_number')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('email')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('estimated_users')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
// //         <Text style={styles.btnText}>{t('register')}</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// //   input: { borderWidth: 1, borderColor: 'theme.text', borderRadius: 8, padding: 10, marginBottom: 10 },
// //   btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
// //   btnText: { color: 'theme.text', fontWeight: '700' },
// // });

// import React, { useState,useEffect } from 'react';
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   View
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';

// export default function AnchorRegister() {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//      // while checking /Anchor/status, we hide the form
//      const [checkingStatus, setCheckingStatus] = useState(true);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   //  use backend /anchor/status to decide where to go
//   useEffect(() => {
//     const checkAnchorStatus = async () => {
//       try {
//         // api should already attach the Authorization header (token)
//         const res = await api.get('/anchor/status');
//         const isAnchor = !!res.data?.isAnchor;

//         if (isAnchor) {
//           // already registered → go straight to AnchorDashboard
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'AnchorDashboard' }],
//           });
//         } else {
//           // show registration form
//           setCheckingStatus(false);
//         }
//       } catch (e) {
//         console.warn('Failed to check anchor status', e);
//         // on error, fall back to showing registration form
//         setCheckingStatus(false);
//       }
//     };

//     checkAnchorStatus();
//   }, [navigation]);

//   const [form, setForm] = useState({
//     companyName: '',
//     registrationNumber: '',
//     companyAddress: '',
//     contactPersonName: '',
//     contactPersonNum: '',
//     email: '',
//     estimatedFarmersNum: '',
//     gstNumber: '',
//     businessDescription: '',
//   });

//   const handleChange = (key: string, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await api.post('/anchor/register', {
//         companyName: form.companyName,
//         registrationNumber: form.registrationNumber,
//         companyAddress: form.companyAddress,
//         contactPersonName: form.contactPersonName,
//         contactPersonNum: form.contactPersonNum,
//         email: form.email,
//         estimatedFarmersNum: Number(form.estimatedFarmersNum),
//         gstNumber: form.gstNumber,
//         businessDescription: form.businessDescription,
//       });

//       Alert.alert(
//         t('success_title'),
//         t('anchor_reg_success'),
//         [
//           {
//             text: t('ok'),
//             onPress: () =>
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'AnchorDashboard' }],
//               }),
//           },
//         ]
//       );
//     } catch (error: any) {
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         error?.response?.data?.message ?? 'Registration failed'
//       );
//     }
//   };
//     //  NEW: while we are checking /anchor/status, show a simple loading screen
//     if (checkingStatus) {
//       return (
//         <SafeAreaView
//           style={[styles.container, { backgroundColor: theme.background }]}
//         >
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ color: theme.text }}>
//               {t('loading') ?? 'Checking anchor status...'}
//             </Text>
//           </View>
//         </SafeAreaView>
//       );
//     }

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.background }]}
//     >
//       <Text style={[styles.title, { color: theme.text }]}>
//         {t('anchor_registration')}
//       </Text>

//       <TextInput
//         placeholder={t('name')}
//         placeholderTextColor={theme.text}
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('companyName', v)}
//       />

//       <TextInput
//         placeholder={t('company_reg_number')}
//         placeholderTextColor={theme.text}
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('registrationNumber', v)}
//       />

//       <TextInput
//         placeholder={t('company_address')}
//         placeholderTextColor={theme.text}
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('companyAddress', v)}
//       />

//       <TextInput
//         placeholder={t('contact_person')}
//         placeholderTextColor={theme.text}
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('contactPersonName', v)}
//       />

//       <TextInput
//         placeholder={t('contact_number')}
//         placeholderTextColor={theme.text}
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('contactPersonNum', v)}
//       />

//       <TextInput
//         placeholder={t('email')}
//         placeholderTextColor={theme.text}
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('email', v)}
//       />

//       <TextInput
//         placeholder={t('estimated_users')}
//         placeholderTextColor={theme.text}
//         keyboardType="numeric"
//         style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         onChangeText={(v) => handleChange('estimatedFarmersNum', v)}
//       />

//       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
//         <Text style={styles.btnText}>{t('register')}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   btn: {
//     backgroundColor: '#2b6cb0',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export default function AnchorRegister() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { theme } = useTheme();
  const { t } = useLanguage();

  // while checking /anchor/status, hide the form
  const [checkingStatus, setCheckingStatus] = useState(true);

  // check anchor status on mount
  useEffect(() => {
    let isMounted = true;

    const checkAnchorStatus = async () => {
      try {
        const res = await api.get('/anchor/status');
        const isAnchor = Boolean(res.data?.isAnchor);

        if (!isMounted) return;

        if (isAnchor) {
          navigation.replace('AnchorDashboard');
        } else {
          setCheckingStatus(false);
        }
      } catch (error) {
        console.warn('Failed to check anchor status', error);
        if (isMounted) {
          setCheckingStatus(false);
        }
      }
    };

    checkAnchorStatus();

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  const [form, setForm] = useState({
    companyName: '',
    registrationNumber: '',
    companyAddress: '',
    contactPersonName: '',
    contactPersonNum: '',
    email: '',
    estimatedFarmersNum: '',
    gstNumber: '',
    businessDescription: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/anchor/register', {
        companyName: form.companyName,
        registrationNumber: form.registrationNumber,
        companyAddress: form.companyAddress,
        contactPersonName: form.contactPersonName,
        contactPersonNum: form.contactPersonNum,
        email: form.email,
        estimatedFarmersNum: Number(form.estimatedFarmersNum),
        gstNumber: form.gstNumber,
        businessDescription: form.businessDescription,
      });

      Alert.alert(
        t('success_title'),
        t('anchor_reg_success'),
        [
          {
            text: t('ok'),
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'AnchorDashboard' }],
              }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        t('error_title') ?? 'Error',
        error?.response?.data?.message ?? 'Registration failed'
      );
    }
  };

  // loading screen while checking anchor status
  if (checkingStatus) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.text }}>
            {t('loading') ?? 'Checking anchor status...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        {t('anchor_registration')}
      </Text>

      <TextInput
        placeholder={t('name')}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('companyName', v)}
      />

      <TextInput
        placeholder={t('company_reg_number')}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('registrationNumber', v)}
      />

      <TextInput
        placeholder={t('company_address')}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('companyAddress', v)}
      />

      <TextInput
        placeholder={t('contact_person')}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('contactPersonName', v)}
      />

      <TextInput
        placeholder={t('contact_number')}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('contactPersonNum', v)}
      />

      <TextInput
        placeholder={t('email')}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('email', v)}
      />

      <TextInput
        placeholder={t('estimated_users')}
        placeholderTextColor={theme.text}
        keyboardType="numeric"
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        onChangeText={(v) => handleChange('estimatedFarmersNum', v)}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>{t('register')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#2b6cb0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});

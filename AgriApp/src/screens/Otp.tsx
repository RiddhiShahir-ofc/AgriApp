import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import {verifyOtp} from '../services/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OTP({ navigation, route }: Props) {
  const phone = route?.params?.phone || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const {t} = useLanguage();


  const onVerify = async () => {
     if (!otp) return Alert.alert(t('error_title'), t('please_enter_otp'));
    setLoading(true);
    try {
    const ok = await verifyOtp(phone, otp,'android-emulator'); // returns true/false

    if (t('ok')) {
      await AsyncStorage.setItem('LOGGED_IN_USER', phone);
      Alert.alert(t('success_title'), t('success_logged_in'));
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    } else {
      Alert.alert(t('failed_title'), t('failed_incorrect_otp'));
    }
    } catch (err: any) {
      console.error('verifyOtp error:', err.response?.data ?? err.message ?? err);
      const msg = err.response?.data?.message ?? err.message ??t('failed_incorrect_otp') ??'OTP verification failed';
      Alert.alert(t('error_title'),t('failed_incorrect_otp') ??msg);
    }
    finally {
    setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.text}]}>{t('verify_otp')}</Text>
       <Text style={[styles.subtitle,{color:theme.text}]}>{t('otp_sent_to') + ' ' + phone}</Text>
      <TextInput value={otp} onChangeText={setOtp} keyboardType="number-pad" placeholder={t('enter_otp_placeholder')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
      <TouchableOpacity style={styles.btn} onPress={onVerify} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={[styles.btnText,{color:theme.text}]}>{t('verify_button')}</Text>}
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
  subtitle: { fontSize: 18, marginBottom: 12 }
});

// import React, { useState, useRef } from 'react';
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import { verifyOtp } from '../services/auth';

// type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

// export default function OTP({ navigation, route }: Props) {
//   const phone = route?.params?.phone || '';

//   // 4-digit OTP
//   const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);

//   const inputsRef = useRef<(TextInput | null)[]>([]);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const handleChange = (text: string, index: number) => {
//     const digit = text.replace(/[^0-9]/g, '');
//     if (!digit) return;

//     const updated = [...otpDigits];
//     updated[index] = digit;
//     setOtpDigits(updated);

//     // safely move focus
//     if (index < 3) {
//       setTimeout(() => {
//         inputsRef.current[index + 1]?.focus();
//       }, 50);
//     }
//   };

//   const handleBackspace = (index: number) => {
//     if (otpDigits[index]) {
//       const updated = [...otpDigits];
//       updated[index] = '';
//       setOtpDigits(updated);
//     } else if (index > 0) {
//       setTimeout(() => {
//         inputsRef.current[index - 1]?.focus();
//       }, 50);
//     }
//   };

//   const onVerify = async () => {
//     const otp = otpDigits.join('');

//     if (otp.length !== 4) {
//       return Alert.alert(t('error_title'), t('please_enter_otp'));
//     }

//     setLoading(true);
//     try {
//       const ok = await verifyOtp(phone, otp, 'android-emulator');

//       if (ok) {
//         await AsyncStorage.setItem('LOGGED_IN_USER', phone);
//         Alert.alert(t('success_title'), t('success_logged_in'));
//         navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
//       } else {
//         Alert.alert(t('failed_title'), t('failed_incorrect_otp'));
//       }
//     } catch (err) {
//       Alert.alert(t('error_title'), t('failed_incorrect_otp'));
//     } finally {
//       setLoading(false);
//     }
//   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

// //       <Text style={[styles.title, { color: theme.text }]}>
// //         {t('verify_otp')?? 'Verify OTP'}
// //       </Text>

// //       <Text style={[styles.subtitle, { color: theme.text }]}>
// //         {t('otp_sent_to')?? 'OTP sent to'} +91 {phone}
// //       </Text>

// //       {/* OTP INPUT BOXES */}
// //       <View style={styles.otpRow}>
// //         {otpDigits.map((digit, index) => (
// //           <TextInput
// //             key={index}
// //             ref={(ref) => {
// //               inputsRef.current[index] = ref;
// //             }}
// //             value={digit}
// //             onChangeText={(text) => handleChange(text, index)}
// //           onKeyPress={(e) => {
// //   if (e.nativeEvent?.key === 'Backspace') {
// //     handleBackspace(index);
// //   }
// // }}

// //             keyboardType="number-pad"
// //             maxLength={1}
// //             style={[
// //               styles.otpBox,
// //               {
// //                 borderColor: '#22c55e', // green
// //                 color: theme.text,
// //               },
// //             ]}
// //           />
// //         ))}
// //       </View>

// //       {/* VERIFY BUTTON */}
// //       <TouchableOpacity
// //         style={[
// //           styles.btn,
// //           {
// //             backgroundColor: '#22c55e', // green
// //             opacity: loading ? 0.6 : 1,
// //           },
// //         ]}
// //         onPress={onVerify}
// //         disabled={loading}
// //       >
// //         {loading ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.btnText}>{t('verify_button')}</Text>
// //         )}
// //       </TouchableOpacity>

// //     </SafeAreaView>
// //   );
// // }
// return (
//   <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
//     <Text style={{ color: 'white' }}>OTP SCREEN LOADED</Text>
//   </SafeAreaView>
// );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 8,
//   },

//   subtitle: {
//     fontSize: 16,
//     marginBottom: 20,
//   },

//   otpRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },

//   otpBox: {
//     width: 55,
//     height: 55,
//     borderWidth: 2,
//     borderRadius: 12,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '700',
//   },

//   btn: {
//     marginTop: 10,
//     paddingVertical: 14,
//     borderRadius: 30,
//     alignItems: 'center',
//   },

//   btnText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

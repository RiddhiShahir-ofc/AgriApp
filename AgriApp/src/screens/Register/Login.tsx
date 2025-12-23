// // import React, { useState } from 'react';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
// // import { NativeStackScreenProps } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../../App';
// // import { useTheme } from '../../context/ThemeContext';
// // import { useLanguage } from '../../context/LanguageContext';
// // import {sendOtp} from '../../services/auth';
// // import axios from 'axios';

// // type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

// // export default function Register({ navigation }: Props) {
// //   const [phone, setPhone] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const {theme} = useTheme();
// //   const {t} = useLanguage();

// //   const onSend = async () => {
// //     if (!phone || phone.length !== 10) {
// //       return Alert.alert(t('error_title'), t('enter_valid_phone_alert'));
// //     }

// //     setLoading(true);
// //     try {
// //       const data = await sendOtp(phone); // will be the response object
// //       // attempt to extract OTP if backend provided it (dev only)
// //       const otpFromServer = data?.code ?? data?.otp ?? null;
// //       const message = data?.message ?? 'OTP sent';
// //       //Alert.alert(t('otp_sent'), t('otp_code_is') + {otpFromServer});

// //       // show OTP only if backend explicitly returned it (dev/testing)
// //       if (otpFromServer) {
// //         // ensure it's string
// //         const otpStr = typeof otpFromServer === 'object' ? JSON.stringify(otpFromServer) : String(otpFromServer);
// //         Alert.alert(t('otp_sent'), `${message}\nCode: ${otpStr}`);
// //       } else {
// //         Alert.alert(t('otp_sent'));
// //       }

// //       navigation.navigate('Otp', { phone });
// //     } catch (err: any) {
// //       console.error('sendOtp error:', err.response?.data ?? err.message ?? err);
// //       const msg = err.response?.data?.message ?? err.message ?? 'Failed to send OTP';
// //       Alert.alert(t('error_title'), msg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
// //       <Text style={[styles.title, {color :theme.text}]}>{t('enter_mobile_number')}</Text>
// //       <TextInput keyboardType="phone-pad" placeholder={t('mobile_placeholder')}  style={[styles.input,{color :theme.text},{borderColor:theme.text}]} placeholderTextColor={theme.text} value={phone} onChangeText={setPhone} />
// //       <TouchableOpacity style={styles.btn} onPress={onSend}>
// //         <Text style={[styles.btnText, {color :theme.text}]}>{t('send_otp')}</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
// //   input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
// //   btn: { backgroundColor: '#15f048ff', padding: 12, borderRadius: 30, alignItems: 'center' },
// //   btnText: { fontWeight: '700' },
// // });


// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { TextInput, TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../../App';
// import { useTheme } from '../../context/ThemeContext';
// import { useLanguage } from '../../context/LanguageContext';
// import { sendOtp } from '../../services/auth';

// type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

// export default function Register({ navigation }: Props) {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const onSend = async () => {
//     if (phone.length !== 10) {
//       return Alert.alert(t('error_title'), t('enter_valid_phone_alert'));
//     }

//     setLoading(true);
//     try {
//       await sendOtp(phone);
//       Alert.alert(t('otp_sent'));
//       navigation.navigate('Otp', { phone });
//     } catch (err: any) {
//       Alert.alert(t('error_title'), err.message ?? 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isDisabled = phone.length !== 10 || loading;

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
  
//       <Text style={[styles.title, { color: theme.text }]}>
//         {t('enter_mobile_number')}
//       </Text>

//       {/* Phone input */}
//       <View style={[styles.phoneRow, { borderColor: theme.text }]}>
//         <Text style={[styles.countryCode, { color: theme.text }]}>+91</Text>
    
//         <TextInput
//         style={[styles.phoneInput, { color: theme.text }]}
//         keyboardType="number-pad"
//         maxLength={10}
//         placeholder={t('mobile_placeholder')}
//         placeholderTextColor={theme.placeholder}
//         value={phone}
//         onChangeText={(text) => {
//         const digitsOnly = text.replace(/[^0-9]/g, '');
//         setPhone(digitsOnly);
//       }}
//     />
//       </View>

//       {/* Send OTP */}
//       <TouchableOpacity
//         style={[
//           styles.btn,
//           { backgroundColor: theme.primary, opacity: isDisabled ? 0.5 : 1 },
//         ]}
//         onPress={onSend}
//         disabled={isDisabled}
//       >
//         <Text style={[styles.btnText, {color :theme.text}]}>{t('send_otp')}</Text>
//       </TouchableOpacity>

//       {/* Privacy & terms */}
//       <Text style={[styles.privacy, { color: theme.text }]}>
//         Your number is safe with us. We do not share your data with third parties.
//       </Text>

//       <Text style={[styles.terms, { color: theme.text }]}>
//         By clicking Send OTP, you agree to our Terms of Service and Privacy Policy.
//       </Text>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },

//   phoneRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     marginBottom: 16,
    
//   },
//   countryCode: { fontSize: 16, marginRight: 8 },
//   phoneInput: { flex: 1, fontSize: 16, paddingVertical: 12 },

//   btn: {
//     backgroundColor: '#15f048ff',
//     paddingVertical: 14,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   btnText: {
//     fontWeight: '700',
//     fontSize: 16,
//   },

//   privacy: {
//     fontSize: 14,
//     marginTop: 16,
//     opacity: 0.7,
//   },
//   terms: {
//     fontSize: 14,
//     marginTop: 6,
//     textDecorationLine: 'underline',
//     opacity: 0.7,
//   },
// });

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { sendOtp } from '../../services/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const { t } = useLanguage();

  const onSend = async () => {
    if (phone.length !== 10) {
      return Alert.alert(t('error_title'), t('enter_valid_phone_alert'));
    }

    setLoading(true);
    try {
      await sendOtp(phone);
      Alert.alert(t('otp_sent'));
      navigation.navigate('Otp', { phone });
    } catch (err: any) {
      Alert.alert(t('error_title'), err.message ?? 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = phone.length !== 10 || loading;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* MAIN CONTENT */}
      <View style={styles.content}>

        <Text style={[styles.title, { color: theme.text }]}>
          {t('enter_mobile_number')}
        </Text>

        {/* Phone input */}
        <View style={[styles.phoneRow, { borderColor: theme.text }]}>
          <Text style={[styles.countryCode, { color: theme.text }]}>+91</Text>

          <TextInput
            style={[styles.phoneInput, { color: theme.text }]}
            keyboardType="number-pad"
            maxLength={10}
            placeholder={t('mobile_placeholder')}
            placeholderTextColor={theme.placeholder}
            value={phone}
            onChangeText={(text) => {
              const digitsOnly = text.replace(/[^0-9]/g, '');
              setPhone(digitsOnly);
            }}
          />
        </View>

        {/* Send OTP */}
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: theme.primary,
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
          onPress={onSend}
          disabled={isDisabled}
        >
         <Text style={[styles.btnText, {color :theme.text}]}>{t('send_otp')}</Text>
        </TouchableOpacity>

      </View>

      {/* FOOTER (FIXED AT BOTTOM) */}
      <View style={styles.footer}>
        <Text style={[styles.privacy, { color: theme.text }]}>
          {t('privacy_note')}
        </Text>

        <Text style={[styles.terms, { color: theme.text }]}>
          {t('terms_note')}
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
   
  },

  content: {
    flex: 1, // pushes footer to bottom
     justifyContent: 'center', // ✅ vertical center
     paddingBottom:50,
     paddingTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },

  btn: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  btnText: {
    fontWeight: '700',
    fontSize: 16,
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 10,
  },

  privacy: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },

  terms: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    textDecorationLine: 'underline',
    opacity: 0.7,
  },
});

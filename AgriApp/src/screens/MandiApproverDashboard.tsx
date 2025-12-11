// // // // import React from 'react';
// // // // import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { RootStackParamList } from '../../App';

// // // // import { useTheme } from '../context/ThemeContext';
// // // // import { useLanguage } from '../context/LanguageContext';

// // // // export default function MandiApproverDashboard() {
// // // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // // //   const { theme } = useTheme();
// // // //   const { t } = useLanguage();

// // // //   const goBack = () => navigation.navigate('Dashboard');

// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // // //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // // //         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
// // // //       </TouchableOpacity>

// // // //       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_approver_dashboard') ?? 'Mandi Approver'}</Text>
// // // //       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_approver_msg') ?? 'Welcome, you are logged in as a Mandi Approver.'}</Text>
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, padding: 20 },
// // // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// // // //   text: { fontSize: 16 },
// // // //   backText: { fontWeight: '700', fontSize: 16 },
// // // //   backBtn: {
// // // //     alignSelf: 'flex-start',
// // // //     backgroundColor: '#edf2f7',
// // // //     paddingVertical: 6,
// // // //     paddingHorizontal: 12,
// // // //     borderRadius: 6,
// // // //     marginBottom: 10,
// // // //   },
// // // // });

// // // import React, { useEffect, useState } from 'react';
// // // import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import api from '../services/api';

// // // type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

// // // export default function MandiApproverDashboard() {
// // //   const navigation = useNavigation<NavProp>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const [loadingProfile, setLoadingProfile] = useState(true);
// // //   const [mandiId, setMandiId] = useState<number | null>(null);
// // //   const [approverName, setApproverName] = useState<string>('');

// // //   useEffect(() => {
// // //     const loadProfile = async () => {
// // //       setLoadingProfile(true);
// // //       try {
// // //         const res = await api.get('/mandi-official/profile');
// // //         const data = res?.data ?? null;
// // //         if (!data) throw new Error('Profile not found');

// // //         const mid = data.mandiId ?? data.MandiId ?? null;
// // //         const name = data.officialName ?? data.OfficialName ?? '';

// // //         if (!mid) {
// // //           // It's okay to allow navigation later; show alert so user knows
// // //           Alert.alert(
// // //             t('error_title') ?? 'Error',
// // //             t('mandi_not_found_profile') ?? 'No mandi is linked to this approver profile.'
// // //           );
// // //         }

// // //         setMandiId(mid ? Number(mid) : null);
// // //         setApproverName(String(name));
// // //       } catch (err) {
// // //         console.log('MandiApproverDashboard: profile load failed', err);
// // //         Alert.alert(
// // //           t('error_title') ?? 'Error',
// // //           t('profile_fetch_failed') ?? 'Failed to load profile.'
// // //         );
// // //       } finally {
// // //         setLoadingProfile(false);
// // //       }
// // //     };

// // //     loadProfile();
// // //   }, [t]);

// // //   const goBack = () => navigation.navigate('Dashboard');

// // //   const openArrivedLots = () => {
// // //     if (!mandiId) {
// // //       // if mandiId missing, navigate with 0 so list screen can prompt/select
// // //       navigation.navigate('ArrivedLotsList', { mandiId: 0 });
// // //     } else {
// // //       navigation.navigate('ArrivedLotsList', { mandiId });
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
// // //       </TouchableOpacity>

// // //       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_approver_dashboard') ?? 'Mandi Approver'}</Text>
// // //       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_approver_msg') ?? 'Welcome, you are logged in as a Mandi Approver.'}</Text>

// // //       <View style={{ marginTop: 20 }}>
// // //         <View style={{ marginBottom: 12 }}>
// // //           <Text style={{ color: theme.text, fontWeight: '700' }}>
// // //             {t('approver_name_label') ?? 'Approver'}: {approverName || '-'}
// // //           </Text>
// // //           <Text style={{ color: theme.text, marginTop: 6 }}>
// // //             {t('mandi_label') ?? 'Mandi'}: {mandiId ? `#${mandiId}` : t('not_linked') ?? 'Not linked'}
// // //           </Text>
// // //         </View>

// // //         <TouchableOpacity
// // //           style={[styles.primaryButton]}
// // //           onPress={openArrivedLots}
// // //         >
// // //           {loadingProfile ? (
// // //             <ActivityIndicator color="#fff" />
// // //           ) : (
// // //             <Text style={styles.primaryButtonText}>{t('view_arrived_lots') ?? 'View Arrived Lots'}</Text>
// // //           )}
// // //         </TouchableOpacity>
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// // //   text: { fontSize: 16 },
// // //   backText: { fontWeight: '700', fontSize: 16 },
// // //   backBtn: {
// // //     alignSelf: 'flex-start',
// // //     backgroundColor: '#edf2f7',
// // //     paddingVertical: 6,
// // //     paddingHorizontal: 12,
// // //     borderRadius: 6,
// // //     marginBottom: 10,
// // //   },
// // //   primaryButton: {
// // //     backgroundColor: '#2563eb',
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 16,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //   },
// // //   primaryButtonText: { color: '#fff', fontWeight: '700' },
// // // });

// // import React, { useEffect, useState } from 'react';
// // import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import api from '../services/api';

// // type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

// // export default function MandiApproverDashboard() {
// //   const navigation = useNavigation<NavProp>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const [loadingProfile, setLoadingProfile] = useState(true);
// //   const [mandiId, setMandiId] = useState<number | null>(null);
// //   const [mandiName, setMandiName] = useState<string>('');
// //   const [approverName, setApproverName] = useState<string>('');

// //   useEffect(() => {
// //     const loadProfile = async () => {
// //       setLoadingProfile(true);
// //       try {
// //         const res = await api.get('/mandi-official/profile');
// //         const data = res?.data ?? null;
// //         if (!data) throw new Error('Profile not found');

// //         const mid = data.mandiId ?? data.MandiId ?? null;
// //         const mname = data.mandiName ?? data.MandiName ?? '';
// //         const name = data.officialName ?? data.OfficialName ?? '';

// //         if (!mid) {
// //           Alert.alert(
// //             t('error_title') ?? 'Error',
// //             t('mandi_not_found_profile') ?? 'No mandi is linked to this approver profile.'
// //           );
// //         }

// //         setMandiId(mid ? Number(mid) : null);
// //         setMandiName(String(mname));
// //         setApproverName(String(name));
// //       } catch (err) {
// //         console.log('MandiApproverDashboard: profile load failed', err);
// //         Alert.alert(
// //           t('error_title') ?? 'Error',
// //           t('profile_fetch_failed') ?? 'Failed to load profile.'
// //         );
// //       } finally {
// //         setLoadingProfile(false);
// //       }
// //     };

// //     loadProfile();
// //   }, [t]);

// //   const goBack = () => navigation.navigate('Dashboard');

// //   const openArrivedLots = () => {
// //     navigation.navigate('ApproverArrivedLotList', { mandiId: mandiId ?? 0 });
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// //         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
// //       </TouchableOpacity>

// //       <Text style={[styles.title, { color: theme.text }]}>
// //         {t('mandi_approver_dashboard') ?? 'Mandi Approver'}
// //       </Text>

// //       <Text style={[styles.text, { color: theme.text }]}>
// //         {t('mandi_approver_msg') ?? 'Welcome, you are logged in as a Mandi Approver.'}
// //       </Text>

// //       {/* Approver + Mandi Info */}
// //       <View style={{ marginTop: 20, marginBottom: 20 }}>
// //         <Text style={{ color: theme.text, fontWeight: '700' }}>
// //           {t('approver_name_label') ?? 'Approver'}: {approverName || '-'}
// //         </Text>

// //         {/* SHOWING MANDI NAME HERE */}
// //         <Text style={{ color: theme.text, marginTop: 6 }}>
// //           {t('mandi_label') ?? 'Mandi'}: {mandiName || (mandiId ? `#${mandiId}` : 'Not linked')}
// //         </Text>
// //       </View>

// //       {/* View Arrived Lots Button */}
// //       <TouchableOpacity
// //         style={styles.primaryButton}
// //         onPress={openArrivedLots}
// //         disabled={loadingProfile}
// //       >
// //         {loadingProfile ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.primaryButtonText}>
// //             {t('view_arrived_lots') ?? 'View Arrived Lots'}
// //           </Text>
// //         )}
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// //   text: { fontSize: 16 },

// //   backText: { fontWeight: '700', fontSize: 16 },
// //   backBtn: {
// //     alignSelf: 'flex-start',
// //     backgroundColor: '#edf2f7',
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     borderRadius: 6,
// //     marginBottom: 10,
// //   },

// //   primaryButton: {
// //     backgroundColor: '#2563eb',
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   primaryButtonText: { color: '#fff', fontWeight: '700' },
// // });

// import React, { useEffect, useState } from 'react';
// import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';

// type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

// export default function MandiApproverDashboard() {
//   const navigation = useNavigation<NavProp>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [mandiId, setMandiId] = useState<number | null>(null);
//   const [mandiName, setMandiName] = useState<string>('');
//   const [approverName, setApproverName] = useState<string>('');

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const res = await api.get('/mandi-official/profile');
//         const data = res?.data ?? null;

//         setApproverName(data.officialName);
//         setMandiId(data.mandiId);
//         setMandiName(data.mandiName);
//       } catch (err) {
//         Alert.alert('Error', 'Failed to load profile');
//       } finally {
//         setLoadingProfile(false);
//       }
//     };
//     loadProfile();
//   }, []);

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
//       <Text style={[styles.title, { color: theme.text }]}>Mandi Approver Dashboard</Text>

//       <Text style={[styles.text, { color: theme.text }]}>
//         Approver: {approverName}
//       </Text>

//       <Text style={[styles.text, { color: theme.text, marginTop: 6 }]}>
//         Mandi: {mandiName}
//       </Text>

//       <View style={{ marginTop: 30 }}>
//         <TouchableOpacity
//           style={styles.primaryButton}
//           onPress={() => navigation.navigate('ArrivedLotsApprover', { mandiId })}
//         >
//           {loadingProfile ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.primaryButtonText}>View Arrived Lots</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
//   text: { fontSize: 16 },
//   primaryButton: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
// });

import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

export default function MandiApproverDashboard() {
  const navigation = useNavigation<NavProp>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [mandiId, setMandiId] = useState<number | null>(null);
  const [mandiName, setMandiName] = useState<string>('');
  const [approverName, setApproverName] = useState<string>('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/mandi-official/profile');
        const data = res?.data ?? null;

        setApproverName(data.officialName ?? '');
        setMandiId(data.mandiId ?? null);
        setMandiName(data.mandiName ?? '');
      } catch (err) {
        Alert.alert(t('error_title') ?? 'Error', t('profile_fetch_failed') ?? 'Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      <Text style={[styles.title, { color: theme.text }]}>
        {t('mandi_approver_dashboard') ?? 'Mandi Approver Dashboard'}
      </Text>

      <Text style={[styles.text, { color: theme.text }]}>
        {t('approver_name') ?? 'Approver'}: {approverName}
      </Text>

      <Text style={[styles.text, { color: theme.text, marginTop: 6 }]}>
        {t('mandi_label') ?? 'Mandi'}: {mandiName}
      </Text>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate('ArrivedLotsApprover', { mandiId: mandiId ?? 0 })}
        >
          {loadingProfile ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.primaryButtonText, { color: theme.text }]}>
              {t('view_arrived_lots') ?? 'View Arrived Lots'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  text: { fontSize: 16 },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: { fontWeight: '700', fontSize: 16 },
});

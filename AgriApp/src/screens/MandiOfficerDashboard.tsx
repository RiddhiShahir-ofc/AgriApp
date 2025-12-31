// // // // src/screens/MandiOfficerDashboard.tsx
// // // import React from 'react';
// // // import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';

// // // export default function MandiOfficerDashboard() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const goBack = () => navigation.navigate('Dashboard');

// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
// // //       </TouchableOpacity>

// // //       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_officer_dashboard') ?? 'Mandi Officer'}</Text>
// // //       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_officer_msg') ?? 'Welcome, you are logged in as a Mandi Officer.'}</Text>
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
// // // });

// // import React from 'react';
// // import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // export default function MandiOfficerDashboard() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const goBack = () => navigation.navigate('Dashboard');

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// //         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
// //       </TouchableOpacity>

// //       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_officer_dashboard')}</Text>
// //       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_officer_msg')}</Text>

// //       <View style={{ marginTop: 20 }}>
// //         <TouchableOpacity
// //           style={[styles.primaryButton]}
// //           onPress={() => navigation.navigate('RegisterLot')}
// //         >
// //           <Text style={styles.primaryButtonText}>{t('register_lot_btn')}</Text>
// //         </TouchableOpacity>
// //       </View>
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
// //     backgroundColor: '#10b981',
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   primaryButtonText: { color: '#fff', fontWeight: '700' },
// // });

// // src/screens/MandiOfficerDashboard.tsx
// import React, { useEffect, useState } from 'react';
// import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';

// export default function MandiOfficerDashboard() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [mandiId, setMandiId] = useState<number | null>(null);

//   useEffect(() => {
//     const loadProfile = async () => {
//       setLoadingProfile(true);
//       try {
//         const res = await api.get('/mandi-official/profile');
//         if (res && res.data) {
//           const data = res.data;
//           const mid = data.mandiId ?? data.MandiId ?? null;
//           if (mid) setMandiId(Number(mid));
//         }
//       } catch (err) {
//         // ignore — list screen will let user select mandi if profile missing
//         console.log('MandiOfficerDashboard: profile load failed', err);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };
//     loadProfile();
//   }, []);

//   const goBack = () => navigation.navigate('Dashboard');

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
//         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
//       </TouchableOpacity>

//       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_officer_dashboard')}</Text>
//       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_officer_msg')}</Text>

//       <View style={{ marginTop: 20 }}>
//         <TouchableOpacity
//           style={[styles.primaryButton]}
//           onPress={() => navigation.navigate('RegisterLot')}
//         >
//           <Text style={styles.primaryButtonText}>{t('register_lot_btn')}</Text>
//         </TouchableOpacity>

//         <View style={{ height: 12 }} />

//         <TouchableOpacity
//           style={[styles.secondaryButton]}
//           onPress={() => navigation.navigate('ArrivedLotsList', { mandiId: mandiId ?? 0 })}
//         >
//           {loadingProfile ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.secondaryButtonText}>{t('view_arrived_lots') ?? 'View Arrived Lots'}</Text>
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
//   backText: { fontWeight: '700', fontSize: 16 },
//   backBtn: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#edf2f7',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   primaryButton: {
//     backgroundColor: '#10b981',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   primaryButtonText: { color: '#fff', fontWeight: '700' },
//   secondaryButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   secondaryButtonText: { color: '#fff', fontWeight: '700' },
// });


import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import AppHamburgerMenu from '../components/AppHamburgerMenu';

type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

export default function MandiOfficerDashboard() {
  const navigation = useNavigation<NavProp>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [mandiId, setMandiId] = useState<number | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await api.get('/mandi-official/profile');
        if (res && res.data) {
          const data = res.data;
          const mid = data.mandiId ?? data.MandiId ?? null;
          if (mid) setMandiId(Number(mid));
        }
      } catch (err) {
        // ignore — list screen will let user select mandi if profile missing
        console.log('MandiOfficerDashboard: profile load failed', err);
      } finally {
        setLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

  const goBack = () => navigation.navigate('Dashboard');

  return (
    // <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
    //   <TouchableOpacity onPress={goBack} style={styles.backBtn}>
    //     <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
    //   </TouchableOpacity>

//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//   <TouchableOpacity onPress={goBack} style={styles.backBtn}>
//     <Text style={[styles.backText, { color: theme.primary }]}>
//       {t('back')}
//     </Text>
//   </TouchableOpacity>

// <AppHamburgerMenu role="mandiofficial" />

  <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={[styles.backText, { color: theme.primary }]}>
            {t('back') ?? 'Back'}
          </Text>
        </TouchableOpacity>
        <AppHamburgerMenu role="mandiofficial" />

      <Text style={[styles.title, { color: theme.text }]}>{t('mandi_officer_dashboard')}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{t('mandi_officer_msg')}</Text>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.primaryButton]}
          onPress={() => navigation.navigate('RegisterLot')}
        >
          <Text style={styles.primaryButtonText}>{t('register_lot_btn')}</Text>
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <TouchableOpacity
          style={[styles.secondaryButton]}
          onPress={() => navigation.navigate('ArrivedLotsList', { mandiId: mandiId ?? 0 })}
        >
          {loadingProfile ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.secondaryButtonText}>{t('view_arrived_lots') ?? 'View Arrived Lots'}</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <TouchableOpacity
          style={[styles.tertiaryButton]}
          onPress={() => navigation.navigate('AuctionsList', { mandiId: mandiId ?? 0 })}
        >
          {loadingProfile ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.tertiaryButtonText}>{t('view_auction_schedule_btn') ?? 'View Auctions'}</Text>
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
  backText: { fontWeight: '700', fontSize: 16 },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#edf2f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },

  secondaryButton: {
    backgroundColor: '#0fcb64ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#fff', fontWeight: '700' },

  tertiaryButton: {
    backgroundColor: '#139a4bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  tertiaryButtonText: { color: '#fff', fontWeight: '700' },
});

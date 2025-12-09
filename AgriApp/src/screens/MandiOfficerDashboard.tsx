// // src/screens/MandiOfficerDashboard.tsx
// import React from 'react';
// import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// export default function MandiOfficerDashboard() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const goBack = () => navigation.navigate('Dashboard');

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
//         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
//       </TouchableOpacity>

//       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_officer_dashboard') ?? 'Mandi Officer'}</Text>
//       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_officer_msg') ?? 'Welcome, you are logged in as a Mandi Officer.'}</Text>
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
// });

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function MandiOfficerDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const goBack = () => navigation.navigate('Dashboard');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>{t('mandi_officer_dashboard')}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{t('mandi_officer_msg')}</Text>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.primaryButton]}
          onPress={() => navigation.navigate('RegisterLot')}
        >
          <Text style={styles.primaryButtonText}>{t('register_lot_btn')}</Text>
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
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
});

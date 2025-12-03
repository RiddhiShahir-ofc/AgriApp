// // import React from 'react';
// // import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // export default function MandiOfficialRegister() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const handleSubmit = () => {
// //     Alert.alert(
// //       t('success_title'),
// //       t('mandi_official_reg_success'),
// //       [
// //         {
// //           text: t('ok'),
// //           onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MandiOfficialDashboard' }] }),
// //         },
// //       ]
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
// //       <Text style={[styles.title,{color:theme.text}]}>{t('mandi_official_reg')}</Text>
// //       <TextInput placeholder={t('official_name')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('official_id')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('assigned_mandi')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('location')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('official_role')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TextInput placeholder={t('email_id')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} />
// //       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
// //       <Text style={[styles.btnText,{color:theme.text}]}>{t('register')}</Text>
        
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
// //   btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
// //   btnText: { fontWeight: '700' },
// // });

// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DropDownPicker from 'react-native-dropdown-picker';

// import { RootStackParamList } from '../../App';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import { addRole } from '../utils/storage';
// import api from '../services/api';

// type PropsNav = NativeStackNavigationProp<RootStackParamList, 'MandiOfficialRegister'>;

// type OfficialRoleDto = {
//   officialRoleId: string;
//   officialRoleName: string;
//   roleCode: string;
// };

// const MandiOfficialRegister: React.FC = () => {
//   const navigation = useNavigation<PropsNav>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [officialName, setOfficialName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [email, setEmail] = useState('');
//   const [mandiId, setMandiId] = useState(''); // will be parsed to number

//   // Roles dropdown
//   const [rolesOpen, setRolesOpen] = useState(false);
//   const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
//   const [roleItems, setRoleItems] = useState<{ label: string; value: string }[]>([]);

//   const [submitting, setSubmitting] = useState(false);

//   // ---------------- Load roles from /api/mandi-official/roles ----------------
//   useEffect(() => {
//     const loadRoles = async () => {
//       try {
//         const res = await api.get('/mandi-official/roles');
//         const data = res.data as OfficialRoleDto[];

//         const mapped = data.map((r) => ({
//           label: r.officialRoleName ?? r.roleCode ?? 'Role',
//           value: r.officialRoleId,
//         }));

//         setRoleItems(mapped);
//       } catch (err: any) {
//         console.log('Mandi roles fetch error:', err?.response?.data ?? err);
//         Alert.alert(
//           t('error_title') ?? 'Error',
//           t('error_loading_roles') ?? 'Failed to load official roles from server.'
//         );
//       }
//     };

//     loadRoles();
//   }, [t]);

//   // ---------------- Call backend /api/mandi-official/register ----------------
//   const registerMandiOfficialOnBackend = async () => {
//     const mandiIdNumber = Number(mandiId);
//     if (Number.isNaN(mandiIdNumber)) {
//       throw new Error(t('invalid_mandi_id') ?? 'Mandi ID must be a valid number.');
//     }

//     if (!selectedRoleId) {
//       throw new Error(t('select_role') ?? 'Please select an official role.');
//     }

//     const payload = {
//       officialName: officialName,
//       employeeId: employeeId,
//       email: email,
//       mandiId: mandiIdNumber,
//       officialRoleId: selectedRoleId,
//     };

//     console.log('MandiOfficial payload:', payload);

//     const res = await api.post('/mandi-official/register', payload);
//     console.log('MandiOfficial response:', res.status, res.data);

//     if (!res.status.toString().startsWith('2')) {
//       throw new Error(res.data?.message || 'Mandi official registration failed');
//     }
//   };

//   // ---------------- Submit handler ----------------
//   const handleSubmit = async () => {
//     if (!officialName || !employeeId || !email || !mandiId) {
//       return Alert.alert(
//         t('missing_fields') ?? 'Missing fields',
//         t('fill_fields') ?? 'Please fill all required fields.'
//       );
//     }

//     if (!selectedRoleId) {
//       return Alert.alert(
//         t('missing_fields') ?? 'Missing fields',
//         t('select_role') ?? 'Please select an official role.'
//       );
//     }

//     setSubmitting(true);
//     try {
//       const token = await AsyncStorage.getItem('ACCESS_TOKEN');
//       if (!token) {
//         setSubmitting(false);
//         return Alert.alert(
//           t('error_title') ?? 'Error',
//          'You must be logged in to register as a mandi official.'
//         );
//       }

//       // 1) call backend
//       await registerMandiOfficialOnBackend();

//       // 2) mark role locally
//       const phone = (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
//       if (phone) await addRole(phone, 'mandi');
//       await AsyncStorage.setItem('LOGGED_IN_ROLE', 'mandi');

//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('mandi_official_reg_success') ?? 'Mandi official registered successfully',
//         [
//           {
//             text: t('ok') ?? 'OK',
//             onPress: () =>
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'MandiOfficialDashboard' }],
//               }),
//           },
//         ]
//       );
//     } catch (err: any) {
//       console.log(
//         'Mandi official registration error:',
//         err?.response?.data ?? err?.message ?? err
//       );
//       const msg =
//         err?.response?.data?.message ??
//         t('mandi_official_reg_failed') ??
//         'Mandi official registration failed';
//       Alert.alert(t('error_title') ?? 'Error', msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text style={[styles.title, { color: theme.text }]}>
//           {t('mandi_official_reg')}
//         </Text>

//         <TextInput
//           placeholder={t('official_name')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//           value={officialName}
//           onChangeText={setOfficialName}
//         />
//         <TextInput
//           placeholder={t('official_id')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//           value={employeeId}
//           onChangeText={setEmployeeId}
//         />
//         <TextInput
//           placeholder={t('email_id')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           placeholder={t('assigned_mandi')} // This should be the numeric mandiId
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//           value={mandiId}
//           onChangeText={setMandiId}
//           keyboardType="numeric"
//         />

//         {/* Official Role dropdown */}
//         <View style={{ zIndex: 2000, marginBottom: 10 }}>
//           <DropDownPicker
//             open={rolesOpen}
//             value={selectedRoleId}
//             items={roleItems}
//             setOpen={setRolesOpen}
//             setValue={setSelectedRoleId}
//             setItems={setRoleItems}
//             placeholder={t('official_role')}
//             listMode="MODAL"
//             modalTitle={t('official_role')}
//             searchable
//             zIndex={2000}
//             zIndexInverse={1000}
//             style={{ borderColor: theme.text }}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.btn, submitting && { opacity: 0.6 }]}
//           onPress={handleSubmit}
//           disabled={submitting}
//         >
//           <Text style={[styles.btnText, { color: '#fff' }]}>
//             {submitting ? t('loading') ?? 'Submitting...' : t('register')}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MandiOfficialRegister;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
//   btn: {
//     backgroundColor: '#2b6cb0',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   btnText: { fontWeight: '700' },
// });

import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import { RootStackParamList } from '../../App';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { addRole } from '../utils/storage';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<
  RootStackParamList,
  'MandiOfficialRegister'
>;

type OfficialRoleDto = {
  officialRoleId: string;
  officialRoleName: string;
  roleCode: string;
};

type MandiDto = {
  mandiId: number;
  mandiName: string;
  location: string;
};

const MandiOfficialRegister: React.FC = () => {
  const navigation = useNavigation<PropsNav>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [officialName, setOfficialName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');

  // ------- Mandi dropdown -------
  const [mandiOpen, setMandiOpen] = useState(false);
  const [selectedMandiId, setSelectedMandiId] = useState<string | null>(null);
  const [mandiItems, setMandiItems] = useState<
    { label: string; value: string }[]
  >([]);

  // ------- Role dropdown -------
  const [rolesOpen, setRolesOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [roleItems, setRoleItems] = useState<
    { label: string; value: string }[]
  >([]);

  const [submitting, setSubmitting] = useState(false);

  // --------------- Load roles from /mandi-official/roles ---------------
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await api.get('/mandi-official/roles');
        const data = res.data as OfficialRoleDto[];

        const mapped = data.map((r) => ({
          label: r.officialRoleName ?? r.roleCode ?? 'Role',
          value: r.officialRoleId,
        }));

        setRoleItems(mapped);
      } catch (err: any) {
        console.log('Mandi roles fetch error:', err?.response?.data ?? err);
        Alert.alert(
          t('error_title') ?? 'Error',
          t('error_loading_roles') ??
            'Failed to load official roles from server.'
        );
      }
    };

    loadRoles();
  }, [t]);

  // --------------- Load mandis from /mandis ---------------
  useEffect(() => {
    const loadMandis = async () => {
      try {
        const res = await api.get('/mandis');
        const data = res.data as MandiDto[];

        const mapped = data.map((m) => ({
          label: `${m.mandiName} - ${m.location}`,
          value: String(m.mandiId),
        }));

        setMandiItems(mapped);
      } catch (err: any) {
        console.log('Mandis fetch error:', err?.response?.data ?? err);
        Alert.alert(
          t('error_title') ?? 'Error',
          t('error_loading_mandis') ??
            'Failed to load mandis from server.'
        );
      }
    };

    loadMandis();
  }, [t]);

  // --------------- Call backend /api/mandi-official/register ---------------
  const registerMandiOfficialOnBackend = async () => {
    if (!selectedMandiId) {
      throw new Error(
        t('select_mandi') ?? 'Please select an assigned mandi.'
      );
    }

    if (!selectedRoleId) {
      throw new Error(
        t('select_role') ?? 'Please select an official role.'
      );
    }

    const mandiIdNumber = Number(selectedMandiId);
    if (Number.isNaN(mandiIdNumber)) {
      throw new Error(
        t('invalid_mandi_id') ?? 'Entered Mandi Id is invalid.'
      );
    }

    const payload = {
      officialName: officialName,
      employeeId: employeeId,
      email: email,
      mandiId: mandiIdNumber,
      officialRoleId: selectedRoleId,
    };

    console.log('MandiOfficial payload:', payload);

    const res = await api.post('/mandi-official/register', payload);
    console.log('MandiOfficial response:', res.status, res.data);

    if (!res.status.toString().startsWith('2')) {
      throw new Error(
        res.data?.message || 'Mandi official registration failed'
      );
    }
  };

  // --------------- Submit ---------------
  const handleSubmit = async () => {
    if (!officialName || !employeeId || !email) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('fill_fields') ?? 'Please fill all required fields.'
      );
    }

    if (!selectedMandiId) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('select_mandi') ?? 'Please select an assigned mandi.'
      );
    }

    if (!selectedRoleId) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('select_role') ?? 'Please select an official role.'
      );
    }

    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (!token) {
        setSubmitting(false);
        return Alert.alert(
          t('error_title') ?? 'Error',
          'You must be logged in to register as a mandi official.'
        );
      }

      // 1) call backend
      await registerMandiOfficialOnBackend();

      // 2) mark role locally
      const phone =
        (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
      if (phone) await addRole(phone, 'mandi');
      await AsyncStorage.setItem('LOGGED_IN_ROLE', 'mandi');

      Alert.alert(
        t('success_title') ?? 'Success',
        t('mandi_official_reg_success') ??
          'Mandi official registered successfully',
        [
          {
            text: t('ok') ?? 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'MandiOfficialDashboard' }],
              }),
          },
        ]
      );
    } catch (err: any) {
      console.log(
        'Mandi official registration error:',
        err?.response?.data ?? err?.message ?? err
      );
      const msg =
        err?.response?.data?.message ??
        t('mandi_official_reg_failed') ??
        'Mandi official registration failed';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  // --------------- UI ---------------
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('mandi_official_reg')}
        </Text>

        <TextInput
          placeholder={t('official_name')}
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          value={officialName}
          onChangeText={setOfficialName}
        />
        <TextInput
          placeholder={t('official_id')}
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          value={employeeId}
          onChangeText={setEmployeeId}
        />
        <TextInput
          placeholder={t('email_id')}
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Assigned Mandi dropdown */}
        <View style={{ zIndex: 3000, marginBottom: 10 }}>
          <DropDownPicker
            open={mandiOpen}
            value={selectedMandiId}
            items={mandiItems}
            setOpen={setMandiOpen}
            setValue={setSelectedMandiId}
            setItems={setMandiItems}
            placeholder={t('assigned_mandi')}
            listMode="MODAL"
            modalTitle={t('assigned_mandi')}
            searchable
            zIndex={3000}
            zIndexInverse={1000}
            style={{ borderColor: theme.text }}
          />
        </View>

        {/* Official Role dropdown */}
        <View style={{ zIndex: 2000, marginBottom: 10 }}>
          <DropDownPicker
            open={rolesOpen}
            value={selectedRoleId}
            items={roleItems}
            setOpen={setRolesOpen}
            setValue={setSelectedRoleId}
            setItems={setRoleItems}
            placeholder={t('official_role')}
            listMode="MODAL"
            modalTitle={t('official_role')}
            searchable
            zIndex={2000}
            zIndexInverse={2000}
            style={{ borderColor: theme.text }}
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, submitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={[styles.btnText, { color: '#fff' }]}>
            {submitting ? t('loading') ?? 'Submitting...' : t('register')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MandiOfficialRegister;

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
  btnText: { fontWeight: '700' },
});

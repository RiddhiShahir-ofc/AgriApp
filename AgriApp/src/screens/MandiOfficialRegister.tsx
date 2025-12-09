// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   Alert,
// // // //   ScrollView,
// // // //   View,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // import DropDownPicker from 'react-native-dropdown-picker';

// // // // import { RootStackParamList } from '../../App';
// // // // import { useTheme } from '../context/ThemeContext';
// // // // import { useLanguage } from '../context/LanguageContext';
// // // // import { addRole } from '../utils/storage';
// // // // import api from '../services/api';

// // // // type PropsNav = NativeStackNavigationProp<RootStackParamList, 'MandiOfficialRegister'>;

// // // // type OfficialRoleDto = {
// // // //   officialRoleId: string;
// // // //   officialRoleName: string;
// // // //   roleCode: string;
// // // // };

// // // // const MandiOfficialRegister: React.FC = () => {
// // // //   const navigation = useNavigation<PropsNav>();
// // // //   const { theme } = useTheme();
// // // //   const { t } = useLanguage();

// // // //   const [officialName, setOfficialName] = useState('');
// // // //   const [employeeId, setEmployeeId] = useState('');
// // // //   const [email, setEmail] = useState('');
// // // //   const [mandiId, setMandiId] = useState(''); // will be parsed to number

// // // //   // Roles dropdown
// // // //   const [rolesOpen, setRolesOpen] = useState(false);
// // // //   const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
// // // //   const [roleItems, setRoleItems] = useState<{ label: string; value: string }[]>([]);

// // // //   const [submitting, setSubmitting] = useState(false);

// // // //   // ---------------- Load roles from /api/mandi-official/roles ----------------
// // // //   useEffect(() => {
// // // //     const loadRoles = async () => {
// // // //       try {
// // // //         const res = await api.get('/mandi-official/roles');
// // // //         const data = res.data as OfficialRoleDto[];

// // // //         const mapped = data.map((r) => ({
// // // //           label: r.officialRoleName ?? r.roleCode ?? 'Role',
// // // //           value: r.officialRoleId,
// // // //         }));

// // // //         setRoleItems(mapped);
// // // //       } catch (err: any) {
// // // //         console.log('Mandi roles fetch error:', err?.response?.data ?? err);
// // // //         Alert.alert(
// // // //           t('error_title') ?? 'Error',
// // // //           t('error_loading_roles') ?? 'Failed to load official roles from server.'
// // // //         );
// // // //       }
// // // //     };

// // // //     loadRoles();
// // // //   }, [t]);

// // // //   // ---------------- Call backend /api/mandi-official/register ----------------
// // // //   const registerMandiOfficialOnBackend = async () => {
// // // //     const mandiIdNumber = Number(mandiId);
// // // //     if (Number.isNaN(mandiIdNumber)) {
// // // //       throw new Error(t('invalid_mandi_id') ?? 'Mandi ID must be a valid number.');
// // // //     }

// // // //     if (!selectedRoleId) {
// // // //       throw new Error(t('select_role') ?? 'Please select an official role.');
// // // //     }

// // // //     const payload = {
// // // //       officialName: officialName,
// // // //       employeeId: employeeId,
// // // //       email: email,
// // // //       mandiId: mandiIdNumber,
// // // //       officialRoleId: selectedRoleId,
// // // //     };

// // // //     console.log('MandiOfficial payload:', payload);

// // // //     const res = await api.post('/mandi-official/register', payload);
// // // //     console.log('MandiOfficial response:', res.status, res.data);

// // // //     if (!res.status.toString().startsWith('2')) {
// // // //       throw new Error(res.data?.message || 'Mandi official registration failed');
// // // //     }
// // // //   };

// // // //   // ---------------- Submit handler ----------------
// // // //   const handleSubmit = async () => {
// // // //     if (!officialName || !employeeId || !email || !mandiId) {
// // // //       return Alert.alert(
// // // //         t('missing_fields') ?? 'Missing fields',
// // // //         t('fill_fields') ?? 'Please fill all required fields.'
// // // //       );
// // // //     }

// // // //     if (!selectedRoleId) {
// // // //       return Alert.alert(
// // // //         t('missing_fields') ?? 'Missing fields',
// // // //         t('select_role') ?? 'Please select an official role.'
// // // //       );
// // // //     }

// // // //     setSubmitting(true);
// // // //     try {
// // // //       const token = await AsyncStorage.getItem('ACCESS_TOKEN');
// // // //       if (!token) {
// // // //         setSubmitting(false);
// // // //         return Alert.alert(
// // // //           t('error_title') ?? 'Error',
// // // //          'You must be logged in to register as a mandi official.'
// // // //         );
// // // //       }

// // // //       // 1) call backend
// // // //       await registerMandiOfficialOnBackend();

// // // //       // 2) mark role locally
// // // //       const phone = (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
// // // //       if (phone) await addRole(phone, 'mandi');
// // // //       await AsyncStorage.setItem('LOGGED_IN_ROLE', 'mandi');

// // // //       Alert.alert(
// // // //         t('success_title') ?? 'Success',
// // // //         t('mandi_official_reg_success') ?? 'Mandi official registered successfully',
// // // //         [
// // // //           {
// // // //             text: t('ok') ?? 'OK',
// // // //             onPress: () =>
// // // //               navigation.reset({
// // // //                 index: 0,
// // // //                 routes: [{ name: 'MandiOfficialDashboard' }],
// // // //               }),
// // // //           },
// // // //         ]
// // // //       );
// // // //     } catch (err: any) {
// // // //       console.log(
// // // //         'Mandi official registration error:',
// // // //         err?.response?.data ?? err?.message ?? err
// // // //       );
// // // //       const msg =
// // // //         err?.response?.data?.message ??
// // // //         t('mandi_official_reg_failed') ??
// // // //         'Mandi official registration failed';
// // // //       Alert.alert(t('error_title') ?? 'Error', msg);
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   // ---------------- UI ----------------
// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // // //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// // // //         <Text style={[styles.title, { color: theme.text }]}>
// // // //           {t('mandi_official_reg')}
// // // //         </Text>

// // // //         <TextInput
// // // //           placeholder={t('official_name')}
// // // //           placeholderTextColor={theme.text}
// // // //           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // // //           value={officialName}
// // // //           onChangeText={setOfficialName}
// // // //         />
// // // //         <TextInput
// // // //           placeholder={t('official_id')}
// // // //           placeholderTextColor={theme.text}
// // // //           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // // //           value={employeeId}
// // // //           onChangeText={setEmployeeId}
// // // //         />
// // // //         <TextInput
// // // //           placeholder={t('email_id')}
// // // //           placeholderTextColor={theme.text}
// // // //           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // // //           value={email}
// // // //           onChangeText={setEmail}
// // // //           keyboardType="email-address"
// // // //           autoCapitalize="none"
// // // //         />
// // // //         <TextInput
// // // //           placeholder={t('assigned_mandi')} // This should be the numeric mandiId
// // // //           placeholderTextColor={theme.text}
// // // //           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // // //           value={mandiId}
// // // //           onChangeText={setMandiId}
// // // //           keyboardType="numeric"
// // // //         />

// // // //         {/* Official Role dropdown */}
// // // //         <View style={{ zIndex: 2000, marginBottom: 10 }}>
// // // //           <DropDownPicker
// // // //             open={rolesOpen}
// // // //             value={selectedRoleId}
// // // //             items={roleItems}
// // // //             setOpen={setRolesOpen}
// // // //             setValue={setSelectedRoleId}
// // // //             setItems={setRoleItems}
// // // //             placeholder={t('official_role')}
// // // //             listMode="MODAL"
// // // //             modalTitle={t('official_role')}
// // // //             searchable
// // // //             zIndex={2000}
// // // //             zIndexInverse={1000}
// // // //             style={{ borderColor: theme.text }}
// // // //           />
// // // //         </View>

// // // //         <TouchableOpacity
// // // //           style={[styles.btn, submitting && { opacity: 0.6 }]}
// // // //           onPress={handleSubmit}
// // // //           disabled={submitting}
// // // //         >
// // // //           <Text style={[styles.btnText, { color: '#fff' }]}>
// // // //             {submitting ? t('loading') ?? 'Submitting...' : t('register')}
// // // //           </Text>
// // // //         </TouchableOpacity>
// // // //       </ScrollView>
// // // //     </SafeAreaView>
// // // //   );
// // // // };

// // // // export default MandiOfficialRegister;

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, padding: 20 },
// // // //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// // // //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
// // // //   btn: {
// // // //     backgroundColor: '#2b6cb0',
// // // //     padding: 12,
// // // //     borderRadius: 8,
// // // //     alignItems: 'center',
// // // //   },
// // // //   btnText: { fontWeight: '700' },
// // // // });

// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Alert,
// // //   ScrollView,
// // //   View,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import DropDownPicker from 'react-native-dropdown-picker';

// // // import { RootStackParamList } from '../../App';
// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import { addRole } from '../utils/storage';
// // // import api from '../services/api';

// // // type PropsNav = NativeStackNavigationProp<
// // //   RootStackParamList,
// // //   'MandiOfficialRegister'
// // // >;

// // // type OfficialRoleDto = {
// // //   officialRoleId: string;
// // //   officialRoleName: string;
// // //   roleCode: string;
// // // };

// // // type MandiDto = {
// // //   mandiId: number;
// // //   mandiName: string;
// // //   location: string;
// // // };

// // // const MandiOfficialRegister: React.FC = () => {
// // //   const navigation = useNavigation<PropsNav>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const [officialName, setOfficialName] = useState('');
// // //   const [employeeId, setEmployeeId] = useState('');
// // //   const [email, setEmail] = useState('');

// // //   // ------- Mandi dropdown -------
// // //   const [mandiOpen, setMandiOpen] = useState(false);
// // //   const [selectedMandiId, setSelectedMandiId] = useState<string | null>(null);
// // //   const [mandiItems, setMandiItems] = useState<
// // //     { label: string; value: string }[]
// // //   >([]);

// // //   // ------- Role dropdown -------
// // //   const [rolesOpen, setRolesOpen] = useState(false);
// // //   const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
// // //   const [roleItems, setRoleItems] = useState<
// // //     { label: string; value: string }[]
// // //   >([]);

// // //   const [submitting, setSubmitting] = useState(false);

// // //   // --------------- Load roles from /mandi-official/roles ---------------
// // //   useEffect(() => {
// // //     const loadRoles = async () => {
// // //       try {
// // //         const res = await api.get('/mandi-official/roles');
// // //         const data = res.data as OfficialRoleDto[];

// // //         const mapped = data.map((r) => ({
// // //           label: r.officialRoleName ?? r.roleCode ?? 'Role',
// // //           value: r.officialRoleId,
// // //         }));

// // //         setRoleItems(mapped);
// // //       } catch (err: any) {
// // //         console.log('Mandi roles fetch error:', err?.response?.data ?? err);
// // //         Alert.alert(
// // //           t('error_title') ?? 'Error',
// // //           t('error_loading_roles') ??
// // //             'Failed to load official roles from server.'
// // //         );
// // //       }
// // //     };

// // //     loadRoles();
// // //   }, [t]);

// // //   // --------------- Load mandis from /mandis ---------------
// // //   useEffect(() => {
// // //     const loadMandis = async () => {
// // //       try {
// // //         const res = await api.get('/mandis');
// // //         const data = res.data as MandiDto[];

// // //         const mapped = data.map((m) => ({
// // //           label: `${m.mandiName} - ${m.location}`,
// // //           value: String(m.mandiId),
// // //         }));

// // //         setMandiItems(mapped);
// // //       } catch (err: any) {
// // //         console.log('Mandis fetch error:', err?.response?.data ?? err);
// // //         Alert.alert(
// // //           t('error_title') ?? 'Error',
// // //           t('error_loading_mandis') ??
// // //             'Failed to load mandis from server.'
// // //         );
// // //       }
// // //     };

// // //     loadMandis();
// // //   }, [t]);

// // //   // --------------- Call backend /api/mandi-official/register ---------------
// // //   const registerMandiOfficialOnBackend = async () => {
// // //     if (!selectedMandiId) {
// // //       throw new Error(
// // //         t('select_mandi') ?? 'Please select an assigned mandi.'
// // //       );
// // //     }

// // //     if (!selectedRoleId) {
// // //       throw new Error(
// // //         t('select_role') ?? 'Please select an official role.'
// // //       );
// // //     }

// // //     const mandiIdNumber = Number(selectedMandiId);
// // //     if (Number.isNaN(mandiIdNumber)) {
// // //       throw new Error(
// // //         t('invalid_mandi_id') ?? 'Entered Mandi Id is invalid.'
// // //       );
// // //     }

// // //     const payload = {
// // //       officialName: officialName,
// // //       employeeId: employeeId,
// // //       email: email,
// // //       mandiId: mandiIdNumber,
// // //       officialRoleId: selectedRoleId,
// // //     };

// // //     console.log('MandiOfficial payload:', payload);

// // //     const res = await api.post('/mandi-official/register', payload);
// // //     console.log('MandiOfficial response:', res.status, res.data);

// // //     if (!res.status.toString().startsWith('2')) {
// // //       throw new Error(
// // //         res.data?.message || 'Mandi official registration failed'
// // //       );
// // //     }
// // //   };

// // //   // --------------- Submit ---------------
// // //   const handleSubmit = async () => {
// // //     if (!officialName || !employeeId || !email || !selectedMandiId || !selectedRoleId) {
// // //       return Alert.alert(
// // //         t('missing_fields') ?? 'Missing fields',
// // //         t('fill_fields') ?? 'Please fill all required fields.'
// // //       );
// // //     }

// // //     if (!selectedMandiId) {
// // //       return Alert.alert(
// // //         t('missing_fields') ?? 'Missing fields',
// // //         t('select_mandi') ?? 'Please select an assigned mandi.'
// // //       );
// // //     }

// // //     if (!selectedRoleId) {
// // //       return Alert.alert(
// // //         t('missing_fields') ?? 'Missing fields',
// // //         t('select_role') ?? 'Please select an official role.'
// // //       );
// // //     }

// // //     setSubmitting(true);
// // //     try {
// // //       const token = await AsyncStorage.getItem('ACCESS_TOKEN');
// // //       if (!token) {
// // //         setSubmitting(false);
// // //         return Alert.alert(
// // //           t('error_title') ?? 'Error',
// // //           'You must be logged in to register as a mandi official.'
// // //         );
// // //       }

// // //       // 1) call backend
// // //       await registerMandiOfficialOnBackend();

// // //       // 2) mark role locally
// // //       const phone =
// // //         (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
// // //       if (phone) await addRole(phone, 'mandi');
// // //       await AsyncStorage.setItem('LOGGED_IN_ROLE', 'mandi');

// // //       Alert.alert(
// // //         t('success_title') ?? 'Success',
// // //         t('mandi_official_reg_success') ??
// // //           'Mandi official registered successfully',
// // //         [
// // //           {
// // //             text: t('ok') ?? 'OK',
// // //             onPress: () =>
// // //               navigation.reset({
// // //                 index: 0,
// // //                 routes: [{ name: 'MandiOfficialDashboard' }],
// // //               }),
// // //           },
// // //         ]
// // //       );
// // //     } catch (err: any) {
// // //       console.log(
// // //         'Mandi official registration error:',
// // //         err?.response?.data ?? err?.message ?? err
// // //       );
// // //       const msg =
// // //         err?.response?.data?.message ??
// // //         t('mandi_official_reg_failed') ??
// // //         'Mandi official registration failed';
// // //       Alert.alert(t('error_title') ?? 'Error', msg);
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   // --------------- UI ---------------
// // //   return (
// // //     <SafeAreaView
// // //       style={[styles.container, { backgroundColor: theme.background }]}
// // //     >
// // //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// // //         <Text style={[styles.title, { color: theme.text }]}>
// // //           {t('mandi_official_reg')}
// // //         </Text>

// // //         <TextInput
// // //           placeholder={t('official_name')}
// // //           placeholderTextColor={theme.text}
// // //           style={[
// // //             styles.input,
// // //             { color: theme.text, borderColor: theme.text },
// // //           ]}
// // //           value={officialName}
// // //           onChangeText={setOfficialName}
// // //         />
// // //         <TextInput
// // //           placeholder={t('official_id')}
// // //           placeholderTextColor={theme.text}
// // //           style={[
// // //             styles.input,
// // //             { color: theme.text, borderColor: theme.text },
// // //           ]}
// // //           value={employeeId}
// // //           onChangeText={setEmployeeId}
// // //         />
// // //         <TextInput
// // //           placeholder={t('email_id')}
// // //           placeholderTextColor={theme.text}
// // //           style={[
// // //             styles.input,
// // //             { color: theme.text, borderColor: theme.text },
// // //           ]}
// // //           value={email}
// // //           onChangeText={setEmail}
// // //           keyboardType="email-address"
// // //           autoCapitalize="none"
// // //         />

// // //         {/* Assigned Mandi dropdown */}
// // //         <View style={{ zIndex: 3000, marginBottom: 10 }}>
// // //           <DropDownPicker
// // //             open={mandiOpen}
// // //             value={selectedMandiId}
// // //             items={mandiItems}
// // //             setOpen={setMandiOpen}
// // //             setValue={setSelectedMandiId}
// // //             setItems={setMandiItems}
// // //             placeholder={t('assigned_mandi')}
// // //             listMode="MODAL"
// // //             modalTitle={t('assigned_mandi')}
// // //             searchable
// // //             zIndex={3000}
// // //             zIndexInverse={1000}
// // //             style={{ borderColor: theme.text }}
// // //           />
// // //         </View>

// // //         {/* Official Role dropdown */}
// // //         <View style={{ zIndex: 2000, marginBottom: 10 }}>
// // //           <DropDownPicker
// // //             open={rolesOpen}
// // //             value={selectedRoleId}
// // //             items={roleItems}
// // //             setOpen={setRolesOpen}
// // //             setValue={setSelectedRoleId}
// // //             setItems={setRoleItems}
// // //             placeholder={t('official_role')}
// // //             listMode="MODAL"
// // //             modalTitle={t('official_role')}
// // //             searchable
// // //             zIndex={2000}
// // //             zIndexInverse={2000}
// // //             style={{ borderColor: theme.text }}
// // //           />
// // //         </View>

// // //         <TouchableOpacity
// // //           style={[styles.btn, submitting && { opacity: 0.6 }]}
// // //           onPress={handleSubmit}
// // //           disabled={submitting}
// // //         >
// // //           <Text style={[styles.btnText, { color: '#fff' }]}>
// // //             {submitting ? t('loading') ?? 'Submitting...' : t('register')}
// // //           </Text>
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default MandiOfficialRegister;

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// // //   input: {
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     padding: 10,
// // //     marginBottom: 10,
// // //   },
// // //   btn: {
// // //     backgroundColor: '#2b6cb0',
// // //     padding: 12,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //   },
// // //   btnText: { fontWeight: '700' },
// // // });

// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ActivityIndicator,
// //   ScrollView,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import api from '../services/api';

// // type PropsNav = NativeStackNavigationProp<RootStackParamList, 'MandiOfficialRegister'>;

// // const MandiOfficialRegister: React.FC = () => {
// //   const navigation = useNavigation<PropsNav>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   //  status checking flag
// //   const [checkingStatus, setCheckingStatus] = useState(true);

// //   //  your existing form states below (example)
// //   const [officialName, setOfficialName] = useState('');
// //   const [employeeId, setEmployeeId] = useState('');
// //   const [email, setEmail] = useState('');

// //   // ... plus mandi, role dropdowns, etc.

// //   // 🔵 NEW: check if already registered as mandi official
// //   useEffect(() => {
// //     const checkStatus = async () => {
// //       try {
// //         const res = await api.get('/mandi-official/status');
// //         const isOfficial = res.data?.isMandiOfficial === true;

// //         if (isOfficial) {
// //           // Already registered → go directly to dashboard
// //           navigation.reset({
// //             index: 0,
// //             routes: [{ name: 'MandiOfficialDashboard' }],
// //           });
// //           return;
// //         }
// //       } catch (err) {
// //         console.log('Mandi official status error:', err);
// //         // On error, we still show the form (user can try to register)
// //       } finally {
// //         setCheckingStatus(false);
// //       }
// //     };

// //     checkStatus();
// //   }, [navigation]);

// //   // While checking, don't flash the form
// //   if (checkingStatus) {
// //     return (
// //       <SafeAreaView
// //         style={[
// //           styles.container,
// //           { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' },
// //         ]}
// //       >
// //         <ActivityIndicator size="large" color="#2b6cb0" />
// //         <Text style={{ marginTop: 10, color: theme.text }}>
         
// //         </Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   //  your existing UI form goes here
// //   const handleSubmit = async () => {
// //     try {
// //       // call /mandi-official/register
// //       // if success → redirect to dashboard
// //       // (you probably already have this logic)
// //       // ...
// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: 'MandiOfficialDashboard' }],
// //       });
// //     } catch (e: any) {
// //       console.log('Register mandi official error:', e?.response?.data ?? e);
// //       Alert.alert(
// //         t('error_title') ?? 'Error',
// //         e?.response?.data?.message ?? 'Failed to register mandi official',
// //       );
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// //         <Text style={[styles.title, { color: theme.text }]}>
// //           {t('mandi_official_reg') ?? 'Register as Mandi Official'}
// //         </Text>

// //         <TextInput
// //           placeholder={t('official_name') ?? 'Official Name'}
// //           placeholderTextColor={theme.text}
// //           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// //           value={officialName}
// //           onChangeText={setOfficialName}
// //         />

// //         <TextInput
// //           placeholder={t('official_id') ?? 'Employee ID'}
// //           placeholderTextColor={theme.text}
// //           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// //           value={employeeId}
// //           onChangeText={setEmployeeId}
// //         />

// //         <TextInput
// //           placeholder={t('email_id') ?? 'Email'}
// //           placeholderTextColor={theme.text}
// //           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// //           value={email}
// //           onChangeText={setEmail}
// //           keyboardType="email-address"
// //         />

// //         {/* your mandi dropdown, role dropdown, etc. */}
// //                 {/* Assigned Mandi dropdown */}
// //         <View style={{ zIndex: 3000, marginBottom: 10 }}>
// //           <DropDownPicker
// //             open={mandiOpen}
// //             value={selectedMandiId}
// //             items={mandiItems}
// //             setOpen={setMandiOpen}
// //             setValue={setSelectedMandiId}
// //             setItems={setMandiItems}
// //             placeholder={t('assigned_mandi')}
// //             listMode="MODAL"
// //             modalTitle={t('assigned_mandi')}
// //             searchable
// //             zIndex={3000}
// //             zIndexInverse={1000}
// //             style={{ borderColor: theme.text }}
// //           />
// //         </View>

// //         {/* Official Role dropdown */}
// //         <View style={{ zIndex: 2000, marginBottom: 10 }}>
// //           <DropDownPicker
// //             open={rolesOpen}
// //             value={selectedRoleId}
// //             items={roleItems}
// //             setOpen={setRolesOpen}
// //             setValue={setSelectedRoleId}
// //             setItems={setRoleItems}
// //             placeholder={t('official_role')}
// //             listMode="MODAL"
// //             modalTitle={t('official_role')}
// //             searchable
// //             zIndex={2000}
// //             zIndexInverse={2000}
// //             style={{ borderColor: theme.text }}
// //           />
// //         </View>

// //         <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
// //           <Text style={styles.btnText}>{t('register') ?? 'Register'}</Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default MandiOfficialRegister;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
// //   btn: {
// //     backgroundColor: '#2b6cb0',
// //     padding: 12,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   btnText: { color: '#fff', fontWeight: '700' },
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Picker } from '@react-native-picker/picker';

// import { RootStackParamList } from '../../App';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';

// type PropsNav = NativeStackNavigationProp<
//   RootStackParamList,
//   'MandiOfficialRegister'
// >;

// type MandiItem = { id: number; name: string; location: string };
// type RoleItem = { id: string; name: string; code: string };

// const MandiOfficialRegister: React.FC = () => {
//   const navigation = useNavigation<PropsNav>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // 🔵 STATUS CHECK FLAG
//   const [checkingStatus, setCheckingStatus] = useState(true);

//   // 🔵 FORM STATE (you can adjust labels as per your old form)
//   const [officialName, setOfficialName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [email, setEmail] = useState('');
//   const [selectedMandiId, setSelectedMandiId] = useState<number | null>(null);
//   const [selectedRoleId, setSelectedRoleId] = useState<string>('');

//   const [mandis, setMandis] = useState<MandiItem[]>([]);
//   const [roles, setRoles] = useState<RoleItem[]>([]);
//   const [submitting, setSubmitting] = useState(false);

//   // 🔵 1) CHECK STATUS ON MOUNT
//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const res = await api.get('/mandi-official/status');
//         const isOfficial = res.data?.isMandiOfficial === true;

//         if (isOfficial) {
//           // Already registered → go directly to dashboard
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'MandiOfficialDashboard' }],
//           });
//           return;
//         }
//       } catch (err) {
//         console.log('Mandi official status error:', err);
//         // On error, we still allow registration UI
//       } finally {
//         setCheckingStatus(false);
//       }
//     };

//     checkStatus();
//   }, [navigation]);

//   // 🔵 2) LOAD MANDIS + ROLES (for dropdowns)
//   useEffect(() => {
//     const loadMeta = async () => {
//       try {
//         const [mandiRes, roleRes] = await Promise.all([
//           api.get('/mandis'),
//           api.get('/mandi-official/roles'),
//         ]);

//         const mandiData = Array.isArray(mandiRes.data) ? mandiRes.data : [];
//         const roleData = Array.isArray(roleRes.data) ? roleRes.data : [];

//         const mappedMandis: MandiItem[] = mandiData
//           .map((m: any) => {
//             const id = m.mandiId ?? m.MandiId ?? m.id;
//             const name = m.mandiName ?? m.MandiName ?? m.name;
//             const loc = m.location ?? m.Location ?? '';
//             if (!id || !name) return null;
//             return {
//               id: Number(id),
//               name: String(name),
//               location: String(loc),
//             };
//           })
//           .filter(Boolean) as MandiItem[];

//         const mappedRoles: RoleItem[] = roleData
//           .map((r: any) => {
//             const id =
//               r.officialRoleId ?? r.OfficialRoleId ?? r.id ?? r.Id ?? '';
//             const name =
//               r.officialRoleName ?? r.OfficialRoleName ?? r.name ?? '';
//             const code = r.roleCode ?? r.RoleCode ?? '';
//             if (!id || !name) return null;
//             return {
//               id: String(id),
//               name: String(name),
//               code: String(code),
//             };
//           })
//           .filter(Boolean) as RoleItem[];

//         setMandis(mappedMandis);
//         setRoles(mappedRoles);
//       } catch (err) {
//         console.log('MandiOfficialRegister meta load error:', err);
//       }
//     };

//     loadMeta();
//   }, []);

//   // 🔵 SUBMIT HANDLER
//   const handleSubmit = async () => {
//     if (!officialName || !employeeId || !email || !selectedMandiId || !selectedRoleId) {
//       return Alert.alert(
//         t('missing_fields') ?? 'Missing fields',
//         t('fill_fields') ?? 'Please fill all required fields'
//       );
//     }

//     setSubmitting(true);
//     try {
//       const payload = {
//         officialName: officialName,
//         employeeId: employeeId,
//         email: email,
//         mandiId: selectedMandiId,
//         officialRoleId: selectedRoleId,
//       };

//       const res = await api.post('/mandi-official/register', payload);

//       if (!res.status.toString().startsWith('2')) {
//         throw new Error(res.data?.message || 'Mandi official registration failed');
//       }

//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('mandi_official_reg_success') ?? 'Mandi Official registered successfully',
//         [
//           {
//             text: t('ok') ?? 'OK',
//             onPress: () =>
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'MandiOfficialDashboard' }],
//               }),
//           },
//         ],
//       );
//     } catch (err: any) {
//       console.log(
//         'Mandi official registration error:',
//         err?.response?.data ?? err?.message ?? err,
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

//   // 🔵 SHOW LOADER WHILE CHECKING STATUS
//   if (checkingStatus) {
//     return (
//       <SafeAreaView
//         style={[
//           styles.container,
//           { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' },
//         ]}
//       >
//         <ActivityIndicator size="large" color="#2b6cb0" />
//         <Text style={{ marginTop: 10, color: theme.text }}>
//           {t('checking_status') ?? 'Checking registration status...'}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   // 🔵 ACTUAL REGISTRATION FORM
//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text style={[styles.title, { color: theme.text }]}>
//           {t('mandi_official_reg') ?? 'Register as Mandi Official'}
//         </Text>

//         {/* Official Name */}
//         <TextInput
//           placeholder={t('official_name') ?? 'Official Name'}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//           value={officialName}
//           onChangeText={setOfficialName}
//         />

//         {/* Employee ID */}
//         <TextInput
//           placeholder={t('official_id') ?? 'Employee ID'}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//           value={employeeId}
//           onChangeText={setEmployeeId}
//         />

//         {/* Email */}
//         <TextInput
//           placeholder={t('email_id') ?? 'Email'}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />

//         {/* Mandi Picker */}
//         <Text style={[styles.label, { color: theme.text }]}>
//           {t('mandi_label') ?? 'Mandi'}
//         </Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker
//             selectedValue={selectedMandiId ?? ''}
//             onValueChange={(v) => setSelectedMandiId(v ? Number(v) : null)}
//           >
//             <Picker.Item
//               label={t('select_mandi') ?? 'Select mandi'}
//               value=""
//             />
//             {mandis.map((m) => (
//               <Picker.Item
//                 key={m.id}
//                 label={`${m.name} (${m.location})`}
//                 value={m.id}
//               />
//             ))}
//           </Picker>
//         </View>

//         {/* Role Picker */}
//         <Text style={[styles.label, { color: theme.text }]}>
//           {t('official_role') ?? 'Official Role'}
//         </Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker
//             selectedValue={selectedRoleId}
//             onValueChange={(v) => setSelectedRoleId(v)}
//           >
//             <Picker.Item
//               label={t('select_role') ?? 'Select role'}
//               value=""
//             />
//             {roles.map((r) => (
//               <Picker.Item
//                 key={r.id}
//                 label={`${r.name} (${r.code})`}
//                 value={r.id}
//               />
//             ))}
//           </Picker>
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={[styles.btn, submitting && { opacity: 0.6 }]}
//           onPress={handleSubmit}
//           disabled={submitting}
//         >
//           <Text style={styles.btnText}>
//             {submitting
//               ? t('loading') ?? 'Submitting...'
//               : t('register') ?? 'Register'}
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
//   label: { marginBottom: 4, fontWeight: '600', marginTop: 8 },
//   pickerWrap: {
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   btn: {
//     backgroundColor: '#2b6cb0',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   btnText: { color: '#fff', fontWeight: '700' },
// });


import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../App';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<
  RootStackParamList,
  'MandiOfficialRegister'
>;

type MandiItem = { id: number; name: string; location: string };
type RoleItem = { id: string; name: string; code: string };

const TOKEN_KEY = 'ACCESS_TOKEN'; // change if you store under different key

// small jwt parse helper (no dependency)
const parseJwt = (token?: string | null): Record<string, any> | null => {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payloadBase64 = parts[1];

    // Some tokens use URL-safe base64 (replace -/_), Buffer handles it but ensure padding:
    let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Add required padding
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    const json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch (err) {
    console.log('parseJwt error', err);
    return null;
  }
};

// central redirect util: receives either profile object or role strings and routes accordingly
const redirectByRole = (payload: any, navigation: PropsNav) => {
  // Try role code -> prefer standardized codes (OFFICER/MANAGER/APPROVER)
  const roleCandidates: string[] = [];

  if (!payload) {
    // fallback
    navigation.reset({
      index: 0,
      routes: [{ name: 'MandiOfficialDashboard' }],
    });
    return;
  }

  // payload might be profile returned by /mandi-official/profile
  if (payload.OfficialRoleName) roleCandidates.push(String(payload.OfficialRoleName).toLowerCase());
  if (payload.officialRoleName) roleCandidates.push(String(payload.officialRoleName).toLowerCase());
  if (payload.roleCode) roleCandidates.push(String(payload.roleCode).toLowerCase());
  if (payload.RoleCode) roleCandidates.push(String(payload.RoleCode).toLowerCase());
  if (payload.role) {
    // role claim from JWT maybe string or array
    if (Array.isArray(payload.role)) {
      payload.role.forEach((r: string) => roleCandidates.push(String(r).toLowerCase()));
    } else {
      roleCandidates.push(String(payload.role).toLowerCase());
    }
  }
  if (payload.roles) {
    if (Array.isArray(payload.roles)) {
      payload.roles.forEach((r: string) => roleCandidates.push(String(r).toLowerCase()));
    } else {
      roleCandidates.push(String(payload.roles).toLowerCase());
    }
  }

  // match keywords (robust to different naming)
  const has = (kw: string) => roleCandidates.some((c) => c.includes(kw));

  if (has('officer') || has('mandiofficer') || has('officero')) {
    navigation.reset({ index: 0, routes: [{ name: 'MandiOfficerDashboard' }] });
    return;
  }
  if (has('manager') || has('mandimanager') || has('mgr')) {
    navigation.reset({ index: 0, routes: [{ name: 'MandiManagerDashboard' }] });
    return;
  }
  if (has('approver') || has('approve') || has('approver_role')) {
    navigation.reset({ index: 0, routes: [{ name: 'MandiApproverDashboard' }] });
    return;
  }

  // fallback: go to general mandi official dashboard
  navigation.reset({ index: 0, routes: [{ name: 'MandiOfficialDashboard' }] });
};

const MandiOfficialRegister: React.FC = () => {
  const navigation = useNavigation<PropsNav>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [checkingStatus, setCheckingStatus] = useState(true);
  const [officialName, setOfficialName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [selectedMandiId, setSelectedMandiId] = useState<number | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [mandis, setMandis] = useState<MandiItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // 1) CHECK STATUS ON MOUNT and if registered fetch profile and redirect by role
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get('/mandi-official/status');
        const isOfficial = res.data?.isMandiOfficial === true;

        if (isOfficial) {
          // fetch profile and redirect by role
          try {
            const profileRes = await api.get('/mandi-official/profile');
            const profile = profileRes.data;
            redirectByRole(profile, navigation);
            return;
          } catch (err) {
            // fallback: try to decode token for role claims
            try {
              const token = await AsyncStorage.getItem(TOKEN_KEY);
              const parsed = parseJwt(token ?? undefined);
              redirectByRole(parsed, navigation);
              return;
            } catch (ee) {
              console.log('fallback jwt parse failed', ee);
            }
            // last fallback: generic mandi dashboard
            navigation.reset({
              index: 0,
              routes: [{ name: 'MandiOfficialDashboard' }],
            });
            return;
          }
        }
      } catch (err) {
        console.log('Mandi official status error:', err);
        // allow registration UI if error
      } finally {
        setCheckingStatus(false);
      }
    };

    checkStatus();
  }, [navigation]);

  // 2) LOAD MANDIS + ROLES (for dropdowns)
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [mandiRes, roleRes] = await Promise.all([api.get('/mandis'), api.get('/mandi-official/roles')]);

        const mandiData = Array.isArray(mandiRes.data) ? mandiRes.data : [];
        const roleData = Array.isArray(roleRes.data) ? roleRes.data : [];

        const mappedMandis: MandiItem[] = mandiData
          .map((m: any) => {
            const id = m.mandiId ?? m.MandiId ?? m.id;
            const name = m.mandiName ?? m.MandiName ?? m.name;
            const loc = m.location ?? m.Location ?? '';
            if (!id || !name) return null;
            return { id: Number(id), name: String(name), location: String(loc) };
          })
          .filter(Boolean) as MandiItem[];

        const mappedRoles: RoleItem[] = roleData
          .map((r: any) => {
            const id = r.officialRoleId ?? r.OfficialRoleId ?? r.id ?? r.Id ?? '';
            const name = r.officialRoleName ?? r.OfficialRoleName ?? r.name ?? '';
            const code = r.roleCode ?? r.RoleCode ?? '';
            if (!id || !name) return null;
            return { id: String(id), name: String(name), code: String(code) };
          })
          .filter(Boolean) as RoleItem[];

        setMandis(mappedMandis);
        setRoles(mappedRoles);
      } catch (err) {
        console.log('MandiOfficialRegister meta load error:', err);
      }
    };

    loadMeta();
  }, []);

  // SUBMIT HANDLER: after successful register, fetch profile and redirect by role
  const handleSubmit = async () => {
    if (!officialName || !employeeId || !email || !selectedMandiId || !selectedRoleId) {
      return Alert.alert(
        t('missing_fields') ?? 'Missing fields',
        t('fill_fields') ?? 'Please fill all required fields',
      );
    }

    setSubmitting(true);
    try {
      const payload = {
        officialName: officialName,
        employeeId: employeeId,
        email: email,
        mandiId: selectedMandiId,
        officialRoleId: selectedRoleId,
      };

      const res = await api.post('/mandi-official/register', payload);

      if (!res.status.toString().startsWith('2')) {
        throw new Error(res.data?.message || 'Mandi official registration failed');
      }

      // Registration successful -> fetch profile and redirect appropriately
      try {
        const profileRes = await api.get('/mandi-official/profile');
        const profile = profileRes.data;
        Alert.alert(
          t('success_title') ?? 'Success',
          t('mandi_official_reg_success') ?? 'Mandi Official registered successfully',
          [
            {
              text: t('ok') ?? 'OK',
              onPress: () => redirectByRole(profile, navigation),
            },
          ],
        );
      } catch (err) {
        // fallback: decode token or go to generic dashboard
        try {
          const token = await AsyncStorage.getItem(TOKEN_KEY);
          const parsed = parseJwt(token ?? undefined);
          redirectByRole(parsed, navigation);
          return;
        } catch (ee) {
          // final fallback
          navigation.reset({
            index: 0,
            routes: [{ name: 'MandiOfficialDashboard' }],
          });
        }
      }
    } catch (err: any) {
      console.log('Mandi official registration error:', err?.response?.data ?? err?.message ?? err);
      const msg = err?.response?.data?.message ?? t('mandi_official_reg_failed') ?? 'Mandi official registration failed';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingStatus) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#2b6cb0" />
        <Text style={{ marginTop: 10, color: theme.text }}>
          {t('checking_status') ?? 'Checking registration status...'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>{t('mandi_official_reg') ?? 'Register as Mandi Official'}</Text>

        <TextInput
          placeholder={t('official_name') ?? 'Official Name'}
          placeholderTextColor="#9ca3af"
          style={[styles.input, { borderColor: theme.text, color: theme.text }]}
          value={officialName}
          onChangeText={setOfficialName}
        />

        <TextInput
          placeholder={t('official_id') ?? 'Employee ID'}
          placeholderTextColor="#9ca3af"
          style={[styles.input, { borderColor: theme.text, color: theme.text }]}
          value={employeeId}
          onChangeText={setEmployeeId}
        />

        <TextInput
          placeholder={t('email_id') ?? 'Email'}
          placeholderTextColor="#9ca3af"
          style={[styles.input, { borderColor: theme.text, color: theme.text }]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi'}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker
            selectedValue={selectedMandiId ?? ''}
            onValueChange={(v) => setSelectedMandiId(v ? Number(v) : null)}
          >
            <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
            {mandis.map((m) => (
              <Picker.Item key={m.id} label={`${m.name} (${m.location})`} value={m.id} />
            ))}
          </Picker>
        </View>

        <Text style={[styles.label, { color: theme.text }]}>{t('official_role') ?? 'Official Role'}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker selectedValue={selectedRoleId} onValueChange={(v) => setSelectedRoleId(v)}>
            <Picker.Item label={t('select_role') ?? 'Select role'} value="" />
            {roles.map((r) => (
              <Picker.Item key={r.id} label={`${r.name} (${r.code})`} value={r.id} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={[styles.btn, submitting && { opacity: 0.6 }]} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.btnText}>
            {submitting ? t('loading') ?? 'Submitting...' : t('register') ?? 'Register'}
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
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  label: { marginBottom: 4, fontWeight: '600', marginTop: 8 },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  btn: {
    backgroundColor: '#2b6cb0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});

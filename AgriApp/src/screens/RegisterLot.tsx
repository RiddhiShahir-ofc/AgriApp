
// // // // import React, { useEffect, useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   Alert,
// // // //   ScrollView,
// // // //   ActivityIndicator,
// // // //   FlatList,
// // // //   Keyboard,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { RootStackParamList } from '../../App';
// // // // import api from '../services/api';
// // // // import { useTheme } from '../context/ThemeContext';
// // // // import { useLanguage } from '../context/LanguageContext';

// // // // type Crop = { cropId?: number; id?: number; cropName?: string; name?: string };
// // // // type Mandi = { mandiId?: number; id?: number; mandiName?: string; name?: string; location?: string };
// // // // type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

// // // // export default function RegisterLot() {
// // // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // // //   const { theme } = useTheme();
// // // //   const { t } = useLanguage();

// // // //   // meta
// // // //   const [crops, setCrops] = useState<Crop[]>([]);
// // // //   const [grades, setGrades] = useState<string[]>([]);
// // // //   const [mandis, setMandis] = useState<Mandi[]>([]);

// // // //   // form
// // // //   const [cropId, setCropId] = useState<number | null>(null);
// // // //   const [grade, setGrade] = useState<string>('');
// // // //   const [quantity, setQuantity] = useState<string>(''); // string for TextInput
// // // //   const [mandiId, setMandiId] = useState<number | null>(null);

// // // //   // owner search/selection
// // // //   const [ownerKeyword, setOwnerKeyword] = useState<string>('');
// // // //   const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
// // // //   const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
// // // //   const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

// // // //   // manual owner fields (when not found)
// // // //   const [manualName, setManualName] = useState('');
// // // //   const [manualMobile, setManualMobile] = useState('');
// // // //   const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

// // // //   // submission
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [loadingMeta, setLoadingMeta] = useState(true);

// // // //   useEffect(() => {
// // // //     let mounted = true;
// // // //     const loadMeta = async () => {
// // // //       try {
// // // //         const [cropsRes, gradesRes, mandisRes] = await Promise.all([
// // // //           api.get('/crops'),
// // // //           api.get('/grades'),
// // // //           api.get('/mandis'),
// // // //         ]);

// // // //         if (!mounted) return;

// // // //         const cropList = Array.isArray(cropsRes.data) ? cropsRes.data : [];
// // // //         const gradeList = Array.isArray(gradesRes.data) ? gradesRes.data : [];
// // // //         const mandiList = Array.isArray(mandisRes.data) ? mandisRes.data : [];

// // // //         setCrops(cropList);
// // // //         // Normalize grades to strings
// // // //         setGrades(gradeList.map((g: any) => (typeof g === 'string' ? g : g.grade || g.name || String(g))));
// // // //         setMandis(mandiList);
// // // //       } catch (err) {
// // // //         console.log('RegisterLot meta load error', err);
// // // //         Alert.alert(t('error_title') ?? 'Error', t('fetch_meta_failed') ?? 'Failed to load dropdown data.');
// // // //       } finally {
// // // //         setLoadingMeta(false);
// // // //       }
// // // //     };

// // // //     loadMeta();
// // // //     return () => {
// // // //       mounted = false;
// // // //     };
// // // //   }, [t]);

// // // //   // owner search
// // // //   const searchOwner = async (keyword: string) => {
// // // //     if (!keyword || keyword.trim().length < 2) {
// // // //       setOwnerResults([]);
// // // //       return;
// // // //     }
// // // //     setOwnerSearchLoading(true);
// // // //     try {
// // // //       const res = await api.get('/mandi-official/lots/search-owner', {
// // // //         params: { keyword },
// // // //       });
// // // //       const data = Array.isArray(res.data) ? res.data : [];
// // // //       setOwnerResults(data);
// // // //     } catch (err) {
// // // //       console.log('search owner error', err);
// // // //       Alert.alert(t('error_title') ?? 'Error', t('search_owner_failed') ?? 'Owner search failed.');
// // // //     } finally {
// // // //       setOwnerSearchLoading(false);
// // // //     }
// // // //   };

// // // //   // selecting an owner from results
// // // //   const onSelectOwner = (owner: Owner) => {
// // // //     setSelectedOwner(owner);
// // // //     // clear manual fields
// // // //     setManualName('');
// // // //     setManualMobile('');
// // // //     setManualRole('farmer');
// // // //     // hide keyboard
// // // //     Keyboard.dismiss();
// // // //   };

// // // //   const clearSelectedOwner = () => {
// // // //     setSelectedOwner(null);
// // // //   };

// // // //   // submit arrived lot
// // // //   const handleSubmit = async () => {
// // // //     // basic validation
// // // //     if (!cropId || !quantity || !mandiId) {
// // // //       return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
// // // //     }

// // // //     const qtyNum = parseFloat(quantity);
// // // //     if (isNaN(qtyNum) || qtyNum <= 0) {
// // // //       return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
// // // //     }

// // // //     // build DTO
// // // //     const dto: any = {
// // // //       MandiId: mandiId,
// // // //       CropId: cropId,
// // // //       Quantity: qtyNum,
// // // //       Grade: grade || null,
// // // //       LotImageUrl: null,
// // // //       PreLotId: null,
// // // //     };

// // // //     if (selectedOwner) {
// // // //       dto.LotOwnerRole = selectedOwner.role;
// // // //       dto.LotOwnerName = selectedOwner.name;
// // // //       dto.MobileNum = selectedOwner.mobile ?? '';
// // // //       if (selectedOwner.role === 'farmer') dto.FarmerId = selectedOwner.id;
// // // //       if (selectedOwner.role === 'seller') dto.SellerId = selectedOwner.id;
// // // //     } else {
// // // //       // manual owner entry required
// // // //       if (!manualName || !manualMobile || !manualRole) {
// // // //         return Alert.alert(t('missing_owner_fields') ?? 'Missing owner fields', t('fill_owner_fields') ?? 'Please provide owner name and mobile and role');
// // // //       }
// // // //       dto.LotOwnerRole = manualRole;
// // // //       dto.LotOwnerName = manualName;
// // // //       dto.MobileNum = manualMobile;
// // // //       dto.FarmerId = manualRole === 'farmer' ? null : null;
// // // //       dto.SellerId = manualRole === 'seller' ? null : null;
// // // //       // Note: backend expects FarmerId or SellerId as GUIDs when matching existing users — for manual entry we leave them null
// // // //     }

// // // //     setSubmitting(true);
// // // //     try {
// // // //       const res = await api.post('/mandi-official/lots/arrived/create', dto);
// // // //       if (!res.status.toString().startsWith('2')) {
// // // //         throw new Error(res.data?.message || 'Failed to create arrived lot');
// // // //       }

// // // //       Alert.alert(
// // // //         t('success_title') ?? 'Success',
// // // //         t('arrived_lot_created') ?? 'Arrived lot created successfully',
// // // //         [
// // // //           {
// // // //             text: t('ok') ?? 'OK',
// // // //             onPress: () => {
// // // //               navigation.goBack();
// // // //             },
// // // //           },
// // // //         ],
// // // //       );
// // // //     } catch (err: any) {
// // // //       console.log('create arrived lot error', err?.response?.data ?? err?.message ?? err);
// // // //       const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
// // // //       Alert.alert(t('error_title') ?? 'Error', msg);
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   if (loadingMeta) {
// // // //     return (
// // // //       <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
// // // //         <ActivityIndicator size="large" />
// // // //         <Text style={{ marginTop: 8, color: theme.text }}>{t('loading_meta') ?? 'Loading...'}</Text>
// // // //       </SafeAreaView>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // // //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// // // //         <Text style={[styles.title, { color: theme.text }]}>{t('register_lot_btn')}</Text>

// // // //         {/* Owner Search */}
// // // //         <Text style={[styles.label, { color: theme.text }]}>{t('search_owner_label')}</Text>
// // // //         <View style={styles.row}>
// // // //           <TextInput
// // // //             placeholder={t('search_owner_placeholder') ?? 'Search by name or mobile'}
// // // //             placeholderTextColor="#9ca3af"
// // // //             value={ownerKeyword}
// // // //             onChangeText={(v) => {
// // // //               setOwnerKeyword(v);
// // // //               // do not auto-search on every keystroke for performance, but here we call search after short typed length
// // // //             }}
// // // //             style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
// // // //             onSubmitEditing={() => searchOwner(ownerKeyword)}
// // // //             returnKeyType="search"
// // // //           />
// // // //           <TouchableOpacity
// // // //             style={[styles.smallBtn]}
// // // //             onPress={() => searchOwner(ownerKeyword)}
// // // //           >
// // // //             <Text style={styles.smallBtnText}>{t('search_btn')}</Text>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         {ownerSearchLoading ? (
// // // //           <ActivityIndicator style={{ marginVertical: 10 }} />
// // // //         ) : ownerResults.length > 0 ? (
// // // //           <View style={{ marginVertical: 8 }}>
// // // //             <Text style={[styles.subTitle, { color: theme.text }]}>{t('search_results')}</Text>
// // // //             <FlatList
// // // //               data={ownerResults}
// // // //               keyExtractor={(it) => String(it.id)}
// // // //               renderItem={({ item }) => (
// // // //                 <TouchableOpacity
// // // //                   onPress={() => onSelectOwner(item)}
// // // //                   style={[styles.ownerItem, selectedOwner?.id === item.id && styles.ownerItemSelected]}
// // // //                 >
// // // //                   <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
// // // //                   <Text style={{ color: theme.text }}>{item.mobile} • {item.role}</Text>
// // // //                 </TouchableOpacity>
// // // //               )}
// // // //             />
// // // //           </View>
// // // //         ) : null}

// // // //         {selectedOwner ? (
// // // //           <View style={styles.selectedOwnerBox}>
// // // //             <Text style={{ fontWeight: '700', color: theme.text }}>{t('selected_owner')}: {selectedOwner.name}</Text>
// // // //             <Text style={{ color: theme.text }}>{selectedOwner.mobile} • {selectedOwner.role}</Text>
// // // //             <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedOwner}><Text style={{ color: '#ef4444' }}>{t('clear_selection')}</Text></TouchableOpacity>
// // // //           </View>
// // // //         ) : null}

// // // //         {/* Manual owner input (visible when no selected owner) */}
// // // //         {!selectedOwner && (
// // // //           <>
// // // //             <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>

// // // //             <TextInput
// // // //               placeholder={t('owner_name_placeholder') ?? 'Owner Name'}
// // // //               placeholderTextColor="#9ca3af"
// // // //               value={manualName}
// // // //               onChangeText={setManualName}
// // // //               style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// // // //             />
// // // //             <TextInput
// // // //               placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'}
// // // //               placeholderTextColor="#9ca3af"
// // // //               value={manualMobile}
// // // //               onChangeText={setManualMobile}
// // // //               keyboardType="phone-pad"
// // // //               style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// // // //             />

// // // //             <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
// // // //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // // //               <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v)}>
// // // //                 <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
// // // //                 <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
// // // //               </Picker>
// // // //             </View>
// // // //           </>
// // // //         )}

// // // //         {/* Lot details */}
// // // //         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
// // // //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // // //           <Picker
// // // //             selectedValue={cropId ?? ''}
// // // //             onValueChange={(v) => setCropId(v ? Number(v) : null)}
// // // //           >
// // // //             <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// // // //             {crops.map((c: any) => (
// // // //               <Picker.Item key={c.cropId ?? c.id} label={c.cropName ?? c.name} value={c.cropId ?? c.id} />
// // // //             ))}
// // // //           </Picker>
// // // //         </View>

// // // //         <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
// // // //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // // //           <Picker selectedValue={grade} onValueChange={(v) => setGrade(v)}>
// // // //             <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
// // // //             {grades.map((g: any, idx) => (
// // // //               <Picker.Item key={String(g) + idx} label={String(g)} value={String(g)} />
// // // //             ))}
// // // //           </Picker>
// // // //         </View>

// // // //         <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
// // // //         <TextInput
// // // //           placeholder={t('quantity_placeholder') ?? 'Quantity'}
// // // //           placeholderTextColor="#9ca3af"
// // // //           value={quantity}
// // // //           onChangeText={setQuantity}
// // // //           keyboardType="numeric"
// // // //           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// // // //         />

// // // //         <Text style={[styles.label, { color: theme.text }]}>{t('mandi')}</Text>
// // // //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // // //           <Picker selectedValue={mandiId ?? ''} onValueChange={(v) => setMandiId(v ? Number(v) : null)}>
// // // //             <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// // // //             {mandis.map((m: any) => (
// // // //               <Picker.Item key={m.mandiId ?? m.id} label={`${m.mandiName ?? m.name} (${m.location ?? ''})`} value={m.mandiId ?? m.id} />
// // // //             ))}
// // // //           </Picker>
// // // //         </View>

// // // //         <TouchableOpacity
// // // //           style={[styles.submitBtn, submitting && { opacity: 0.7 }]}
// // // //           onPress={handleSubmit}
// // // //           disabled={submitting}
// // // //         >
// // // //           {submitting ? (
// // // //             <ActivityIndicator color="#fff" />
// // // //           ) : (
// // // //             <Text style={styles.submitBtnText}>{t('create_arrived_lot_btn')}</Text>
// // // //           )}
// // // //         </TouchableOpacity>
// // // //       </ScrollView>
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1 },
// // // //   title: { fontSize: 22, fontWeight: '700', padding: 16 },
// // // //   label: { fontSize: 14, fontWeight: '700', paddingHorizontal: 16, marginTop: 12 },
// // // //   subLabel: { fontSize: 14, fontWeight: '600', paddingHorizontal: 16, marginTop: 10, color: '#6b7280' },
// // // //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginHorizontal: 16, marginTop: 8 },
// // // //   pickerWrap: { borderWidth: 1, borderRadius: 8, marginHorizontal: 16, marginTop: 8, overflow: 'hidden' },
// // // //   submitBtn: { backgroundColor: '#10b981', margin: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
// // // //   submitBtnText: { color: '#fff', fontWeight: '700' },
// // // //   row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 8 },
// // // //   smallBtn: { marginLeft: 8, backgroundColor: '#374151', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
// // // //   smallBtnText: { color: '#fff', fontWeight: '700' },
// // // //   ownerItem: { padding: 10, marginHorizontal: 16, marginTop: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
// // // //   ownerItemSelected: { borderColor: '#10b981', backgroundColor: '#ecfdf5' },
// // // //   selectedOwnerBox: { marginHorizontal: 16, marginTop: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#10b981' },
// // // //   clearBtn: { marginTop: 6 },
// // // //   subTitle: { paddingHorizontal: 16, marginTop: 8, fontWeight: '700' },
// // // // });

// // // // src/screens/RegisterLot.tsx
// // // import React, { useEffect, useMemo, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Alert,
// // //   ScrollView,
// // //   ActivityIndicator,
// // //   FlatList,
// // //   Keyboard,
// // //   Platform,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { Picker } from '@react-native-picker/picker';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';
// // // import api from '../services/api';
// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';

// // // type CropRow = { id: number; name: string; grade?: string | null };
// // // type MandiRow = { id: number; name: string; location?: string };
// // // type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

// // // export default function RegisterLot() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   // ----- meta from backend -----
// // //   const [crops, setCrops] = useState<CropRow[]>([]);
// // //   const [mandis, setMandis] = useState<MandiRow[]>([]);

// // //   // loading
// // //   const [loadingMeta, setLoadingMeta] = useState(true);
// // //   const [submitting, setSubmitting] = useState(false);

// // //   // ----- form state (preregister-style: pick by name) -----
// // //   const [cropName, setCropName] = useState<string>(''); // same as prCrop
// // //   const [grade, setGrade] = useState<string>(''); // prGrade
// // //   const [quantity, setQuantity] = useState<string>(''); // prQuantity
// // //   const [mandiName, setMandiName] = useState<string>(''); // prMandi

// // //   // date / expected arrival not required here, officer just creates arrived lot — keep minimal
// // //   // owner search/selection
// // //   const [ownerKeyword, setOwnerKeyword] = useState<string>('');
// // //   const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
// // //   const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
// // //   const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

// // //   // manual owner fields (when not found)
// // //   const [manualName, setManualName] = useState('');
// // //   const [manualMobile, setManualMobile] = useState('');
// // //   const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

// // //   // ----- Derived helpers from crops/mandis (matches FarmerDashboard logic) -----
// // //   // unique crop names for dropdown
// // //   const cropOptions = useMemo(() => Array.from(new Set(crops.map(c => c.name))), [crops]);

// // //   // unique mandi names for dropdown
// // //   const mandiOptions = useMemo(() => Array.from(new Set(mandis.map(m => m.name))), [mandis]);

// // //   // grades available for current crop (like currentGrades)
// // //   const currentGrades = useMemo(() => {
// // //     if (!cropName) return [];
// // //     const grades = crops
// // //       .filter(c => c.name === cropName && c.grade != null && c.grade !== '')
// // //       .map(c => String(c.grade));
// // //     const uniqueGrades = Array.from(new Set(grades));
// // //     if (!uniqueGrades.length) return ['Other'];
// // //     if (!uniqueGrades.includes('Other')) uniqueGrades.push('Other');
// // //     return uniqueGrades;
// // //   }, [cropName, crops]);

// // //   const isValidPickerValue = (value: string, options: string[]) => {
// // //     return value === '' || options.includes(value) || value === 'Other';
// // //   };

// // //   // ----- load meta (crops + mandis) -----
// // //   useEffect(() => {
// // //     let mounted = true;
// // //     const loadMeta = async () => {
// // //       try {
// // //         // Reuse endpoints you already have
// // //         const [cropsRes, mandisRes] = await Promise.all([api.get('/crops'), api.get('/mandis')]);

// // //         if (!mounted) return;

// // //         const cropsData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
// // //         const mandisData = Array.isArray(mandisRes.data) ? mandisRes.data : [];

// // //         const mappedCrops: CropRow[] = cropsData
// // //           .map((c: any) => {
// // //             const id = c.cropId ?? c.CropId ?? c.id;
// // //             const name = c.cropName ?? c.CropName ?? c.name;
// // //             const grade = c.grade ?? c.Grade ?? null;
// // //             if (!id || !name) return null;
// // //             return { id: Number(id), name: String(name), grade: grade ?? null };
// // //           })
// // //           .filter(Boolean) as CropRow[];

// // //         const mappedMandis: MandiRow[] = mandisData
// // //           .map((m: any) => {
// // //             const id = m.mandiId ?? m.MandiId ?? m.id;
// // //             const name = m.mandiName ?? m.MandiName ?? m.name;
// // //             const location = m.location ?? m.Location ?? '';
// // //             if (!id || !name) return null;
// // //             return { id: Number(id), name: String(name), location: String(location) };
// // //           })
// // //           .filter(Boolean) as MandiRow[];

// // //         setCrops(mappedCrops);
// // //         setMandis(mappedMandis);
// // //       } catch (err) {
// // //         console.log('RegisterLot meta load error', err);
// // //         Alert.alert(t('error_title') ?? 'Error', t('fetch_meta_failed') ?? 'Failed to load dropdown data.');
// // //       } finally {
// // //         setLoadingMeta(false);
// // //       }
// // //     };

// // //     loadMeta();
// // //     return () => {
// // //       mounted = false;
// // //     };
// // //   }, [t]);

// // //   // ----- owner search -----
// // //   const searchOwner = async (keyword: string) => {
// // //     if (!keyword || keyword.trim().length < 2) {
// // //       setOwnerResults([]);
// // //       return;
// // //     }
// // //     setOwnerSearchLoading(true);
// // //     try {
// // //       const res = await api.get('/mandi-official/lots/search-owner', {
// // //         params: { keyword },
// // //       });
// // //       const data = Array.isArray(res.data) ? res.data : [];
// // //       setOwnerResults(
// // //         data.map((d: any) => ({
// // //           role: (d.role === 'seller' ? 'seller' : 'farmer') as 'farmer' | 'seller',
// // //           id: String(d.id),
// // //           name: d.name ?? '',
// // //           mobile: d.mobile ?? '',
// // //         })),
// // //       );
// // //     } catch (err) {
// // //       console.log('search owner error', err);
// // //       Alert.alert(t('error_title') ?? 'Error', t('search_owner_failed') ?? 'Owner search failed.');
// // //     } finally {
// // //       setOwnerSearchLoading(false);
// // //     }
// // //   };

// // //   const onSelectOwner = (owner: Owner) => {
// // //     setSelectedOwner(owner);
// // //     setManualName('');
// // //     setManualMobile('');
// // //     setManualRole('farmer');
// // //     Keyboard.dismiss();
// // //   };

// // //   const clearSelectedOwner = () => {
// // //     setSelectedOwner(null);
// // //   };

// // //   // ----- helpers to resolve names to DB IDs (pickCropIdForSelection / pickMandiIdForSelection) -----
// // //   const pickCropIdForSelection = (): number | null => {
// // //     if (!cropName) return null;

// // //     // Try match with crop+grade
// // //     let match = crops.find(c => c.name === cropName && ((c.grade ?? '') === grade || (c.grade ?? '') === '' ));
// // //     if (!match) {
// // //       match = crops.find(c => c.name === cropName);
// // //     }
// // //     return match?.id ?? null;
// // //   };

// // //   const pickMandiIdForSelection = (): number | null => {
// // //     if (!mandiName) return null;
// // //     const m = mandis.find(x => x.name === mandiName);
// // //     return m?.id ?? null;
// // //   };

// // //   // ----- submit arrived lot -----
// // //   const handleSubmit = async () => {
// // //     // validations
// // //     if (!cropName) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
// // //     if (!quantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
// // //     if (!mandiName) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

// // //     const qtyNum = parseFloat(quantity);
// // //     if (isNaN(qtyNum) || qtyNum <= 0) {
// // //       return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
// // //     }

// // //     // resolve DB ids
// // //     const CropId = pickCropIdForSelection();
// // //     const MandiId = pickMandiIdForSelection();

// // //     if (!CropId || !MandiId) {
// // //       return Alert.alert(t('error_title') ?? 'Error', 'Invalid crop or mandi selected. Please re-select.');
// // //     }

// // //     const dto: any = {
// // //       MandiId,
// // //       CropId,
// // //       Quantity: qtyNum,
// // //       Grade: grade || null,
// // //       LotImageUrl: null,
// // //       PreLotId: null,
// // //     };

// // //     if (selectedOwner) {
// // //       dto.LotOwnerRole = selectedOwner.role;
// // //       dto.LotOwnerName = selectedOwner.name;
// // //       dto.MobileNum = selectedOwner.mobile ?? '';
// // //       if (selectedOwner.role === 'farmer') dto.FarmerId = selectedOwner.id;
// // //       if (selectedOwner.role === 'seller') dto.SellerId = selectedOwner.id;
// // //     } else {
// // //       if (!manualName || !manualMobile || !manualRole) {
// // //         return Alert.alert(t('missing_owner_fields') ?? 'Missing owner fields', t('fill_owner_fields') ?? 'Please provide owner name and mobile and role');
// // //       }
// // //       dto.LotOwnerRole = manualRole;
// // //       dto.LotOwnerName = manualName;
// // //       dto.MobileNum = manualMobile;
// // //       dto.FarmerId = manualRole === 'farmer' ? null : null;
// // //       dto.SellerId = manualRole === 'seller' ? null : null;
// // //     }

// // //     setSubmitting(true);
// // //     try {
// // //       const res = await api.post('/mandi-official/lots/arrived/create', dto);
// // //       if (!res.status.toString().startsWith('2')) {
// // //         throw new Error(res.data?.message || 'Failed to create arrived lot');
// // //       }

// // //       Alert.alert(
// // //         t('success_title') ?? 'Success',
// // //         t('arrived_lot_created') ?? 'Arrived lot created successfully',
// // //         [
// // //           {
// // //             text: t('ok') ?? 'OK',
// // //             onPress: () => navigation.goBack(),
// // //           },
// // //         ],
// // //       );
// // //     } catch (err: any) {
// // //       console.log('create arrived lot error', err?.response?.data ?? err?.message ?? err);
// // //       const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
// // //       Alert.alert(t('error_title') ?? 'Error', msg);
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   if (loadingMeta) {
// // //     return (
// // //       <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
// // //         <ActivityIndicator size="large" />
// // //         <Text style={{ marginTop: 8, color: theme.text }}>{t('loading_meta') ?? 'Loading...'}</Text>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// // //         <Text style={[styles.title, { color: theme.text }]}>{ t('register_lot_btn') ?? 'Register Lot'}</Text>

// // //         {/* ---------- Owner Search ---------- */}
// // //         <Text style={[styles.label, { color: theme.text }]}>{t('search_owner_label')}</Text>
// // //         <View style={styles.row}>
// // //           <TextInput
// // //             placeholder={t('search_owner_placeholder') ?? 'Search by name or mobile'}
// // //             placeholderTextColor="#9ca3af"
// // //             value={ownerKeyword}
// // //             onChangeText={(v) => setOwnerKeyword(v)}
// // //             style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
// // //             onSubmitEditing={() => searchOwner(ownerKeyword)}
// // //             returnKeyType="search"
// // //           />
// // //           <TouchableOpacity style={[styles.smallBtn]} onPress={() => searchOwner(ownerKeyword)}>
// // //             <Text style={styles.smallBtnText}>{t('search_btn')}</Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {ownerSearchLoading ? (
// // //           <ActivityIndicator style={{ marginVertical: 10 }} />
// // //         ) : ownerResults.length > 0 ? (
// // //           <View style={{ marginVertical: 8 }}>
// // //             <Text style={[styles.subTitle, { color: theme.text }]}>{t('search_results')}</Text>
// // //             <FlatList
// // //               data={ownerResults}
// // //               keyExtractor={(it) => String(it.id)}
// // //               renderItem={({ item }) => (
// // //                 <TouchableOpacity onPress={() => onSelectOwner(item)} style={[styles.ownerItem, selectedOwner?.id === item.id && styles.ownerItemSelected]}>
// // //                   <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
// // //                   <Text style={{ color: theme.text }}>{item.mobile} • {item.role}</Text>
// // //                 </TouchableOpacity>
// // //               )}
// // //             />
// // //           </View>
// // //         ) : null}

// // //         {selectedOwner ? (
// // //           <View style={[styles.selectedOwnerBox, { borderColor: '#10b981' }]}>
// // //             <Text style={{ fontWeight: '700', color: theme.text }}>{t('selected_owner')}: {selectedOwner.name}</Text>
// // //             <Text style={{ color: theme.text }}>{selectedOwner.mobile} • {selectedOwner.role}</Text>
// // //             <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedOwner}><Text style={{ color: '#ef4444' }}>{t('clear_selection')}</Text></TouchableOpacity>
// // //           </View>
// // //         ) : null}

// // //         {/* ---------- Manual owner (fallback) ---------- */}
// // //         {!selectedOwner && (
// // //           <>
// // //             <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>

// // //             <TextInput
// // //               placeholder={t('owner_name_placeholder') ?? 'Owner Name'}
// // //               placeholderTextColor="#9ca3af"
// // //               value={manualName}
// // //               onChangeText={setManualName}
// // //               style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// // //             />
// // //             <TextInput
// // //               placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'}
// // //               placeholderTextColor="#9ca3af"
// // //               value={manualMobile}
// // //               onChangeText={setManualMobile}
// // //               keyboardType="phone-pad"
// // //               style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// // //             />

// // //             <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
// // //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //               <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v as 'farmer' | 'seller')}>
// // //                 <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
// // //                 <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
// // //               </Picker>
// // //             </View>
// // //           </>
// // //         )}

// // //         {/* ---------- Lot details (preregister-style pickers) ---------- */}
// // //         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
// // //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //           <Picker selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''} onValueChange={v => setCropName(String(v))}>
// // //             <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// // //             {cropOptions.map(c => (<Picker.Item key={c} label={c} value={c} />))}
// // //             <Picker.Item label="Other" value="Other" />
// // //           </Picker>
// // //         </View>

// // //         {cropName && !isValidPickerValue(cropName, cropOptions) && cropName !== 'Other' && (
// // //           <TextInput placeholder={t('type_crop') ?? 'Type crop'} placeholderTextColor={theme.text ?? '#999'} value={cropName} onChangeText={setCropName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
// // //         )}

// // //         <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
// // //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //           <Picker selectedValue={grade} onValueChange={v => setGrade(String(v))}>
// // //             <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
// // //             {currentGrades.map(g => (<Picker.Item key={g} label={g} value={g} />))}
// // //           </Picker>
// // //         </View>

// // //         {grade === 'Other' && (
// // //           <TextInput placeholder={t('type_grade') ?? 'Type grade'} placeholderTextColor={theme.text ?? '#999'} value={grade} onChangeText={setGrade} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
// // //         )}

// // //         <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
// // //         <TextInput placeholder={t('quantity_placeholder') ?? 'Quantity'} placeholderTextColor="#9ca3af" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={[styles.input, { borderColor: theme.text, color: theme.text }]} />

// // //         <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi'}</Text>
// // //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //           <Picker selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''} onValueChange={v => setMandiName(String(v))}>
// // //             <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// // //             {mandiOptions.map(m => (<Picker.Item key={m} label={m} value={m} />))}
// // //             <Picker.Item label="Other" value="Other" />
// // //           </Picker>
// // //         </View>

// // //         {mandiName && !isValidPickerValue(mandiName, mandiOptions) && mandiName !== 'Other' && (
// // //           <TextInput placeholder={t('type_mandi') ?? 'Type mandi'} placeholderTextColor={theme.text ?? '#999'} value={mandiName} onChangeText={setMandiName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
// // //         )}

// // //         <TouchableOpacity style={[styles.submitBtn, submitting && { opacity: 0.7 }]} onPress={handleSubmit} disabled={submitting}>
// // //           {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>{t('create_arrived_lot_btn')}</Text>}
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1 },
// // //   title: { fontSize: 22, fontWeight: '700', padding: 16 },
// // //   label: { fontSize: 14, fontWeight: '700', paddingHorizontal: 16, marginTop: 12 },
// // //   subLabel: { fontSize: 14, fontWeight: '600', paddingHorizontal: 16, marginTop: 10, color: '#6b7280' },
// // //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginHorizontal: 16, marginTop: 8 },
// // //   pickerWrap: { borderWidth: 1, borderRadius: 8, marginHorizontal: 16, marginTop: 8, overflow: 'hidden' },
// // //   submitBtn: { backgroundColor: '#10b981', margin: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
// // //   submitBtnText: { color: '#fff', fontWeight: '700' },
// // //   row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 8 },
// // //   smallBtn: { marginLeft: 8, backgroundColor: '#374151', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
// // //   smallBtnText: { color: '#fff', fontWeight: '700' },
// // //   ownerItem: { padding: 10, marginHorizontal: 16, marginTop: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
// // //   ownerItemSelected: { borderColor: '#10b981', backgroundColor: '#ecfdf5' },
// // //   selectedOwnerBox: { marginHorizontal: 16, marginTop: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#10b981' },
// // //   clearBtn: { marginTop: 6 },
// // //   subTitle: { paddingHorizontal: 16, marginTop: 8, fontWeight: '700' },
// // // });

// // // src/screens/RegisterLot.tsx
// // import React, { useEffect, useMemo, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ScrollView,
// //   ActivityIndicator,
// //   FlatList,
// //   Keyboard,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Picker } from '@react-native-picker/picker';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';
// // import api from '../services/api';
// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // type CropRow = { id: number; name: string; grade?: string | null };
// // type MandiRow = { id: number; name: string; location?: string };
// // type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

// // type PreLotDetail = {
// //   preLotId: string;
// //   cropId: number;
// //   cropName: string;
// //   mandiId: number;
// //   mandiName: string;
// //   quantity: number;
// //   grade?: string | null;
// //   sellingAmount?: number | null;
// //   expectedArrivalDate?: string | null;
// //   lotImageUrl?: string | null;
// //   qrCodeUrl?: string | null;
// // };

// // export default function RegisterLot() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   // ----- meta -----
// //   const [crops, setCrops] = useState<CropRow[]>([]);
// //   const [mandis, setMandis] = useState<MandiRow[]>([]);
// //   const [loadingMeta, setLoadingMeta] = useState(true);

// //   // ----- preregister field -----
// //   const [preLotIdInput, setPreLotIdInput] = useState<string>('');
// //   const [prelotLoading, setPrelotLoading] = useState(false);
// //   const [prelotError, setPrelotError] = useState<string | null>(null);
// //   const [prelotDetail, setPrelotDetail] = useState<PreLotDetail | null>(null);
// //   const [prelotSource, setPrelotSource] = useState<'farmer' | 'seller' | null>(null);

// //   // ----- manual/normal form -----
// //   const [cropName, setCropName] = useState<string>('');
// //   const [grade, setGrade] = useState<string>('');
// //   const [quantity, setQuantity] = useState<string>('');
// //   const [mandiName, setMandiName] = useState<string>('');

// //   // owner search / manual fallback
// //   const [ownerKeyword, setOwnerKeyword] = useState<string>('');
// //   const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
// //   const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
// //   const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
// //   const [manualName, setManualName] = useState('');
// //   const [manualMobile, setManualMobile] = useState('');
// //   const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

// //   // submit
// //   const [submitting, setSubmitting] = useState(false);

// //   // ----- derived dropdown options -----
// //   const cropOptions = useMemo(() => Array.from(new Set(crops.map(c => c.name))), [crops]);
// //   const mandiOptions = useMemo(() => Array.from(new Set(mandis.map(m => m.name))), [mandis]);

// //   const currentGrades = useMemo(() => {
// //     if (!cropName) return [];
// //     const grades = crops
// //       .filter(c => c.name === cropName && c.grade != null && c.grade !== '')
// //       .map(c => String(c.grade));
// //     const uniqueGrades = Array.from(new Set(grades));
// //     if (!uniqueGrades.length) return ['Other'];
// //     if (!uniqueGrades.includes('Other')) uniqueGrades.push('Other');
// //     return uniqueGrades;
// //   }, [cropName, crops]);

// //   const isValidPickerValue = (value: string, options: string[]) => {
// //     return value === '' || options.includes(value) || value === 'Other';
// //   };

// //   // ----- load meta -----
// //   useEffect(() => {
// //     let mounted = true;
// //     const loadMeta = async () => {
// //       try {
// //         const [cropsRes, mandisRes] = await Promise.all([api.get('/crops'), api.get('/mandis')]);
// //         if (!mounted) return;

// //         const cropsData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
// //         const mandisData = Array.isArray(mandisRes.data) ? mandisRes.data : [];

// //         const mappedCrops: CropRow[] = cropsData
// //           .map((c: any) => {
// //             const id = c.cropId ?? c.CropId ?? c.id;
// //             const name = c.cropName ?? c.CropName ?? c.name;
// //             const grade = c.grade ?? c.Grade ?? null;
// //             if (!id || !name) return null;
// //             return { id: Number(id), name: String(name), grade: grade ?? null };
// //           })
// //           .filter(Boolean) as CropRow[];

// //         const mappedMandis: MandiRow[] = mandisData
// //           .map((m: any) => {
// //             const id = m.mandiId ?? m.MandiId ?? m.id;
// //             const name = m.mandiName ?? m.MandiName ?? m.name;
// //             const location = m.location ?? m.Location ?? '';
// //             if (!id || !name) return null;
// //             return { id: Number(id), name: String(name), location: String(location) };
// //           })
// //           .filter(Boolean) as MandiRow[];

// //         setCrops(mappedCrops);
// //         setMandis(mappedMandis);
// //       } catch (err) {
// //         console.log('RegisterLot meta load error', err);
// //         Alert.alert(t('error_title') ?? 'Error', t('fetch_meta_failed') ?? 'Failed to load dropdown data.');
// //       } finally {
// //         setLoadingMeta(false);
// //       }
// //     };

// //     loadMeta();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, [t]);

// //   // ----- owner search -----
// //   const searchOwner = async (keyword: string) => {
// //     if (!keyword || keyword.trim().length < 2) {
// //       setOwnerResults([]);
// //       return;
// //     }
// //     setOwnerSearchLoading(true);
// //     try {
// //       const res = await api.get('/mandi-official/lots/search-owner', { params: { keyword } });
// //       const data = Array.isArray(res.data) ? res.data : [];
// //       setOwnerResults(
// //         data.map((d: any) => ({
// //           role: (d.role === 'seller' ? 'seller' : 'farmer') as 'farmer' | 'seller',
// //           id: String(d.id),
// //           name: d.name ?? '',
// //           mobile: d.mobile ?? '',
// //         })),
// //       );
// //     } catch (err) {
// //       console.log('search owner error', err);
// //       Alert.alert(t('error_title') ?? 'Error', t('search_owner_failed') ?? 'Owner search failed.');
// //     } finally {
// //       setOwnerSearchLoading(false);
// //     }
// //   };

// //   const onSelectOwner = (owner: Owner) => {
// //     setSelectedOwner(owner);
// //     setManualName('');
// //     setManualMobile('');
// //     setManualRole('farmer');
// //     Keyboard.dismiss();
// //   };
// //   const clearSelectedOwner = () => setSelectedOwner(null);

// //   // ----- helpers to resolve DB ids for manual flow -----
// //   const pickCropIdForSelection = (): number | null => {
// //     if (!cropName) return null;
// //     let match = crops.find(c => c.name === cropName && ((c.grade ?? '') === grade || (c.grade ?? '') === ''));
// //     if (!match) match = crops.find(c => c.name === cropName);
// //     return match?.id ?? null;
// //   };
// //   const pickMandiIdForSelection = (): number | null => {
// //     if (!mandiName) return null;
// //     const m = mandis.find(x => x.name === mandiName);
// //     return m?.id ?? null;
// //   };

// //   // ----- PRELOT: fetch pre-registered lot by ID (try farmer then seller) -----
// //   const fetchPreLot = async () => {
// //     const id = preLotIdInput?.trim();
// //     setPrelotError(null);
// //     setPrelotDetail(null);
// //     setPrelotSource(null);

// //     if (!id) {
// //       setPrelotError(t('enter_prelot_id') ?? 'Enter PreLot ID');
// //       return;
// //     }

// //     setPrelotLoading(true);
// //     try {
// //       // Try farmer endpoint first
// //       try {
// //         const res = await api.get(`/farmer/lots/${encodeURIComponent(id)}`);
// //         if (res.status.toString().startsWith('2')) {
// //           const d = res.data;
// //           const detail: PreLotDetail = {
// //             preLotId: d.preLotId ?? d.PreLotId ?? id,
// //             cropId: d.cropId ?? d.CropId ?? d.CropId ?? d.cropId,
// //             cropName: d.cropName ?? d.CropName ?? d.crop ?? '',
// //             mandiId: d.mandiId ?? d.MandiId ?? d.MandiId ?? d.mandiId,
// //             mandiName: d.mandiName ?? d.MandiName ?? d.mandiName ?? '',
// //             quantity: Number(d.quantity ?? d.Quantity ?? 0),
// //             grade: d.grade ?? d.Grade ?? null,
// //             sellingAmount: d.sellingAmount ?? d.SellingAmount ?? null,
// //             expectedArrivalDate: d.expectedArrivalDate ?? d.ExpectedArrivalDate ?? null,
// //             lotImageUrl: d.lotImageUrl ?? d.LotImageUrl ?? null,
// //             qrCodeUrl: d.qrCodeUrl ?? d.QrCodeUrl ?? null,
// //           };
// //           setPrelotDetail(detail);
// //           setPrelotSource('farmer');
// //           // fill form fields (read-only style)
// //           setCropName(detail.cropName);
// //           setGrade(detail.grade ?? '');
// //           setQuantity(String(detail.quantity ?? ''));
// //           setMandiName(detail.mandiName);
// //           return;
// //         }
// //       } catch (err: any) {
// //         // if 404 try seller; otherwise allow fallback
// //         if (!(err?.response?.status === 404)) {
// //           // log but continue to try seller
// //           console.log('farmer prelot fetch error (non-404):', err);
// //         }
// //       }

// //       // Try seller endpoint
// //       try {
// //         const res = await api.get(`/seller/lots/${encodeURIComponent(id)}`);
// //         if (res.status.toString().startsWith('2')) {
// //           const d = res.data;
// //           const detail: PreLotDetail = {
// //             preLotId: d.preLotId ?? d.PreLotId ?? id,
// //             cropId: d.cropId ?? d.CropId ?? d.CropId ?? d.cropId,
// //             cropName: d.cropName ?? d.CropName ?? d.crop ?? '',
// //             mandiId: d.mandiId ?? d.MandiId ?? d.MandiId ?? d.mandiId,
// //             mandiName: d.mandiName ?? d.MandiName ?? d.mandiName ?? '',
// //             quantity: Number(d.quantity ?? d.Quantity ?? 0),
// //             grade: d.grade ?? d.Grade ?? null,
// //             sellingAmount: d.sellingAmount ?? d.SellingAmount ?? null,
// //             expectedArrivalDate: d.expectedArrivalDate ?? d.ExpectedArrivalDate ?? null,
// //             lotImageUrl: d.lotImageUrl ?? d.LotImageUrl ?? null,
// //             qrCodeUrl: d.qrCodeUrl ?? d.QrCodeUrl ?? null,
// //           };
// //           setPrelotDetail(detail);
// //           setPrelotSource('seller');
// //           // fill form fields
// //           setCropName(detail.cropName);
// //           setGrade(detail.grade ?? '');
// //           setQuantity(String(detail.quantity ?? ''));
// //           setMandiName(detail.mandiName);
// //           return;
// //         }
// //       } catch (err: any) {
// //         if (err?.response?.status === 404) {
// //           setPrelotError(t('prelot_not_found') ?? 'Pre-registered lot not found');
// //         } else {
// //           console.log('seller prelot fetch error:', err);
// //           setPrelotError(t('prelot_fetch_failed') ?? 'Failed to fetch prelot details');
// //         }
// //         return;
// //       }
// //     } finally {
// //       setPrelotLoading(false);
// //     }
// //   };

// //   // ----- submit handler: if prelotDetail exists -> call from-prelot endpoint, else regular create -----
// //   const handleSubmit = async () => {
// //     // If prelot loaded -> call from-prelot
// //     if (prelotDetail) {
// //       setSubmitting(true);
// //       try {
// //         const res = await api.post(`/mandi-official/lots/arrived/from-prelot`, null, {
// //           params: { preLotId: prelotDetail.preLotId },
// //         });
// //         if (!res.status.toString().startsWith('2')) {
// //           throw new Error(res.data?.message ?? 'Failed to create arrived lot from prelot');
// //         }
// //         Alert.alert(t('success_title') ?? 'Success', t('arrived_lot_created') ?? 'Arrived lot created successfully', [
// //           { text: t('ok') ?? 'OK', onPress: () => navigation.goBack() },
// //         ]);
// //         return;
// //       } catch (err: any) {
// //         console.log('create from prelot error', err?.response?.data ?? err?.message ?? err);
// //         const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
// //         Alert.alert(t('error_title') ?? 'Error', msg);
// //       } finally {
// //         setSubmitting(false);
// //       }
// //       return;
// //     }

// //     // Manual / normal flow - validate and create DTO as before
// //     if (!cropName || !quantity || !mandiName) {
// //       return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
// //     }
// //     const qtyNum = parseFloat(quantity);
// //     if (isNaN(qtyNum) || qtyNum <= 0) {
// //       return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
// //     }

// //     const CropId = pickCropIdForSelection();
// //     const MandiId = pickMandiIdForSelection();
// //     if (!CropId || !MandiId) {
// //       return Alert.alert(t('error_title') ?? 'Error', 'Invalid crop or mandi selected. Please re-select.');
// //     }

// //     const dto: any = {
// //       MandiId,
// //       CropId,
// //       Quantity: qtyNum,
// //       Grade: grade || null,
// //       LotImageUrl: null,
// //       PreLotId: null,
// //     };

// //     if (selectedOwner) {
// //       dto.LotOwnerRole = selectedOwner.role;
// //       dto.LotOwnerName = selectedOwner.name;
// //       dto.MobileNum = selectedOwner.mobile ?? '';
// //       if (selectedOwner.role === 'farmer') dto.FarmerId = selectedOwner.id;
// //       if (selectedOwner.role === 'seller') dto.SellerId = selectedOwner.id;
// //     } else {
// //       if (!manualName || !manualMobile || !manualRole) {
// //         return Alert.alert(t('missing_owner_fields') ?? 'Missing owner fields', t('fill_owner_fields') ?? 'Please provide owner name and mobile and role');
// //       }
// //       dto.LotOwnerRole = manualRole;
// //       dto.LotOwnerName = manualName;
// //       dto.MobileNum = manualMobile;
// //       dto.FarmerId = manualRole === 'farmer' ? null : null;
// //       dto.SellerId = manualRole === 'seller' ? null : null;
// //     }

// //     setSubmitting(true);
// //     try {
// //       const res = await api.post('/mandi-official/lots/arrived/create', dto);
// //       if (!res.status.toString().startsWith('2')) {
// //         throw new Error(res.data?.message || 'Failed to create arrived lot');
// //       }
// //       Alert.alert(t('success_title') ?? 'Success', t('arrived_lot_created') ?? 'Arrived lot created successfully', [
// //         { text: t('ok') ?? 'OK', onPress: () => navigation.goBack() },
// //       ]);
// //     } catch (err: any) {
// //       console.log('create arrived lot error', err?.response?.data ?? err?.message ?? err);
// //       const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
// //       Alert.alert(t('error_title') ?? 'Error', msg);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // ----- resolve IDs helpers reused -----
// //   // const pickCropIdForSelection = (): number | null => {
// //   //   if (!cropName) return null;
// //   //   let match = crops.find(c => c.name === cropName && ((c.grade ?? '') === grade || (c.grade ?? '') === ''));
// //   //   if (!match) match = crops.find(c => c.name === cropName);
// //   //   return match?.id ?? null;
// //   // };
// //   // const pickMandiIdForSelection = (): number | null => {
// //   //   if (!mandiName) return null;
// //   //   const m = mandis.find(x => x.name === mandiName);
// //   //   return m?.id ?? null;
// //   // };

// //   if (loadingMeta) {
// //     return (
// //       <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
// //         <ActivityIndicator size="large" />
// //         <Text style={{ marginTop: 8, color: theme.text }}>{t('loading_meta') ?? 'Loading...'}</Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// //         <Text style={[styles.title, { color: theme.text }]}>{t('register_lot_btn') ?? t('register_lot_btn') ?? 'Register Lot'}</Text>

// //         {/* PreLot -->
// //             Input + Fetch Button */}
// //         <Text style={[styles.label, { color: theme.text }]}>{t('prelot_id_label') ?? 'Pre-registered Lot ID'}</Text>
// //         <View style={styles.row}>
// //           <TextInput
// //             placeholder={t('prelot_id_placeholder') ?? 'Enter PreLot ID'}
// //             placeholderTextColor="#9ca3af"
// //             value={preLotIdInput}
// //             onChangeText={setPreLotIdInput}
// //             style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
// //             returnKeyType="search"
// //             onSubmitEditing={fetchPreLot}
// //           />
// //           <TouchableOpacity style={[styles.smallBtn]} onPress={fetchPreLot}>
// //             <Text style={styles.smallBtnText}>{t('fetch_prelot_btn') ?? 'Fetch PreLot'}</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {prelotLoading && <ActivityIndicator style={{ marginVertical: 10 }} />}
// //         {prelotError ? <Text style={{ color: '#ef4444', marginHorizontal: 16 }}>{prelotError}</Text> : null}

// //         {/* If prelot found show read-only details */}
// //         {prelotDetail ? (
// //           <View style={[styles.prelotBox, { borderColor: theme.text }]}>
// //             <Text style={{ fontWeight: '700', color: theme.text }}>{t('prelot_details') ?? 'PreLot Details'}</Text>
// //             <Text style={{ color: theme.text }}>{t('prelot_id_label') ?? 'ID'}: {prelotDetail.preLotId}</Text>
// //             <Text style={{ color: theme.text }}>{t('crop') ?? 'Crop'}: {prelotDetail.cropName}</Text>
// //             <Text style={{ color: theme.text }}>{t('grade_label') ?? 'Grade'}: {prelotDetail.grade ?? '-'}</Text>
// //             <Text style={{ color: theme.text }}>{t('quantity_label') ?? 'Quantity'}: {prelotDetail.quantity}</Text>
// //             <Text style={{ color: theme.text }}>{t('expected_amount') ?? 'Expected Amount'}: {prelotDetail.sellingAmount ?? '-'}</Text>
// //             <Text style={{ color: theme.text }}>{t('mandi_label') ?? 'Mandi'}: {prelotDetail.mandiName}</Text>
// //             <Text style={{ color: theme.text }}>{t('arrival_label') ?? 'Expected Arrival'}: {prelotDetail.expectedArrivalDate ?? '-'}</Text>
// //             <Text style={{ color: theme.text }}>{t('prelot_source') ?? 'Source'}: {prelotSource}</Text>
// //             <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { setPrelotDetail(null); setPreLotIdInput(''); setPrelotSource(null); }}>
// //               <Text style={{ color: theme.primary ?? '#2b6cb0' }}>{t('clear') ?? 'Clear'}</Text>
// //             </TouchableOpacity>
// //           </View>
// //         ) : null}

// //         <View style={{ height: 8 }} />

// //         {/* Owner Search (only used for manual flow) */}
// //         {!prelotDetail && (
// //           <>
// //             <Text style={[styles.label, { color: theme.text }]}>{t('search_owner_label')}</Text>
// //             <View style={styles.row}>
// //               <TextInput
// //                 placeholder={t('search_owner_placeholder') ?? 'Search by name or mobile'}
// //                 placeholderTextColor="#9ca3af"
// //                 value={ownerKeyword}
// //                 onChangeText={(v) => setOwnerKeyword(v)}
// //                 style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
// //                 onSubmitEditing={() => searchOwner(ownerKeyword)}
// //                 returnKeyType="search"
// //               />
// //               <TouchableOpacity style={[styles.smallBtn]} onPress={() => searchOwner(ownerKeyword)}>
// //                 <Text style={styles.smallBtnText}>{t('search_btn')}</Text>
// //               </TouchableOpacity>
// //             </View>

// //             {ownerSearchLoading ? (
// //               <ActivityIndicator style={{ marginVertical: 10 }} />
// //             ) : ownerResults.length > 0 ? (
// //               <View style={{ marginVertical: 8 }}>
// //                 <Text style={[styles.subTitle, { color: theme.text }]}>{t('search_results')}</Text>
// //                 <FlatList
// //                   data={ownerResults}
// //                   keyExtractor={(it) => String(it.id)}
// //                   renderItem={({ item }) => (
// //                     <TouchableOpacity onPress={() => onSelectOwner(item)} style={[styles.ownerItem, selectedOwner?.id === item.id && styles.ownerItemSelected]}>
// //                       <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
// //                       <Text style={{ color: theme.text }}>{item.mobile} • {item.role}</Text>
// //                     </TouchableOpacity>
// //                   )}
// //                 />
// //               </View>
// //             ) : null}

// //             {selectedOwner ? (
// //               <View style={[styles.selectedOwnerBox, { borderColor: '#10b981' }]}>
// //                 <Text style={{ fontWeight: '700', color: theme.text }}>{t('selected_owner')}: {selectedOwner.name}</Text>
// //                 <Text style={{ color: theme.text }}>{selectedOwner.mobile} • {selectedOwner.role}</Text>
// //                 <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedOwner}><Text style={{ color: '#ef4444' }}>{t('clear_selection')}</Text></TouchableOpacity>
// //               </View>
// //             ) : null}

// //             {!selectedOwner && (
// //               <>
// //                 <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>
// //                 <TextInput placeholder={t('owner_name_placeholder') ?? 'Owner Name'} placeholderTextColor="#9ca3af" value={manualName} onChangeText={setManualName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// //                 <TextInput placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'} placeholderTextColor="#9ca3af" value={manualMobile} onChangeText={setManualMobile} keyboardType="phone-pad" style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// //                 <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
// //                 <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                   <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v as 'farmer'|'seller')}>
// //                     <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
// //                     <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
// //                   </Picker>
// //                 </View>
// //               </>
// //             )}
// //           </>
// //         )}

// //         {/* Lot details (if prelot -> already filled and read-only visually; else manual inputs) */}
// //         {/* Crop */}
// //         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
// //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //           <Picker selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''} onValueChange={v => setCropName(String(v))} enabled={!prelotDetail}>
// //             <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// //             {cropOptions.map(c => (<Picker.Item key={c} label={c} value={c} />))}
// //             <Picker.Item label="Other" value="Other" />
// //           </Picker>
// //         </View>
// //         {cropName && !isValidPickerValue(cropName, cropOptions) && cropName !== 'Other' && (
// //           <TextInput placeholder={t('type_crop') ?? 'Type crop'} placeholderTextColor={theme.text ?? '#999'} value={cropName} onChangeText={setCropName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
// //         )}

// //         {/* Grade */}
// //         <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
// //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //           <Picker selectedValue={grade} onValueChange={v => setGrade(String(v))} enabled={!prelotDetail}>
// //             <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
// //             {currentGrades.map(g => (<Picker.Item key={g} label={g} value={g} />))}
// //           </Picker>
// //         </View>
// //         {grade === 'Other' && !prelotDetail && (
// //           <TextInput placeholder={t('type_grade') ?? 'Type grade'} placeholderTextColor={theme.text ?? '#999'} value={grade} onChangeText={setGrade} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
// //         )}

// //         {/* Quantity */}
// //         <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
// //         <TextInput placeholder={t('quantity_placeholder') ?? 'Quantity'} placeholderTextColor="#9ca3af" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={[styles.input, { borderColor: theme.text, color: theme.text }]} editable={!prelotDetail} />

// //         {/* Mandi */}
// //         <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label')}</Text>
// //         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //           <Picker selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''} onValueChange={v => setMandiName(String(v))} enabled={!prelotDetail}>
// //             <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// //             {mandiOptions.map(m => (<Picker.Item key={m} label={m} value={m} />))}
// //             <Picker.Item label="Other" value="Other" />
// //           </Picker>
// //         </View>
// //         {mandiName && !isValidPickerValue(mandiName, mandiOptions) && mandiName !== 'Other' && !prelotDetail && (
// //           <TextInput placeholder={t('type_mandi') ?? 'Type mandi'} placeholderTextColor={theme.text ?? '#999'} value={mandiName} onChangeText={setMandiName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
// //         )}

// //         <TouchableOpacity style={[styles.submitBtn, submitting && { opacity: 0.7 }]} onPress={handleSubmit} disabled={submitting}>
// //           {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>{prelotDetail ? (t('create_from_prelot_btn') ?? 'Register Arrived Lot from PreLot') : (t('create_arrived_lot_btn') ?? 'Create Arrived Lot')}</Text>}
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   title: { fontSize: 22, fontWeight: '700', padding: 16 },
// //   label: { fontSize: 14, fontWeight: '700', paddingHorizontal: 16, marginTop: 12 },
// //   subLabel: { fontSize: 14, fontWeight: '600', paddingHorizontal: 16, marginTop: 10, color: '#6b7280' },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginHorizontal: 16, marginTop: 8 },
// //   pickerWrap: { borderWidth: 1, borderRadius: 8, marginHorizontal: 16, marginTop: 8, overflow: 'hidden' },
// //   submitBtn: { backgroundColor: '#10b981', margin: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
// //   submitBtnText: { color: '#fff', fontWeight: '700' },
// //   row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 8 },
// //   smallBtn: { marginLeft: 8, backgroundColor: '#374151', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
// //   smallBtnText: { color: '#fff', fontWeight: '700' },
// //   ownerItem: { padding: 10, marginHorizontal: 16, marginTop: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
// //   ownerItemSelected: { borderColor: '#10b981', backgroundColor: '#ecfdf5' },
// //   selectedOwnerBox: { marginHorizontal: 16, marginTop: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#10b981' },
// //   clearBtn: { marginTop: 6 },
// //   subTitle: { paddingHorizontal: 16, marginTop: 8, fontWeight: '700' },
// //   prelotBox: { marginHorizontal: 16, marginTop: 10, padding: 12, borderRadius: 8, borderWidth: 1, backgroundColor: '#f8fafc' },
// // });

// // src/screens/RegisterLot.tsx
// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
//   FlatList,
//   Keyboard,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import api from '../services/api';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// type CropRow = { id: number; name: string; grade?: string | null };
// type MandiRow = { id: number; name: string; location?: string };
// type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

// type PreLotDetail = {
//   preLotId: string;
//   cropId?: number;
//   cropName?: string;
//   mandiId?: number;
//   mandiName?: string;
//   quantity?: number;
//   grade?: string | null;
//   sellingAmount?: number | null;
//   expectedArrivalDate?: string | null;
//   lotImageUrl?: string | null;
//   qrCodeUrl?: string | null;
//   ownerRole?: 'farmer' | 'seller' | null;
//   ownerId?: string | null;
//   ownerName?: string | null;
//   ownerMobile?: string | null;
// };

// export default function RegisterLot() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // ---------- Edit these endpoints if your GET prelot path differs ----------
//   const PRELOT_ENDPOINTS = [
//     '/mandi-official/lots/preregistered/{id}', // recommended (if you expose it)
//     '/farmer/lots/{id}', // fallback (if accessible)
//     '/seller/lots/{id}', // fallback (if accessible)
//   ];
//   // -------------------------------------------------------------------------

//   // meta
//   const [crops, setCrops] = useState<CropRow[]>([]);
//   const [mandis, setMandis] = useState<MandiRow[]>([]);
//   const [loadingMeta, setLoadingMeta] = useState(true);

//   // prelot fetch
//   const [preLotIdInput, setPreLotIdInput] = useState('');
//   const [prelotLoading, setPrelotLoading] = useState(false);
//   const [prelotError, setPrelotError] = useState<string | null>(null);
//   const [prelotDetail, setPrelotDetail] = useState<PreLotDetail | null>(null);
//   const [prelotSource, setPrelotSource] = useState<string | null>(null);

//   // form fields
//   const [cropName, setCropName] = useState('');
//   const [grade, setGrade] = useState('');
//   const [quantity, setQuantity] = useState(''); // string for TextInput
//   const [mandiName, setMandiName] = useState('');

//   // owner search / selection
//   const [ownerKeyword, setOwnerKeyword] = useState('');
//   const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
//   const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
//   const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
//   const [manualName, setManualName] = useState('');
//   const [manualMobile, setManualMobile] = useState('');
//   const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

//   // submit
//   const [submitting, setSubmitting] = useState(false);

//   // derived dropdowns
//   const cropOptions = useMemo(() => Array.from(new Set(crops.map(c => c.name))), [crops]);
//   const mandiOptions = useMemo(() => Array.from(new Set(mandis.map(m => m.name))), [mandis]);

//   const currentGrades = useMemo(() => {
//     if (!cropName) return [];
//     const grades = crops
//       .filter(c => c.name === cropName && c.grade != null && c.grade !== '')
//       .map(c => String(c.grade));
//     const uniq = Array.from(new Set(grades));
//     if (!uniq.length) return ['Other'];
//     if (!uniq.includes('Other')) uniq.push('Other');
//     return uniq;
//   }, [cropName, crops]);

//   const isValidPickerValue = (value: string, options: string[]) =>
//     value === '' || options.includes(value) || value === 'Other';

//   // load meta (crops + mandis)
//   useEffect(() => {
//     let mounted = true;
//     const loadMeta = async () => {
//       try {
//         const [cropsRes, mandisRes] = await Promise.all([api.get('/crops'), api.get('/mandis')]);
//         if (!mounted) return;
//         const cropsData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
//         const mandisData = Array.isArray(mandisRes.data) ? mandisRes.data : [];

//         const mappedCrops = cropsData
//           .map((c: any) => {
//             const id = c.cropId ?? c.CropId ?? c.id;
//             const name = c.cropName ?? c.CropName ?? c.name;
//             const grade = c.grade ?? c.Grade ?? null;
//             if (!id || !name) return null;
//             return { id: Number(id), name: String(name), grade: grade ?? null };
//           })
//           .filter(Boolean) as CropRow[];

//         const mappedMandis = mandisData
//           .map((m: any) => {
//             const id = m.mandiId ?? m.MandiId ?? m.id;
//             const name = m.mandiName ?? m.MandiName ?? m.name;
//             const location = m.location ?? m.Location ?? '';
//             if (!id || !name) return null;
//             return { id: Number(id), name: String(name), location: String(location) };
//           })
//           .filter(Boolean) as MandiRow[];

//         setCrops(mappedCrops);
//         setMandis(mappedMandis);
//       } catch (err) {
//         console.log('RegisterLot meta load error', err);
//         Alert.alert(t('error_title') ?? 'Error', t('fetch_meta_failed') ?? 'Failed to load dropdown data.');
//       } finally {
//         setLoadingMeta(false);
//       }
//     };

//     loadMeta();
//     return () => {
//       mounted = false;
//     };
//   }, [t]);

//   // owner search API
//   const searchOwner = async (keyword: string) => {
//     if (!keyword || keyword.trim().length < 2) {
//       setOwnerResults([]);
//       return;
//     }
//     setOwnerSearchLoading(true);
//     try {
//       const res = await api.get('/mandi-official/lots/search-owner', { params: { keyword } });
//       const data = Array.isArray(res.data) ? res.data : [];
//       setOwnerResults(
//         data.map((d: any) => ({
//           role: d.role === 'seller' ? 'seller' : 'farmer',
//           id: String(d.id),
//           name: d.name ?? '',
//           mobile: d.mobile ?? '',
//         })),
//       );
//     } catch (err) {
//       console.log('search owner error', err);
//       Alert.alert(t('error_title') ?? 'Error', t('search_owner_failed') ?? 'Owner search failed.');
//     } finally {
//       setOwnerSearchLoading(false);
//     }
//   };

//   const onSelectOwner = (owner: Owner) => {
//     setSelectedOwner(owner);
//     setManualName('');
//     setManualMobile('');
//     setManualRole('farmer');
//     Keyboard.dismiss();
//   };
//   const clearSelectedOwner = () => {
//     setSelectedOwner(null);
//   };

//   // helpers to find IDs from name selections
//   const pickCropIdForSelection = (): number | null => {
//     if (!cropName) return null;
//     let match = crops.find(c => c.name === cropName && ((c.grade ?? '') === grade || (c.grade ?? '') === ''));
//     if (!match) match = crops.find(c => c.name === cropName);
//     return match?.id ?? null;
//   };
//   const pickMandiIdForSelection = (): number | null => {
//     if (!mandiName) return null;
//     const m = mandis.find(x => x.name === mandiName);
//     return m?.id ?? null;
//   };

//   // ---------- fetch pre-registered lot details ----------
//   const fetchPreLot = async () => {
//     const id = preLotIdInput?.trim();
//     setPrelotError(null);
//     setPrelotDetail(null);
//     setPrelotSource(null);

//     if (!id) {
//       setPrelotError(t('enter_prelot_id') ?? 'Enter PreLot ID');
//       return;
//     }

//     setPrelotLoading(true);
//     try {
//       let found = false;
//       for (const epTemplate of PRELOT_ENDPOINTS) {
//         const ep = epTemplate.replace('{id}', encodeURIComponent(id));
//         try {
//           const res = await api.get(ep);
//           if (res.status.toString().startsWith('2')) {
//             const d = res.data ?? {};
//             const detail: PreLotDetail = {
//               preLotId: d.preLotId ?? d.PreLotId ?? id,
//               cropId: d.cropId ?? d.CropId ?? d.CropId ?? d.cropId ?? undefined,
//               cropName: d.cropName ?? d.CropName ?? d.crop ?? '',
//               mandiId: d.mandiId ?? d.MandiId ?? d.MandiId ?? d.mandiId ?? undefined,
//               mandiName: d.mandiName ?? d.MandiName ?? d.mandiName ?? '',
//               quantity: Number(d.quantity ?? d.Quantity ?? 0),
//               grade: d.grade ?? d.Grade ?? null,
//               sellingAmount: d.sellingAmount ?? d.SellingAmount ?? null,
//               expectedArrivalDate: d.expectedArrivalDate ?? d.ExpectedArrivalDate ?? null,
//               lotImageUrl: d.lotImageUrl ?? d.LotImageUrl ?? null,
//               qrCodeUrl: d.qrCodeUrl ?? d.QrCodeUrl ?? null,
//               ownerRole: (d.ownerRole ?? d.role ?? null) as any,
//               ownerId: d.ownerId ?? d.OwnerId ?? null,
//               ownerName: d.ownerName ?? d.OwnerName ?? null,
//               ownerMobile: d.ownerMobile ?? d.OwnerMobile ?? null,
//             };

//             // set prelot and prefill
//             setPrelotDetail(detail);
//             setPrelotSource(ep);

//             if (detail.cropName) setCropName(detail.cropName);
//             if (detail.grade) setGrade(detail.grade);
//             if (detail.quantity != null) setQuantity(String(detail.quantity));
//             if (detail.mandiName) setMandiName(detail.mandiName);

//             if (detail.ownerRole && detail.ownerId) {
//               setSelectedOwner({
//                 id: String(detail.ownerId),
//                 name: detail.ownerName ?? '',
//                 mobile: detail.ownerMobile ?? '',
//                 role: detail.ownerRole === 'seller' ? 'seller' : 'farmer',
//               });
//             }

//             found = true;
//             break;
//           }
//         } catch (err: any) {
//           const st = err?.response?.status;
//           if (st === 404 || st === 400) {
//             // not found on this endpoint, try next
//             continue;
//           } else {
//             console.log(`prelot fetch error at ${ep}:`, err?.response?.data ?? err?.message ?? err);
//             continue;
//           }
//         }
//       }

//       if (!found) {
//         setPrelotError(t('prelot_not_found') ?? 'Pre-registered lot not found');
//       }
//     } finally {
//       setPrelotLoading(false);
//     }
//   };

//   // ---------- submit logic (follows your controller DTOs & service) ----------
//   const handleSubmit = async () => {
//     // If prelot selected -> call from-prelot endpoint which will map and save on server
//     if (prelotDetail) {
//       setSubmitting(true);
//       try {
//         // POST /mandi-official/lots/arrived/from-prelot?preLotId={id}
//         const res = await api.post('/mandi-official/lots/arrived/from-prelot', null, {
//           params: { preLotId: prelotDetail.preLotId },
//         });
//         if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message ?? 'Failed');
//         Alert.alert(
//           t('success_title') ?? 'Success',
//           t('arrived_lot_created') ?? 'Arrived lot created successfully',
//           [{ text: t('ok') ?? 'OK', onPress: () => navigation.goBack() }],
//         );
//         return;
//       } catch (err: any) {
//         console.log('create from prelot error', err?.response?.data ?? err?.message ?? err);
//         const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
//         Alert.alert(t('error_title') ?? 'Error', msg);
//       } finally {
//         setSubmitting(false);
//       }
//       return;
//     }

//     // Manual flow: validate
//     if (!cropName || !quantity || !mandiName) {
//       return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
//     }
//     const qtyNum = parseFloat(quantity);
//     if (isNaN(qtyNum) || qtyNum <= 0) {
//       return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
//     }
//     const CropId = pickCropIdForSelection();
//     const MandiId = pickMandiIdForSelection();
//     if (!CropId || !MandiId) {
//       return Alert.alert(t('error_title') ?? 'Error', 'Invalid crop or mandi selected. Please re-select.');
//     }

//     // Build DTO to match ArrivedLotCreateDto
//     const dto: any = {
//       MandiId: MandiId,
//       CropId: CropId,
//       Quantity: qtyNum,
//       Grade: grade || null,
//       LotImageUrl: null,
//       PreLotId: null,
//     };

//     if (selectedOwner) {
//       dto.LotOwnerRole = selectedOwner.role;
//       dto.LotOwnerName = selectedOwner.name;
//       dto.MobileNum = selectedOwner.mobile ?? '';
//       if (selectedOwner.role === 'farmer') dto.FarmerId = selectedOwner.id;
//       if (selectedOwner.role === 'seller') dto.SellerId = selectedOwner.id;
//     } else {
//       if (!manualName || !manualMobile || !manualRole) {
//         return Alert.alert(t('missing_owner_fields') ?? 'Missing owner fields', t('fill_owner_fields') ?? 'Please provide owner name and mobile and role');
//       }
//       dto.LotOwnerRole = manualRole;
//       dto.LotOwnerName = manualName;
//       dto.MobileNum = manualMobile;
//       dto.FarmerId = null;
//       dto.SellerId = null;
//     }

//     setSubmitting(true);
//     try {
//       const res = await api.post('/mandi-official/lots/arrived/create', dto);
//       if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message ?? 'Failed');
//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('arrived_lot_created') ?? 'Arrived lot created successfully',
//         [{ text: t('ok') ?? 'OK', onPress: () => navigation.goBack() }],
//       );
//     } catch (err: any) {
//       console.log('create arrived lot error', err?.response?.data ?? err?.message ?? err);
//       const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
//       Alert.alert(t('error_title') ?? 'Error', msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loadingMeta) {
//     return (
//       <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
//         <ActivityIndicator size="large" />
//         <Text style={{ marginTop: 8, color: theme.text }}>{t('loading_meta') ?? 'Loading...'}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text style={[styles.title, { color: theme.text }]}>{t('register_lot_btn') ?? 'Register Lot'}</Text>

//         {/* PreLot input */}
//         <Text style={[styles.label, { color: theme.text }]}>{t('prelot_id_label') ?? 'Pre-registered Lot ID'}</Text>
//         <View style={styles.row}>
//           <TextInput
//             placeholder={t('prelot_id_placeholder') ?? 'Enter PreLot ID'}
//             placeholderTextColor="#9ca3af"
//             value={preLotIdInput}
//             onChangeText={setPreLotIdInput}
//             style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
//             returnKeyType="search"
//             onSubmitEditing={fetchPreLot}
//           />
//           <TouchableOpacity style={[styles.smallBtn]} onPress={fetchPreLot}>
//             <Text style={styles.smallBtnText}>{t('fetch_prelot_btn') ?? 'Fetch PreLot'}</Text>
//           </TouchableOpacity>
//         </View>

//         {prelotLoading && <ActivityIndicator style={{ marginVertical: 10 }} />}
//         {prelotError ? <Text style={{ color: '#ef4444', marginHorizontal: 16 }}>{prelotError}</Text> : null}

//         {prelotDetail ? (
//           <View style={[styles.prelotBox, { borderColor: theme.text }]}>
//             <Text style={{ fontWeight: '700', color: theme.text }}>{t('prelot_details') ?? 'PreLot Details'}</Text>
//             <Text style={{ color: theme.text }}>{t('prelot_id_label') ?? 'ID'}: {prelotDetail.preLotId}</Text>
//             <Text style={{ color: theme.text }}>{t('crop') ?? 'Crop'}: {prelotDetail.cropName}</Text>
//             <Text style={{ color: theme.text }}>{t('grade_label') ?? 'Grade'}: {prelotDetail.grade ?? '-'}</Text>
//             <Text style={{ color: theme.text }}>{t('quantity_label') ?? 'Quantity'}: {prelotDetail.quantity}</Text>
//             <Text style={{ color: theme.text }}>{t('expected_amount') ?? 'Expected Amount'}: {prelotDetail.sellingAmount ?? '-'}</Text>
//             <Text style={{ color: theme.text }}>{t('mandi_label') ?? 'Mandi'}: {prelotDetail.mandiName}</Text>
//             <Text style={{ color: theme.text }}>{t('arrival_label') ?? 'Expected Arrival'}: {prelotDetail.expectedArrivalDate ?? '-'}</Text>
//             <Text style={{ color: theme.text }}>{t('prelot_source') ?? 'Source'}: {prelotSource ?? '-'}</Text>
//             <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { setPrelotDetail(null); setPreLotIdInput(''); setPrelotSource(null); }}>
//               <Text style={{ color: theme.primary ?? '#2b6cb0' }}>{t('clear') ?? 'Clear'}</Text>
//             </TouchableOpacity>
//           </View>
//         ) : null}

//         <View style={{ height: 8 }} />

//         {/* Owner search / manual (only when no prelotDetail) */}
//         {!prelotDetail && (
//           <>
//             <Text style={[styles.label, { color: theme.text }]}>{t('search_owner_label')}</Text>
//             <View style={styles.row}>
//               <TextInput
//                 placeholder={t('search_owner_placeholder') ?? 'Search by name or mobile'}
//                 placeholderTextColor="#9ca3af"
//                 value={ownerKeyword}
//                 onChangeText={(v) => setOwnerKeyword(v)}
//                 style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
//                 onSubmitEditing={() => searchOwner(ownerKeyword)}
//                 returnKeyType="search"
//               />
//               <TouchableOpacity style={[styles.smallBtn]} onPress={() => searchOwner(ownerKeyword)}>
//                 <Text style={styles.smallBtnText}>{t('search_btn')}</Text>
//               </TouchableOpacity>
//             </View>

//             {ownerSearchLoading ? (
//               <ActivityIndicator style={{ marginVertical: 10 }} />
//             ) : ownerResults.length > 0 ? (
//               <View style={{ marginVertical: 8 }}>
//                 <Text style={[styles.subTitle, { color: theme.text }]}>{t('search_results')}</Text>
//                 <FlatList
//                   data={ownerResults}
//                   keyExtractor={(it) => String(it.id)}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity onPress={() => onSelectOwner(item)} style={[styles.ownerItem, selectedOwner?.id === item.id && styles.ownerItemSelected]}>
//                       <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
//                       <Text style={{ color: theme.text }}>{item.mobile} • {item.role}</Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             ) : null}

//             {selectedOwner ? (
//               <View style={[styles.selectedOwnerBox, { borderColor: '#10b981' }]}>
//                 <Text style={{ fontWeight: '700', color: theme.text }}>{t('selected_owner')}: {selectedOwner.name}</Text>
//                 <Text style={{ color: theme.text }}>{selectedOwner.mobile} • {selectedOwner.role}</Text>
//                 <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedOwner}><Text style={{ color: '#ef4444' }}>{t('clear_selection')}</Text></TouchableOpacity>
//               </View>
//             ) : null}

//             {!selectedOwner && (
//               <>
//                 <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>
//                 <TextInput placeholder={t('owner_name_placeholder') ?? 'Owner Name'} placeholderTextColor="#9ca3af" value={manualName} onChangeText={setManualName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
//                 <TextInput placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'} placeholderTextColor="#9ca3af" value={manualMobile} onChangeText={setManualMobile} keyboardType="phone-pad" style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
//                 <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
//                 <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                   <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v as 'farmer'|'seller')}>
//                     <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
//                     <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
//                   </Picker>
//                 </View>
//               </>
//             )}
//           </>
//         )}

//         {/* Lot details */}
//         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''} onValueChange={v => setCropName(String(v))} enabled={!prelotDetail}>
//             <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//             {cropOptions.map(c => (<Picker.Item key={c} label={c} value={c} />))}
//             <Picker.Item label="Other" value="Other" />
//           </Picker>
//         </View>

//         {cropName && !isValidPickerValue(cropName, cropOptions) && cropName !== 'Other' && (
//           <TextInput placeholder={t('type_crop') ?? 'Type crop'} placeholderTextColor={theme.text ?? '#999'} value={cropName} onChangeText={setCropName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
//         )}

//         <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker selectedValue={grade} onValueChange={v => setGrade(String(v))} enabled={!prelotDetail}>
//             <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
//             {currentGrades.map(g => (<Picker.Item key={g} label={g} value={g} />))}
//           </Picker>
//         </View>

//         {grade === 'Other' && !prelotDetail && (
//           <TextInput placeholder={t('type_grade') ?? 'Type grade'} placeholderTextColor={theme.text ?? '#999'} value={grade} onChangeText={setGrade} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
//         )}

//         <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
//         <TextInput placeholder={t('quantity_placeholder') ?? 'Quantity'} placeholderTextColor="#9ca3af" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={[styles.input, { borderColor: theme.text, color: theme.text }]} editable={!prelotDetail} />

//         <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label')}</Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''} onValueChange={v => setMandiName(String(v))} enabled={!prelotDetail}>
//             <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//             {mandiOptions.map(m => (<Picker.Item key={m} label={m} value={m} />))}
//             <Picker.Item label="Other" value="Other" />
//           </Picker>
//         </View>

//         {mandiName && !isValidPickerValue(mandiName, mandiOptions) && mandiName !== 'Other' && !prelotDetail && (
//           <TextInput placeholder={t('type_mandi') ?? 'Type mandi'} placeholderTextColor={theme.text ?? '#999'} value={mandiName} onChangeText={setMandiName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
//         )}

//         <TouchableOpacity style={[styles.submitBtn, submitting && { opacity: 0.7 }]} onPress={handleSubmit} disabled={submitting}>
//           {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>{prelotDetail ? (t('create_from_prelot_btn') ?? 'Register Arrived Lot from PreLot') : (t('create_arrived_lot_btn') ?? 'Create Arrived Lot')}</Text>}
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   title: { fontSize: 22, fontWeight: '700', padding: 16 },
//   label: { fontSize: 14, fontWeight: '700', paddingHorizontal: 16, marginTop: 12 },
//   subLabel: { fontSize: 14, fontWeight: '600', paddingHorizontal: 16, marginTop: 10, color: '#6b7280' },
//   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginHorizontal: 16, marginTop: 8 },
//   pickerWrap: { borderWidth: 1, borderRadius: 8, marginHorizontal: 16, marginTop: 8, overflow: 'hidden' },
//   submitBtn: { backgroundColor: '#10b981', margin: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
//   submitBtnText: { color: '#fff', fontWeight: '700' },
//   row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 8 },
//   smallBtn: { marginLeft: 8, backgroundColor: '#374151', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
//   smallBtnText: { color: '#fff', fontWeight: '700' },
//   ownerItem: { padding: 10, marginHorizontal: 16, marginTop: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
//   ownerItemSelected: { borderColor: '#10b981', backgroundColor: '#ecfdf5' },
//   selectedOwnerBox: { marginHorizontal: 16, marginTop: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#10b981' },
//   clearBtn: { marginTop: 6 },
//   subTitle: { paddingHorizontal: 16, marginTop: 8, fontWeight: '700' },
//   prelotBox: { marginHorizontal: 16, marginTop: 10, padding: 12, borderRadius: 8, borderWidth: 1, backgroundColor: '#f8fafc' },
// });

// src/screens/RegisterLot.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Crop = { cropId?: number; id?: number; cropName?: string; name?: string; grade?: string | null };
type Mandi = { mandiId?: number; id?: number; mandiName?: string; name?: string; location?: string };
type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

type PreLotDetail = {
  preLotId: string;
  cropId?: number;
  cropName?: string;
  mandiId?: number;
  mandiName?: string;
  quantity?: number;
  grade?: string | null;
  sellingAmount?: number | null;
  expectedArrivalDate?: string | null;
  lotImageUrl?: string | null;
  qrCodeUrl?: string | null;
  ownerRole?: 'farmer' | 'seller' | null;
  ownerId?: string | null;
  ownerName?: string | null;
  ownerMobile?: string | null;
};

export default function RegisterLot() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  // ---------- Endpoints (adjust if your backend differs) ----------
  // We try Farmer / Seller prelot GET endpoints (as you mentioned these exist).
  const PRELOT_ENDPOINTS = ['/farmer/lots/{id}', '/seller/lots/{id}'];
  // ----------------------------------------------------------------

  // meta
  const [crops, setCrops] = useState<Crop[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [mandis, setMandis] = useState<Mandi[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  // prelot fetch
  const [preLotIdInput, setPreLotIdInput] = useState('');
  const [prelotLoading, setPrelotLoading] = useState(false);
  const [prelotError, setPrelotError] = useState<string | null>(null);
  const [prelotDetail, setPrelotDetail] = useState<PreLotDetail | null>(null);
  const [prelotSource, setPrelotSource] = useState<string | null>(null);

  // form fields
  const [cropId, setCropId] = useState<number | null>(null);
  const [cropName, setCropName] = useState('');
  const [grade, setGrade] = useState('');
  const [quantity, setQuantity] = useState(''); // string for TextInput
  const [mandiId, setMandiId] = useState<number | null>(null);
  const [mandiName, setMandiName] = useState('');

  // owner search/selection
  const [ownerKeyword, setOwnerKeyword] = useState<string>('');
  const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
  const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

  // manual owner fields (when not found)
  const [manualName, setManualName] = useState('');
  const [manualMobile, setManualMobile] = useState('');
  const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

  // submission
  const [submitting, setSubmitting] = useState(false);

  // derived dropdowns
  const cropOptions = useMemo(() => Array.from(new Set(crops.map(c => c.cropName ?? c.name ?? ''))).filter(Boolean), [crops]);
  const mandiOptions = useMemo(() => Array.from(new Set(mandis.map(m => m.mandiName ?? m.name ?? ''))).filter(Boolean), [mandis]);

  // grades: if you have global grades endpoint, we keep it separate; fallback computed from crops
  useEffect(() => {
    // compute grade list from crops if not separately provided
    const gs = crops
      .map(c => (c.grade ? String(c.grade) : null))
      .filter(Boolean) as string[];
    const uniq = Array.from(new Set(gs));
    setGrades(uniq);
  }, [crops]);

  const currentGrades = useMemo(() => {
    if (!cropName) return [];
    const gradesForCrop = crops
      .filter(c => (c.cropName ?? c.name) === cropName && c.grade != null)
      .map(c => String(c.grade));
    const unique = Array.from(new Set(gradesForCrop));
    if (!unique.length) return ['Other'];
    if (!unique.includes('Other')) unique.push('Other');
    return unique;
  }, [cropName, crops]);

  const isValidPickerValue = (value: string, options: string[]) => {
    return value === '' || options.includes(value) || value === 'Other';
  };

  // load meta (crops + mandis)
  useEffect(() => {
    let mounted = true;
    const loadMeta = async () => {
      try {
        const [cropsRes, mandisRes] = await Promise.all([api.get('/crops'), api.get('/mandis')]);
        if (!mounted) return;
        const cropsData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
        const mandisData = Array.isArray(mandisRes.data) ? mandisRes.data : [];

        const mappedCrops: Crop[] = cropsData
          .map((c: any) => {
            const id = c.cropId ?? c.CropId ?? c.id;
            const name = c.cropName ?? c.CropName ?? c.name;
            const gradeVal = c.grade ?? c.Grade ?? null;
            if (!id || !name) return null;
            return { cropId: Number(id), id: Number(id), cropName: String(name), name: String(name), grade: gradeVal };
          })
          .filter(Boolean) as Crop[];

        const mappedMandis: Mandi[] = mandisData
          .map((m: any) => {
            const id = m.mandiId ?? m.MandiId ?? m.id;
            const name = m.mandiName ?? m.MandiName ?? m.name;
            const location = m.location ?? m.Location ?? '';
            if (!id || !name) return null;
            return { mandiId: Number(id), id: Number(id), mandiName: String(name), name: String(name), location: String(location) };
          })
          .filter(Boolean) as Mandi[];

        setCrops(mappedCrops);
        setMandis(mappedMandis);
      } catch (err) {
        console.log('RegisterLot meta load error', err);
        Alert.alert(t('error_title') ?? 'Error', t('fetch_meta_failed') ?? 'Failed to load dropdown data.');
      } finally {
        setLoadingMeta(false);
      }
    };

    loadMeta();
    return () => {
      mounted = false;
    };
  }, [t]);

  // owner search
  const searchOwner = async (keyword: string) => {
    if (!keyword || keyword.trim().length < 2) {
      setOwnerResults([]);
      return;
    }
    setOwnerSearchLoading(true);
    try {
      const res = await api.get('/mandi-official/lots/search-owner', { params: { keyword } });
      const data = Array.isArray(res.data) ? res.data : [];
      setOwnerResults(
        data.map((d: any) => ({
          role: d.role === 'seller' ? 'seller' : 'farmer',
          id: String(d.id),
          name: d.name ?? '',
          mobile: d.mobile ?? '',
        })),
      );
    } catch (err) {
      console.log('search owner error', err);
      Alert.alert(t('error_title') ?? 'Error', t('search_owner_failed') ?? 'Owner search failed.');
    } finally {
      setOwnerSearchLoading(false);
    }
  };

  const onSelectOwner = (owner: Owner) => {
    setSelectedOwner(owner);
    setManualName('');
    setManualMobile('');
    setManualRole('farmer');
    Keyboard.dismiss();
  };
  const clearSelectedOwner = () => {
    setSelectedOwner(null);
  };

  // helpers: pick the correct IDs from selection values
  const pickCropIdForSelection = () => {
    if (!cropName) return null;
    let match = crops.find(c => (c.cropName ?? c.name) === cropName && ((c.grade ?? '') === grade || (c.grade ?? '') === ''));
    if (!match) match = crops.find(c => (c.cropName ?? c.name) === cropName);
    return match?.cropId ?? match?.id ?? null;
  };

  const pickMandiIdForSelection = () => {
    if (!mandiName) return null;
    const m = mandis.find(x => (x.mandiName ?? x.name) === mandiName);
    return m?.mandiId ?? m?.id ?? null;
  };

  // ---------- fetch pre-registered lot details ----------
  const fetchPreLot = async () => {
    const id = preLotIdInput?.trim();
    setPrelotError(null);
    setPrelotDetail(null);
    setPrelotSource(null);

    if (!id) {
      setPrelotError(t('enter_prelot_id') ?? 'Enter PreLot ID');
      return;
    }

    setPrelotLoading(true);
    try {
      let found = false;
      for (const epTemplate of PRELOT_ENDPOINTS) {
        const ep = epTemplate.replace('{id}', encodeURIComponent(id));
        try {
          const res = await api.get(ep);
          if (res.status >= 200 && res.status < 300) {
            const d = res.data ?? {};
            const detail: PreLotDetail = {
              preLotId: d.preLotId ?? d.PreLotId ?? id,
              cropId: d.cropId ?? d.CropId ?? d.CropId ?? undefined,
              cropName: d.cropName ?? d.CropName ?? d.crop ?? '',
              mandiId: d.mandiId ?? d.MandiId ?? undefined,
              mandiName: d.mandiName ?? d.MandiName ?? d.mandiName ?? '',
              quantity: Number(d.quantity ?? d.Quantity ?? 0),
              grade: d.grade ?? d.Grade ?? null,
              sellingAmount: d.sellingAmount ?? d.SellingAmount ?? null,
              expectedArrivalDate: d.expectedArrivalDate ?? d.ExpectedArrivalDate ?? null,
              lotImageUrl: d.lotImageUrl ?? d.LotImageUrl ?? null,
              qrCodeUrl: d.qrCodeUrl ?? d.QrCodeUrl ?? null,
              ownerRole: (d.ownerRole ?? d.role ?? null) as any,
              ownerId: d.ownerId ?? d.OwnerId ?? null,
              ownerName: d.ownerName ?? d.OwnerName ?? null,
              ownerMobile: d.ownerMobile ?? d.OwnerMobile ?? null,
            };

            setPrelotDetail(detail);
            setPrelotSource(ep);

            // Prefill form fields from prelot
            if (detail.cropName) setCropName(detail.cropName);
            if (detail.grade) setGrade(detail.grade ?? '');
            if (detail.quantity != null) setQuantity(String(detail.quantity));
            if (detail.mandiName) setMandiName(detail.mandiName);

            if (detail.ownerRole && detail.ownerId) {
              setSelectedOwner({
                id: String(detail.ownerId),
                name: detail.ownerName ?? '',
                mobile: detail.ownerMobile ?? '',
                role: detail.ownerRole === 'seller' ? 'seller' : 'farmer',
              });
            }

            found = true;
            break;
          }
        } catch (err: any) {
          const st = err?.response?.status;
          if (st === 404 || st === 400) {
            continue; // try next endpoint
          } else {
            console.log(`prelot fetch error at ${ep}:`, err?.response?.data ?? err?.message ?? err);
            continue;
          }
        }
      }

      if (!found) {
        setPrelotError(t('prelot_not_found') ?? 'Pre-registered lot not found');
      }
    } finally {
      setPrelotLoading(false);
    }
  };

  // helper: map prelot -> ArrivedLotCreateDto shape
  const mapPrelotToDto = (prelot: PreLotDetail) => {
    const dto: any = {
      MandiId: prelot.mandiId ?? null,
      CropId: prelot.cropId ?? null,
      Quantity: prelot.quantity ?? 0,
      Grade: prelot.grade ?? null,
      LotImageUrl: prelot.lotImageUrl ?? null,
      PreLotId: prelot.preLotId ?? null,
    };

    if (prelot.ownerId) {
      if (prelot.ownerRole === 'farmer') dto.FarmerId = prelot.ownerId;
      else if (prelot.ownerRole === 'seller') dto.SellerId = prelot.ownerId;
    }
    dto.LotOwnerRole = prelot.ownerRole ?? 'farmer';
    dto.LotOwnerName = prelot.ownerName ?? '';
    dto.MobileNum = prelot.ownerMobile ?? '';

    return dto;
  };

  // ---------- submit logic (follows your controller DTOs & service) ----------
  const handleSubmit = async () => {
    // If prelot selected -> prefer server-side from-prelot endpoint
    if (prelotDetail) {
      setSubmitting(true);
      try {
        // ensure token attached if api client doesn't auto-attach
        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
        const axiosConfig: any = { params: { preLotId: prelotDetail.preLotId } };
        if (token) axiosConfig.headers = { Authorization: `Bearer ${token}` };

        // call your from-prelot endpoint (controller uses [FromQuery] preLotId)
        const res = await api.post('/mandi-official/lots/arrived/from-prelot', null, axiosConfig);

        if (res && String(res.status).startsWith('2')) {
          Alert.alert(
            t('success_title') ?? 'Success',
            t('arrived_lot_created') ?? 'Arrived lot created successfully',
            [{ text: t('ok') ?? 'OK', onPress: () => navigation.goBack() }],
          );
          return;
        } else {
          throw new Error(res?.data?.message ?? `Status ${res?.status}`);
        }
      } catch (err: any) {
        console.log('from-prelot error:', err?.response?.status, err?.response?.data ?? err?.message ?? err);
        const serverMsg = err?.response?.data?.message ?? err?.message ?? String(err);

        Alert.alert(
          t('error_title') ?? 'Error',
          //(t('from_prelot_failed_fallback') ?? 'Failed to register from prelot. Trying fallback...') + `\n\n${serverMsg}`,
        );

        // FALLBACK -> map prelot to create DTO and call arrived/create
        try {
          const dto = mapPrelotToDto(prelotDetail);
          const token2 = await AsyncStorage.getItem('ACCESS_TOKEN');
          const cfg: any = {};
          if (token2) cfg.headers = { Authorization: `Bearer ${token2}` };

          const res2 = await api.post('/mandi-official/lots/arrived/create', dto, cfg);
          if (res2 && String(res2.status).startsWith('2')) {
            Alert.alert(
              t('success_title') ?? 'Success',
              t('arrived_lot_created') ?? 'Arrived lot created successfully (fallback)',
              [{ text: t('ok') ?? 'OK', onPress: () => navigation.goBack() }],
            );
            return;
          } else {
            throw new Error(res2?.data?.message ?? `Status ${res2?.status}`);
          }
        } catch (err2: any) {
          console.log('fallback create arrived lot error:', err2?.response?.status, err2?.response?.data ?? err2?.message ?? err2);
          const msg2 = err2?.response?.data?.message ?? err2?.message ?? String(err2);
          Alert.alert(t('error_title') ?? 'Error', (t('arrived_lot_create_failed') ?? 'Failed to create arrived lot') + `\n\n${msg2}`);
        } finally {
          setSubmitting(false);
        }
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // ---------------- Manual flow ----------------
    if (!cropId && !cropName) {
      return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
    }
    if (!quantity) {
      return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
    }
    if (!mandiId && !mandiName) {
      return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
    }

    const qtyNum = parseFloat(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
    }

    const CropId = pickCropIdForSelection();
    const MandiId = pickMandiIdForSelection();
    if (!CropId || !MandiId) {
      return Alert.alert(t('error_title') ?? 'Error', 'Invalid crop or mandi selected. Please re-select.');
    }

    const dto: any = {
      MandiId: MandiId,
      CropId: CropId,
      Quantity: qtyNum,
      Grade: grade || null,
      LotImageUrl: null,
      PreLotId: null,
    };

    if (selectedOwner) {
      dto.LotOwnerRole = selectedOwner.role;
      dto.LotOwnerName = selectedOwner.name;
      dto.MobileNum = selectedOwner.mobile ?? '';
      if (selectedOwner.role === 'farmer') dto.FarmerId = selectedOwner.id;
      if (selectedOwner.role === 'seller') dto.SellerId = selectedOwner.id;
    } else {
      if (!manualName || !manualMobile || !manualRole) {
        return Alert.alert(t('missing_owner_fields') ?? 'Missing owner fields', t('fill_owner_fields') ?? 'Please provide owner name and mobile and role');
      }
      dto.LotOwnerRole = manualRole;
      dto.LotOwnerName = manualName;
      dto.MobileNum = manualMobile;
      dto.FarmerId = null;
      dto.SellerId = null;
    }

    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const cfg: any = {};
      if (token) cfg.headers = { Authorization: `Bearer ${token}` };

      const res = await api.post('/mandi-official/lots/arrived/create', dto, cfg);
      if (!res.status.toString().startsWith('2')) {
        throw new Error(res.data?.message || 'Failed to create arrived lot');
      }

      Alert.alert(
        t('success_title') ?? 'Success',
        t('arrived_lot_created') ?? 'Arrived lot created successfully',
        [{ text: t('ok') ?? 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (err: any) {
      console.log('create arrived lot error:', err?.response?.data ?? err?.message ?? err);
      const msg = err?.response?.data?.message ?? t('arrived_lot_create_failed') ?? 'Failed to create arrived lot';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingMeta) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8, color: theme.text }}>{t('loading_meta') ?? 'Loading...'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>{t('register_lot_btn') ?? 'Register Lot'}</Text>

        {/* PreLot input */}
        <Text style={[styles.label, { color: theme.text }]}>{t('prelot_id_label') ?? 'Pre-registered Lot ID'}</Text>
        <View style={styles.row}>
          <TextInput
            placeholder={t('prelot_id_placeholder') ?? 'Enter PreLot ID'}
            placeholderTextColor="#9ca3af"
            value={preLotIdInput}
            onChangeText={setPreLotIdInput}
            style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
            returnKeyType="search"
            onSubmitEditing={fetchPreLot}
          />
          <TouchableOpacity style={[styles.smallBtn]} onPress={fetchPreLot}>
            <Text style={styles.smallBtnText}>{t('fetch_prelot_btn') ?? 'Fetch PreLot'}</Text>
          </TouchableOpacity>
        </View>

        {prelotLoading && <ActivityIndicator style={{ marginVertical: 10 }} />}
        {prelotError ? <Text style={{ color: '#ef4444', marginHorizontal: 16 }}>{prelotError}</Text> : null}

        {prelotDetail ? (
          <View style={[styles.prelotBox, { borderColor: theme.text }]}>
            <Text style={{ fontWeight: '700', color: theme.text }}>{t('prelot_details') ?? 'PreLot Details'}</Text>
            <Text style={{ color: theme.text }}>{t('prelot_id_label') ?? 'ID'}: {prelotDetail.preLotId}</Text>
            <Text style={{ color: theme.text }}>{t('crop') ?? 'Crop'}: {prelotDetail.cropName}</Text>
            <Text style={{ color: theme.text }}>{t('grade_label') ?? 'Grade'}: {prelotDetail.grade ?? '-'}</Text>
            <Text style={{ color: theme.text }}>{t('quantity_label') ?? 'Quantity'}: {prelotDetail.quantity}</Text>
            <Text style={{ color: theme.text }}>{t('expected_amount') ?? 'Expected Amount'}: {prelotDetail.sellingAmount ?? '-'}</Text>
            <Text style={{ color: theme.text }}>{t('mandi_label') ?? 'Mandi'}: {prelotDetail.mandiName}</Text>
            <Text style={{ color: theme.text }}>{t('arrival_label') ?? 'Expected Arrival'}: {prelotDetail.expectedArrivalDate ?? '-'}</Text>
            <Text style={{ color: theme.text }}>{t('prelot_source') ?? 'Source'}: {prelotSource ?? '-'}</Text>
            <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { setPrelotDetail(null); setPreLotIdInput(''); setPrelotSource(null); }}>
              <Text style={{ color: theme.primary ?? '#2b6cb0' }}>{t('clear') ?? 'Clear'}</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ height: 8 }} />

        {/* Owner search / manual (only when no prelotDetail) */}
        {!prelotDetail && (
          <>
            <Text style={[styles.label, { color: theme.text }]}>{t('search_owner_label')}</Text>
            <View style={styles.row}>
              <TextInput
                placeholder={t('search_owner_placeholder') ?? 'Search by name or mobile'}
                placeholderTextColor="#9ca3af"
                value={ownerKeyword}
                onChangeText={(v) => setOwnerKeyword(v)}
                style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
                onSubmitEditing={() => searchOwner(ownerKeyword)}
                returnKeyType="search"
              />
              <TouchableOpacity style={[styles.smallBtn]} onPress={() => searchOwner(ownerKeyword)}>
                <Text style={styles.smallBtnText}>{t('search_btn')}</Text>
              </TouchableOpacity>
            </View>

            {ownerSearchLoading ? (
              <ActivityIndicator style={{ marginVertical: 10 }} />
            ) : ownerResults.length > 0 ? (
              <View style={{ marginVertical: 8 }}>
                <Text style={[styles.subTitle, { color: theme.text }]}>{t('search_results')}</Text>
                <FlatList
                  data={ownerResults}
                  keyExtractor={(it) => String(it.id)}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectOwner(item)} style={[styles.ownerItem, selectedOwner?.id === item.id && styles.ownerItemSelected]}>
                      <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
                      <Text style={{ color: theme.text }}>{item.mobile} • {item.role}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : null}

            {selectedOwner ? (
              <View style={[styles.selectedOwnerBox, { borderColor: '#10b981' }]}>
                <Text style={{ fontWeight: '700', color: theme.text }}>{t('selected_owner')}: {selectedOwner.name}</Text>
                <Text style={{ color: theme.text }}>{selectedOwner.mobile} • {selectedOwner.role}</Text>
                <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedOwner}><Text style={{ color: '#ef4444' }}>{t('clear_selection')}</Text></TouchableOpacity>
              </View>
            ) : null}

            {!selectedOwner && (
              <>
                <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>
                <TextInput placeholder={t('owner_name_placeholder') ?? 'Owner Name'} placeholderTextColor="#9ca3af" value={manualName} onChangeText={setManualName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
                <TextInput placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'} placeholderTextColor="#9ca3af" value={manualMobile} onChangeText={setManualMobile} keyboardType="phone-pad" style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
                <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
                <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                  <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v as 'farmer'|'seller')}>
                    <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
                    <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
                  </Picker>
                </View>
              </>
            )}
          </>
        )}

        {/* Lot details */}
        <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''} onValueChange={v => { setCropName(String(v)); }}>
            <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
            {cropOptions.map(c => (<Picker.Item key={c} label={c} value={c} />))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {cropName && !isValidPickerValue(cropName, cropOptions) && cropName !== 'Other' && (
          <TextInput placeholder={t('type_crop') ?? 'Type crop'} placeholderTextColor={theme.text ?? '#999'} value={cropName} onChangeText={setCropName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
        )}

        <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker selectedValue={grade} onValueChange={v => setGrade(String(v))}>
            <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
            {currentGrades.map(g => (<Picker.Item key={g} label={g} value={g} />))}
          </Picker>
        </View>

        {grade === 'Other' && (
          <TextInput placeholder={t('type_grade') ?? 'Type grade'} placeholderTextColor={theme.text ?? '#999'} value={grade} onChangeText={setGrade} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
        )}

        <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
        <TextInput placeholder={t('quantity_placeholder') ?? 'Quantity'} placeholderTextColor="#9ca3af" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={[styles.input, { borderColor: theme.text, color: theme.text }]} editable={!prelotDetail} />

        <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label')}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''} onValueChange={v => setMandiName(String(v))}>
            <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
            {mandiOptions.map(m => (<Picker.Item key={m} label={m} value={m} />))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {mandiName && !isValidPickerValue(mandiName, mandiOptions) && mandiName !== 'Other' && (
          <TextInput placeholder={t('type_mandi') ?? 'Type mandi'} placeholderTextColor={theme.text ?? '#999'} value={mandiName} onChangeText={setMandiName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
        )}

        <TouchableOpacity style={[styles.submitBtn, submitting && { opacity: 0.7 }]} onPress={handleSubmit} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>{prelotDetail ? (t('create_from_prelot_btn') ?? 'Register Arrived Lot from PreLot') : (t('create_arrived_lot_btn') ?? 'Create Arrived Lot')}</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', padding: 16 },
  label: { fontSize: 14, fontWeight: '700', paddingHorizontal: 16, marginTop: 12 },
  subLabel: { fontSize: 14, fontWeight: '600', paddingHorizontal: 16, marginTop: 10, color: '#6b7280' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginHorizontal: 16, marginTop: 8 },
  pickerWrap: { borderWidth: 1, borderRadius: 8, marginHorizontal: 16, marginTop: 8, overflow: 'hidden' },
  submitBtn: { backgroundColor: '#10b981', margin: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 8 },
  smallBtn: { marginLeft: 8, backgroundColor: '#374151', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  smallBtnText: { color: '#fff', fontWeight: '700' },
  ownerItem: { padding: 10, marginHorizontal: 16, marginTop: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  ownerItemSelected: { borderColor: '#10b981', backgroundColor: '#ecfdf5' },
  selectedOwnerBox: { marginHorizontal: 16, marginTop: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#10b981' },
  clearBtn: { marginTop: 6 },
  subTitle: { paddingHorizontal: 16, marginTop: 8, fontWeight: '700' },
  prelotBox: { marginHorizontal: 16, marginTop: 10, padding: 12, borderRadius: 8, borderWidth: 1, backgroundColor: '#f8fafc' },
});


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

// type Crop = { cropId?: number; id?: number; cropName?: string; name?: string };
// type Mandi = { mandiId?: number; id?: number; mandiName?: string; name?: string; location?: string };
// type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

// export default function RegisterLot() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // meta
//   const [crops, setCrops] = useState<Crop[]>([]);
//   const [grades, setGrades] = useState<string[]>([]);
//   const [mandis, setMandis] = useState<Mandi[]>([]);

//   // form
//   const [cropId, setCropId] = useState<number | null>(null);
//   const [grade, setGrade] = useState<string>('');
//   const [quantity, setQuantity] = useState<string>(''); // string for TextInput
//   const [mandiId, setMandiId] = useState<number | null>(null);

//   // owner search/selection
//   const [ownerKeyword, setOwnerKeyword] = useState<string>('');
//   const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
//   const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
//   const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

//   // manual owner fields (when not found)
//   const [manualName, setManualName] = useState('');
//   const [manualMobile, setManualMobile] = useState('');
//   const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

//   // submission
//   const [submitting, setSubmitting] = useState(false);
//   const [loadingMeta, setLoadingMeta] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     const loadMeta = async () => {
//       try {
//         const [cropsRes, gradesRes, mandisRes] = await Promise.all([
//           api.get('/crops'),
//           api.get('/grades'),
//           api.get('/mandis'),
//         ]);

//         if (!mounted) return;

//         const cropList = Array.isArray(cropsRes.data) ? cropsRes.data : [];
//         const gradeList = Array.isArray(gradesRes.data) ? gradesRes.data : [];
//         const mandiList = Array.isArray(mandisRes.data) ? mandisRes.data : [];

//         setCrops(cropList);
//         // Normalize grades to strings
//         setGrades(gradeList.map((g: any) => (typeof g === 'string' ? g : g.grade || g.name || String(g))));
//         setMandis(mandiList);
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

//   // owner search
//   const searchOwner = async (keyword: string) => {
//     if (!keyword || keyword.trim().length < 2) {
//       setOwnerResults([]);
//       return;
//     }
//     setOwnerSearchLoading(true);
//     try {
//       const res = await api.get('/mandi-official/lots/search-owner', {
//         params: { keyword },
//       });
//       const data = Array.isArray(res.data) ? res.data : [];
//       setOwnerResults(data);
//     } catch (err) {
//       console.log('search owner error', err);
//       Alert.alert(t('error_title') ?? 'Error', t('search_owner_failed') ?? 'Owner search failed.');
//     } finally {
//       setOwnerSearchLoading(false);
//     }
//   };

//   // selecting an owner from results
//   const onSelectOwner = (owner: Owner) => {
//     setSelectedOwner(owner);
//     // clear manual fields
//     setManualName('');
//     setManualMobile('');
//     setManualRole('farmer');
//     // hide keyboard
//     Keyboard.dismiss();
//   };

//   const clearSelectedOwner = () => {
//     setSelectedOwner(null);
//   };

//   // submit arrived lot
//   const handleSubmit = async () => {
//     // basic validation
//     if (!cropId || !quantity || !mandiId) {
//       return Alert.alert(t('missing_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
//     }

//     const qtyNum = parseFloat(quantity);
//     if (isNaN(qtyNum) || qtyNum <= 0) {
//       return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
//     }

//     // build DTO
//     const dto: any = {
//       MandiId: mandiId,
//       CropId: cropId,
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
//       // manual owner entry required
//       if (!manualName || !manualMobile || !manualRole) {
//         return Alert.alert(t('missing_owner_fields') ?? 'Missing owner fields', t('fill_owner_fields') ?? 'Please provide owner name and mobile and role');
//       }
//       dto.LotOwnerRole = manualRole;
//       dto.LotOwnerName = manualName;
//       dto.MobileNum = manualMobile;
//       dto.FarmerId = manualRole === 'farmer' ? null : null;
//       dto.SellerId = manualRole === 'seller' ? null : null;
//       // Note: backend expects FarmerId or SellerId as GUIDs when matching existing users — for manual entry we leave them null
//     }

//     setSubmitting(true);
//     try {
//       const res = await api.post('/mandi-official/lots/arrived/create', dto);
//       if (!res.status.toString().startsWith('2')) {
//         throw new Error(res.data?.message || 'Failed to create arrived lot');
//       }

//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('arrived_lot_created') ?? 'Arrived lot created successfully',
//         [
//           {
//             text: t('ok') ?? 'OK',
//             onPress: () => {
//               navigation.goBack();
//             },
//           },
//         ],
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
//         <Text style={[styles.title, { color: theme.text }]}>{t('register_lot_btn')}</Text>

//         {/* Owner Search */}
//         <Text style={[styles.label, { color: theme.text }]}>{t('search_owner_label')}</Text>
//         <View style={styles.row}>
//           <TextInput
//             placeholder={t('search_owner_placeholder') ?? 'Search by name or mobile'}
//             placeholderTextColor="#9ca3af"
//             value={ownerKeyword}
//             onChangeText={(v) => {
//               setOwnerKeyword(v);
//               // do not auto-search on every keystroke for performance, but here we call search after short typed length
//             }}
//             style={[styles.input, { flex: 1, borderColor: theme.text, color: theme.text }]}
//             onSubmitEditing={() => searchOwner(ownerKeyword)}
//             returnKeyType="search"
//           />
//           <TouchableOpacity
//             style={[styles.smallBtn]}
//             onPress={() => searchOwner(ownerKeyword)}
//           >
//             <Text style={styles.smallBtnText}>{t('search_btn')}</Text>
//           </TouchableOpacity>
//         </View>

//         {ownerSearchLoading ? (
//           <ActivityIndicator style={{ marginVertical: 10 }} />
//         ) : ownerResults.length > 0 ? (
//           <View style={{ marginVertical: 8 }}>
//             <Text style={[styles.subTitle, { color: theme.text }]}>{t('search_results')}</Text>
//             <FlatList
//               data={ownerResults}
//               keyExtractor={(it) => String(it.id)}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => onSelectOwner(item)}
//                   style={[styles.ownerItem, selectedOwner?.id === item.id && styles.ownerItemSelected]}
//                 >
//                   <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
//                   <Text style={{ color: theme.text }}>{item.mobile} • {item.role}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         ) : null}

//         {selectedOwner ? (
//           <View style={styles.selectedOwnerBox}>
//             <Text style={{ fontWeight: '700', color: theme.text }}>{t('selected_owner')}: {selectedOwner.name}</Text>
//             <Text style={{ color: theme.text }}>{selectedOwner.mobile} • {selectedOwner.role}</Text>
//             <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedOwner}><Text style={{ color: '#ef4444' }}>{t('clear_selection')}</Text></TouchableOpacity>
//           </View>
//         ) : null}

//         {/* Manual owner input (visible when no selected owner) */}
//         {!selectedOwner && (
//           <>
//             <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>

//             <TextInput
//               placeholder={t('owner_name_placeholder') ?? 'Owner Name'}
//               placeholderTextColor="#9ca3af"
//               value={manualName}
//               onChangeText={setManualName}
//               style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//             />
//             <TextInput
//               placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'}
//               placeholderTextColor="#9ca3af"
//               value={manualMobile}
//               onChangeText={setManualMobile}
//               keyboardType="phone-pad"
//               style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//             />

//             <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v)}>
//                 <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
//                 <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
//               </Picker>
//             </View>
//           </>
//         )}

//         {/* Lot details */}
//         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker
//             selectedValue={cropId ?? ''}
//             onValueChange={(v) => setCropId(v ? Number(v) : null)}
//           >
//             <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//             {crops.map((c: any) => (
//               <Picker.Item key={c.cropId ?? c.id} label={c.cropName ?? c.name} value={c.cropId ?? c.id} />
//             ))}
//           </Picker>
//         </View>

//         <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker selectedValue={grade} onValueChange={(v) => setGrade(v)}>
//             <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
//             {grades.map((g: any, idx) => (
//               <Picker.Item key={String(g) + idx} label={String(g)} value={String(g)} />
//             ))}
//           </Picker>
//         </View>

//         <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
//         <TextInput
//           placeholder={t('quantity_placeholder') ?? 'Quantity'}
//           placeholderTextColor="#9ca3af"
//           value={quantity}
//           onChangeText={setQuantity}
//           keyboardType="numeric"
//           style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//         />

//         <Text style={[styles.label, { color: theme.text }]}>{t('mandi')}</Text>
//         <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//           <Picker selectedValue={mandiId ?? ''} onValueChange={(v) => setMandiId(v ? Number(v) : null)}>
//             <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//             {mandis.map((m: any) => (
//               <Picker.Item key={m.mandiId ?? m.id} label={`${m.mandiName ?? m.name} (${m.location ?? ''})`} value={m.mandiId ?? m.id} />
//             ))}
//           </Picker>
//         </View>

//         <TouchableOpacity
//           style={[styles.submitBtn, submitting && { opacity: 0.7 }]}
//           onPress={handleSubmit}
//           disabled={submitting}
//         >
//           {submitting ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.submitBtnText}>{t('create_arrived_lot_btn')}</Text>
//           )}
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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type CropRow = { id: number; name: string; grade?: string | null };
type MandiRow = { id: number; name: string; location?: string };
type Owner = { role: 'farmer' | 'seller'; id: string; name: string; mobile: string };

export default function RegisterLot() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  // ----- meta from backend -----
  const [crops, setCrops] = useState<CropRow[]>([]);
  const [mandis, setMandis] = useState<MandiRow[]>([]);

  // loading
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ----- form state (preregister-style: pick by name) -----
  const [cropName, setCropName] = useState<string>(''); // same as prCrop
  const [grade, setGrade] = useState<string>(''); // prGrade
  const [quantity, setQuantity] = useState<string>(''); // prQuantity
  const [mandiName, setMandiName] = useState<string>(''); // prMandi

  // date / expected arrival not required here, officer just creates arrived lot — keep minimal
  // owner search/selection
  const [ownerKeyword, setOwnerKeyword] = useState<string>('');
  const [ownerSearchLoading, setOwnerSearchLoading] = useState(false);
  const [ownerResults, setOwnerResults] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

  // manual owner fields (when not found)
  const [manualName, setManualName] = useState('');
  const [manualMobile, setManualMobile] = useState('');
  const [manualRole, setManualRole] = useState<'farmer' | 'seller'>('farmer');

  // ----- Derived helpers from crops/mandis (matches FarmerDashboard logic) -----
  // unique crop names for dropdown
  const cropOptions = useMemo(() => Array.from(new Set(crops.map(c => c.name))), [crops]);

  // unique mandi names for dropdown
  const mandiOptions = useMemo(() => Array.from(new Set(mandis.map(m => m.name))), [mandis]);

  // grades available for current crop (like currentGrades)
  const currentGrades = useMemo(() => {
    if (!cropName) return [];
    const grades = crops
      .filter(c => c.name === cropName && c.grade != null && c.grade !== '')
      .map(c => String(c.grade));
    const uniqueGrades = Array.from(new Set(grades));
    if (!uniqueGrades.length) return ['Other'];
    if (!uniqueGrades.includes('Other')) uniqueGrades.push('Other');
    return uniqueGrades;
  }, [cropName, crops]);

  const isValidPickerValue = (value: string, options: string[]) => {
    return value === '' || options.includes(value) || value === 'Other';
  };

  // ----- load meta (crops + mandis) -----
  useEffect(() => {
    let mounted = true;
    const loadMeta = async () => {
      try {
        // Reuse endpoints you already have
        const [cropsRes, mandisRes] = await Promise.all([api.get('/crops'), api.get('/mandis')]);

        if (!mounted) return;

        const cropsData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
        const mandisData = Array.isArray(mandisRes.data) ? mandisRes.data : [];

        const mappedCrops: CropRow[] = cropsData
          .map((c: any) => {
            const id = c.cropId ?? c.CropId ?? c.id;
            const name = c.cropName ?? c.CropName ?? c.name;
            const grade = c.grade ?? c.Grade ?? null;
            if (!id || !name) return null;
            return { id: Number(id), name: String(name), grade: grade ?? null };
          })
          .filter(Boolean) as CropRow[];

        const mappedMandis: MandiRow[] = mandisData
          .map((m: any) => {
            const id = m.mandiId ?? m.MandiId ?? m.id;
            const name = m.mandiName ?? m.MandiName ?? m.name;
            const location = m.location ?? m.Location ?? '';
            if (!id || !name) return null;
            return { id: Number(id), name: String(name), location: String(location) };
          })
          .filter(Boolean) as MandiRow[];

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

  // ----- owner search -----
  const searchOwner = async (keyword: string) => {
    if (!keyword || keyword.trim().length < 2) {
      setOwnerResults([]);
      return;
    }
    setOwnerSearchLoading(true);
    try {
      const res = await api.get('/mandi-official/lots/search-owner', {
        params: { keyword },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setOwnerResults(
        data.map((d: any) => ({
          role: (d.role === 'seller' ? 'seller' : 'farmer') as 'farmer' | 'seller',
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

  // ----- helpers to resolve names to DB IDs (pickCropIdForSelection / pickMandiIdForSelection) -----
  const pickCropIdForSelection = (): number | null => {
    if (!cropName) return null;

    // Try match with crop+grade
    let match = crops.find(c => c.name === cropName && ((c.grade ?? '') === grade || (c.grade ?? '') === '' ));
    if (!match) {
      match = crops.find(c => c.name === cropName);
    }
    return match?.id ?? null;
  };

  const pickMandiIdForSelection = (): number | null => {
    if (!mandiName) return null;
    const m = mandis.find(x => x.name === mandiName);
    return m?.id ?? null;
  };

  // ----- submit arrived lot -----
  const handleSubmit = async () => {
    // validations
    if (!cropName) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
    if (!quantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
    if (!mandiName) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

    const qtyNum = parseFloat(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      return Alert.alert(t('invalid_quantity_title') ?? 'Invalid quantity', t('invalid_quantity_msg') ?? 'Please enter a valid quantity');
    }

    // resolve DB ids
    const CropId = pickCropIdForSelection();
    const MandiId = pickMandiIdForSelection();

    if (!CropId || !MandiId) {
      return Alert.alert(t('error_title') ?? 'Error', 'Invalid crop or mandi selected. Please re-select.');
    }

    const dto: any = {
      MandiId,
      CropId,
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
      dto.FarmerId = manualRole === 'farmer' ? null : null;
      dto.SellerId = manualRole === 'seller' ? null : null;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/mandi-official/lots/arrived/create', dto);
      if (!res.status.toString().startsWith('2')) {
        throw new Error(res.data?.message || 'Failed to create arrived lot');
      }

      Alert.alert(
        t('success_title') ?? 'Success',
        t('arrived_lot_created') ?? 'Arrived lot created successfully',
        [
          {
            text: t('ok') ?? 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (err: any) {
      console.log('create arrived lot error', err?.response?.data ?? err?.message ?? err);
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
        <Text style={[styles.title, { color: theme.text }]}>{ t('register_lot_btn') ?? 'Register Lot'}</Text>

        {/* ---------- Owner Search ---------- */}
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

        {/* ---------- Manual owner (fallback) ---------- */}
        {!selectedOwner && (
          <>
            <Text style={[styles.subLabel, { color: theme.text }]}>{t('manual_owner_title')}</Text>

            <TextInput
              placeholder={t('owner_name_placeholder') ?? 'Owner Name'}
              placeholderTextColor="#9ca3af"
              value={manualName}
              onChangeText={setManualName}
              style={[styles.input, { borderColor: theme.text, color: theme.text }]}
            />
            <TextInput
              placeholder={t('owner_mobile_placeholder') ?? 'Mobile Number'}
              placeholderTextColor="#9ca3af"
              value={manualMobile}
              onChangeText={setManualMobile}
              keyboardType="phone-pad"
              style={[styles.input, { borderColor: theme.text, color: theme.text }]}
            />

            <Text style={[styles.label, { color: theme.text }]}>{t('owner_role_label')}</Text>
            <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
              <Picker selectedValue={manualRole} onValueChange={(v) => setManualRole(v as 'farmer' | 'seller')}>
                <Picker.Item label={t('farmer') ?? 'Farmer'} value="farmer" />
                <Picker.Item label={t('seller') ?? 'Seller'} value="seller" />
              </Picker>
            </View>
          </>
        )}

        {/* ---------- Lot details (preregister-style pickers) ---------- */}
        <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''} onValueChange={v => setCropName(String(v))}>
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
        <TextInput placeholder={t('quantity_placeholder') ?? 'Quantity'} placeholderTextColor="#9ca3af" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={[styles.input, { borderColor: theme.text, color: theme.text }]} />

        <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi'}</Text>
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
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>{t('create_arrived_lot_btn')}</Text>}
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
});

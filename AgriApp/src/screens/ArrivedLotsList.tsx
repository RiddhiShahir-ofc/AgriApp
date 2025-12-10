// // import React, { useEffect, useState, useCallback } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   RefreshControl,
// //   Alert,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Picker } from '@react-native-picker/picker';
// // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';
// // import api from '../services/api';
// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // type RouteProps = RouteProp<RootStackParamList, 'ArrivedLotsList'>;

// // type ArrivedLotItem = {
// //   arrivedLotId?: number;
// //   ArrivedLotId?: number;
// //   id?: number;
// //   cropName?: string;
// //   CropName?: string;
// //   grade?: string;
// //   quantity?: number;
// //   mandiName?: string;
// //   MandiName?: string;
// //   status?: string;
// //   createdAt?: string;
// //   [k: string]: any;
// // };

// // export default function ArrivedLotsList() {
// //   const route = useRoute<RouteProps>();
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   // We still accept an optional passed mandiId, but priority is profile mandiId
// //   const passedMandiId = (route.params as any)?.mandiId ?? null;

// //   const [officerName, setOfficerName] = useState<string>('');
// //   const [officerMandiName, setOfficerMandiName] = useState<string>('');

// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [lots, setLots] = useState<ArrivedLotItem[]>([]);
// //   const [mandiId, setMandiId] = useState<number | null>(passedMandiId ?? null);
// //   const [mandis, setMandis] = useState<{ mandiId: number; mandiName: string }[]>([]);
// //   const [loadingMandis, setLoadingMandis] = useState(false);
// //   const [profileChecked, setProfileChecked] = useState(false); // to know profile fetch done

// //   // Fetch mandis (fallback UI) — unchanged
// //   const fetchMandis = async () => {
// //     setLoadingMandis(true);
// //     try {
// //       const res = await api.get('/mandis');
// //       const arr = Array.isArray(res.data) ? res.data : [];
// //       const mapped = arr
// //         .map((m: any) => ({
// //           mandiId: Number(m.mandiId ?? m.MandiId ?? m.id),
// //           mandiName: String(m.mandiName ?? m.MandiName ?? m.name),
// //         }))
// //         .filter((x: any) => x.mandiId);
// //       setMandis(mapped);
// //       if (!mandiId && mapped.length === 1) setMandiId(mapped[0].mandiId);
// //     } catch (err) {
// //       console.log('fetchMandis error', err);
// //       Alert.alert(t('error_title') ?? 'Error', t('fetch_mandis_failed') ?? 'Failed to load mandis');
// //     } finally {
// //       setLoadingMandis(false);
// //     }
// //   };

// //   // Normalized loader for arrived lots (robust to response shapes)
// //   const loadLots = useCallback(
// //     async (mid: number) => {
// //       setLoading(true);
// //       try {
// //         console.log('Loading arrived lots for mandiId =', mid);
// //         const res = await api.get(`/mandiOfficialAuction/mandi/arrivedLots`, { params: { mandiId: mid } });

// //         // Debug - log raw response so we can inspect shape in RN console
// //         console.log('API /mandiOfficialAuction/mandi/arrivedLots response ->', res?.data);

// //         let payload = res.data;

// //         // Normalize common wrapper shapes
// //         if (!payload) {
// //           setLots([]);
// //           return;
// //         }
// //         if (!Array.isArray(payload)) {
// //           if (Array.isArray(payload.items)) payload = payload.items;
// //           else if (Array.isArray(payload.data)) payload = payload.data;
// //           else {
// //             // single object -> convert to array
// //             payload = [payload];
// //           }
// //         }

// //         const arr = Array.isArray(payload) ? payload : [payload];

// //         console.log('Normalized arrived-lots array length =', arr.length);

// //         setLots(arr);
// //       } catch (err: any) {
// //         console.log('loadLots error', err?.response?.data ?? err?.message ?? err);
// //         Alert.alert(t('error_title') ?? 'Error', t('fetch_arrived_lots_failed') ?? 'Failed to fetch arrived lots');
// //         setLots([]);
// //       } finally {
// //         setLoading(false);
// //         setRefreshing(false);
// //       }
// //     },
// //     [t],
// //   );

// //   // NEW: attempt to fetch mandiId from mandi-official profile first
// //   const fetchProfileAndMaybeLoad = async () => {
// //     setProfileChecked(false);
// //     try {
// //       const res = await api.get('/mandi-official/profile');
// //       const data = res?.data ?? null;
// //       // profile shape uses mandiId or MandiId according to your backend dto
// //       const profileMandiId = data ? (data.mandiId ?? data.MandiId ?? null) : null;
// //       if (profileMandiId) {
// //         setMandiId(Number(profileMandiId));
// //         // load arrived lots for the officer's mandi only
// //         await loadLots(Number(profileMandiId));
// //       } else {
// //         // fallback — let the user choose mandi
// //         await fetchMandis();
// //       }
// //     } catch (err) {
// //       // If profile fetch fails (401/403 or network), fallback to mandis list
// //       console.log('fetch profile error (fallback to mandis):', err);
// //       await fetchMandis();
// //     } finally {
// //       setProfileChecked(true);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     // Priority:
// //     // 1) If a mandiId was explicitly passed in navigation params AND no profile overrides, we can still try profile first.
// //     // 2) Try profile to get officer's mandi — will auto-load lots for that mandi
// //     fetchProfileAndMaybeLoad();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const onRefresh = () => {
// //     setRefreshing(true);
// //     if (!mandiId) {
// //       setRefreshing(false);
// //       return;
// //     }
// //     loadLots(mandiId);
// //   };

// //   const onMandiSelect = (val: number) => {
// //     setMandiId(val);
// //     loadLots(val);
// //   };

// //   const renderItem = ({ item, index }: { item: ArrivedLotItem; index: number }) => {
// //     const id = item.arrivedLotId ?? item.ArrivedLotId ?? item.id ?? index;
// //     return (
// //       <View style={[styles.item, { borderColor: theme.text, backgroundColor: theme.background }]}>
// //         <View style={{ flex: 1 }}>
// //           <Text style={[styles.itemTitle, { color: theme.text }]}>{item.cropName ?? item.CropName ?? '-'}</Text>
// //           <Text style={{ color: theme.text }}>{t('grade_label') ?? 'Grade'}: {item.grade ?? '-'}</Text>
// //           <Text style={{ color: theme.text }}>{t('quantity_label') ?? 'Quantity'}: {String(item.quantity ?? '-')}</Text>
// //           <Text style={{ color: theme.text }}>{t('mandi_label') ?? 'Mandi'}: {item.mandiName ?? item.MandiName ?? '-'}</Text>
// //           <Text style={{ color: theme.text, marginTop: 4 }}>{t('status') ?? 'Status'}: {item.status ?? '-'}</Text>
// //         </View>

// //         <View style={{ justifyContent: 'space-between' }}>
// //           <TouchableOpacity
// //             style={[styles.viewBtn]}
// //             onPress={() => navigation.navigate('ArrivedLotDetails', { arrivedLotId: Number(id) })}
// //           >
// //             <Text style={styles.viewBtnText}>{t('view') ?? 'View'}</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     );
// //   };

// //   // If profile hasn't been checked yet, show loader to avoid flicker
// //   if (loading && !profileChecked) {
// //     return (
// //       <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
// //         <ActivityIndicator />
// //         <Text style={{ marginTop: 8, color: theme.text }}>{t('loading') ?? 'Loading...'}</Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       {/* If profile didn't provide mandiId, show mandi picker so officer can select a mandi (fallback) */}
// //       {!mandiId && (
// //         <View style={{ padding: 16 }}>
// //           <Text style={{ fontWeight: '700', color: theme.text }}>{t('select_mandi') ?? 'Select mandi'}</Text>
// //           {loadingMandis ? (
// //             <ActivityIndicator style={{ marginTop: 8 }} />
// //           ) : (
// //             <View style={{ marginTop: 8, borderWidth: 1, borderRadius: 8, overflow: 'hidden', borderColor: theme.text }}>
// //               <Picker
// //                 selectedValue={mandiId ?? ''}
// //                 onValueChange={(v) => onMandiSelect(Number(v))}
// //               >
// //                 <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// //                 {mandis.map(m => (
// //                   <Picker.Item key={m.mandiId} label={m.mandiName} value={m.mandiId} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           )}
// //         </View>
// //       )}

// //       <FlatList
// //         data={lots}
// //         keyExtractor={(it, index) => {
// //           const k = it?.arrivedLotId ?? it?.ArrivedLotId ?? it?.id ?? `idx_${index}`;
// //           return String(k);
// //         }}
// //         renderItem={renderItem}
// //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
// //         contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
// //         ListEmptyComponent={
// //           <View style={{ padding: 24, alignItems: 'center' }}>
// //             <Text style={{ color: theme.text }}>
// //               {loading ? (t('loading') ?? 'Loading...') : (t('no_arrived_lots') ?? 'No arrived lots found')}
// //             </Text>
// //           </View>
// //         }
// //       />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   item: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
// //   itemTitle: { fontWeight: '700', marginBottom: 6 },
// //   viewBtn: { backgroundColor: '#3b82f6', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6 },
// //   viewBtnText: { color: '#fff', fontWeight: '700' },
// // });

// // src/screens/ArrivedLotsList.tsx
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import api from '../services/api';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// type RouteProps = RouteProp<RootStackParamList, 'ArrivedLotsList'>;

// type ArrivedLotItem = {
//   arrivedLotId?: number;
//   ArrivedLotId?: number;
//   id?: number;

//   cropName?: string;
//   CropName?: string;
//   grade?: string;
//   quantity?: number;

//   mandiName?: string;
//   MandiName?: string;

//   status?: string;
//   createdAt?: string;
//   [k: string]: any;
// };

// export default function ArrivedLotsList() {
//   const route = useRoute<RouteProps>();
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // Optional mandiId passed via navigation, but profile mandiId has priority
//   const passedMandiId = (route.params as any)?.mandiId ?? null;

//   const [loading, setLoading] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [lots, setLots] = useState<ArrivedLotItem[]>([]);
//   const [mandiId, setMandiId] = useState<number | null>(passedMandiId ?? null);
//   const [mandis, setMandis] = useState<{ mandiId: number; mandiName: string }[]>([]);
//   const [loadingMandis, setLoadingMandis] = useState(false);
//   const [profileChecked, setProfileChecked] = useState(false);

//   // NEW: officer info from profile
//   const [officerName, setOfficerName] = useState<string>('');
//   const [officerMandiName, setOfficerMandiName] = useState<string>('');

//   // Fetch mandis for fallback picker
//   const fetchMandis = async () => {
//     setLoadingMandis(true);
//     try {
//       const res = await api.get('/mandis');
//       const arr = Array.isArray(res.data) ? res.data : [];
//       const mapped = arr
//         .map((m: any) => ({
//           mandiId: Number(m.mandiId ?? m.MandiId ?? m.id),
//           mandiName: String(m.mandiName ?? m.MandiName ?? m.name),
//         }))
//         .filter((x: any) => x.mandiId);
//       setMandis(mapped);
//       if (!mandiId && mapped.length === 1) {
//         setMandiId(mapped[0].mandiId);
//       }
//     } catch (err) {
//       console.log('fetchMandis error', err);
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fetch_mandis_failed') ?? 'Failed to load mandis',
//       );
//     } finally {
//       setLoadingMandis(false);
//     }
//   };

//   // Load arrived lots for a mandi (robust to response shapes)
//   const loadLots = useCallback(
//     async (mid: number) => {
//       setLoading(true);
//       try {
//         console.log('Loading arrived lots for mandiId =', mid);
//         const res = await api.get('/mandiOfficialAuction/mandi/arrivedLots', {
//           params: { mandiId: mid },
//         });

//         console.log(
//           'API /mandiOfficialAuction/mandi/arrivedLots response ->',
//           res?.data,
//         );

//         let payload = res.data;

//         if (!payload) {
//           setLots([]);
//           return;
//         }
//         if (!Array.isArray(payload)) {
//           if (Array.isArray(payload.items)) payload = payload.items;
//           else if (Array.isArray(payload.data)) payload = payload.data;
//           else {
//             payload = [payload];
//           }
//         }

//         const arr = Array.isArray(payload) ? payload : [payload];

//         console.log('Normalized arrived-lots array length =', arr.length);
//         setLots(arr);
//       } catch (err: any) {
//         console.log(
//           'loadLots error',
//           err?.response?.data ?? err?.message ?? err,
//         );
//         Alert.alert(
//           t('error_title') ?? 'Error',
//           t('fetch_arrived_lots_failed') ?? 'Failed to fetch arrived lots',
//         );
//         setLots([]);
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [t],
//   );

//   // Fetch officer profile → officerName + mandiId + mandiName
//   const fetchProfileAndMaybeLoad = async () => {
//     setProfileChecked(false);
//     try {
//       const res = await api.get('/mandi-official/profile');
//       const data = res?.data ?? null;

//       if (data) {
//         setOfficerName(data.officialName ?? data.OfficialName ?? '');
//         setOfficerMandiName(data.mandiName ?? data.MandiName ?? '');
//       }

//       const profileMandiId = data
//         ? data.mandiId ?? data.MandiId ?? null
//         : null;

//       if (profileMandiId) {
//         const mid = Number(profileMandiId);
//         setMandiId(mid);
//         await loadLots(mid);
//       } else {
//         await fetchMandis();
//       }
//     } catch (err) {
//       console.log('Profile fetch error, fallback to mandis:', err);
//       await fetchMandis();
//     } finally {
//       setProfileChecked(true);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileAndMaybeLoad();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     if (!mandiId) {
//       setRefreshing(false);
//       return;
//     }
//     loadLots(mandiId);
//   };

//   const onMandiSelect = (val: number) => {
//     const mid = Number(val);
//     setMandiId(mid);
//     loadLots(mid);
//   };

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: ArrivedLotItem;
//     index: number;
//   }) => {
//     const id = item.arrivedLotId ?? item.ArrivedLotId ?? item.id ?? index;
//     return (
//       <View
//         style={[
//           styles.item,
//           { borderColor: theme.text, backgroundColor: theme.background },
//         ]}
//       >
//         <View style={{ flex: 1 }}>
//           <Text style={[styles.itemTitle, { color: theme.text }]}>
//             {item.cropName ?? item.CropName ?? '-'}
//           </Text>
//           <Text style={{ color: theme.text }}>
//             {t('grade_label') ?? 'Grade'}: {item.grade ?? '-'}
//           </Text>
//           <Text style={{ color: theme.text }}>
//             {t('quantity_label') ?? 'Quantity'}: {String(item.quantity ?? '-')}
//           </Text>
//           <Text style={{ color: theme.text }}>
//             {t('mandi_label') ?? 'Mandi'}:{' '}
//             {item.mandiName ?? item.MandiName ?? '-'}
//           </Text>
//           <Text style={{ color: theme.text, marginTop: 4 }}>
//             {t('status') ?? 'Status'}: {item.status ?? '-'}
//           </Text>

//           {/* NEW: show officer name per lot (created by) */}
//           {officerName ? (
//             <Text style={{ color: theme.text, marginTop: 4 }}>
//               {t('created_by') ?? 'Created By'}: {officerName}
//             </Text>
//           ) : null}
//         </View>

//         <View style={{ justifyContent: 'space-between' }}>
//           <TouchableOpacity
//             style={styles.viewBtn}
//             onPress={() =>
//               navigation.navigate('ArrivedLotDetails', {
//                 arrivedLotId: Number(id),
//               })
//             }
//           >
//             <Text style={styles.viewBtnText}>{t('view') ?? 'View'}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   if (loading && !profileChecked) {
//     return (
//       <SafeAreaView
//         style={[styles.center, { backgroundColor: theme.background }]}
//       >
//         <ActivityIndicator />
//         <Text style={{ marginTop: 8, color: theme.text }}>
//           {t('loading') ?? 'Loading...'}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.background }]}
//     >
//       {/* Officer info header */}
//       {officerName !== '' && (
//         <View style={{ padding: 16, paddingBottom: 0 }}>
//           <Text
//             style={{
//               color: theme.text,
//               fontSize: 16,
//               fontWeight: '700',
//             }}
//           >
//             {t('officer') ?? 'Officer'}: {officerName}
//           </Text>
//           {officerMandiName !== '' && (
//             <Text
//               style={{
//                 color: theme.text,
//                 marginTop: 4,
//               }}
//             >
//               {t('mandi_label') ?? 'Mandi'}: {officerMandiName}
//             </Text>
//           )}
//         </View>
//       )}

//       {/* Fallback mandi selector when profile doesn't provide mandiId */}
//       {!mandiId && (
//         <View style={{ padding: 16 }}>
//           <Text
//             style={{ fontWeight: '700', color: theme.text }}
//           >
//             {t('select_mandi') ?? 'Select mandi'}
//           </Text>
//           {loadingMandis ? (
//             <ActivityIndicator style={{ marginTop: 8 }} />
//           ) : (
//             <View
//               style={{
//                 marginTop: 8,
//                 borderWidth: 1,
//                 borderRadius: 8,
//                 overflow: 'hidden',
//                 borderColor: theme.text,
//               }}
//             >
//               <Picker
//                 selectedValue={mandiId ?? ''}
//                 onValueChange={(v) => onMandiSelect(Number(v))}
//               >
//                 <Picker.Item
//                   label={t('select_mandi') ?? 'Select mandi'}
//                   value=""
//                 />
//                 {mandis.map(m => (
//                   <Picker.Item
//                     key={m.mandiId}
//                     label={m.mandiName}
//                     value={m.mandiId}
//                   />
//                 ))}
//               </Picker>
//             </View>
//           )}
//         </View>
//       )}

//       <FlatList
//         data={lots}
//         keyExtractor={(it, index) => {
//           const k =
//             it?.arrivedLotId ??
//             it?.ArrivedLotId ??
//             it?.id ??
//             `idx_${index}`;
//           return String(k);
//         }}
//         renderItem={renderItem}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
//         ListEmptyComponent={
//           <View style={{ padding: 24, alignItems: 'center' }}>
//             <Text style={{ color: theme.text }}>
//               {loading
//                 ? t('loading') ?? 'Loading...'
//                 : t('no_arrived_lots') ?? 'No arrived lots found'}
//             </Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   item: {
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemTitle: { fontWeight: '700', marginBottom: 6 },
//   viewBtn: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 6,
//   },
//   viewBtnText: { color: '#fff', fontWeight: '700' },
// });

// src/screens/ArrivedLotsList.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type RouteProps = RouteProp<RootStackParamList, 'ArrivedLotsList'>;

type ArrivedLotItem = {
  arrivedLotId?: number;
  ArrivedLotId?: number;
  id?: number;

  cropName?: string;
  CropName?: string;
  grade?: string;
  quantity?: number;

  mandiName?: string;
  MandiName?: string;

  status?: string;
  createdAt?: string;
  [k: string]: any;
};

export default function ArrivedLotsList() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const passedMandiId = (route.params as any)?.mandiId ?? null;

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lots, setLots] = useState<ArrivedLotItem[]>([]);
  const [mandiId, setMandiId] = useState<number | null>(passedMandiId ?? null);
  const [mandis, setMandis] = useState<{ mandiId: number; mandiName: string }[]>([]);
  const [loadingMandis, setLoadingMandis] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  // Officer info from profile (for header only)
  const [officerName, setOfficerName] = useState<string>('');
  const [officerMandiName, setOfficerMandiName] = useState<string>('');

  // --------------------------------------------------
  // Fetch mandis (fallback when profile has no mandiId)
  // --------------------------------------------------
  const fetchMandis = async () => {
    setLoadingMandis(true);
    try {
      const res = await api.get('/mandis');
      const arr = Array.isArray(res.data) ? res.data : [];
      const mapped = arr
        .map((m: any) => ({
          mandiId: Number(m.mandiId ?? m.MandiId ?? m.id),
          mandiName: String(m.mandiName ?? m.MandiName ?? m.name),
        }))
        .filter((x: any) => x.mandiId);
      setMandis(mapped);
      if (!mandiId && mapped.length === 1) {
        setMandiId(mapped[0].mandiId);
      }
    } catch (err) {
      console.log('fetchMandis error', err);
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fetch_mandis_failed') ?? 'Failed to load mandis',
      );
    } finally {
      setLoadingMandis(false);
    }
  };

  // --------------------------------------------------
  // Load ALL arrived lots for a mandi (no extra filters)
  // --------------------------------------------------
  const loadLots = useCallback(
    async (mid: number) => {
      setLoading(true);
      try {
        console.log('Loading arrived lots for mandiId =', mid);
        const res = await api.get('/mandiOfficialAuction/mandi/arrivedLots', {
          params: { mandiId: mid },
        });

        console.log(
          'API /mandiOfficialAuction/mandi/arrivedLots response ->',
          res?.data,
        );

        let payload = res.data;

        if (!payload) {
          setLots([]);
          return;
        }

        // Normalize: array, {items: []}, {data: []}, or a single object
        if (!Array.isArray(payload)) {
          if (Array.isArray(payload.items)) payload = payload.items;
          else if (Array.isArray(payload.data)) payload = payload.data;
          else {
            payload = [payload];
          }
        }

        const arr = Array.isArray(payload) ? payload : [payload];

        console.log('Normalized arrived-lots array length =', arr.length);
        // IMPORTANT: do NOT filter here — show ALL lots for mandi
        setLots(arr);
      } catch (err: any) {
        console.log(
          'loadLots error',
          err?.response?.data ?? err?.message ?? err,
        );
        Alert.alert(
          t('error_title') ?? 'Error',
          t('fetch_arrived_lots_failed') ?? 'Failed to fetch arrived lots',
        );
        setLots([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [t],
  );

  // --------------------------------------------------
  // Fetch officer profile → officerName + mandiId + mandiName
  // --------------------------------------------------
  const fetchProfileAndMaybeLoad = async () => {
    setProfileChecked(false);
    try {
      const res = await api.get('/mandi-official/profile');
      const data = res?.data ?? null;

      if (data) {
        setOfficerName(data.officialName ?? data.OfficialName ?? '');
        setOfficerMandiName(data.mandiName ?? data.MandiName ?? '');
      }

      const profileMandiId = data
        ? data.mandiId ?? data.MandiId ?? null
        : null;

      if (profileMandiId) {
        const mid = Number(profileMandiId);
        setMandiId(mid);
        await loadLots(mid); // 👉 load ALL lots for that mandi
      } else {
        await fetchMandis(); // fallback to manual selection
      }
    } catch (err) {
      console.log('Profile fetch error, fallback to mandis:', err);
      await fetchMandis();
    } finally {
      setProfileChecked(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndMaybeLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    if (!mandiId) {
      setRefreshing(false);
      return;
    }
    loadLots(mandiId);
  };

  const onMandiSelect = (val: number) => {
    const mid = Number(val);
    setMandiId(mid);
    loadLots(mid);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ArrivedLotItem;
    index: number;
  }) => {
    const id = item.arrivedLotId ?? item.ArrivedLotId ?? item.id ?? index;
    return (
      <View
        style={[
          styles.item,
          { borderColor: theme.text, backgroundColor: theme.background },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemTitle, { color: theme.text }]}>
            {item.cropName ?? item.CropName ?? '-'}
          </Text>
          <Text style={{ color: theme.text }}>
            {t('grade_label') ?? 'Grade'}: {item.grade ?? '-'}
          </Text>
          <Text style={{ color: theme.text }}>
            {t('quantity_label') ?? 'Quantity'}: {String(item.quantity ?? '-')}
          </Text>
          <Text style={{ color: theme.text }}>
            {t('mandi_label') ?? 'Mandi'}:{' '}
            {item.mandiName ?? item.MandiName ?? '-'}
          </Text>
          <Text style={{ color: theme.text, marginTop: 4 }}>
            {t('status') ?? 'Status'}: {item.status ?? '-'}
          </Text>
        </View>

        <View style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() =>
              navigation.navigate('ArrivedLotDetails', {
                arrivedLotId: Number(id),
              })
            }
          >
            <Text style={styles.viewBtnText}>{t('view') ?? 'View'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading && !profileChecked) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator />
        <Text style={{ marginTop: 8, color: theme.text }}>
          {t('loading') ?? 'Loading...'}
        </Text>
      </SafeAreaView>
    );
  }

  const totalLots = lots.length;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Officer + mandi header */}
      <View style={{ padding: 16, paddingBottom: 0 }}>
        {officerName !== '' && (
          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            {t('officer') ?? 'Officer'}: {officerName}
          </Text>
        )}
        {(officerMandiName !== '' || mandiId) && (
          <Text
            style={{
              color: theme.text,
              marginTop: 4,
            }}
          >
            {t('mandi_label') ?? 'Mandi'}:{' '}
            {officerMandiName || `#${mandiId}`}
          </Text>
        )}
        <Text
          style={{
            color: theme.text,
            marginTop: 4,
            fontSize: 12,
          }}
        >
          {t('total_lots') ?? 'Total Lots'}: {totalLots}
        </Text>
      </View>

      {/* Fallback mandi selector when profile doesn't provide mandiId */}
      {!mandiId && (
        <View style={{ padding: 16 }}>
          <Text
            style={{ fontWeight: '700', color: theme.text }}
          >
            {t('select_mandi') ?? 'Select mandi'}
          </Text>
          {loadingMandis ? (
            <ActivityIndicator style={{ marginTop: 8 }} />
          ) : (
            <View
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderRadius: 8,
                overflow: 'hidden',
                borderColor: theme.text,
              }}
            >
              <Picker
                selectedValue={mandiId ?? ''}
                onValueChange={(v) => onMandiSelect(Number(v))}
              >
                <Picker.Item
                  label={t('select_mandi') ?? 'Select mandi'}
                  value=""
                />
                {mandis.map(m => (
                  <Picker.Item
                    key={m.mandiId}
                    label={m.mandiName}
                    value={m.mandiId}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
      )}

      <FlatList
        data={lots}
        keyExtractor={(it, index) => {
          const k =
            it?.arrivedLotId ??
            it?.ArrivedLotId ??
            it?.id ??
            `idx_${index}`;
          return String(k);
        }}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ color: theme.text }}>
              {loading
                ? t('loading') ?? 'Loading...'
                : t('no_arrived_lots') ?? 'No arrived lots found'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: { fontWeight: '700', marginBottom: 6 },
  viewBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewBtnText: { color: '#fff', fontWeight: '700' },
});


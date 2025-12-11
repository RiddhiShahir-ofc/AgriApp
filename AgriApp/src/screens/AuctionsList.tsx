// // // src/screens/AuctionsList.tsx
// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Alert,
// //   FlatList,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';
// // import api from '../services/api';
// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // type RouteParams = { mandiId?: number };
// // type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

// // type AuctionItem = {
// //   auctionId?: string;
// //   AuctionId?: string;
// //   mandiId?: number;
// //   MandiId?: number;
// //   cropName?: string;
// //   CropName?: string;
// //   assignedOfficerName?: string;
// //   AssignedOfficerName?: string;
// //   assignedOfficerId?: string;
// //   AssignedOfficerId?: string;
// //   status?: string;
// //   Status?: string;
// //   scheduledAt?: string;
// //   ScheduledAt?: string;
// //   createdAt?: string;
// //   CreatedAt?: string;
// // };

// // export default function AuctionsList() {
// //   const route = useRoute();
// //   // @ts-ignore - route.params shape can vary; we just read mandiId
// //   const { mandiId } = (route.params || {}) as RouteParams;

// //   const navigation = useNavigation<NavProp>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const [loading, setLoading] = useState(false);
// //   const [auctions, setAuctions] = useState<AuctionItem[]>([]);
// //   const [actionLoading, setActionLoading] = useState<string | null>(null); // auctionId being acted upon
// //   const [officialId, setOfficialId] = useState<string | null>(null); // current officer id (from profile)

// //   useEffect(() => {
// //     // get profile (to find officialId)
// //     const loadProfile = async () => {
// //       try {
// //         const res = await api.get('/mandi-official/profile');
// //         if (res && res.data) {
// //           const data = res.data;
// //           const offId = data.officialId ?? data.OfficialId ?? null;
// //           if (offId) setOfficialId(String(offId));
// //         }
// //       } catch (err) {
// //         console.log('AuctionsList: profile fetch failed', err);
// //         // not fatal
// //       }
// //     };

// //     loadProfile();
// //   }, []);

// //   useEffect(() => {
// //     loadAuctions();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [mandiId]);

// //   const loadAuctions = async () => {
// //     if (!mandiId) {
// //       Alert.alert(t('error_title') ?? 'Error', t('mandi_required') ?? 'Mandi ID is required to fetch auctions');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const res = await api.get('/mandiOfficialAuction/mandi/auction/all', { params: { mandiId } });
// //       let payload = res?.data ?? [];
// //       if (!Array.isArray(payload)) {
// //         if (Array.isArray(payload.items)) payload = payload.items;
// //         else if (Array.isArray(payload.data)) payload = payload.data;
// //         else payload = [payload];
// //       }
// //       setAuctions(payload);
// //     } catch (err: any) {
// //       console.log('Load auctions error', err?.response?.data ?? err);
// //       Alert.alert(t('error_title') ?? 'Error', t('fetch_auctions_failed') ?? 'Failed to fetch auctions');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onStartAuction = async (auctionId: string) => {
// //     setActionLoading(auctionId);
// //     try {
// //       const res = await api.patch(`/mandiOfficialAuction/mandi/auction/${auctionId}/start`);
// //       if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message || 'Failed to start auction');
// //       Alert.alert(t('success_title') ?? 'Success', t('auction_started') ?? 'Auction started');
// //       await loadAuctions();
// //     } catch (err: any) {
// //       console.log('Start auction error', err?.response?.data ?? err);
// //       const msg = err?.response?.data?.message ?? t('auction_start_failed') ?? 'Failed to start auction';
// //       Alert.alert(t('error_title') ?? 'Error', msg);
// //     } finally {
// //       setActionLoading(null);
// //     }
// //   };

// //   const onEndAuction = async (auctionId: string) => {
// //     setActionLoading(auctionId);
// //     try {
// //       const res = await api.patch(`/mandiOfficialAuction/mandi/auction/${auctionId}/end`);
// //       if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message || 'Failed to end auction');
// //       Alert.alert(t('success_title') ?? 'Success', t('auction_ended') ?? 'Auction ended');
// //       await loadAuctions();
// //     } catch (err: any) {
// //       console.log('End auction error', err?.response?.data ?? err);
// //       const msg = err?.response?.data?.message ?? t('auction_end_failed') ?? 'Failed to end auction';
// //       Alert.alert(t('error_title') ?? 'Error', msg);
// //     } finally {
// //       setActionLoading(null);
// //     }
// //   };

// //   const renderItem = ({ item }: { item: AuctionItem }) => {
// //     const id = String(item.auctionId ?? item.AuctionId ?? '');
// //     const cropName = item.cropName ?? item.CropName ?? '-';
// //     const officerName = item.assignedOfficerName ?? item.AssignedOfficerName ?? '-';
// //     const status = item.status ?? item.Status ?? '-';
// //     const schedRaw = item.scheduledAt ?? item.ScheduledAt ?? '';
// //     const sched = schedRaw ? new Date(schedRaw).toLocaleString() : '-';
// //     const assignedOfficerId = item.assignedOfficerId ?? item.AssignedOfficerId ?? null;

// //     const canStart = status === 'scheduled' && (!!officialId ? assignedOfficerId === officialId : true);
// //     const canEnd = status === 'started' && (!!officialId ? assignedOfficerId === officialId : true);

// //     return (
// //       <View style={[styles.card, { borderColor: theme.text, backgroundColor: theme.background }]}>
// //         <Text style={[styles.title, { color: theme.text }]}>{cropName}</Text>
// //         <Text style={{ color: theme.text }}>Assigned: {officerName}</Text>
// //         <Text style={{ color: theme.text }}>Scheduled: {sched}</Text>
// //         <Text style={{ color: theme.text, marginTop: 6, fontWeight: '700' }}>Status: {status}</Text>

// //         <View style={{ flexDirection: 'row', marginTop: 10 }}>
// //           {canStart && (
// //             <TouchableOpacity
// //               style={[styles.startBtn, actionLoading === id && { opacity: 0.7 }]}
// //               onPress={() => onStartAuction(id)}
// //               disabled={!!actionLoading}
// //             >
// //               {actionLoading === id ? (
// //                 <ActivityIndicator color="#fff" />
// //               ) : (
// //                 <Text style={styles.btnText}>{t('start_auction') ?? 'Start'}</Text>
// //               )}
// //             </TouchableOpacity>
// //           )}

// //           {canEnd && (
// //             <TouchableOpacity
// //               style={[styles.endBtn, actionLoading === id && { opacity: 0.7 }]}
// //               onPress={() => onEndAuction(id)}
// //               disabled={!!actionLoading}
// //             >
// //               {actionLoading === id ? (
// //                 <ActivityIndicator color="#fff" />
// //               ) : (
// //                 <Text style={styles.btnText}>{t('end_auction') ?? 'End'}</Text>
// //               )}
// //             </TouchableOpacity>
// //           )}
// //         </View>
// //       </View>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <View style={{ padding: 16 }}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ color: theme.text }}>{t('back')}</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <View style={{ paddingHorizontal: 16 }}>
// //         <Text style={[styles.header, { color: theme.text }]}>{t('auctions') ?? 'Auctions'}</Text>
// //       </View>

// //       {loading ? (
// //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //           <ActivityIndicator />
// //         </View>
// //       ) : auctions.length === 0 ? (
// //         <View style={{ padding: 16 }}>
// //           <Text style={{ color: theme.text }}>{t('no_auctions') ?? 'No auctions scheduled'}</Text>
// //         </View>
// //       ) : (
// //         <FlatList
// //           data={auctions}
// //           keyExtractor={(it) => String(it.auctionId ?? it.AuctionId ?? Math.random())}
// //           renderItem={renderItem}
// //           contentContainerStyle={{ padding: 16 }}
// //         />
// //       )}
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   header: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
// //   card: {
// //     borderWidth: 1,
// //     borderRadius: 10,
// //     padding: 12,
// //     marginBottom: 12,
// //   },
// //   title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
// //   startBtn: {
// //     backgroundColor: '#2563eb',
// //     paddingVertical: 8,
// //     paddingHorizontal: 14,
// //     borderRadius: 8,
// //     marginRight: 8,
// //   },
// //   endBtn: {
// //     backgroundColor: '#ef4444',
// //     paddingVertical: 8,
// //     paddingHorizontal: 14,
// //     borderRadius: 8,
// //   },
// //   btnText: { color: '#fff', fontWeight: '700' },
// // });

// // src/screens/AuctionsList.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import api from '../services/api';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// type RouteParams = { mandiId?: number };
// type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

// type AuctionItem = {
//   auctionId?: string;
//   AuctionId?: string;
//   mandiId?: number;
//   MandiId?: number;
//   cropName?: string;
//   CropName?: string;
//   assignedOfficerName?: string;
//   AssignedOfficerName?: string;
//   assignedOfficerId?: string;
//   AssignedOfficerId?: string;
//   status?: string;
//   Status?: string;
//   scheduledAt?: string;
//   ScheduledAt?: string;
//   createdAt?: string;
//   CreatedAt?: string;
// };

// export default function AuctionsList() {
//   const route = useRoute();
//   const { mandiId } = (route.params || {}) as RouteParams;

//   const navigation = useNavigation<NavProp>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [loading, setLoading] = useState(false);
//   const [auctions, setAuctions] = useState<AuctionItem[]>([]);
//   const [actionLoading, setActionLoading] = useState<string | null>(null); // auctionId being acted upon
//   const [officialId, setOfficialId] = useState<string | null>(null); // current officer id (from profile)

//   useEffect(() => {
//     // get profile (to find officialId)
//     const loadProfile = async () => {
//       try {
//         const res = await api.get('/mandi-official/profile');
//         if (res && res.data) {
//           const data = res.data;
//           const offId = data.officialId ?? data.OfficialId ?? null;
//           if (offId) setOfficialId(String(offId));
//         }
//       } catch (err) {
//         console.log('AuctionsList: profile fetch failed', err);
//         // not fatal
//       }
//     };

//     loadProfile();
//   }, []);

//   useEffect(() => {
//     loadAuctions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mandiId]);

//   const loadAuctions = async () => {
//     if (!mandiId) {
//       Alert.alert(t('error_title') ?? 'Error', t('mandi_required') ?? 'Mandi ID is required to fetch auctions');
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.get('/mandiOfficialAuction/mandi/auction/all', { params: { mandiId } });
//       let payload = res?.data ?? [];
//       if (!Array.isArray(payload)) {
//         if (Array.isArray(payload.items)) payload = payload.items;
//         else if (Array.isArray(payload.data)) payload = payload.data;
//         else payload = [payload];
//       }
//       setAuctions(payload);
//     } catch (err: any) {
//       console.log('Load auctions error', err?.response?.data ?? err);
//       Alert.alert(t('error_title') ?? 'Error', t('fetch_auctions_failed') ?? 'Failed to fetch auctions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper to normalize status string safely
//   const normStatus = (s?: string) => (s ? String(s).toLowerCase() : '');

//   const onStartAuction = async (auctionId: string) => {
//     setActionLoading(auctionId);

//     // optimistic update: set status to "started" locally so UI responds fast
//     setAuctions(prev =>
//       prev.map(a => {
//         const id = String(a.auctionId ?? a.AuctionId ?? '');
//         if (id === auctionId) return { ...a, status: 'started' };
//         return a;
//       }),
//     );

//     try {
//       const res = await api.patch(`/mandiOfficialAuction/mandi/auction/${auctionId}/start`);
//       if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message || 'Failed to start auction');

//       Alert.alert(t('success_title') ?? 'Success', t('auction_started') ?? 'Auction started');

//       // Replace auction with server-returned auction (if sent) to keep in sync
//       if (res.data) {
//         const returned = res.data as AuctionItem;
//         const returnedId = String(returned.auctionId ?? returned.AuctionId ?? '');
//         setAuctions(prev => prev.map(a => (String(a.auctionId ?? a.AuctionId ?? '') === returnedId ? returned : a)));
//       } else {
//         // If no body returned, refresh list in background
//         await loadAuctions();
//       }
//     } catch (err: any) {
//       console.log('Start auction error', err?.response?.data ?? err);
//       const msg = err?.response?.data?.message ?? t('auction_start_failed') ?? 'Failed to start auction';
//       Alert.alert(t('error_title') ?? 'Error', msg);

//       // rollback optimistic update on error
//       setAuctions(prev =>
//         prev.map(a => {
//           const id = String(a.auctionId ?? a.AuctionId ?? '');
//           if (id === auctionId) {
//             // revert to previous status if possible — safe fallback to 'scheduled'
//             return { ...a, status: 'scheduled' };
//           }
//           return a;
//         }),
//       );
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const onEndAuction = async (auctionId: string) => {
//     setActionLoading(auctionId);

//     // optimistic update: set status to "ended" locally
//     setAuctions(prev =>
//       prev.map(a => {
//         const id = String(a.auctionId ?? a.AuctionId ?? '');
//         if (id === auctionId) return { ...a, status: 'ended' };
//         return a;
//       }),
//     );

//     try {
//       const res = await api.patch(`/mandiOfficialAuction/mandi/auction/${auctionId}/end`);
//       if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message || 'Failed to end auction');

//       Alert.alert(t('success_title') ?? 'Success', t('auction_ended') ?? 'Auction ended');

//       if (res.data) {
//         const returned = res.data as AuctionItem;
//         const returnedId = String(returned.auctionId ?? returned.AuctionId ?? '');
//         setAuctions(prev => prev.map(a => (String(a.auctionId ?? a.AuctionId ?? '') === returnedId ? returned : a)));
//       } else {
//         await loadAuctions();
//       }
//     } catch (err: any) {
//       console.log('End auction error', err?.response?.data ?? err);
//       const msg = err?.response?.data?.message ?? t('auction_end_failed') ?? 'Failed to end auction';
//       Alert.alert(t('error_title') ?? 'Error', msg);

//       // rollback optimistic update on error
//       setAuctions(prev =>
//         prev.map(a => {
//           const id = String(a.auctionId ?? a.AuctionId ?? '');
//           if (id === auctionId) {
//             // revert to 'started' as that was the prior allowed state
//             return { ...a, status: 'started' };
//           }
//           return a;
//         }),
//       );
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const renderItem = ({ item }: { item: AuctionItem }) => {
//     const id = String(item.auctionId ?? item.AuctionId ?? '');
//     const cropName = item.cropName ?? item.CropName ?? '-';
//     const officerName = item.assignedOfficerName ?? item.AssignedOfficerName ?? '-';
//     const statusRaw = item.status ?? item.Status ?? '-';
//     const status = statusRaw;
//     const schedRaw = item.scheduledAt ?? item.ScheduledAt ?? '';
//     const sched = schedRaw ? new Date(schedRaw).toLocaleString() : '-';
//     const assignedOfficerId = item.assignedOfficerId ?? item.AssignedOfficerId ?? null;

//     const nstatus = normStatus(statusRaw);
//     const canStart = nstatus === 'scheduled' && (!!officialId ? assignedOfficerId === officialId : true);
//     const canEnd = nstatus === 'started' && (!!officialId ? assignedOfficerId === officialId : true);

//     return (
//       <View style={[styles.card, { borderColor: theme.text, backgroundColor: theme.background }]}>
//         <Text style={[styles.title, { color: theme.text }]}>{cropName}</Text>
//         <Text style={{ color: theme.text }}>Assigned: {officerName}</Text>
//         <Text style={{ color: theme.text }}>Scheduled: {sched}</Text>
//         <Text style={{ color: theme.text, marginTop: 6, fontWeight: '700' }}>Status: {status}</Text>

//         <View style={{ flexDirection: 'row', marginTop: 10 }}>
//           {canStart && (
//             <TouchableOpacity
//               style={[styles.startBtn, actionLoading === id && { opacity: 0.7 }]}
//               onPress={() => onStartAuction(id)}
//               disabled={!!actionLoading}
//             >
//               {actionLoading === id ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.btnText}>{t('start_auction') ?? 'Start'}</Text>
//               )}
//             </TouchableOpacity>
//           )}

//           {canEnd && (
//             <TouchableOpacity
//               style={[styles.endBtn, actionLoading === id && { opacity: 0.7 }]}
//               onPress={() => onEndAuction(id)}
//               disabled={!!actionLoading}
//             >
//               {actionLoading === id ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.btnText}>{t('end_auction') ?? 'End'}</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={{ padding: 16 }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{ color: theme.text }}>{t('back')}</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ paddingHorizontal: 16 }}>
//         <Text style={[styles.header, { color: theme.text }]}>{t('auctions') ?? 'Auctions'}</Text>
//       </View>

//       {loading ? (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator />
//         </View>
//       ) : auctions.length === 0 ? (
//         <View style={{ padding: 16 }}>
//           <Text style={{ color: theme.text }}>{t('no_auctions') ?? 'No auctions scheduled'}</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={auctions}
//           keyExtractor={(it, idx) => String(it.auctionId ?? it.AuctionId ?? idx)}
//           renderItem={renderItem}
//           contentContainerStyle={{ padding: 16 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
//   card: {
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 12,
//   },
//   title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
//   startBtn: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   endBtn: {
//     backgroundColor: '#ef4444',
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 8,
//   },
//   btnText: { color: '#fff', fontWeight: '700' },
// });

// src/screens/AuctionsList.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type RouteParams = { mandiId?: number };
type NavProp = NativeStackNavigationProp<RootStackParamList, any>;

type AuctionItem = {
  auctionId?: string;
  AuctionId?: string;
  mandiId?: number;
  MandiId?: number;
  cropName?: string;
  CropName?: string;
  assignedOfficerName?: string;
  AssignedOfficerName?: string;
  assignedOfficerId?: string;
  AssignedOfficerId?: string;
  status?: string;
  Status?: string;
  scheduledAt?: string;
  ScheduledAt?: string;
  createdAt?: string;
  CreatedAt?: string;
};

export default function AuctionsList() {
  const route = useRoute();
  const { mandiId } = (route.params || {}) as RouteParams;

  const navigation = useNavigation<NavProp>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // auctionId being acted upon
  const [officialId, setOfficialId] = useState<string | null>(null); // current officer id (from profile)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/mandi-official/profile');
        if (res && res.data) {
          const data = res.data;
          const offId = data.officialId ?? data.OfficialId ?? null;
          if (offId) setOfficialId(String(offId));
        }
      } catch (err) {
        console.log('AuctionsList: profile fetch failed', err);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    loadAuctions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mandiId]);

  const loadAuctions = async () => {
    if (!mandiId) {
      Alert.alert(t('error_title') ?? 'Error', t('mandi_required') ?? 'Mandi ID is required to fetch auctions');
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/mandiOfficialAuction/mandi/auction/all', { params: { mandiId } });
      let payload = res?.data ?? [];
      if (!Array.isArray(payload)) {
        if (Array.isArray(payload.items)) payload = payload.items;
        else if (Array.isArray(payload.data)) payload = payload.data;
        else payload = [payload];
      }
      setAuctions(payload);
    } catch (err: any) {
      console.log('Load auctions error', err?.response?.data ?? err);
      Alert.alert(t('error_title') ?? 'Error', t('fetch_auctions_failed') ?? 'Failed to fetch auctions');
    } finally {
      setLoading(false);
    }
  };

  const normStatus = (s?: string) => (s ? String(s).toLowerCase() : '');

  const onStartAuction = async (auctionId: string) => {
    setActionLoading(auctionId);

    // optimistic
    setAuctions(prev => prev.map(a => {
      const id = String(a.auctionId ?? a.AuctionId ?? '');
      if (id === auctionId) return { ...a, status: 'started' };
      return a;
    }));

    try {
      const res = await api.patch(`/mandiOfficialAuction/mandi/auction/${auctionId}/start`);
      if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message || 'Failed to start auction');
      Alert.alert(t('success_title') ?? 'Success', t('auction_started') ?? 'Auction started');

      if (res.data) {
        const returned = res.data as AuctionItem;
        const returnedId = String(returned.auctionId ?? returned.AuctionId ?? '');
        setAuctions(prev => prev.map(a => (String(a.auctionId ?? a.AuctionId ?? '') === returnedId ? returned : a)));
      } else {
        await loadAuctions();
      }
    } catch (err: any) {
      console.log('Start auction error', err?.response?.data ?? err);
      const msg = err?.response?.data?.message ?? t('auction_start_failed') ?? 'Failed to start auction';
      Alert.alert(t('error_title') ?? 'Error', msg);

      // rollback
      setAuctions(prev => prev.map(a => {
        const id = String(a.auctionId ?? a.AuctionId ?? '');
        if (id === auctionId) return { ...a, status: 'scheduled' };
        return a;
      }));
    } finally {
      setActionLoading(null);
    }
  };

  const onEndAuction = async (auctionId: string) => {
    setActionLoading(auctionId);

    // optimistic
    setAuctions(prev => prev.map(a => {
      const id = String(a.auctionId ?? a.AuctionId ?? '');
      if (id === auctionId) return { ...a, status: 'ended' };
      return a;
    }));

    try {
      const res = await api.patch(`/mandiOfficialAuction/mandi/auction/${auctionId}/end`);
      if (!res.status.toString().startsWith('2')) throw new Error(res.data?.message || 'Failed to end auction');
      Alert.alert(t('success_title') ?? 'Success', t('auction_ended') ?? 'Auction ended');

      if (res.data) {
        const returned = res.data as AuctionItem;
        const returnedId = String(returned.auctionId ?? returned.AuctionId ?? '');
        setAuctions(prev => prev.map(a => (String(a.auctionId ?? a.AuctionId ?? '') === returnedId ? returned : a)));
      } else {
        await loadAuctions();
      }
    } catch (err: any) {
      console.log('End auction error', err?.response?.data ?? err);
      const msg = err?.response?.data?.message ?? t('auction_end_failed') ?? 'Failed to end auction';
      Alert.alert(t('error_title') ?? 'Error', msg);

      // rollback
      setAuctions(prev => prev.map(a => {
        const id = String(a.auctionId ?? a.AuctionId ?? '');
        if (id === auctionId) return { ...a, status: 'started' };
        return a;
      }));
    } finally {
      setActionLoading(null);
    }
  };

  const renderItem = ({ item }: { item: AuctionItem }) => {
    const id = String(item.auctionId ?? item.AuctionId ?? '');
    const cropName = item.cropName ?? item.CropName ?? '-';
    const officerName = item.assignedOfficerName ?? item.AssignedOfficerName ?? '-';
    const statusRaw = item.status ?? item.Status ?? '-';
    const status = statusRaw;
    const schedRaw = item.scheduledAt ?? item.ScheduledAt ?? '';
    const sched = schedRaw ? new Date(schedRaw).toLocaleString() : '-';
    const assignedOfficerId = item.assignedOfficerId ?? item.AssignedOfficerId ?? null;

    const nstatus = normStatus(statusRaw);
    const canStart = nstatus === 'scheduled' && (!!officialId ? assignedOfficerId === officialId : true);
    const canEnd = nstatus === 'started' && (!!officialId ? assignedOfficerId === officialId : true);

    const startDisabled = !canStart || !!actionLoading;
    const endDisabled = !canEnd || !!actionLoading;

    return (
      <View style={[styles.card, { borderColor: theme.text, backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>{cropName}</Text>
        <Text style={{ color: theme.text }}>Assigned: {officerName}</Text>
        <Text style={{ color: theme.text }}>Scheduled: {sched}</Text>
        <Text style={{ color: theme.text, marginTop: 6, fontWeight: '700' }}>Status: {status}</Text>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {/* Always render Start button */}
          <TouchableOpacity
            style={[
              styles.startBtn,
              startDisabled && styles.disabledBtn,
              actionLoading === id && { opacity: 0.7 },
            ]}
            onPress={() => { if (!startDisabled) onStartAuction(id); }}
            disabled={startDisabled}
            accessibilityLabel={t('start_auction') ?? 'Start Auction'}
          >
            {actionLoading === id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>{t('start_auction') ?? 'Start'}</Text>
            )}
          </TouchableOpacity>

          {/* Always render End button */}
          <TouchableOpacity
            style={[
              styles.endBtn,
              endDisabled && styles.disabledBtn,
              actionLoading === id && { opacity: 0.7 },
            ]}
            onPress={() => { if (!endDisabled) onEndAuction(id); }}
            disabled={endDisabled}
            accessibilityLabel={t('end_auction') ?? 'End Auction'}
          >
            {actionLoading === id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>{t('end_auction') ?? 'End'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.text }}>{t('back')}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.header, { color: theme.text }]}>{t('auctions') ?? 'Auctions'}</Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : auctions.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text style={{ color: theme.text }}>{t('no_auctions') ?? 'No auctions scheduled'}</Text>
        </View>
      ) : (
        <FlatList
          data={auctions}
          keyExtractor={(it, idx) => String(it.auctionId ?? it.AuctionId ?? idx)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },

  startBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 8,
  },
  endBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  disabledBtn: {
    // visual disabled styles
    opacity: 0.45,
  },

  btnText: { color: '#fff', fontWeight: '700' },
});

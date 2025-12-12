// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Text,
// // //   View,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   ScrollView,
// // //   Alert,
// // //   ActivityIndicator,
// // //   Image
// // // } from 'react-native';
// // // import { useNavigation, useRoute } from '@react-navigation/native';
// // // import api from '../services/api';
// // // import { useTheme } from '../context/ThemeContext';

// // // export default function ArrivedLotsApprover() {
// // //   const navigation = useNavigation();
// // //   const route = useRoute<any>();
// // //   const mandiId = route.params?.mandiId;

// // //   const { theme } = useTheme();
// // //   const [loading, setLoading] = useState(true);
// // //   const [lots, setLots] = useState([]);

// // //   const loadLots = async () => {
// // //     try {
// // //       const res = await api.get('/mandiOfficialAuction/mandi/arrivedLots', {
// // //         params: { mandiId },
// // //       });
// // //       setLots(res.data ?? []);
// // //     } catch (err) {
// // //       Alert.alert('Error', 'Failed to load arrived lots');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadLots();
// // //   }, []);

// // //   const approveLot = async (id: number) => {
// // //     try {
// // //       await api.patch(`/mandi-official/lots/arrived/${id}/status`, {
// // //         newStatus: 'verified',
// // //       });
// // //       Alert.alert('Success', 'Lot approved successfully');
// // //       loadLots();
// // //     } catch (err) {
// // //       Alert.alert('Error', 'Failed to approve lot');
// // //     }
// // //   };

// // //   return (
// // //     <ScrollView style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
// // //       <Text style={{ fontSize: 24, fontWeight: '700', color: theme.text }}>Arrived Lots</Text>

// // //       {loading ? (
// // //         <ActivityIndicator size="large" style={{ marginTop: 30 }} />
// // //       ) : (
// // //         lots.map((item: any) => (
// // //           <View key={item.arrivedLotId} style={[styles.card, { borderColor: theme.text }]}>

// // //             {item.lotImageUrl ? (
// // //               <Image source={{ uri: item.lotImageUrl }} style={styles.image} />
// // //             ) : null}

// // //             <Text style={[styles.title, { color: theme.text }]}>
// // //               {item.cropName}
// // //             </Text>
// // //             <Text style={{ color: theme.text }}>Quantity: {item.quantity}</Text>
// // //             <Text style={{ color: theme.text }}>Grade: {item.grade}</Text>
// // //             <Text style={{ color: theme.text }}>Status: {item.status}</Text>

// // //             <View style={{ flexDirection: 'row', marginTop: 12 }}>
// // //               <TouchableOpacity
// // //                 style={styles.approveBtn}
// // //                 onPress={() => approveLot(item.arrivedLotId)}
// // //               >
// // //                 <Text style={styles.btnText}>Approve</Text>
// // //               </TouchableOpacity>

// // //               <TouchableOpacity
// // //                 style={styles.editBtn}
// // //                 onPress={() =>
// // //                   navigation.navigate('EditArrivedLot', { arrivedLotId: item.arrivedLotId })
// // //                 }
// // //               >
// // //                 <Text style={styles.btnText}>Edit</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>
// // //         ))
// // //       )}
// // //     </ScrollView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   card: {
// // //     borderWidth: 1,
// // //     padding: 12,
// // //     borderRadius: 10,
// // //     marginTop: 16,
// // //   },
// // //   title: { fontSize: 18, fontWeight: '700' },
// // //   approveBtn: {
// // //     backgroundColor: '#16a34a',
// // //     padding: 10,
// // //     borderRadius: 8,
// // //     marginRight: 12,
// // //   },
// // //   editBtn: {
// // //     backgroundColor: '#2563eb',
// // //     padding: 10,
// // //     borderRadius: 8,
// // //   },
// // //   btnText: { color: '#fff', fontWeight: '700' },
// // //   image: {
// // //     width: '100%',
// // //     height: 160,
// // //     borderRadius: 8,
// // //     marginBottom: 10,
// // //   },
// // // });

// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   StyleSheet,
// //   TouchableOpacity,
// //   ScrollView,
// //   Alert,
// //   ActivityIndicator,
// //   Image
// // } from 'react-native';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import api from '../services/api';
// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // export default function ArrivedLotsApprover() {

// // type NavProp = NativeStackNavigationProp<RootStackParamList, 'ArrivedLotsApprover'>;
// // const navigation = useNavigation<NavProp>();

// //   //const navigation = useNavigation();
// //   const route = useRoute<any>();
// //   const mandiId = route.params?.mandiId;

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const [loading, setLoading] = useState(true);
// //   const [lots, setLots] = useState([]);

// //   const loadLots = async () => {
// //     try {
// //       const res = await api.get('/mandiOfficialAuction/mandi/arrivedLots', {
// //         params: { mandiId }
// //       });
// //       setLots(res.data ?? []);
// //     } catch (err) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fetch_lots_failed') ?? 'Failed to load arrived lots');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadLots();
// //   }, []);

// //   const approveLot = async (id: number) => {
// //     try {
// //       await api.patch(`/mandi-official/lots/arrived/${id}/status`, {
// //         newStatus: 'verified'
// //       });

// //       Alert.alert(t('success_title') ?? 'Success', t('approve_success') ?? 'Lot approved successfully');
// //       loadLots();
// //     } catch (err) {
// //       Alert.alert(t('error_title') ?? 'Error', t('approve_failed') ?? 'Failed to approve lot');
// //     }
// //   };

// //   return (
// //     <ScrollView style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      
// //       <Text style={{ fontSize: 24, fontWeight: '700', color: theme.text }}>
// //         {t('arrived_lots_title') ?? 'Arrived Lots'}
// //       </Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" style={{ marginTop: 30 }} />
// //       ) : (
// //         lots.map((item: any) => (
// //           <View key={item.arrivedLotId} style={[styles.card, { borderColor: theme.text }]}>

// //             {item.lotImageUrl ? (
// //               <Image source={{ uri: item.lotImageUrl }} style={styles.image} />
// //             ) : null}

// //             <Text style={[styles.title, { color: theme.text }]}>
// //               {t('crop') ?? 'Crop'}: {item.cropName}
// //             </Text>

// //             <Text style={{ color: theme.text }}>
// //               {t('quantity') ?? 'Quantity'}: {item.quantity}
// //             </Text>

// //             <Text style={{ color: theme.text }}>
// //               {t('grade_label') ?? 'Grade'}: {item.grade}
// //             </Text>

// //             <Text style={{ color: theme.text }}>
// //               {t('status') ?? 'Status'}: {item.status}
// //             </Text>

// //             <View style={{ flexDirection: 'row', marginTop: 12 }}>
              
// //               {/* APPROVE */}
// //               <TouchableOpacity
// //                 style={[styles.approveBtn, { backgroundColor: theme.primary }]}
// //                 onPress={() => approveLot(item.arrivedLotId)}
// //               >
// //                 <Text style={[styles.btnText, { color: theme.text }]}>
// //                   {t('verify') ?? 'Verify'}
// //                 </Text>
// //               </TouchableOpacity>

// //               {/* EDIT */}
// //               <TouchableOpacity
// //                 style={[styles.editBtn, { backgroundColor: theme.primary }]}
// //                 onPress={() =>
// //                   navigation.navigate('EditArrivedLot', { arrivedLotId: item.arrivedLotId })
// //                 }
// //               >
// //                 <Text style={[styles.btnText, { color: theme.text }]}>
// //                   {t('edit') ?? 'Edit'}
// //                 </Text>
// //               </TouchableOpacity>

// //             </View>
// //           </View>
// //         ))
// //       )}

// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   card: {
// //     borderWidth: 1,
// //     padding: 12,
// //     borderRadius: 10,
// //     marginTop: 16
// //   },
// //   title: { fontSize: 18, fontWeight: '700' },
// //   approveBtn: {
// //     padding: 10,
// //     borderRadius: 8,
// //     marginRight: 12
// //   },
// //   editBtn: {
// //     padding: 10,
// //     borderRadius: 8
// //   },
// //   btnText: { fontWeight: '700' },
// //   image: {
// //     width: '100%',
// //     height: 160,
// //     borderRadius: 8,
// //     marginBottom: 10
// //   }
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Image
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import api from '../services/api';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// export default function ArrivedLotsApprover() {

//   type NavProp = NativeStackNavigationProp<RootStackParamList, 'ArrivedLotsApprover'>;
//   const navigation = useNavigation<NavProp>();

//   const route = useRoute<any>();
//   const mandiId = route.params?.mandiId;

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [loading, setLoading] = useState(true);
//   const [lots, setLots] = useState([]);

//   const loadLots = async () => {
//     try {
//       const res = await api.get('/mandiOfficialAuction/mandi/arrivedLots', {
//         params: { mandiId }
//       });
//       setLots(res.data ?? []);
//     } catch (err) {
//       Alert.alert(t('error_title') ?? 'Error', t('fetch_lots_failed') ?? 'Failed to load arrived lots');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadLots();
//   }, []);

//   // -----------------------------------------
//   // NEW: APPROVE or READY-FOR-AUCTION FLOW
//   // -----------------------------------------
//   const handleApproveOrReady = async (item: any) => {
//     const id = item.arrivedLotId;

//     // 1️⃣ First click → ARRIVED → VERIFIED
//     if (item.status === 'arrived') {
//       try {
//         await api.patch(`/mandi-official/lots/arrived/${id}/status`, {
//           newStatus: 'verified'
//         });

//         Alert.alert(
//           t('success_title') ?? 'Success',
//           t('approve_success') ?? 'Lot verified successfully'
//         );

//         loadLots();
//       } catch (err) {
//         Alert.alert(
//           t('error_title') ?? 'Error',
//           t('approve_failed') ?? 'Failed to verify lot'
//         );
//       }
//       return;
//     }

//     // 2️⃣ Second click → VERIFIED → Navigate to Auction Mapping
//     if (item.status === 'verified') {
//       navigation.navigate('ReadyForAuctionMap', {
//         arrivedLotId: id,
//         mandiId: mandiId
//       });
//       return;
//     }

//     // 3️⃣ If already readyForAuction → disable button
//     Alert.alert(
//       t('info') ?? 'Info',
//       t('lot_already_ready') ?? 'This lot is already marked ready for auction.'
//     );
//   };

//   return (
//     <ScrollView style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      
//       <Text style={{ fontSize: 24, fontWeight: '700', color: theme.text }}>
//         {t('arrived_lots_title') ?? 'Arrived Lots'}
//       </Text>

//       {loading ? (
//         <ActivityIndicator size="large" style={{ marginTop: 30 }} />
//       ) : (
//         lots.map((item: any) => (
//           <View key={item.arrivedLotId} style={[styles.card, { borderColor: theme.text }]}>

//             {/* Lot Image */}
//             {item.lotImageUrl ? (
//               <Image source={{ uri: item.lotImageUrl }} style={styles.image} />
//             ) : null}

//             {/* Lot Fields */}
//             <Text style={[styles.title, { color: theme.text }]}>
//               {t('crop') ?? 'Crop'}: {item.cropName}
//             </Text>

//             <Text style={{ color: theme.text }}>
//               {t('quantity') ?? 'Quantity'}: {item.quantity}
//             </Text>

//             <Text style={{ color: theme.text }}>
//               {t('grade_label') ?? 'Grade'}: {item.grade}
//             </Text>

//             <Text style={{ color: theme.text }}>
//               {t('status') ?? 'Status'}: {item.status}
//             </Text>

//             <View style={{ flexDirection: 'row', marginTop: 12 }}>
              
//               {/* APPROVE / READY BUTTON */}
//               <TouchableOpacity
//                 style={[
//                   styles.approveBtn, 
//                   { backgroundColor: theme.primary }
//                 ]}
//                 onPress={() => handleApproveOrReady(item)}
//               >
//                 <Text style={[styles.btnText, { color: theme.text }]}>
//                   {item.status === 'arrived'
//                     ? (t('verify') ?? 'Verify')
//                     : item.status === 'verified'
//                     ? (t('ready_for_auction') ?? 'Ready For Auction')
//                     : (t('verify') ?? 'Verified')}
//                 </Text>
//               </TouchableOpacity>

//               {/* EDIT BUTTON (disabled when status !== arrived) */}
//               <TouchableOpacity
//                 style={[
//                   styles.editBtn,
//                   { backgroundColor: item.status === 'arrived' ? theme.primary : '#9ca3af' }
//                 ]}
//                 disabled={item.status !== 'arrived'}
//                 onPress={() =>
//                   navigation.navigate('EditArrivedLot', { arrivedLotId: item.arrivedLotId })
//                 }
//               >
//                 <Text
//                   style={[
//                     styles.btnText,
//                     { color: item.status === 'arrived' ? theme.text : '#f9fafb' }
//                   ]}
//                 >
//                   {t('edit') ?? 'Edit'}
//                 </Text>
//               </TouchableOpacity>

//             </View>
//           </View>
//         ))
//       )}

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 16
//   },
//   title: { fontSize: 18, fontWeight: '700' },
//   approveBtn: {
//     padding: 10,
//     borderRadius: 8,
//     marginRight: 12
//   },
//   editBtn: {
//     padding: 10,
//     borderRadius: 8
//   },
//   btnText: { fontWeight: '700' },
//   image: {
//     width: '100%',
//     height: 160,
//     borderRadius: 8,
//     marginBottom: 10
//   }
// });

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ArrivedLotsApprover'>;

export default function ArrivedLotsApprover() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<any>();
  const mandiId = route.params?.mandiId;

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [lots, setLots] = useState<any[]>([]);
  const [verifyClicks, setVerifyClicks] = useState<Record<number, number>>({});

  const loadLots = async () => {
    try {
      const res = await api.get('/mandiOfficialAuction/mandi/arrivedLots', {
        params: { mandiId },
      });
      setLots(res.data ?? []);
    } catch (_err) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fetch_lots_failed') ?? 'Failed to load arrived lots'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLots();
  }, []);

  // -------------------------------
  // VERIFY LOGIC (two-step)
  // -------------------------------
  const handleVerifyPress = async (lot: any) => {
    const id = lot.arrivedLotId;

    // Disable if already verified or readyForAuction
    if (lot.status === 'verified' || lot.status === 'readyForAuction') return;

    const clicks = verifyClicks[id] ?? 0;

    // FIRST CLICK → set to verified
    if (clicks === 0) {
      try {
        await api.patch(`/mandi-official/lots/arrived/${id}/status`, {
          newStatus: 'verified',
        });

        Alert.alert(
          t('success_title') ?? 'Success',
          t('approve_success') ?? 'Lot status updated to Verified.'
        );

        setVerifyClicks({ ...verifyClicks, [id]: 1 });
        loadLots();
      } catch (_err) {
        Alert.alert(
          t('error_title') ?? 'Error',
          t('approve_failed') ?? 'Failed to verify lot'
        );
      }
      return;
    }

    // SECOND CLICK → navigate to auction mapping
    navigation.navigate('ReadyForAuctionMap', {
      arrivedLotId: id,
      mandiId,
    });
  };

  // -------------------------------
  // EDIT BUTTON HANDLER
  // -------------------------------
  const handleEdit = (lot: any) => {
    // Disable if already verified or readyForAuction
    if (lot.status === 'verified' || lot.status === 'readyForAuction') return;

    navigation.navigate('EditArrivedLot', {
      arrivedLotId: lot.arrivedLotId,
      //mandiId,
    });
  };

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: theme.text }}>
        {t('arrived_lots_title') ?? 'Arrived Lots'}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        lots.map((item: any) => {
          const disabled = item.status === 'verified' || item.status === 'readyForAuction';

          return (
            <View key={item.arrivedLotId} style={[styles.card, { borderColor: theme.text }]}>
              {item.lotImageUrl ? (
                <Image source={{ uri: item.lotImageUrl }} style={styles.image} />
              ) : null}

              <Text style={[styles.title, { color: theme.text }]}>
                {t('crop') ?? 'Crop'}: {item.cropName}
              </Text>

              <Text style={{ color: theme.text }}>
                {t('quantity') ?? 'Quantity'}: {item.quantity}
              </Text>

              <Text style={{ color: theme.text }}>
                {t('grade_label') ?? 'Grade'}: {item.grade}
              </Text>

              <Text style={{ color: theme.text }}>
                {t('status') ?? 'Status'}: {item.status}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                {/* VERIFY BUTTON */}
                <TouchableOpacity
                  disabled={disabled}
                  style={[
                    styles.verifyBtn,
                    {
                      backgroundColor: disabled ? '#9ca3af' : theme.primary,
                      opacity: disabled ? 0.6 : 1,
                    },
                  ]}
                  onPress={() => handleVerifyPress(item)}
                >
                  <Text style={[styles.btnText, { color: theme.text }]}>
                    {t('verify') ?? 'Verify'}
                  </Text>
                </TouchableOpacity>

                {/* EDIT BUTTON */}
                <TouchableOpacity
                  disabled={disabled}
                  style={[
                    styles.editBtn,
                    {
                      backgroundColor: disabled ? '#9ca3af' : theme.primary,
                      opacity: disabled ? 0.6 : 1,
                    },
                  ]}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={[styles.btnText, { color: theme.text }]}>
                    {t('edit') ?? 'Edit'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  title: { fontSize: 18, fontWeight: '700' },
  verifyBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 12,
  },
  editBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnText: { fontWeight: '700' },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
});

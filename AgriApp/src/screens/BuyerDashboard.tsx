// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
//   ScrollView,
//   Alert,
//   Platform,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type Lot = {
//   id: string;
//   crop: string;
//   grade: string;
//   quantity: string;
//   mandi: string;
//   expectedArrival: string;
//   createdAt: number;
//   owner?: string;
// };

// // 🔵 NEW: Bid type with status
// type Bid = {
//   lotId: string;
//   lotOwner: string;
//   bidder: string;
//   bidValue: string;
//   createdAt: number;
//   status?: 'pending' | 'accepted' | 'rejected';
// };

// // 🔵 NEW: Bid joined with lot
// type BidWithLot = Bid & {
//   lot?: Lot;
// };

// export default function BuyerDashboard() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const goBack = () => navigation.navigate('Dashboard');

//   // 🔵 CHANGED: added 'placed' tab
//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre' | 'placed'>('daily');

//   // Daily
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // Short-term forecast
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   // Pre Bidding
//   const [lots, setLots] = useState<Lot[]>([]);
//   const [loadingLots, setLoadingLots] = useState(true);
//   const [bidValues, setBidValues] = useState<Record<string, string>>({});
//   const [placingBid, setPlacingBid] = useState<Record<string, boolean>>({});

//   // 🔵 NEW: My placed bids
//   const [myBids, setMyBids] = useState<BidWithLot[]>([]);
//   const [loadingMyBids, setLoadingMyBids] = useState(false);

//   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
//   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

//   const isPredefined = (value: string, options: string[]) =>
//     value === '' || options.includes(value) || value === 'Other';

//   // Load all registered lots (same logic as BuyerPreBidding)
//   const loadAllRegisteredLots = async () => {
//     setLoadingLots(true);
//     try {
//       const keys = await AsyncStorage.getAllKeys();
//       const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
//       if (lotKeys.length === 0) {
//         setLots([]);
//         setLoadingLots(false);
//         return;
//       }
//       const pairs = await AsyncStorage.multiGet(lotKeys);
//       const aggregated: Lot[] = [];
//       pairs.forEach(([key, json]) => {
//         if (!json) return;
//         try {
//           const parsed: Lot[] = JSON.parse(json);
//           const owner = key.replace('REGISTERED_LOTS_', '');
//           parsed.forEach(l => aggregated.push({ ...l, owner }));
//         } catch (e) {
//           console.warn('Parse error', key, e);
//         }
//       });
//       aggregated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
//       setLots(aggregated);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to load available lots');
//     } finally {
//       setLoadingLots(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedTab === 'pre') {
//       loadAllRegisteredLots();
//     }
//     // 🔵 NEW: load my bids when "placed" tab is opened
//     if (selectedTab === 'placed') {
//       loadMyPlacedBids();
//     }
//   }, [selectedTab]);

//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title'), t('fill_mandi_search'));
//       return;
//     }
//     Alert.alert(t('search'), `Mandi: ${mandiName}\nCrop: ${cropName}`);
//   };

//   const getShortTermForecastInline = async () => {
//     if (!stfMandi && !stfCrop) {
//       Alert.alert(t('error_title'), 'Select mandi and crop');
//       return;
//     }
//     setForecastLoading(true);
//     const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — ${
//       horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
//     }`;
//     setTimeout(() => {
//       setForecastSummary(summary);
//       setForecastLoading(false);
//     }, 400);
//   };

//   const placeBid = async (lot: Lot) => {
//     const value = (bidValues[lot.id] || '').trim();
//     if (!value || isNaN(Number(value))) {
//       Alert.alert('Error', 'Enter a valid bid amount');
//       return;
//     }

//     setPlacingBid(s => ({ ...s, [lot.id]: true }));

//     try {
//       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
//       if (!bidder) {
//         Alert.alert('Error', 'Please login to place bid');
//         return;
//       }

//       const bidKey = `BIDS_LOT_${lot.id}`;
//       const existing = await AsyncStorage.getItem(bidKey);
//       let bids: Bid[] = existing ? JSON.parse(existing) : [];
//       bids.unshift({
//         lotId: lot.id,
//         lotOwner: lot.owner || '',
//         bidder,
//         bidValue: value,
//         createdAt: Date.now(),
//         status: 'pending', // 🔵 NEW
//       });
//       await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

//       Alert.alert('Success', `Bid of ₹${value}/quintal placed!`);
//       setBidValues(s => ({ ...s, [lot.id]: '' }));
//     } catch (err) {
//       Alert.alert('Error', 'Failed to place bid');
//     } finally {
//       setPlacingBid(s => ({ ...s, [lot.id]: false }));
//     }
//   };

//   const renderLotItem = ({ item }: { item: Lot }) => (
//     <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
//       <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} ({item.grade})</Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {item.quantity} quintal</Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {item.mandi}</Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {item.expectedArrival}</Text>

//       <View style={styles.bidRow}>
//         <TextInput
//           placeholder="Your bid (₹/quintal)"
//           placeholderTextColor="#999"
//           value={bidValues[item.id] || ''}
//           onChangeText={t => setBidValues(s => ({ ...s, [item.id]: t.replace(/[^0-9.]/g, '') }))}
//           keyboardType="numeric"
//           style={[styles.bidInput, { borderColor: theme.text, color: theme.text }]}
//         />
//         <TouchableOpacity
//           onPress={() => placeBid(item)}
//           disabled={placingBid[item.id]}
//           style={[styles.bidBtn, { backgroundColor: theme.primary }]}
//         >
//           {placingBid[item.id] ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.bidBtnText}>Bid</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // 🔵 NEW: helper to load placed bids of current user + join with lots
//   const loadMyPlacedBids = async () => {
//     setLoadingMyBids(true);
//     try {
//       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
//       if (!bidder) {
//         setMyBids([]);
//         setLoadingMyBids(false);
//         return;
//       }

//       const keys = await AsyncStorage.getAllKeys();
//       const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
//       const bidKeys = keys.filter(k => k.startsWith('BIDS_LOT_'));

//       // Build map of lotId -> lot
//       const lotPairs = await AsyncStorage.multiGet(lotKeys);
//       const lotMap = new Map<string, Lot>();
//       lotPairs.forEach(([key, json]) => {
//         if (!json) return;
//         try {
//           const parsed: Lot[] = JSON.parse(json);
//           const owner = key.replace('REGISTERED_LOTS_', '');
//           parsed.forEach(l => {
//             lotMap.set(l.id, { ...l, owner });
//           });
//         } catch (e) {
//           console.warn('Parse error (lots)', key, e);
//         }
//       });

//       const bidPairs = await AsyncStorage.multiGet(bidKeys);
//       const result: BidWithLot[] = [];
//       bidPairs.forEach(([key, json]) => {
//         if (!json) return;
//         try {
//           const bids: Bid[] = JSON.parse(json);
//           bids.forEach(b => {
//             if (b.bidder === bidder) {
//               result.push({
//                 ...b,
//                 lot: lotMap.get(b.lotId),
//               });
//             }
//           });
//         } catch (e) {
//           console.warn('Parse error (bids)', key, e);
//         }
//       });

//       // sort by createdAt desc
//       result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

//       setMyBids(result);
//     } catch (err) {
//       console.warn(err);
//       Alert.alert('Error', 'Failed to load your bids');
//     } finally {
//       setLoadingMyBids(false);
//     }
//   };

//   // 🔵 NEW: badge for bid status
//   const renderStatusBadge = (status?: 'pending' | 'accepted' | 'rejected') => {
//     const s = status || 'pending';
//     let bg = '#eee';
//     let color = '#333';
//     if (s === 'pending') {
//       bg = '#fff3cd';
//       color = '#856404';
//     } else if (s === 'accepted') {
//       bg = '#d4edda';
//       color = '#155724';
//     } else if (s === 'rejected') {
//       bg = '#f8d7da';
//       color = '#721c24';
//     }
//     return (
//       <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: bg }}>
//         <Text style={{ color, fontSize: 12, fontWeight: '600' }}>
//           {s.charAt(0).toUpperCase() + s.slice(1)}
//         </Text>
//       </View>
//     );
//   };

//   const renderPlacedBidItem = ({ item }: { item: BidWithLot }) => {
//     const lot = item.lot;
//     return (
//       <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
//           <Text style={[styles.lotTitle, { color: theme.text }]}>
//             {lot ? `${lot.crop} (${lot.grade})` : `Lot ${item.lotId}`}
//           </Text>
//           {renderStatusBadge(item.status)}
//         </View>
//         {lot && (
//           <>
//             <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {lot.quantity} quintal</Text>
//             <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {lot.mandi}</Text>
//             <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {lot.expectedArrival}</Text>
//           </>
//         )}
//         <Text style={[styles.lotDetail, { color: theme.text, marginTop: 4 }]}>
//           Your Bid: ₹{item.bidValue}/quintal
//         </Text>
//         <Text style={[styles.lotDetail, { color: theme.text }]}>
//           Placed on: {new Date(item.createdAt).toLocaleDateString()}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back') || 'Back'}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard') || 'Buyer Dashboard'}</Text>
//         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg') || 'Find and bid on crop lots'}</Text>

//         <View style={styles.tabsRow}>
//           {(['daily', 'short', 'pre', 'placed'] as const).map(tab => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tab,
//                 selectedTab === tab
//                   ? { backgroundColor: theme.primary ?? '#3182ce' }
//                   : { backgroundColor: '#f0f0f0' },
//               ]}
//               onPress={() => setSelectedTab(tab)}
//             >
//               <Text style={[
//                 styles.tabText,
//                 { color: selectedTab === tab ? '#fff' : theme.text },
//                 selectedTab === tab && styles.tabTextSelected,
//               ]}>
//                 {tab === 'daily'
//                   ? t('daily_market_price')
//                   : tab === 'short'
//                   ? t('short_term_forecast')
//                   : tab === 'pre'
//                   ? t('pre_bidding') || 'Pre Bidding'
//                   : t('placed_bids') || 'My Bids'}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* DAILY TAB */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.searchBox, { borderColor: theme.text }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'} onValueChange={v => v !== 'Other' && setMandiName(v)}>
//                 <Picker.Item label="Select Mandi" value="" />
//                 {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {(!isPredefined(mandiName, mandiOptions) && mandiName) && (
//               <TextInput placeholder="Type mandi" value={mandiName} onChangeText={setMandiName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
//             )}

//             <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'} onValueChange={v => v !== 'Other' && setCropName(v)}>
//                 <Picker.Item label="Select crop" value="" />
//                 {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {(!isPredefined(cropName, cropOptions) && cropName) && (
//               <TextInput placeholder="Type crop" value={cropName} onChangeText={setCropName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
//             )}

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={onSearchDaily}>
//               <Text style={styles.searchBtnText}>Search</Text>
//             </TouchableOpacity>

//             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* SHORT TERM TAB */}
//         {selectedTab === 'short' && (
//           <View>
//             <View style={[styles.searchBox, { borderColor: theme.text }]}>
//               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'} onValueChange={v => v !== 'Other' && setStfMandi(v)}>
//                   <Picker.Item label="Select mandi" value="" />
//                   {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (
//                 <TextInput placeholder="Type mandi" value={stfMandi} onChangeText={setStfMandi} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
//               )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'} onValueChange={v => v !== 'Other' && setStfCrop(v)}>
//                   <Picker.Item label="Select crop" value="" />
//                   {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {(!isPredefined(stfCrop, cropOptions) && stfCrop) && (
//                 <TextInput placeholder="Type crop" value={stfCrop} onChangeText={setStfCrop} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
//               )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
//               <View style={styles.horizonRow}>
//                 {(['7days', '14days', '30days'] as const).map(d => (
//                   <TouchableOpacity key={d} style={[styles.horizonBtn, horizon === d && styles.horizonBtnActive]} onPress={() => setHorizon(d)}>
//                     <Text style={horizon === d ? styles.horizonTextActive : styles.horizonText}>
//                       {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={getShortTermForecastInline}>
//                 <Text style={styles.searchBtnText}>Get Forecast</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={[styles.chartBox, { borderColor: theme.text }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>Forecast Result</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: '#666' }}>
//                   {forecastLoading ? 'Loading...' : forecastSummary || 'Select mandi & crop above'}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* PRE BIDDING TAB */}
//         {selectedTab === 'pre' && (
//           <View>
//             <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Lots for Pre-Bidding</Text>

//             {loadingLots ? (
//               <View style={styles.center}>
//                 <ActivityIndicator size="large" color={theme.primary} />
//                 <Text style={{ marginTop: 10, color: theme.text }}>Loading lots...</Text>
//               </View>
//             ) : lots.length === 0 ? (
//               <View style={styles.emptyBox}>
//                 <Text style={{ color: theme.text }}>No pre-registered lots available</Text>
//               </View>
//             ) : (
//               <FlatList
//                 data={lots}
//                 keyExtractor={item => item.id}
//                 renderItem={renderLotItem}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 20 }}
//               />
//             )}
//           </View>
//         )}

//         {/* 🔵 NEW: PLACED BIDS TAB */}
//         {selectedTab === 'placed' && (
//           <View>
//             <Text style={[styles.sectionTitle, { color: theme.text }]}>
//               {t('placed_bids') || 'My Placed Bids'}
//             </Text>

//             {loadingMyBids ? (
//               <View style={styles.center}>
//                 <ActivityIndicator size="large" color={theme.primary} />
//                 <Text style={{ marginTop: 10, color: theme.text }}>Loading your bids...</Text>
//               </View>
//             ) : myBids.length === 0 ? (
//               <View style={styles.emptyBox}>
//                 <Text style={{ color: theme.text }}>You haven't placed any bids yet</Text>
//               </View>
//             ) : (
//               <FlatList
//                 data={myBids}
//                 keyExtractor={item => `${item.lotId}_${item.createdAt}`}
//                 renderItem={renderPlacedBidItem}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 20 }}
//               />
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 26, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 16, marginBottom: 16 },
//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
//   tab: { flex: 0.24, padding: 12, borderRadius: 10, alignItems: 'center' },
//   tabText: { fontWeight: '600' },
//   tabTextSelected: { fontWeight: 'bold' },

//   searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
//   searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
//   pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
//   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
//   searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

//   chartBox: { borderWidth: 1, borderRadius: 12, padding: 16 },
//   chartTitle: { fontWeight: '700', marginBottom: 12 },
//   chartPlaceholder: { height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },

//   horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
//   horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { fontWeight: 'bold', color: '#333' },
//   horizonTextActive: { color: '#fff', fontWeight: 'bold' },

//   sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12, color: '#333' },
//   center: { alignItems: 'center', padding: 40 },
//   emptyBox: { padding: 30, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: '#ddd' },

//   lotCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
//   lotTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
//   lotDetail: { fontSize: 14, marginBottom: 4 },
//   bidRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
//   bidInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 12, marginRight: 10 },
//   bidBtn: { backgroundColor: '#2b6cb0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
//   bidBtnText: { color: '#fff', fontWeight: 'bold' },
// });

import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
  owner?: string;
};

// 🔵 Bid type with status
type Bid = {
  lotId: string;
  lotOwner: string;
  bidder: string;
  bidValue: string;
  createdAt: number;
  status?: 'pending' | 'accepted' | 'rejected';
};

// 🔵 Bid joined with lot
type BidWithLot = Bid & {
  lot?: Lot;
};

export default function BuyerDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const goBack = () => navigation.navigate('Dashboard');

  // 🔵 added 'placed' tab
  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre' | 'placed'>('daily');

  // Daily
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');

  // Short-term forecast
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  // Pre Bidding
  const [lots, setLots] = useState<Lot[]>([]);
  const [loadingLots, setLoadingLots] = useState(true);
  const [bidValues, setBidValues] = useState<Record<string, string>>({});
  const [placingBid, setPlacingBid] = useState<Record<string, boolean>>({});

  // 🔵 My placed bids
  const [myBids, setMyBids] = useState<BidWithLot[]>([]);
  const [loadingMyBids, setLoadingMyBids] = useState(false);

  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
  const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

  const isPredefined = (value: string, options: string[]) =>
    value === '' || options.includes(value) || value === 'Other';

  // 🔵 helper to load placed bids of current user + join with lots
  const loadMyPlacedBids = async () => {
    setLoadingMyBids(true);
    try {
      const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
      if (!bidder) {
        setMyBids([]);
        setLoadingMyBids(false);
        return;
      }

      const keys = await AsyncStorage.getAllKeys();
      const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
      const bidKeys = keys.filter(k => k.startsWith('BIDS_LOT_'));

      // Build map of lotId -> lot
      const lotPairs = await AsyncStorage.multiGet(lotKeys);
      const lotMap = new Map<string, Lot>();
      lotPairs.forEach(([key, json]) => {
        if (!json) return;
        try {
          const parsed: Lot[] = JSON.parse(json);
          const owner = key.replace('REGISTERED_LOTS_', '');
          parsed.forEach(l => {
            lotMap.set(l.id, { ...l, owner });
          });
        } catch (e) {
          console.warn('Parse error (lots)', key, e);
        }
      });

      const bidPairs = await AsyncStorage.multiGet(bidKeys);
      const result: BidWithLot[] = [];
      bidPairs.forEach(([key, json]) => {
        if (!json) return;
        try {
          const bids: Bid[] = JSON.parse(json);
          bids.forEach(b => {
            if (b.bidder === bidder) {
              result.push({
                ...b,
                lot: lotMap.get(b.lotId),
              });
            }
          });
        } catch (e) {
          console.warn('Parse error (bids)', key, e);
        }
      });

      // sort by createdAt desc
      result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setMyBids(result);
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Failed to load your bids');
    } finally {
      setLoadingMyBids(false);
    }
  };

  // 🔵 Load lots but EXCLUDE lots where current buyer has already placed a bid
  const loadAllRegisteredLots = async () => {
    setLoadingLots(true);
    try {
      const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
      const keys = await AsyncStorage.getAllKeys();

      const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
      const bidKeys = bidder ? keys.filter(k => k.startsWith('BIDS_LOT_')) : [];

      // Build set of lotIds on which THIS bidder has already placed a bid
      const myBidLotIds = new Set<string>();
      if (bidder && bidKeys.length > 0) {
        const bidPairs = await AsyncStorage.multiGet(bidKeys);
        bidPairs.forEach(([key, json]) => {
          if (!json) return;
          try {
            const bids: Bid[] = JSON.parse(json);
            bids.forEach(b => {
              if (b.bidder === bidder) {
                myBidLotIds.add(b.lotId);
              }
            });
          } catch (e) {
            console.warn('Parse error (bids for lots filter)', key, e);
          }
        });
      }

      const lotPairs = await AsyncStorage.multiGet(lotKeys);
      const aggregated: Lot[] = [];
      lotPairs.forEach(([key, json]) => {
        if (!json) return;
        try {
          const parsed: Lot[] = JSON.parse(json);
          const owner = key.replace('REGISTERED_LOTS_', '');
          parsed.forEach(l => {
            // 🚫 Skip lots where this buyer has already placed a bid
            if (!myBidLotIds.has(l.id)) {
              aggregated.push({ ...l, owner });
            }
          });
        } catch (e) {
          console.warn('Parse error', key, e);
        }
      });

      aggregated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setLots(aggregated);
    } catch (err) {
      Alert.alert('Error', 'Failed to load available lots');
    } finally {
      setLoadingLots(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'pre') {
      loadAllRegisteredLots();
    }
    if (selectedTab === 'placed') {
      loadMyPlacedBids();
    }
  }, [selectedTab]);

  const onSearchDaily = () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title'), t('fill_mandi_search'));
      return;
    }
    Alert.alert(t('search'), `Mandi: ${mandiName}\nCrop: ${cropName}`);
  };

  const getShortTermForecastInline = async () => {
    if (!stfMandi && !stfCrop) {
      Alert.alert(t('error_title'), 'Select mandi and crop');
      return;
    }
    setForecastLoading(true);
    const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — ${
      horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
    }`;
    setTimeout(() => {
      setForecastSummary(summary);
      setForecastLoading(false);
    }, 400);
  };

  const placeBid = async (lot: Lot) => {
    const value = (bidValues[lot.id] || '').trim();
    if (!value || isNaN(Number(value))) {
      Alert.alert('Error', 'Enter a valid bid amount');
      return;
    }

    setPlacingBid(s => ({ ...s, [lot.id]: true }));

    try {
      const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
      if (!bidder) {
        Alert.alert('Error', 'Please login to place bid');
        return;
      }

      const bidKey = `BIDS_LOT_${lot.id}`;
      const existing = await AsyncStorage.getItem(bidKey);
      let bids: Bid[] = existing ? JSON.parse(existing) : [];
      bids.unshift({
        lotId: lot.id,
        lotOwner: lot.owner || '',
        bidder,
        bidValue: value,
        createdAt: Date.now(),
        status: 'pending',
      });
      await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

      Alert.alert('Success', `Bid of ₹${value}/quintal placed!`);
      setBidValues(s => ({ ...s, [lot.id]: '' }));

      // 🔵 Immediately refresh both lists so the lot "moves" to My Bids
      await loadMyPlacedBids();
      await loadAllRegisteredLots();
    } catch (err) {
      Alert.alert('Error', 'Failed to place bid');
    } finally {
      setPlacingBid(s => ({ ...s, [lot.id]: false }));
    }
  };

  const renderLotItem = ({ item }: { item: Lot }) => (
    <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
      <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} ({item.grade})</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {item.quantity} quintal</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {item.mandi}</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {item.expectedArrival}</Text>
         {/* New line to show owner */}
      {item.owner && (
        <Text style={[styles.lotDetail, { color: theme.text }]}>
          Owner: {item.owner}
        </Text>
      )}

      <View style={styles.bidRow}>
        <TextInput
          placeholder="Your bid (₹/quintal)"
          placeholderTextColor="#999"
          value={bidValues[item.id] || ''}
          onChangeText={t => setBidValues(s => ({ ...s, [item.id]: t.replace(/[^0-9.]/g, '') }))}
          keyboardType="numeric"
          style={[styles.bidInput, { borderColor: theme.text, color: theme.text }]}
        />
        <TouchableOpacity
          onPress={() => placeBid(item)}
          disabled={placingBid[item.id]}
          style={[styles.bidBtn, { backgroundColor: theme.primary }]}
        >
          {placingBid[item.id] ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.bidBtnText}>Bid</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // 🔵 badge for bid status
  const renderStatusBadge = (status?: 'pending' | 'accepted' | 'rejected') => {
    const s = status || 'pending';
    let bg = '#eee';
    let color = '#333';
    if (s === 'pending') {
      bg = '#fff3cd';
      color = '#856404';
    } else if (s === 'accepted') {
      bg = '#d4edda';
      color = '#155724';
    } else if (s === 'rejected') {
      bg = '#f8d7da';
      color = '#721c24';
    }
    return (
      <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: bg }}>
        <Text style={{ color, fontSize: 12, fontWeight: '600' }}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </Text>
      </View>
    );
  };

  const renderPlacedBidItem = ({ item }: { item: BidWithLot }) => {
    const lot = item.lot;
    return (
      <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={[styles.lotTitle, { color: theme.text }]}>
            {lot ? `${lot.crop} (${lot.grade})` : `Lot ${item.lotId}`}
          </Text>
          {renderStatusBadge(item.status)}
        </View>
        {lot && (
          <>
            <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {lot.quantity} quintal</Text>
            <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {lot.mandi}</Text>
            <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {lot.expectedArrival}</Text>
          </>
        )}
        <Text style={[styles.lotDetail, { color: theme.text, marginTop: 4 }]}>
          Your Bid: ₹{item.bidValue}/quintal
        </Text>
        <Text style={[styles.lotDetail, { color: theme.text }]}>
          Placed on: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back') || 'Back'}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard') || 'Buyer Dashboard'}</Text>
        <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg') || 'Find and bid on crop lots'}</Text>

        <View style={styles.tabsRow}>
          {(['daily', 'short', 'pre', 'placed'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab
                  ? { backgroundColor: theme.primary ?? '#3182ce' }
                  : { backgroundColor: '#f0f0f0' },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                { color: selectedTab === tab ? '#fff' : theme.text },
                selectedTab === tab && styles.tabTextSelected,
              ]}>
                {tab === 'daily'
                  ? t('daily_market_price')
                  : tab === 'short'
                  ? t('short_term_forecast')
                  : tab === 'pre'
                  ? t('pre_bidding') || 'Pre Bidding'
                  : t('placed_bids') || 'My Bids'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DAILY TAB */}
        {selectedTab === 'daily' && (
          <View style={[styles.searchBox, { borderColor: theme.text }]}>
            <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
            <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
              <Picker selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'} onValueChange={v => v !== 'Other' && setMandiName(v)}>
                <Picker.Item label="Select Mandi" value="" />
                {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            {(!isPredefined(mandiName, mandiOptions) && mandiName) && (
              <TextInput placeholder="Type mandi" value={mandiName} onChangeText={setMandiName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
            )}

            <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
            <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
              <Picker selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'} onValueChange={v => v !== 'Other' && setCropName(v)}>
                <Picker.Item label="Select crop" value="" />
                {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            {(!isPredefined(cropName, cropOptions) && cropName) && (
              <TextInput placeholder="Type crop" value={cropName} onChangeText={setCropName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
            )}

            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={onSearchDaily}>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>

            <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: theme.text ?? '#666' }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* SHORT TERM TAB */}
        {selectedTab === 'short' && (
          <View>
            <View style={[styles.searchBox, { borderColor: theme.text }]}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'} onValueChange={v => v !== 'Other' && setStfMandi(v)}>
                  <Picker.Item label="Select mandi" value="" />
                  {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (
                <TextInput placeholder="Type mandi" value={stfMandi} onChangeText={setStfMandi} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'} onValueChange={v => v !== 'Other' && setStfCrop(v)}>
                  <Picker.Item label="Select crop" value="" />
                  {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {(!isPredefined(stfCrop, cropOptions) && stfCrop) && (
                <TextInput placeholder="Type crop" value={stfCrop} onChangeText={setStfCrop} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
              <View style={styles.horizonRow}>
                {(['7days', '14days', '30days'] as const).map(d => (
                  <TouchableOpacity key={d} style={[styles.horizonBtn, horizon === d && styles.horizonBtnActive]} onPress={() => setHorizon(d)}>
                    <Text style={horizon === d ? styles.horizonTextActive : styles.horizonText}>
                      {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={getShortTermForecastInline}>
                <Text style={styles.searchBtnText}>Get Forecast</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.chartBox, { borderColor: theme.text }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>Forecast Result</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: '#666' }}>
                  {forecastLoading ? 'Loading...' : forecastSummary || 'Select mandi & crop above'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* PRE BIDDING TAB */}
        {selectedTab === 'pre' && (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Lots for Pre-Bidding</Text>

            {loadingLots ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={{ marginTop: 10, color: theme.text }}>Loading lots...</Text>
              </View>
            ) : lots.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={{ color: theme.text }}>No pre-registered lots available</Text>
              </View>
            ) : (
              <FlatList
                data={lots}
                keyExtractor={item => item.id}
                renderItem={renderLotItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            )}
          </View>
        )}

        {/* PLACED BIDS TAB */}
        {selectedTab === 'placed' && (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('placed_bids') || 'My Placed Bids'}
            </Text>

            {loadingMyBids ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={{ marginTop: 10, color: theme.text }}>Loading your bids...</Text>
              </View>
            ) : myBids.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={{ color: theme.text }}>You haven't placed any bids yet</Text>
              </View>
            ) : (
              <FlatList
                data={myBids}
                keyExtractor={item => `${item.lotId}_${item.createdAt}`}
                renderItem={renderPlacedBidItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 16, marginBottom: 16 },
  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  tab: { flex: 0.24, padding: 12, borderRadius: 10, alignItems: 'center' },
  tabText: { fontWeight: '600' },
  tabTextSelected: { fontWeight: 'bold' },

  searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  chartBox: { borderWidth: 1, borderRadius: 12, padding: 16 },
  chartTitle: { fontWeight: '700', marginBottom: 12 },
  chartPlaceholder: { height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },

  horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { fontWeight: 'bold', color: '#333' },
  horizonTextActive: { color: '#fff', fontWeight: 'bold' },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12, color: '#333' },
  center: { alignItems: 'center', padding: 40 },
  emptyBox: { padding: 30, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: '#ddd' },

  lotCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
  lotTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
  lotDetail: { fontSize: 14, marginBottom: 4 },
  bidRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  bidInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 12, marginRight: 10 },
  bidBtn: { backgroundColor: '#2b6cb0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  bidBtnText: { color: '#fff', fontWeight: 'bold' },
});

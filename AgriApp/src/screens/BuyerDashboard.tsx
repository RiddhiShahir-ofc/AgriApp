// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   View,
// // //   TextInput,
// // //   ScrollView,
// // //   Alert,
// // //   Platform,
// // //   ActivityIndicator,
// // //   FlatList,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// // // import { Picker } from '@react-native-picker/picker';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // type Lot = {
// // //   id: string;
// // //   crop: string;
// // //   grade: string;
// // //   quantity: string;
// // //   mandi: string;
// // //   expectedArrival: string;
// // //   createdAt: number;
// // //   owner?: string;
// // // };

// // // // 🔵 NEW: Bid type with status
// // // type Bid = {
// // //   lotId: string;
// // //   lotOwner: string;
// // //   bidder: string;
// // //   bidValue: string;
// // //   createdAt: number;
// // //   status?: 'pending' | 'accepted' | 'rejected';
// // // };

// // // // 🔵 NEW: Bid joined with lot
// // // type BidWithLot = Bid & {
// // //   lot?: Lot;
// // // };

// // // export default function BuyerDashboard() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const goBack = () => navigation.navigate('Dashboard');

// // //   // 🔵 CHANGED: added 'placed' tab
// // //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre' | 'placed'>('daily');

// // //   // Daily
// // //   const [mandiName, setMandiName] = useState('');
// // //   const [cropName, setCropName] = useState('');

// // //   // Short-term forecast
// // //   const [stfMandi, setStfMandi] = useState('');
// // //   const [stfCrop, setStfCrop] = useState('');
// // //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// // //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// // //   const [forecastLoading, setForecastLoading] = useState(false);

// // //   // Pre Bidding
// // //   const [lots, setLots] = useState<Lot[]>([]);
// // //   const [loadingLots, setLoadingLots] = useState(true);
// // //   const [bidValues, setBidValues] = useState<Record<string, string>>({});
// // //   const [placingBid, setPlacingBid] = useState<Record<string, boolean>>({});

// // //   // 🔵 NEW: My placed bids
// // //   const [myBids, setMyBids] = useState<BidWithLot[]>([]);
// // //   const [loadingMyBids, setLoadingMyBids] = useState(false);

// // //   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
// // //   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

// // //   const isPredefined = (value: string, options: string[]) =>
// // //     value === '' || options.includes(value) || value === 'Other';

// // //   // Load all registered lots (same logic as BuyerPreBidding)
// // //   const loadAllRegisteredLots = async () => {
// // //     setLoadingLots(true);
// // //     try {
// // //       const keys = await AsyncStorage.getAllKeys();
// // //       const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
// // //       if (lotKeys.length === 0) {
// // //         setLots([]);
// // //         setLoadingLots(false);
// // //         return;
// // //       }
// // //       const pairs = await AsyncStorage.multiGet(lotKeys);
// // //       const aggregated: Lot[] = [];
// // //       pairs.forEach(([key, json]) => {
// // //         if (!json) return;
// // //         try {
// // //           const parsed: Lot[] = JSON.parse(json);
// // //           const owner = key.replace('REGISTERED_LOTS_', '');
// // //           parsed.forEach(l => aggregated.push({ ...l, owner }));
// // //         } catch (e) {
// // //           console.warn('Parse error', key, e);
// // //         }
// // //       });
// // //       aggregated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
// // //       setLots(aggregated);
// // //     } catch (err) {
// // //       Alert.alert('Error', 'Failed to load available lots');
// // //     } finally {
// // //       setLoadingLots(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (selectedTab === 'pre') {
// // //       loadAllRegisteredLots();
// // //     }
// // //     // 🔵 NEW: load my bids when "placed" tab is opened
// // //     if (selectedTab === 'placed') {
// // //       loadMyPlacedBids();
// // //     }
// // //   }, [selectedTab]);

// // //   const onSearchDaily = () => {
// // //     if (!mandiName && !cropName) {
// // //       Alert.alert(t('error_title'), t('fill_mandi_search'));
// // //       return;
// // //     }
// // //     Alert.alert(t('search'), `Mandi: ${mandiName}\nCrop: ${cropName}`);
// // //   };

// // //   const getShortTermForecastInline = async () => {
// // //     if (!stfMandi && !stfCrop) {
// // //       Alert.alert(t('error_title'), 'Select mandi and crop');
// // //       return;
// // //     }
// // //     setForecastLoading(true);
// // //     const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — ${
// // //       horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
// // //     }`;
// // //     setTimeout(() => {
// // //       setForecastSummary(summary);
// // //       setForecastLoading(false);
// // //     }, 400);
// // //   };

// // //   const placeBid = async (lot: Lot) => {
// // //     const value = (bidValues[lot.id] || '').trim();
// // //     if (!value || isNaN(Number(value))) {
// // //       Alert.alert('Error', 'Enter a valid bid amount');
// // //       return;
// // //     }

// // //     setPlacingBid(s => ({ ...s, [lot.id]: true }));

// // //     try {
// // //       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
// // //       if (!bidder) {
// // //         Alert.alert('Error', 'Please login to place bid');
// // //         return;
// // //       }

// // //       const bidKey = `BIDS_LOT_${lot.id}`;
// // //       const existing = await AsyncStorage.getItem(bidKey);
// // //       let bids: Bid[] = existing ? JSON.parse(existing) : [];
// // //       bids.unshift({
// // //         lotId: lot.id,
// // //         lotOwner: lot.owner || '',
// // //         bidder,
// // //         bidValue: value,
// // //         createdAt: Date.now(),
// // //         status: 'pending', // 🔵 NEW
// // //       });
// // //       await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

// // //       Alert.alert('Success', `Bid of ₹${value}/quintal placed!`);
// // //       setBidValues(s => ({ ...s, [lot.id]: '' }));
// // //     } catch (err) {
// // //       Alert.alert('Error', 'Failed to place bid');
// // //     } finally {
// // //       setPlacingBid(s => ({ ...s, [lot.id]: false }));
// // //     }
// // //   };

// // //   const renderLotItem = ({ item }: { item: Lot }) => (
// // //     <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
// // //       <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} ({item.grade})</Text>
// // //       <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {item.quantity} quintal</Text>
// // //       <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {item.mandi}</Text>
// // //       <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {item.expectedArrival}</Text>

// // //       <View style={styles.bidRow}>
// // //         <TextInput
// // //           placeholder="Your bid (₹/quintal)"
// // //           placeholderTextColor="#999"
// // //           value={bidValues[item.id] || ''}
// // //           onChangeText={t => setBidValues(s => ({ ...s, [item.id]: t.replace(/[^0-9.]/g, '') }))}
// // //           keyboardType="numeric"
// // //           style={[styles.bidInput, { borderColor: theme.text, color: theme.text }]}
// // //         />
// // //         <TouchableOpacity
// // //           onPress={() => placeBid(item)}
// // //           disabled={placingBid[item.id]}
// // //           style={[styles.bidBtn, { backgroundColor: theme.primary }]}
// // //         >
// // //           {placingBid[item.id] ? (
// // //             <ActivityIndicator color="#fff" size="small" />
// // //           ) : (
// // //             <Text style={styles.bidBtnText}>Bid</Text>
// // //           )}
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //   );

// // //   // 🔵 NEW: helper to load placed bids of current user + join with lots
// // //   const loadMyPlacedBids = async () => {
// // //     setLoadingMyBids(true);
// // //     try {
// // //       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
// // //       if (!bidder) {
// // //         setMyBids([]);
// // //         setLoadingMyBids(false);
// // //         return;
// // //       }

// // //       const keys = await AsyncStorage.getAllKeys();
// // //       const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
// // //       const bidKeys = keys.filter(k => k.startsWith('BIDS_LOT_'));

// // //       // Build map of lotId -> lot
// // //       const lotPairs = await AsyncStorage.multiGet(lotKeys);
// // //       const lotMap = new Map<string, Lot>();
// // //       lotPairs.forEach(([key, json]) => {
// // //         if (!json) return;
// // //         try {
// // //           const parsed: Lot[] = JSON.parse(json);
// // //           const owner = key.replace('REGISTERED_LOTS_', '');
// // //           parsed.forEach(l => {
// // //             lotMap.set(l.id, { ...l, owner });
// // //           });
// // //         } catch (e) {
// // //           console.warn('Parse error (lots)', key, e);
// // //         }
// // //       });

// // //       const bidPairs = await AsyncStorage.multiGet(bidKeys);
// // //       const result: BidWithLot[] = [];
// // //       bidPairs.forEach(([key, json]) => {
// // //         if (!json) return;
// // //         try {
// // //           const bids: Bid[] = JSON.parse(json);
// // //           bids.forEach(b => {
// // //             if (b.bidder === bidder) {
// // //               result.push({
// // //                 ...b,
// // //                 lot: lotMap.get(b.lotId),
// // //               });
// // //             }
// // //           });
// // //         } catch (e) {
// // //           console.warn('Parse error (bids)', key, e);
// // //         }
// // //       });

// // //       // sort by createdAt desc
// // //       result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

// // //       setMyBids(result);
// // //     } catch (err) {
// // //       console.warn(err);
// // //       Alert.alert('Error', 'Failed to load your bids');
// // //     } finally {
// // //       setLoadingMyBids(false);
// // //     }
// // //   };

// // //   // 🔵 NEW: badge for bid status
// // //   const renderStatusBadge = (status?: 'pending' | 'accepted' | 'rejected') => {
// // //     const s = status || 'pending';
// // //     let bg = '#eee';
// // //     let color = '#333';
// // //     if (s === 'pending') {
// // //       bg = '#fff3cd';
// // //       color = '#856404';
// // //     } else if (s === 'accepted') {
// // //       bg = '#d4edda';
// // //       color = '#155724';
// // //     } else if (s === 'rejected') {
// // //       bg = '#f8d7da';
// // //       color = '#721c24';
// // //     }
// // //     return (
// // //       <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: bg }}>
// // //         <Text style={{ color, fontSize: 12, fontWeight: '600' }}>
// // //           {s.charAt(0).toUpperCase() + s.slice(1)}
// // //         </Text>
// // //       </View>
// // //     );
// // //   };

// // //   const renderPlacedBidItem = ({ item }: { item: BidWithLot }) => {
// // //     const lot = item.lot;
// // //     return (
// // //       <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
// // //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
// // //           <Text style={[styles.lotTitle, { color: theme.text }]}>
// // //             {lot ? `${lot.crop} (${lot.grade})` : `Lot ${item.lotId}`}
// // //           </Text>
// // //           {renderStatusBadge(item.status)}
// // //         </View>
// // //         {lot && (
// // //           <>
// // //             <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {lot.quantity} quintal</Text>
// // //             <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {lot.mandi}</Text>
// // //             <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {lot.expectedArrival}</Text>
// // //           </>
// // //         )}
// // //         <Text style={[styles.lotDetail, { color: theme.text, marginTop: 4 }]}>
// // //           Your Bid: ₹{item.bidValue}/quintal
// // //         </Text>
// // //         <Text style={[styles.lotDetail, { color: theme.text }]}>
// // //           Placed on: {new Date(item.createdAt).toLocaleDateString()}
// // //         </Text>
// // //       </View>
// // //     );
// // //   };

// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
// // //         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// // //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back') || 'Back'}</Text>
// // //         </TouchableOpacity>

// // //         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard') || 'Buyer Dashboard'}</Text>
// // //         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg') || 'Find and bid on crop lots'}</Text>

// // //         <View style={styles.tabsRow}>
// // //           {(['daily', 'short', 'pre', 'placed'] as const).map(tab => (
// // //             <TouchableOpacity
// // //               key={tab}
// // //               style={[
// // //                 styles.tab,
// // //                 selectedTab === tab
// // //                   ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                   : { backgroundColor: '#f0f0f0' },
// // //               ]}
// // //               onPress={() => setSelectedTab(tab)}
// // //             >
// // //               <Text style={[
// // //                 styles.tabText,
// // //                 { color: selectedTab === tab ? '#fff' : theme.text },
// // //                 selectedTab === tab && styles.tabTextSelected,
// // //               ]}>
// // //                 {tab === 'daily'
// // //                   ? t('daily_market_price')
// // //                   : tab === 'short'
// // //                   ? t('short_term_forecast')
// // //                   : tab === 'pre'
// // //                   ? t('pre_bidding') || 'Pre Bidding'
// // //                   : t('placed_bids') || 'My Bids'}
// // //               </Text>
// // //             </TouchableOpacity>
// // //           ))}
// // //         </View>

// // //         {/* DAILY TAB */}
// // //         {selectedTab === 'daily' && (
// // //           <View style={[styles.searchBox, { borderColor: theme.text }]}>
// // //             <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// // //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //               <Picker selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'} onValueChange={v => v !== 'Other' && setMandiName(v)}>
// // //                 <Picker.Item label="Select Mandi" value="" />
// // //                 {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// // //                 <Picker.Item label="Other" value="Other" />
// // //               </Picker>
// // //             </View>
// // //             {(!isPredefined(mandiName, mandiOptions) && mandiName) && (
// // //               <TextInput placeholder="Type mandi" value={mandiName} onChangeText={setMandiName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// // //             )}

// // //             <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// // //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //               <Picker selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'} onValueChange={v => v !== 'Other' && setCropName(v)}>
// // //                 <Picker.Item label="Select crop" value="" />
// // //                 {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// // //                 <Picker.Item label="Other" value="Other" />
// // //               </Picker>
// // //             </View>
// // //             {(!isPredefined(cropName, cropOptions) && cropName) && (
// // //               <TextInput placeholder="Type crop" value={cropName} onChangeText={setCropName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// // //             )}

// // //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={onSearchDaily}>
// // //               <Text style={styles.searchBtnText}>Search</Text>
// // //             </TouchableOpacity>

// // //             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
// // //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// // //               <View style={styles.chartPlaceholder}>
// // //                 <Text style={{ color: theme.text ?? '#666' }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //         )}

// // //         {/* SHORT TERM TAB */}
// // //         {selectedTab === 'short' && (
// // //           <View>
// // //             <View style={[styles.searchBox, { borderColor: theme.text }]}>
// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// // //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //                 <Picker selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'} onValueChange={v => v !== 'Other' && setStfMandi(v)}>
// // //                   <Picker.Item label="Select mandi" value="" />
// // //                   {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// // //                   <Picker.Item label="Other" value="Other" />
// // //                 </Picker>
// // //               </View>
// // //               {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (
// // //                 <TextInput placeholder="Type mandi" value={stfMandi} onChangeText={setStfMandi} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// // //               )}

// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// // //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //                 <Picker selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'} onValueChange={v => v !== 'Other' && setStfCrop(v)}>
// // //                   <Picker.Item label="Select crop" value="" />
// // //                   {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// // //                   <Picker.Item label="Other" value="Other" />
// // //                 </Picker>
// // //               </View>
// // //               {(!isPredefined(stfCrop, cropOptions) && stfCrop) && (
// // //                 <TextInput placeholder="Type crop" value={stfCrop} onChangeText={setStfCrop} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// // //               )}

// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
// // //               <View style={styles.horizonRow}>
// // //                 {(['7days', '14days', '30days'] as const).map(d => (
// // //                   <TouchableOpacity key={d} style={[styles.horizonBtn, horizon === d && styles.horizonBtnActive]} onPress={() => setHorizon(d)}>
// // //                     <Text style={horizon === d ? styles.horizonTextActive : styles.horizonText}>
// // //                       {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
// // //                     </Text>
// // //                   </TouchableOpacity>
// // //                 ))}
// // //               </View>

// // //               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={getShortTermForecastInline}>
// // //                 <Text style={styles.searchBtnText}>Get Forecast</Text>
// // //               </TouchableOpacity>
// // //             </View>

// // //             <View style={[styles.chartBox, { borderColor: theme.text }]}>
// // //               <Text style={[styles.chartTitle, { color: theme.text }]}>Forecast Result</Text>
// // //               <View style={styles.chartPlaceholder}>
// // //                 <Text style={{ color: '#666' }}>
// // //                   {forecastLoading ? 'Loading...' : forecastSummary || 'Select mandi & crop above'}
// // //                 </Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //         )}

// // //         {/* PRE BIDDING TAB */}
// // //         {selectedTab === 'pre' && (
// // //           <View>
// // //             <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Lots for Pre-Bidding</Text>

// // //             {loadingLots ? (
// // //               <View style={styles.center}>
// // //                 <ActivityIndicator size="large" color={theme.primary} />
// // //                 <Text style={{ marginTop: 10, color: theme.text }}>Loading lots...</Text>
// // //               </View>
// // //             ) : lots.length === 0 ? (
// // //               <View style={styles.emptyBox}>
// // //                 <Text style={{ color: theme.text }}>No pre-registered lots available</Text>
// // //               </View>
// // //             ) : (
// // //               <FlatList
// // //                 data={lots}
// // //                 keyExtractor={item => item.id}
// // //                 renderItem={renderLotItem}
// // //                 showsVerticalScrollIndicator={false}
// // //                 contentContainerStyle={{ paddingBottom: 20 }}
// // //               />
// // //             )}
// // //           </View>
// // //         )}

// // //         {/* 🔵 NEW: PLACED BIDS TAB */}
// // //         {selectedTab === 'placed' && (
// // //           <View>
// // //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// // //               {t('placed_bids') || 'My Placed Bids'}
// // //             </Text>

// // //             {loadingMyBids ? (
// // //               <View style={styles.center}>
// // //                 <ActivityIndicator size="large" color={theme.primary} />
// // //                 <Text style={{ marginTop: 10, color: theme.text }}>Loading your bids...</Text>
// // //               </View>
// // //             ) : myBids.length === 0 ? (
// // //               <View style={styles.emptyBox}>
// // //                 <Text style={{ color: theme.text }}>You haven't placed any bids yet</Text>
// // //               </View>
// // //             ) : (
// // //               <FlatList
// // //                 data={myBids}
// // //                 keyExtractor={item => `${item.lotId}_${item.createdAt}`}
// // //                 renderItem={renderPlacedBidItem}
// // //                 showsVerticalScrollIndicator={false}
// // //                 contentContainerStyle={{ paddingBottom: 20 }}
// // //               />
// // //             )}
// // //           </View>
// // //         )}
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
// // //   backText: { fontWeight: '700', fontSize: 16 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 8 },
// // //   text: { fontSize: 16, marginBottom: 16 },
// // //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
// // //   tab: { flex: 0.24, padding: 12, borderRadius: 10, alignItems: 'center' },
// // //   tabText: { fontWeight: '600' },
// // //   tabTextSelected: { fontWeight: 'bold' },

// // //   searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
// // //   searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
// // //   pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
// // //   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// // //   searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
// // //   searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

// // //   chartBox: { borderWidth: 1, borderRadius: 12, padding: 16 },
// // //   chartTitle: { fontWeight: '700', marginBottom: 12 },
// // //   chartPlaceholder: { height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },

// // //   horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
// // //   horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
// // //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// // //   horizonText: { fontWeight: 'bold', color: '#333' },
// // //   horizonTextActive: { color: '#fff', fontWeight: 'bold' },

// // //   sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12, color: '#333' },
// // //   center: { alignItems: 'center', padding: 40 },
// // //   emptyBox: { padding: 30, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: '#ddd' },

// // //   lotCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
// // //   lotTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
// // //   lotDetail: { fontSize: 14, marginBottom: 4 },
// // //   bidRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
// // //   bidInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 12, marginRight: 10 },
// // //   bidBtn: { backgroundColor: '#2b6cb0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
// // //   bidBtnText: { color: '#fff', fontWeight: 'bold' },
// // // });

// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   View,
// //   TextInput,
// //   ScrollView,
// //   Alert,
// //   Platform,
// //   ActivityIndicator,
// //   FlatList,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// // import { Picker } from '@react-native-picker/picker';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // type Lot = {
// //   id: string;
// //   crop: string;
// //   grade: string;
// //   quantity: string;
// //   sellingamount:string;
// //   mandi: string;
// //   expectedArrival: string;
// //   createdAt: number;
// //   owner?: string;
// // };

// // //  Bid type with status
// // type Bid = {
// //   lotId: string;
// //   lotOwner: string;
// //   bidder: string;
// //   bidValue: string;
// //   createdAt: number;
// //   status?: 'pending' | 'accepted' | 'rejected';
// // };

// // //  Bid joined with lot
// // type BidWithLot = Bid & {
// //   lot?: Lot;
// // };

// // export default function BuyerDashboard() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const goBack = () => navigation.navigate('Dashboard');

// //   //  added 'placed' tab
// //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre' | 'placed'>('daily');

// //   // Daily
// //   const [mandiName, setMandiName] = useState('');
// //   const [cropName, setCropName] = useState('');

// //   // Short-term forecast
// //   const [stfMandi, setStfMandi] = useState('');
// //   const [stfCrop, setStfCrop] = useState('');
// //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// //   const [forecastLoading, setForecastLoading] = useState(false);

// //   // Pre Bidding
// //   const [lots, setLots] = useState<Lot[]>([]);
// //   const [loadingLots, setLoadingLots] = useState(true);
// //   const [bidValues, setBidValues] = useState<Record<string, string>>({});
// //   const [placingBid, setPlacingBid] = useState<Record<string, boolean>>({});

// //   //  My placed bids
// //   const [myBids, setMyBids] = useState<BidWithLot[]>([]);
// //   const [loadingMyBids, setLoadingMyBids] = useState(false);

// //   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
// //   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

// //   const isPredefined = (value: string, options: string[]) =>
// //     value === '' || options.includes(value) || value === 'Other';

// //   //  helper to load placed bids of current user + join with lots
// //   const loadMyPlacedBids = async () => {
// //     setLoadingMyBids(true);
// //     try {
// //       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
// //       if (!bidder) {
// //         setMyBids([]);
// //         setLoadingMyBids(false);
// //         return;
// //       }

// //       const keys = await AsyncStorage.getAllKeys();
// //       const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
// //       const bidKeys = keys.filter(k => k.startsWith('BIDS_LOT_'));

// //       // Build map of lotId -> lot
// //       const lotPairs = await AsyncStorage.multiGet(lotKeys);
// //       const lotMap = new Map<string, Lot>();
// //       lotPairs.forEach(([key, json]) => {
// //         if (!json) return;
// //         try {
// //           const parsed: Lot[] = JSON.parse(json);
// //           const owner = key.replace('REGISTERED_LOTS_', '');
// //           parsed.forEach(l => {
// //             lotMap.set(l.id, { ...l, owner });
// //           });
// //         } catch (e) {
// //           console.warn('Parse error (lots)', key, e);
// //         }
// //       });

// //       const bidPairs = await AsyncStorage.multiGet(bidKeys);
// //       const result: BidWithLot[] = [];
// //       bidPairs.forEach(([key, json]) => {
// //         if (!json) return;
// //         try {
// //           const bids: Bid[] = JSON.parse(json);
// //           bids.forEach(b => {
// //             if (b.bidder === bidder) {
// //               result.push({
// //                 ...b,
// //                 lot: lotMap.get(b.lotId),
// //               });
// //             }
// //           });
// //         } catch (e) {
// //           console.warn('Parse error (bids)', key, e);
// //         }
// //       });

// //       // sort by createdAt desc
// //       result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

// //       setMyBids(result);
// //     } catch (err) {
// //       console.warn(err);
// //       Alert.alert('Error', 'Failed to load your bids');
// //     } finally {
// //       setLoadingMyBids(false);
// //     }
// //   };

// //   //  Load lots but EXCLUDE lots where current buyer has already placed a bid
// //   const loadAllRegisteredLots = async () => {
// //     setLoadingLots(true);
// //     try {
// //       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
// //       const keys = await AsyncStorage.getAllKeys();

// //       const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
// //       const bidKeys = bidder ? keys.filter(k => k.startsWith('BIDS_LOT_')) : [];

// //       // Build set of lotIds on which THIS bidder has already placed a bid
// //       const myBidLotIds = new Set<string>();
// //       if (bidder && bidKeys.length > 0) {
// //         const bidPairs = await AsyncStorage.multiGet(bidKeys);
// //         bidPairs.forEach(([key, json]) => {
// //           if (!json) return;
// //           try {
// //             const bids: Bid[] = JSON.parse(json);
// //             bids.forEach(b => {
// //               if (b.bidder === bidder) {
// //                 myBidLotIds.add(b.lotId);
// //               }
// //             });
// //           } catch (e) {
// //             console.warn('Parse error (bids for lots filter)', key, e);
// //           }
// //         });
// //       }

// //       const lotPairs = await AsyncStorage.multiGet(lotKeys);
// //       const aggregated: Lot[] = [];
// //       lotPairs.forEach(([key, json]) => {
// //         if (!json) return;
// //         try {
// //           const parsed: Lot[] = JSON.parse(json);
// //           const owner = key.replace('REGISTERED_LOTS_', '');
// //           parsed.forEach(l => {
// //             //  Skip lots where this buyer has already placed a bid
// //             if (!myBidLotIds.has(l.id)) {
// //               aggregated.push({ ...l, owner });
// //             }
// //           });
// //         } catch (e) {
// //           console.warn('Parse error', key, e);
// //         }
// //       });

// //       aggregated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
// //       setLots(aggregated);
// //     } catch (err) {
// //       Alert.alert(t('error_title'), 'Failed to load available lots');
// //     } finally {
// //       setLoadingLots(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (selectedTab === 'pre') {
// //       loadAllRegisteredLots();
// //     }
// //     if (selectedTab === 'placed') {
// //       loadMyPlacedBids();
// //     }
// //   }, [selectedTab]);

// //   const onSearchDaily = () => {
// //     if (!mandiName && !cropName) {
// //       Alert.alert(t('error_title'), t('fill_mandi_search'));
// //       return;
// //     }
// //     Alert.alert(t('search'), `Mandi: ${mandiName}\nCrop: ${cropName}`);
// //   };

// //   const getShortTermForecastInline = async () => {
// //     if (!stfMandi && !stfCrop) {
// //       Alert.alert(t('error_title'), 'Select mandi and crop');
// //       return;
// //     }
// //     setForecastLoading(true);
// //     const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — ${
// //       horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
// //     }`;
// //     setTimeout(() => {
// //       setForecastSummary(summary);
// //       setForecastLoading(false);
// //     }, 400);
// //   };

// //   const placeBid = async (lot: Lot) => {
// //     const value = (bidValues[lot.id] || '').trim();
// //     if (!value || isNaN(Number(value))) {
// //       Alert.alert('Error', 'Enter a valid bid amount');
// //       return;
// //     }

// //     setPlacingBid(s => ({ ...s, [lot.id]: true }));

// //     try {
// //       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
// //       if (!bidder) {
// //         Alert.alert(t('error_title'), 'Please login to place bid');
// //         return;
// //       }

// //       const bidKey = `BIDS_LOT_${lot.id}`;
// //       const existing = await AsyncStorage.getItem(bidKey);
// //       let bids: Bid[] = existing ? JSON.parse(existing) : [];
// //       bids.unshift({
// //         lotId: lot.id,
// //         lotOwner: lot.owner || '',
// //         bidder,
// //         bidValue: value,
// //         createdAt: Date.now(),
// //         status: 'pending',
// //       });
// //       await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

// //       Alert.alert(t('success_title'), `Bid of ₹${value}/quintal placed!`);
// //       setBidValues(s => ({ ...s, [lot.id]: '' }));

// //       //  Immediately refresh both lists so the lot "moves" to My Bids
// //       await loadMyPlacedBids();
// //       await loadAllRegisteredLots();
// //     } catch (err) {
// //       Alert.alert(t('error_title'), t('failed'));
// //     } finally {
// //       setPlacingBid(s => ({ ...s, [lot.id]: false }));
// //     }
// //   };

// //   const renderLotItem = ({ item }: { item: Lot }) => (
// //     <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
// //       <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} ({item.grade})</Text>
// //       <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {item.quantity} quintal</Text>
// //       <Text style={[styles.lotDetail, { color: theme.text }]}>{t('expected_amount')}: {item.sellingamount}</Text>
// //       <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {item.mandi}</Text>
// //       <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {item.expectedArrival}</Text>
// //         {/* New line to show owner */}
// //       {item.owner && (
// //         <Text style={[styles.lotDetail, { color: theme.text }]}>
// //           Owner: {item.owner}
// //         </Text>
// //       )}

// //       <View style={styles.bidRow}>
// //         <TextInput
// //           placeholder="Your bid (₹/quintal)"
// //           placeholderTextColor="#999"
// //           value={bidValues[item.id] || ''}
// //           onChangeText={t => setBidValues(s => ({ ...s, [item.id]: t.replace(/[^0-9.]/g, '') }))}
// //           keyboardType="numeric"
// //           style={[styles.bidInput, { borderColor: theme.text, color: theme.text }]}
// //         />
// //         <TouchableOpacity
// //           onPress={() => placeBid(item)}
// //           disabled={placingBid[item.id]}
// //           style={[styles.bidBtn, { backgroundColor: theme.primary }]}
// //         >
// //           {placingBid[item.id] ? (
// //             <ActivityIndicator color="#fff" size="small" />
// //           ) : (
// //             <Text style={styles.bidBtnText}>Bid</Text>
// //           )}
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   //  badge for bid status
// //   const renderStatusBadge = (status?: 'pending' | 'accepted' | 'rejected') => {
// //     const s = status || 'pending';
// //     let bg = '#eee';
// //     let color = '#333';
// //     if (s === 'pending') {
// //       bg = '#fff3cd';
// //       color = '#856404';
// //     } else if (s === 'accepted') {
// //       bg = '#d4edda';
// //       color = '#155724';
// //     } else if (s === 'rejected') {
// //       bg = '#f8d7da';
// //       color = '#721c24';
// //     }
// //     return (
// //       <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: bg }}>
// //         <Text style={{ color, fontSize: 12, fontWeight: '600' }}>
// //           {s.charAt(0).toUpperCase() + s.slice(1)}
// //         </Text>
// //       </View>
// //     );
// //   };

// //   const renderPlacedBidItem = ({ item }: { item: BidWithLot }) => {
// //     const lot = item.lot;
// //     return (
// //       <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
// //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
// //           <Text style={[styles.lotTitle, { color: theme.text }]}>
// //             {lot ? `${lot.crop} (${lot.grade})` : `Lot ${item.lotId}`}
// //           </Text>
// //           {renderStatusBadge(item.status)}
// //         </View>
// //         {lot && (
// //           <>
// //             <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {lot.quantity} quintal</Text>
// //             <Text style={[styles.lotDetail, { color: theme.text }]}>Expected amount: {lot.sellingamount}</Text>
// //             <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {lot.mandi}</Text>
// //             <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {lot.expectedArrival}</Text>
// //           </>
// //         )}
// //         <Text style={[styles.lotDetail, { color: theme.text, marginTop: 4 }]}>
// //           Your Bid: ₹{item.bidValue}/quintal
// //         </Text>
// //         <Text style={[styles.lotDetail, { color: theme.text }]}>
// //           Placed on: {new Date(item.createdAt).toLocaleDateString()}
// //         </Text>
// //       </View>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
// //         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back') || 'Back'}</Text>
// //         </TouchableOpacity>

// //         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard') || 'Buyer Dashboard'}</Text>
// //         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg') || 'Find and bid on crop lots'}</Text>

// //         <View style={styles.tabsRow}>
// //           {(['daily', 'short', 'pre', 'placed'] as const).map(tab => (
// //             <TouchableOpacity
// //               key={tab}
// //               style={[
// //                 styles.tab,
// //                 selectedTab === tab
// //                   ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                   : { backgroundColor: '#f0f0f0' },
// //               ]}
// //               onPress={() => setSelectedTab(tab)}
// //             >
// //               <Text style={[
// //                 styles.tabText,
// //                 { color: selectedTab === tab ? '#fff' : theme.text },
// //                 selectedTab === tab && styles.tabTextSelected,
// //               ]}>
// //                 {tab === 'daily'
// //                   ? t('daily_market_price')
// //                   : tab === 'short'
// //                   ? t('short_term_forecast')
// //                   : tab === 'pre'
// //                   ? t('pre_bidding') || 'Pre Bidding'
// //                   : t('placed_bids') || 'My Bids'}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {/* DAILY TAB */}
// //         {selectedTab === 'daily' && (
// //           <View style={[styles.searchBox, { borderColor: theme.text }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'} onValueChange={v => v !== 'Other' && setMandiName(v)}>
// //                 <Picker.Item label="Select Mandi" value="" />
// //                 {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(mandiName, mandiOptions) && mandiName) && (
// //               <TextInput placeholder="Type mandi" value={mandiName} onChangeText={setMandiName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// //             )}

// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'} onValueChange={v => v !== 'Other' && setCropName(v)}>
// //                 <Picker.Item label="Select crop" value="" />
// //                 {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(cropName, cropOptions) && cropName) && (
// //               <TextInput placeholder="Type crop" value={cropName} onChangeText={setCropName} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// //             )}

// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={onSearchDaily}>
// //               <Text style={styles.searchBtnText}>Search</Text>
// //             </TouchableOpacity>

// //             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: theme.text ?? '#666' }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// //               </View>
// //             </View>
// //           </View>
// //         )}

// //         {/* SHORT TERM TAB */}
// //         {selectedTab === 'short' && (
// //           <View>
// //             <View style={[styles.searchBox, { borderColor: theme.text }]}>
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'} onValueChange={v => v !== 'Other' && setStfMandi(v)}>
// //                   <Picker.Item label="Select mandi" value="" />
// //                   {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (
// //                 <TextInput placeholder="Type mandi" value={stfMandi} onChangeText={setStfMandi} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'} onValueChange={v => v !== 'Other' && setStfCrop(v)}>
// //                   <Picker.Item label="Select crop" value="" />
// //                   {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {(!isPredefined(stfCrop, cropOptions) && stfCrop) && (
// //                 <TextInput placeholder="Type crop" value={stfCrop} onChangeText={setStfCrop} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
// //               <View style={styles.horizonRow}>
// //                 {(['7days', '14days', '30days'] as const).map(d => (
// //                   <TouchableOpacity key={d} style={[styles.horizonBtn, horizon === d && styles.horizonBtnActive]} onPress={() => setHorizon(d)}>
// //                     <Text style={horizon === d ? styles.horizonTextActive : styles.horizonText}>
// //                       {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
// //                     </Text>
// //                   </TouchableOpacity>
// //                 ))}
// //               </View>

// //               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={getShortTermForecastInline}>
// //                 <Text style={styles.searchBtnText}>Get Forecast</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={[styles.chartBox, { borderColor: theme.text }]}>
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>Forecast Result</Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: '#666' }}>
// //                   {forecastLoading ? 'Loading...' : forecastSummary || 'Select mandi & crop above'}
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>
// //         )}

// //         {/* PRE BIDDING TAB */}
// //         {selectedTab === 'pre' && (
// //           <View>
// //             <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Lots for Pre-Bidding</Text>

// //             {loadingLots ? (
// //               <View style={styles.center}>
// //                 <ActivityIndicator size="large" color={theme.primary} />
// //                 <Text style={{ marginTop: 10, color: theme.text }}>Loading lots...</Text>
// //               </View>
// //             ) : lots.length === 0 ? (
// //               <View style={styles.emptyBox}>
// //                 <Text style={{ color: theme.text }}>No pre-registered lots available</Text>
// //               </View>
// //             ) : (
// //               <FlatList
// //                 data={lots}
// //                 keyExtractor={item => item.id}
// //                 renderItem={renderLotItem}
// //                 showsVerticalScrollIndicator={false}
// //                 contentContainerStyle={{ paddingBottom: 20 }}
// //               />
// //             )}
// //           </View>
// //         )}

// //         {/* PLACED BIDS TAB */}
// //         {selectedTab === 'placed' && (
// //           <View>
// //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //               {t('placed_bids') || 'My Placed Bids'}
// //             </Text>

// //             {loadingMyBids ? (
// //               <View style={styles.center}>
// //                 <ActivityIndicator size="large" color={theme.primary} />
// //                 <Text style={{ marginTop: 10, color: theme.text }}>Loading your bids...</Text>
// //               </View>
// //             ) : myBids.length === 0 ? (
// //               <View style={styles.emptyBox}>
// //                 <Text style={{ color: theme.text }}>You haven't placed any bids yet</Text>
// //               </View>
// //             ) : (
// //               <FlatList
// //                 data={myBids}
// //                 keyExtractor={item => `${item.lotId}_${item.createdAt}`}
// //                 renderItem={renderPlacedBidItem}
// //                 showsVerticalScrollIndicator={false}
// //                 contentContainerStyle={{ paddingBottom: 20 }}
// //               />
// //             )}
// //           </View>
// //         )}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
// //   backText: { fontWeight: '700', fontSize: 16 },
// //   title: { fontSize: 26, fontWeight: '700', marginBottom: 8 },
// //   text: { fontSize: 16, marginBottom: 16 },
// //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
// //   tab: { flex: 0.24, padding: 12, borderRadius: 10, alignItems: 'center' },
// //   tabText: { fontWeight: '600' },
// //   tabTextSelected: { fontWeight: 'bold' },

// //   searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
// //   searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
// //   pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
// //   searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

// //   chartBox: { borderWidth: 1, borderRadius: 12, padding: 16 },
// //   chartTitle: { fontWeight: '700', marginBottom: 12 },
// //   chartPlaceholder: { height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },

// //   horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
// //   horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
// //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// //   horizonText: { fontWeight: 'bold', color: '#333' },
// //   horizonTextActive: { color: '#fff', fontWeight: 'bold' },

// //   sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12, color: '#333' },
// //   center: { alignItems: 'center', padding: 40 },
// //   emptyBox: { padding: 30, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: '#ddd' },

// //   lotCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
// //   lotTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
// //   lotDetail: { fontSize: 14, marginBottom: 4 },
// //   bidRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
// //   bidInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 12, marginRight: 10 },
// //   bidBtn: { backgroundColor: '#2b6cb0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
// //   bidBtnText: { color: '#fff', fontWeight: 'bold' },
// // });

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
// import MandiPriceSummary from '../components/MandiPriceSummary';

// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import api from '../services/api';
// import AppHamburgerMenu from '../components/AppHamburgerMenu';

// type Lot = {
//   id: string;              // PreLotId
//   crop: string;
//   grade: string;
//   sellingamount:string;
//   quantity: number;
//   mandi: string;
//   expectedArrival: string;
//   createdAt: number;
//   owner?: string;
// };

// //Bid type with status

// type Bid = {
//   preLotId: string;
//   lotOwner: string;
//   bidder: string;
//   bidAmount: number;
//   createdAt: string;
  
//   status?: 'pending' | 'accepted' | 'rejected';
// };
// //  Bid joined with lot

// type BidWithLot = Bid & {

//   lot?: Lot;
// };

// type UIMandi = {
//   id: number;
//   name: string;
//   district: string;
// };

//   type UICrop = {
//   id: number;
//   name: string;
// };


// export default function BuyerDashboard() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const goBack = () => navigation.navigate('Dashboard');

//   const [selectedTab, setSelectedTab] =
//     useState<'daily' | 'short' | 'pre' | 'placed'>('daily');

  
//   // Daily
//   const [district, setDistrict] = useState('');
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');
//   const [dailyPriceFilters, setDailyPriceFilters] = useState<{
//   district: string;
//   mandi: string;
//   days: number;
// } | null>(null);

//   // Short-term forecast
//   const [stfDistrict, setStfDistrict] = useState('');
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
  
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   //  SAME AS FarmerDashboard
// const getDaysFromHorizon = () => {
//   if (horizon === '14days') return 14;
//   if (horizon === '30days') return 30;
//   return 7;
// };

//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);
//   const [shortPriceFilters, setShortPriceFilters] = useState<{
//   district: string;
//   mandi: string;
//   days: number;
// } | null>(null);

//   // Pre Bidding

//   const [lots, setLots] = useState<Lot[]>([]);
//   const [loadingLots, setLoadingLots] = useState(true);

//   const [bidValues, setBidValues] = useState<Record<string, string>>({});
//   const [placingBid, setPlacingBid] = useState<Record<string, boolean>>({});

//   // My Placed Bids
//   const [myBids, setMyBids] = useState<Bid[]>([]);
//   const [loadingMyBids, setLoadingMyBids] = useState(false);

//   const [mandis, setMandis] = useState<UIMandi[]>([]);
//   const [crops, setCrops] = useState<UICrop[]>([]);

//   const isPredefined = (value: string, options: string[]) =>
//   value === '' || options.includes(value) || value === 'Other';

//   const isValidPickerValue = (value: string, options: string[]) =>
//     value === '' || options.includes(value) || value === 'Other';

//   /* ================= LOAD AVAILABLE LOTS ================= */
//   const loadAvailableLots = async () => {
//     setLoadingLots(true);
//     try {
//       const res = await api.get('/buyer/lots/available');
//       const mapped: Lot[] = res.data.map((l: any) => ({
//         id: l.preLotId,
//         crop: l.cropName,
//         grade: l.grade,
//         quantity: l.quantity,
//         mandi: l.mandiName,
//         expectedArrival: l.expectedArrivalDate,
//       }));
//       setLots(mapped);
//     } catch {
//       Alert.alert('Error', 'Failed to load available lots');
//     } finally {
//       setLoadingLots(false);
//     }
//   };

//   /* ================= LOAD MY BIDS ================= */
//   const loadMyPlacedBids = async () => {
//     setLoadingMyBids(true);
//     try {
//       const res = await api.get('/buyer/lots/bids');
//       setMyBids(res.data);
//     } catch {
//       Alert.alert('Error', 'Failed to load your bids');
//     } finally {
//       setLoadingMyBids(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedTab === 'pre') loadAvailableLots();
//     if (selectedTab === 'placed') loadMyPlacedBids();
//   }, [selectedTab]);


//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title'), t('fill_mandi_search'));
//       return;
//     }
//     setDailyPriceFilters({
//       district,
//       mandi: mandiName,
//       days: 1,
//     });
//   };


//   // ✅ SAME PATTERN AS FarmerDashboard

// {dailyPriceFilters ? (
//   <MandiPriceSummary
//     key={`${dailyPriceFilters.district}_${dailyPriceFilters.mandi}_1`}
//     district={dailyPriceFilters.district}
//     mandi={dailyPriceFilters.mandi}
//     days={1}   // 🔒 ALWAYS 1 FOR DAILY
//   />
// ) : (
//   <View style={styles.chartPlaceholder}>
//     <Text style={{ color: theme.text }}>
//       Select district and mandi to view today’s price
//     </Text>
//   </View>
// )}



// const getShortTermForecastInline = () => {
//   if (!stfDistrict || !stfMandi) {
//     Alert.alert(t('error_title'), 'Please select district and mandi');
//     return;
//   }

//   setShortPriceFilters({
//     district: stfDistrict,
//     mandi: stfMandi,
//     days: getDaysFromHorizon(),
//   });

//     setForecastSummary(
//     `${t('short_term_forecast') ?? 'Short term forecast'} — ${getDaysFromHorizon()} days`
//   );
// };


//   /*========== LOAD MANDIS ========== */
//   useEffect(() => {
//   const loadMandis = async () => {
//     try {
//       const res = await api.get('/mandis');
//       const mapped: UIMandi[] = res.data.map((m: any) => ({
//         id: m.mandiId ?? m.id,
//         name: m.mandiName ?? m.name,
//         district: m.district ?? '',
//       }));
//       setMandis(mapped);
//     } catch (e) {
//       console.warn('Failed to load mandis', e);
//     }
//   };

//   loadMandis();
// }, []);

// const districtOptions = React.useMemo(
//   () =>
//     Array.from(
//       new Set(mandis.map(m => m.district).filter(Boolean))
//     ),
//   [mandis],
// );

// const mandiOptions = React.useMemo(
//   () =>
//     mandis
//       .filter(m => !district || m.district === district)
//       .map(m => m.name),
//   [mandis, district],
// );

// const stfMandiOptions = React.useMemo(
//   () =>
//     mandis
//       .filter(m => !stfDistrict || m.district === stfDistrict)
//       .map(m => m.name),
//   [mandis, stfDistrict],
// );

// const cropOptions = React.useMemo(
//   () =>
//     Array.from(
//       new Set(crops.map(c => c.name).filter(Boolean))
//     ),
//   [crops],
// );


// /*========== LOAD CROPS ========== */
// useEffect(() => {
//   const loadCrops = async () => {
//     try {
//       const res = await api.get('/crops');

//       const mapped: UICrop[] = (res.data ?? []).map((c: any) => ({
//         id: c.cropId ?? c.id,
//         name: c.cropName ?? c.name,
//       }));

//       setCrops(mapped);
//     } catch (e) {
//       console.warn('Failed to load crops', e);
//     }
//   };

//   loadCrops();
// }, []);

// useEffect(() => {
//   if (selectedTab === 'daily') {
//     setShortPriceFilters(null);
//   }
//   if (selectedTab === 'short') {
//     setDailyPriceFilters(null);
//   }
// }, [selectedTab]);


//   /* ================= PLACE BID ================= */
//   const placeBid = async (lot: Lot) => {
//     const value = bidValues[lot.id];
//     if (!value || isNaN(Number(value))) {
//       Alert.alert(t('error_title'), 'Enter a valid bid amount');
//       return;
//     }

//     setPlacingBid(s => ({ ...s, [lot.id]: true }));

//     try {
//       await api.post(`/buyer/lots/${lot.id}/bid`, {
//         bidAmount: Number(value),
//       });

//       Alert.alert(t('success_title'), `Bid of ₹${value}/quintal placed!`);
//       setBidValues(s => ({ ...s, [lot.id]: '' }));

//     // ✅ IMMEDIATE UI UPDATE (KEY FIX)
//     setLots(prevLots => prevLots.filter(l => l.id !== lot.id));

//     // Clear input
//     setBidValues(s => ({ ...s, [lot.id]: '' }));

//       // Refresh lists
//      //await loadMyPlacedBids();
//       //await loadAvailableLots();
//       loadMyPlacedBids();
//     } catch (err: any) {
//       Alert.alert(t('error_title'),t('failed'), err?.response?.data?.message || 'Bid failed');
//     } finally {
//       setPlacingBid(s => ({ ...s, [lot.id]: false }));
//     }
//   };

//   const renderLotItem = ({ item }: { item: Lot }) => (
//     <View style={[styles.lotCard, { backgroundColor:theme.background, borderColor: theme.text + '40' }]}>
//       <Text style={[styles.lotTitle, { color: theme.text }]}>
//         {item.crop} {item.grade ? `(${item.grade})` : ''}
//       </Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {item.quantity} quintal</Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>{t('expected_amount')}: {item.sellingamount}</Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {item.mandi}</Text>
//       <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {item.expectedArrival}</Text>
//       {item.owner && (
//         <Text style={[styles.lotDetail, { color: theme.text }]}>
//           Owner: {item.owner}
//         </Text>

//       )}

//       <View style={styles.bidRow}>
//         <TextInput
//           placeholder="Your bid (₹/quintal)"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           value={bidValues[item.id] || ''}
//           onChangeText={t =>
//             setBidValues(s => ({ ...s, [item.id]: t.replace(/[^0-9.]/g, '') }))
//           }
//           style={[styles.bidInput, { borderColor: theme.text, color: theme.text }]}
//         />
//         <TouchableOpacity
//           onPress={() => placeBid(item)}
//           disabled={placingBid[item.id]}
//           style={[styles.bidBtn, { backgroundColor: theme.primary }]}
//         >
//           {placingBid[item.id] ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.bidBtnText}>Bid</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//    //  badge for bid status
//    const renderStatusBadge = (status?: 'pending' | 'accepted' | 'rejected') => {
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


//   const renderPlacedBidItem = ({ item }: { item: Bid }) => (
//     <View style={[styles.lotCard, {backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
//       <Text style={[styles.lotTitle, { color: theme.text }]}>
//         Lot: {item.preLotId}
//       </Text>
//       <Text style={{ color: theme.text }}>
//         Bid: ₹{item.bidAmount}/quintal
//       </Text>
//       <Text style={{ color: theme.text }}>
//         Status: {item.status}
//       </Text>
//       <Text style={{ color: theme.text }}>
//         Placed On: {new Date(item.createdAt).toLocaleDateString()}
//       </Text>
//     </View>
//   );

//   return (

//       <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//   {/* Row 1: Back + Hamburger */}
//   <View style={styles.headerTopRow}>
//     <TouchableOpacity onPress={goBack} style={styles.backBtn}>
//       <Text style={[styles.backText, { color: theme.primary }]}>
//         {t('back') || 'Back'}
//       </Text>
//     </TouchableOpacity>

//     {/*  SAME hamburger component */}
//     <AppHamburgerMenu role="buyer" />
//   </View>

//   {/* Row 2: Title + subtitle */}
//   <View style={styles.headerTextBlock}>
//     <Text style={[styles.title, { color: theme.text }]}>
//       {t('buyer_dashboard') || 'Buyer Dashboard'}
//     </Text>
//     <Text style={[styles.text, { color: theme.text }]}>
//       {t('buyer_msg') ||
//         'View daily market prices, manage bids, and explore pre-registered lots'}
//     </Text>
//   </View>

//         <View style={styles.tabsRow}>
//           {(['daily', 'short', 'pre', 'placed'] as const).map(tab => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tab,
//                 selectedTab === tab && { backgroundColor: theme.primary },
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

//            {/* DAILY */}
//         {selectedTab === 'daily' && (
//           <>
//             <View
//               style={[
//                 styles.searchBox,
//                 {
//                   backgroundColor: theme.background,
//                   borderColor: theme.text,
//                 },
//               ]}
//             >

//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//   {t('district') ?? 'District'}
// </Text>

// <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//   <Picker
//     selectedValue={district}
//     onValueChange={v => {
//       setDistrict(v);
//       setMandiName('');
//     }}
//     style={[styles.picker, { color: theme.text }]}
//     dropdownIconColor={theme.text}
//   >
//     <Picker.Item label={t('select_district') ?? 'Select district'} value="" />
//     {districtOptions.map(d => (
//       <Picker.Item key={d} label={d} value={d} />
//     ))}
//   </Picker>
// </View>


//               <Text
//                 style={[styles.searchTitle, { color: theme.text }]}
//               >
//                 {t('mandi') ?? 'Mandi'}
//               </Text>
//               <View
//                 style={[
//                   styles.pickerWrap,
//                   { borderColor: theme.text },
//                 ]}
//               >
//                 <Picker
//                   selectedValue={
//                     isValidPickerValue(mandiName, mandiOptions)
//                       ? mandiName
//                       : ''
//                   }
//                   onValueChange={v => setMandiName(v)}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}
//                 >
//                   <Picker.Item
//                     label={t('select_mandi') ?? 'Select mandi'}
//                     value=""
//                   />
//                   {mandiOptions.map(m => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {mandiName &&
//                 !isValidPickerValue(mandiName, mandiOptions) &&
//                 mandiName !== 'Other' && (
//                   <TextInput
//                     placeholder={t('type_mandi') ?? 'Type mandi'}
//                     placeholderTextColor={theme.text ?? '#999'}
//                     value={mandiName}
//                     onChangeText={setMandiName}
//                     style={[
//                       styles.input,
//                       {
//                         color: theme.text,
//                         borderColor: theme.text,
//                       },
//                     ]}
//                   />
//                 )}

//               <Text
//                 style={[styles.searchTitle, { color: theme.text }]}
//               >
//                 {t('crop') ?? 'Crop'}
//               </Text>
//               <View
//                 style={[
//                   styles.pickerWrap,
//                   { borderColor: theme.text },
//                 ]}
//               >
//                 <Picker
//                   selectedValue={
//                     isValidPickerValue(cropName, cropOptions)
//                       ? cropName
//                       : ''
//                   }
//                   onValueChange={v => setCropName(v)}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}
//                 >
//                   <Picker.Item
//                     label={t('select_crop') ?? 'Select crop'}
//                     value=""
//                   />
//                   {cropOptions.map(c => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {cropName &&
//                 !isValidPickerValue(cropName, cropOptions) &&
//                 cropName !== 'Other' && (
//                   <TextInput
//                     placeholder={t('type_crop') ?? 'Type crop'}
//                     placeholderTextColor={theme.text ?? '#999'}
//                     value={cropName}
//                     onChangeText={setCropName}
//                     style={[
//                       styles.input,
//                       {
//                         color: theme.text,
//                         borderColor: theme.text,
//                       },
//                     ]}
//                   />
//                 )}

//               <TouchableOpacity
//                 style={[
//                   styles.searchBtn,
//                   { backgroundColor: theme.primary ?? '#2b6cb0' },
//                 ]}
//                 onPress={onSearchDaily}
//               >
//                 <Text
//                   style={[styles.searchBtnText, { color: '#fff' }]}
//                 >
//                   {t('search')}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View
//   style={[
//     styles.chartBox,
//     {
//       borderColor: theme.text,
//       backgroundColor: theme.background,
//     },
//   ]}
// >
//   <Text style={[styles.chartTitle, { color: theme.text }]}>
//     {t('daily_market_price_chart_title')}
//   </Text>

// {dailyPriceFilters ? (
//   <MandiPriceSummary
//     key={`${dailyPriceFilters.district}_${dailyPriceFilters.mandi}_1`}
//     district={dailyPriceFilters.district}
//     mandi={dailyPriceFilters.mandi}
//     days={1}   // 🔒 ALWAYS 1 FOR DAILY
//   />
// ) : (
//   <View style={styles.chartPlaceholder}>
//     <Text style={{ color: theme.text }}>
//       Select district and mandi to view today’s price
//     </Text>
//   </View>
// )}

// </View>

//           </>
//         )}

//         {/* SHORT TERM TAB */}

//         {selectedTab === 'short' && (

//           <View>

//             <View style={[styles.searchBox, { borderColor: theme.text }]}>

//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//   {t('district') ?? 'District'}
// </Text>

// <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//   <Picker
//     selectedValue={stfDistrict}
//     onValueChange={v => {
//       setStfDistrict(v);
//       setStfMandi('');
//     }}
//     style={[styles.picker, { color: theme.text }]}
//     dropdownIconColor={theme.text}
//   >
//     <Picker.Item label={t('select_district') ?? 'Select district'} value="" />
//     {districtOptions.map(d => (
//       <Picker.Item key={d} label={d} value={d} />
//     ))}
//   </Picker>
// </View>


//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi')}</Text>

//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>

//                 <Picker selectedValue={isPredefined(stfMandi, stfMandiOptions) ? stfMandi : 'Other'} onValueChange={v => v !== 'Other' && setStfMandi(v)}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}>

//                   <Picker.Item label="Select mandi" value="" />

//                   {stfMandiOptions.map(m => (
//   <Picker.Item key={m} label={m} value={m} />
// ))}


//                   <Picker.Item label="Other" value="Other" />

//                 </Picker>

//               </View>

//               {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (

//                 <TextInput placeholder="Type mandi" value={stfMandi} onChangeText={setStfMandi} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />

//               )}



//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>

//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>

//                 <Picker selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'} onValueChange={v => v !== 'Other' && setStfCrop(v)}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}>

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
//                 <Text style={[styles.searchBtnText,{color: theme.text ?? 'white'}]}>Get Short Term Forecast</Text>
//             </TouchableOpacity>
//             </View>

//               <View style={[styles.chartBox, { borderColor: theme.text }]}>
//   <Text style={[styles.chartTitle, { color: theme.text }]}>
//     {t('short_term_forecast')}
//   </Text>

// {shortPriceFilters ? (
//   <MandiPriceSummary
//     key={`${shortPriceFilters.district}_${shortPriceFilters.mandi}_${shortPriceFilters.days}`}
//     district={shortPriceFilters.district}
//     mandi={shortPriceFilters.mandi}
//     days={shortPriceFilters.days}
//   />
// ) : (
//   <View style={styles.chartPlaceholder}>
//     <Text style={{ color: theme.text }}>
//       Select district, mandi and duration to view forecast
//     </Text>
//   </View>
// )}

// </View>
//           </View>

//         )}


//         {/* PRE BIDDING TAB */}

//         {selectedTab === 'pre' && (
//              <View>

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
//           ) : (
//             <FlatList
//               data={lots}
//               keyExtractor={i => i.id}
//               renderItem={renderLotItem}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 20 }}
//             />
//              )}
//             </View>
//         )}

// {/* PLACED BIDS TAB */}
//         {selectedTab === 'placed' && (
          
//           <View>

//             <Text style={[styles.sectionTitle, { color: theme.text }]}>

//               {t('placed_bids') || 'My Placed Bids'}

//             </Text>
//                   {loadingMyBids ? (
//               <View style={styles.center}>
//                 <ActivityIndicator size="large" color={theme.primary} />
//                 <Text style={{ marginTop: 10, color: theme.text }}>Loading your bids...</Text>
//               </View>
//             ) : myBids.length === 0 ? (
//               <View style={styles.emptyBox}>
//                 <Text style={{ color: theme.text }}>You haven't placed any bids yet</Text>

//               </View>
//           ) : (
//             <FlatList
//               data={myBids}
//               keyExtractor={i => `${i.preLotId}_${i.createdAt}`}
//               renderItem={renderPlacedBidItem}
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
//   tabsRow: { flexDirection: 'row', justifyContent: 'space-around', margin: 12 },
//   tab: {flex: 0.24, padding: 10, borderRadius: 8, alignItems: 'center'  },
//   lotCard: { borderWidth: 1, borderRadius: 10, padding: 12, margin: 10 , marginBottom: 12},
//   lotTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
//   bidRow: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
//   bidInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 11, marginRight: 10 },
//   bidBtn: { marginLeft: 8, padding: 12, borderRadius: 8 ,backgroundColor: '#2b6cb0', paddingVertical: 12, paddingHorizontal: 20},
//   bidBtnText: { color: '#fff', fontWeight: '700' },
  
//   tabText: { fontWeight: '600' },
//   tabTextSelected: { fontWeight: 'bold' },
//   searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
//   searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
//   pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
//   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchBtn: { padding: 14, borderRadius: 30, alignItems: 'center', marginTop: 8 },
//   searchBtnText: { fontWeight: 'bold', fontSize: 16 },
//   chartBox: { borderWidth: 1, borderRadius: 12, padding: 16 },
//   chartTitle: { fontWeight: '700', marginBottom: 12 },
//   chartPlaceholder: { height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
//   horizonRow: { flexDirection: 'row', marginBottom:12 },
//   horizonBtn: {
//     padding: 10,
//     borderRadius: 6,
//     marginRight: 8,
//     backgroundColor: '#efefef',
//     alignItems: 'center',
//     minWidth: 44,
//   },
//   horizonBtnActive: { backgroundColor: '#18d44eff' },
//   horizonText: { fontWeight: 'bold', color: '#333' },
//   horizonTextActive: { color: '#fff', fontWeight: 'bold' },
//   sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12, color: '#333' },
//   center: { alignItems: 'center', padding: 40 },
//   emptyBox: { padding: 30, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: '#ddd' },
  
//   lotDetail: { fontSize: 14, marginBottom: 4 },
//   picker: { },
//   topBarRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between', // 🔑 pushes left & right
//   marginBottom: 12,
// },

// titleWrap: {
//   flex: 1,
//   marginLeft: 12,
// },
// menuWrap: {
//   marginLeft: 12,
// },
// headerContainer: {
//   marginBottom: 12,
// },

// headerTopRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// },

// headerTextBlock: {
//   marginTop: 8,
// },

  
// });


import React, { useEffect, useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import MandiPriceSummary from '../components/MandiPriceSummary';
import { Picker } from '@react-native-picker/picker';
import api from '../services/api';
import AppHamburgerMenu from '../components/AppHamburgerMenu';

type Lot = {
  id: string;
  crop: string;
  grade?: string;
  sellingAmount?: string;
  quantity?: number;
  mandi?: string;
  expectedArrival?: string;
  createdAt?: number;
  owner?: string;
};

type Bid = {
  preLotId: string;
  lotOwner?: string;
  bidder?: string;
  bidAmount?: number;
  createdAt?: string;
  status?: 'pending' | 'accepted' | 'rejected';
};

type UIMandi = { id: number; name: string; district?: string };
type UICrop = { id: number; name: string };

export default function BuyerDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const goBack = () => navigation.navigate('Dashboard');

  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre' | 'placed'>('daily');

  // Daily inputs
  const [district, setDistrict] = useState('');
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');

  // Applied filters (pattern copied from FarmerDashboard)
  const [appliedDailyFilter, setAppliedDailyFilter] = useState<{ district: string; mandi: string; days: number } | null>(null);
  // Short-term applied filters (this is the one that must change when horizon changes)
  const [appliedShortFilter, setAppliedShortFilter] = useState<{ district: string; mandi: string; days: number } | null>(null);

  // Short-term inputs
  const [stfDistrict, setStfDistrict] = useState('');
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');

  // Lots & bids
  const [lots, setLots] = useState<Lot[]>([]);
  const [loadingLots, setLoadingLots] = useState(true);
  const [bidValues, setBidValues] = useState<Record<string, string>>({});
  const [placingBid, setPlacingBid] = useState<Record<string, boolean>>({});
  const [myBids, setMyBids] = useState<Bid[]>([]);
  const [loadingMyBids, setLoadingMyBids] = useState(false);

  const [mandis, setMandis] = useState<UIMandi[]>([]);
  const [crops, setCrops] = useState<UICrop[]>([]);

  const isPredefined = (value: string, options: string[]) => value === '' || options.includes(value) || value === 'Other';
  const isValidPickerValue = (value: string, options: string[]) => value === '' || options.includes(value) || value === 'Other';

  /* ===== load mandis & crops ===== */
  useEffect(() => {
    const load = async () => {
      try {
        const [mandisRes, cropsRes] = await Promise.all([api.get('/mandis'), api.get('/crops')]);
        const mandisData = mandisRes.data ?? [];
        const cropsData = cropsRes.data ?? [];

        const mappedMandis: UIMandi[] = (mandisData ?? []).map((m: any) => ({
          id: m.mandiId ?? m.id,
          name: m.mandiName ?? m.name,
          district: m.district ?? '',
        }));
        const mappedCrops: UICrop[] = (cropsData ?? []).map((c: any) => ({
          id: c.cropId ?? c.id,
          name: c.cropName ?? c.name,
        }));
        setMandis(mappedMandis);
        setCrops(mappedCrops);
      } catch (e) {
        console.warn('Failed to load mandis/crops', e);
      }
    };
    load();
  }, []);

  const districtOptions = useMemo(() => Array.from(new Set(mandis.map(m => m.district).filter(Boolean))), [mandis]);
  const mandiOptions = useMemo(() => mandis.filter(m => !district || m.district === district).map(m => m.name), [mandis, district]);
  const stfMandiOptions = useMemo(() => mandis.filter(m => !stfDistrict || m.district === stfDistrict).map(m => m.name), [mandis, stfDistrict]);
  const cropOptions = useMemo(() => Array.from(new Set(crops.map(c => c.name).filter(Boolean))), [crops]);

  /* ===== load lots & my bids ===== */
  const loadAvailableLots = async () => {
    setLoadingLots(true);
    try {
      const res = await api.get('/buyer/lots/available');
      const mapped: Lot[] = (res.data ?? []).map((l: any) => ({
        id: l.preLotId ?? l.id,
        crop: l.cropName,
        grade: l.grade,
        quantity: l.quantity,
        mandi: l.mandiName,
        expectedArrival: l.expectedArrivalDate,
        sellingAmount: l.expectedAmount ?? l.sellingAmount,
      }));
      setLots(mapped);
    } catch (e) {
      Alert.alert('Error', 'Failed to load available lots');
    } finally {
      setLoadingLots(false);
    }
  };

  const loadMyPlacedBids = async () => {
    setLoadingMyBids(true);
    try {
      const res = await api.get('/buyer/lots/bids');
      setMyBids(res.data ?? []);
    } catch (e) {
      Alert.alert('Error', 'Failed to load your bids');
    } finally {
      setLoadingMyBids(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'pre') loadAvailableLots();
    if (selectedTab === 'placed') loadMyPlacedBids();
  }, [selectedTab]);

  /* ===== handlers ===== */
  const onSearchDaily = () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title'), t('fill_mandi_search'));
      return;
    }
    // apply daily filter (days always 1)
    setAppliedDailyFilter({ district, mandi: mandiName, days: 1 });
  };

  const getDaysFromHorizon = () => {
    if (horizon === '14days') return 14;
    if (horizon === '30days') return 30;
    return 7;
  };

  const getShortTermForecastInline = () => {
    if (!stfDistrict || !stfMandi) {
      Alert.alert(t('error_title'), 'Please select district and mandi');
      return;
    }
    const days = getDaysFromHorizon();

    // copy farmer pattern: set applied filter object so MandiPriceSummary remounts
    setAppliedShortFilter({
      district: stfDistrict,
      mandi: stfMandi,
      days,
    });

    console.log('Buyer short forecast requested', { district: stfDistrict, mandi: stfMandi, days });
  };

  const placeBid = async (lot: Lot) => {
    const value = bidValues[lot.id];
    if (!value || isNaN(Number(value))) {
      Alert.alert(t('error_title'), 'Enter a valid bid amount');
      return;
    }
    setPlacingBid(s => ({ ...s, [lot.id]: true }));
    try {
      await api.post(`/buyer/lots/${lot.id}/bid`, { bidAmount: Number(value) });
      Alert.alert(t('success_title'), `Bid of ₹${value}/quintal placed!`);
      setLots(prev => prev.filter(l => l.id !== lot.id));
      setBidValues(s => ({ ...s, [lot.id]: '' }));
      loadMyPlacedBids();
    } catch (err: any) {
      Alert.alert(t('error_title'), t('failed'), err?.response?.data?.message || 'Bid failed');
    } finally {
      setPlacingBid(s => ({ ...s, [lot.id]: false }));
    }
  };

  const renderLotItem = ({ item }: { item: Lot }) => (
    <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
      <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} {item.grade ? `(${item.grade})` : ''}</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>Quantity: {item.quantity} quintal</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>{t('expected_amount')}: {item.sellingAmount}</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>Mandi: {item.mandi}</Text>
      <Text style={[styles.lotDetail, { color: theme.text }]}>Arrival: {item.expectedArrival}</Text>
      <View style={styles.bidRow}>
        <TextInput
          placeholder="Your bid (₹/quintal)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={bidValues[item.id] || ''}
          onChangeText={t => setBidValues(s => ({ ...s, [item.id]: t.replace(/[^0-9.]/g, '') }))}
          style={[styles.bidInput, { borderColor: theme.text, color: theme.text }]}
        />
        <TouchableOpacity onPress={() => placeBid(item)} disabled={placingBid[item.id]} style={[styles.bidBtn, { backgroundColor: theme.primary }]}>
          {placingBid[item.id] ? <ActivityIndicator color="#fff" /> : <Text style={styles.bidBtnText}>Bid</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPlacedBidItem = ({ item }: { item: Bid }) => (
    <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: theme.text + '40' }]}>
      <Text style={[styles.lotTitle, { color: theme.text }]}>Lot: {item.preLotId}</Text>
      <Text style={{ color: theme.text }}>Bid: ₹{item.bidAmount}/quintal</Text>
      <Text style={{ color: theme.text }}>Status: {item.status}</Text>
      <Text style={{ color: theme.text }}>Placed On: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Row 1: Back + Hamburger */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={[styles.backText, { color: theme.primary }]}>{t('back') || 'Back'}</Text>
          </TouchableOpacity>
          <AppHamburgerMenu role="buyer" />
        </View>

        {/* Title */}
        <View style={styles.headerTextBlock}>
          <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard') || 'Buyer Dashboard'}</Text>
          <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg') || 'View daily market prices, manage bids, and explore pre-registered lots'}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {(['daily', 'short', 'pre', 'placed'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && { backgroundColor: theme.primary }]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, { color: selectedTab === tab ? '#fff' : theme.text }, selectedTab === tab && styles.tabTextSelected]}>
                {tab === 'daily' ? t('daily_market_price') : tab === 'short' ? t('short_term_forecast') : tab === 'pre' ? t('pre_bidding') || 'Pre Bidding' : t('placed_bids') || 'My Bids'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DAILY */}
        {selectedTab === 'daily' && (
          <>
            <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('district') ?? 'District'}</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={district} onValueChange={v => { setDistrict(v); setMandiName(''); }} style={[styles.picker, { color: theme.text }]} dropdownIconColor={theme.text}>
                  <Picker.Item label={t('select_district') ?? 'Select district'} value="" />
                  {districtOptions.map(d => <Picker.Item key={d} label={d} value={d} />)}
                </Picker>
              </View>

              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''} onValueChange={v => setMandiName(v)} style={[styles.picker, { color: theme.text }]} dropdownIconColor={theme.text}>
                  <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
                  {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              {mandiName && !isValidPickerValue(mandiName, mandiOptions) && mandiName !== 'Other' && (
                <TextInput placeholder={t('type_mandi') ?? 'Type mandi'} placeholderTextColor={theme.text ?? '#999'} value={mandiName} onChangeText={setMandiName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''} onValueChange={v => setCropName(v)} style={[styles.picker, { color: theme.text }]} dropdownIconColor={theme.text}>
                  <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
                  {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              {cropName && !isValidPickerValue(cropName, cropOptions) && cropName !== 'Other' && (
                <TextInput placeholder={t('type_crop') ?? 'Type crop'} placeholderTextColor={theme.text ?? '#999'} value={cropName} onChangeText={setCropName} style={[styles.input, { color: theme.text, borderColor: theme.text }]} />
              )}

              <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchDaily}>
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>

              {appliedDailyFilter ? (
                <MandiPriceSummary
                  key={`${appliedDailyFilter.district}_${appliedDailyFilter.mandi}_${appliedDailyFilter.days}`}
                  district={appliedDailyFilter.district}
                  mandi={appliedDailyFilter.mandi}
                  days={appliedDailyFilter.days}
                />
              ) : (
                <View style={styles.chartPlaceholder}>
                  <Text style={{ color: theme.text }}>Select district and mandi to view today’s price</Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* SHORT */}
        {selectedTab === 'short' && (
          <View>
            <View style={[styles.searchBox, { borderColor: theme.text }]}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('district') ?? 'District'}</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={stfDistrict} onValueChange={v => { setStfDistrict(v); setStfMandi(''); }} style={[styles.picker, { color: theme.text }]} dropdownIconColor={theme.text}>
                  <Picker.Item label={t('select_district') ?? 'Select district'} value="" />
                  {districtOptions.map(d => <Picker.Item key={d} label={d} value={d} />)}
                </Picker>
              </View>

              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi')}</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={isPredefined(stfMandi, stfMandiOptions) ? stfMandi : ''} onValueChange={v => setStfMandi(v)} style={[styles.picker, { color: theme.text }]} dropdownIconColor={theme.text}>
                  <Picker.Item label="Select mandi" value="" />
                  {stfMandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              {stfMandi && !isPredefined(stfMandi, stfMandiOptions) && (
                <TextInput placeholder="Type mandi" value={stfMandi} onChangeText={setStfMandi} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : ''} onValueChange={v => setStfCrop(v)} style={[styles.picker, { color: theme.text }]} dropdownIconColor={theme.text}>
                  <Picker.Item label="Select crop" value="" />
                  {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              {stfCrop && !isPredefined(stfCrop, cropOptions) && (
                <TextInput placeholder="Type crop" value={stfCrop} onChangeText={setStfCrop} style={[styles.input, { borderColor: theme.text, color: theme.text }]} />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
              <View style={styles.horizonRow}>
                {(['7days', '14days', '30days'] as const).map(d => (
                  <TouchableOpacity key={d} style={[styles.horizonBtn, horizon === d && styles.horizonBtnActive]} onPress={() => setHorizon(d)}>
                    <Text style={horizon === d ? styles.horizonTextActive : styles.horizonText}>{d === '7days' ? '7' : d === '14days' ? '14' : '30'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={getShortTermForecastInline}>
                <Text style={[styles.searchBtnText, { color: theme.text ?? 'white' }]}>Get Short Term Forecast</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.chartBox, { borderColor: theme.text }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>

              {appliedShortFilter ? (
                <MandiPriceSummary
                  key={`${appliedShortFilter.district}_${appliedShortFilter.mandi}_${appliedShortFilter.days}`}
                  district={appliedShortFilter.district}
                  mandi={appliedShortFilter.mandi}
                  days={appliedShortFilter.days}
                />
              ) : (
                <View style={styles.chartPlaceholder}>
                  <Text style={{ color: theme.text }}>Select district, mandi and duration to view forecast</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* PRE */}
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
              <FlatList data={lots} keyExtractor={i => i.id} renderItem={renderLotItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} />
            )}
          </View>
        )}

        {/* PLACED */}
        {selectedTab === 'placed' && (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('placed_bids') || 'My Placed Bids'}</Text>
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
              <FlatList data={myBids} keyExtractor={i => `${i.preLotId}_${i.createdAt}`} renderItem={renderPlacedBidItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} />
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
  tabsRow: { flexDirection: 'row', justifyContent: 'space-around', margin: 12 },
  tab: { flex: 0.24, padding: 10, borderRadius: 8, alignItems: 'center' },
  lotCard: { borderWidth: 1, borderRadius: 10, padding: 12, margin: 10, marginBottom: 12 },
  lotTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
  bidRow: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  bidInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 11, marginRight: 10 },
  bidBtn: { marginLeft: 8, padding: 12, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 20 },
  bidBtnText: { color: '#fff', fontWeight: '700' },
  tabText: { fontWeight: '600' },
  tabTextSelected: { fontWeight: 'bold' },
  searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchBtn: { padding: 14, borderRadius: 30, alignItems: 'center', marginTop: 8 },
  searchBtnText: { fontWeight: 'bold', fontSize: 16 },
  chartBox: { borderWidth: 1, borderRadius: 12, padding: 16 },
  chartTitle: { fontWeight: '700', marginBottom: 12 },
  chartPlaceholder: { height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
  horizonBtnActive: { backgroundColor: '#18d44eff' },
  horizonText: { fontWeight: 'bold', color: '#333' },
  horizonTextActive: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12, color: '#333' },
  center: { alignItems: 'center', padding: 40 },
  emptyBox: { padding: 30, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: '#ddd' },
  lotDetail: { fontSize: 14, marginBottom: 4 },
  picker: {},
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTextBlock: { marginTop: 8 },
});

// // // import React, { useState, useEffect, useCallback, useMemo} from 'react';
// // // import {Text,TouchableOpacity,StyleSheet,View,TextInput, Alert, FlatList} from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';
// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';


// // // type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// // // type Lot = {
// // //   id: string;
// // //   crop: string;
// // //   grade: string;
// // //   quantity: string;
// // //   mandi: string;
// // //   expectedArrival: string;
// // //   createdAt: number;
// // // };

// // // export default function SellerDashboard() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const goBack = () => {
// // //     navigation.navigate('Dashboard');
// // //   };

// // //   // Tabs: daily market price, short term forecast and pre-register lot
// // //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short'| 'preregister'>('daily');

// // //   // Daily search
// // //   const [mandiName, setMandiName] = useState('');
// // //   const [cropName, setCropName] = useState('');

// // //   // Short term forecast inline
// // //   const [stfMandi, setStfMandi] = useState('');
// // //   const [stfCrop, setStfCrop] = useState('');
// // //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// // //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// // //   const [forecastLoading, setForecastLoading] = useState(false);

// // //    // Pre-register inline 
// // //   const [prCrop, setPrCrop] = useState('');
// // //   const [prGrade, setPrGrade] = useState('');
// // //   const [prQuantity, setPrQuantity] = useState('');
// // //   const [prMandi, setPrMandi] = useState('');
// // //   const [prExpectedArrival, setPrExpectedArrival] = useState('');
// // //   const [lots, setLots] = useState<Lot[]>([]);
// // //   const [phone, setPhone] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
// // //       setPhone(p);
// // //       if (p) {
// // //         AsyncStorage.getItem(`REGISTERED_LOTS_${p}`).then((j) => {
// // //           if (j) {
// // //             try {
// // //               setLots(JSON.parse(j));
// // //             } catch (e) {
// // //               console.warn('Failed parse lots', e);
// // //             }
// // //           }
// // //         });
// // //       }
// // //     });
// // //   }, []);

// // //   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
// // //     if (tab === 'short') {
// // //       setSelectedTab('short');
// // //       setStfMandi(mandiName);
// // //       setStfCrop(cropName);
// // //       return;
// // //     }

// // //     if (tab === 'preregister') {
// // //       setSelectedTab('preregister');
// // //       return;
// // //     }

// // //     setSelectedTab('daily');
// // //   };

// // //   const onSearchMandi = async () => {
// // //     if (!mandiName && !cropName) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     }
// // //     try {
// // //       // optional: save last search
// // //       // await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
// // //     } catch (e) {
// // //       // ignore
// // //     }
// // //     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
// // //   };

// // //   // Short-term inline forecast action
// // //   const getShortTermForecastInline = async () => {
// // //     if (!stfMandi && !stfCrop) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     }
// // //     try {
// // //       setForecastLoading(true);
// // //       setForecastSummary(null);

// // //       // Mocked summary — replace with actual API call or GraphChart usage
// // //       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${ horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
// // //       }.`;

// // //       // small delay to simulate fetch
// // //       setTimeout(() => {
// // //         setForecastSummary(summary);
// // //         setForecastLoading(false);
// // //       }, 350);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setForecastLoading(false);
// // //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
// // //     }
// // //   };

// // //    // Pre-register inline: add lot

// // //   const addLotInline = async () => {

// // //     if (!prCrop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');

// // //     if (!prQuantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');

// // //     if (!prMandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');



// // //     const newLot: Lot = {

// // //       id: `${Date.now()}`,

// // //       crop: prCrop,

// // //       grade: prGrade || '-',

// // //       quantity: prQuantity,

// // //       mandi: prMandi,

// // //       expectedArrival: prExpectedArrival || '-',

// // //       createdAt: Date.now(),

// // //     };



// // //     const newLots = [newLot, ...lots];

// // //     setLots(newLots);

// // //     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(newLots));

// // //     // clear inputs
// // //     setPrCrop('');
// // //     setPrGrade('');
// // //     setPrQuantity('');
// // //     setPrMandi('');
// // //     setPrExpectedArrival('');
// // //     Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
// // //   };

// // //   const removeLot = async (id: string) => {
// // //     const filtered = lots.filter((l) => l.id !== id);
// // //     setLots(filtered);
// // //     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(filtered));
// // //   };



// // //   // Memoized header element (prevents FlatList from remounting header on every render)

// // //   const ListHeaderElement = useMemo(() => {
// // //     return (
// // //       <View>
// // //         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// // //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
// // //         </TouchableOpacity>

// // //         <Text style={[styles.title, { color: theme.text }]}>{t('seller_dashboard')}</Text>
// // //         <Text style={[styles.text, { color: theme.text }]}>{t('seller_msg')}</Text>

// // //         {/* Tabs added (daily | short | preregister) */}
// // //         <View style={styles.tabsRow}>
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.tab,
// // //               selectedTab === 'daily'
// // //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// // //             ]}
// // //             onPress={() => setSelectedTab('daily')}
// // //           >
// // //             <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}, { color: selectedTab === 'daily' ? '#fff' : theme.text }]}>
// // //               {t('daily_market_price')}
// // //             </Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={[
// // //               styles.tab,
// // //               selectedTab === 'short'
// // //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// // //             ]}
// // //             onPress={() => setSelectedTab('short')}
// // //           >
// // //             <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}, { color: selectedTab === 'short' ? '#fff' : theme.text }]}>
// // //               {t('short_term_forecast')}
// // //             </Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={[
// // //               styles.tab,
// // //               selectedTab === 'preregister'
// // //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// // //             ]}
// // //             onPress={() => onSelectTab('preregister')}
// // //           >
// // //           <Text style={[styles.tabText, {color:theme.text},{borderColor:theme.text},selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>
// // //             {t('pre_register_lot')}
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* Daily Market Price UI */}
// // //         {selectedTab === 'daily' && (
// // //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text ??'#ddd' }]}>
// // //             <Text style={[styles.searchTitle, { color: theme.text  },{borderColor:theme.text}]}>{t('mandi') ?? 'Mandi'}</Text>
// // //             <TextInput
// // //               placeholder={t('enter_mandi') ?? 'Enter mandi name'}
// // //               placeholderTextColor={theme.placeholder ?? '#999'}
// // //               value={mandiName}
// // //               onChangeText={setMandiName}
// // //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //             />
// // //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// // //             <TextInput
// // //               placeholder={t('enter_crop') ?? 'Enter crop name'}
// // //               placeholderTextColor={theme.text ?? '#999'}
// // //               value={cropName}
// // //               onChangeText={setCropName}
// // //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //             />
// // //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
// // //               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
// // //             </TouchableOpacity>
// // //             </View>
// // //         )}

// // //         {/* Daily Market Price area */}

// // //         {selectedTab === 'daily' && (

// // //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
// // //             <Text style={[styles.chartTitle, { color: theme.text },{borderColor:theme.text}]}>{t('daily_market_price_chart_title')}</Text>
// // //             <View style={[styles.chartPlaceholder,{borderColor:theme.text}]}>
// // //             <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// // //             </View>
// // //           </View>
// // //         )}

// // //         {/* Short term forecast UI */}
// // //         {selectedTab === 'short' && (
// // //           <>
// // //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text??'#ddd' }]}>
// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// // //               <TextInput
// // //                 placeholder={t('enter_mandi') ?? 'Enter mandi name'}
// // //                 placeholderTextColor={theme.placeholder ?? '#999'}
// // //                 value={stfMandi}
// // //                 onChangeText={setStfMandi}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />
// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// // //               <TextInput
// // //                 placeholder={t('enter_crop') ?? 'Enter crop name'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={stfCrop}
// // //                 onChangeText={setStfCrop}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />

// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
// // //               <View style={styles.horizonRow}>
// // //                 <TouchableOpacity style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('7days')}>
// // //                   <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
// // //                 </TouchableOpacity>

// // //                 <TouchableOpacity style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('14days')}>
// // //                   <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
// // //                 </TouchableOpacity>

// // //                 <TouchableOpacity style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('30days')}>
// // //                   <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
// // //                 </TouchableOpacity>
// // //               </View>

// // //               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
// // //                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
// // //               </TouchableOpacity>
// // //             </View>

// // //             <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background, marginTop: 12 }]}>
// // //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
// // //               <View style={styles.chartPlaceholder}>
// // //                 <Text style={{ color: theme.text }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
// // //               </View>
// // //               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
// // //             </View>
// // //           </>
// // //         )}
// // //          {/* Pre-register header & form - the list of lots is rendered by FlatList items below */}

// // //         {selectedTab === 'preregister' && (
// // //           <>
// // //             <View style={[styles.formBox, { borderColor: theme.text??'#ddd', backgroundColor: theme.background }]}>
// // //               <View style={styles.formHeaderRow}>
// // //               <Text style={[styles.title, { color: theme.text }]}>{t('reg_crop_lot') ?? 'Register Crop Lot'}</Text>
// // //               </View>
// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// // //               <TextInput
// // //                 placeholder={t('select_crop') ?? 'select crop'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prCrop}
// // //                 onChangeText={setPrCrop}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />

// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
// // //               <TextInput
// // //                 placeholder={t('select_grade') ?? 'select grade'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prGrade}
// // //                 onChangeText={setPrGrade}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />

// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('quantity_label') ?? 'Quantity (quintal)'}</Text>
// // //               <TextInput
// // //                 placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prQuantity}
// // //                 onChangeText={setPrQuantity}
// // //                 keyboardType="numeric"
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />

// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi Location'}</Text>
// // //               <TextInput
// // //                 placeholder={t('select_mandi') ?? 'select mandi'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prMandi}
// // //                 onChangeText={setPrMandi}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />

// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
// // //               <TextInput
// // //                 placeholder={t('enter_date') ?? 'dd-mm-yy'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prExpectedArrival}
// // //                 onChangeText={setPrExpectedArrival}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />

// // //               <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
// // //               <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //             <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>
// // //           </>
// // //         )}
// // //           </View>
// // //         );
// // //     // Note: include dependencies that when changed require header to re-create.
// // //     // we intentionally include the states used inside header so it updates when they change.
// // //     // (selectedTab, mandiName, cropName, etc.)
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [theme, t, selectedTab, mandiName, cropName, stfMandi, stfCrop, horizon, forecastLoading, forecastSummary, prCrop, prGrade, prQuantity, prMandi, prExpectedArrival]);
// // //    // Render a single lot item (FlatList)

// // //     const renderLotItem = useCallback(({ item }: { item: Lot }) => (
// // //     <View style={[styles.lotItem, { borderColor: theme.text ??'#ccc', backgroundColor: theme.background }]}>
// // //       <View style={{ flex: 1 }}>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
// // //       </View>
// // //       <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
// // //       <Text style={styles.removeBtnText}>✕</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   ), [theme, t, removeLot]);

// // //   // Show empty message only when in preregister tab and no lots
// // //   const renderEmpty = useCallback(() => { 
// // //     if (selectedTab !== 'preregister') return null;
// // //     return (
// // //       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
// // //       <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
// // //       </View>
// // //     );
// // //   }, [selectedTab, theme, t]);

// // //   // When not in preregister tab we pass empty array so FlatList doesn't render items
// // //   const listData = selectedTab === 'preregister' ? lots : [];
// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <FlatList
// // //         data={listData}
// // //         keyExtractor={(item) => item.id}
// // //         renderItem={renderLotItem}
// // //         ListHeaderComponent={ListHeaderElement} // Pass the memoized element
// // //         ListEmptyComponent={renderEmpty}
// // //         contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }}
// // //         keyboardShouldPersistTaps="always"
// // //         removeClippedSubviews={false}
// // //       />
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// // //   text: { fontSize: 16, marginBottom: 12 },

// // //   backBtn: {
// // //     alignSelf: 'flex-start',
// // //     paddingVertical: 6,
// // //     paddingHorizontal: 12,
// // //     borderRadius: 6,
// // //     marginBottom: 10,
// // //   },
// // //   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },

// // //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
// // //   tab: { flex: 0.48, padding: 12, borderRadius: 8, alignItems: 'center' },
// // //   tabText: { fontWeight: '600' },
// // //   tabTextSelected: { color: '#fff' },

// // //   //daily/search
// // //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// // //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// // //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// // //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// // //   searchBtnText: { fontWeight: '700' },

// // //   //short-term/forecast
// // //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12,marginTop:8 },
// // //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// // //   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

// // //   horizonRow: { flexDirection: 'row', marginBottom: 12 },
// // //   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
// // //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// // //   horizonText: { color: '#333', fontWeight: '600' },
// // //   horizonTextActive: { color: '#fff', fontWeight: '700' },

// // //   // pre-register inline
// // //   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// // //   formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
// // //   formTitle: { fontSize: 16, fontWeight: '700' },
// // //   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// // //   addBtnText: { fontWeight: '700', color: '#fff' },
// // //   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
// // //   emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
// // //   lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
// // //   lotText: { marginBottom: 6 },
// // //   removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
// // //   removeBtnText: { color: '#fff', fontWeight: '700' },
// // // });

// // import React, { useEffect, useState, useCallback, useMemo } from 'react';
// // import {
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   View,
// //   TextInput,
// //   Alert,
// //   FlatList,
// //   Platform,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// // import { Picker } from '@react-native-picker/picker';

// // type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// // type Lot = {
// //   id: string;
// //   crop: string;
// //   grade: string;
// //   quantity: string;
// //   mandi: string;
// //   expectedArrival: string;
// //   createdAt: number;
// // };

// // export default function SellerDashboard() {
// //   const navigation = useNavigation<PropsNav>();
// //   const goBack = () => navigation.navigate('Dashboard');

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

// //   // Daily search
// //   const [mandiName, setMandiName] = useState('');
// //   const [cropName, setCropName] = useState('');

// //   // Short-term forecast
// //   const [stfMandi, setStfMandi] = useState('');
// //   const [stfCrop, setStfCrop] = useState('');
// //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// //   const [forecastLoading, setForecastLoading] = useState(false);

// //   // Pre-register
// //   const [prCrop, setPrCrop] = useState('');
// //   const [prGrade, setPrGrade] = useState('');
// //   const [prQuantity, setPrQuantity] = useState('');
// //   const [prMandi, setPrMandi] = useState('');
// //   const [prExpectedArrival, setPrExpectedArrival] = useState('');
// //   const [lots, setLots] = useState<Lot[]>([]);
// //   const [phone, setPhone] = useState<string | null>(null);

// //   // Date picker
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [dateValue, setDateValue] = useState<Date>(new Date());

// //   const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

// //   // Options
// //   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
// //   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

// //   const gradeMap: Record<string, string[]> = {
// //     Wheat: ['A', 'B', 'C', 'Other'],
// //     Rice: ['Super', 'Medium', 'Low', 'Other'],
// //     Maize: ['Grade 1', 'Grade 2', 'Grade 3', 'Other'],
// //     Onion: ['Goli', 'Golta', 'Golti', 'Other'],
// //     Other: ['Other'],
// //   };

// //   // Helper: Is value one of the predefined options?
// //   const isPredefined = (value: string, options: string[]) =>
// //     value === '' || options.includes(value) || value === 'Other';

// //   useEffect(() => {
// //     AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
// //       setPhone(p);
// //       if (p) {
// //         AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${p}`).then((j) => {
// //           if (j) {
// //             try {
// //               setLots(JSON.parse(j));
// //             } catch (e) {
// //               console.warn('Failed parse lots', e);
// //             }
// //           }
// //         });
// //       }
// //     });
// //   }, []);

// //   // Reset grade when crop changes
// //   useEffect(() => {
// //     if (!prCrop || isPredefined(prCrop, cropOptions)) {
// //       const grades = gradeMap[prCrop] || [];
// //       if (!grades.includes(prGrade)) setPrGrade('');
// //     }
// //   }, [prCrop]);

// //   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
// //     if (tab === 'short') {
// //       setSelectedTab('short');
// //       setStfMandi(mandiName);
// //       setStfCrop(cropName);
// //     } else {
// //       setSelectedTab(tab);
// //     }
// //   };

// //   const onSearchDaily = () => {
// //     if (!mandiName && !cropName) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop');
// //       return;
// //     }
// //     Alert.alert(t('search') ?? 'Search', `${t('mandi')}: ${mandiName}\n${t('crop')}: ${cropName}`);
// //   };

// //   const getShortTermForecastInline = async () => {
// //     if (!stfMandi || !stfCrop) {
// //       Alert.alert(t('error_title') ?? 'Error', 'Please select mandi and crop');
// //       return;
// //     }
// //     setForecastLoading(true);
// //     const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — Next ${
// //       horizon === '7days' ? '7' : horizon === '14days' ? '14' : '30'
// //     } days`;
// //     setTimeout(() => {
// //       setForecastSummary(summary);
// //       setForecastLoading(false);
// //     }, 400);
// //   };

// //   const addLotInline = async () => {
// //     if (!prCrop) return Alert.alert('Error', 'Please select crop');
// //     if (!prQuantity) return Alert.alert('Error', 'Please enter quantity');
// //     if (!prMandi) return Alert.alert('Error', 'Please select mandi');

// //     const newLot: Lot = {
// //       id: Date.now().toString(),
// //       crop: prCrop,
// //       grade: prGrade || '-',
// //       quantity: prQuantity,
// //       mandi: prMandi,
// //       expectedArrival: prExpectedArrival || '-',
// //       createdAt: Date.now(),
// //     };

// //     const newLots = [newLot, ...lots];
// //     setLots(newLots);
// //     if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));

// //     // Reset form
// //     setPrCrop('');
// //     setPrGrade('');
// //     setPrQuantity('');
// //     setPrMandi('');
// //     setPrExpectedArrival('');
// //     setDateValue(new Date());

// //     Alert.alert('Success', 'Lot added successfully');
// //   };

// //   const removeLot = async (id: string) => {
// //     const filtered = lots.filter((l) => l.id !== id);
// //     setLots(filtered);
// //     if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
// //   };

  
// //   const formatDate = (d: Date) => {
// //     return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
// //   };

// //   const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
// //     if (Platform.OS === 'android') setShowDatePicker(false);
// //     if (selectedDate) {
// //       setDateValue(selectedDate);
// //       setPrExpectedArrival(formatDate(selectedDate));
// //     }
// //   };

// //   const openDatePicker = () => {
// //     if (prExpectedArrival) {
// //       const parts = prExpectedArrival.split('-').map(p => parseInt(p, 10));
// //       if (parts.length === 3 && !isNaN(parts[0])) {
// //         setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
// //       }
// //     }
// //     setShowDatePicker(true);
// //   };

// //   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

// //   const ListHeaderElement = useMemo(() => (
// //     <View>
// //       <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// //         <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back') || 'Back'}</Text>
// //       </TouchableOpacity>

// //       <Text style={[styles.title, { color: theme.text }]}>{t('seller_dashboard') || 'Seller Dashboard'}</Text>
// //       <Text style={[styles.text, { color: theme.text }]}>{t('seller_msg') || 'Welcome Seller!'}</Text>

// //       <View style={styles.tabsRow}>
// //         {(['daily', 'short', 'preregister'] as const).map(tab => (
// //           <TouchableOpacity
// //             key={tab}
// //             style={[
// //               styles.tab,
// //               selectedTab === tab
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => onSelectTab(tab)}
// //           >
// //             <Text
// //               style={[
// //                 styles.tabText,
// //                 { color: selectedTab === tab ? '#fff' : theme.text },
// //                 selectedTab === tab && styles.tabTextSelected,
// //               ]}
// //             >
// //               {tab === 'daily' ? t('daily_market_price') : tab === 'short' ? t('short_term_forecast') : t('pre_register_lot')}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>

// //       {/* === DAILY TAB === */}
// //       {selectedTab === 'daily' && (
// //         <>
// //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker
// //                 selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'}
// //                 onValueChange={(v) => v !== 'Other' ? setMandiName(v) : null}
// //               >
// //                 <Picker.Item label="Select mandi" value="" />
// //                 {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(mandiName, mandiOptions) && mandiName) && (
// //               <TextInput
// //                 placeholder="Type mandi name"
// //                 value={mandiName}
// //                 onChangeText={setMandiName}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker
// //                 selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'}
// //                 onValueChange={(v) => v !== 'Other' ? setCropName(v) : null}
// //               >
// //                 <Picker.Item label="Select crop" value="" />
// //                 {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(cropName, cropOptions) && cropName) && (
// //               <TextInput
// //                 placeholder="Type crop name"
// //                 value={cropName}
// //                 onChangeText={setCropName}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={onSearchDaily}>
// //               <Text style={styles.searchBtnText}>Search</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
// //             <Text style={[styles.chartTitle, { color: theme.text }]}>Daily Market Price</Text>
// //             <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
// //               <Text style={{ color: '#666' }}>Chart will appear here</Text>
// //             </View>
// //           </View>
// //         </>
// //       )}

// //       {/* === SHORT-TERM FORECAST TAB === */}
// //       {selectedTab === 'short' && (
// //         <>
// //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker
// //                 selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'}
// //                 onValueChange={(v) => v !== 'Other' ? setStfMandi(v) : null}
// //               >
// //                 <Picker.Item label="Select mandi" value="" />
// //                 {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (
// //               <TextInput
// //                 placeholder="Type mandi"
// //                 value={stfMandi}
// //                 onChangeText={setStfMandi}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker
// //                 selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'}
// //                 onValueChange={(v) => v !== 'Other' ? setStfCrop(v) : null}
// //               >
// //                 <Picker.Item label="Select crop" value="" />
// //                 {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(stfCrop, cropOptions) && stfCrop) && (
// //               <TextInput
// //                 placeholder="Type crop"
// //                 value={stfCrop}
// //                 onChangeText={setStfCrop}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
// //             <View style={styles.horizonRow}>
// //               {(['7days', '14days', '30days'] as const).map(d => (
// //                 <TouchableOpacity
// //                   key={d}
// //                   style={[styles.horizonBtn, horizon === d && styles.horizonBtnActive]}
// //                   onPress={() => setHorizon(d)}
// //                 >
// //                   <Text style={horizon === d ? styles.horizonTextActive : styles.horizonText}>
// //                     {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>

// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary }]} onPress={getShortTermForecastInline}>
// //               <Text style={styles.searchBtnText}>Get Forecast</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
// //             <Text style={[styles.chartTitle, { color: theme.text }]}>Short-term Forecast</Text>
// //             <View style={styles.chartPlaceholder}>
// //               <Text style={{ color: '#666' }}>
// //                 {forecastLoading ? 'Loading...' : forecastSummary ?? 'Forecast chart will appear here'}
// //               </Text>
// //             </View>
// //             {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
// //           </View>
// //         </>
// //       )}

// //       {/* === PRE-REGISTER TAB === */}
// //       {selectedTab === 'preregister' && (
// //         <>
// //           <View style={[styles.formBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
// //             <Text style={[styles.title, { color: theme.text, marginBottom: 16 }]}>
// //               {t('reg_crop_lot') || 'Register Crop Lot'}
// //             </Text>

// //             <Text style={[styles.formTitle, { color: theme.text }]}>Crop</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker
// //                 selectedValue={isPredefined(prCrop, cropOptions) ? prCrop : 'Other'}
// //                 onValueChange={(v) => v !== 'Other' ? setPrCrop(v) : null}
// //               >
// //                 <Picker.Item label="Select crop" value="" />
// //                 {cropOptions.map(c => <Picker.Item key={c} label={c} value={c} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(prCrop, cropOptions) && prCrop) && (
// //               <TextInput
// //                 placeholder="Type crop name"
// //                 value={prCrop}
// //                 onChangeText={setPrCrop}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.formTitle, { color: theme.text }]}>Grade</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker selectedValue={prGrade} onValueChange={setPrGrade}>
// //                 <Picker.Item label="Select grade" value="" />
// //                 {currentGrades.map(g => <Picker.Item key={g} label={g} value={g} />)}
// //               </Picker>
// //             </View>
// //             {prGrade === 'Other' && (
// //               <TextInput
// //                 placeholder="Type grade"
// //                 value={prGrade}
// //                 onChangeText={setPrGrade}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.formTitle, { color: theme.text }]}>Quantity (quintal)</Text>
// //             <TextInput
// //               placeholder="Enter quantity"
// //               value={prQuantity}
// //               onChangeText={setPrQuantity}
// //               keyboardType="numeric"
// //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //             />

// //             <Text style={[styles.formTitle, { color: theme.text }]}>Mandi</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker
// //                 selectedValue={isPredefined(prMandi, mandiOptions) ? prMandi : 'Other'}
// //                 onValueChange={(v) => v !== 'Other' ? setPrMandi(v) : null}
// //               >
// //                 <Picker.Item label="Select mandi" value="" />
// //                 {mandiOptions.map(m => <Picker.Item key={m} label={m} value={m} />)}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {(!isPredefined(prMandi, mandiOptions) && prMandi) && (
// //               <TextInput
// //                 placeholder="Type mandi"
// //                 value={prMandi}
// //                 onChangeText={setPrMandi}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.formTitle, { color: theme.text }]}>Expected Arrival Date</Text>
// //             <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]} onPress={openDatePicker}>
// //               <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
// //                 {prExpectedArrival || 'dd-mm-yyyy'}
// //               </Text>
// //             </TouchableOpacity>
// //             {prExpectedArrival && (
// //               <TouchableOpacity onPress={() => setPrExpectedArrival('')} style={{ marginTop: 6 }}>
// //                 <Text style={{ color: theme.primary, fontSize: 12 }}>Clear</Text>
// //               </TouchableOpacity>
// //             )}

// //             {showDatePicker && (
// //               <DateTimePicker
// //                 value={dateValue}
// //                 mode="date"
// //                 display={Platform.OS === 'android' ? 'default' : 'spinner'}
// //                 onChange={onChangeDate}
// //               />
// //             )}

// //             <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary }]} onPress={addLotInline}>
// //               <Text style={styles.addBtnText}>Add Lot</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //             {t('your_registered_lots') || 'Your Registered Lots'}
// //           </Text>
// //         </>
// //       )}
// //     </View>
// //   ), [
// //     theme, t, selectedTab, mandiName, cropName, stfMandi, stfCrop, horizon,
// //     forecastLoading, forecastSummary, prCrop, prGrade, prQuantity, prMandi,
// //     prExpectedArrival, lots.length
// //   ]);

// //   const renderLotItem = useCallback(({ item }: { item: Lot }) => (
// //     <View style={[styles.lotItem, { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background }]}>
// //       <View style={{ flex: 1 }}>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>Crop: </Text>{item.crop}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>Grade: </Text>{item.grade}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>Qty: </Text>{item.quantity}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>Mandi: </Text>{item.mandi}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>Arrival: </Text>{item.expectedArrival}</Text>
// //       </View>
// //       <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
// //         <Text style={styles.removeBtnText}>×</Text>
// //       </TouchableOpacity>
// //     </View>
// //   ), [theme, t, removeLot]);

// //   const renderEmpty = useCallback(() => {
// //     if (selectedTab !== 'preregister') return null;
// //     return (
// //       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
// //         <Text style={{ color: theme.text ?? '#666' }}>No lots registered yet</Text>
// //       </View>
// //     );
// //   }, [selectedTab, theme]);

// //   const listData = selectedTab === 'preregister' ? lots : [];

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <FlatList
// //         data={listData}
// //         keyExtractor={item => item.id}
// //         renderItem={renderLotItem}
// //         ListHeaderComponent={ListHeaderElement}
// //         ListEmptyComponent={renderEmpty}
// //         contentContainerStyle={{ paddingBottom: 50 }}
// //         keyboardShouldPersistTaps="always"
// //       />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
// //   backText: { fontWeight: '700', fontSize: 16 },
// //   title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
// //   text: { fontSize: 15, marginBottom: 16 },
// //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
// //   tab: { flex: 0.32, padding: 12, borderRadius: 10, alignItems: 'center' },
// //   tabText: { fontWeight: '600' },
// //   tabTextSelected: { fontWeight: 'bold' },

// //   searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
// //   searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
// //   pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
// //   searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

// //   chartBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
// //   chartTitle: { fontWeight: '700', marginBottom: 12 },
// //   chartPlaceholder: { height: 200, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },

// //   horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
// //   horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
// //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// //   horizonText: { fontWeight: 'bold' },
// //   horizonTextActive: { color: '#fff', fontWeight: 'bold' },

// //   formBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
// //   formTitle: { fontWeight: '700', marginTop: 16, marginBottom: 6 },
// //   addBtn: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
// //   addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

// //   sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12 },
// //   emptyBox: { borderWidth: 1, borderRadius: 12, padding: 20, alignItems: 'center' },
// //   lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 10, alignItems: 'center' },
// //   lotText: { marginBottom: 6 },
// //   removeBtn: { backgroundColor: '#e53e3e', padding: 10, borderRadius: 8, marginLeft: 12 },
// //   removeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
// // });

// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
//   Alert,
//   FlatList,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';

// type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// type Lot = {
//   id: string;
//   crop: string;
//   grade: string;
//   quantity: string;
//   mandi: string;
//   expectedArrival: string;
//   createdAt: number;
// };

// export default function SellerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const goBack = () => navigation.navigate('Dashboard');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

//   // Daily search
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // Short-term forecast
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   // Pre-register
//   const [prCrop, setPrCrop] = useState('');
//   const [prGrade, setPrGrade] = useState('');
//   const [prQuantity, setPrQuantity] = useState('');
//   const [prMandi, setPrMandi] = useState('');
//   const [prExpectedArrival, setPrExpectedArrival] = useState('');
//   const [lots, setLots] = useState<Lot[]>([]);
//   const [phone, setPhone] = useState<string | null>(null);

//   // Date picker
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [dateValue, setDateValue] = useState<Date>(new Date());

//   const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

//   // Options
//   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
//   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

//   const gradeMap: Record<string, string[]> = {
//     Wheat: ['A', 'B', 'C', 'Other'],
//     Rice: ['Super', 'Medium', 'Low', 'Other'],
//     Maize: ['Grade 1', 'Grade 2', 'Grade 3', 'Other'],
//     Onion: ['Goli', 'Golta', 'Golti', 'Other'],
//     Other: ['Other'],
//   };

//   // Helper: Is value one of the predefined options?
//   const isPredefined = (value: string, options: string[]) =>
//     value === '' || options.includes(value) || value === 'Other';

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
//       setPhone(p);
//       if (p) {
//         AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${p}`).then((j) => {
//           if (j) {
//             try {
//               setLots(JSON.parse(j));
//             } catch (e) {
//               console.warn('Failed parse lots', e);
//             }
//           }
//         });
//       }
//     });
//   }, []);

//   // Reset grade when crop changes
//   useEffect(() => {
//     if (!prCrop || isPredefined(prCrop, cropOptions)) {
//       const grades = gradeMap[prCrop] || [];
//       if (!grades.includes(prGrade)) setPrGrade('');
//     }
//   }, [prCrop, prGrade]);

//   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
//     if (tab === 'short') {
//       setSelectedTab('short');
//       setStfMandi(mandiName);
//       setStfCrop(cropName);
//     } else {
//       setSelectedTab(tab);
//     }
//   };

//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop');
//       return;
//     }
//     Alert.alert(t('search') ?? 'Search', `${t('mandi')}: ${mandiName}\n${t('crop')}: ${cropName}`);
//   };

//   const getShortTermForecastInline = async () => {
//     if (!stfMandi || !stfCrop) {
//       Alert.alert(t('error_title') ?? 'Error', 'Please select mandi and crop');
//       return;
//     }
//     setForecastLoading(true);
//     const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — Next ${
//       horizon === '7days' ? '7' : horizon === '14days' ? '14' : '30'
//     } days`;
//     setTimeout(() => {
//       setForecastSummary(summary);
//       setForecastLoading(false);
//     }, 400);
//   };

//   const addLotInline = useCallback(async () => {
//     if (!prCrop) return Alert.alert('Error', 'Please select crop');
//     if (!prQuantity) return Alert.alert('Error', 'Please enter quantity');
//     if (!prMandi) return Alert.alert('Error', 'Please select mandi');

//     const newLot: Lot = {
//       id: Date.now().toString(),
//       crop: prCrop,
//       grade: prGrade || '-',
//       quantity: prQuantity,
//       mandi: prMandi,
//       expectedArrival: prExpectedArrival || '-',
//       createdAt: Date.now(),
//     };

//     const newLots = [newLot, ...lots];
//     setLots(newLots);
//     if (phone) {
//       await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));
//     }

//     // Reset form
//     setPrCrop('');
//     setPrGrade('');
//     setPrQuantity('');
//     setPrMandi('');
//     setPrExpectedArrival('');
//     setDateValue(new Date());

//     Alert.alert('Success', 'Lot added successfully');
//   }, [prCrop, prGrade, prQuantity, prMandi, prExpectedArrival, lots, phone]);

//   const removeLot = useCallback(
//     async (id: string) => {
//       const filtered = lots.filter((l) => l.id !== id);
//       setLots(filtered);
//       if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
//     },
//     [lots, phone]
//   );

//   const formatDate = (d: Date) => {
//     return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
//   };

//   const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
//     if (Platform.OS === 'android') setShowDatePicker(false);
//     if (selectedDate) {
//       setDateValue(selectedDate);
//       setPrExpectedArrival(formatDate(selectedDate));
//     }
//   };

//   const openDatePicker = () => {
//     if (prExpectedArrival) {
//       const parts = prExpectedArrival.split('-').map((p) => parseInt(p, 10));
//       if (parts.length === 3 && !isNaN(parts[0])) {
//         setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
//       } else {
//         setDateValue(new Date());
//       }
//     } else {
//       setDateValue(new Date());
//     }
//     setShowDatePicker(true);
//   };

//   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

//   const ListHeaderElement = useMemo(
//     () => (
//       <View>
//         <TouchableOpacity
//           onPress={goBack}
//           style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}
//         >
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>
//             {t('back') || 'Back'}
//           </Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>
//           {t('seller_dashboard') || 'Seller Dashboard'}
//         </Text>
//         <Text style={[styles.text, { color: theme.text }]}>
//           {t('seller_msg') || 'Welcome Seller!'}
//         </Text>

//         <View style={styles.tabsRow}>
//           {(['daily', 'short', 'preregister'] as const).map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tab,
//                 selectedTab === tab
//                   ? { backgroundColor: theme.primary ?? '#3182ce' }
//                   : { backgroundColor: theme.background ?? '#f0f0f0' },
//               ]}
//               onPress={() => onSelectTab(tab)}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   { color: selectedTab === tab ? '#fff' : theme.text },
//                   selectedTab === tab && styles.tabTextSelected,
//                 ]}
//               >
//                 {tab === 'daily'
//                   ? t('daily_market_price')
//                   : tab === 'short'
//                   ? t('short_term_forecast')
//                   : t('pre_register_lot')}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* === DAILY TAB === */}
//         {selectedTab === 'daily' && (
//           <>
//             <View
//               style={[
//                 styles.searchBox,
//                 { backgroundColor: theme.background, borderColor: theme.text },
//               ]}
//             >
//               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'}
//                   onValueChange={(v) => (v !== 'Other' ? setMandiName(v) : null)}
//                 >
//                   <Picker.Item label="Select mandi" value="" />
//                   {mandiOptions.map((m) => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {!isPredefined(mandiName, mandiOptions) && mandiName && (
//                 <TextInput
//                   placeholder="Type mandi name"
//                   value={mandiName}
//                   onChangeText={setMandiName}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'}
//                   onValueChange={(v) => (v !== 'Other' ? setCropName(v) : null)}
//                 >
//                   <Picker.Item label="Select crop" value="" />
//                   {cropOptions.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {!isPredefined(cropName, cropOptions) && cropName && (
//                 <TextInput
//                   placeholder="Type crop name"
//                   value={cropName}
//                   onChangeText={setCropName}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <TouchableOpacity
//                 style={[styles.searchBtn, { backgroundColor: theme.primary }]}
//                 onPress={onSearchDaily}
//               >
//                 <Text style={styles.searchBtnText}>Search</Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={[
//                 styles.chartBox,
//                 { borderColor: theme.text, backgroundColor: theme.background },
//               ]}
//             >
//               <Text style={[styles.chartTitle, { color: theme.text }]}>
//                 Daily Market Price
//               </Text>
//               <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
//                 <Text style={{ color: '#666' }}>Chart will appear here</Text>
//               </View>
//             </View>
//           </>
//         )}

//         {/* === SHORT-TERM FORECAST TAB === */}
//         {selectedTab === 'short' && (
//           <>
//             <View
//               style={[
//                 styles.searchBox,
//                 { backgroundColor: theme.background, borderColor: theme.text },
//               ]}
//             >
//               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'}
//                   onValueChange={(v) => (v !== 'Other' ? setStfMandi(v) : null)}
//                 >
//                   <Picker.Item label="Select mandi" value="" />
//                   {mandiOptions.map((m) => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {!isPredefined(stfMandi, mandiOptions) && stfMandi && (
//                 <TextInput
//                   placeholder="Type mandi"
//                   value={stfMandi}
//                   onChangeText={setStfMandi}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'}
//                   onValueChange={(v) => (v !== 'Other' ? setStfCrop(v) : null)}
//                 >
//                   <Picker.Item label="Select crop" value="" />
//                   {cropOptions.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {!isPredefined(stfCrop, cropOptions) && stfCrop && (
//                 <TextInput
//                   placeholder="Type crop"
//                   value={stfCrop}
//                   onChangeText={setStfCrop}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
//               <View style={styles.horizonRow}>
//                 {(['7days', '14days', '30days'] as const).map((d) => (
//                   <TouchableOpacity
//                     key={d}
//                     style={[
//                       styles.horizonBtn,
//                       horizon === d && styles.horizonBtnActive,
//                     ]}
//                     onPress={() => setHorizon(d)}
//                   >
//                     <Text
//                       style={horizon === d ? styles.horizonTextActive : styles.horizonText}
//                     >
//                       {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <TouchableOpacity
//                 style={[styles.searchBtn, { backgroundColor: theme.primary }]}
//                 onPress={getShortTermForecastInline}
//               >
//                 <Text style={styles.searchBtnText}>Get Forecast</Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={[
//                 styles.chartBox,
//                 { borderColor: theme.text, backgroundColor: theme.background },
//               ]}
//             >
//               <Text style={[styles.chartTitle, { color: theme.text }]}>
//                 Short-term Forecast
//               </Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: '#666' }}>
//                   {forecastLoading
//                     ? 'Loading...'
//                     : forecastSummary ?? 'Forecast chart will appear here'}
//                 </Text>
//               </View>
//               {forecastSummary && (
//                 <Text style={{ color: theme.text, marginTop: 8 }}>
//                   {forecastSummary}
//                 </Text>
//               )}
//             </View>
//           </>
//         )}

//         {/* === PRE-REGISTER TAB === */}
//         {selectedTab === 'preregister' && (
//           <>
//             <View
//               style={[
//                 styles.formBox,
//                 { backgroundColor: theme.background, borderColor: theme.text },
//               ]}
//             >
//               <Text style={[styles.title, { color: theme.text, marginBottom: 16 }]}>
//                 {t('reg_crop_lot') || 'Register Crop Lot'}
//               </Text>

//               <Text style={[styles.formTitle, { color: theme.text }]}>Crop</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(prCrop, cropOptions) ? prCrop : 'Other'}
//                   onValueChange={(v) => (v !== 'Other' ? setPrCrop(v) : null)}
//                 >
//                   <Picker.Item label="Select crop" value="" />
//                   {cropOptions.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {!isPredefined(prCrop, cropOptions) && prCrop && (
//                 <TextInput
//                   placeholder="Type crop name"
//                   value={prCrop}
//                   onChangeText={setPrCrop}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.formTitle, { color: theme.text }]}>Grade</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker selectedValue={prGrade} onValueChange={setPrGrade}>
//                   <Picker.Item label="Select grade" value="" />
//                   {currentGrades.map((g) => (
//                     <Picker.Item key={g} label={g} value={g} />
//                   ))}
//                 </Picker>
//               </View>
//               {prGrade === 'Other' && (
//                 <TextInput
//                   placeholder="Type grade"
//                   value={prGrade}
//                   onChangeText={setPrGrade}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 Quantity (quintal)
//               </Text>
//               <TextInput
//                 placeholder="Enter quantity"
//                 value={prQuantity}
//                 onChangeText={setPrQuantity}
//                 keyboardType="numeric"
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <Text style={[styles.formTitle, { color: theme.text }]}>Mandi</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(prMandi, mandiOptions) ? prMandi : 'Other'}
//                   onValueChange={(v) => (v !== 'Other' ? setPrMandi(v) : null)}
//                 >
//                   <Picker.Item label="Select mandi" value="" />
//                   {mandiOptions.map((m) => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {!isPredefined(prMandi, mandiOptions) && prMandi && (
//                 <TextInput
//                   placeholder="Type mandi"
//                   value={prMandi}
//                   onChangeText={setPrMandi}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               {/* Expected Arrival with calendar icon */}
//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 Expected Arrival Date
//               </Text>

//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {/* Date display */}
//                 <TouchableOpacity
//                   style={[
//                     styles.input,
//                     { justifyContent: 'center', borderColor: theme.text, flex: 1 },
//                   ]}
//                   onPress={openDatePicker}
//                 >
//                   <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
//                     {prExpectedArrival || 'dd-mm-yyyy'}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Calendar icon button */}
//                 <TouchableOpacity
//                   onPress={openDatePicker}
//                   style={{ marginLeft: 8, padding: 8 }}
//                 >
//                   <Text style={{ fontSize: 22 }}>📅</Text>
//                 </TouchableOpacity>
//               </View>

//               {prExpectedArrival && (
//                 <TouchableOpacity
//                   onPress={() => setPrExpectedArrival('')}
//                   style={{ marginTop: 6 }}
//                 >
//                   <Text style={{ color: theme.primary, fontSize: 12 }}>Clear Date</Text>
//                 </TouchableOpacity>
//               )}

//               {showDatePicker && (
//                 <DateTimePicker
//                   value={dateValue}
//                   mode="date"
//                   display={Platform.OS === 'android' ? 'spinner' : 'default'}
//                   onChange={onChangeDate}
//                   maximumDate={new Date(2100, 11, 31)}
//                   minimumDate={new Date(2000, 0, 1)}
//                 />
//               )}

//               <TouchableOpacity
//                 style={[styles.addBtn, { backgroundColor: theme.primary }]}
//                 onPress={addLotInline}
//               >
//                 <Text style={styles.addBtnText}>Add Lot</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={[styles.sectionTitle, { color: theme.text }]}>
//               {t('your_registered_lots') || 'Your Registered Lots'}
//             </Text>
//           </>
//         )}
//       </View>
//     ),
//     [
//       theme,
//       t,
//       selectedTab,
//       mandiName,
//       cropName,
//       stfMandi,
//       stfCrop,
//       horizon,
//       forecastLoading,
//       forecastSummary,
//       prCrop,
//       prGrade,
//       prQuantity,
//       prMandi,
//       prExpectedArrival,
//       lots.length,
//       openDatePicker,
//       addLotInline,
//     ]
//   );

//   const renderLotItem = useCallback(
//     ({ item }: { item: Lot }) => (
//       <View
//         style={[
//           styles.lotItem,
//           { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background },
//         ]}
//       >
//         <View style={{ flex: 1 }}>
//           <Text style={[styles.lotText, { color: theme.text }]}>
//             <Text style={{ fontWeight: '700' }}>Crop: </Text>
//             {item.crop}
//           </Text>
//           <Text style={[styles.lotText, { color: theme.text }]}>
//             <Text style={{ fontWeight: '700' }}>Grade: </Text>
//             {item.grade}
//           </Text>
//           <Text style={[styles.lotText, { color: theme.text }]}>
//             <Text style={{ fontWeight: '700' }}>Qty: </Text>
//             {item.quantity}
//           </Text>
//           <Text style={[styles.lotText, { color: theme.text }]}>
//             <Text style={{ fontWeight: '700' }}>Mandi: </Text>
//             {item.mandi}
//           </Text>
//           <Text style={[styles.lotText, { color: theme.text }]}>
//             <Text style={{ fontWeight: '700' }}>Arrival: </Text>
//             {item.expectedArrival}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
//           <Text style={styles.removeBtnText}>×</Text>
//         </TouchableOpacity>
//       </View>
//     ),
//     [theme, removeLot]
//   );

//   const renderEmpty = useCallback(() => {
//     if (selectedTab !== 'preregister') return null;
//     return (
//       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
//         <Text style={{ color: theme.text ?? '#666' }}>No lots registered yet</Text>
//       </View>
//     );
//   }, [selectedTab, theme]);

//   const listData = selectedTab === 'preregister' ? lots : [];

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <FlatList
//         data={listData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderLotItem}
//         ListHeaderComponent={ListHeaderElement}
//         ListEmptyComponent={renderEmpty}
//         contentContainerStyle={{ paddingBottom: 50 }}
//         keyboardShouldPersistTaps="always"
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: {
//     alignSelf: 'flex-start',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 15, marginBottom: 16 },
//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
//   tab: { flex: 0.32, padding: 12, borderRadius: 10, alignItems: 'center' },
//   tabText: { fontWeight: '600' },
//   tabTextSelected: { fontWeight: 'bold' },

//   searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
//   searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
//   pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
//   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
//   searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

//   chartBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
//   chartTitle: { fontWeight: '700', marginBottom: 12 },
//   chartPlaceholder: {
//     height: 200,
//     borderWidth: 1,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//   },

//   horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
//   horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { fontWeight: 'bold' },
//   horizonTextActive: { color: '#fff', fontWeight: 'bold' },

//   formBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
//   formTitle: { fontWeight: '700', marginTop: 16, marginBottom: 6 },
//   addBtn: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
//   addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

//   sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12 },
//   emptyBox: { borderWidth: 1, borderRadius: 12, padding: 20, alignItems: 'center' },
//   lotItem: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   lotText: { marginBottom: 6 },
//   removeBtn: { backgroundColor: '#e53e3e', padding: 10, borderRadius: 8, marginLeft: 12 },
//   removeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
// });

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
};

export default function SellerDashboard() {
  const navigation = useNavigation<PropsNav>();
  const goBack = () => navigation.navigate('Dashboard');

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

  // Daily search
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');

  // Short-term forecast
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  // Pre-register
  const [prCrop, setPrCrop] = useState('');
  const [prGrade, setPrGrade] = useState('');
  const [prQuantity, setPrQuantity] = useState('');
  const [prMandi, setPrMandi] = useState('');
  const [prExpectedArrival, setPrExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  // Date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

  // Options
  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
  const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

  const gradeMap: Record<string, string[]> = {
    Wheat: ['A', 'B', 'C', 'Other'],
    Rice: ['Super', 'Medium', 'Low', 'Other'],
    Maize: ['Grade 1', 'Grade 2', 'Grade 3', 'Other'],
    Onion: ['Goli', 'Golta', 'Golti', 'Other'],
    Other: ['Other'],
  };

  // Helper: Is value one of the predefined options?
  const isPredefined = (value: string, options: string[]) =>
    value === '' || options.includes(value) || value === 'Other';

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
      setPhone(p);
      if (p) {
        AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${p}`).then((j) => {
          if (j) {
            try {
              setLots(JSON.parse(j));
            } catch (e) {
              console.warn('Failed parse lots', e);
            }
          }
        });
      }
    });
  }, []);

  // Reset grade when crop changes
  useEffect(() => {
    if (!prCrop || isPredefined(prCrop, cropOptions)) {
      const grades = gradeMap[prCrop] || [];
      if (!grades.includes(prGrade)) setPrGrade('');
    }
  }, [prCrop, prGrade]);

  const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
    if (tab === 'short') {
      setSelectedTab('short');
      setStfMandi(mandiName);
      setStfCrop(cropName);
    } else {
      setSelectedTab(tab);
    }
  };

  const onSearchDaily = () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop');
      return;
    }
    Alert.alert(t('search') ?? 'Search', `${t('mandi')}: ${mandiName}\n${t('crop')}: ${cropName}`);
  };

  const getShortTermForecastInline = async () => {
    if (!stfMandi || !stfCrop) {
      Alert.alert(t('error_title') ?? 'Error', 'Please select mandi and crop');
      return;
    }
    setForecastLoading(true);
    const summary = `Short term forecast: ${stfCrop} at ${stfMandi} — Next ${
      horizon === '7days' ? '7' : horizon === '14days' ? '14' : '30'
    } days`;
    setTimeout(() => {
      setForecastSummary(summary);
      setForecastLoading(false);
    }, 400);
  };

  const addLotInline = useCallback(
    async () => {
      if (!prCrop) return Alert.alert('Error', 'Please select crop');
      if (!prQuantity) return Alert.alert('Error', 'Please enter quantity');
      if (!prMandi) return Alert.alert('Error', 'Please select mandi');

      const newLot: Lot = {
        id: Date.now().toString(),
        crop: prCrop,
        grade: prGrade || '-',
        quantity: prQuantity,
        mandi: prMandi,
        expectedArrival: prExpectedArrival || '-',
        createdAt: Date.now(),
      };

      const newLots = [newLot, ...lots];
      setLots(newLots);
      if (phone) {
        await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));
      }

      // Reset form
      setPrCrop('');
      setPrGrade('');
      setPrQuantity('');
      setPrMandi('');
      setPrExpectedArrival('');
      setDateValue(new Date());

      Alert.alert('Success', 'Lot added successfully');
    },
    [prCrop, prGrade, prQuantity, prMandi, prExpectedArrival, lots, phone]
  );

  const removeLot = useCallback(
    async (id: string) => {
      const filtered = lots.filter((l) => l.id !== id);
      setLots(filtered);
      if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
    },
    [lots, phone]
  );

  const formatDate = (d: Date) => {
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) {
      setDateValue(selectedDate);
      setPrExpectedArrival(formatDate(selectedDate));
    }
  };

  const openDatePicker = () => {
    if (prExpectedArrival) {
      const parts = prExpectedArrival.split('-').map((p) => parseInt(p, 10));
      if (parts.length === 3 && !isNaN(parts[0])) {
        setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
      } else {
        setDateValue(new Date());
      }
    } else {
      setDateValue(new Date());
    }
    setShowDatePicker(true);
  };

  const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

  const ListHeaderElement = useMemo(
    () => (
      <View>
        <TouchableOpacity
          onPress={goBack}
          style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}
        >
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>
            {t('back') || 'Back'}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>
          {t('seller_dashboard') || 'Seller Dashboard'}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t('seller_msg') || 'Welcome Seller!'}
        </Text>

        <View style={styles.tabsRow}>
          {(['daily', 'short', 'preregister'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab
                  ? { backgroundColor: theme.primary ?? '#3182ce' }
                  : { backgroundColor: theme.background ?? '#f0f0f0' },
              ]}
              onPress={() => onSelectTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === tab ? '#fff' : theme.text },
                  selectedTab === tab && styles.tabTextSelected,
                ]}
              >
                {tab === 'daily'
                  ? t('daily_market_price')
                  : tab === 'short'
                  ? t('short_term_forecast')
                  : t('pre_register_lot')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* === DAILY TAB === */}
        {selectedTab === 'daily' && (
          <>
            <View
              style={[
                styles.searchBox,
                { backgroundColor: theme.background, borderColor: theme.text },
              ]}
            >
              <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'}
                  onValueChange={(v) => (v !== 'Other' ? setMandiName(v) : null)}
                >
                  <Picker.Item label="Select mandi" value="" />
                  {mandiOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {!isPredefined(mandiName, mandiOptions) && mandiName && (
                <TextInput
                  placeholder="Type mandi name"
                  value={mandiName}
                  onChangeText={setMandiName}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'}
                  onValueChange={(v) => (v !== 'Other' ? setCropName(v) : null)}
                >
                  <Picker.Item label="Select crop" value="" />
                  {cropOptions.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {!isPredefined(cropName, cropOptions) && cropName && (
                <TextInput
                  placeholder="Type crop name"
                  value={cropName}
                  onChangeText={setCropName}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <TouchableOpacity
                style={[styles.searchBtn, { backgroundColor: theme.primary }]}
                onPress={onSearchDaily}
              >
                <Text style={styles.searchBtnText}>Search</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartBox,
                { borderColor: theme.text, backgroundColor: theme.background },
              ]}
            >
              <Text style={[styles.chartTitle, { color: theme.text }]}>
                Daily Market Price
              </Text>
              <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
                <Text style={{ color: '#666' }}>Chart will appear here</Text>
              </View>
            </View>
          </>
        )}

        {/* === SHORT-TERM FORECAST TAB === */}
        {selectedTab === 'short' && (
          <>
            <View
              style={[
                styles.searchBox,
                { backgroundColor: theme.background, borderColor: theme.text },
              ]}
            >
              <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'}
                  onValueChange={(v) => (v !== 'Other' ? setStfMandi(v) : null)}
                >
                  <Picker.Item label="Select mandi" value="" />
                  {mandiOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {!isPredefined(stfMandi, mandiOptions) && stfMandi && (
                <TextInput
                  placeholder="Type mandi"
                  value={stfMandi}
                  onChangeText={setStfMandi}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'}
                  onValueChange={(v) => (v !== 'Other' ? setStfCrop(v) : null)}
                >
                  <Picker.Item label="Select crop" value="" />
                  {cropOptions.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {!isPredefined(stfCrop, cropOptions) && stfCrop && (
                <TextInput
                  placeholder="Type crop"
                  value={stfCrop}
                  onChangeText={setStfCrop}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
              <View style={styles.horizonRow}>
                {(['7days', '14days', '30days'] as const).map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.horizonBtn,
                      horizon === d && styles.horizonBtnActive,
                    ]}
                    onPress={() => setHorizon(d)}
                  >
                    <Text
                      style={horizon === d ? styles.horizonTextActive : styles.horizonText}
                    >
                      {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.searchBtn, { backgroundColor: theme.primary }]}
                onPress={getShortTermForecastInline}
              >
                <Text style={styles.searchBtnText}>Get Forecast</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartBox,
                { borderColor: theme.text, backgroundColor: theme.background },
              ]}
            >
              <Text style={[styles.chartTitle, { color: theme.text }]}>
                Short-term Forecast
              </Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: '#666' }}>
                  {forecastLoading
                    ? 'Loading...'
                    : forecastSummary ?? 'Forecast chart will appear here'}
                </Text>
              </View>
              {forecastSummary && (
                <Text style={{ color: theme.text, marginTop: 8 }}>
                  {forecastSummary}
                </Text>
              )}
            </View>
          </>
        )}

        {/* === PRE-REGISTER TAB === */}
        {selectedTab === 'preregister' && (
          <>
            <View
              style={[
                styles.formBox,
                { backgroundColor: theme.background, borderColor: theme.text },
              ]}
            >
              <Text style={[styles.title, { color: theme.text, marginBottom: 16 }]}>
                {t('reg_crop_lot') || 'Register Crop Lot'}
              </Text>

              <Text style={[styles.formTitle, { color: theme.text }]}>Crop</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isPredefined(prCrop, cropOptions) ? prCrop : 'Other'}
                  onValueChange={(v) => (v !== 'Other' ? setPrCrop(v) : null)}
                >
                  <Picker.Item label="Select crop" value="" />
                  {cropOptions.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {!isPredefined(prCrop, cropOptions) && prCrop && (
                <TextInput
                  placeholder="Type crop name"
                  value={prCrop}
                  onChangeText={setPrCrop}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.formTitle, { color: theme.text }]}>Grade</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={prGrade} onValueChange={setPrGrade}>
                  <Picker.Item label="Select grade" value="" />
                  {currentGrades.map((g) => (
                    <Picker.Item key={g} label={g} value={g} />
                  ))}
                </Picker>
              </View>
              {prGrade === 'Other' && (
                <TextInput
                  placeholder="Type grade"
                  value={prGrade}
                  onChangeText={setPrGrade}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.formTitle, { color: theme.text }]}>
                Quantity (quintal)
              </Text>
              <TextInput
                placeholder="Enter quantity"
                value={prQuantity}
                onChangeText={setPrQuantity}
                keyboardType="numeric"
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.formTitle, { color: theme.text }]}>Mandi</Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isPredefined(prMandi, mandiOptions) ? prMandi : 'Other'}
                  onValueChange={(v) => (v !== 'Other' ? setPrMandi(v) : null)}
                >
                  <Picker.Item label="Select mandi" value="" />
                  {mandiOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {!isPredefined(prMandi, mandiOptions) && prMandi && (
                <TextInput
                  placeholder="Type mandi"
                  value={prMandi}
                  onChangeText={setPrMandi}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              {/* ✅ Expected Arrival text box bigger + calendar icon inside */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                Expected Arrival Date
              </Text>

              <TouchableOpacity
                style={[
                  styles.input,
                  styles.dateInput,
                  {
                    borderColor: theme.text,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}
                onPress={openDatePicker}
              >
                <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
                  {prExpectedArrival || 'dd-mm-yyyy'}
                </Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              {prExpectedArrival && (
                <TouchableOpacity
                  onPress={() => setPrExpectedArrival('')}
                  style={{ marginTop: 6 }}
                >
                  <Text style={{ color: theme.primary, fontSize: 12 }}>Clear</Text>
                </TouchableOpacity>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={dateValue}
                  mode="date"
                  display={Platform.OS === 'android' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  maximumDate={new Date(2100, 11, 31)}
                  minimumDate={new Date(2000, 0, 1)}
                />
              )}

              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: theme.primary }]}
                onPress={addLotInline}
              >
                <Text style={styles.addBtnText}>Add Lot</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('your_registered_lots') || 'Your Registered Lots'}
            </Text>
          </>
        )}
      </View>
    ),
    [
      theme,
      t,
      selectedTab,
      mandiName,
      cropName,
      stfMandi,
      stfCrop,
      horizon,
      forecastLoading,
      forecastSummary,
      prCrop,
      prGrade,
      prQuantity,
      prMandi,
      prExpectedArrival,
      lots.length,
      openDatePicker,
      addLotInline,
    ]
  );

  const renderLotItem = useCallback(
    ({ item }: { item: Lot }) => (
      <View
        style={[
          styles.lotItem,
          { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>Crop: </Text>
            {item.crop}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>Grade: </Text>
            {item.grade}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>Qty: </Text>
            {item.quantity}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>Mandi: </Text>
            {item.mandi}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>Arrival: </Text>
            {item.expectedArrival}
          </Text>
        </View>
        <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
          <Text style={styles.removeBtnText}>×</Text>
        </TouchableOpacity>
      </View>
    ),
    [theme, removeLot]
  );

  const renderEmpty = useCallback(() => {
    if (selectedTab !== 'preregister') return null;
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>No lots registered yet</Text>
      </View>
    );
  }, [selectedTab, theme]);

  const listData = selectedTab === 'preregister' ? lots : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderLotItem}
        ListHeaderComponent={ListHeaderElement}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 15, marginBottom: 16 },
  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  tab: { flex: 0.32, padding: 12, borderRadius: 10, alignItems: 'center' },
  tabText: { fontWeight: '600' },
  tabTextSelected: { fontWeight: 'bold' },

  searchBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  searchTitle: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchBtn: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  chartBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  chartTitle: { fontWeight: '700', marginBottom: 12 },
  chartPlaceholder: {
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },

  horizonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  horizonBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#eee' },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { fontWeight: 'bold' },
  horizonTextActive: { color: '#fff', fontWeight: 'bold' },

  formBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  formTitle: { fontWeight: '700', marginTop: 16, marginBottom: 6 },
  addBtn: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12 },
  emptyBox: { borderWidth: 1, borderRadius: 12, padding: 20, alignItems: 'center' },
  lotItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  lotText: { marginBottom: 6 },
  removeBtn: { backgroundColor: '#e53e3e', padding: 10, borderRadius: 8, marginLeft: 12 },
  removeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

  // 🔹 Extra styles for the date input
  dateInput: {
    // Slightly taller if you want it to feel bigger than normal inputs
    paddingVertical: 14,
  },
  calendarIcon: {
    fontSize: 22,
    marginLeft: 8,
  },
});

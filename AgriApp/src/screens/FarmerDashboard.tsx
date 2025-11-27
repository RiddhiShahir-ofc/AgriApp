// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   View,
// //   TextInput,
// //   ScrollView,
// //   Alert,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// // export default function FarmerDashboard() {
// //   const navigation = useNavigation<PropsNav>();
// //   const goBack = () => navigation.navigate('Dashboard');

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   // Which tab is selected: 'daily' | 'short' | 'preregister'
// //   const [selectedTab, setSelectedTab] = useState<'daily market price' | 'short term forcast' | 'pre-register lot'>('daily market price');

// //   // Mandi search inputs
// //   const [mandiName, setMandiName] = useState('');
// //   const [cropName, setCropName] = useState('');

// //   // load any state if needed
// //   useEffect(() => {
// //     // by default daily is selected (already set)
// //     // Example: you can load cached preference here
// //   }, []);

// //   const onSelectTab = (tab: 'daily market price' | 'short term forcast' | 'pre-register lot') => {
// //     setSelectedTab(tab);

// //     if (tab === 'short term forcast') {
// //       // navigate to ShortTermForecast screen (user requested)
// //       // If screen doesn't exist yet, create ShortTermForecast and add to navigation stack
// //       navigation.navigate('ShortTermForecast' as any);
// //       return;
// //     }

// //     if (tab === 'pre-register lot') {
// //       // navigate to pre-register lots screen
// //       navigation.navigate('PreRegisterLot' as any);
// //       return;
// //     }

// //     // daily -> stay on this screen and show daily market price
// //   };

// //   const onSearchMandi = async () => {
// //     // simple validation
// //     if (!mandiName && !cropName) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// //       return;
// //     }

// //     // You can either navigate to a search results screen or filter charts here.
// //     // For now we navigate to a Mandi search results screen if present, otherwise show an alert.
// //     try {
// //       // store last search in AsyncStorage (optional)
// //       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
// //     } catch (e) {
// //       // ignore
// //     }

// //     // If you have a dedicated screen:
// //     if ((navigation as any).navigate) {
// //       // if a screen exists named 'MandiSearchResults', use it; otherwise just alert
// //       const possibleScreen = 'MandiSearchResults' as any;
// //       // try navigate (it will fail silently if route not found in dev, so we fallback to alert)
// //       try {
// //         navigation.navigate(possibleScreen, { mandiName, cropName } as any);
// //         return;
// //       } catch (err) {
// //         // fallthrough to alert
// //       }
// //     }

// //     Alert.alert(t('search') ?? 'Search', `${t('mandi')}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
// //         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
// //         </TouchableOpacity>

// //         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>

// //         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

// //         {/* Tabs / small action cards */}
// //         <View style={styles.tabsRow}>
// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'daily market price'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => onSelectTab('daily market price')}
// //           >
// //             <Text style={[styles.tabText, selectedTab === 'daily market price' ? styles.tabTextSelected : {}]}>
// //               {t('daily_market_price')}
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'short term forcast'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => onSelectTab('short term forcast')}
// //           >
// //             <Text style={[styles.tabText, selectedTab === 'short term forcast' ? styles.tabTextSelected : {}]}>
// //               {t('short_term_forecast')}
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'pre-register lot'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background  },
// //             ]}
// //             onPress={() => onSelectTab('pre-register lot')}
// //           >
// //             <Text style={[styles.tabText, selectedTab === 'pre-register lot' ? styles.tabTextSelected : {}]}>
// //               {t('pre_register_lot')}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Mandi Search Box */}
// //         {/* Only show mandi search when daily selected (per your mock). */}
// //         {selectedTab === 'daily market price' && (
// //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi')}</Text>

// //             <Text style={[styles.inputLabel, { color: theme.text }]}>{t('mandi')}</Text>
// //             <TextInput
// //               placeholder={t('enter_mandi')}
// //               placeholderTextColor={theme.text}
// //               value={mandiName}
// //               onChangeText={setMandiName}
// //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //             />

// //             <Text style={[styles.inputLabel, { color: theme.text }]}>{t('crop')}</Text>
// //             <TextInput
// //               placeholder={t('enter_crop')}
// //               placeholderTextColor={theme.text}
// //               value={cropName}
// //               onChangeText={setCropName}
// //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //             />

// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
// //               <Text style={[styles.searchBtnText, { color: theme.text }]}>{t('search')}</Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         {/* Daily Market Price area */}
// //         {selectedTab === 'daily market price' && (
// //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background  }]}>
// //             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>

// //             {/* Placeholder chart — replace with your GraphChart component */}
// //             <View style={styles.chartPlaceholder}>
// //               <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// //             </View>
// //           </View>
// //         )}

// //         {/* Note: short/peregister navigate away per requirements */}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
// //   backText: { fontWeight: '700', fontSize: 16 },
// //   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
// //   text: { fontSize: 14, marginBottom: 12 },

// //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
// //   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
// //   tabText: { fontWeight: '600', color: '#333' },
// //   tabTextSelected: { color: '#fff' },

// //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// //   inputLabel: { fontSize: 12, marginBottom: 6 },
// //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },

// //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// //   searchBtnText: { fontWeight: '700' },

// //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
// //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// //   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

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
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// export default function FarmerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const goBack = () => navigation.navigate('Dashboard');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // Which tab is selected: 'daily' | 'short' | 'preregister'
//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

//   // Mandi search inputs (for daily section)
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // Inline ShortTermForecast UI state
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   useEffect(() => {
//     // Daily is default; you could load last-search from storage here if needed.
//   }, []);

//   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
//     // Instead of navigating away for 'short', open inline UI:
//     if (tab === 'short') {
//       setSelectedTab('short');
//       // preload if you want: copy mandiName/cropName into inline form
//       setStfMandi(mandiName);
//       setStfCrop(cropName);
//       return;
//     }

//     if (tab === 'preregister') {
//       // keep navigation behavior unchanged for pre-register
//       setSelectedTab('preregister');
//       navigation.navigate('PreRegisterLot' as any);
//       return;
//     }

//     // daily
//     setSelectedTab('daily');
//   };

//   const onSearchMandi = async () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }

//     try {
//       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
//     } catch (e) {
//       // ignore
//     }

//     // If you have a dedicated results screen, you can navigate. For now we show an alert.
//     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
//   };

//   // Inline short term forecast "Get" action
//   const getShortTermForecastInline = async () => {
//     if (!stfMandi && !stfCrop) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }

//     try {
//       setForecastLoading(true);
//       setForecastSummary(null);

//       // --- Replace this block with real API call or GraphChart update ---
//       // Demo: create a simple mocked summary based on inputs and horizon
//       //await new Promise((res) => setTimeout(res, 700)); // simulate network
//       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
//       setForecastSummary(summary);
//       // --- End mock ---
//     } catch (err) {
//       console.error(err);
//       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
//     } finally {
//       setForecastLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//           <Text style={[styles.backText, { color: theme.text ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>

//         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

//         {/* Tabs / action cards */}
//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'daily'
//                 ? { backgroundColor:  '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('daily')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>
//               {t('daily_market_price')}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'short'
//                 ? { backgroundColor: '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('short')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}]}>
//               {t('short_term_forecast')}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'preregister'
//                 ? { backgroundColor: '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('preregister')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>
//               {t('pre_register_lot')}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Mandi Search Box (daily) */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//             <TextInput
//               placeholder={t('enter_mandi') ?? 'Enter mandi name'}
//               placeholderTextColor={theme.text}
//               value={mandiName}
//               onChangeText={setMandiName}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//             <TextInput
//               placeholder={t('enter_crop') ?? 'Enter crop name'}
//               placeholderTextColor={theme.text}
//               value={cropName}
//               onChangeText={setCropName}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: '#2b6cb0' }]} onPress={onSearchMandi}>
//               <Text style={[styles.searchBtnText, { color: theme.text }]}>{t('search')}</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Inline ShortTermForecast UI (shown when short selected) */}
//         {selectedTab === 'short' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//             <TextInput
//               placeholder={t('enter_mandi') ?? 'Enter mandi name'}
//               placeholderTextColor={theme.text}
//               value={stfMandi}
//               onChangeText={setStfMandi}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//             <TextInput
//               placeholder={t('enter_crop') ?? 'Enter crop name'}
//               placeholderTextColor={theme.text}
//               value={stfCrop}
//               onChangeText={setStfCrop}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
//             <View style={styles.horizonRow}>
//               <TouchableOpacity
//                 style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
//                 onPress={() => setHorizon('7days')}
//               >
//                 <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
//                 onPress={() => setHorizon('14days')}
//               >
//                 <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
//                 onPress={() => setHorizon('30days')}
//               >
//                 <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: '#2b6cb0' }]} onPress={getShortTermForecastInline}>
//               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Daily market price area (only show on daily) */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
//             <View style={styles.chartPlaceholder}>
//               <Text style={{ color: theme.input }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
//             </View>
//           </View>
//         )}

//         {/* Inline short term forecast results (only show after running forecast) */}
//         {selectedTab === 'short' && (
//           <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>

//             <View style={styles.chartPlaceholder}>
//               <Text style={{ color: theme.text }}>
//                 {forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}
//               </Text>
//             </View>

//             {forecastSummary && (
//               <View style={{ marginTop: 8 }}>
//                 <Text style={{ color: theme.text }}>{forecastSummary}</Text>
//               </View>
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
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 14, marginBottom: 12 },

//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
//   tabText: { fontWeight: '600', color: '#333' },
//   tabTextSelected: { color: '#fff' },

//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8 },
//   inputLabel: { fontSize: 12, marginBottom: 6 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },

//   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   searchBtnText: { fontWeight: '700' },

//   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   chartTitle: { fontWeight: '700', marginBottom: 10 },
//   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

//   // horizon buttons
//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
//   ScrollView,
//   Alert,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

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

// export default function FarmerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const goBack = () => navigation.navigate('Dashboard');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // which tab is selected
//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

//   // Daily mandi search (keeps original functionality)
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // Short-term forecast inline state
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   // Pre-register inline state
//   const [prCrop, setPrCrop] = useState('');
//   const [prGrade, setPrGrade] = useState('');
//   const [prQuantity, setPrQuantity] = useState('');
//   const [prMandi, setPrMandi] = useState('');
//   const [prExpectedArrival, setPrExpectedArrival] = useState('');
//   const [lots, setLots] = useState<Lot[]>([]);
//   const [phone, setPhone] = useState<string | null>(null);

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
//       setPhone(p);
//       if (p) {
//         AsyncStorage.getItem(`REGISTERED_LOTS_${p}`).then((j) => {
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

//   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
//     // IMPORTANT: do NOT navigate away — open inline UI for 'short' and 'preregister'
//     if (tab === 'short') {
//       setSelectedTab('short');
//       setStfMandi(mandiName);
//       setStfCrop(cropName);
//       return;
//     }

//     if (tab === 'preregister') {
//       setSelectedTab('preregister');
//       return;
//     }

//     // daily
//     setSelectedTab('daily');
//   };

//   // Daily mandi search action
//   const onSearchMandi = async () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }
//     try {
//       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
//     } catch (e) {}
//     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
//   };

//   // Short-term inline forecast action
//   const getShortTermForecastInline = async () => {
//     if (!stfMandi && !stfCrop) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }
//     try {
//       setForecastLoading(true);
//       setForecastSummary(null);
//       // mock fetch - replace with API or GraphChart update
//       //await new Promise((res) => setTimeout(res, 600));
//       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
//       setForecastSummary(summary);
//     } catch (err) {
//       console.error(err);
//       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
//     } finally {
//       setForecastLoading(false);
//     }
//   };

//   // Pre-register inline: add lot
//   const addLotInline = async () => {
//     if (!prCrop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
//     if (!prQuantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
//     if (!prMandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

//     const newLot: Lot = {
//       id: `${Date.now()}`,
//       crop: prCrop,
//       grade: prGrade || '-',
//       quantity: prQuantity,
//       mandi: prMandi,
//       expectedArrival: prExpectedArrival || '-',
//       createdAt: Date.now(),
//     };

//     const newLots = [newLot, ...lots];
//     setLots(newLots);
//     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(newLots));

//     // clear inputs
//     setPrCrop('');
//     setPrGrade('');
//     setPrQuantity('');
//     setPrMandi('');
//     setPrExpectedArrival('');

//     Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
//   };

//   const removeLot = async (id: string) => {
//     const filtered = lots.filter((l) => l.id !== id);
//     setLots(filtered);
//     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(filtered));
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>
//         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'daily'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('daily')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'short'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('short')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'preregister'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('preregister')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Daily section */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//             <TextInput
//               placeholder={t('enter_mandi') ?? 'Enter mandi name'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={mandiName}
//               onChangeText={setMandiName}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//             <TextInput
//               placeholder={t('enter_crop') ?? 'Enter crop name'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={cropName}
//               onChangeText={setCropName}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />
//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
//               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Daily Market Price area */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background  }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>

//             {/* Placeholder chart — replace with your GraphChart component */}
//             <View style={styles.chartPlaceholder}>
//               <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
//             </View>
//           </View>
//         )}

//         {/* Short term inline */}
//         {selectedTab === 'short' && (
//           <>
//             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
              
//               <TextInput
//                 placeholder={t('enter_mandi')}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={stfMandi}
//                 onChangeText={setStfMandi}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>
//               <TextInput
//                 placeholder={t('enter_crop')}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={stfCrop}
//                 onChangeText={setStfCrop}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
//               <View style={styles.horizonRow}>
//                 <TouchableOpacity
//                   style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
//                   onPress={() => setHorizon('7days')}
//                 >
//                   <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
//                   onPress={() => setHorizon('14days')}
//                 >
//                   <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
//                   onPress={() => setHorizon('30days')}
//                 >
//                   <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
//                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
//               </View>
//               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
//             </View>
//           </>
//         )}

//         {/* Pre-register inline */}
//         {selectedTab === 'preregister' && (
//           <>
//             <View style={[styles.formBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
//               <View style={styles.formHeaderRow}>
//                 <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
//               </View>

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//               <TextInput
//                 placeholder={t('select_crop') ?? 'select crop'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={prCrop}
//                 onChangeText={setPrCrop}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
//               <TextInput
//                 placeholder={t('select_grade') ?? 'select grade'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={prGrade}
//                 onChangeText={setPrGrade}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('quantity_label') ?? 'Quantity (quintal)'}</Text>
//               <TextInput
//                 placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={prQuantity}
//                 onChangeText={setPrQuantity}
//                 keyboardType="numeric"
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi Location'}</Text>
//               <TextInput
//                 placeholder={t('select_mandi') ?? 'select mandi'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={prMandi}
//                 onChangeText={setPrMandi}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
//               <TextInput
//                 placeholder={t('enter_date') ?? 'dd-mm-yy'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={prExpectedArrival}
//                 onChangeText={setPrExpectedArrival}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
//                 <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>

//             {lots.length === 0 ? (
//               <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
//                 <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
//               </View>
//             ) : (
//               <FlatList
//                 data={lots}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                   <View style={[styles.lotItem, { borderColor: '#ccc', backgroundColor: theme.background }]}>
//                     <View style={{ flex: 1 }}>
//                       <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
//                       <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
//                       <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
//                       <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
//                       <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
//                     </View>
//                     <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
//                       <Text style={styles.removeBtnText}>✕</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               />
//             )}
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 14, marginBottom: 12 },

//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
//   tabText: { fontWeight: '600', color: '#333' },
//   tabTextSelected: { color: '#fff' },

//   // daily/search
//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8 },
//   inputLabel: { fontSize: 12, marginBottom: 6 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
//   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   searchBtnText: { fontWeight: '700' },

//   // short term
//   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   chartTitle: { fontWeight: '700', marginBottom: 10 },
//   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },

//   // pre-register inline
//   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
//   formTitle: { fontSize: 16, fontWeight: '700' },
//   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   addBtnText: { fontWeight: '700', color: '#fff' },

//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
//   emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
//   lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
//   lotText: { marginBottom: 6 },
//   removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
//   removeBtnText: { color: '#fff', fontWeight: '700' },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
//   Alert,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

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

// export default function FarmerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const goBack = () => navigation.navigate('Dashboard');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // which tab is selected
//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

//   // Daily mandi search (keeps original functionality)
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // Short-term forecast inline state
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   // Pre-register inline state
//   const [prCrop, setPrCrop] = useState('');
//   const [prGrade, setPrGrade] = useState('');
//   const [prQuantity, setPrQuantity] = useState('');
//   const [prMandi, setPrMandi] = useState('');
//   const [prExpectedArrival, setPrExpectedArrival] = useState('');
//   const [lots, setLots] = useState<Lot[]>([]);
//   const [phone, setPhone] = useState<string | null>(null);

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
//       setPhone(p);
//       if (p) {
//         AsyncStorage.getItem(`REGISTERED_LOTS_${p}`).then((j) => {
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

//   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
//     if (tab === 'short') {
//       setSelectedTab('short');
//       setStfMandi(mandiName);
//       setStfCrop(cropName);
//       return;
//     }

//     if (tab === 'preregister') {
//       setSelectedTab('preregister');
//       return;
//     }

//     setSelectedTab('daily');
//   };

//   // Daily mandi search action
//   const onSearchMandi = async () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }
//     try {
//       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
//     } catch (e) {}
//     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
//   };

//   // Short-term inline forecast action
//   const getShortTermForecastInline = async () => {
//     if (!stfMandi && !stfCrop) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }
//     try {
//       setForecastLoading(true);
//       setForecastSummary(null);
//       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
//       setForecastSummary(summary);
//     } catch (err) {
//       console.error(err);
//       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
//     } finally {
//       setForecastLoading(false);
//     }
//   };

//   // Pre-register inline: add lot
//   const addLotInline = async () => {
//     if (!prCrop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
//     if (!prQuantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
//     if (!prMandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

//     const newLot: Lot = {
//       id: `${Date.now()}`,
//       crop: prCrop,
//       grade: prGrade || '-',
//       quantity: prQuantity,
//       mandi: prMandi,
//       expectedArrival: prExpectedArrival || '-',
//       createdAt: Date.now(),
//     };

//     const newLots = [newLot, ...lots];
//     setLots(newLots);
//     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(newLots));

//     // clear inputs
//     setPrCrop('');
//     setPrGrade('');
//     setPrQuantity('');
//     setPrMandi('');
//     setPrExpectedArrival('');

//     Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
//   };

//   const removeLot = async (id: string) => {
//     const filtered = lots.filter((l) => l.id !== id);
//     setLots(filtered);
//     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(filtered));
//   };

//   // Render the static header and the forms (daily/short/preregister form)
//   const ListHeader = () => (
//     <View>
//       <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//         <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//       </TouchableOpacity>

//       <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>
//       <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

//       <View style={styles.tabsRow}>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'daily'
//               ? { backgroundColor: theme.primary ?? '#3182ce' }
//               : { backgroundColor: theme.background ?? '#f0f0f0' },
//           ]}
//           onPress={() => onSelectTab('daily')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'short'
//               ? { backgroundColor: theme.primary ?? '#3182ce' }
//               : { backgroundColor: theme.background ?? '#f0f0f0' },
//           ]}
//           onPress={() => onSelectTab('short')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'preregister'
//               ? { backgroundColor: theme.primary ?? '#3182ce' }
//               : { backgroundColor: theme.background ?? '#f0f0f0' },
//           ]}
//           onPress={() => onSelectTab('preregister')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Daily section */}
//       {selectedTab === 'daily' && (
//         <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//           <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//           <TextInput
//             placeholder={t('enter_mandi') ?? 'Enter mandi name'}
//             placeholderTextColor={theme.text ?? '#999'}
//             value={mandiName}
//             onChangeText={setMandiName}
//             style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//           />
//           <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//           <TextInput
//             placeholder={t('enter_crop') ?? 'Enter crop name'}
//             placeholderTextColor={theme.text ?? '#999'}
//             value={cropName}
//             onChangeText={setCropName}
//             style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//           />
//           <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
//             <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Daily Market Price area */}
//       {selectedTab === 'daily' && (
//         <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
//           <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
//           <View style={styles.chartPlaceholder}>
//             <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
//           </View>
//         </View>
//       )}

//       {/* Short term inline */}
//       {selectedTab === 'short' && (
//         <>
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//             <TextInput
//               placeholder={t('enter_mandi')}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={stfMandi}
//               onChangeText={setStfMandi}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>
//             <TextInput
//               placeholder={t('enter_crop')}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={stfCrop}
//               onChangeText={setStfCrop}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
//             <View style={styles.horizonRow}>
//               <TouchableOpacity
//                 style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
//                 onPress={() => setHorizon('7days')}
//               >
//                 <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
//                 onPress={() => setHorizon('14days')}
//               >
//                 <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
//                 onPress={() => setHorizon('30days')}
//               >
//                 <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
//               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
//             <View style={styles.chartPlaceholder}>
//               <Text style={{ color: theme.text ?? '#666' }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
//             </View>
//             {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
//           </View>
//         </>
//       )}

//       {/* Pre-register header & form - the list of lots is rendered by FlatList items below */}
//       {selectedTab === 'preregister' && (
//         <>
//           <View style={[styles.formBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
//             <View style={styles.formHeaderRow}>
//               <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
//             </View>

//             <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//             <TextInput
//               placeholder={t('select_crop') ?? 'select crop'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={prCrop}
//               onChangeText={setPrCrop}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
//             <TextInput
//               placeholder={t('select_grade') ?? 'select grade'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={prGrade}
//               onChangeText={setPrGrade}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.formTitle, { color: theme.text }]}>{t('quantity_label') ?? 'Quantity (quintal)'}</Text>
//             <TextInput
//               placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={prQuantity}
//               onChangeText={setPrQuantity}
//               keyboardType="numeric"
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.formTitle, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi Location'}</Text>
//             <TextInput
//               placeholder={t('select_mandi') ?? 'select mandi'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={prMandi}
//               onChangeText={setPrMandi}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
//             <TextInput
//               placeholder={t('enter_date') ?? 'dd-mm-yy'}
//               placeholderTextColor={theme.text ?? '#999'}
//               value={prExpectedArrival}
//               onChangeText={setPrExpectedArrival}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
//               <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>
//         </>
//       )}
//     </View>
//   );

//   // Render a single lot item (FlatList)
//   const renderLotItem = ({ item }: { item: Lot }) => (
//     <View style={[styles.lotItem, { borderColor: '#ccc', backgroundColor: theme.background }]}>
//       <View style={{ flex: 1 }}>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
//       </View>
//       <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
//         <Text style={styles.removeBtnText}>✕</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   // Show empty message only when in preregister tab and no lots
//   const renderEmpty = () => {
//     if (selectedTab !== 'preregister') return null;
//     return (
//       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
//         <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
//       </View>
//     );
//   };

//   // When not in preregister tab we pass empty array so FlatList doesn't render items
//   const listData = selectedTab === 'preregister' ? lots : [];

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <FlatList
//         data={listData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderLotItem}
//         ListHeaderComponent={ListHeader}
//         ListEmptyComponent={renderEmpty}
//         contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }}
//         keyboardShouldPersistTaps="handled"
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 14, marginBottom: 12 },

//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
//   tabText: { fontWeight: '600', color: '#333' },
//   tabTextSelected: { color: '#fff' },

//   // daily/search
//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8 },
//   inputLabel: { fontSize: 12, marginBottom: 6 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
//   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   searchBtnText: { fontWeight: '700' },

//   // short term
//   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   chartTitle: { fontWeight: '700', marginBottom: 10 },
//   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },

//   // pre-register inline
//   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
//   formTitle: { fontSize: 16, fontWeight: '700' },
//   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   addBtnText: { fontWeight: '700', color: '#fff' },

//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
//   emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
//   lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
//   lotText: { marginBottom: 6 },
//   removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
//   removeBtnText: { color: '#fff', fontWeight: '700' },
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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

export default function FarmerDashboard() {
  const navigation = useNavigation<PropsNav>();
  const goBack = () => navigation.navigate('Dashboard');

  const { theme } = useTheme();
  const { t } = useLanguage();

  // which tab is selected
  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

  // Daily mandi search (keeps original functionality)
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');

  // Short-term forecast inline state
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  // Pre-register inline state
  const [prCrop, setPrCrop] = useState('');
  const [prGrade, setPrGrade] = useState('');
  const [prQuantity, setPrQuantity] = useState('');
  const [prMandi, setPrMandi] = useState('');
  const [prExpectedArrival, setPrExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
      setPhone(p);
      if (p) {
        AsyncStorage.getItem(`REGISTERED_LOTS_${p}`).then((j) => {
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

  const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
    if (tab === 'short') {
      setSelectedTab('short');
      setStfMandi(mandiName);
      setStfCrop(cropName);
      return;
    }

    if (tab === 'preregister') {
      setSelectedTab('preregister');
      return;
    }

    setSelectedTab('daily');
  };

  // Daily mandi search action
  const onSearchMandi = async () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    try {
      await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
    } catch (e) {}
    Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
  };

  // Short-term inline forecast action
  const getShortTermForecastInline = async () => {
    if (!stfMandi && !stfCrop) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    try {
      setForecastLoading(true);
      setForecastSummary(null);
      const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
      setForecastSummary(summary);
    } catch (err) {
      console.error(err);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
    } finally {
      setForecastLoading(false);
    }
  };

  // Pre-register inline: add lot
  const addLotInline = async () => {
    if (!prCrop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
    if (!prQuantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
    if (!prMandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

    const newLot: Lot = {
      id: `${Date.now()}`,
      crop: prCrop,
      grade: prGrade || '-',
      quantity: prQuantity,
      mandi: prMandi,
      expectedArrival: prExpectedArrival || '-',
      createdAt: Date.now(),
    };

    const newLots = [newLot, ...lots];
    setLots(newLots);
    if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(newLots));

    // clear inputs
    setPrCrop('');
    setPrGrade('');
    setPrQuantity('');
    setPrMandi('');
    setPrExpectedArrival('');

    Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
  };

  const removeLot = async (id: string) => {
    const filtered = lots.filter((l) => l.id !== id);
    setLots(filtered);
    if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(filtered));
  };

  // Memoized header element (prevents FlatList from remounting header on every render)
  const ListHeaderElement = useMemo(() => {
    return (
      <View>
        <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>
        <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'daily'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('daily')}
          >
            <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'short'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('short')}
          >
            <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'preregister'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('preregister')}
          >
            <Text style={[styles.tabText, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
          </TouchableOpacity>
        </View>

        {/* Daily section */}
        {selectedTab === 'daily' && (
          <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
            <TextInput
              placeholder={t('enter_mandi') ?? 'Enter mandi name'}
              placeholderTextColor={theme.text ?? '#999'}
              value={mandiName}
              onChangeText={setMandiName}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />
            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
            <TextInput
              placeholder={t('enter_crop') ?? 'Enter crop name'}
              placeholderTextColor={theme.text ?? '#999'}
              value={cropName}
              onChangeText={setCropName}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />
            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
              <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Daily Market Price area */}
        {selectedTab === 'daily' && (
          <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
            </View>
          </View>
        )}

        {/* Short term inline */}
        {selectedTab === 'short' && (
          <>
            <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
              <TextInput
                placeholder={t('enter_mandi')}
                placeholderTextColor={theme.text ?? '#999'}
                value={stfMandi}
                onChangeText={setStfMandi}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>
              <TextInput
                placeholder={t('enter_crop')}
                placeholderTextColor={theme.text ?? '#999'}
                value={stfCrop}
                onChangeText={setStfCrop}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
              <View style={styles.horizonRow}>
                <TouchableOpacity
                  style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
                  onPress={() => setHorizon('7days')}
                >
                  <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
                  onPress={() => setHorizon('14days')}
                >
                  <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
                  onPress={() => setHorizon('30days')}
                >
                  <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: theme.text ?? '#666' }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
              </View>
              {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
            </View>
          </>
        )}

        {/* Pre-register header & form - the list of lots is rendered by FlatList items below */}
        {selectedTab === 'preregister' && (
          <>
            <View style={[styles.formBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
              <View style={styles.formHeaderRow}>
                <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
              </View>

              <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
              <TextInput
                placeholder={t('select_crop') ?? 'select crop'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prCrop}
                onChangeText={setPrCrop}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
              <TextInput
                placeholder={t('select_grade') ?? 'select grade'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prGrade}
                onChangeText={setPrGrade}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.formTitle, { color: theme.text }]}>{t('quantity_label') ?? 'Quantity (quintal)'}</Text>
              <TextInput
                placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prQuantity}
                onChangeText={setPrQuantity}
                keyboardType="numeric"
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.formTitle, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi Location'}</Text>
              <TextInput
                placeholder={t('select_mandi') ?? 'select mandi'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prMandi}
                onChangeText={setPrMandi}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
              <TextInput
                placeholder={t('enter_date') ?? 'dd-mm-yy'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prExpectedArrival}
                onChangeText={setPrExpectedArrival}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
                <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>
          </>
        )}
      </View>
    );
    // Note: include dependencies that when changed require header to re-create.
    // we intentionally include the states used inside header so it updates when they change.
    // (selectedTab, mandiName, cropName, etc.)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, t, selectedTab, mandiName, cropName, stfMandi, stfCrop, horizon, forecastLoading, forecastSummary, prCrop, prGrade, prQuantity, prMandi, prExpectedArrival]);

  // Render a single lot item (FlatList)
  const renderLotItem = useCallback(({ item }: { item: Lot }) => (
    <View style={[styles.lotItem, { borderColor: '#ccc', backgroundColor: theme.background }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
        <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
        <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
        <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
        <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
        <Text style={styles.removeBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  ), [theme, t, removeLot]);

  // Show empty message only when in preregister tab and no lots
  const renderEmpty = useCallback(() => {
    if (selectedTab !== 'preregister') return null;
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
      </View>
    );
  }, [selectedTab, theme, t]);

  // When not in preregister tab we pass empty array so FlatList doesn't render items
  const listData = selectedTab === 'preregister' ? lots : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderLotItem}
        ListHeaderComponent={ListHeaderElement} // Pass the memoized element
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }}
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 12 },

  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
  tabText: { fontWeight: '600', color: '#333' },
  tabTextSelected: { color: '#fff' },

  // daily/search
  searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchTitle: { fontWeight: '700', marginBottom: 8 },
  inputLabel: { fontSize: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
  searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  searchBtnText: { fontWeight: '700' },

  // short term
  chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
  chartTitle: { fontWeight: '700', marginBottom: 10 },
  chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { color: '#333', fontWeight: '600' },
  horizonTextActive: { color: '#fff', fontWeight: '700' },

  // pre-register inline
  formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  formTitle: { fontSize: 16, fontWeight: '700' },
  addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  addBtnText: { fontWeight: '700', color: '#fff' },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
  lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
  lotText: { marginBottom: 6 },
  removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
  removeBtnText: { color: '#fff', fontWeight: '700' },
});

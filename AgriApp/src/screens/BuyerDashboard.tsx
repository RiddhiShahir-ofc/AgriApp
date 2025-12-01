// // // import React from 'react';
// // // import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';

// // // export default function BuyerDashboard() {
// // //     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
// // //     const { theme } = useTheme();
// // //     const { t } = useLanguage();

// // //       const goBack = () => {
// // //         navigation.navigate('Dashboard');
// // //       };
// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
// // //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //         <Text style={styles.backText}>{t('back')}</Text>
// // //       </TouchableOpacity>
// // //       <Text style={[styles.title,{color :theme.text}]}>{t('buyer_dashboard')}</Text>
// // //       <Text style={[styles.text,{color :theme.text}]}>{t('buyer_msg')}</Text>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// // //   text: { fontSize: 16, color: 'theme.text' },
// // //   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },
// // //   backBtn: {
// // //     alignSelf: 'flex-start',
// // //     backgroundColor: '#edf2f7',
// // //     paddingVertical: 6,
// // //     paddingHorizontal: 12,
// // //     borderRadius: 6,
// // //     marginBottom: 10,
// // //   },
// // // });



// // // import React, { useState } from 'react';
// // // import { Text,TouchableOpacity,StyleSheet,View,TextInput,ScrollView,Alert,} from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';

// // // export default function BuyerDashboard() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   // Keep the original goBack and UI
// // //   const goBack = () => {
// // //     navigation.navigate('Dashboard');
// // //   };

// // //   // Tabs: daily market price and short term forecast
// // //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short'>('daily');

// // //   // Daily search
// // //   const [mandiName, setMandiName] = useState('');
// // //   const [cropName, setCropName] = useState('');

// // //   // Short term forecast inline
// // //   const [stfMandi, setStfMandi] = useState('');
// // //   const [stfCrop, setStfCrop] = useState('');
// // //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// // //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// // //   const [forecastLoading, setForecastLoading] = useState(false);

// // //   const onSearchMandi = async () => {
// // //     if (!mandiName && !cropName) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     } 
// // //     try {
// // //       // optionally save last search
// // //       // await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
// // //     } catch (e) {
// // //       // ignore
// // //     }
// // //     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
// // //   };

// // //   const getShortTermForecastInline = async () => {
// // //     if (!stfMandi && !stfCrop) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     }
// // //     try {
// // //       setForecastLoading(true);
// // //       setForecastSummary(null);

// // //       // Replace with actual API call — this is a mocked summary:
// // //       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${
// // //         horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
// // //       }.`;
// // //       setTimeout(() => {
// // //         setForecastSummary(summary);
// // //         setForecastLoading(false);
// // //       }, 400);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setForecastLoading(false);
// // //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
// // //         {/* Original header/back + texts preserved exactly */}
// // //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //           <Text style={styles.backText}>{t('back')}</Text>
// // //         </TouchableOpacity>
// // //         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard')}</Text>
// // //         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg')}</Text>

// // //         {/* Tabs added (daily | short) */}
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
// // //         </View>

// // //         {/* Daily Market Price UI */}
// // //         {selectedTab === 'daily' && (
// // //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
// // //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
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
// // //               placeholderTextColor={theme.placeholder ?? '#999'}
// // //               value={cropName}
// // //               onChangeText={setCropName}
// // //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //             />
// // //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
// // //               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
// // //             </TouchableOpacity>

// // //             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
// // //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// // //               <View style={styles.chartPlaceholder}>
// // //                 <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //         )}

// // //         {/* Short term forecast UI */}
// // //         {selectedTab === 'short' && (
// // //           <View>
// // //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
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
// // //                 placeholderTextColor={theme.placeholder ?? '#999'}
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
// // //           </View>
// // //         )}
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// // //   text: { fontSize: 16, marginBottom: 12 },

// // //   backBtn: {
// // //     alignSelf: 'flex-start',
// // //     backgroundColor: '#edf2f7',
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

// // //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// // //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// // //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// // //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// // //   searchBtnText: { fontWeight: '700' },

// // //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
// // //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// // //   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

// // //   horizonRow: { flexDirection: 'row', marginBottom: 12 },
// // //   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
// // //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// // //   horizonText: { color: '#333', fontWeight: '600' },
// // //   horizonTextActive: { color: '#fff', fontWeight: '700' },
// // // });


// // import React, { useState } from 'react';
// // import { Text,TouchableOpacity,StyleSheet,View,TextInput,ScrollView,Alert,} from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // export default function BuyerDashboard() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   // Keep the original goBack and UI
// //   const goBack = () => {
// //     navigation.navigate('Dashboard');
// //   };

// //   // Tabs: daily market price, short term forecast and pre bidding
// //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre'>('daily');

// //   // Daily search
// //   const [mandiName, setMandiName] = useState('');
// //   const [cropName, setCropName] = useState('');

// //   // Short term forecast inline
// //   const [stfMandi, setStfMandi] = useState('');
// //   const [stfCrop, setStfCrop] = useState('');
// //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// //   const [forecastLoading, setForecastLoading] = useState(false);

// //   const onSearchMandi = async () => {
// //     if (!mandiName && !cropName) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// //       return;
// //     } 
// //     try {
// //       // optionally save last search
// //       // await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
// //     } catch (e) {
// //       // ignore
// //     }
// //     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
// //   };

// //   const getShortTermForecastInline = async () => {
// //     if (!stfMandi && !stfCrop) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// //       return;
// //     }
// //     try {
// //       setForecastLoading(true);
// //       setForecastSummary(null);

// //       // Replace with actual API call — this is a mocked summary:
// //       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${
// //         horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
// //       }.`;
// //       setTimeout(() => {
// //         setForecastSummary(summary);
// //         setForecastLoading(false);
// //       }, 400);
// //     } catch (err) {
// //       console.error(err);
// //       setForecastLoading(false);
// //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
// //     }
// //   };

// //   // Handler for Pre Bidding tab: keep styling and navigate to BuyerPreBidding screen
// //   const onPreBidding = () => {
// //     setSelectedTab('pre');
// //     // navigate to BuyerPreBidding screen (make sure it's registered in your navigator)
// //     navigation.navigate('BuyerPreBidding' as any);
// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
// //         {/* Original header/back + texts preserved exactly */}
// //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// //           <Text style={styles.backText}>{t('back')}</Text>
// //         </TouchableOpacity>
// //         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard')}</Text>
// //         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg')}</Text>

// //         {/* Tabs added (daily | short | pre) */}
// //         <View style={styles.tabsRow}>
// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'daily'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => setSelectedTab('daily')}
// //           >
// //             <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}, { color: selectedTab === 'daily' ? '#fff' : theme.text }]}>
// //               {t('daily_market_price')}
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'short'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => setSelectedTab('short')}
// //           >
// //             <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}, { color: selectedTab === 'short' ? '#fff' : theme.text }]}>
// //               {t('short_term_forecast')}
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'pre'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={onPreBidding}
// //           >
// //             <Text style={[styles.tabText, selectedTab === 'pre' ? styles.tabTextSelected : {}, { color: selectedTab === 'pre' ? '#fff' : theme.text }]}>
// //               {t('pre_bidding') ?? 'Pre Bidding'}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Daily Market Price UI */}
// //         {selectedTab === 'daily' && (
// //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// //             <TextInput
// //               placeholder={t('enter_mandi') ?? 'Enter mandi name'}
// //               placeholderTextColor={theme.placeholder ?? '#999'}
// //               value={mandiName}
// //               onChangeText={setMandiName}
// //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //             />
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// //             <TextInput
// //               placeholder={t('enter_crop') ?? 'Enter crop name'}
// //               placeholderTextColor={theme.placeholder ?? '#999'}
// //               value={cropName}
// //               onChangeText={setCropName}
// //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //             />
// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
// //               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
// //             </TouchableOpacity>

// //             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// //               </View>
// //             </View>
// //           </View>
// //         )}

// //         {/* Short term forecast UI */}
// //         {selectedTab === 'short' && (
// //           <View>
// //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// //               <TextInput
// //                 placeholder={t('enter_mandi') ?? 'Enter mandi name'}
// //                 placeholderTextColor={theme.placeholder ?? '#999'}
// //                 value={stfMandi}
// //                 onChangeText={setStfMandi}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// //               <TextInput
// //                 placeholder={t('enter_crop') ?? 'Enter crop name'}
// //                 placeholderTextColor={theme.placeholder ?? '#999'}
// //                 value={stfCrop}
// //                 onChangeText={setStfCrop}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
// //               <View style={styles.horizonRow}>
// //                 <TouchableOpacity style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('7days')}>
// //                   <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
// //                 </TouchableOpacity>

// //                 <TouchableOpacity style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('14days')}>
// //                   <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
// //                 </TouchableOpacity>

// //                 <TouchableOpacity style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('30days')}>
// //                   <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
// //                 </TouchableOpacity>
// //               </View>

// //               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
// //                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background, marginTop: 12 }]}>
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: theme.text }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
// //               </View>
// //               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
// //             </View>
// //           </View>
// //         )}

// //         {/* no inline UI for 'pre' tab here because pressing it navigates to a dedicated Pre-Bidding screen */}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// //   text: { fontSize: 16, marginBottom: 12 },

// //   backBtn: {
// //     alignSelf: 'flex-start',
// //     backgroundColor: '#edf2f7',
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     borderRadius: 6,
// //     marginBottom: 10,
// //   },
// //   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },

// //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
// //   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
// //   tabText: { fontWeight: '600' },
// //   tabTextSelected: { color: '#fff' },

// //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// //   searchBtnText: { fontWeight: '700' },

// //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
// //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// //   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

// //   horizonRow: { flexDirection: 'row', marginBottom: 12 },
// //   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
// //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// //   horizonText: { color: '#333', fontWeight: '600' },
// //   horizonTextActive: { color: '#fff', fontWeight: '700' },
// // });

// // // import React, { useEffect, useState, useCallback } from 'react';
// // // import {
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   View,
// // //   TextInput,
// // //   ScrollView,
// // //   Alert,
// // //   FlatList,
// // //   ActivityIndicator,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';

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

// // // export default function BuyerDashboard() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   // Keep the original goBack and UI
// // //   const goBack = () => {
// // //     navigation.navigate('Dashboard');
// // //   };

// // //   // Tabs: daily market price, short term forecast and pre bidding
// // //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre'>('daily');

// // //   // Daily search
// // //   const [mandiName, setMandiName] = useState('');
// // //   const [cropName, setCropName] = useState('');

// // //   // Short term forecast inline
// // //   const [stfMandi, setStfMandi] = useState('');
// // //   const [stfCrop, setStfCrop] = useState('');
// // //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// // //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// // //   const [forecastLoading, setForecastLoading] = useState(false);

// // //   // Pre-bidding state
// // //   const [lots, setLots] = useState<Lot[]>([]);
// // //   const [loadingLots, setLoadingLots] = useState<boolean>(false);
// // //   const [bidValues, setBidValues] = useState<Record<string, string>>({});
// // //   const [placing, setPlacing] = useState<Record<string, boolean>>({});
// // //   const [buyerPhone, setBuyerPhone] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     // load logged in user for bids
// // //     AsyncStorage.getItem('LOGGED_IN_USER').then(setBuyerPhone).catch(() => setBuyerPhone(null));
// // //   }, []);

// // //   // Load lots when user switches to pre tab
// // //   useEffect(() => {
// // //     if (selectedTab === 'pre') {
// // //       loadAllRegisteredLots();
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [selectedTab]);

// // //   const loadAllRegisteredLots = async () => {
// // //     setLoadingLots(true);
// // //     try {
// // //       const keys = await AsyncStorage.getAllKeys();
// // //       const lotKeys = keys.filter((k) => k.startsWith('REGISTERED_LOTS_'));
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
// // //           const parsed = JSON.parse(json) as Lot[];
// // //           const owner = key.replace('REGISTERED_LOTS_', '');
// // //           parsed.forEach((l) => aggregated.push({ ...l, owner }));
// // //         } catch (err) {
// // //           console.warn('Failed to parse lots for key', key, err);
// // //         }
// // //       });
// // //       aggregated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
// // //       setLots(aggregated);
// // //     } catch (err) {
// // //       console.error('loadAllRegisteredLots', err);
// // //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Failed to load lots');
// // //     } finally {
// // //       setLoadingLots(false);
// // //     }
// // //   };

// // //   const onChangeBidValue = (lotId: string, text: string) => {
// // //     // allow only numbers and dot
// // //     const cleaned = text.replace(/[^0-9.]/g, '');
// // //     setBidValues((s) => ({ ...s, [lotId]: cleaned }));
// // //   };

// // //   const placeBid = async (lot: Lot) => {
// // //     const value = (bidValues[lot.id] || '').trim();
// // //     if (!value) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_bid_value') ?? 'Please enter a bid value');
// // //       return;
// // //     }
// // //     if (isNaN(Number(value))) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('invalid_bid') ?? 'Please enter a valid number');
// // //       return;
// // //     }

// // //     setPlacing((s) => ({ ...s, [lot.id]: true }));
// // //     try {
// // //       const bidder = await AsyncStorage.getItem('LOGGED_IN_USER');
// // //       if (!bidder) {
// // //         Alert.alert(t('error_title') ?? 'Error','Please login to place a bid');
// // //         return;
// // //       }

// // //       const bid = {
// // //         lotId: lot.id,
// // //         lotOwner: lot.owner,
// // //         bidder,
// // //         bidValue: value,
// // //         createdAt: Date.now(),
// // //       };

// // //       const bidKey = `BIDS_LOT_${lot.id}`;
// // //       const existing = await AsyncStorage.getItem(bidKey);
// // //       let arr: any[] = [];
// // //       if (existing) {
// // //         try {
// // //           const parsed = JSON.parse(existing);
// // //           if (Array.isArray(parsed)) arr = parsed;
// // //         } catch {}
// // //       }
// // //       arr.unshift(bid);
// // //       await AsyncStorage.setItem(bidKey, JSON.stringify(arr));

// // //       // also store per buyer
// // //       const buyerKey = `BIDS_BY_BUYER_${bidder}`;
// // //       try {
// // //         const existingByBuyer = await AsyncStorage.getItem(buyerKey);
// // //         let byBuyer: any[] = existingByBuyer ? JSON.parse(existingByBuyer) : [];
// // //         byBuyer.unshift(bid);
// // //         await AsyncStorage.setItem(buyerKey, JSON.stringify(byBuyer));
// // //       } catch {}

// // //       Alert.alert(t('success_title') ?? 'Success', t('bid_placed') ?? 'Your bid has been placed');
// // //       setBidValues((s) => ({ ...s, [lot.id]: '' }));
// // //     } catch (err) {
// // //       console.error('placeBid', err);
// // //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Failed to place bid');
// // //     } finally {
// // //       setPlacing((s) => ({ ...s, [lot.id]: false }));
// // //     }
// // //   };

// // //   const renderLot = useCallback(
// // //     ({ item }: { item: Lot }) => (
// // //       <View style={[styles.lotCard, { backgroundColor: theme.background, borderColor: '#ccc' }]}>
// // //         <View style={styles.lotRow}>
// // //           <Text style={[styles.lotTitle, { color: theme.text }]}>{item.crop} — {item.grade}</Text>
// // //           <Text style={[styles.small, { color: theme.text }]}>Owner: {item.owner ?? '—'}</Text>
// // //         </View>

// // //         <View style={styles.lotDetails}>
// // //           <Text style={[styles.detailText, { color: theme.text }]}>Quantity: <Text style={{ fontWeight: '700' }}>{item.quantity}</Text></Text>
// // //           <Text style={[styles.detailText, { color: theme.text }]}>Location: <Text style={{ fontWeight: '700' }}>{item.mandi}</Text></Text>
// // //           <Text style={[styles.detailText, { color: theme.text }]}>Auction Date: <Text style={{ fontWeight: '700' }}>{item.expectedArrival}</Text></Text>
// // //         </View>

// // //         <View style={styles.bidRow}>
// // //           <TextInput
// // //             value={bidValues[item.id] || ''}
// // //             onChangeText={(t) => onChangeBidValue(item.id, t)}
// // //             placeholder={t('enter_bid_value') ?? 'Enter your bid value'}
// // //             placeholderTextColor={theme.placeholder ?? '#999'}
// // //             keyboardType="numeric"
// // //             style={[styles.bidInput, { color: theme.text, borderColor: theme.text }]}
// // //           />
// // //           <TouchableOpacity
// // //             onPress={() => placeBid(item)}
// // //             style={[styles.placeBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]}
// // //             disabled={!!placing[item.id]}
// // //           >
// // //             {placing[item.id] ? <ActivityIndicator color="#fff" /> : <Text style={styles.placeBtnText}>{t('place_bid') ?? 'Place Bid'}</Text>}
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     ),
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //     [bidValues, placing, theme, t]
// // //   );

// // //   const renderEmpty = () => (
// // //     <View style={styles.emptyBox}>
// // //       <Text style={{ color: theme.text }}>{t('no_lots_available') ?? 'No pre-registered lots available at the moment'}</Text>
// // //     </View>
// // //   );

// // //   const onSearchMandi = async () => {
// // //     if (!mandiName && !cropName) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     }
// // //     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
// // //   };

// // //   const getShortTermForecastInline = async () => {
// // //     if (!stfMandi && !stfCrop) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     }
// // //     try {
// // //       setForecastLoading(true);
// // //       setForecastSummary(null);
// // //       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${
// // //         horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
// // //       }.`;
// // //       setTimeout(() => {
// // //         setForecastSummary(summary);
// // //         setForecastLoading(false);
// // //       }, 400);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setForecastLoading(false);
// // //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
// // //     }
// // //   };

// // //   // If pre tab -> render FlatList full-screen (avoid ScrollView + FlatList nesting)
// // //   if (selectedTab === 'pre') {
// // //     return (
// // //       <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
// // //           <View style={{ padding: 20 }}>
// // //             <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //               <Text style={styles.backText}>{t('back')}</Text>
// // //             </TouchableOpacity>
// // //             <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard')}</Text>
// // //             <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg')}</Text>

// // //             <View style={styles.tabsRow}>
// // //               <TouchableOpacity
// // //                 style={[
// // //                   styles.tab,
// // //                   { backgroundColor: theme.background ?? '#f0f0f0' },
// // //                 ]}
// // //                 onPress={() => setSelectedTab('daily')}
// // //               >
// // //                 <Text style={[styles.tabText, { color: theme.text }]}>{t('daily_market_price')}</Text>
// // //               </TouchableOpacity>

// // //               <TouchableOpacity
// // //                 style={[
// // //                   styles.tab,
// // //                   { backgroundColor: theme.background ?? '#f0f0f0' },
// // //                 ]}
// // //                 onPress={() => setSelectedTab('short')}
// // //               >
// // //                 <Text style={[styles.tabText, { color: theme.text }]}>{t('short_term_forecast')}</Text>
// // //               </TouchableOpacity>

// // //               <TouchableOpacity
// // //                 style={[
// // //                   styles.tab,
// // //                   { backgroundColor: theme.primary ?? '#3182ce' },
// // //                 ]}
// // //               >
// // //                 <Text style={[styles.tabText, { color: '#fff' }]}>{t('pre_bidding') ?? 'Pre Bidding'}</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>

// // //           {loadingLots ? (
// // //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // //               <ActivityIndicator size="large" />
// // //             </View>
// // //           ) : (
// // //             <FlatList
// // //               data={lots}
// // //               keyExtractor={(i) => i.id}
// // //               renderItem={renderLot}
// // //               ListEmptyComponent={renderEmpty}
// // //               contentContainerStyle={{ padding: 16 }}
// // //               keyboardShouldPersistTaps="handled"
// // //             />
// // //           )}
// // //         </KeyboardAvoidingView>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   // Default: daily/short inside ScrollView (existing behavior)
// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
// // //         {/* Original header/back + texts preserved exactly */}
// // //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //           <Text style={styles.backText}>{t('back')}</Text>
// // //         </TouchableOpacity>
// // //         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard')}</Text>
// // //         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg')}</Text>

// // //         {/* Tabs added (daily | short | pre) */}
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
// // //               selectedTab === 'pre'
// // //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// // //             ]}
// // //             onPress={() => setSelectedTab('pre')}
// // //           >
// // //             <Text style={[styles.tabText, selectedTab === 'pre' ? styles.tabTextSelected : {}, { color: selectedTab === 'pre' ? '#fff' : theme.text }]}>
// // //               {t('pre_bidding') ?? 'Pre Bidding'}
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* Daily Market Price UI */}
// // //         {selectedTab === 'daily' && (
// // //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
// // //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
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
// // //               placeholderTextColor={theme.placeholder ?? '#999'}
// // //               value={cropName}
// // //               onChangeText={setCropName}
// // //               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //             />
// // //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
// // //               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
// // //             </TouchableOpacity>

// // //             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
// // //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// // //               <View style={styles.chartPlaceholder}>
// // //                 <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //         )}

// // //         {/* Short term forecast UI */}
// // //         {selectedTab === 'short' && (
// // //           <View>
// // //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
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
// // //                 placeholderTextColor={theme.placeholder ?? '#999'}
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
// // //           </View>
// // //         )}

// // //         {/* no inline UI for 'pre' here because switching to 'pre' rerenders the component to show FlatList (above) */}
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 0 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10, paddingHorizontal: 20, paddingTop: 20 },
// // //   text: { fontSize: 16, marginBottom: 12, paddingHorizontal: 20 },

// // //   backBtn: {
// // //     alignSelf: 'flex-start',
// // //     backgroundColor: '#edf2f7',
// // //     paddingVertical: 6,
// // //     paddingHorizontal: 12,
// // //     borderRadius: 6,
// // //     marginBottom: 10,
// // //     marginTop: 8,
// // //     marginLeft: 20,
// // //   },
// // //   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },

// // //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 20 },
// // //   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
// // //   tabText: { fontWeight: '600' },
// // //   tabTextSelected: { color: '#fff' },

// // //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, marginHorizontal: 20, marginTop: 8 },
// // //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// // //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// // //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// // //   searchBtnText: { fontWeight: '700' },

// // //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginHorizontal: 20 },
// // //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// // //   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

// // //   horizonRow: { flexDirection: 'row', marginBottom: 12 },
// // //   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
// // //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// // //   horizonText: { color: '#333', fontWeight: '600' },
// // //   horizonTextActive: { color: '#fff', fontWeight: '700' },

// // //   // pre-bidding
// // //   lotCard: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// // //   lotRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
// // //   lotTitle: { fontSize: 16, fontWeight: '700' },
// // //   small: { fontSize: 12 },

// // //   lotDetails: { marginBottom: 10, paddingRight: 8 },
// // //   detailText: { fontSize: 14, marginBottom: 4 },

// // //   bidRow: { flexDirection: 'row', alignItems: 'center' },
// // //   bidInput: { flex: 1, borderWidth: 1, borderRadius: 6, padding: 10, marginRight: 8 },
// // //   placeBtn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
// // //   placeBtnText: { color: '#fff', fontWeight: '700' },

// // //   emptyBox: { padding: 18, alignItems: 'center', justifyContent: 'center' },
// // // });


// import React, { useState } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
//   ScrollView,
//   Alert,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';

// export default function BuyerDashboard() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const goBack = () => {
//     navigation.navigate('Dashboard');
//   };

//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre'>('daily');

//   // Daily search
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // Short-term forecast
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   // Pre Bidding inline form
//   const [preCrop, setPreCrop] = useState('');
//   const [preMandi, setPreMandi] = useState('');
//   const [preBidAmount, setPreBidAmount] = useState('');
//   const [preExpectedArrival, setPreExpectedArrival] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [dateValue, setDateValue] = useState<Date>(new Date());

//   // Options (same as Farmer/Seller)
//   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
//   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

//   // Helper: Is value predefined?
//   const isPredefined = (value: string, options: string[]) =>
//     value === '' || options.includes(value) || value === 'Other';

//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop');
//       return;
//     }
//     Alert.alert(
//       t('search') ?? 'Search',
//       `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`
//     );
//   };

//   const getShortTermForecastInline = async () => {
//     if (!stfMandi && !stfCrop) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop');
//       return;
//     }
//     setForecastLoading(true);
//     const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${
//       stfCrop || 'selected crop'
//     } at ${stfMandi || 'selected mandi'} — ${
//       horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
//     }.`;
//     setTimeout(() => {
//       setForecastSummary(summary);
//       setForecastLoading(false);
//     }, 400);
//   };

//   // Pre Bidding submit (mock - replace with API)
//   const submitPreBid = () => {
//     if (!preCrop || !preMandi || !preBidAmount) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }
//     Alert.alert(
//       'Pre Bid Submitted',
//       `Bid: ${preBidAmount} for ${preCrop} at ${preMandi}. Arrival: ${preExpectedArrival || 'TBD'}`
//     );
//     // Reset form
//     setPreCrop('');
//     setPreMandi('');
//     setPreBidAmount('');
//     setPreExpectedArrival('');
//   };

//   const formatDate = (d: Date) => {
//     return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
//   };

//   const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
//     if (Platform.OS === 'android') setShowDatePicker(false);
//     if (selectedDate) {
//       setDateValue(selectedDate);
//       setPreExpectedArrival(formatDate(selectedDate));
//     }
//   };

//   const openDatePicker = () => {
//     if (preExpectedArrival) {
//       const parts = preExpectedArrival.split('-').map(p => parseInt(p, 10));
//       if (parts.length === 3 && !isNaN(parts[0])) {
//         setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
//       }
//     }
//     setShowDatePicker(true);
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>
//         <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard')}</Text>
//         <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg')}</Text>

//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'daily'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => setSelectedTab('daily')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 { color: selectedTab === 'daily' ? '#fff' : theme.text },
//                 selectedTab === 'daily' && styles.tabTextSelected,
//               ]}
//             >
//               {t('daily_market_price')}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'short'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => setSelectedTab('short')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 { color: selectedTab === 'short' ? '#fff' : theme.text },
//                 selectedTab === 'short' && styles.tabTextSelected,
//               ]}
//             >
//               {t('short_term_forecast')}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'pre'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => setSelectedTab('pre')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 { color: selectedTab === 'pre' ? '#fff' : theme.text },
//                 selectedTab === 'pre' && styles.tabTextSelected,
//               ]}
//             >
//               {t('pre_bidding') ?? 'Pre Bidding'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Daily Market Price */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker
//                 selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'}
//                 onValueChange={v => (v !== 'Other' ? setMandiName(v) : null)}
//               >
//                 <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                 {mandiOptions.map(m => (
//                   <Picker.Item key={m} label={m} value={m} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {(!isPredefined(mandiName, mandiOptions) && mandiName) && (
//               <TextInput
//                 placeholder={t('type_mandi') ?? 'Type mandi'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={mandiName}
//                 onChangeText={setMandiName}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//             )}

//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker
//                 selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'}
//                 onValueChange={v => (v !== 'Other' ? setCropName(v) : null)}
//               >
//                 <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                 {cropOptions.map(c => (
//                   <Picker.Item key={c} label={c} value={c} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {(!isPredefined(cropName, cropOptions) && cropName) && (
//               <TextInput
//                 placeholder={t('type_crop') ?? 'Type crop'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={cropName}
//                 onChangeText={setCropName}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//             )}

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchDaily}>
//               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
//             </TouchableOpacity>

//             <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Short-term Forecast */}
//         {selectedTab === 'short' && (
//           <View>
//             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'}
//                   onValueChange={v => (v !== 'Other' ? setStfMandi(v) : null)}
//                 >
//                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                   {mandiOptions.map(m => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {(!isPredefined(stfMandi, mandiOptions) && stfMandi) && (
//                 <TextInput
//                   placeholder={t('type_mandi') ?? 'Type mandi name'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={stfMandi}
//                   onChangeText={setStfMandi}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'}
//                   onValueChange={v => (v !== 'Other' ? setStfCrop(v) : null)}
//                 >
//                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                   {cropOptions.map(c => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {(!isPredefined(stfCrop, cropOptions) && stfCrop) && (
//                 <TextInput
//                   placeholder={t('type_crop') ?? 'Type crop name'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={stfCrop}
//                   onChangeText={setStfCrop}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

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
//                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={[styles.chartBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>
//                   {forecastLoading
//                     ? t('loading') ?? 'Loading...'
//                     : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}
//                 </Text>
//               </View>
//               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
//             </View>
//           </View>
//         )}

//         {/* Pre Bidding Inline UI */}
//         {selectedTab === 'pre' && (
//           <View style={[styles.formBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
//             <Text style={[styles.title, { color: theme.text, marginBottom: 16 }]}>Pre Bidding Form</Text>

//             <Text style={[styles.formTitle, { color: theme.text }]}>Crop</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker
//                 selectedValue={isPredefined(preCrop, cropOptions) ? preCrop : 'Other'}
//                 onValueChange={v => (v !== 'Other' ? setPreCrop(v) : null)}
//               >
//                 <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                 {cropOptions.map(c => (
//                   <Picker.Item key={c} label={c} value={c} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {(!isPredefined(preCrop, cropOptions) && preCrop) && (
//               <TextInput
//                 placeholder={t('type_crop') ?? 'Type crop'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={preCrop}
//                 onChangeText={setPreCrop}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//             )}

//             <Text style={[styles.formTitle, { color: theme.text }]}>Mandi</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker
//                 selectedValue={isPredefined(preMandi, mandiOptions) ? preMandi : 'Other'}
//                 onValueChange={v => (v !== 'Other' ? setPreMandi(v) : null)}
//               >
//                 <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                 {mandiOptions.map(m => (
//                   <Picker.Item key={m} label={m} value={m} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {(!isPredefined(preMandi, mandiOptions) && preMandi) && (
//               <TextInput
//                 placeholder={t('type_mandi') ?? 'Type mandi'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={preMandi}
//                 onChangeText={setPreMandi}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//             )}

//             <Text style={[styles.formTitle, { color: theme.text }]}>Bid Amount (Rs/quintal)</Text>
//             <TextInput
//               placeholder="Enter bid amount"
//               placeholderTextColor={theme.text ?? '#999'}
//               value={preBidAmount}
//               onChangeText={setPreBidAmount}
//               keyboardType="numeric"
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.formTitle, { color: theme.text }]}>Expected Arrival Date</Text>
//             <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]} onPress={openDatePicker}>
//               <Text style={{ color: preExpectedArrival ? theme.text : '#999' }}>
//                 {preExpectedArrival || (t('enter_date') ?? 'dd-mm-yyyy')}
//               </Text>
//             </TouchableOpacity>
//             {preExpectedArrival && (
//               <TouchableOpacity onPress={() => setPreExpectedArrival('')} style={{ marginTop: 6 }}>
//                 <Text style={{ color: theme.primary, fontSize: 12 }}>Clear</Text>
//               </TouchableOpacity>
//             )}

//             {showDatePicker && (
//               <DateTimePicker
//                 value={dateValue}
//                 mode="date"
//                 display={Platform.OS === 'android' ? 'default' : 'spinner'}
//                 onChange={onChangeDate}
//                 maximumDate={new Date(2100, 11, 31)}
//                 minimumDate={new Date()}
//               />
//             )}

//             <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={submitPreBid}>
//               <Text style={[styles.addBtnText, { color: '#fff' }]}>Submit Pre Bid</Text>
//             </TouchableOpacity>
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
//   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
//   text: { fontSize: 16, marginBottom: 12 },

//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
//   tabText: { fontWeight: '600' },
//   tabTextSelected: { color: '#fff' },

//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8 },
//   pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
//   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   searchBtnText: { fontWeight: '700' },

//   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   chartTitle: { fontWeight: '700', marginBottom: 10 },
//   chartPlaceholder: { height: 220, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', padding: 8 },

//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },

//   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
//   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
//   addBtnText: { fontWeight: '700', color: '#fff' },
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

export default function BuyerDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const goBack = () => navigation.navigate('Dashboard');

  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'pre'>('daily');

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

  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion'];
  const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

  const isPredefined = (value: string, options: string[]) =>
    value === '' || options.includes(value) || value === 'Other';

  // Load all registered lots (same logic as BuyerPreBidding)
  const loadAllRegisteredLots = async () => {
    setLoadingLots(true);
    try {
      const keys = await AsyncStorage.getAllKeys();
      const lotKeys = keys.filter(k => k.startsWith('REGISTERED_LOTS_'));
      if (lotKeys.length === 0) {
        setLots([]);
        setLoadingLots(false);
        return;
      }
      const pairs = await AsyncStorage.multiGet(lotKeys);
      const aggregated: Lot[] = [];
      pairs.forEach(([key, json]) => {
        if (!json) return;
        try {
          const parsed: Lot[] = JSON.parse(json);
          const owner = key.replace('REGISTERED_LOTS_', '');
          parsed.forEach(l => aggregated.push({ ...l, owner }));
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
      let bids: any[] = existing ? JSON.parse(existing) : [];
      bids.unshift({
        lotId: lot.id,
        lotOwner: lot.owner,
        bidder,
        bidValue: value,
        createdAt: Date.now(),
      });
      await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

      Alert.alert('Success', `Bid of ₹${value}/quintal placed!`);
      setBidValues(s => ({ ...s, [lot.id]: '' }));
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back') || 'Back'}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('buyer_dashboard') || 'Buyer Dashboard'}</Text>
        <Text style={[styles.text, { color: theme.text }]}>{t('buyer_msg') || 'Find and bid on crop lots'}</Text>

        <View style={styles.tabsRow}>
          {(['daily', 'short', 'pre'] as const).map(tab => (
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
                {tab === 'daily' ? t('daily_market_price') : tab === 'short' ? t('short_term_forecast') : t('pre_bidding') || 'Pre Bidding'}
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

                   <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop:12 }]}>

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
              {/* Same picker logic as daily but for stfMandi / stfCrop */}
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

        {/* PRE BIDDING TAB - FULLY INLINE */}
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
  tab: { flex: 0.32, padding: 12, borderRadius: 10, alignItems: 'center' },
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
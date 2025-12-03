// // import React, { useEffect, useState, useCallback, useMemo } from 'react';
// // import { Text, TouchableOpacity, StyleSheet, View, TextInput, Alert, FlatList, Platform } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// // import { Picker } from '@react-native-picker/picker';

// // import GraphChart from '../components/GraphChart';

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

// // export default function FarmerDashboard() {
// //   const navigation = useNavigation<PropsNav>();
// //   const goBack = () => navigation.navigate('Dashboard');

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

// //   // Daily mandi/crop search
// //   const [mandiName, setMandiName] = useState('');
// //   const [cropName, setCropName] = useState('');
// //   const [appliedFilters, setAppliedFilters] = useState({ mandi: '', crop: '' });

// //   // Short-term forecast state
// //   const [stfMandi, setStfMandi] = useState('');
// //   const [stfCrop, setStfCrop] = useState('');
// //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// //   const [forecastLoading, setForecastLoading] = useState(false);

// //   // Pre-register state
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

// //   useEffect(() => {
// //     if (!prCrop) {
// //       setPrGrade('');
// //       return;
// //     }
// //     const options = gradeMap[prCrop] || ['Other'];
// //     if (!options.includes(prGrade)) {
// //       setPrGrade('');
// //     }
// //   }, [prCrop]);

// //   const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
// //     if (tab === 'short') {
// //       setSelectedTab('short');
// //       setStfMandi(mandiName);
// //       setStfCrop(cropName);
// //       return;
// //     }
// //     if (tab === 'preregister') {
// //       setSelectedTab('preregister');
// //       return;
// //     }
// //     setSelectedTab('daily');
// //   };

// //   const onSearchDaily = () => {
// //     if (!mandiName && !cropName) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// //       return;
// //     }
// //     setAppliedFilters({ mandi: mandiName, crop: cropName });
// //   };

// //   const getShortTermForecastInline = async () => {
// //     if (!stfMandi && !stfCrop) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// //       return;
// //     }
// //     try {
// //       setForecastLoading(true);
// //       setForecastSummary(null);
// //       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
// //       setForecastSummary(summary);
// //     } catch (err) {
// //       console.error(err);
// //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
// //     } finally {
// //       setForecastLoading(false);
// //     }
// //   };

// //   const addLotInline = async () => {
// //     if (!prCrop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
// //     if (!prQuantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
// //     if (!prMandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

// //     const newLot: Lot = {
// //       id: `${Date.now()}`,
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

// //     setPrCrop('');
// //     setPrGrade('');
// //     setPrQuantity('');
// //     setPrMandi('');
// //     setPrExpectedArrival('');
// //     setDateValue(new Date());
// //     setShowDatePicker(false);

// //     Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
// //   };

// //   const removeLot = async (id: string) => {
// //     const filtered = lots.filter((l) => l.id !== id);
// //     setLots(filtered);
// //     if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
// //   };

// //   const formatDate = (d: Date) => {
// //     const dd = String(d.getDate()).padStart(2, '0');
// //     const mm = String(d.getMonth() + 1).padStart(2, '0');
// //     const yyyy = d.getFullYear();
// //     return `${dd}-${mm}-${yyyy}`;
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
// //       const parts = prExpectedArrival.split('-').map((p) => parseInt(p, 10));
// //       if (parts.length === 3 && !isNaN(parts[0])) {
// //         setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
// //       }
// //     }
// //     setShowDatePicker(true);
// //   };

// //   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

// //   // "Other" flags for daily tab
// //   const [isDailyCropOther, setIsDailyCropOther] = useState(false);
// //   const [isDailyMandiOther, setIsDailyMandiOther] = useState(false);

// //   useEffect(() => {
// //     setIsDailyCropOther(cropName === 'Other');
// //     setIsDailyMandiOther(mandiName === 'Other');
// //   }, [cropName, mandiName]);

// //   const ListHeaderElement = useMemo(() => {
// //     return (
// //       <View>
// //         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
// //         </TouchableOpacity>

// //         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>
// //         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

// //         <View style={styles.tabsRow}>
// //           <TouchableOpacity
// //             style={[styles.tab, selectedTab === 'daily' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' }]}
// //             onPress={() => onSelectTab('daily')}
// //           >
// //             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[styles.tab, selectedTab === 'short' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' }]}
// //             onPress={() => onSelectTab('short')}
// //           >
// //             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[styles.tab, selectedTab === 'preregister' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' }]}
// //             onPress={() => onSelectTab('preregister')}
// //           >
// //             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Daily Market Price */}
// //         {selectedTab === 'daily' && (
// //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker selectedValue={mandiName} onValueChange={(v) => setMandiName(v)}>
// //                 <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// //                 {mandiOptions.map((m) => (
// //                   <Picker.Item key={m} label={m} value={m} />
// //                 ))}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {isDailyMandiOther && (
// //               <TextInput
// //                 placeholder={t('type_mandi') ?? 'Type mandi'}
// //                 placeholderTextColor={theme.text ?? '#999'}
// //                 value={mandiName === 'Other' ? '' : mandiName}
// //                 onChangeText={(txt) => setMandiName(txt)}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// //             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //               <Picker selectedValue={cropName} onValueChange={(v) => setCropName(v)}>
// //                 <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// //                 {cropOptions.map((c) => (
// //                   <Picker.Item key={c} label={c} value={c} />
// //                 ))}
// //                 <Picker.Item label="Other" value="Other" />
// //               </Picker>
// //             </View>
// //             {isDailyCropOther && (
// //               <TextInput
// //                 placeholder={t('type_crop') ?? 'Type crop'}
// //                 placeholderTextColor={theme.text ?? '#999'}
// //                 value={cropName === 'Other' ? '' : cropName}
// //                 onChangeText={(txt) => setCropName(txt)}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //             )}

// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchDaily}>
// //               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         {selectedTab === 'daily' && (
// //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
// //             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// //             <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
// //               <GraphChart filters={appliedFilters} />
// //             </View>
// //           </View>
// //         )}

// //         {/* Short-term Forecast — NOW WITH DROPDOWNS */}
// //         {selectedTab === 'short' && (
// //           <>
// //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' }]}>
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={stfMandi} onValueChange={(v) => setStfMandi(v)}>
// //                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// //                   {mandiOptions.map((m) => (
// //                     <Picker.Item key={m} label={m} value={m} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {stfMandi === 'Other' && (
// //                 <TextInput
// //                   placeholder={t('type_mandi') ?? 'Type mandi name'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value={stfMandi !== 'Other' ? '' : stfMandi}   // let the user type freely
// //                   onChangeText={(txt) => setStfMandi(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={stfCrop} onValueChange={(v) => setStfCrop(v)}>
// //                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// //                   {cropOptions.map((c) => (
// //                     <Picker.Item key={c} label={c} value={c} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {stfCrop === 'Other' && (
// //                 <TextInput
// //                   placeholder={t('type_crop') ?? 'Type crop name'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value=""
// //                   onChangeText={(txt) => setStfCrop(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
// //               <View style={styles.horizonRow}>
// //                 <TouchableOpacity
// //                   style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
// //                   onPress={() => setHorizon('7days')}
// //                 >
// //                   <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity
// //                   style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
// //                   onPress={() => setHorizon('14days')}
// //                 >
// //                   <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity
// //                   style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
// //                   onPress={() => setHorizon('30days')}
// //                 >
// //                   <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
// //                 </TouchableOpacity>
// //               </View>

// //               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
// //                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={[styles.chartBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: theme.text ?? '#666' }}>
// //                   {forecastLoading ? t('loading') ?? 'Loading...' : forecastSummary ?? t('chart_placeholder_text') ?? 'Forecast chart will appear here'}
// //                 </Text>
// //               </View>
// //               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
// //             </View>
// //           </>
// //         )}

// //         {/* Pre-register Form */}
// //         {selectedTab === 'preregister' && (
// //           <>
// //             <View style={[styles.formBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background }]}>
// //               <View style={styles.formHeaderRow}>
// //                 <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
// //               </View>

// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={prCrop} onValueChange={(v) => setPrCrop(v)}>
// //                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// //                   {cropOptions.map((c) => (
// //                     <Picker.Item key={c} label={c} value={c} />
                    
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
                  
// //                 </Picker>
// //               </View>
// //               {prCrop === 'Other' && (
// //                 <TextInput
// //                   placeholder={t('type_crop') ?? 'Type crop'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value=""
// //                   onChangeText={(txt) => setPrCrop(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={prGrade} onValueChange={(v) => setPrGrade(v)}>
// //                   <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
// //                   {currentGrades.map((g) => (
// //                     <Picker.Item key={g} label={g} value={g} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //               {prGrade === 'Other' && (
// //                 <TextInput
// //                   placeholder={t('type_grade') ?? 'Type grade'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value=""
// //                   onChangeText={(txt) => setPrGrade(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('quantity_label') ?? 'Quantity (quintal)'}</Text>
// //               <TextInput
// //                 placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
// //                 placeholderTextColor={theme.text ?? '#999'}
// //                 value={prQuantity}
// //                 onChangeText={setPrQuantity}
// //                 keyboardType="numeric"
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />

// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('mandi_label') ?? 'Mandi Location'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={prMandi} onValueChange={(v) => setPrMandi(v)}>
// //                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// //                   {mandiOptions.map((m) => (
// //                     <Picker.Item key={m} label={m} value={m} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {prMandi === 'Other' && (
// //                 <TextInput
// //                   placeholder={t('type_mandi') ?? 'Type mandi'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value=""
// //                   onChangeText={(txt) => setPrMandi(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
// //               <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]} onPress={openDatePicker}>
// //                 <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
// //                   {prExpectedArrival || (t('enter_date') ?? 'dd-mm-yyyy')}
// //                 </Text>
// //               </TouchableOpacity>
// //               {prExpectedArrival && (
// //                 <TouchableOpacity onPress={() => setPrExpectedArrival('')} style={{ marginTop: 6 }}>
// //                   <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
// //                 </TouchableOpacity>
// //               )}

// //               {showDatePicker && (
// //                 <DateTimePicker
// //                   value={dateValue}
// //                   mode="date"
// //                   display={Platform.OS === 'android' ? 'default' : 'spinner'}
// //                   onChange={onChangeDate}
// //                   maximumDate={new Date(2100, 11, 31)}
// //                   minimumDate={new Date(2000, 0, 1)}
// //                 />
// //               )}

// //               <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
// //                 <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>
// //           </>
// //         )}
// //       </View>
// //     );
// //   }, [
// //     theme, t, selectedTab, mandiName, cropName, stfMandi, stfCrop, horizon,
// //     forecastLoading, forecastSummary, prCrop, prGrade, prQuantity, prMandi,
// //     prExpectedArrival, appliedFilters, isDailyCropOther, isDailyMandiOther,
// //   ]);

// //   const renderLotItem = useCallback(({ item }: { item: Lot }) => (
// //     <View style={[styles.lotItem, { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background }]}>
// //       <View style={{ flex: 1 }}>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
// //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
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
// //         <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
// //       </View>
// //     );
// //   }, [selectedTab, theme, t]);

// //   const listData = selectedTab === 'preregister' ? lots : [];

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <FlatList
// //         data={listData}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderLotItem}
// //         ListHeaderComponent={ListHeaderElement}
// //         ListEmptyComponent={renderEmpty}
// //         contentContainerStyle={{ paddingBottom: 30 }}
// //         keyboardShouldPersistTaps="always"
// //         removeClippedSubviews={false}
// //       />
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
// //   searchTitle: { fontWeight: '700', marginBottom: 8, marginTop: 8 },
// //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// //   searchBtnText: { fontWeight: '700' },

// //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
// //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// //   chartPlaceholder: { height: 220, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', padding: 8 },

// //   horizonRow: { flexDirection: 'row', marginBottom: 12 },
// //   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
// //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// //   horizonText: { color: '#333', fontWeight: '600' },
// //   horizonTextActive: { color: '#fff', fontWeight: '700' },

// //   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
// //   formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
// //   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
// //   addBtnText: { fontWeight: '700', color: '#fff' },

// //   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 12 },
// //   emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
// //   lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
// //   lotText: { marginBottom: 6 },
// //   removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
// //   removeBtnText: { color: '#fff', fontWeight: '700' },
// //   pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },
// // });

// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import { Text, TouchableOpacity, StyleSheet, View, TextInput, Alert, FlatList, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';

// import GraphChart from '../components/GraphChart';

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

//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

//   // Daily mandi/crop search
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');
//   const [appliedFilters, setAppliedFilters] = useState({ mandi: '', crop: '' });

//   // Short-term forecast state
//   const [stfMandi, setStfMandi] = useState('');
//   const [stfCrop, setStfCrop] = useState('');
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
//   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
//   const [forecastLoading, setForecastLoading] = useState(false);

//   // Pre-register state
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

//   useEffect(() => {
//     if (!prCrop) {
//       setPrGrade('');
//       return;
//     }
//     const options = gradeMap[prCrop] || ['Other'];
//     if (!options.includes(prGrade)) {
//       setPrGrade('');
//     }
//   }, [prCrop]);

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

//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }
//     setAppliedFilters({ mandi: mandiName, crop: cropName });
//   };

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
//     if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));

//     setPrCrop('');
//     setPrGrade('');
//     setPrQuantity('');
//     setPrMandi('');
//     setPrExpectedArrival('');
//     setDateValue(new Date());
//     setShowDatePicker(false);

//     Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
//   };

//   const removeLot = async (id: string) => {
//     const filtered = lots.filter((l) => l.id !== id);
//     setLots(filtered);
//     if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
//   };

//   const formatDate = (d: Date) => {
//     const dd = String(d.getDate()).padStart(2, '0');
//     const mm = String(d.getMonth() + 1).padStart(2, '0');
//     const yyyy = d.getFullYear();
//     return `${dd}-${mm}-${yyyy}`;
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
//       }
//     }
//     setShowDatePicker(true);
//   };

//   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

//   // Helper: Check if value is a valid picker option (not custom "Other" text)
//   const isValidPickerValue = (value: string, options: string[]) => {
//     return value === '' || options.includes(value) || value === 'Other';
//   };

//   const ListHeaderElement = useMemo(() => {
//     return (
//       <View>
//         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>
//         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'daily' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' }]}
//             onPress={() => onSelectTab('daily')}
//           >
//             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'short' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' }]}
//             onPress={() => onSelectTab('short')}
//           >
//             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'preregister' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' }]}
//             onPress={() => onSelectTab('preregister')}
//           >
//             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Daily Market Price */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker
//                 selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''}
//                 onValueChange={(v) => setMandiName(v)}
//               >
//                 <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                 {mandiOptions.map((m) => (
//                   <Picker.Item key={m} label={m} value={m} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {mandiName && !isValidPickerValue(mandiName, mandiOptions) && mandiName !== 'Other' && (
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
//                 selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''}
//                 onValueChange={(v) => setCropName(v)}
//               >
//                 <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                 {cropOptions.map((c) => (
//                   <Picker.Item key={c} label={c} value={c} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>
//             {cropName && !isValidPickerValue(cropName, cropOptions) && cropName !== 'Other' && (
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
//           </View>
//         )}

//         {selectedTab === 'daily' && (
//           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
//             <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
//               <GraphChart filters={appliedFilters} />
//             </View>
//           </View>
//         )}

//         {/* Short-term Forecast */}
//         {selectedTab === 'short' && (
//           <>
//             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' }]}>
//               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isValidPickerValue(stfMandi, mandiOptions) ? stfMandi : ''}
//                   onValueChange={(v) => setStfMandi(v)}
//                 >
//                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                   {mandiOptions.map((m) => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {stfMandi && !isValidPickerValue(stfMandi, mandiOptions) && (
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
//                   selectedValue={isValidPickerValue(stfCrop, cropOptions) ? stfCrop : ''}
//                   onValueChange={(v) => setStfCrop(v)}
//                 >
//                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                   {cropOptions.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {stfCrop && !isValidPickerValue(stfCrop, cropOptions) && (
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

//             <View style={[styles.chartBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>
//                   {forecastLoading ? t('loading') ?? 'Loading...' : forecastSummary ?? t('chart_placeholder_text') ?? 'Forecast chart will appear here'}
//                 </Text>
//               </View>
//               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
//             </View>
//           </>
//         )}

//         {/* Pre-register Form */}
//         {selectedTab === 'preregister' && (
//           <>
//             <View style={[styles.formBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background }]}>
//               <View style={styles.formHeaderRow}>
//                 <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
//               </View>

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isValidPickerValue(prCrop, cropOptions) ? prCrop : ''}
//                   onValueChange={(v) => setPrCrop(v)}
//                 >
//                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                   {cropOptions.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {prCrop && !isValidPickerValue(prCrop, cropOptions) && (
//                 <TextInput
//                   placeholder={t('type_crop') ?? 'Type crop'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={prCrop}
//                   onChangeText={setPrCrop}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker selectedValue={prGrade} onValueChange={(v) => setPrGrade(v)}>
//                   <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
//                   {currentGrades.map((g) => (
//                     <Picker.Item key={g} label={g} value={g} />
//                   ))}
//                 </Picker>
//               </View>
//               {prGrade === 'Other' && (
//                 <TextInput
//                   placeholder={t('type_grade') ?? 'Type grade'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={prGrade}
//                   onChangeText={setPrGrade}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

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
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isValidPickerValue(prMandi, mandiOptions) ? prMandi : ''}
//                   onValueChange={(v) => setPrMandi(v)}
//                 >
//                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                   {mandiOptions.map((m) => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//               {prMandi && !isValidPickerValue(prMandi, mandiOptions) && (
//                 <TextInput
//                   placeholder={t('type_mandi') ?? 'Type mandi'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={prMandi}
//                   onChangeText={setPrMandi}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
//               <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]} onPress={openDatePicker}>
//                 <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
//                   {prExpectedArrival || (t('enter_date') ?? 'dd-mm-yyyy')}
//                 </Text>
//               </TouchableOpacity>
//               {prExpectedArrival && (
//                 <TouchableOpacity onPress={() => setPrExpectedArrival('')} style={{ marginTop: 6 }}>
//                   <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
//                 </TouchableOpacity>
//               )}

//               {showDatePicker && (
//                 <DateTimePicker
//                   value={dateValue}
//                   mode="date"
//                   display={Platform.OS === 'android' ? 'default' : 'spinner'}
//                   onChange={onChangeDate}
//                   maximumDate={new Date(2100, 11, 31)}
//                   minimumDate={new Date(2000, 0, 1)}
//                 />
//               )}

//               <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
//                 <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>
//           </>
//         )}
//       </View>
//     );
//   }, [
//     theme, t, selectedTab, mandiName, cropName, stfMandi, stfCrop, horizon,
//     forecastLoading, forecastSummary, prCrop, prGrade, prQuantity, prMandi,
//     prExpectedArrival, appliedFilters,
//   ]);

//   const renderLotItem = useCallback(({ item }: { item: Lot }) => (
//     <View style={[styles.lotItem, { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background }]}>
//       <View style={{ flex: 1 }}>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
//         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
//       </View>
//       <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
//         <Text style={styles.removeBtnText}>×</Text>
//       </TouchableOpacity>
//     </View>
//   ), [theme, t, removeLot]);

//   const renderEmpty = useCallback(() => {
//     if (selectedTab !== 'preregister') return null;
//     return (
//       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
//         <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
//       </View>
//     );
//   }, [selectedTab, theme, t]);

//   const listData = selectedTab === 'preregister' ? lots : [];

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <FlatList
//         data={listData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderLotItem}
//         ListHeaderComponent={ListHeaderElement}
//         ListEmptyComponent={renderEmpty}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         keyboardShouldPersistTaps="always"
//         removeClippedSubviews={false}
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

//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8, marginTop: 8 },
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
//   formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
//   formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
//   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
//   addBtnText: { fontWeight: '700', color: '#fff' },

//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 12 },
//   emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
//   lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
//   lotText: { marginBottom: 6 },
//   removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
//   removeBtnText: { color: '#fff', fontWeight: '700' },
//   pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },
// });

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Alert, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import GraphChart from '../components/GraphChart';

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

  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

  // Daily mandi/crop search
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ mandi: '', crop: '' });

  // Short-term forecast state
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  // Pre-register state
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

  useEffect(() => {
    if (!prCrop) {
      setPrGrade('');
      return;
    }
    const options = gradeMap[prCrop] || ['Other'];
    if (!options.includes(prGrade)) {
      setPrGrade('');
    }
  }, [prCrop, prGrade]);

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

  const onSearchDaily = () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    setAppliedFilters({ mandi: mandiName, crop: cropName });
  };

  const getShortTermForecastInline = async () => {
    if (!stfMandi && !stfCrop) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    try {
      setForecastLoading(true);
      setForecastSummary(null);
      const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${
        stfCrop || 'selected crop'
      } at ${stfMandi || 'selected mandi'} — ${
        horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
      }.`;
      setForecastSummary(summary);
    } catch (err) {
      console.error(err);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
    } finally {
      setForecastLoading(false);
    }
  };

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
    if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));

    setPrCrop('');
    setPrGrade('');
    setPrQuantity('');
    setPrMandi('');
    setPrExpectedArrival('');
    setDateValue(new Date());
    setShowDatePicker(false);

    Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
  };

  const removeLot = async (id: string) => {
    const filtered = lots.filter((l) => l.id !== id);
    setLots(filtered);
    if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
  };

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
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

  // Helper: Check if value is a valid picker option (not custom "Other" text)
  const isValidPickerValue = (value: string, options: string[]) => {
    return value === '' || options.includes(value) || value === 'Other';
  };

  const ListHeaderElement = useMemo(() => {
    return (
      <View>
        <TouchableOpacity
          onPress={goBack}
          style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}
        >
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
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'daily' ? styles.tabTextSelected : {},
              ]}
            >
              {t('daily_market_price')}
            </Text>
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
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'short' ? styles.tabTextSelected : {},
              ]}
            >
              {t('short_term_forecast')}
            </Text>
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
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'preregister' ? styles.tabTextSelected : {},
              ]}
            >
              {t('pre_register_lot')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily Market Price */}
        {selectedTab === 'daily' && (
          <View
            style={[
              styles.searchBox,
              { backgroundColor: theme.background, borderColor: theme.text },
            ]}
          >
            <Text style={[styles.searchTitle, { color: theme.text }]}>
              {t('mandi') ?? 'Mandi'}
            </Text>
            <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
              <Picker
                selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''}
                onValueChange={(v) => setMandiName(v)}
              >
                <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
                {mandiOptions.map((m) => (
                  <Picker.Item key={m} label={m} value={m} />
                ))}
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            {mandiName &&
              !isValidPickerValue(mandiName, mandiOptions) &&
              mandiName !== 'Other' && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={mandiName}
                  onChangeText={setMandiName}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

            <Text style={[styles.searchTitle, { color: theme.text }]}>
              {t('crop') ?? 'Crop'}
            </Text>
            <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
              <Picker
                selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''}
                onValueChange={(v) => setCropName(v)}
              >
                <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
                {cropOptions.map((c) => (
                  <Picker.Item key={c} label={c} value={c} />
                ))}
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            {cropName &&
              !isValidPickerValue(cropName, cropOptions) &&
              cropName !== 'Other' && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={cropName}
                  onChangeText={setCropName}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

            <TouchableOpacity
              style={[
                styles.searchBtn,
                { backgroundColor: theme.primary ?? '#2b6cb0' },
              ]}
              onPress={onSearchDaily}
            >
              <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'daily' && (
          <View
            style={[
              styles.chartBox,
              { borderColor: theme.text, backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.chartTitle, { color: theme.text }]}>
              {t('daily_market_price_chart_title')}
            </Text>
            <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
              <GraphChart filters={appliedFilters} />
            </View>
          </View>
        )}

        {/* Short-term Forecast */}
        {selectedTab === 'short' && (
          <>
            <View
              style={[
                styles.searchBox,
                { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' },
              ]}
            >
              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('mandi') ?? 'Mandi'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isValidPickerValue(stfMandi, mandiOptions) ? stfMandi : ''}
                  onValueChange={(v) => setStfMandi(v)}
                >
                  <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
                  {mandiOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {stfMandi && !isValidPickerValue(stfMandi, mandiOptions) && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi name'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={stfMandi}
                  onChangeText={setStfMandi}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('crop') ?? 'Crop'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isValidPickerValue(stfCrop, cropOptions) ? stfCrop : ''}
                  onValueChange={(v) => setStfCrop(v)}
                >
                  <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
                  {cropOptions.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {stfCrop && !isValidPickerValue(stfCrop, cropOptions) && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop name'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={stfCrop}
                  onChangeText={setStfCrop}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('forecast_horizon') ?? 'Duration (in days)'}
              </Text>
              <View style={styles.horizonRow}>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '7days' ? styles.horizonBtnActive : {},
                  ]}
                  onPress={() => setHorizon('7days')}
                >
                  <Text
                    style={
                      horizon === '7days' ? styles.horizonTextActive : styles.horizonText
                    }
                  >
                    7
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '14days' ? styles.horizonBtnActive : {},
                  ]}
                  onPress={() => setHorizon('14days')}
                >
                  <Text
                    style={
                      horizon === '14days' ? styles.horizonTextActive : styles.horizonText
                    }
                  >
                    14
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '30days' ? styles.horizonBtnActive : {},
                  ]}
                  onPress={() => setHorizon('30days')}
                >
                  <Text
                    style={
                      horizon === '30days' ? styles.horizonTextActive : styles.horizonText
                    }
                  >
                    30
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.searchBtn,
                  { backgroundColor: theme.primary ?? '#2b6cb0' },
                ]}
                onPress={getShortTermForecastInline}
              >
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>
                  {t('get_forecast') ?? 'Get Forecast'}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartBox,
                {
                  borderColor: theme.text ?? '#ddd',
                  backgroundColor: theme.background ?? '#fff',
                },
              ]}
            >
              <Text style={[styles.chartTitle, { color: theme.text }]}>
                {t('short_term_forecast')}
              </Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: theme.text ?? '#666' }}>
                  {forecastLoading
                    ? t('loading') ?? 'Loading...'
                    : forecastSummary ??
                      t('chart_placeholder_text') ??
                      'Forecast chart will appear here'}
                </Text>
              </View>
              {forecastSummary && (
                <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>
              )}
            </View>
          </>
        )}

        {/* Pre-register Form */}
        {selectedTab === 'preregister' && (
          <>
            <View
              style={[
                styles.formBox,
                { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background },
              ]}
            >
              <View style={styles.formHeaderRow}>
                <Text style={[styles.title, { color: theme.text }]}>
                  {t('pre_register_title') ?? 'Register Harvested Crop Lot'}
                </Text>
              </View>

              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('crop') ?? 'Crop'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isValidPickerValue(prCrop, cropOptions) ? prCrop : ''}
                  onValueChange={(v) => setPrCrop(v)}
                >
                  <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
                  {cropOptions.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {prCrop && !isValidPickerValue(prCrop, cropOptions) && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prCrop}
                  onChangeText={setPrCrop}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('grade_label') ?? 'Grade'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker selectedValue={prGrade} onValueChange={(v) => setPrGrade(v)}>
                  <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
                  {currentGrades.map((g) => (
                    <Picker.Item key={g} label={g} value={g} />
                  ))}
                </Picker>
              </View>
              {prGrade === 'Other' && (
                <TextInput
                  placeholder={t('type_grade') ?? 'Type grade'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prGrade}
                  onChangeText={setPrGrade}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('quantity_label') ?? 'Quantity (quintal)'}
              </Text>
              <TextInput
                placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prQuantity}
                onChangeText={setPrQuantity}
                keyboardType="numeric"
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('mandi_label') ?? 'Mandi Location'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={isValidPickerValue(prMandi, mandiOptions) ? prMandi : ''}
                  onValueChange={(v) => setPrMandi(v)}
                >
                  <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
                  {mandiOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {prMandi && !isValidPickerValue(prMandi, mandiOptions) && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prMandi}
                  onChangeText={setPrMandi}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              {/* ✅ Expected Arrival Date with calendar icon inside the box */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('arrival_label') ?? 'Expected Arrival Date'}
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
                  {prExpectedArrival || (t('enter_date') ?? 'dd-mm-yyyy')}
                </Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              {prExpectedArrival && (
                <TouchableOpacity
                  onPress={() => setPrExpectedArrival('')}
                  style={{ marginTop: 6 }}
                >
                  <Text style={{ color: theme.primary, fontSize: 12 }}>
                    {t('clear') ?? 'Clear'}
                  </Text>
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
                style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]}
                onPress={addLotInline}
              >
                <Text style={[styles.addBtnText, { color: '#fff' }]}>
                  {t('add_lot') ?? 'Add Lot'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('your_registered_lots') ?? 'Your Registered Lots'}
            </Text>
          </>
        )}
      </View>
    );
  }, [
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
    appliedFilters,
    showDatePicker,   // ✅ added so picker re-renders
    dateValue,        // ✅ added for safety
  ]);

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
            <Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>
            {item.crop}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>
            {item.grade}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>
            {item.quantity}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>
            {item.mandi}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            <Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>
            {item.expectedArrival}
          </Text>
        </View>
        <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
          <Text style={styles.removeBtnText}>×</Text>
        </TouchableOpacity>
      </View>
    ),
    [theme, t, removeLot]
  );

  const renderEmpty = useCallback(() => {
    if (selectedTab !== 'preregister') return null;
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>
          {t('no_lots') ?? 'No lots registered yet'}
        </Text>
      </View>
    );
  }, [selectedTab, theme, t]);

  const listData = selectedTab === 'preregister' ? lots : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderLotItem}
        ListHeaderComponent={ListHeaderElement}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false}
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
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 12 },

  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
  tabText: { fontWeight: '600', color: '#333' },
  tabTextSelected: { color: '#fff' },

  searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchTitle: { fontWeight: '700', marginBottom: 8, marginTop: 8 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
  searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  searchBtnText: { fontWeight: '700' },

  chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
  chartTitle: { fontWeight: '700', marginBottom: 10 },
  chartPlaceholder: {
    height: 220,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: {
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#efefef',
    alignItems: 'center',
    minWidth: 44,
  },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { color: '#333', fontWeight: '600' },
  horizonTextActive: { color: '#fff', fontWeight: '700' },

  formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  addBtnText: { fontWeight: '700', color: '#fff' },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },
  lotItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  lotText: { marginBottom: 6 },
  removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
  removeBtnText: { color: '#fff', fontWeight: '700' },
  pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },

  dateInput: {
    paddingVertical: 14,
  },
  calendarIcon: {
    fontSize: 22,
    marginLeft: 8,
  },
});

// // // import React, { useEffect, useState, useCallback, useMemo } from 'react';
// // // import { Text,TouchableOpacity,StyleSheet,View,TextInput,Alert,FlatList,Platform} from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import DropDownPicker from 'react-native-dropdown-picker';
// // // import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// // // import { Picker } from '@react-native-picker/picker';

// // // import GraphChart from '../components/GraphChart';
// // // import FilterBar from '../components/FilterBar';

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

// // // export default function FarmerDashboard() {
// // //   const navigation = useNavigation<PropsNav>();
// // //   const goBack = () => navigation.navigate('Dashboard');

// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   // which tab is selected
// // //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

// // //   // Daily mandi search (keeps original functionality)
// // //   const [filters, setFilters] = useState({ mandi: '', crop: '' });
// // //   const [appliedFilters, setAppliedFilters] = useState(filters);

// // //    const handleSearch = () => {
// // //   setAppliedFilters(filters);
// // //   };

// // //    {/* Filters */}

// // //          <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

// // //        {/* Graph */}

// // //        <View style={styles.graphContainer}>
// // //           <Text style={[styles.sectionTitle,{color:theme.text},{borderColor:theme.text}]}>{t('market_trends')}</Text>
// // //           <GraphChart filters={appliedFilters} />
// // //         </View>

// // //   const [mandiName, setMandiName] = useState('');
// // //   const [cropName, setCropName] = useState('');

// // //   // Short-term forecast inline state
// // //   const [stfMandi, setStfMandi] = useState('');
// // //   const [stfCrop, setStfCrop] = useState('');
// // //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// // //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// // //   const [forecastLoading, setForecastLoading] = useState(false);

// // //   // Pre-register inline state
// // //   const [prCrop, setPrCrop] = useState('');
// // //   const [prGrade, setPrGrade] = useState('');
// // //   const [prQuantity, setPrQuantity] = useState('');
// // //   const [prMandi, setPrMandi] = useState('');
// // //   const [prExpectedArrival, setPrExpectedArrival] = useState('');
// // //   const [lots, setLots] = useState<Lot[]>([]);
// // //   const [phone, setPhone] = useState<string | null>(null);

// // //    // Date picker state for preregister
// // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // //   const [dateValue, setDateValue] = useState<Date>(new Date());

// // //     const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

// // //   // Example lists - edit as needed or fetch from API
// // //   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion', 'Other'];
// // //   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi', 'Other'];

// // //   // grade options by crop (simple mapping)
// // //   const gradeMap: Record<string, string[]> = {
// // //     Wheat: ['A', 'B', 'C', 'Other'],
// // //     Rice: ['Super', 'Medium', 'Low', 'Other'],
// // //     Maize: ['Grade 1', 'Grade 2', 'Grade 3', 'Other'],
// // //     Onion: ['Goli', 'Golta', 'Golti', 'Other'],
// // //     Other: ['Other'],
// // //   };

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

// // //    useEffect(() => {
// // //     // when crop changes, reset grade if it's not in the new list
// // //     if (!prCrop) {
// // //       setPrGrade('');
// // //       return;
// // //     }
// // //     const options = gradeMap[prCrop] || ['Other'];
// // //     if (!options.includes(prGrade)) {
// // //       setPrGrade('');
// // //     }
// // //   }, [prCrop]);

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

// // //   // Daily mandi search action
// // //   const onSearchMandi = async () => {
// // //     if (!mandiName && !cropName) {
// // //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// // //       return;
// // //     }
// // //     try {
// // //       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
// // //     } catch (e) {}
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
// // //       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
// // //       setForecastSummary(summary);
// // //     } catch (err) {
// // //       console.error(err);
// // //       Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
// // //     } finally {
// // //       setForecastLoading(false);
// // //     }
// // //   };

// // //   // Pre-register inline: add lot
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
// // //     setDateValue(new Date());
// // //     setShowDatePicker(false);

// // //     Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
// // //   };

// // //   const removeLot = async (id: string) => {
// // //     const filtered = lots.filter((l) => l.id !== id);
// // //     setLots(filtered);
// // //     if (phone) await AsyncStorage.setItem(`REGISTERED_LOTS_${phone}`, JSON.stringify(filtered));
// // //   };


  
// // //   // Date helper
// // //   const formatDate = (d: Date) => {
// // //     const dd = String(d.getDate()).padStart(2, '0');
// // //     const mm = String(d.getMonth() + 1).padStart(2, '0');
// // //     const yyyy = d.getFullYear();
// // //     return `${dd}-${mm}-${yyyy}`;
// // //   };

// // //   // Date change handler (Android: close picker immediately)
// // //   const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
// // //     if (Platform.OS === 'android') {
// // //       setShowDatePicker(false);
// // //     }
// // //     if (selectedDate) {
// // //       setDateValue(selectedDate);
// // //       setPrExpectedArrival(formatDate(selectedDate));
// // //     }
// // //   };

// // //   const openDatePicker = () => {
// // //     if (prExpectedArrival) {
// // //       const parts = prExpectedArrival.split('-').map((p) => parseInt(p, 10));
// // //       if (parts.length === 3 && !isNaN(parts[0])) {
// // //         setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
// // //       } else {
// // //         setDateValue(new Date());
// // //       }
// // //     } else {
// // //       setDateValue(new Date());
// // //     }
// // //     setShowDatePicker(true);
// // //   };

// // //   // Helper: show text input when "Other" selected
// // //   const isCropOther = prCrop === 'Other';
// // //   const isMandiOther = prMandi === 'Other';
// // //   const isGradeOther = prGrade === 'Other';

// // //   // current grades list
// // //   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];


// // //   // Memoized header element (prevents FlatList from remounting header on every render)
// // //   const ListHeaderElement = useMemo(() => {
// // //     return (
// // //       <View>
// // //         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
// // //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
// // //         </TouchableOpacity>

// // //         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>
// // //         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

// // //         <View style={styles.tabsRow}>
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.tab,
// // //               selectedTab === 'daily'
// // //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// // //             ]}
// // //             onPress={() => onSelectTab('daily')}
// // //           >
// // //             <Text style={[styles.tabText,{color:theme.text}, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={[
// // //               styles.tab,
// // //               selectedTab === 'short'
// // //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// // //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// // //             ]}
// // //             onPress={() => onSelectTab('short')}
// // //           >
// // //             <Text style={[styles.tabText, {color:theme.text},selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
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
// // //             <Text style={[styles.tabText, {color:theme.text},{borderColor:theme.text},selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* Daily section */}
// // //         {selectedTab === 'daily' && (
// // //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
// // //             <Text style={[styles.searchTitle, { color: theme.text },{borderColor:theme.text}]}>{t('mandi') ?? 'Mandi'}</Text>
// // //             <TextInput
// // //               placeholder={t('enter_mandi') ?? 'Enter mandi name'}
// // //               placeholderTextColor={theme.text ?? '#999'}
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
// // //           </View>
// // //         )}

// // //         {/* Daily Market Price area */}
// // //         {selectedTab === 'daily' && (
// // //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
// // //             <Text style={[styles.chartTitle, { color: theme.text },{borderColor:theme.text}]}>{t('daily_market_price_chart_title')}</Text>
// // //             <View style={[styles.chartPlaceholder,{borderColor:theme.text}]}>
// // //               <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// // //             </View>
// // //           </View>
// // //         )}

// // //         {/* Short term inline */}
// // //         {selectedTab === 'short' && (
// // //           <>
// // //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text??'#ddd' }]}>
// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// // //               <TextInput
// // //                 placeholder={t('enter_mandi')}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={stfMandi}
// // //                 onChangeText={setStfMandi}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />
// // //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>
// // //               <TextInput
// // //                 placeholder={t('enter_crop')}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={stfCrop}
// // //                 onChangeText={setStfCrop}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               />
// // //               <Text style={[styles.searchTitle, { color: theme.text },{borderColor:theme.text}]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
// // //               <View style={styles.horizonRow}>
// // //                 <TouchableOpacity
// // //                   style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
// // //                   onPress={() => setHorizon('7days')}
// // //                 >
// // //                   <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
// // //                 </TouchableOpacity>

// // //                 <TouchableOpacity
// // //                   style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
// // //                   onPress={() => setHorizon('14days')}
// // //                 >
// // //                   <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
// // //                 </TouchableOpacity>

// // //                 <TouchableOpacity
// // //                   style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
// // //                   onPress={() => setHorizon('30days')}
// // //                 >
// // //                   <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
// // //                 </TouchableOpacity>
// // //               </View>

// // //               <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
// // //                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
// // //               </TouchableOpacity>
// // //             </View>

// // //             <View style={[styles.chartBox, { borderColor: theme.text ??'#ddd', backgroundColor: theme.background ?? '#fff' }]}>
// // //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
// // //               <View style={styles.chartPlaceholder}>
// // //                 <Text style={{ color: theme.text ?? '#666' }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
// // //               </View>
// // //               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
// // //             </View>
// // //           </>
// // //         )}

// // //         {/* Pre-register header & form - the list of lots is rendered by FlatList items below */}
// // //         {selectedTab === 'preregister' && (
// // //           <>
// // //             <View style={[styles.formBox, { borderColor: theme.text??'#ddd', backgroundColor: theme.background }]}>
// // //               <View style={styles.formHeaderRow}>
// // //                 <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
// // //               </View>

// // //               {/*Crop Picker*/}
// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// // //               {/* <TextInput
// // //                 placeholder={t('select_crop') ?? 'select crop'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prCrop}
// // //                 onChangeText={setPrCrop}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               /> */}
// // //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //                 <Picker selectedValue={prCrop} onValueChange={(v) => setPrCrop(v)}>
// // //                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// // //                   {cropOptions.map((c) => (
// // //                     <Picker.Item key={c} label={c} value={c} />
// // //                   ))}
// // //                 </Picker>
// // //               </View>
// // //                 {isCropOther && (
// // //                 <TextInput
// // //                   placeholder={t('type_crop') ?? 'Type crop'}
// // //                   placeholderTextColor={theme.text ?? '#999'}
// // //                   value={isCropOther ? '' : prCrop}
// // //                   onChangeText={(txt) => setPrCrop(txt)}
// // //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //                 />
// // //               )}

// // //                {/* Grade picker (dependent on crop) */}
// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
// // //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //                 <Picker selectedValue={prGrade} onValueChange={(v) => setPrGrade(v)}>
// // //                   <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
// // //                   {currentGrades.map((g) => (
// // //                     <Picker.Item key={g} label={g} value={g} />
// // //                   ))}
// // //                 </Picker>
// // //               </View>

// // //               {isGradeOther && (
// // //                 <TextInput
// // //                   placeholder={t('type_grade') ?? 'Type grade'}
// // //                   placeholderTextColor={theme.text ?? '#999'}
// // //                   value={isGradeOther ? '' : prGrade}
// // //                   onChangeText={(txt) => setPrGrade(txt)}
// // //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //                 />
// // //               )}

// // //               {/* <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
// // //               <TextInput
// // //                 placeholder={t('select_grade') ?? 'select grade'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prGrade}
// // //                 onChangeText={setPrGrade}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               /> */}

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
// // //               {/* <TextInput
// // //                 placeholder={t('select_mandi') ?? 'select mandi'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prMandi}
// // //                 onChangeText={setPrMandi}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               /> */}
// // //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// // //                 <Picker selectedValue={prMandi} onValueChange={(v) => setPrMandi(v)}>
// // //                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
// // //                   {mandiOptions.map((m) => (
// // //                     <Picker.Item key={m} label={m} value={m} />
// // //                   ))}
// // //                 </Picker>
// // //               </View>

// // //               {isMandiOther && (
// // //                 <TextInput
// // //                   placeholder={t('type_mandi') ?? 'Type mandi'}
// // //                   placeholderTextColor={theme.text ?? '#999'}
// // //                   value={isMandiOther ? '' : prMandi}
// // //                   onChangeText={(txt) => setPrMandi(txt)}
// // //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //                 />
// // //               )}

// // //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>
// // //               {/* <TextInput
// // //                 placeholder={t('enter_date') ?? 'dd-mm-yy'}
// // //                 placeholderTextColor={theme.text ?? '#999'}
// // //                 value={prExpectedArrival}
// // //                 onChangeText={setPrExpectedArrival}
// // //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// // //               /> */}
// // //               <TouchableOpacity
// // //                 style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]}
// // //                 onPress={openDatePicker}
// // //               >
// // //                 <Text style={{ color: prExpectedArrival ? theme.text : theme.text }}>
// // //                   {prExpectedArrival ? prExpectedArrival : (t('enter_date') ?? 'dd-mm-yyyy')}
// // //                 </Text>
// // //               </TouchableOpacity>

// // //               {prExpectedArrival ? (
// // //                 <TouchableOpacity
// // //                   onPress={() => {
// // //                     setPrExpectedArrival('');
// // //                   }}
// // //                   style={{ marginTop: 6 }}
// // //                 >
// // //                   <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
// // //                 </TouchableOpacity>
// // //               ) : null}

// // //               {showDatePicker && (
// // //                 <DateTimePicker
// // //                   value={dateValue}
// // //                   mode="date"
// // //                   display={Platform.OS === 'android' ? 'default' : 'spinner'}
// // //                   onChange={onChangeDate}
// // //                   maximumDate={new Date(2100, 11, 31)}
// // //                   minimumDate={new Date(2000, 0, 1)}
// // //                 />
// // //               )}

// // //               <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={addLotInline}>
// // //                 <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot') ?? 'Add Lot'}</Text>
// // //               </TouchableOpacity>
// // //             </View>

// // //             <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('your_registered_lots') ?? 'Your Registered Lots'}</Text>
// // //           </>
// // //         )}
// // //       </View>
// // //     );
// // //     // Note: include dependencies that when changed require header to re-create.
// // //     // we intentionally include the states used inside header so it updates when they change.
// // //     // (selectedTab, mandiName, cropName, etc.)
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [theme, t, selectedTab, mandiName, cropName, stfMandi, stfCrop, horizon, forecastLoading, forecastSummary, prCrop, prGrade, prQuantity, prMandi, prExpectedArrival]);

// // //   // Render a single lot item (FlatList)
// // //   const renderLotItem = useCallback(({ item }: { item: Lot }) => (
// // //     <View style={[styles.lotItem, { borderColor: theme.text ??'#ccc', backgroundColor: theme.background }]}>
// // //       <View style={{ flex: 1 }}>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>{item.crop}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>{item.grade}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>{item.quantity}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>{item.mandi}</Text>
// // //         <Text style={[styles.lotText, { color: theme.text }]}><Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
// // //       </View>
// // //       <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
// // //         <Text style={styles.removeBtnText}>✕</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   ), [theme, t, removeLot]);

// // //   // Show empty message only when in preregister tab and no lots
// // //   const renderEmpty = useCallback(() => {
// // //     if (selectedTab !== 'preregister') return null;
// // //     return (
// // //       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
// // //         <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
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
// // //   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
// // //   backText: { fontWeight: '700', fontSize: 16 },
// // //   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
// // //   text: { fontSize: 14, marginBottom: 12 },
// // //   graphContainer: { marginBottom: 20 },

// // //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
// // //   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
// // //   tabText: { fontWeight: '600', color: '#333' },
// // //   tabTextSelected: { color: '#fff' },

// // //   // daily/search
// // //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// // //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// // //   inputLabel: { fontSize: 12, marginBottom: 6 },
// // //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// // //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// // //   searchBtnText: { fontWeight: '700' },

// // //   // short term
// // //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
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
// // //   pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },
// // // });

// // import React, { useEffect, useState, useCallback, useMemo } from 'react';
// // import { Text, TouchableOpacity, StyleSheet, View, TextInput, Alert, FlatList, Platform } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import DropDownPicker from 'react-native-dropdown-picker';
// // import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// // import { Picker } from '@react-native-picker/picker';

// // import GraphChart from '../components/GraphChart';
// // import FilterBar from '../components/FilterBar';

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

// //   // Filters for Graph / Market trends
// //   const [filters, setFilters] = useState({ mandi: '', crop: '' });
// //   const [appliedFilters, setAppliedFilters] = useState(filters);
// //   const handleSearch = () => {
// //     setAppliedFilters(filters);
// //   };

// //   // which tab is selected
// //   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

// //   // Daily mandi search (keeps original functionality)
// //   const [mandiName, setMandiName] = useState('');
// //   const [cropName, setCropName] = useState('');

// //   // Short-term forecast inline state
// //   const [stfMandi, setStfMandi] = useState('');
// //   const [stfCrop, setStfCrop] = useState('');
// //   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
// //   const [forecastSummary, setForecastSummary] = useState<string | null>(null);
// //   const [forecastLoading, setForecastLoading] = useState(false);

// //   // Pre-register inline state
// //   const [prCrop, setPrCrop] = useState('');
// //   const [prGrade, setPrGrade] = useState('');
// //   const [prQuantity, setPrQuantity] = useState('');
// //   const [prMandi, setPrMandi] = useState('');
// //   const [prExpectedArrival, setPrExpectedArrival] = useState('');
// //   const [lots, setLots] = useState<Lot[]>([]);
// //   const [phone, setPhone] = useState<string | null>(null);

// //   // Date picker state for preregister
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [dateValue, setDateValue] = useState<Date>(new Date());

// //   const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

// //   // Example lists - edit as needed or fetch from API
// //   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion', 'Other'];
// //   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi', 'Other'];

// //   // grade options by crop (simple mapping)
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
// //     // when crop changes, reset grade if it's not in the new list
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

// //   // Daily mandi search action
// //   const onSearchMandi = async () => {
// //     if (!mandiName && !cropName) {
// //       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
// //       return;
// //     }
// //     try {
// //       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
// //     } catch (e) {}
// //     Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
// //   };

// //   // Short-term inline forecast action
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

// //   // Pre-register inline: add lot
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

// //     // clear inputs
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

// //   // Date helper
// //   const formatDate = (d: Date) => {
// //     const dd = String(d.getDate()).padStart(2, '0');
// //     const mm = String(d.getMonth() + 1).padStart(2, '0');
// //     const yyyy = d.getFullYear();
// //     return `${dd}-${mm}-${yyyy}`;
// //   };

// //   // Date change handler (Android: close picker immediately)
// //   const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
// //     if (Platform.OS === 'android') {
// //       setShowDatePicker(false);
// //     }
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
// //       } else {
// //         setDateValue(new Date());
// //       }
// //     } else {
// //       setDateValue(new Date());
// //     }
// //     setShowDatePicker(true);
// //   };

// //   // Helper: show text input when "Other" selected
// //   const isCropOther = prCrop === 'Other';
// //   const isMandiOther = prMandi === 'Other';
// //   const isGradeOther = prGrade === 'Other';

// //   // current grades list
// //   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

// //   // Daily section "Other" flags for dropdowns
// //   const [isDailyCropOther, setIsDailyCropOther] = useState(false);
// //   const [isDailyMandiOther, setIsDailyMandiOther] = useState(false);

// //   // When user picks "Other" in daily pickers, show input
// //   useEffect(() => {
// //     setIsDailyCropOther(cropName === 'Other');
// //   }, [cropName]);
// //   useEffect(() => {
// //     setIsDailyMandiOther(mandiName === 'Other');
// //   }, [mandiName]);

// //   // Memoized header element (prevents FlatList from remounting header on every render)
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
// //             style={[
// //               styles.tab,
// //               selectedTab === 'daily'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => onSelectTab('daily')}
// //           >
// //             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'short'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => onSelectTab('short')}
// //           >
// //             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.tab,
// //               selectedTab === 'preregister'
// //                 ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                 : { backgroundColor: theme.background ?? '#f0f0f0' },
// //             ]}
// //             onPress={() => onSelectTab('preregister')}
// //           >
// //             <Text style={[styles.tabText, { color: theme.text }, { borderColor: theme.text }, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Daily section (now using dropdowns) */}
// //         {selectedTab === 'daily' && (
// //           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
// //             <Text style={[styles.searchTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>

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

// //             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
// //               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
// //             </TouchableOpacity>

// //             {/* Filters bar + Graph for market trends */}
// //             <View style={{ height: 12 }} />

// //             <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

// //             <View style={styles.graphContainer}>
// //               <Text style={[styles.sectionTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('market_trends')}</Text>
// //               <GraphChart filters={appliedFilters} />
// //             </View>
// //           </View>
// //         )}

// //         {/* Daily Market Price area (kept for layout consistency) */}
// //         {selectedTab === 'daily' && (
// //           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
// //             <Text style={[styles.chartTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
// //             <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
// //               <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
// //             </View>
// //           </View>
// //         )}

// //         {/* Short term inline */}
// //         {selectedTab === 'short' && (
// //           <>
// //             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' }]}>
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
// //               <TextInput
// //                 placeholder={t('enter_mandi')}
// //                 placeholderTextColor={theme.text ?? '#999'}
// //                 value={stfMandi}
// //                 onChangeText={setStfMandi}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>
// //               <TextInput
// //                 placeholder={t('enter_crop')}
// //                 placeholderTextColor={theme.text ?? '#999'}
// //                 value={stfCrop}
// //                 onChangeText={setStfCrop}
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />
// //               <Text style={[styles.searchTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
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
// //                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={[styles.chartBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: theme.text ?? '#666' }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
// //               </View>
// //               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
// //             </View>
// //           </>
// //         )}

// //         {/* Pre-register header & form - the list of lots is rendered by FlatList items below */}
// //         {selectedTab === 'preregister' && (
// //           <>
// //             <View style={[styles.formBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background }]}>
// //               <View style={styles.formHeaderRow}>
// //                 <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
// //               </View>

// //               {/*Crop Picker*/}
// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={prCrop} onValueChange={(v) => setPrCrop(v)}>
// //                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
// //                   {cropOptions.map((c) => (
// //                     <Picker.Item key={c} label={c} value={c} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //               {isCropOther && (
// //                 <TextInput
// //                   placeholder={t('type_crop') ?? 'Type crop'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value={isCropOther ? '' : prCrop}
// //                   onChangeText={(txt) => setPrCrop(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //                {/* Grade picker (dependent on crop) */}
// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={prGrade} onValueChange={(v) => setPrGrade(v)}>
// //                   <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
// //                   {currentGrades.map((g) => (
// //                     <Picker.Item key={g} label={g} value={g} />
// //                   ))}
// //                 </Picker>
// //               </View>

// //               {isGradeOther && (
// //                 <TextInput
// //                   placeholder={t('type_grade') ?? 'Type grade'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value={isGradeOther ? '' : prGrade}
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
// //                 </Picker>
// //               </View>

// //               {isMandiOther && (
// //                 <TextInput
// //                   placeholder={t('type_mandi') ?? 'Type mandi'}
// //                   placeholderTextColor={theme.text ?? '#999'}
// //                   value={isMandiOther ? '' : prMandi}
// //                   onChangeText={(txt) => setPrMandi(txt)}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>

// //               <TouchableOpacity
// //                 style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]}
// //                 onPress={openDatePicker}
// //               >
// //                 <Text style={{ color: prExpectedArrival ? theme.text : theme.text }}>
// //                   {prExpectedArrival ? prExpectedArrival : (t('enter_date') ?? 'dd-mm-yyyy')}
// //                 </Text>
// //               </TouchableOpacity>

// //               {prExpectedArrival ? (
// //                 <TouchableOpacity
// //                   onPress={() => {
// //                     setPrExpectedArrival('');
// //                   }}
// //                   style={{ marginTop: 6 }}
// //                 >
// //                   <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
// //                 </TouchableOpacity>
// //               ) : null}

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
// //     // Note: include dependencies that when changed require header to re-create.
// //     // we intentionally include the states used inside header so it updates when they change.
// //     // (selectedTab, mandiName, cropName, etc.)
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [
// //     theme,
// //     t,
// //     selectedTab,
// //     mandiName,
// //     cropName,
// //     stfMandi,
// //     stfCrop,
// //     horizon,
// //     forecastLoading,
// //     forecastSummary,
// //     prCrop,
// //     prGrade,
// //     prQuantity,
// //     prMandi,
// //     prExpectedArrival,
// //     filters,
// //     appliedFilters,
// //     // daily other flags
// //     isDailyCropOther,
// //     isDailyMandiOther,
// //   ]);

// //   // Render a single lot item (FlatList)
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
// //         <Text style={styles.removeBtnText}>✕</Text>
// //       </TouchableOpacity>
// //     </View>
// //   ), [theme, t, removeLot]);

// //   // Show empty message only when in preregister tab and no lots
// //   const renderEmpty = useCallback(() => {
// //     if (selectedTab !== 'preregister') return null;
// //     return (
// //       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
// //         <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
// //       </View>
// //     );
// //   }, [selectedTab, theme, t]);

// //   // When not in preregister tab we pass empty array so FlatList doesn't render items
// //   const listData = selectedTab === 'preregister' ? lots : [];

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <FlatList
// //         data={listData}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderLotItem}
// //         ListHeaderComponent={ListHeaderElement} // Pass the memoized element
// //         ListEmptyComponent={renderEmpty}
// //         contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }}
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
// //   graphContainer: { marginBottom: 20 },

// //   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
// //   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
// //   tabText: { fontWeight: '600', color: '#333' },
// //   tabTextSelected: { color: '#fff' },

// //   // daily/search
// //   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   searchTitle: { fontWeight: '700', marginBottom: 8 },
// //   inputLabel: { fontSize: 12, marginBottom: 6 },
// //   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
// //   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// //   searchBtnText: { fontWeight: '700' },

// //   // short term
// //   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
// //   chartTitle: { fontWeight: '700', marginBottom: 10 },
// //   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
// //   horizonRow: { flexDirection: 'row', marginBottom: 12 },
// //   horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
// //   horizonBtnActive: { backgroundColor: '#2b6cb0' },
// //   horizonText: { color: '#333', fontWeight: '600' },
// //   horizonTextActive: { color: '#fff', fontWeight: '700' },

// //   // pre-register inline
// //   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
// //   formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
// //   formTitle: { fontSize: 16, fontWeight: '700' },
// //   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
// //   addBtnText: { fontWeight: '700', color: '#fff' },

// //   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
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

//   // which tab is selected
//   const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

//   // Daily mandi/crop search (single search row)
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');
//   const [appliedFilters, setAppliedFilters] = useState({ mandi: '', crop: '' });

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

//   // Date picker state for preregister
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [dateValue, setDateValue] = useState<Date>(new Date());

//   const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

//   // Example lists - edit as needed or fetch from API
//   const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion', 'Other'];
//   const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi', 'Other'];

//   // grade options by crop (simple mapping)
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
//     // when crop changes, reset grade if it's not in the new list
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

//   // Single search handler for daily market price
//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }
//     setAppliedFilters({ mandi: mandiName, crop: cropName });
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
//       // small delay sim
//       //await new Promise((res) => setTimeout(res, 300));
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
//     if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));

//     // clear inputs
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

//   // Date helper
//   const formatDate = (d: Date) => {
//     const dd = String(d.getDate()).padStart(2, '0');
//     const mm = String(d.getMonth() + 1).padStart(2, '0');
//     const yyyy = d.getFullYear();
//     return `${dd}-${mm}-${yyyy}`;
//   };

//   // Date change handler (Android: close picker immediately)
//   const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
//     if (Platform.OS === 'android') {
//       setShowDatePicker(false);
//     }
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

//   // Helper: show text input when "Other" selected
//   const isCropOther = prCrop === 'Other';
//   const isMandiOther = prMandi === 'Other';
//   const isGradeOther = prGrade === 'Other';

//   // current grades list
//   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

//   // Daily section "Other" flags for dropdowns
//   const [isDailyCropOther, setIsDailyCropOther] = useState(false);
//   const [isDailyMandiOther, setIsDailyMandiOther] = useState(false);

//   useEffect(() => {
//     setIsDailyCropOther(cropName === 'Other');
//   }, [cropName]);
//   useEffect(() => {
//     setIsDailyMandiOther(mandiName === 'Other');
//   }, [mandiName]);

//   // Memoized header element (prevents FlatList from remounting header on every render)
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
//             style={[
//               styles.tab,
//               selectedTab === 'daily'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('daily')}
//           >
//             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>{t('daily_market_price')}</Text>
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
//             <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'short' ? styles.tabTextSelected : {}]}>{t('short_term_forecast')}</Text>
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
//             <Text style={[styles.tabText, { color: theme.text }, { borderColor: theme.text }, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>{t('pre_register_lot')}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Daily section (single search with dropdowns) */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>

//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker selectedValue={mandiName} onValueChange={(v) => setMandiName(v)}>
//                 <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                 {mandiOptions.map((m) => (
//                   <Picker.Item key={m} label={m} value={m} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>

//             {isDailyMandiOther && (
//               <TextInput
//                 placeholder={t('type_mandi') ?? 'Type mandi'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={mandiName === 'Other' ? '' : mandiName}
//                 onChangeText={(txt) => setMandiName(txt)}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//             )}

//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>

//             <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//               <Picker selectedValue={cropName} onValueChange={(v) => setCropName(v)}>
//                 <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                 {cropOptions.map((c) => (
//                   <Picker.Item key={c} label={c} value={c} />
//                 ))}
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>

//             {isDailyCropOther && (
//               <TextInput
//                 placeholder={t('type_crop') ?? 'Type crop'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={cropName === 'Other' ? '' : cropName}
//                 onChangeText={(txt) => setCropName(txt)}
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />
//             )}

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchDaily}>
//               <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Daily Market Price area (GraphChart sits here) */}
//         {selectedTab === 'daily' && (
//           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('daily_market_price_chart_title')}</Text>

//             <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
//               {/* Render GraphChart and pass appliedFilters */}
//               <GraphChart filters={appliedFilters} />
//             </View>
//           </View>
//         )}

//         {/* Short term inline */}
//         {selectedTab === 'short' && (
//           <>
//             <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' }]}>
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
//               <Text style={[styles.searchTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
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

//             <View style={[styles.chartBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
//               <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
//               </View>
//               {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
//             </View>
//           </>
//         )}

//         {/* Pre-register header & form - the list of lots is rendered by FlatList items below */}
//         {selectedTab === 'preregister' && (
//           <>
//             <View style={[styles.formBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background }]}>
//               <View style={styles.formHeaderRow}>
//                 <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
//               </View>

//               {/*Crop Picker*/}
//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker selectedValue={prCrop} onValueChange={(v) => setPrCrop(v)}>
//                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                   {cropOptions.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                 </Picker>
//               </View>
//               {isCropOther && (
//                 <TextInput
//                   placeholder={t('type_crop') ?? 'Type crop'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={isCropOther ? '' : prCrop}
//                   onChangeText={(txt) => setPrCrop(txt)}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//                {/* Grade picker (dependent on crop) */}
//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker selectedValue={prGrade} onValueChange={(v) => setPrGrade(v)}>
//                   <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
//                   {currentGrades.map((g) => (
//                     <Picker.Item key={g} label={g} value={g} />
//                   ))}
//                 </Picker>
//               </View>

//               {isGradeOther && (
//                 <TextInput
//                   placeholder={t('type_grade') ?? 'Type grade'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={isGradeOther ? '' : prGrade}
//                   onChangeText={(txt) => setPrGrade(txt)}
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
//                 <Picker selectedValue={prMandi} onValueChange={(v) => setPrMandi(v)}>
//                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                   {mandiOptions.map((m) => (
//                     <Picker.Item key={m} label={m} value={m} />
//                   ))}
//                 </Picker>
//               </View>

//               {isMandiOther && (
//                 <TextInput
//                   placeholder={t('type_mandi') ?? 'Type mandi'}
//                   placeholderTextColor={theme.text ?? '#999'}
//                   value={isMandiOther ? '' : prMandi}
//                   onChangeText={(txt) => setPrMandi(txt)}
//                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                 />
//               )}

//               <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>

//               <TouchableOpacity
//                 style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]}
//                 onPress={openDatePicker}
//               >
//                 <Text style={{ color: prExpectedArrival ? theme.text : theme.text }}>
//                   {prExpectedArrival ? prExpectedArrival : (t('enter_date') ?? 'dd-mm-yyyy')}
//                 </Text>
//               </TouchableOpacity>

//               {prExpectedArrival ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setPrExpectedArrival('');
//                   }}
//                   style={{ marginTop: 6 }}
//                 >
//                   <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
//                 </TouchableOpacity>
//               ) : null}

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
//     // Note: include dependencies that when changed require header to re-create.
//     // we intentionally include the states used inside header so it updates when they change.
//     // (selectedTab, mandiName, cropName, etc.)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     theme,
//     t,
//     selectedTab,
//     mandiName,
//     cropName,
//     stfMandi,
//     stfCrop,
//     horizon,
//     forecastLoading,
//     forecastSummary,
//     prCrop,
//     prGrade,
//     prQuantity,
//     prMandi,
//     prExpectedArrival,
//     appliedFilters,
//     // daily flags
//     isDailyCropOther,
//     isDailyMandiOther,
//   ]);

//   // Render a single lot item (FlatList)
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
//         <Text style={styles.removeBtnText}>✕</Text>
//       </TouchableOpacity>
//     </View>
//   ), [theme, t, removeLot]);

//   // Show empty message only when in preregister tab and no lots
//   const renderEmpty = useCallback(() => {
//     if (selectedTab !== 'preregister') return null;
//     return (
//       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
//         <Text style={{ color: theme.text ?? '#666' }}>{t('no_lots') ?? 'No lots registered yet'}</Text>
//       </View>
//     );
//   }, [selectedTab, theme, t]);

//   // When not in preregister tab we pass empty array so FlatList doesn't render items
//   const listData = selectedTab === 'preregister' ? lots : [];

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <FlatList
//         data={listData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderLotItem}
//         ListHeaderComponent={ListHeaderElement} // Pass the memoized element
//         ListEmptyComponent={renderEmpty}
//         contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }}
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
//   graphContainer: { marginBottom: 20 },

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
//   chartPlaceholder: { height: 220, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', padding: 8 },
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
import DropDownPicker from 'react-native-dropdown-picker';

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

  // which tab is selected
  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

  // Daily mandi/crop search (single search row)
  const [mandiName, setMandiName] = useState(''); // typed "Other" text or typed free-text
  const [cropName, setCropName] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ mandi: '', crop: '' });

  // dropdown open states (we will ensure only one open at a time)
  const [openDailyMandi, setOpenDailyMandi] = useState(false);
  const [openDailyCrop, setOpenDailyCrop] = useState(false);

  // dropdown items & values for daily
  const [dailyMandiValue, setDailyMandiValue] = useState<string | null>(null);
  const [dailyMandiItems, setDailyMandiItems] = useState<{ label: string; value: string }[]>([]);
  const [dailyCropValue, setDailyCropValue] = useState<string | null>(null);
  const [dailyCropItems, setDailyCropItems] = useState<{ label: string; value: string }[]>([]);

  // Short-term forecast inline state (searchable dropdowns)
  const [openStfMandi, setOpenStfMandi] = useState(false);
  const [openStfCrop, setOpenStfCrop] = useState(false);
  const [stfMandiValue, setStfMandiValue] = useState<string | null>(null);
  const [stfCropValue, setStfCropValue] = useState<string | null>(null);
  const [stfMandiTyped, setStfMandiTyped] = useState(''); // typed when user selects Other
  const [stfCropTyped, setStfCropTyped] = useState('');

  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  // Pre-register inline state
  const [prCropTyped, setPrCropTyped] = useState('');
  const [prGradeTyped, setPrGradeTyped] = useState('');
  const [prQuantity, setPrQuantity] = useState('');
  const [prMandiTyped, setPrMandiTyped] = useState('');
  const [prExpectedArrival, setPrExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  // Date picker state for preregister
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

  // Example lists - edit as needed or fetch from API
  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Onion', 'Other'];
  const mandiOptions = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi', 'Other'];

  // grade options by crop (simple mapping)
  const gradeMap: Record<string, string[]> = {
    Wheat: ['A', 'B', 'C', 'Other'],
    Rice: ['Super', 'Medium', 'Low', 'Other'],
    Maize: ['Grade 1', 'Grade 2', 'Grade 3', 'Other'],
    Onion: ['Goli', 'Golta', 'Golti', 'Other'],
    Other: ['Other'],
  };

  // Pre-register dropdown states
  const [openPrCrop, setOpenPrCrop] = useState(false);
  const [openPrGrade, setOpenPrGrade] = useState(false);
  const [openPrMandi, setOpenPrMandi] = useState(false);

  const [prCropValue, setPrCropValue] = useState<string | null>(null);
  const [prGradeValue, setPrGradeValue] = useState<string | null>(null);
  const [prMandiValue, setPrMandiValue] = useState<string | null>(null);

  const [prCropItems, setPrCropItems] = useState<{ label: string; value: string }[]>([]);
  const [prGradeItems, setPrGradeItems] = useState<{ label: string; value: string }[]>([]);
  const [prMandiItems, setPrMandiItems] = useState<{ label: string; value: string }[]>([]);

  // helper to close all dropdowns except the one passed
  const closeAllExcept = (setter: (v: boolean) => void) => {
    setOpenDailyMandi(false);
    setOpenDailyCrop(false);
    setOpenStfMandi(false);
    setOpenStfCrop(false);
    setOpenPrCrop(false);
    setOpenPrGrade(false);
    setOpenPrMandi(false);
    setter(true);
  };

  // Initialize items lists from arrays
  useEffect(() => {
    setDailyMandiItems(mandiOptions.map((m) => ({ label: m, value: m })).concat([{ label: 'Other', value: 'Other' }]));
    setDailyCropItems(cropOptions.map((c) => ({ label: c, value: c })).concat([{ label: 'Other', value: 'Other' }]));
    setPrCropItems(cropOptions.map((c) => ({ label: c, value: c })).concat([{ label: 'Other', value: 'Other' }]));
    setPrMandiItems(mandiOptions.map((m) => ({ label: m, value: m })).concat([{ label: 'Other', value: 'Other' }]));
    // initial grade items empty (depend on crop)
  }, []);

  // update grade items when prCropValue / prCropTyped changes
  useEffect(() => {
    const cropForGrades = prCropValue === 'Other' ? prCropTyped : prCropValue ?? '';
    const grades = cropForGrades ? gradeMap[cropForGrades] ?? ['Other'] : [];
    setPrGradeItems(grades.map((g) => ({ label: g, value: g })));
  }, [prCropValue, prCropTyped]);

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

  const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
    if (tab === 'short') {
      setSelectedTab('short');
      // prefill short-term pickers from the daily search if available
      // if daily values were selected, copy them to short-term values
      setStfMandiValue(dailyMandiValue ?? (mandiName ? 'Other' : null)); // if typed mandiName exists, we'll keep typed text
      setStfCropValue(dailyCropValue ?? (cropName ? 'Other' : null));
      if (dailyMandiValue === null && mandiName) setStfMandiTyped(mandiName);
      if (dailyCropValue === null && cropName) setStfCropTyped(cropName);
      return;
    }

    if (tab === 'preregister') {
      setSelectedTab('preregister');
      return;
    }

    setSelectedTab('daily');
  };

  // Single search handler for daily market price
  const onSearchDaily = () => {
    // prefer typed names if value === 'Other'
    const mandiToApply = dailyMandiValue === 'Other' ? mandiName : dailyMandiValue ?? mandiName;
    const cropToApply = dailyCropValue === 'Other' ? cropName : dailyCropValue ?? cropName;

    if (!mandiToApply && !cropToApply) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    setAppliedFilters({ mandi: mandiToApply ?? '', crop: cropToApply ?? '' });
  };

  // Short-term inline forecast action
  const getShortTermForecastInline = async () => {
    const mandiToUse = stfMandiValue === 'Other' ? stfMandiTyped : stfMandiValue ?? stfMandiTyped;
    const cropToUse = stfCropValue === 'Other' ? stfCropTyped : stfCropValue ?? stfCropTyped;

    if (!mandiToUse && !cropToUse) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    try {
      setForecastLoading(true);
      setForecastSummary(null);
      const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${cropToUse || 'selected crop'} at ${mandiToUse || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
     // await new Promise((res) => setTimeout(res, 300));
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
    const mandiToUse = prMandiValue === 'Other' ? prMandiTyped : prMandiValue ?? prMandiTyped;
    const cropToUse = prCropValue === 'Other' ? prCropTyped : prCropValue ?? prCropTyped;
    const gradeToUse = prGradeValue ?? prGradeTyped;

    if (!cropToUse) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
    if (!prQuantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
    if (!mandiToUse) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');

    const newLot: Lot = {
      id: `${Date.now()}`,
      crop: cropToUse,
      grade: gradeToUse || '-',
      quantity: prQuantity,
      mandi: mandiToUse,
      expectedArrival: prExpectedArrival || '-',
      createdAt: Date.now(),
    };

    const newLots = [newLot, ...lots];
    setLots(newLots);
    if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));

    // clear inputs
    setPrCropTyped('');
    setPrGradeTyped('');
    setPrQuantity('');
    setPrMandiTyped('');
    setPrExpectedArrival('');
    setPrCropValue(null);
    setPrGradeValue(null);
    setPrMandiValue(null);
    setDateValue(new Date());
    setShowDatePicker(false);

    Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added successfully');
  };

  const removeLot = async (id: string) => {
    const filtered = lots.filter((l) => l.id !== id);
    setLots(filtered);
    if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
  };

  // Date helper
  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Date change handler (Android: close picker immediately)
  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
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

  // helper to determine whether to show typed input (Other) for a dropdown
  const shouldShowTypedInput = (value: string | null, typed: string) => {
    return value === 'Other' || (value === null && typed !== '');
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
              selectedTab === 'daily' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('daily')}
          >
            <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>
              {t('daily_market_price')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'short' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('short')}
          >
            <Text style={[styles.tabText, { color: theme.text }, selectedTab === 'short' ? styles.tabTextSelected : {}]}>
              {t('short_term_forecast')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'preregister' ? { backgroundColor: theme.primary ?? '#3182ce' } : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('preregister')}
          >
            <Text style={[styles.tabText, { color: theme.text }, { borderColor: theme.text }, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>
              {t('pre_register_lot')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily section (single search with searchable dropdowns) */}
        {selectedTab === 'daily' && (
          <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text }]}>
            <Text style={[styles.searchTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>

            <DropDownPicker
              open={openDailyMandi}
              value={dailyMandiValue}
              items={dailyMandiItems}
              setOpen={setOpenDailyMandi}
              onOpen={() => closeAllExcept(setOpenDailyMandi)}
              setValue={setDailyMandiValue}
              onChangeValue={(val) => {
                // clear typed text if user selects a normal item
                if (val !== 'Other') setMandiName('');
              }}
              setItems={setDailyMandiItems}
              searchable
              placeholder={t('select_mandi') ?? 'Select Mandi'}
              searchPlaceholder="Search..."
              zIndex={7000}
              zIndexInverse={1000}
              listMode="MODAL"
              modalTitle={t('select_mandi') ?? 'Select Mandi'}
              style={[styles.dropdown]}
              dropDownContainerStyle={[styles.dropDownContainer]}
            />

            {/* show typed mandi input when user chose Other */}
            {shouldShowTypedInput(dailyMandiValue, mandiName) && dailyMandiValue === 'Other' && (
              <TextInput
                placeholder={t('type_mandi') ?? 'Type mandi'}
                placeholderTextColor={theme.text ?? '#999'}
                value={mandiName}
                onChangeText={(txt) => setMandiName(txt)}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
            )}

            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>

            <DropDownPicker
              open={openDailyCrop}
              value={dailyCropValue}
              items={dailyCropItems}
              setOpen={setOpenDailyCrop}
              onOpen={() => closeAllExcept(setOpenDailyCrop)}
              setValue={setDailyCropValue}
              onChangeValue={(val) => {
                if (val !== 'Other') setCropName('');
              }}
              setItems={setDailyCropItems}
              searchable
              placeholder={t('select_crop') ?? 'Select Crop'}
              searchPlaceholder="Search..."
              zIndex={6000}
              zIndexInverse={2000}
              listMode="MODAL"
              modalTitle={t('select_crop') ?? 'Select Crop'}
              style={[styles.dropdown]}
              dropDownContainerStyle={[styles.dropDownContainer]}
            />

            {shouldShowTypedInput(dailyCropValue, cropName) && dailyCropValue === 'Other' && (
              <TextInput
                placeholder={t('type_crop') ?? 'Type crop'}
                placeholderTextColor={theme.text ?? '#999'}
                value={cropName}
                onChangeText={(txt) => setCropName(txt)}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
            )}

            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchDaily}>
              <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Daily Market Price area (GraphChart sits here) */}
        {selectedTab === 'daily' && (
          <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background }]}>
            <Text style={[styles.chartTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('daily_market_price_chart_title')}</Text>

            <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
              <GraphChart filters={appliedFilters} />
            </View>
          </View>
        )}

        {/* Short term inline (searchable dropdowns) */}
        {selectedTab === 'short' && (
          <>
            <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' }]}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>

              <DropDownPicker
                open={openStfMandi}
                value={stfMandiValue}
                items={dailyMandiItems}
                setOpen={setOpenStfMandi}
                onOpen={() => closeAllExcept(setOpenStfMandi)}
                setValue={setStfMandiValue}
                onChangeValue={(val) => {
                  if (val !== 'Other') setStfMandiTyped('');
                }}
                setItems={setDailyMandiItems}
                searchable
                placeholder={t('select_mandi') ?? 'Select Mandi'}
                searchPlaceholder="Search..."
                zIndex={5000}
                zIndexInverse={3000}
                listMode="MODAL"
                style={[styles.dropdown]}
                dropDownContainerStyle={[styles.dropDownContainer]}
              />

              {shouldShowTypedInput(stfMandiValue, stfMandiTyped) && stfMandiValue === 'Other' && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={stfMandiTyped}
                  onChangeText={(txt) => setStfMandiTyped(txt)}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop')}</Text>

              <DropDownPicker
                open={openStfCrop}
                value={stfCropValue}
                items={dailyCropItems}
                setOpen={setOpenStfCrop}
                onOpen={() => closeAllExcept(setOpenStfCrop)}
                setValue={setStfCropValue}
                onChangeValue={(val) => {
                  if (val !== 'Other') setStfCropTyped('');
                }}
                setItems={setDailyCropItems}
                searchable
                placeholder={t('select_crop') ?? 'Select Crop'}
                searchPlaceholder="Search..."
                zIndex={4000}
                zIndexInverse={4000}
                listMode="MODAL"
                style={[styles.dropdown]}
                dropDownContainerStyle={[styles.dropDownContainer]}
              />

              {shouldShowTypedInput(stfCropValue, stfCropTyped) && stfCropValue === 'Other' && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={stfCropTyped}
                  onChangeText={(txt) => setStfCropTyped(txt)}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }, { borderColor: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
              <View style={styles.horizonRow}>
                <TouchableOpacity style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('7days')}>
                  <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('14days')}>
                  <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('30days')}>
                  <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.chartBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background ?? '#fff' }]}>
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
            <View style={[styles.formBox, { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background }]}>
              <View style={styles.formHeaderRow}>
                <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title') ?? 'Register Harvested Crop Lot'}</Text>
              </View>

              {/*Crop Picker*/}
              <Text style={[styles.formTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
              <DropDownPicker
                open={openPrCrop}
                value={prCropValue}
                items={prCropItems}
                setOpen={setOpenPrCrop}
                onOpen={() => closeAllExcept(setOpenPrCrop)}
                setValue={setPrCropValue}
                onChangeValue={(val) => {
                  if (val !== 'Other') setPrCropTyped('');
                }}
                setItems={setPrCropItems}
                searchable
                placeholder={t('select_crop') ?? 'Select Crop'}
                searchPlaceholder="Search..."
                zIndex={3000}
                zIndexInverse={5000}
                listMode="MODAL"
                style={[styles.dropdown]}
                dropDownContainerStyle={[styles.dropDownContainer]}
              />
              {shouldShowTypedInput(prCropValue, prCropTyped) && prCropValue === 'Other' && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prCropTyped}
                  onChangeText={(txt) => setPrCropTyped(txt)}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              {/* Grade picker (dependent on crop) */}
              <Text style={[styles.formTitle, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
              <DropDownPicker
                open={openPrGrade}
                value={prGradeValue}
                items={prGradeItems}
                setOpen={setOpenPrGrade}
                onOpen={() => closeAllExcept(setOpenPrGrade)}
                setValue={setPrGradeValue}
                onChangeValue={(val) => {
                  if (val !== 'Other') setPrGradeTyped('');
                }}
                setItems={setPrGradeItems}
                searchable
                placeholder={t('select_grade') ?? 'Select Grade'}
                searchPlaceholder="Search..."
                zIndex={2000}
                zIndexInverse={6000}
                listMode="MODAL"
                style={[styles.dropdown]}
                dropDownContainerStyle={[styles.dropDownContainer]}
              />
              {shouldShowTypedInput(prGradeValue, prGradeTyped) && prGradeValue === 'Other' && (
                <TextInput
                  placeholder={t('type_grade') ?? 'Type grade'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prGradeTyped}
                  onChangeText={(txt) => setPrGradeTyped(txt)}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

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
              <DropDownPicker
                open={openPrMandi}
                value={prMandiValue}
                items={prMandiItems}
                setOpen={setOpenPrMandi}
                onOpen={() => closeAllExcept(setOpenPrMandi)}
                setValue={setPrMandiValue}
                onChangeValue={(val) => {
                  if (val !== 'Other') setPrMandiTyped('');
                }}
                setItems={setPrMandiItems}
                searchable
                placeholder={t('select_mandi') ?? 'Select Mandi'}
                searchPlaceholder="Search..."
                zIndex={1000}
                zIndexInverse={7000}
                listMode="MODAL"
                style={[styles.dropdown]}
                dropDownContainerStyle={[styles.dropDownContainer]}
              />
              {shouldShowTypedInput(prMandiValue, prMandiTyped) && prMandiValue === 'Other' && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prMandiTyped}
                  onChangeText={(txt) => setPrMandiTyped(txt)}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}

              <Text style={[styles.formTitle, { color: theme.text }]}>{t('arrival_label') ?? 'Expected Arrival Date'}</Text>

              <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]} onPress={openDatePicker}>
                <Text style={{ color: prExpectedArrival ? theme.text : theme.text }}>{prExpectedArrival ? prExpectedArrival : t('enter_date') ?? 'dd-mm-yyyy'}</Text>
              </TouchableOpacity>

              {prExpectedArrival ? (
                <TouchableOpacity onPress={() => setPrExpectedArrival('')} style={{ marginTop: 6 }}>
                  <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
                </TouchableOpacity>
              ) : null}

              {showDatePicker && (
                <DateTimePicker value={dateValue} mode="date" display={Platform.OS === 'android' ? 'default' : 'spinner'} onChange={onChangeDate} maximumDate={new Date(2100, 11, 31)} minimumDate={new Date(2000, 0, 1)} />
              )}

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
  }, [
    theme,
    t,
    selectedTab,
    mandiName,
    cropName,
    stfMandiValue,
    stfCropValue,
    stfMandiTyped,
    stfCropTyped,
    horizon,
    forecastLoading,
    forecastSummary,
    prCropValue,
    prGradeValue,
    prQuantity,
    prMandiValue,
    prExpectedArrival,
    appliedFilters,
  ]);

  // Render a single lot item (FlatList)
  const renderLotItem = useCallback(
    ({ item }: { item: Lot }) => (
      <View style={[styles.lotItem, { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background }]}>
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
          <Text style={styles.removeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    ),
    [theme, t, removeLot]
  );

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
      <FlatList data={listData} keyExtractor={(item) => item.id} renderItem={renderLotItem} ListHeaderComponent={ListHeaderElement} ListEmptyComponent={renderEmpty} contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }} keyboardShouldPersistTaps="always" removeClippedSubviews={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 12 },
  graphContainer: { marginBottom: 20 },

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

  // dropdown custom styles
  dropdown: { marginBottom: 8 },
  dropDownContainer: { borderWidth: 1 },

  // short term
  chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
  chartTitle: { fontWeight: '700', marginBottom: 10 },
  chartPlaceholder: { height: 220, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', padding: 8 },
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
  pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },
});

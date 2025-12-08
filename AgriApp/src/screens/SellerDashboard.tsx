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
// //   }, [prCrop, prGrade]);

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

// //   const addLotInline = useCallback(
// //     async () => {
// //       if (!prCrop) return Alert.alert('Error', 'Please select crop');
// //       if (!prQuantity) return Alert.alert('Error', 'Please enter quantity');
// //       if (!prMandi) return Alert.alert('Error', 'Please select mandi');

// //       const newLot: Lot = {
// //         id: Date.now().toString(),
// //         crop: prCrop,
// //         grade: prGrade || '-',
// //         quantity: prQuantity,
// //         mandi: prMandi,
// //         expectedArrival: prExpectedArrival || '-',
// //         createdAt: Date.now(),
// //       };

// //       const newLots = [newLot, ...lots];
// //       setLots(newLots);
// //       if (phone) {
// //         await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));
// //       }

// //       // Reset form
// //       setPrCrop('');
// //       setPrGrade('');
// //       setPrQuantity('');
// //       setPrMandi('');
// //       setPrExpectedArrival('');
// //       setDateValue(new Date());

// //       Alert.alert('Success', 'Lot added successfully');
// //     },
// //     [prCrop, prGrade, prQuantity, prMandi, prExpectedArrival, lots, phone]
// //   );

// //   const removeLot = useCallback(
// //     async (id: string) => {
// //       const filtered = lots.filter((l) => l.id !== id);
// //       setLots(filtered);
// //       if (phone) await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
// //     },
// //     [lots, phone]
// //   );

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

// //   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

// //   const ListHeaderElement = useMemo(
// //     () => (
// //       <View>
// //         <TouchableOpacity
// //           onPress={goBack}
// //           style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}
// //         >
// //           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>
// //             {t('back') || 'Back'}
// //           </Text>
// //         </TouchableOpacity>

// //         <Text style={[styles.title, { color: theme.text }]}>
// //           {t('seller_dashboard') || 'Seller Dashboard'}
// //         </Text>
// //         <Text style={[styles.text, { color: theme.text }]}>
// //           {t('seller_msg') || 'Welcome Seller!'}
// //         </Text>

// //         <View style={styles.tabsRow}>
// //           {(['daily', 'short', 'preregister'] as const).map((tab) => (
// //             <TouchableOpacity
// //               key={tab}
// //               style={[
// //                 styles.tab,
// //                 selectedTab === tab
// //                   ? { backgroundColor: theme.primary ?? '#3182ce' }
// //                   : { backgroundColor: theme.background ?? '#f0f0f0' },
// //               ]}
// //               onPress={() => onSelectTab(tab)}
// //             >
// //               <Text
// //                 style={[
// //                   styles.tabText,
// //                   { color: selectedTab === tab ? '#fff' : theme.text },
// //                   selectedTab === tab && styles.tabTextSelected,
// //                 ]}
// //               >
// //                 {tab === 'daily'
// //                   ? t('daily_market_price')
// //                   : tab === 'short'
// //                   ? t('short_term_forecast')
// //                   : t('pre_register_lot')}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {/* === DAILY TAB === */}
// //         {selectedTab === 'daily' && (
// //           <>
// //             <View
// //               style={[
// //                 styles.searchBox,
// //                 { backgroundColor: theme.background, borderColor: theme.text },
// //               ]}
// //             >
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker
// //                   selectedValue={isPredefined(mandiName, mandiOptions) ? mandiName : 'Other'}
// //                   onValueChange={(v) => (v !== 'Other' ? setMandiName(v) : null)}
// //                 >
// //                   <Picker.Item label="Select mandi" value="" />
// //                   {mandiOptions.map((m) => (
// //                     <Picker.Item key={m} label={m} value={m} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {!isPredefined(mandiName, mandiOptions) && mandiName && (
// //                 <TextInput
// //                   placeholder="Type mandi name"
// //                   value={mandiName}
// //                   onChangeText={setMandiName}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker
// //                   selectedValue={isPredefined(cropName, cropOptions) ? cropName : 'Other'}
// //                   onValueChange={(v) => (v !== 'Other' ? setCropName(v) : null)}
// //                 >
// //                   <Picker.Item label="Select crop" value="" />
// //                   {cropOptions.map((c) => (
// //                     <Picker.Item key={c} label={c} value={c} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {!isPredefined(cropName, cropOptions) && cropName && (
// //                 <TextInput
// //                   placeholder="Type crop name"
// //                   value={cropName}
// //                   onChangeText={setCropName}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <TouchableOpacity
// //                 style={[styles.searchBtn, { backgroundColor: theme.primary }]}
// //                 onPress={onSearchDaily}
// //               >
// //                 <Text style={styles.searchBtnText}>Search</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View
// //               style={[
// //                 styles.chartBox,
// //                 { borderColor: theme.text, backgroundColor: theme.background },
// //               ]}
// //             >
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>
// //                 Daily Market Price
// //               </Text>
// //               <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
// //                 <Text style={{ color: '#666' }}>Chart will appear here</Text>
// //               </View>
// //             </View>
// //           </>
// //         )}

// //         {/* === SHORT-TERM FORECAST TAB === */}
// //         {selectedTab === 'short' && (
// //           <>
// //             <View
// //               style={[
// //                 styles.searchBox,
// //                 { backgroundColor: theme.background, borderColor: theme.text },
// //               ]}
// //             >
// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Mandi</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker
// //                   selectedValue={isPredefined(stfMandi, mandiOptions) ? stfMandi : 'Other'}
// //                   onValueChange={(v) => (v !== 'Other' ? setStfMandi(v) : null)}
// //                 >
// //                   <Picker.Item label="Select mandi" value="" />
// //                   {mandiOptions.map((m) => (
// //                     <Picker.Item key={m} label={m} value={m} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {!isPredefined(stfMandi, mandiOptions) && stfMandi && (
// //                 <TextInput
// //                   placeholder="Type mandi"
// //                   value={stfMandi}
// //                   onChangeText={setStfMandi}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Crop</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker
// //                   selectedValue={isPredefined(stfCrop, cropOptions) ? stfCrop : 'Other'}
// //                   onValueChange={(v) => (v !== 'Other' ? setStfCrop(v) : null)}
// //                 >
// //                   <Picker.Item label="Select crop" value="" />
// //                   {cropOptions.map((c) => (
// //                     <Picker.Item key={c} label={c} value={c} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {!isPredefined(stfCrop, cropOptions) && stfCrop && (
// //                 <TextInput
// //                   placeholder="Type crop"
// //                   value={stfCrop}
// //                   onChangeText={setStfCrop}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.searchTitle, { color: theme.text }]}>Duration</Text>
// //               <View style={styles.horizonRow}>
// //                 {(['7days', '14days', '30days'] as const).map((d) => (
// //                   <TouchableOpacity
// //                     key={d}
// //                     style={[
// //                       styles.horizonBtn,
// //                       horizon === d && styles.horizonBtnActive,
// //                     ]}
// //                     onPress={() => setHorizon(d)}
// //                   >
// //                     <Text
// //                       style={horizon === d ? styles.horizonTextActive : styles.horizonText}
// //                     >
// //                       {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
// //                     </Text>
// //                   </TouchableOpacity>
// //                 ))}
// //               </View>

// //               <TouchableOpacity
// //                 style={[styles.searchBtn, { backgroundColor: theme.primary }]}
// //                 onPress={getShortTermForecastInline}
// //               >
// //                 <Text style={styles.searchBtnText}>Get Forecast</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View
// //               style={[
// //                 styles.chartBox,
// //                 { borderColor: theme.text, backgroundColor: theme.background },
// //               ]}
// //             >
// //               <Text style={[styles.chartTitle, { color: theme.text }]}>
// //                 Short-term Forecast
// //               </Text>
// //               <View style={styles.chartPlaceholder}>
// //                 <Text style={{ color: '#666' }}>
// //                   {forecastLoading
// //                     ? 'Loading...'
// //                     : forecastSummary ?? 'Forecast chart will appear here'}
// //                 </Text>
// //               </View>
// //               {forecastSummary && (
// //                 <Text style={{ color: theme.text, marginTop: 8 }}>
// //                   {forecastSummary}
// //                 </Text>
// //               )}
// //             </View>
// //           </>
// //         )}

// //         {/* === PRE-REGISTER TAB === */}
// //         {selectedTab === 'preregister' && (
// //           <>
// //             <View
// //               style={[
// //                 styles.formBox,
// //                 { backgroundColor: theme.background, borderColor: theme.text },
// //               ]}
// //             >
// //               <Text style={[styles.title, { color: theme.text, marginBottom: 16 }]}>
// //                 {t('reg_crop_lot') || 'Register Crop Lot'}
// //               </Text>

// //               <Text style={[styles.formTitle, { color: theme.text }]}>Crop</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker
// //                   selectedValue={isPredefined(prCrop, cropOptions) ? prCrop : 'Other'}
// //                   onValueChange={(v) => (v !== 'Other' ? setPrCrop(v) : null)}
// //                 >
// //                   <Picker.Item label="Select crop" value="" />
// //                   {cropOptions.map((c) => (
// //                     <Picker.Item key={c} label={c} value={c} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {!isPredefined(prCrop, cropOptions) && prCrop && (
// //                 <TextInput
// //                   placeholder="Type crop name"
// //                   value={prCrop}
// //                   onChangeText={setPrCrop}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.formTitle, { color: theme.text }]}>Grade</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker selectedValue={prGrade} onValueChange={setPrGrade}>
// //                   <Picker.Item label="Select grade" value="" />
// //                   {currentGrades.map((g) => (
// //                     <Picker.Item key={g} label={g} value={g} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //               {prGrade === 'Other' && (
// //                 <TextInput
// //                   placeholder="Type grade"
// //                   value={prGrade}
// //                   onChangeText={setPrGrade}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               <Text style={[styles.formTitle, { color: theme.text }]}>
// //                 Quantity (quintal)
// //               </Text>
// //               <TextInput
// //                 placeholder="Enter quantity"
// //                 value={prQuantity}
// //                 onChangeText={setPrQuantity}
// //                 keyboardType="numeric"
// //                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //               />

// //               <Text style={[styles.formTitle, { color: theme.text }]}>Mandi</Text>
// //               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
// //                 <Picker
// //                   selectedValue={isPredefined(prMandi, mandiOptions) ? prMandi : 'Other'}
// //                   onValueChange={(v) => (v !== 'Other' ? setPrMandi(v) : null)}
// //                 >
// //                   <Picker.Item label="Select mandi" value="" />
// //                   {mandiOptions.map((m) => (
// //                     <Picker.Item key={m} label={m} value={m} />
// //                   ))}
// //                   <Picker.Item label="Other" value="Other" />
// //                 </Picker>
// //               </View>
// //               {!isPredefined(prMandi, mandiOptions) && prMandi && (
// //                 <TextInput
// //                   placeholder="Type mandi"
// //                   value={prMandi}
// //                   onChangeText={setPrMandi}
// //                   style={[styles.input, { color: theme.text, borderColor: theme.text }]}
// //                 />
// //               )}

// //               {/* ✅ Expected Arrival text box bigger + calendar icon inside */}
// //               <Text style={[styles.formTitle, { color: theme.text }]}>
// //                 Expected Arrival Date
// //               </Text>

// //               <TouchableOpacity
// //                 style={[
// //                   styles.input,
// //                   styles.dateInput,
// //                   {
// //                     borderColor: theme.text,
// //                     flexDirection: 'row',
// //                     alignItems: 'center',
// //                     justifyContent: 'space-between',
// //                   },
// //                 ]}
// //                 onPress={openDatePicker}
// //               >
// //                 <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
// //                   {prExpectedArrival || 'dd-mm-yyyy'}
// //                 </Text>
// //                 <Text style={styles.calendarIcon}>📅</Text>
// //               </TouchableOpacity>

// //               {prExpectedArrival && (
// //                 <TouchableOpacity
// //                   onPress={() => setPrExpectedArrival('')}
// //                   style={{ marginTop: 6 }}
// //                 >
// //                   <Text style={{ color: theme.primary, fontSize: 12 }}>Clear</Text>
// //                 </TouchableOpacity>
// //               )}

// //               {showDatePicker && (
// //                 <DateTimePicker
// //                   value={dateValue}
// //                   mode="date"
// //                   display={Platform.OS === 'android' ? 'spinner' : 'default'}
// //                   onChange={onChangeDate}
// //                   maximumDate={new Date(2100, 11, 31)}
// //                   minimumDate={new Date(2000, 0, 1)}
// //                 />
// //               )}

// //               <TouchableOpacity
// //                 style={[styles.addBtn, { backgroundColor: theme.primary }]}
// //                 onPress={addLotInline}
// //               >
// //                 <Text style={styles.addBtnText}>Add Lot</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //               {t('your_registered_lots') || 'Your Registered Lots'}
// //             </Text>
// //           </>
// //         )}
// //       </View>
// //     ),
// //     [
// //       theme,
// //       t,
// //       selectedTab,
// //       mandiName,
// //       cropName,
// //       stfMandi,
// //       stfCrop,
// //       horizon,
// //       forecastLoading,
// //       forecastSummary,
// //       prCrop,
// //       prGrade,
// //       prQuantity,
// //       prMandi,
// //       prExpectedArrival,
// //       lots.length,
// //       openDatePicker,
// //       addLotInline,
// //     ]
// //   );

// //   const renderLotItem = useCallback(
// //     ({ item }: { item: Lot }) => (
// //       <View
// //         style={[
// //           styles.lotItem,
// //           { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background },
// //         ]}
// //       >
// //         <View style={{ flex: 1 }}>
// //           <Text style={[styles.lotText, { color: theme.text }]}>
// //             <Text style={{ fontWeight: '700' }}>Crop: </Text>
// //             {item.crop}
// //           </Text>
// //           <Text style={[styles.lotText, { color: theme.text }]}>
// //             <Text style={{ fontWeight: '700' }}>Grade: </Text>
// //             {item.grade}
// //           </Text>
// //           <Text style={[styles.lotText, { color: theme.text }]}>
// //             <Text style={{ fontWeight: '700' }}>Qty: </Text>
// //             {item.quantity}
// //           </Text>
// //           <Text style={[styles.lotText, { color: theme.text }]}>
// //             <Text style={{ fontWeight: '700' }}>Mandi: </Text>
// //             {item.mandi}
// //           </Text>
// //           <Text style={[styles.lotText, { color: theme.text }]}>
// //             <Text style={{ fontWeight: '700' }}>Arrival: </Text>
// //             {item.expectedArrival}
// //           </Text>
// //         </View>
// //         <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
// //           <Text style={styles.removeBtnText}>×</Text>
// //         </TouchableOpacity>
// //       </View>
// //     ),
// //     [theme, removeLot]
// //   );

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
// //         keyExtractor={(item) => item.id}
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
// //   backBtn: {
// //     alignSelf: 'flex-start',
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     borderRadius: 6,
// //     marginBottom: 10,
// //   },
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
// //   chartPlaceholder: {
// //     height: 200,
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f9f9f9',
// //   },

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
// //   lotItem: {
// //     flexDirection: 'row',
// //     borderWidth: 1,
// //     borderRadius: 10,
// //     padding: 12,
// //     marginBottom: 10,
// //     alignItems: 'center',
// //   },
// //   lotText: { marginBottom: 6 },
// //   removeBtn: { backgroundColor: '#e53e3e', padding: 10, borderRadius: 8, marginLeft: 12 },
// //   removeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

// //   // 🔹 Extra styles for the date input
// //   dateInput: {
// //     // Slightly taller if you want it to feel bigger than normal inputs
// //     paddingVertical: 14,
// //   },
// //   calendarIcon: {
// //     fontSize: 22,
// //     marginLeft: 8,
// //   },
// // });

// import React, { useEffect, useState, useMemo } from 'react';
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

// // 🔵 Bid + LotWithBids for received bids
// type Bid = {
//   lotId: string;
//   lotOwner: string;
//   bidder: string;
//   bidValue: string;
//   createdAt: number;
//   status?: 'pending' | 'accepted' | 'rejected';
// };

// type LotWithBids = Lot & {
//   bids: Bid[];
// };

// export default function SellerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const goBack = () => navigation.navigate('Dashboard');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [selectedTab, setSelectedTab] = useState<
//     'daily' | 'short' | 'preregister' | 'received'
//   >('daily');

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

//   // 🔵 Received bids state
//   const [lotsWithBids, setLotsWithBids] = useState<LotWithBids[]>([]);
//   const [loadingBids, setLoadingBids] = useState(false);

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

//   // Load logged-in seller and their lots
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

//   // Keep grades valid when crop changes
//   useEffect(() => {
//     if (!prCrop) {
//       setPrGrade('');
//       return;
//     }
//     const options = gradeMap[prCrop] || ['Other'];
//     if (!options.includes(prGrade)) {
//       setPrGrade('');
//     }
//   }, [prCrop, prGrade]);

//   // 🔵 Load received bids when tab changes to "received"
//   useEffect(() => {
//     if (selectedTab === 'received' && phone) {
//       loadReceivedBids(phone);
//     }
//   }, [selectedTab, phone]);

//   const onSelectTab = (tab: 'daily' | 'short' | 'preregister' | 'received') => {
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
//     if (tab === 'received') {
//       setSelectedTab('received');
//       return;
//     }
//     setSelectedTab('daily');
//   };

//   const onSearchDaily = () => {
//     if (!mandiName && !cropName) {
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fill_mandi_search') ?? 'Enter mandi or crop to search'
//       );
//       return;
//     }
//     setAppliedFilters({ mandi: mandiName, crop: cropName });
//   };

//   const getShortTermForecastInline = async () => {
//     if (!stfMandi && !stfCrop) {
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fill_mandi_search') ?? 'Enter mandi or crop to search'
//       );
//       return;
//     }
//     try {
//       setForecastLoading(true);
//       setForecastSummary(null);
//       const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${
//         stfCrop || 'selected crop'
//       } at ${stfMandi || 'selected mandi'} — ${
//         horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
//       }.`;
//       setForecastSummary(summary);
//     } catch (err) {
//       console.error(err);
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         t('error_generic') ?? 'Something went wrong'
//       );
//     } finally {
//       setForecastLoading(false);
//     }
//   };

//   const addLotInline = async () => {
//     if (!prCrop)
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fill_crop') ?? 'Please select crop'
//       );
//     if (!prQuantity)
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fill_quantity') ?? 'Please enter quantity'
//       );
//     if (!prMandi)
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fill_mandi') ?? 'Please select mandi'
//       );

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
//     if (phone)
//       await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(newLots));

//     setPrCrop('');
//     setPrGrade('');
//     setPrQuantity('');
//     setPrMandi('');
//     setPrExpectedArrival('');
//     setDateValue(new Date());
//     setShowDatePicker(false);

//     Alert.alert(
//       t('success_title') ?? 'Success',
//       t('lot_added_success') ?? 'Lot added successfully'
//     );
//   };

//   const removeLot = async (id: string) => {
//     const filtered = lots.filter((l) => l.id !== id);
//     setLots(filtered);
//     if (phone)
//       await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${phone}`, JSON.stringify(filtered));
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
//       } else {
//         setDateValue(new Date());
//       }
//     } else {
//       setDateValue(new Date());
//     }
//     setShowDatePicker(true);
//   };

//   const currentGrades = prCrop ? gradeMap[prCrop] ?? ['Other'] : [];

//   // Helper: Check if value is a valid picker option (not custom "Other" text)
//   const isValidPickerValue = (value: string, options: string[]) => {
//     return value === '' || options.includes(value) || value === 'Other';
//   };

//   // 🔵 Load all bids received on this seller's lots
//   const loadReceivedBids = async (ownerPhone: string) => {
//     setLoadingBids(true);
//     try {
//       const lotJson = await AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${ownerPhone}`);
//       const ownerLots: Lot[] = lotJson ? JSON.parse(lotJson) : [];

//       const result: LotWithBids[] = [];

//       for (const lot of ownerLots) {
//         const bidKey = `BIDS_LOT_${lot.id}`;
//         const bidJson = await AsyncStorage.getItem(bidKey);
//         if (!bidJson) continue;

//         let bids: Bid[] = [];
//         try {
//           bids = JSON.parse(bidJson);
//         } catch (e) {
//           console.warn('Failed parse bids for lot', lot.id, e);
//           continue;
//         }

//         const filtered = bids.filter((b) => b.lotOwner === ownerPhone);
//         if (filtered.length > 0) {
//           result.push({ ...lot, bids: filtered });
//         }
//       }

//       setLotsWithBids(result);
//     } catch (err) {
//       console.warn(err);
//     } finally {
//       setLoadingBids(false);
//     }
//   };

//   // 🔵 Update status for a single bid
//   const updateBidStatus = async (
//     lotId: string,
//     bidCreatedAt: number,
//     status: 'accepted' | 'rejected'
//   ) => {
//     try {
//       const bidKey = `BIDS_LOT_${lotId}`;
//       const bidJson = await AsyncStorage.getItem(bidKey);
//       if (!bidJson) return;

//       let bids: Bid[] = JSON.parse(bidJson);
//       bids = bids.map((b) =>
//         b.createdAt === bidCreatedAt ? { ...b, status } : b
//       );

//       await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

//       if (phone) {
//         await loadReceivedBids(phone);
//       }
//     } catch (e) {
//       console.warn('Failed to update bid status', e);
//     }
//   };

//   const handleAcceptBid = (lotId: string, createdAt: number) => {
//     updateBidStatus(lotId, createdAt, 'accepted');
//   };

//   const handleRejectBid = (lotId: string, createdAt: number) => {
//     updateBidStatus(lotId, createdAt, 'rejected');
//   };

//   const ListHeaderElement = useMemo(() => {
//     return (
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
//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'daily'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('daily')}
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
//             onPress={() => onSelectTab('short')}
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
//               selectedTab === 'preregister'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('preregister')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 { color: selectedTab === 'preregister' ? '#fff' : theme.text },
//                 selectedTab === 'preregister' && styles.tabTextSelected,
//               ]}
//             >
//               {t('pre_register_lot')}
//             </Text>
//           </TouchableOpacity>

//           {/* 🔵 Received Bids tab */}
//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'received'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('received')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 { color: selectedTab === 'received' ? '#fff' : theme.text },
//                 selectedTab === 'received' && styles.tabTextSelected,
//               ]}
//             >
//               {t('received_bids') ?? 'Received Bids'}
//             </Text>
//           </TouchableOpacity>
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
//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//                 {t('mandi') ?? 'Mandi'}
//               </Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''}
//                   onValueChange={(v) => setMandiName(v)}
//                 >
//                   <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
//                   {mandiOptions.map((m) => (
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
//                     style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                   />
//                 )}

//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//                 {t('crop') ?? 'Crop'}
//               </Text>
//               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
//                 <Picker
//                   selectedValue={isValidPickerValue(cropName, cropOptions) ? cropName : ''}
//                   onValueChange={(v) => setCropName(v)}
//                 >
//                   <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
//                   {cropOptions.map((c) => (
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
//                     style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//                   />
//                 )}

//               <TouchableOpacity
//                 style={[
//                   styles.searchBtn,
//                   { backgroundColor: theme.primary ?? '#2b6cb0' },
//                 ]}
//                 onPress={onSearchDaily}
//               >
//                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>
//                   {t('search')}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={[
//                 styles.chartBox,
//                 { borderColor: theme.text, backgroundColor: theme.background },
//               ]}
//             >
//               <Text style={[styles.chartTitle, { color: theme.text }]}>
//                 {t('daily_market_price_chart_title')}
//               </Text>
//               <View style={[styles.chartPlaceholder, { borderColor: theme.text }]}>
//                 <GraphChart filters={appliedFilters} />
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
//                 { backgroundColor: theme.background, borderColor: theme.text ?? '#ddd' },
//               ]}
//             >
//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//                 {t('mandi') ?? 'Mandi'}
//               </Text>
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

//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//                 {t('crop') ?? 'Crop'}
//               </Text>
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

//               <Text style={[styles.searchTitle, { color: theme.text }]}>
//                 {t('forecast_horizon') ?? 'Duration (in days)'}
//               </Text>
//               <View style={styles.horizonRow}>
//                 <TouchableOpacity
//                   style={[
//                     styles.horizonBtn,
//                     horizon === '7days' ? styles.horizonBtnActive : {},
//                   ]}
//                   onPress={() => setHorizon('7days')}
//                 >
//                   <Text
//                     style={
//                       horizon === '7days' ? styles.horizonTextActive : styles.horizonText
//                     }
//                   >
//                     7
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.horizonBtn,
//                     horizon === '14days' ? styles.horizonBtnActive : {},
//                   ]}
//                   onPress={() => setHorizon('14days')}
//                 >
//                   <Text
//                     style={
//                       horizon === '14days' ? styles.horizonTextActive : styles.horizonText
//                     }
//                   >
//                     14
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.horizonBtn,
//                     horizon === '30days' ? styles.horizonBtnActive : {},
//                   ]}
//                   onPress={() => setHorizon('30days')}
//                 >
//                   <Text
//                     style={
//                       horizon === '30days' ? styles.horizonTextActive : styles.horizonText
//                     }
//                   >
//                     30
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 style={[
//                   styles.searchBtn,
//                   { backgroundColor: theme.primary ?? '#2b6cb0' },
//                 ]}
//                 onPress={getShortTermForecastInline}
//               >
//                 <Text style={[styles.searchBtnText, { color: '#fff' }]}>
//                   {t('get_forecast') ?? 'Get Forecast'}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={[
//                 styles.chartBox,
//                 {
//                   borderColor: theme.text ?? '#ddd',
//                   backgroundColor: theme.background ?? '#fff',
//                 },
//               ]}
//             >
//               <Text style={[styles.chartTitle, { color: theme.text }]}>
//                 {t('short_term_forecast')}
//               </Text>
//               <View style={styles.chartPlaceholder}>
//                 <Text style={{ color: theme.text ?? '#666' }}>
//                   {forecastLoading
//                     ? t('loading') ?? 'Loading...'
//                     : forecastSummary ??
//                       t('chart_placeholder_text') ??
//                       'Forecast chart will appear here'}
//                 </Text>
//               </View>
//               {forecastSummary && (
//                 <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>
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
//                 { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background },
//               ]}
//             >
//               <View style={styles.formHeaderRow}>
//                 <Text style={[styles.title, { color: theme.text }]}>
//                   {t('reg_crop_lot') || t('pre_register_title') || 'Register Crop Lot'}
//                 </Text>
//               </View>

//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 {t('crop') ?? 'Crop'}
//               </Text>
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

//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 {t('grade_label') ?? 'Grade'}
//               </Text>
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

//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 {t('quantity_label') ?? 'Quantity (quintal)'}
//               </Text>
//               <TextInput
//                 placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
//                 placeholderTextColor={theme.text ?? '#999'}
//                 value={prQuantity}
//                 onChangeText={setPrQuantity}
//                 keyboardType="numeric"
//                 style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               />

//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 {t('mandi_label') ?? 'Mandi Location'}
//               </Text>
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

//               {/* Expected Arrival Date */}
//               <Text style={[styles.formTitle, { color: theme.text }]}>
//                 {t('arrival_label') ?? 'Expected Arrival Date'}
//               </Text>
//               <TouchableOpacity
//                 style={[
//                   styles.input,
//                   styles.dateInput,
//                   {
//                     borderColor: theme.text,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   },
//                 ]}
//                 onPress={openDatePicker}
//               >
//                 <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
//                   {prExpectedArrival || (t('enter_date') ?? 'dd-mm-yyyy')}
//                 </Text>
//                 <Text style={styles.calendarIcon}>📅</Text>
//               </TouchableOpacity>

//               {prExpectedArrival && (
//                 <TouchableOpacity onPress={() => setPrExpectedArrival('')} style={{ marginTop: 6 }}>
//                   <Text style={{ color: theme.primary ?? '#2b6cb0', fontSize: 12 }}>
//                     {t('clear') ?? 'Clear'}
//                   </Text>
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
//                 style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]}
//                 onPress={addLotInline}
//               >
//                 <Text style={[styles.addBtnText, { color: '#fff' }]}>
//                   {t('add_lot') ?? 'Add Lot'}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={[styles.sectionTitle, { color: theme.text }]}>
//               {t('your_registered_lots') ?? 'Your Registered Lots'}
//             </Text>
//           </>
//         )}

//         {/* 🔵 RECEIVED BIDS TAB */}
//         {selectedTab === 'received' && (
//           <View
//             style={[
//               styles.formBox,
//               { borderColor: theme.text ?? '#ddd', backgroundColor: theme.background },
//             ]}
//           >
//             <Text style={[styles.sectionTitle, { color: theme.text }]}>
//               {t('received_bids') ?? 'Received Bids on Your Lots'}
//             </Text>

//             {loadingBids ? (
//               <Text style={{ color: theme.text, marginTop: 10 }}>
//                 {t('loading') ?? 'Loading...'}
//               </Text>
//             ) : lotsWithBids.length === 0 ? (
//               <View style={[styles.emptyBox, { borderColor: '#eee', marginTop: 8 }]}>
//                 <Text style={{ color: theme.text ?? '#666' }}>
//                   {t('no_bids_yet') ?? 'No bids received yet'}
//                 </Text>
//               </View>
//             ) : (
//               lotsWithBids.map((lotWithBids) => (
//                 <View
//                   key={lotWithBids.id}
//                   style={[
//                     styles.lotItemReceived,
//                     { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background },
//                   ]}
//                 >
//                   <View style={{ marginBottom: 8 }}>
//                     <Text
//                       style={[
//                         styles.lotText,
//                         { color: theme.text, fontWeight: '700', marginBottom: 4 },
//                       ]}
//                     >
//                       {lotWithBids.crop} ({lotWithBids.grade})
//                     </Text>
//                     <Text style={[styles.lotText, { color: theme.text }]}>
//                       {t('quantity_label') ?? 'Quantity'}: {lotWithBids.quantity}
//                     </Text>
//                     <Text style={[styles.lotText, { color: theme.text }]}>
//                       {t('mandi_label') ?? 'Mandi'}: {lotWithBids.mandi}
//                     </Text>
//                     <Text style={[styles.lotText, { color: theme.text }]}>
//                       {t('arrival_label') ?? 'Arrival'}: {lotWithBids.expectedArrival}
//                     </Text>
//                   </View>

//                   <View style={{ marginTop: 8 }}>
//                     <Text style={[styles.formTitle, { color: theme.text, fontSize: 14 }]}>
//                       {t('received_bids') ?? 'Bids'} ({lotWithBids.bids.length})
//                     </Text>

//                     {lotWithBids.bids.map((bid) => (
//                       <View
//                         key={bid.createdAt}
//                         style={{
//                           marginTop: 8,
//                           padding: 8,
//                           borderWidth: 1,
//                           borderRadius: 8,
//                           borderColor: theme.text ?? '#ccc',
//                         }}
//                       >
//                         <Text style={{ color: theme.text }}>
//                           {t('bidder') ?? 'Bidder'}: {bid.bidder}
//                         </Text>
//                         <Text style={{ color: theme.text }}>
//                           {t('bid_value') ?? 'Bid'}: ₹{bid.bidValue}/quintal
//                         </Text>
//                         <Text style={{ color: theme.text }}>
//                           {t('date') ?? 'Date'}:{' '}
//                           {new Date(bid.createdAt).toLocaleString()}
//                         </Text>

//                         {bid.status && (
//                           <Text
//                             style={{
//                               marginTop: 4,
//                               color:
//                                 bid.status === 'accepted'
//                                   ? '#15803d'
//                                   : bid.status === 'rejected'
//                                   ? '#b91c1c'
//                                   : '#92400e',
//                               fontWeight: '700',
//                               fontSize: 12,
//                             }}
//                           >
//                             {bid.status.toUpperCase()}
//                           </Text>
//                         )}

//                         {(!bid.status || bid.status === 'pending') && (
//                           <View style={{ flexDirection: 'row', marginTop: 8 }}>
//                             <TouchableOpacity
//                               style={[
//                                 styles.addBtn,
//                                 {
//                                   flex: 1,
//                                   marginRight: 4,
//                                   backgroundColor: '#16a34a',
//                                 },
//                               ]}
//                               onPress={() =>
//                                 handleAcceptBid(lotWithBids.id, bid.createdAt)
//                               }
//                             >
//                               <Text style={[styles.addBtnText, { color: '#fff' }]}>
//                                 {t('accept') ?? 'Accept'}
//                               </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                               style={[
//                                 styles.addBtn,
//                                 {
//                                   flex: 1,
//                                   marginLeft: 4,
//                                   backgroundColor: '#b91c1c',
//                                 },
//                               ]}
//                               onPress={() =>
//                                 handleRejectBid(lotWithBids.id, bid.createdAt)
//                               }
//                             >
//                               <Text style={[styles.addBtnText, { color: '#fff' }]}>
//                                 {t('reject') ?? 'Reject'}
//                               </Text>
//                             </TouchableOpacity>
//                           </View>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 </View>
//               ))
//             )}
//           </View>
//         )}
//       </View>
//     );
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
//     showDatePicker,
//     dateValue,
//     lotsWithBids,
//     loadingBids,
//   ]);

//   const renderLotItem = ({ item }: { item: Lot }) => (
//     <View
//       style={[
//         styles.lotItem,
//         { borderColor: theme.text ?? '#ccc', backgroundColor: theme.background },
//       ]}
//     >
//       <View style={{ flex: 1 }}>
//         <Text style={[styles.lotText, { color: theme.text }]}>
//           <Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>
//           {item.crop}
//         </Text>
//         <Text style={[styles.lotText, { color: theme.text }]}>
//           <Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>
//           {item.grade}
//         </Text>
//         <Text style={[styles.lotText, { color: theme.text }]}>
//           <Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>
//           {item.quantity}
//         </Text>
//         <Text style={[styles.lotText, { color: theme.text }]}>
//           <Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>
//           {item.mandi}
//         </Text>
//         <Text style={[styles.lotText, { color: theme.text }]}>
//           <Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>
//           {item.expectedArrival}
//         </Text>
//       </View>
//       <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
//         <Text style={styles.removeBtnText}>×</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderEmpty = () => {
//     if (selectedTab !== 'preregister') return null;
//     return (
//       <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
//         <Text style={{ color: theme.text ?? '#666' }}>
//           {t('no_lots') ?? 'No lots registered yet'}
//         </Text>
//       </View>
//     );
//   };

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
//   backBtn: {
//     alignSelf: 'flex-start',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 14, marginBottom: 12 },

//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   tab: { flex: 0.24, padding: 12, borderRadius: 8, alignItems: 'center' },
//   tabText: { fontWeight: '600', color: '#333' },
//   tabTextSelected: { color: '#fff' },

//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8, marginTop: 8 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
//   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   searchBtnText: { fontWeight: '700' },

//   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   chartTitle: { fontWeight: '700', marginBottom: 10 },
//   chartPlaceholder: {
//     height: 220,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 8,
//   },

//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: {
//     padding: 10,
//     borderRadius: 6,
//     marginRight: 8,
//     backgroundColor: '#efefef',
//     alignItems: 'center',
//     minWidth: 44,
//   },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },

//   formBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   formHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
//   addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
//   addBtnText: { fontWeight: '700', color: '#fff' },

//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 12 },
//   emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },

//   // Used for "Your Registered Lots"
//   lotItem: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 8,
//     alignItems: 'center',
//   },

//   // 🔵 Used for "Received Bids" cards (column layout)
//   lotItemReceived: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//     flexDirection: 'column',
//     alignItems: 'stretch',
//   },

//   lotText: { marginBottom: 6 },
//   removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
//   removeBtnText: { color: '#fff', fontWeight: '700' },
//   pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden' },

//   dateInput: {
//     paddingVertical: 14,
//   },
//   calendarIcon: {
//     fontSize: 22,
//     marginLeft: 8,
//   },
// });

import React, { useEffect, useState, useMemo } from 'react';
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
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import GraphChart from '../components/GraphChart';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  sellingamount: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
};

//  Bid + LotWithBids for received bids
type Bid = {
  lotId: string;
  lotOwner: string;
  bidder: string;
  sellingamount: string;
  bidValue: string;
  createdAt: number;
  status?: 'pending' | 'accepted' | 'rejected';
};

type LotWithBids = Lot & {
  bids: Bid[];
};

// DB crop / mandi shapes for UI
type UICrop = { id: number; name: string; grade?: string | null };
type UIMandi = { id: number; name: string; location: string };

export default function SellerDashboard() {
  const navigation = useNavigation<PropsNav>();
  const goBack = () => navigation.navigate('Dashboard');

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [selectedTab, setSelectedTab] = useState<
    'daily' | 'short' | 'preregister' | 'received'
  >('daily');

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
  const [prSellingAmount, setPrSellingAmount] = useState('');
  const [prMandi, setPrMandi] = useState('');
  const [prExpectedArrival, setPrExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  // Date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  //  Received bids state
  const [lotsWithBids, setLotsWithBids] = useState<LotWithBids[]>([]);
  const [loadingBids, setLoadingBids] = useState(false);

  const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

  //  Crops & Mandis from DB
  const [crops, setCrops] = useState<UICrop[]>([]);
  const [mandis, setMandis] = useState<UIMandi[]>([]);

  // Unique crop/mandi names for dropdowns
  const cropOptions = useMemo(
    () => Array.from(new Set(crops.map(c => c.name))),
    [crops],
  );

  const mandiOptions = useMemo(
    () => Array.from(new Set(mandis.map(m => m.name))),
    [mandis],
  );

  //  Grades from DB for selected crop
  const currentGrades = useMemo(() => {
    if (!prCrop) return [];

    const grades = crops
      .filter(c => c.name === prCrop && c.grade != null && c.grade !== '')
      .map(c => String(c.grade));

    const unique = Array.from(new Set(grades));

    if (!unique.length) return ['Other'];
    if (!unique.includes('Other')) unique.push('Other');
    return unique;
  }, [prCrop, crops]);

  // Helper: Check if value is a valid picker option
  const isValidPickerValue = (value: string, options: string[]) => {
    return value === '' || options.includes(value) || value === 'Other';
  };

  //  helper: sync lots to AsyncStorage (for buyer pre-bidding)
  const syncLotsToStorage = async (lotsToStore: Lot[], ownerPhone: string | null) => {
    if (!ownerPhone) return;
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEY_PREFIX}${ownerPhone}`,
        JSON.stringify(lotsToStore),
      );
    } catch (e) {
      console.warn('Failed to sync lots to storage', e);
    }
  };

  //  load lots from backend /seller/lots/all
  const loadLotsFromBackend = async (ownerPhone: string | null) => {
    try {
      const res = await api.get('/seller/lots/all');
      const data = Array.isArray(res.data) ? res.data : [];

      const mapped: Lot[] = data.map((d: any) => {
        const id =
          d.preLotId ??
          d.PreLotId ??
          d.id ??
          d.lotId ??
          `${Date.now()}_${Math.random()}`;

        return {
          id: String(id),
          crop: d.cropName ?? d.CropName ?? d.crop ?? '',
          grade: d.grade ?? d.Grade ?? '-',
          quantity: String(d.quantity ?? d.Quantity ?? ''),
          sellingamount: String(d.SellingAmount ?? d.sellingamount ?? ''),
          mandi:
            d.mandiName ??
            d.MandiName ??
            d.mandiLocation ??
            d.MandiLocation ??
            '',
          expectedArrival:
            d.expectedArrivalDate ??
            d.ExpectedArrivalDate ??
            d.expectedArrival ??
            '-',
          createdAt: d.createdAt
            ? new Date(d.createdAt).getTime()
            : Date.now(),
        };
      });

      setLots(mapped);
      await syncLotsToStorage(mapped, ownerPhone);
    } catch (err) {
      console.warn('Failed to load seller lots from backend', err);
      // fallback: try existing local storage if any
      if (ownerPhone) {
        const j = await AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${ownerPhone}`);
        if (j) {
          try {
            setLots(JSON.parse(j));
          } catch (e) {
            console.warn('Failed parse lots from local storage', e);
          }
        }
      }
    }
  };

  //  load crops & mandis from backend
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [cropsRes, mandisRes] = await Promise.all([
          api.get('/crops'),
          api.get('/mandis'),
        ]);

        const cropsData = cropsRes.data ?? [];
        const mandisData = mandisRes.data ?? [];

        const mappedCrops: UICrop[] = cropsData
          .map((c: any) => {
            const id = c.cropId ?? c.CropId ?? c.id;
            const name = c.cropName ?? c.CropName ?? c.name;
            const grade = c.grade ?? c.Grade ?? null;
            if (!id || !name) return null;
            return {
              id: Number(id),
              name: String(name),
              grade,
            };
          })
          .filter(Boolean) as UICrop[];

        const mappedMandis: UIMandi[] = mandisData
          .map((m: any) => {
            const id = m.mandiId ?? m.MandiId ?? m.id;
            const name = m.mandiName ?? m.MandiName ?? m.name;
            const location = m.location ?? m.Location ?? '';
            if (!id || !name) return null;
            return {
              id: Number(id),
              name: String(name),
              location: String(location),
            };
          })
          .filter(Boolean) as UIMandi[];

        setCrops(mappedCrops);
        setMandis(mappedMandis);
      } catch (e) {
        console.warn('Failed to load crops/mandis for seller', e);
      }
    };

    loadMeta();
  }, []);

  // Load logged-in seller and their lots
  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then(async p => {
      setPhone(p);
      await loadLotsFromBackend(p);
    });
  }, []);

  // Keep grades valid when crop changes (based on DB grades)
  useEffect(() => {
    if (!prCrop) {
      setPrGrade('');
      return;
    }
    if (prGrade && !currentGrades.includes(prGrade)) {
      setPrGrade('');
    }
  }, [prCrop, prGrade, currentGrades]);

  //  Load received bids when tab changes to "received"
  useEffect(() => {
    if (selectedTab === 'received' && phone) {
      loadReceivedBids(phone);
    }
  }, [selectedTab, phone]);

  const onSelectTab = (
    tab: 'daily' | 'short' | 'preregister' | 'received',
  ) => {
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
    if (tab === 'received') {
      setSelectedTab('received');
      return;
    }
    setSelectedTab('daily');
  };

  const onSearchDaily = () => {
    if (!mandiName && !cropName) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_mandi_search') ?? 'Enter mandi or crop to search',
      );
      return;
    }
    setAppliedFilters({ mandi: mandiName, crop: cropName });
  };

  const getShortTermForecastInline = async () => {
    if (!stfMandi && !stfCrop) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_mandi_search') ?? 'Enter mandi or crop to search',
      );
      return;
    }
    try {
      setForecastLoading(true);
      setForecastSummary(null);
      const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${
        stfCrop || 'selected crop'
      } at ${stfMandi || 'selected mandi'} — ${
        horizon === '7days'
          ? 'Next 7 days'
          : horizon === '14days'
          ? 'Next 14 days'
          : 'Next 30 days'
      }.`;
      setForecastSummary(summary);
    } catch (err) {
      console.error(err);
      Alert.alert(
        t('error_title') ?? 'Error',
        t('error_generic') ?? 'Something went wrong',
      );
    } finally {
      setForecastLoading(false);
    }
  };

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const onChangeDate = (
    _event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) {
      setDateValue(selectedDate);
      setPrExpectedArrival(formatDate(selectedDate));
    }
  };

  const openDatePicker = () => {
    if (prExpectedArrival) {
      const parts = prExpectedArrival.split('-').map(p => parseInt(p, 10));
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

  //  pick the correct CropId based on selected crop & grade
  const pickCropIdForSelection = () => {
    if (!prCrop) return null;

    // Try crop + grade first
    let match = crops.find(
      c =>
        c.name === prCrop &&
        (c.grade ?? '') === (prGrade) || (c.grade ?? ''),
    );

    // Fallback: any row with same crop name
    if (!match) {
      match = crops.find(c => c.name === prCrop);
    }

    return match?.id ?? null;
  };

  const pickMandiIdForSelection = () => {
    if (!prMandi) return null;
    const m = mandis.find(m => m.name === prMandi);
    return m?.id ?? null;
  };

  //  Register lot with DB (POST /seller/lots/register)
  const addLotInline = async () => {
    if (!prCrop)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_crop') ?? 'Please select crop',
      );
    if (!prQuantity)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_quantity') ?? 'Please enter quantity',
      );
    if (!prMandi)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_mandi') ?? 'Please select mandi',
      );

    const cropId = pickCropIdForSelection();
    const mandiId = pickMandiIdForSelection();

    if (!cropId || !mandiId) {
      Alert.alert(
        t('error_title') ?? 'Error',
        'Invalid crop or mandi selected. Please re-select.',
      );
      return;
    }

    try {
      const formData = new FormData();

      // Names MUST match LotRegisterRequest
      formData.append('CropId', String(cropId));
      formData.append('MandiId', String(mandiId));
      formData.append('Quantity', prQuantity);
      formData.append('SellingAmount',prSellingAmount);
      formData.append('Grade', prGrade || '-');

      if (prExpectedArrival) {
        formData.append('ExpectedArrivalDate', dateValue.toISOString());
      }

      const res = await api.post('/seller/lots/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data: any = res.data ?? {};
      const id = String(
        data.preLotId ??
          data.PreLotId ??
          data.id ??
          data.lotId ??
          `${Date.now()}`,
      );

      const newLot: Lot = {
        id,
        crop: data.cropName ?? data.CropName ?? prCrop,
        grade: (data.grade ?? data.Grade ?? prGrade) || '-',
        quantity: String(data.quantity ?? data.Quantity ?? prQuantity),
        sellingamount: String(data.sellingamount ?? data.SellingAmount ?? prSellingAmount),
        mandi:
          data.mandiName ??
          data.MandiName ??
          data.mandiLocation ??
          data.MandiLocation ??
          prMandi,
        expectedArrival:
          (data.expectedArrivalDate ??
          data.ExpectedArrivalDate ??
          prExpectedArrival) ||
          '-',
        createdAt: data.createdAt
          ? new Date(data.createdAt).getTime()
          : Date.now(),
      };

      const newLots = [newLot, ...lots];
      setLots(newLots);
      await syncLotsToStorage(newLots, phone);

      setPrCrop('');
      setPrGrade('');
      setPrQuantity('');
      setPrSellingAmount('');
      setPrMandi('');
      setPrExpectedArrival('');
      setDateValue(new Date());
      setShowDatePicker(false);

      Alert.alert(
        t('success_title') ?? 'Success',
        t('lot_added_success') ?? 'Lot added successfully',
      );
    } catch (err: any) {
      console.error(
        'Seller register lot error:',
        err?.response?.status,
        err?.response?.data ?? err,
      );
      Alert.alert(
        t('error_title') ?? 'Error',
        t('lot_add_failed') ?? 'Failed to register lot',
      );
    }
  };

  const removeLot = async (id: string) => {
    // call backend delete as well
    try {
      await api.delete(`/seller/lots/${id}`);
    } catch (err) {
      console.warn('Delete seller lot API error:', err);
    }

    const filtered = lots.filter(l => l.id !== id);
    setLots(filtered);
    if (phone)
      await AsyncStorage.setItem(
        `${STORAGE_KEY_PREFIX}${phone}`,
        JSON.stringify(filtered),
      );
  };

  //  Load all bids received on this seller's lots
  const loadReceivedBids = async (ownerPhone: string) => {
    setLoadingBids(true);
    try {
      const lotJson = await AsyncStorage.getItem(
        `${STORAGE_KEY_PREFIX}${ownerPhone}`,
      );
      const ownerLots: Lot[] = lotJson ? JSON.parse(lotJson) : [];

      const result: LotWithBids[] = [];

      for (const lot of ownerLots) {
        const bidKey = `BIDS_LOT_${lot.id}`;
        const bidJson = await AsyncStorage.getItem(bidKey);
        if (!bidJson) continue;

        let bids: Bid[] = [];
        try {
          bids = JSON.parse(bidJson);
        } catch (e) {
          console.warn('Failed parse bids for lot', lot.id, e);
          continue;
        }

        const filtered = bids.filter(b => b.lotOwner === ownerPhone);
        if (filtered.length > 0) {
          result.push({ ...lot, bids: filtered });
        }
      }

      setLotsWithBids(result);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoadingBids(false);
    }
  };

  //  Update status for a single bid
  const updateBidStatus = async (
    lotId: string,
    bidCreatedAt: number,
    status: 'accepted' | 'rejected',
  ) => {
    try {
      const bidKey = `BIDS_LOT_${lotId}`;
      const bidJson = await AsyncStorage.getItem(bidKey);
      if (!bidJson) return;

      let bids: Bid[] = JSON.parse(bidJson);
      bids = bids.map(b =>
        b.createdAt === bidCreatedAt ? { ...b, status } : b,
      );

      await AsyncStorage.setItem(bidKey, JSON.stringify(bids));

      if (phone) {
        await loadReceivedBids(phone);
      }
    } catch (e) {
      console.warn('Failed to update bid status', e);
    }
  };

  const handleAcceptBid = (lotId: string, createdAt: number) => {
    updateBidStatus(lotId, createdAt, 'accepted');
  };

  const handleRejectBid = (lotId: string, createdAt: number) => {
    updateBidStatus(lotId, createdAt, 'rejected');
  };

  const ListHeaderElement = useMemo(() => {
    return (
      <View>
        <TouchableOpacity
          onPress={goBack}
          style={[
            styles.backBtn,
            { backgroundColor: theme.background ?? '#edf2f7' },
          ]}
        >
          <Text
            style={[
              styles.backText,
              { color: theme.primary ?? '#2b6cb0' },
            ]}
          >
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
                {
                  color:
                    selectedTab === 'daily' ? '#fff' : theme.text,
                },
                selectedTab === 'daily' && styles.tabTextSelected,
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
                {
                  color:
                    selectedTab === 'short' ? '#fff' : theme.text,
                },
                selectedTab === 'short' && styles.tabTextSelected,
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
                {
                  color:
                    selectedTab === 'preregister'
                      ? '#fff'
                      : theme.text,
                },
                selectedTab === 'preregister' &&
                  styles.tabTextSelected,
              ]}
            >
              {t('pre_register_lot')}
            </Text>
          </TouchableOpacity>

          {/*  Received Bids tab */}
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'received'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('received')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === 'received' ? '#fff' : theme.text,
                },
                selectedTab === 'received' &&
                  styles.tabTextSelected,
              ]}
            >
              {t('received_bids') ?? 'Received Bids'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* === DAILY TAB === */}
        {selectedTab === 'daily' && (
          <>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.text,
                },
              ]}
            >
              <Text
                style={[styles.searchTitle, { color: theme.text }]}
              >
                {t('mandi') ?? 'Mandi'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={
                    isValidPickerValue(mandiName, mandiOptions)
                      ? mandiName
                      : ''
                  }
                  onValueChange={v => setMandiName(v)}
                >
                  <Picker.Item
                    label={t('select_mandi') ?? 'Select mandi'}
                    value=""
                  />
                  {mandiOptions.map(m => (
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
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <Text
                style={[styles.searchTitle, { color: theme.text }]}
              >
                {t('crop') ?? 'Crop'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={
                    isValidPickerValue(cropName, cropOptions)
                      ? cropName
                      : ''
                  }
                  onValueChange={v => setCropName(v)}
                >
                  <Picker.Item
                    label={t('select_crop') ?? 'Select crop'}
                    value=""
                  />
                  {cropOptions.map(c => (
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
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <TouchableOpacity
                style={[
                  styles.searchBtn,
                  { backgroundColor: theme.primary ?? '#2b6cb0' },
                ]}
                onPress={onSearchDaily}
              >
                <Text
                  style={[styles.searchBtnText, { color: '#fff' }]}
                >
                  {t('search')}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartBox,
                {
                  borderColor: theme.text,
                  backgroundColor: theme.background,
                },
              ]}
            >
              <Text
                style={[styles.chartTitle, { color: theme.text }]}
              >
                {t('daily_market_price_chart_title')}
              </Text>
              <View
                style={[
                  styles.chartPlaceholder,
                  { borderColor: theme.text },
                ]}
              >
                <GraphChart filters={appliedFilters} />
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
                {
                  backgroundColor: theme.background,
                  borderColor: theme.text ?? '#ddd',
                },
              ]}
            >
              <Text
                style={[styles.searchTitle, { color: theme.text }]}
              >
                {t('mandi') ?? 'Mandi'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={
                    isValidPickerValue(stfMandi, mandiOptions)
                      ? stfMandi
                      : ''
                  }
                  onValueChange={v => setStfMandi(v)}
                >
                  <Picker.Item
                    label={t('select_mandi') ?? 'Select mandi'}
                    value=""
                  />
                  {mandiOptions.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {stfMandi &&
                !isValidPickerValue(stfMandi, mandiOptions) && (
                  <TextInput
                    placeholder={
                      t('type_mandi') ?? 'Type mandi name'
                    }
                    placeholderTextColor={theme.text ?? '#999'}
                    value={stfMandi}
                    onChangeText={setStfMandi}
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <Text
                style={[styles.searchTitle, { color: theme.text }]}
              >
                {t('crop') ?? 'Crop'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={
                    isValidPickerValue(stfCrop, cropOptions)
                      ? stfCrop
                      : ''
                  }
                  onValueChange={v => setStfCrop(v)}
                >
                  <Picker.Item
                    label={t('select_crop') ?? 'Select crop'}
                    value=""
                  />
                  {cropOptions.map(c => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {stfCrop &&
                !isValidPickerValue(stfCrop, cropOptions) && (
                  <TextInput
                    placeholder={
                      t('type_crop') ?? 'Type crop name'
                    }
                    placeholderTextColor={theme.text ?? '#999'}
                    value={stfCrop}
                    onChangeText={setStfCrop}
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <Text
                style={[styles.searchTitle, { color: theme.text }]}
              >
                {t('forecast_horizon') ?? 'Duration (in days)'}
              </Text>
              <View style={styles.horizonRow}>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '7days'
                      ? styles.horizonBtnActive
                      : {},
                  ]}
                  onPress={() => setHorizon('7days')}
                >
                  <Text
                    style={
                      horizon === '7days'
                        ? styles.horizonTextActive
                        : styles.horizonText
                    }
                  >
                    7
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '14days'
                      ? styles.horizonBtnActive
                      : {},
                  ]}
                  onPress={() => setHorizon('14days')}
                >
                  <Text
                    style={
                      horizon === '14days'
                        ? styles.horizonTextActive
                        : styles.horizonText
                    }
                  >
                    14
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '30days'
                      ? styles.horizonBtnActive
                      : {},
                  ]}
                  onPress={() => setHorizon('30days')}
                >
                  <Text
                    style={
                      horizon === '30days'
                        ? styles.horizonTextActive
                        : styles.horizonText
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
                <Text
                  style={[styles.searchBtnText, { color: '#fff' }]}
                >
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
              <Text
                style={[styles.chartTitle, { color: theme.text }]}
              >
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
                <Text
                  style={{ color: theme.text, marginTop: 8 }}
                >
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
                {
                  borderColor: theme.text ?? '#ddd',
                  backgroundColor: theme.background,
                },
              ]}
            >
              <View style={styles.formHeaderRow}>
                <Text
                  style={[styles.title, { color: theme.text }]}
                >
                  {t('reg_crop_lot') ||
                    t('pre_register_title') ||
                    'Register Crop Lot'}
                </Text>
              </View>

              <Text
                style={[styles.formTitle, { color: theme.text }]}
              >
                {t('crop') ?? 'Crop'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={
                    isValidPickerValue(prCrop, cropOptions)
                      ? prCrop
                      : ''
                  }
                  onValueChange={v => setPrCrop(v)}
                >
                  <Picker.Item
                    label={t('select_crop') ?? 'Select crop'}
                    value=""
                  />
                  {cropOptions.map(c => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {prCrop &&
                !isValidPickerValue(prCrop, cropOptions) && (
                  <TextInput
                    placeholder={t('type_crop') ?? 'Type crop'}
                    placeholderTextColor={theme.text ?? '#999'}
                    value={prCrop}
                    onChangeText={setPrCrop}
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <Text
                style={[styles.formTitle, { color: theme.text }]}
              >
                {t('grade_label') ?? 'Grade'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={prGrade}
                  onValueChange={v => setPrGrade(v)}
                >
                  <Picker.Item
                    label={t('select_grade') ?? 'Select grade'}
                    value=""
                  />
                  {currentGrades.map(g => (
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
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.text,
                    },
                  ]}
                />
              )}

              <Text
                style={[styles.formTitle, { color: theme.text }]}
              >
                {t('quantity_label') ?? 'Quantity (quintal)'}
              </Text>
              <TextInput
                placeholder={
                  t('enter_quantity') ??
                  'Enter Quantity (quintal)'
                }
                placeholderTextColor={theme.text ?? '#999'}
                value={prQuantity}
                onChangeText={setPrQuantity}
                keyboardType="numeric"
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.text,
                  },
                ]}
              />

              <Text
                style={[styles.formTitle, { color: theme.text }]}
              >
                {t('expected_amount') ?? 'Expected Amount'}
              </Text>
              <TextInput
                placeholder={
                  t('enter_expected_amount') ??
                  'Enter Expected Amount'
                }
                placeholderTextColor={theme.text ?? '#999'}
                value={prQuantity}
                onChangeText={setPrSellingAmount}
               keyboardType="numeric"
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.text,
                  },
                ]}
              />

              <Text
                style={[styles.formTitle, { color: theme.text }]}
              >
                {t('mandi_label') ?? 'Mandi Location'}
              </Text>
              <View
                style={[
                  styles.pickerWrap,
                  { borderColor: theme.text },
                ]}
              >
                <Picker
                  selectedValue={
                    isValidPickerValue(prMandi, mandiOptions)
                      ? prMandi
                      : ''
                  }
                  onValueChange={v => setPrMandi(v)}
                >
                  <Picker.Item
                    label={t('select_mandi') ?? 'Select mandi'}
                    value=""
                  />
                  {mandiOptions.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {prMandi &&
                !isValidPickerValue(prMandi, mandiOptions) && (
                  <TextInput
                    placeholder={t('type_mandi') ?? 'Type mandi'}
                    placeholderTextColor={theme.text ?? '#999'}
                    value={prMandi}
                    onChangeText={setPrMandi}
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              {/* Expected Arrival Date */}
              <Text
                style={[styles.formTitle, { color: theme.text }]}
              >
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
                <Text
                  style={{
                    color: prExpectedArrival ? theme.text : '#999',
                  }}
                >
                  {prExpectedArrival ||
                    (t('enter_date') ?? 'dd-mm-yyyy')}
                </Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              {prExpectedArrival && (
                <TouchableOpacity
                  onPress={() => setPrExpectedArrival('')}
                  style={{ marginTop: 6 }}
                >
                  <Text
                    style={{
                      color: theme.primary ?? '#2b6cb0',
                      fontSize: 12,
                    }}
                  >
                    {t('clear') ?? 'Clear'}
                  </Text>
                </TouchableOpacity>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={dateValue}
                  mode="date"
                  display={
                    Platform.OS === 'android' ? 'spinner' : 'default'
                  }
                  onChange={onChangeDate}
                  maximumDate={new Date(2100, 11, 31)}
                  minimumDate={new Date(2000, 0, 1)}
                />
              )}

              <TouchableOpacity
                style={[
                  styles.addBtn,
                  { backgroundColor: theme.primary ?? '#2b6cb0' },
                ]}
                onPress={addLotInline}
              >
                <Text style={[styles.addBtnText, { color: '#fff' }]}>
                  {t('add_lot') ?? 'Add Lot'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[styles.sectionTitle, { color: theme.text }]}
            >
              {t('your_registered_lots') ?? 'Your Registered Lots'}
            </Text>
          </>
        )}

        {/*  RECEIVED BIDS TAB */}
        {selectedTab === 'received' && (
          <View
            style={[
              styles.formBox,
              {
                borderColor: theme.text ?? '#ddd',
                backgroundColor: theme.background,
              },
            ]}
          >
            <Text
              style={[styles.sectionTitle, { color: theme.text }]}
            >
              {t('received_bids') ?? 'Received Bids on Your Lots'}
            </Text>

            {loadingBids ? (
              <Text style={{ color: theme.text, marginTop: 10 }}>
                {t('loading') ?? 'Loading...'}
              </Text>
            ) : lotsWithBids.length === 0 ? (
              <View
                style={[
                  styles.emptyBox,
                  { borderColor: '#eee', marginTop: 8 },
                ]}
              >
                <Text style={{ color: theme.text ?? '#666' }}>
                  {t('no_bids_yet') ?? 'No bids received yet'}
                </Text>
              </View>
            ) : (
              lotsWithBids.map(lotWithBids => (
                <View
                  key={lotWithBids.id}
                  style={[
                    styles.lotItemReceived,
                    {
                      borderColor: theme.text ?? '#ccc',
                      backgroundColor: theme.background,
                    },
                  ]}
                >
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={[
                        styles.lotText,
                        {
                          color: theme.text,
                          fontWeight: '700',
                          marginBottom: 4,
                        },
                      ]}
                    >
                      {lotWithBids.crop} ({lotWithBids.grade})
                    </Text>
                    <Text
                      style={[styles.lotText, { color: theme.text }]}
                    >
                      {t('quantity_label') ?? 'Quantity'}:{' '}
                      {lotWithBids.quantity}
                    </Text>
                       <Text
                      style={[styles.lotText, { color: theme.text }]}
                    >
                      {t('expected_amount') ?? 'Expected Amount'}:{' '}
                      {lotWithBids.sellingamount}
                    </Text>
                    <Text
                      style={[styles.lotText, { color: theme.text }]}
                    >
                      {t('mandi_label') ?? 'Mandi'}:{' '}
                      {lotWithBids.mandi}
                    </Text>
                    <Text
                      style={[styles.lotText, { color: theme.text }]}
                    >
                      {t('arrival_label') ?? 'Arrival'}:{' '}
                      {lotWithBids.expectedArrival}
                    </Text>
                  </View>

                  <View style={{ marginTop: 8 }}>
                    <Text
                      style={[
                        styles.formTitle,
                        { color: theme.text, fontSize: 14 },
                      ]}
                    >
                      {t('received_bids') ?? 'Bids'} (
                      {lotWithBids.bids.length})
                    </Text>

                    {lotWithBids.bids.map(bid => (
                      <View
                        key={bid.createdAt}
                        style={{
                          marginTop: 8,
                          padding: 8,
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: theme.text ?? '#ccc',
                        }}
                      >
                        <Text style={{ color: theme.text }}>
                          {t('bidder') ?? 'Bidder'}: {bid.bidder}
                        </Text>
                        <Text style={{ color: theme.text }}>
                          {t('bid_value') ?? 'Bid'}: ₹{bid.bidValue}
                          /quintal
                        </Text>
                        <Text style={{ color: theme.text }}>
                          {t('date') ?? 'Date'}:{' '}
                          {new Date(
                            bid.createdAt,
                          ).toLocaleString()}
                        </Text>

                        {bid.status && (
                          <Text
                            style={{
                              marginTop: 4,
                              color:
                                bid.status === 'accepted'
                                  ? '#15803d'
                                  : bid.status === 'rejected'
                                  ? '#b91c1c'
                                  : '#92400e',
                              fontWeight: '700',
                              fontSize: 12,
                            }}
                          >
                            {bid.status.toUpperCase()}
                          </Text>
                        )}

                        {(!bid.status ||
                          bid.status === 'pending') && (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 8,
                            }}
                          >
                            <TouchableOpacity
                              style={[
                                styles.addBtn,
                                {
                                  flex: 1,
                                  marginRight: 4,
                                  backgroundColor: '#16a34a',
                                },
                              ]}
                              onPress={() =>
                                handleAcceptBid(
                                  lotWithBids.id,
                                  bid.createdAt,
                                )
                              }
                            >
                              <Text
                                style={[
                                  styles.addBtnText,
                                  { color: '#fff' },
                                ]}
                              >
                                {t('accept') ?? 'Accept'}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.addBtn,
                                {
                                  flex: 1,
                                  marginLeft: 4,
                                  backgroundColor: '#b91c1c',
                                },
                              ]}
                              onPress={() =>
                                handleRejectBid(
                                  lotWithBids.id,
                                  bid.createdAt,
                                )
                              }
                            >
                              <Text
                                style={[
                                  styles.addBtnText,
                                  { color: '#fff' },
                                ]}
                              >
                                {t('reject') ?? 'Reject'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
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
    showDatePicker,
    dateValue,
    lotsWithBids,
    loadingBids,
    cropOptions,
    mandiOptions,
    currentGrades,
  ]);

  const renderLotItem = ({ item }: { item: Lot }) => (
    <View
      style={[
        styles.lotItem,
        {
          borderColor: theme.text ?? '#ccc',
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>
          {item.crop}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>
            {t('grade_label')}:{" "}
          </Text>
          {item.grade}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>
            {t('quantity_label')}:{" "}
          </Text>
          {item.quantity}
        </Text>
           <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>
            {t('expected_amount')}:{" "}
          </Text>
          {item.sellingamount}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>
            {t('mandi_label')}:{" "}
          </Text>
          {item.mandi}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>
            {t('arrival_label')}:{" "}
          </Text>
          {item.expectedArrival}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeLot(item.id)}
      >
        <Text style={styles.removeBtnText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => {
    if (selectedTab !== 'preregister') return null;
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>
          {t('no_lots') ?? 'No lots registered yet'}
        </Text>
      </View>
    );
  };

  const listData = selectedTab === 'preregister' ? lots : [];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
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

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tab: {
    flex: 0.24,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: { fontWeight: '600', color: '#333' },
  tabTextSelected: { color: '#fff' },

  searchBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  searchTitle: {
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  searchBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  searchBtnText: { fontWeight: '700' },

  chartBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
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

  formBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  addBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addBtnText: { fontWeight: '700', color: '#fff' },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },

  lotItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },

  lotItemReceived: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  lotText: { marginBottom: 6 },
  removeBtn: {
    backgroundColor: '#e53e3e',
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  removeBtnText: { color: '#fff', fontWeight: '700' },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },

  dateInput: {
    paddingVertical: 14,
  },
  calendarIcon: {
    fontSize: 22,
    marginLeft: 8,
  },
});

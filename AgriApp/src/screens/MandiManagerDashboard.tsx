// // // // import React from 'react';
// // // // import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { RootStackParamList } from '../../App';

// // // // import { useTheme } from '../context/ThemeContext';
// // // // import { useLanguage } from '../context/LanguageContext';

// // // // export default function MandiManagerDashboard() {
// // // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // // //   const { theme } = useTheme();
// // // //   const { t } = useLanguage();

// // // //   const goBack = () => navigation.navigate('Dashboard');

// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // // //       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // // //         <Text style={[styles.backText, { color: '#2b6cb0' }]}>{t('back')}</Text>
// // // //       </TouchableOpacity>

// // // //       <Text style={[styles.title, { color: theme.text }]}>{t('mandi_manager_dashboard') ?? 'Mandi Manager'}</Text>
// // // //       <Text style={[styles.text, { color: theme.text }]}>{t('mandi_manager_msg') ?? 'Welcome, you are logged in as a Mandi Manager.'}</Text>
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, padding: 20 },
// // // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// // // //   text: { fontSize: 16 },
// // // //   backText: { fontWeight: '700', fontSize: 16 },
// // // //   backBtn: {
// // // //     alignSelf: 'flex-start',
// // // //     backgroundColor: '#edf2f7',
// // // //     paddingVertical: 6,
// // // //     paddingHorizontal: 12,
// // // //     borderRadius: 6,
// // // //     marginBottom: 10,
// // // //   },
// // // // });

// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   View,
// // //   ActivityIndicator,
// // //   Alert,
// // //   ScrollView,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { Picker } from '@react-native-picker/picker';
// // // import DateTimePicker, {
// // //   DateTimePickerEvent,
// // // } from '@react-native-community/datetimepicker';

// // // import { RootStackParamList } from '../../App';
// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import api from '../services/api';

// // // type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// // // type CropItem = {
// // //   cropId?: number;
// // //   CropId?: number;
// // //   id?: number;
// // //   cropName?: string;
// // //   CropName?: string;
// // //   name?: string;
// // // };

// // // type OfficerItem = {
// // //   officialId?: string;
// // //   OfficialId?: string;
// // //   id?: string;
// // //   officialName?: string;
// // //   OfficialName?: string;
// // // };

// // // type AuctionItem = {
// // //   auctionId?: string;
// // //   AuctionId?: string;
// // //   mandiId?: number;
// // //   MandiId?: number;
// // //   mandiName?: string;
// // //   MandiName?: string;
// // //   cropId?: number;
// // //   CropId?: number;
// // //   cropName?: string;
// // //   CropName?: string;
// // //   assignedOfficerName?: string;
// // //   AssignedOfficerName?: string;
// // //   status?: string;
// // //   Status?: string;
// // //   scheduledAt?: string;
// // //   ScheduledAt?: string;
// // //   createdAt?: string;
// // //   CreatedAt?: string;
// // // };

// // // export default function MandiManagerDashboard() {
// // //   const navigation = useNavigation<PropsNav>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const goBack = () => navigation.navigate('Dashboard');

// // //   // Profile data (manager = mandi official with MANAGER role)
// // //   const [loadingProfile, setLoadingProfile] = useState(true);
// // //   const [managerName, setManagerName] = useState<string>('');
// // //   const [mandiId, setMandiId] = useState<number | null>(null);
// // //   const [mandiName, setMandiName] = useState<string>('');

// // //   // Meta dropdowns
// // //   const [crops, setCrops] = useState<CropItem[]>([]);
// // //   const [officers, setOfficers] = useState<OfficerItem[]>([]);
// // //   const [loadingMeta, setLoadingMeta] = useState(false);

// // //   // Create auction form
// // //   const [showCreateForm, setShowCreateForm] = useState(false);
// // //   const [creating, setCreating] = useState(false);

// // //   const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
// // //   const [selectedOfficerId, setSelectedOfficerId] = useState<string>('');
// // //   const [scheduledAt, setScheduledAt] = useState<Date>(new Date());
// // //   const [showDatePicker, setShowDatePicker] = useState(false);

// // //   // Auction list
// // //   const [showAuctionList, setShowAuctionList] = useState(false);
// // //   const [auctions, setAuctions] = useState<AuctionItem[]>([]);
// // //   const [loadingAuctions, setLoadingAuctions] = useState(false);

// // //   // ---------------------------------------------------
// // //   // 1) Load manager profile → mandiId + managerName
// // //   // ---------------------------------------------------
// // //   useEffect(() => {
// // //     const loadProfile = async () => {
// // //       try {
// // //         const res = await api.get('/mandi-official/profile');
// // //         const data = res?.data ?? null;
// // //         if (!data) {
// // //           throw new Error('Profile not found');
// // //         }

// // //         const name = data.officialName ?? data.OfficialName ?? '';
// // //         const mId = data.mandiId ?? data.MandiId ?? null;
// // //         const mName = data.mandiName ?? data.MandiName ?? '';

// // //         if (!mId) {
// // //           Alert.alert(
// // //             t('error_title') ?? 'Error',
// // //             t('mandi_not_found_profile') ??
// // //               'No mandi is linked to this manager profile.',
// // //           );
// // //         }

// // //         setManagerName(String(name));
// // //         setMandiId(mId ? Number(mId) : null);
// // //         setMandiName(String(mName));
// // //       } catch (err: any) {
// // //         console.log('Manager profile load error', err?.response?.data ?? err);
// // //         Alert.alert(
// // //           t('error_title') ?? 'Error',
// // //           t('profile_fetch_failed') ?? 'Failed to load manager profile.',
// // //         );
// // //       } finally {
// // //         setLoadingProfile(false);
// // //       }
// // //     };

// // //     loadProfile();
// // //   }, [t]);

// // //   // ---------------------------------------------------
// // //   // 2) Load crops + officers for this mandi
// // //   // ---------------------------------------------------
// // //   const loadMeta = async (mId: number) => {
// // //     setLoadingMeta(true);
// // //     try {
// // //       const [cropsRes, officersRes] = await Promise.all([
// // //         api.get('/crops'),
// // //         // 🔴 IMPORTANT: adjust this endpoint if your API is different
// // //         // Expecting something like: GET /mandi-official/officers?mandiId=...
// // //         api.get('/mandi-official/officers', { params: { mandiId: mId } }),
// // //       ]);

// // //       const cropData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
// // //       const officerData = Array.isArray(officersRes.data)
// // //         ? officersRes.data
// // //         : [];

// // //       setCrops(cropData);
// // //       setOfficers(officerData);
// // //     } catch (err: any) {
// // //       console.log('Manager meta load error', err?.response?.data ?? err);
// // //       Alert.alert(
// // //         t('error_title') ?? 'Error',
// // //         t('fetch_meta_failed') ?? 'Failed to load dropdown data.',
// // //       );
// // //     } finally {
// // //       setLoadingMeta(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (mandiId) {
// // //       loadMeta(mandiId);
// // //     }
// // //   }, [mandiId]);

// // //   // ---------------------------------------------------
// // //   // 3) Date picker handler
// // //   // ---------------------------------------------------
// // //   const onChangeDate = (_event: DateTimePickerEvent, selected?: Date) => {
// // //     if (selected) {
// // //       setScheduledAt(selected);
// // //     }
// // //     setShowDatePicker(false);
// // //   };

// // //   const formatDateTime = (d: Date) => {
// // //     const dd = String(d.getDate()).padStart(2, '0');
// // //     const mm = String(d.getMonth() + 1).padStart(2, '0');
// // //     const yyyy = d.getFullYear();

// // //     const hh = String(d.getHours()).padStart(2, '0');
// // //     const min = String(d.getMinutes()).padStart(2, '0');

// // //     return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
// // //   };

// // //   // ---------------------------------------------------
// // //   // 4) Create auction
// // //   // ---------------------------------------------------
// // //   const handleCreateAuction = async () => {
// // //     if (!mandiId) {
// // //       return Alert.alert(
// // //         t('error_title') ?? 'Error',
// // //         t('mandi_not_found_profile') ??
// // //           'No mandi is linked to this manager profile.',
// // //       );
// // //     }
// // //     if (!selectedCropId) {
// // //       return Alert.alert(
// // //         t('error_title') ?? 'Error',
// // //         t('fill_crop') ?? 'Please select crop',
// // //       );
// // //     }
// // //     if (!selectedOfficerId) {
// // //       return Alert.alert(
// // //         t('error_title') ?? 'Error',
// // //         t('select_officer_required') ?? 'Please select an officer',
// // //       );
// // //     }

// // //     const dto = {
// // //       MandiId: mandiId,
// // //       CropId: selectedCropId,
// // //       AssignedOfficerId: selectedOfficerId,
// // //       ScheduledAt: scheduledAt.toISOString(),
// // //       // CreatedByOfficialId is auto set on backend from JWT (User.GetOfficialId())
// // //     };

// // //     setCreating(true);
// // //     try {
// // //       const res = await api.post(
// // //         '/mandiOfficialAuction/mandi/auction/create',
// // //         dto,
// // //       );
// // //       if (!res.status.toString().startsWith('2')) {
// // //         throw new Error(res.data?.message || 'Failed to create auction');
// // //       }

// // //       Alert.alert(
// // //         t('success_title') ?? 'Success',
// // //         t('auction_created_success') ?? 'Auction created successfully',
// // //       );

// // //       // reset minimal
// // //       setSelectedCropId(null);
// // //       setSelectedOfficerId('');
// // //       setScheduledAt(new Date());

// // //       // refresh list if visible
// // //       if (showAuctionList) {
// // //         loadAuctions();
// // //       }
// // //     } catch (err: any) {
// // //       console.log('Create auction error', err?.response?.data ?? err);
// // //       const msg =
// // //         err?.response?.data?.message ??
// // //         t('auction_create_failed') ??
// // //         'Failed to create auction';
// // //       Alert.alert(t('error_title') ?? 'Error', msg);
// // //     } finally {
// // //       setCreating(false);
// // //     }
// // //   };

// // //   // ---------------------------------------------------
// // //   // 5) Load auctions for this mandi
// // //   // ---------------------------------------------------
// // //   const loadAuctions = async () => {
// // //     if (!mandiId) return;
// // //     setLoadingAuctions(true);
// // //     try {
// // //       const res = await api.get(
// // //         '/mandiOfficialAuction/mandi/auction/all',
// // //         {
// // //           params: { mandiId },
// // //         },
// // //       );

// // //       let payload = res?.data ?? [];
// // //       if (!Array.isArray(payload)) {
// // //         if (Array.isArray(payload.items)) payload = payload.items;
// // //         else if (Array.isArray(payload.data)) payload = payload.data;
// // //         else payload = [payload];
// // //       }

// // //       setAuctions(payload);
// // //     } catch (err: any) {
// // //       console.log('Load auctions error', err?.response?.data ?? err);
// // //       Alert.alert(
// // //         t('error_title') ?? 'Error',
// // //         t('fetch_auctions_failed') ?? 'Failed to fetch auction schedule',
// // //       );
// // //     } finally {
// // //       setLoadingAuctions(false);
// // //     }
// // //   };

// // //   const toggleShowAuctions = () => {
// // //     const newVal = !showAuctionList;
// // //     setShowAuctionList(newVal);
// // //     if (newVal) {
// // //       loadAuctions();
// // //     }
// // //   };

// // //   // ---------------------------------------------------
// // //   // RENDER
// // //   // ---------------------------------------------------
// // //   if (loadingProfile) {
// // //     return (
// // //       <SafeAreaView
// // //         style={[
// // //           styles.container,
// // //           {
// // //             backgroundColor: theme.background,
// // //             justifyContent: 'center',
// // //             alignItems: 'center',
// // //           },
// // //         ]}
// // //       >
// // //         <ActivityIndicator />
// // //         <Text style={{ marginTop: 8, color: theme.text }}>
// // //           {t('loading') ?? 'Loading...'}
// // //         </Text>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   return (
// // //     <SafeAreaView
// // //       style={[styles.container, { backgroundColor: theme.background }]}
// // //     >
// // //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// // //         {/* Back button */}
// // //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //           <Text style={[styles.backText, { color: '#2b6cb0' }]}>
// // //             {t('back')}
// // //           </Text>
// // //         </TouchableOpacity>

// // //         {/* Header */}
// // //         <Text style={[styles.title, { color: theme.text }]}>
// // //           {t('mandi_manager_dashboard') ?? 'Mandi Manager Dashboard'}
// // //         </Text>
// // //         <Text style={[styles.text, { color: theme.text }]}>
// // //           {t('mandi_manager_msg') ??
// // //             'Manage auction schedules for your mandi.'}
// // //         </Text>

// // //         {/* Manager + Mandi info */}
// // //         <View style={{ marginTop: 8, marginBottom: 16 }}>
// // //           {managerName ? (
// // //             <Text style={{ color: theme.text, fontWeight: '700' }}>
// // //               {t('manager_name_label') ?? 'Manager'}: {managerName}
// // //             </Text>
// // //           ) : null}
// // //           {mandiName || mandiId ? (
// // //             <Text style={{ color: theme.text, marginTop: 4 }}>
// // //               {t('mandi_label') ?? 'Mandi'}:{' '}
// // //               {mandiName || `#${mandiId}`}
// // //             </Text>
// // //           ) : null}
// // //         </View>

// // //         {/* Buttons row */}
// // //         <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.primaryButton,
// // //               showCreateForm && { opacity: 0.8 },
// // //             ]}
// // //             onPress={() => setShowCreateForm(prev => !prev)}
// // //           >
// // //             <Text style={styles.primaryButtonText}>
// // //               {t('schedule_auction_btn') ?? 'Schedule / Create Auction'}
// // //             </Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={[
// // //               styles.secondaryButton,
// // //               showAuctionList && { opacity: 0.8 },
// // //             ]}
// // //             onPress={toggleShowAuctions}
// // //           >
// // //             <Text style={styles.secondaryButtonText}>
// // //               {t('view_auction_schedule_btn') ?? 'View Auction Schedule'}
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* CREATE AUCTION FORM */}
// // //         {showCreateForm && (
// // //           <View
// // //             style={[
// // //               styles.card,
// // //               { borderColor: theme.text, backgroundColor: theme.background },
// // //             ]}
// // //           >
// // //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// // //               {t('create_auction_title') ?? 'Create Auction'}
// // //             </Text>

// // //             {loadingMeta ? (
// // //               <ActivityIndicator style={{ marginTop: 10 }} />
// // //             ) : (
// // //               <>
// // //                 {/* Crop */}
// // //                 <Text style={[styles.label, { color: theme.text }]}>
// // //                   {t('crop') ?? 'Crop'}
// // //                 </Text>
// // //                 <View
// // //                   style={[
// // //                     styles.pickerWrap,
// // //                     { borderColor: theme.text },
// // //                   ]}
// // //                 >
// // //                   <Picker
// // //                     selectedValue={selectedCropId ?? ''}
// // //                     onValueChange={v =>
// // //                       setSelectedCropId(v ? Number(v) : null)
// // //                     }
// // //                   >
// // //                     <Picker.Item
// // //                       label={t('select_crop') ?? 'Select crop'}
// // //                       value=""
// // //                     />
// // //                     {crops.map((c: any) => {
// // //                       const id =
// // //                         c.cropId ?? c.CropId ?? c.id;
// // //                       const name =
// // //                         c.cropName ?? c.CropName ?? c.name ?? '';
// // //                       if (!id || !name) return null;
// // //                       return (
// // //                         <Picker.Item
// // //                           key={String(id)}
// // //                           label={String(name)}
// // //                           value={Number(id)}
// // //                         />
// // //                       );
// // //                     })}
// // //                   </Picker>
// // //                 </View>

// // //                 {/* Assigned Officer */}
// // //                 <Text style={[styles.label, { color: theme.text }]}>
// // //                   {t('assigned_officer_label') ?? 'Assigned Officer'}
// // //                 </Text>
// // //                 <View
// // //                   style={[
// // //                     styles.pickerWrap,
// // //                     { borderColor: theme.text },
// // //                   ]}
// // //                 >
// // //                   <Picker
// // //                     selectedValue={selectedOfficerId}
// // //                     onValueChange={v =>
// // //                       setSelectedOfficerId(String(v))
// // //                     }
// // //                   >
// // //                     <Picker.Item
// // //                       label={
// // //                         t('select_officer') ?? 'Select officer'
// // //                       }
// // //                       value=""
// // //                     />
// // //                     {officers.map((o: any) => {
// // //                       const oid =
// // //                         o.officialId ??
// // //                         o.OfficialId ??
// // //                         o.id;
// // //                       const oname =
// // //                         o.officialName ??
// // //                         o.OfficialName ??
// // //                         '';
// // //                       if (!oid || !oname) return null;
// // //                       return (
// // //                         <Picker.Item
// // //                           key={String(oid)}
// // //                           label={String(oname)}
// // //                           value={String(oid)}
// // //                         />
// // //                       );
// // //                     })}
// // //                   </Picker>
// // //                 </View>

// // //                 {/* Created By (readonly manager name) */}
// // //                 <Text style={[styles.label, { color: theme.text }]}>
// // //                   {t('created_by_label') ?? 'Created By'}
// // //                 </Text>
// // //                 <View style={styles.readonlyBox}>
// // //                   <Text style={{ color: theme.text }}>
// // //                     {managerName || '-'}
// // //                   </Text>
// // //                 </View>

// // //                 {/* Mandi (readonly) */}
// // //                 <Text style={[styles.label, { color: theme.text }]}>
// // //                   {t('mandi_label') ?? 'Mandi'}
// // //                 </Text>
// // //                 <View style={styles.readonlyBox}>
// // //                   <Text style={{ color: theme.text }}>
// // //                     {mandiName || (mandiId ? `#${mandiId}` : '-')}
// // //                   </Text>
// // //                 </View>

// // //                 {/* Scheduled At */}
// // //                 <Text style={[styles.label, { color: theme.text }]}>
// // //                   {t('scheduled_at_label') ?? 'Scheduled At'}
// // //                 </Text>
// // //                 <TouchableOpacity
// // //                   onPress={() => setShowDatePicker(true)}
// // //                   style={[
// // //                     styles.dateBtn,
// // //                     { borderColor: theme.text },
// // //                   ]}
// // //                 >
// // //                   <Text style={{ color: theme.text }}>
// // //                     {formatDateTime(scheduledAt)}
// // //                   </Text>
// // //                   <Text style={styles.calendarIcon}>📅</Text>
// // //                 </TouchableOpacity>

// // //                 {showDatePicker && (
// // //                   <DateTimePicker
// // //                     mode="datetime"
// // //                     value={scheduledAt}
// // //                     onChange={onChangeDate}
// // //                   />
// // //                 )}

// // //                 {/* Create button */}
// // //                 <TouchableOpacity
// // //                   style={[
// // //                     styles.submitBtn,
// // //                     creating && { opacity: 0.7 },
// // //                   ]}
// // //                   onPress={handleCreateAuction}
// // //                   disabled={creating}
// // //                 >
// // //                   {creating ? (
// // //                     <ActivityIndicator color="#fff" />
// // //                   ) : (
// // //                     <Text style={styles.submitBtnText}>
// // //                       {t('create_auction_btn') ?? 'Create Auction'}
// // //                     </Text>
// // //                   )}
// // //                 </TouchableOpacity>
// // //               </>
// // //             )}
// // //           </View>
// // //         )}

// // //         {/* AUCTION LIST */}
// // //         {showAuctionList && (
// // //           <View
// // //             style={[
// // //               styles.card,
// // //               { borderColor: theme.text, backgroundColor: theme.background },
// // //             ]}
// // //           >
// // //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// // //               {t('auction_schedule_title') ?? 'Auction Schedule'}
// // //             </Text>

// // //             {loadingAuctions ? (
// // //               <ActivityIndicator style={{ marginTop: 10 }} />
// // //             ) : auctions.length === 0 ? (
// // //               <View style={{ marginTop: 10 }}>
// // //                 <Text style={{ color: theme.text }}>
// // //                   {t('no_auctions') ?? 'No auctions scheduled yet'}
// // //                 </Text>
// // //               </View>
// // //             ) : (
// // //               auctions.map((a: AuctionItem) => {
// // //                 const id = String(
// // //                   a.auctionId ?? a.AuctionId ?? '',
// // //                 );
// // //                 const cropName =
// // //                   a.cropName ?? a.CropName ?? '-';
// // //                 const officerName =
// // //                   a.assignedOfficerName ??
// // //                   a.AssignedOfficerName ??
// // //                   '-';
// // //                 const status =
// // //                   a.status ?? a.Status ?? '-';
// // //                 const schedRaw =
// // //                   a.scheduledAt ?? a.ScheduledAt ?? '';
// // //                 const sched = schedRaw
// // //                   ? new Date(schedRaw).toLocaleString()
// // //                   : '-';

// // //                 return (
// // //                   <View
// // //                     key={id}
// // //                     style={[
// // //                       styles.auctionItem,
// // //                       { borderColor: theme.text },
// // //                     ]}
// // //                   >
// // //                     <Text
// // //                       style={[
// // //                         styles.auctionTitle,
// // //                         { color: theme.text },
// // //                       ]}
// // //                     >
// // //                       {cropName}
// // //                     </Text>
// // //                     <Text style={{ color: theme.text }}>
// // //                       {t('assigned_officer_label') ??
// // //                         'Assigned Officer'}
// // //                       : {officerName}
// // //                     </Text>
// // //                     <Text style={{ color: theme.text }}>
// // //                       {t('scheduled_at_label') ?? 'Scheduled At'}:{' '}
// // //                       {sched}
// // //                     </Text>
// // //                     <Text
// // //                       style={{
// // //                         color:
// // //                           status === 'scheduled'
// // //                             ? '#2563eb'
// // //                             : status === 'started'
// // //                             ? '#16a34a'
// // //                             : status === 'ended'
// // //                             ? '#6b7280'
// // //                             : theme.text,
// // //                         marginTop: 4,
// // //                         fontWeight: '700',
// // //                       }}
// // //                     >
// // //                       {t('status') ?? 'Status'}: {status}
// // //                     </Text>
// // //                   </View>
// // //                 );
// // //               })
// // //             )}
// // //           </View>
// // //         )}
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
// // //   text: { fontSize: 16 },
// // //   backText: { fontWeight: '700', fontSize: 16 },
// // //   backBtn: {
// // //     alignSelf: 'flex-start',
// // //     backgroundColor: '#edf2f7',
// // //     paddingVertical: 6,
// // //     paddingHorizontal: 12,
// // //     borderRadius: 6,
// // //     marginBottom: 10,
// // //   },

// // //   primaryButton: {
// // //     flex: 1,
// // //     backgroundColor: '#10b981',
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 16,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //   },
// // //   primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

// // //   secondaryButton: {
// // //     flex: 1,
// // //     backgroundColor: '#1d4ed8',
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 16,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //   },
// // //   secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

// // //   card: {
// // //     borderWidth: 1,
// // //     borderRadius: 10,
// // //     padding: 12,
// // //     marginBottom: 16,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 18,
// // //     fontWeight: '700',
// // //     marginBottom: 8,
// // //   },
// // //   label: {
// // //     fontSize: 14,
// // //     fontWeight: '700',
// // //     marginTop: 10,
// // //     marginBottom: 4,
// // //   },
// // //   pickerWrap: {
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     overflow: 'hidden',
// // //   },
// // //   readonlyBox: {
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     padding: 10,
// // //     marginTop: 4,
// // //     borderColor: '#d1d5db',
// // //   },
// // //   dateBtn: {
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     padding: 10,
// // //     marginTop: 4,
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //   },
// // //   calendarIcon: {
// // //     fontSize: 20,
// // //     marginLeft: 6,
// // //   },
// // //   submitBtn: {
// // //     backgroundColor: '#10b981',
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 16,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //     marginTop: 16,
// // //   },
// // //   submitBtnText: { color: '#fff', fontWeight: '700' },

// // //   auctionItem: {
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     padding: 10,
// // //     marginTop: 10,
// // //   },
// // //   auctionTitle: {
// // //     fontSize: 16,
// // //     fontWeight: '700',
// // //     marginBottom: 4,
// // //   },
// // // });

// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   View,
// //   ActivityIndicator,
// //   Alert,
// //   ScrollView,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { Picker } from '@react-native-picker/picker';
// // import DateTimePicker, {
// //   DateTimePickerEvent,
// // } from '@react-native-community/datetimepicker';

// // import { RootStackParamList } from '../../App';
// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import api from '../services/api';

// // type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// // type CropItem = {
// //   cropId?: number;
// //   CropId?: number;
// //   id?: number;
// //   cropName?: string;
// //   CropName?: string;
// //   name?: string;
// // };

// // type OfficerItem = {
// //   officialId?: string;
// //   OfficialId?: string;
// //   id?: string;
// //   officialName?: string;
// //   OfficialName?: string;
// // };

// // type AuctionItem = {
// //   auctionId?: string;
// //   AuctionId?: string;
// //   mandiId?: number;
// //   MandiId?: number;
// //   mandiName?: string;
// //   MandiName?: string;
// //   cropId?: number;
// //   CropId?: number;
// //   cropName?: string;
// //   CropName?: string;
// //   assignedOfficerName?: string;
// //   AssignedOfficerName?: string;
// //   status?: string;
// //   Status?: string;
// //   scheduledAt?: string;
// //   ScheduledAt?: string;
// //   createdAt?: string;
// //   CreatedAt?: string;
// // };

// // export default function MandiManagerDashboard() {
// //   const navigation = useNavigation<PropsNav>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const goBack = () => navigation.navigate('Dashboard');

// //   // Profile data (manager = mandi official with MANAGER role)
// //   const [loadingProfile, setLoadingProfile] = useState(true);
// //   const [managerName, setManagerName] = useState<string>('');
// //   const [managerOfficialId, setManagerOfficialId] = useState<string>('');
// //   const [mandiId, setMandiId] = useState<number | null>(null);
// //   const [mandiName, setMandiName] = useState<string>('');

// //   // Meta dropdowns
// //   const [crops, setCrops] = useState<CropItem[]>([]);
// //   const [officers, setOfficers] = useState<OfficerItem[]>([]);
// //   const [loadingMeta, setLoadingMeta] = useState(false);

// //   // Create auction form
// //   const [showCreateForm, setShowCreateForm] = useState(false);
// //   const [creating, setCreating] = useState(false);

// //   const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
// //   const [selectedOfficerId, setSelectedOfficerId] = useState<string>('');
// //   const [scheduledAt, setScheduledAt] = useState<Date>(new Date());
// //   const [showDatePicker, setShowDatePicker] = useState(false);

// //   // Auction list
// //   const [showAuctionList, setShowAuctionList] = useState(false);
// //   const [auctions, setAuctions] = useState<AuctionItem[]>([]);
// //   const [loadingAuctions, setLoadingAuctions] = useState(false);

// //   // ---------------------------------------------------
// //   // 1) Load manager profile → mandiId + managerName + officialId
// //   // ---------------------------------------------------
// //   useEffect(() => {
// //     const loadProfile = async () => {
// //       try {
// //         const res = await api.get('/mandi-official/profile');
// //         const data = res?.data ?? null;
// //         if (!data) {
// //           throw new Error('Profile not found');
// //         }

// //         const name = data.officialName ?? data.OfficialName ?? '';
// //         const mId = data.mandiId ?? data.MandiId ?? null;
// //         const mName = data.mandiName ?? data.MandiName ?? '';
// //         const offId = data.officialId ?? data.OfficialId ?? '';

// //         if (!mId) {
// //           Alert.alert(
// //             t('error_title') ?? 'Error',
// //             t('mandi_not_found_profile') ??
// //               'No mandi is linked to this manager profile.',
// //           );
// //         }

// //         setManagerName(String(name));
// //         setManagerOfficialId(offId ? String(offId) : '');
// //         setMandiId(mId ? Number(mId) : null);
// //         setMandiName(String(mName));
// //       } catch (err: any) {
// //         console.log('Manager profile load error', err?.response?.data ?? err);
// //         Alert.alert(
// //           t('error_title') ?? 'Error',
// //           t('profile_fetch_failed') ?? 'Failed to load manager profile.',
// //         );
// //       } finally {
// //         setLoadingProfile(false);
// //       }
// //     };

// //     loadProfile();
// //   }, [t]);

// //   // ---------------------------------------------------
// //   // 2) Load crops + officers for this mandi
// //   //    officers API failure is now NON-FATAL
// //   // ---------------------------------------------------
// //   const loadMeta = async (mId: number) => {
// //     setLoadingMeta(true);
// //     try {
// //       // 2.1 CROPS (required)
// //       const cropsRes = await api.get('/crops');
// //       const cropData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
// //       setCrops(cropData);

// //       // 2.2 OFFICERS (best-effort)
// //       try {
// //         // 🔴 Adjust this if your actual endpoint is different
// //         const officersRes = await api.get('/mandi-official/officers', {
// //           params: { mandiId: mId },
// //         });
// //         const officerData = Array.isArray(officersRes.data)
// //           ? officersRes.data
// //           : [];

// //         if (officerData.length > 0) {
// //           setOfficers(officerData);
// //         } else if (managerOfficialId && managerName) {
// //           // fallback: use manager as only officer
// //           setOfficers([
// //             { officialId: managerOfficialId, officialName: managerName },
// //           ]);
// //         } else {
// //           setOfficers([]);
// //         }
// //       } catch (err) {
// //         console.log('Officer list load error (non-fatal):', err);
// //         // Fallback: use manager as the only officer if possible
// //         if (managerOfficialId && managerName) {
// //           setOfficers([
// //             { officialId: managerOfficialId, officialName: managerName },
// //           ]);
// //         } else {
// //           setOfficers([]);
// //         }
// //       }
// //     } catch (err: any) {
// //       console.log('Manager meta load error', err?.response?.data ?? err);
// //       Alert.alert(
// //         t('error_title') ?? 'Error',
// //         t('fetch_meta_failed') ?? 'Failed to load dropdown data.',
// //       );
// //     } finally {
// //       setLoadingMeta(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (mandiId) {
// //       loadMeta(mandiId);
// //     }
// //     // also rerun once we know managerOfficialId/managerName,
// //     // so fallback officer is set correctly if API fails
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [mandiId, managerOfficialId, managerName]);

// //   // ---------------------------------------------------
// //   // 3) Date picker handler
// //   // ---------------------------------------------------
// //   const onChangeDate = (_event: DateTimePickerEvent, selected?: Date) => {
// //     if (selected) {
// //       setScheduledAt(selected);
// //     }
// //     setShowDatePicker(false);
// //   };

// //   const formatDateTime = (d: Date) => {
// //     const dd = String(d.getDate()).padStart(2, '0');
// //     const mm = String(d.getMonth() + 1).padStart(2, '0');
// //     const yyyy = d.getFullYear();

// //     const hh = String(d.getHours()).padStart(2, '0');
// //     const min = String(d.getMinutes()).padStart(2, '0');

// //     return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
// //   };

// //   // ---------------------------------------------------
// //   // 4) Create auction
// //   // ---------------------------------------------------
// //   const handleCreateAuction = async () => {
// //     if (!mandiId) {
// //       return Alert.alert(
// //         t('error_title') ?? 'Error',
// //         t('mandi_not_found_profile') ??
// //           'No mandi is linked to this manager profile.',
// //       );
// //     }
// //     if (!selectedCropId) {
// //       return Alert.alert(
// //         t('error_title') ?? 'Error',
// //         t('fill_crop') ?? 'Please select crop',
// //       );
// //     }
// //     if (!selectedOfficerId) {
// //       return Alert.alert(
// //         t('error_title') ?? 'Error',
// //         t('select_officer_required') ?? 'Please select an officer',
// //       );
// //     }

// //     const dto = {
// //       MandiId: mandiId,
// //       CropId: selectedCropId,
// //       AssignedOfficerId: selectedOfficerId,
// //       ScheduledAt: scheduledAt.toISOString(),
// //       // CreatedByOfficialId is auto set on backend from JWT (User.GetOfficialId())
// //     };

// //     setCreating(true);
// //     try {
// //       const res = await api.post(
// //         '/mandiOfficialAuction/mandi/auction/create',
// //         dto,
// //       );
// //       if (!res.status.toString().startsWith('2')) {
// //         throw new Error(res.data?.message || 'Failed to create auction');
// //       }

// //       Alert.alert(
// //         t('success_title') ?? 'Success',
// //         t('auction_created_success') ?? 'Auction created successfully',
// //       );

// //       // reset minimal
// //       setSelectedCropId(null);
// //       setSelectedOfficerId('');
// //       setScheduledAt(new Date());

// //       // refresh list if visible
// //       if (showAuctionList) {
// //         loadAuctions();
// //       }
// //     } catch (err: any) {
// //       console.log('Create auction error', err?.response?.data ?? err);
// //       const msg =
// //         err?.response?.data?.message ??
// //         t('auction_create_failed') ??
// //         'Failed to create auction';
// //       Alert.alert(t('error_title') ?? 'Error', msg);
// //     } finally {
// //       setCreating(false);
// //     }
// //   };

// //   // ---------------------------------------------------
// //   // 5) Load auctions for this mandi
// //   // ---------------------------------------------------
// //   const loadAuctions = async () => {
// //     if (!mandiId) return;
// //     setLoadingAuctions(true);
// //     try {
// //       const res = await api.get(
// //         '/mandiOfficialAuction/mandi/auction/all',
// //         {
// //           params: { mandiId },
// //         },
// //       );

// //       let payload = res?.data ?? [];
// //       if (!Array.isArray(payload)) {
// //         if (Array.isArray(payload.items)) payload = payload.items;
// //         else if (Array.isArray(payload.data)) payload = payload.data;
// //         else payload = [payload];
// //       }

// //       setAuctions(payload);
// //     } catch (err: any) {
// //       console.log('Load auctions error', err?.response?.data ?? err);
// //       Alert.alert(
// //         t('error_title') ?? 'Error',
// //         t('fetch_auctions_failed') ?? 'Failed to fetch auction schedule',
// //       );
// //     } finally {
// //       setLoadingAuctions(false);
// //     }
// //   };

// //   const toggleShowAuctions = () => {
// //     const newVal = !showAuctionList;
// //     setShowAuctionList(newVal);
// //     if (newVal) {
// //       loadAuctions();
// //     }
// //   };

// //   // ---------------------------------------------------
// //   // RENDER
// //   // ---------------------------------------------------
// //   if (loadingProfile) {
// //     return (
// //       <SafeAreaView
// //         style={[
// //           styles.container,
// //           {
// //             backgroundColor: theme.background,
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //           },
// //         ]}
// //       >
// //         <ActivityIndicator />
// //         <Text style={{ marginTop: 8, color: theme.text }}>
// //           {t('loading') ?? 'Loading...'}
// //         </Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView
// //       style={[styles.container, { backgroundColor: theme.background }]}
// //     >
// //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// //         {/* Back button */}
// //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// //           <Text style={[styles.backText, { color: '#2b6cb0' }]}>
// //             {t('back')}
// //           </Text>
// //         </TouchableOpacity>

// //         {/* Header */}
// //         <Text style={[styles.title, { color: theme.text }]}>
// //           {t('mandi_manager_dashboard') ?? 'Mandi Manager Dashboard'}
// //         </Text>
// //         <Text style={[styles.text, { color: theme.text }]}>
// //           {t('mandi_manager_msg') ??
// //             'Manage auction schedules for your mandi.'}
// //         </Text>

// //         {/* Manager + Mandi info */}
// //         <View style={{ marginTop: 8, marginBottom: 16 }}>
// //           {managerName ? (
// //             <Text style={{ color: theme.text, fontWeight: '700' }}>
// //               {t('manager_name_label') ?? 'Manager'}: {managerName}
// //             </Text>
// //           ) : null}
// //           {mandiName || mandiId ? (
// //             <Text style={{ color: theme.text, marginTop: 4 }}>
// //               {t('mandi_label') ?? 'Mandi'}:{' '}
// //               {mandiName || `#${mandiId}`}
// //             </Text>
// //           ) : null}
// //         </View>

// //         {/* Buttons row */}
// //         <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
// //           <TouchableOpacity
// //             style={[
// //               styles.primaryButton,
// //               showCreateForm && { opacity: 0.8 },
// //             ]}
// //             onPress={() => setShowCreateForm(prev => !prev)}
// //           >
// //             <Text style={styles.primaryButtonText}>
// //               {t('schedule_auction_btn') ?? 'Schedule / Create Auction'}
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[
// //               styles.secondaryButton,
// //               showAuctionList && { opacity: 0.8 },
// //             ]}
// //             onPress={toggleShowAuctions}
// //           >
// //             <Text style={styles.secondaryButtonText}>
// //               {t('view_auction_schedule_btn') ?? 'View Auction Schedule'}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* CREATE AUCTION FORM */}
// //         {showCreateForm && (
// //           <View
// //             style={[
// //               styles.card,
// //               { borderColor: theme.text, backgroundColor: theme.background },
// //             ]}
// //           >
// //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //               {t('create_auction_title') ?? 'Create Auction'}
// //             </Text>

// //             {loadingMeta ? (
// //               <ActivityIndicator style={{ marginTop: 10 }} />
// //             ) : (
// //               <>
// //                 {/* Crop */}
// //                 <Text style={[styles.label, { color: theme.text }]}>
// //                   {t('crop') ?? 'Crop'}
// //                 </Text>
// //                 <View
// //                   style={[
// //                     styles.pickerWrap,
// //                     { borderColor: theme.text },
// //                   ]}
// //                 >
// //                   <Picker
// //                     selectedValue={selectedCropId ?? ''}
// //                     onValueChange={v =>
// //                       setSelectedCropId(v ? Number(v) : null)
// //                     }
// //                   >
// //                     <Picker.Item
// //                       label={t('select_crop') ?? 'Select crop'}
// //                       value=""
// //                     />
// //                     {crops.map((c: any) => {
// //                       const id =
// //                         c.cropId ?? c.CropId ?? c.id;
// //                       const name =
// //                         c.cropName ?? c.CropName ?? c.name ?? '';
// //                       if (!id || !name) return null;
// //                       return (
// //                         <Picker.Item
// //                           key={String(id)}
// //                           label={String(name)}
// //                           value={Number(id)}
// //                         />
// //                       );
// //                     })}
// //                   </Picker>
// //                 </View>

// //                 {/* Assigned Officer */}
// //                 <Text style={[styles.label, { color: theme.text }]}>
// //                   {t('assigned_officer_label') ?? 'Assigned Officer'}
// //                 </Text>
// //                 <View
// //                   style={[
// //                     styles.pickerWrap,
// //                     { borderColor: theme.text },
// //                   ]}
// //                 >
// //                   <Picker
// //                     selectedValue={selectedOfficerId}
// //                     onValueChange={v =>
// //                       setSelectedOfficerId(String(v))
// //                     }
// //                   >
// //                     <Picker.Item
// //                       label={
// //                         t('select_officer') ?? 'Select officer'
// //                       }
// //                       value=""
// //                     />
// //                     {officers.map((o: any) => {
// //                       const oid =
// //                         o.officialId ??
// //                         o.OfficialId ??
// //                         o.id;
// //                       const oname =
// //                         o.officialName ??
// //                         o.OfficialName ??
// //                         '';
// //                       if (!oid || !oname) return null;
// //                       return (
// //                         <Picker.Item
// //                           key={String(oid)}
// //                           label={String(oname)}
// //                           value={String(oid)}
// //                         />
// //                       );
// //                     })}
// //                   </Picker>
// //                 </View>

// //                 {/* Created By (readonly manager name) */}
// //                 <Text style={[styles.label, { color: theme.text }]}>
// //                   {t('created_by_label') ?? 'Created By'}
// //                 </Text>
// //                 <View style={styles.readonlyBox}>
// //                   <Text style={{ color: theme.text }}>
// //                     {managerName || '-'}
// //                   </Text>
// //                 </View>

// //                 {/* Mandi (readonly) */}
// //                 <Text style={[styles.label, { color: theme.text }]}>
// //                   {t('mandi_label') ?? 'Mandi'}
// //                 </Text>
// //                 <View style={styles.readonlyBox}>
// //                   <Text style={{ color: theme.text }}>
// //                     {mandiName || (mandiId ? `#${mandiId}` : '-')}
// //                   </Text>
// //                 </View>

// //                 {/* Scheduled At */}
// //                 <Text style={[styles.label, { color: theme.text }]}>
// //                   {t('scheduled_at_label') ?? 'Scheduled At'}
// //                 </Text>
// //                 <TouchableOpacity
// //                   onPress={() => setShowDatePicker(true)}
// //                   style={[
// //                     styles.dateBtn,
// //                     { borderColor: theme.text },
// //                   ]}
// //                 >
// //                   <Text style={{ color: theme.text }}>
// //                     {formatDateTime(scheduledAt)}
// //                   </Text>
// //                   <Text style={styles.calendarIcon}>📅</Text>
// //                 </TouchableOpacity>

// //                 {showDatePicker && (
// //                   <DateTimePicker
// //                     mode="datetime"
// //                     value={scheduledAt}
// //                     onChange={onChangeDate}
// //                   />
// //                 )}

// //                 {/* Create button */}
// //                 <TouchableOpacity
// //                   style={[
// //                     styles.submitBtn,
// //                     creating && { opacity: 0.7 },
// //                   ]}
// //                   onPress={handleCreateAuction}
// //                   disabled={creating}
// //                 >
// //                   {creating ? (
// //                     <ActivityIndicator color="#fff" />
// //                   ) : (
// //                     <Text style={styles.submitBtnText}>
// //                       {t('create_auction_btn') ?? 'Create Auction'}
// //                     </Text>
// //                   )}
// //                 </TouchableOpacity>
// //               </>
// //             )}
// //           </View>
// //         )}

// //         {/* AUCTION LIST */}
// //         {showAuctionList && (
// //           <View
// //             style={[
// //               styles.card,
// //               { borderColor: theme.text, backgroundColor: theme.background },
// //             ]}
// //           >
// //             <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //               {t('auction_schedule_title') ?? 'Auction Schedule'}
// //             </Text>

// //             {loadingAuctions ? (
// //               <ActivityIndicator style={{ marginTop: 10 }} />
// //             ) : auctions.length === 0 ? (
// //               <View style={{ marginTop: 10 }}>
// //                 <Text style={{ color: theme.text }}>
// //                   {t('no_auctions') ?? 'No auctions scheduled yet'}
// //                 </Text>
// //               </View>
// //             ) : (
// //               auctions.map((a: AuctionItem) => {
// //                 const id = String(
// //                   a.auctionId ?? a.AuctionId ?? '',
// //                 );
// //                 const cropName =
// //                   a.cropName ?? a.CropName ?? '-';
// //                 const officerName =
// //                   a.assignedOfficerName ??
// //                   a.AssignedOfficerName ??
// //                   '-';
// //                 const status =
// //                   a.status ?? a.Status ?? '-';
// //                 const schedRaw =
// //                   a.scheduledAt ?? a.ScheduledAt ?? '';
// //                 const sched = schedRaw
// //                   ? new Date(schedRaw).toLocaleString()
// //                   : '-';

// //                 return (
// //                   <View
// //                     key={id}
// //                     style={[
// //                       styles.auctionItem,
// //                       { borderColor: theme.text },
// //                     ]}
// //                   >
// //                     <Text
// //                       style={[
// //                         styles.auctionTitle,
// //                         { color: theme.text },
// //                       ]}
// //                     >
// //                       {cropName}
// //                     </Text>
// //                     <Text style={{ color: theme.text }}>
// //                       {t('assigned_officer_label') ??
// //                         'Assigned Officer'}
// //                       : {officerName}
// //                     </Text>
// //                     <Text style={{ color: theme.text }}>
// //                       {t('scheduled_at_label') ?? 'Scheduled At'}:{' '}
// //                       {sched}
// //                     </Text>
// //                     <Text
// //                       style={{
// //                         color:
// //                           status === 'scheduled'
// //                             ? '#2563eb'
// //                             : status === 'started'
// //                             ? '#16a34a'
// //                             : status === 'ended'
// //                             ? '#6b7280'
// //                             : theme.text,
// //                         marginTop: 4,
// //                         fontWeight: '700',
// //                       }}
// //                     >
// //                       {t('status') ?? 'Status'}: {status}
// //                     </Text>
// //                   </View>
// //                 );
// //               })
// //             )}
// //           </View>
// //         )}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
// //   text: { fontSize: 16 },
// //   backText: { fontWeight: '700', fontSize: 16 },
// //   backBtn: {
// //     alignSelf: 'flex-start',
// //     backgroundColor: '#edf2f7',
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     borderRadius: 6,
// //     marginBottom: 10,
// //   },

// //   primaryButton: {
// //     flex: 1,
// //     backgroundColor: '#10b981',
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

// //   secondaryButton: {
// //     flex: 1,
// //     backgroundColor: '#1d4ed8',
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

// //   card: {
// //     borderWidth: 1,
// //     borderRadius: 10,
// //     padding: 12,
// //     marginBottom: 16,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     marginBottom: 8,
// //   },
// //   label: {
// //     fontSize: 14,
// //     fontWeight: '700',
// //     marginTop: 10,
// //     marginBottom: 4,
// //   },
// //   pickerWrap: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     overflow: 'hidden',
// //   },
// //   readonlyBox: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     padding: 10,
// //     marginTop: 4,
// //     borderColor: '#d1d5db',
// //   },
// //   dateBtn: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     padding: 10,
// //     marginTop: 4,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   calendarIcon: {
// //     fontSize: 20,
// //     marginLeft: 6,
// //   },
// //   submitBtn: {
// //     backgroundColor: '#10b981',
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 16,
// //   },
// //   submitBtnText: { color: '#fff', fontWeight: '700' },

// //   auctionItem: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     padding: 10,
// //     marginTop: 10,
// //   },
// //   auctionTitle: {
// //     fontSize: 16,
// //     fontWeight: '700',
// //     marginBottom: 4,
// //   },
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker, {
//   DateTimePickerEvent,
// } from '@react-native-community/datetimepicker';

// import { RootStackParamList } from '../../App';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';

// type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// type CropItem = {
//   cropId?: number;
//   CropId?: number;
//   id?: number;
//   cropName?: string;
//   CropName?: string;
//   name?: string;
// };

// type OfficerItem = {
//   officialId?: string;
//   OfficialId?: string;
//   id?: string;
//   officialName?: string;
//   OfficialName?: string;
// };

// type AuctionItem = {
//   auctionId?: string;
//   AuctionId?: string;
//   mandiId?: number;
//   MandiId?: number;
//   mandiName?: string;
//   MandiName?: string;
//   cropId?: number;
//   CropId?: number;
//   cropName?: string;
//   CropName?: string;
//   assignedOfficerName?: string;
//   AssignedOfficerName?: string;
//   status?: string;
//   Status?: string;
//   scheduledAt?: string;
//   ScheduledAt?: string;
//   createdAt?: string;
//   CreatedAt?: string;
// };

// export default function MandiManagerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const goBack = () => navigation.navigate('Dashboard');

//   // Profile data (manager = mandi official with MANAGER role)
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [managerName, setManagerName] = useState<string>('');
//   const [managerOfficialId, setManagerOfficialId] = useState<string>('');
//   const [mandiId, setMandiId] = useState<number | null>(null);
//   const [mandiName, setMandiName] = useState<string>('');

//   // Meta dropdowns
//   const [crops, setCrops] = useState<CropItem[]>([]);
//   const [officers, setOfficers] = useState<OfficerItem[]>([]);
//   const [loadingMeta, setLoadingMeta] = useState(false);

//   // Create auction form
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [creating, setCreating] = useState(false);

//   const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
//   const [selectedOfficerId, setSelectedOfficerId] = useState<string>('');

//   // ⏰ Scheduled at: manager must explicitly choose a FUTURE datetime
//   const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // Auction list
//   const [showAuctionList, setShowAuctionList] = useState(false);
//   const [auctions, setAuctions] = useState<AuctionItem[]>([]);
//   const [loadingAuctions, setLoadingAuctions] = useState(false);

//   // ---------------------------------------------------
//   // 1) Load manager profile → mandiId + managerName + officialId
//   // ---------------------------------------------------
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const res = await api.get('/mandi-official/profile');
//         const data = res?.data ?? null;
//         if (!data) {
//           throw new Error('Profile not found');
//         }

//         const name = data.officialName ?? data.OfficialName ?? '';
//         const mId = data.mandiId ?? data.MandiId ?? null;
//         const mName = data.mandiName ?? data.MandiName ?? '';
//         const offId = data.officialId ?? data.OfficialId ?? '';

//         if (!mId) {
//           Alert.alert(
//             t('error_title') ?? 'Error',
//             t('mandi_not_found_profile') ??
//               'No mandi is linked to this manager profile.',
//           );
//         }

//         setManagerName(String(name));
//         setManagerOfficialId(offId ? String(offId) : '');
//         setMandiId(mId ? Number(mId) : null);
//         setMandiName(String(mName));
//       } catch (err: any) {
//         console.log('Manager profile load error', err?.response?.data ?? err);
//         Alert.alert(
//           t('error_title') ?? 'Error',
//           t('profile_fetch_failed') ?? 'Failed to load manager profile.',
//         );
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     loadProfile();
//   }, [t]);

//   // ---------------------------------------------------
//   // 2) Load crops + officers for this mandi
//   //    officers API failure is NON-FATAL (fallback to manager)
//   // ---------------------------------------------------
//   const loadMeta = async (mId: number) => {
//     setLoadingMeta(true);
//     try {
//       // 2.1 CROPS (required)
//       const cropsRes = await api.get('/crops');
//       const cropData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
//       setCrops(cropData);

//       // 2.2 OFFICERS (best-effort)
//       try {
//         const officersRes = await api.get('/mandi-official/officers', {
//           params: { mandiId: mId },
//         });
//         const officerData = Array.isArray(officersRes.data)
//           ? officersRes.data
//           : [];

//         if (officerData.length > 0) {
//           setOfficers(officerData);
//         } else if (managerOfficialId && managerName) {
//           setOfficers([
//             { officialId: managerOfficialId, officialName: managerName },
//           ]);
//         } else {
//           setOfficers([]);
//         }
//       } catch (err) {
//         console.log('Officer list load error (non-fatal):', err);
//         if (managerOfficialId && managerName) {
//           setOfficers([
//             { officialId: managerOfficialId, officialName: managerName },
//           ]);
//         } else {
//           setOfficers([]);
//         }
//       }
//     } catch (err: any) {
//       console.log('Manager meta load error', err?.response?.data ?? err);
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fetch_meta_failed') ?? 'Failed to load dropdown data.',
//       );
//     } finally {
//       setLoadingMeta(false);
//     }
//   };

//   useEffect(() => {
//     if (mandiId) {
//       loadMeta(mandiId);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mandiId, managerOfficialId, managerName]);

//   // ---------------------------------------------------
//   // 3) Date picker handlers (future date only)
//   // ---------------------------------------------------
//   const onChangeDate = (_event: DateTimePickerEvent, selected?: Date) => {
//     setShowDatePicker(false);
//     if (!selected) return;

//     const now = new Date();
//     if (selected.getTime() <= now.getTime()) {
//       Alert.alert(
//         t('invalid_schedule_title') ?? 'Invalid date',
//         t('schedule_future_only') ??
//           'Please select a date & time in the future.',
//       );
//       return;
//     }

//     setScheduledAt(selected);
//   };

//   const formatDateTime = (d: Date | null) => {
//     if (!d) return t('select_date_time') ?? 'Select date & time';
//     const dd = String(d.getDate()).padStart(2, '0');
//     const mm = String(d.getMonth() + 1).padStart(2, '0');
//     const yyyy = d.getFullYear();

//     const hh = String(d.getHours()).padStart(2, '0');
//     const min = String(d.getMinutes()).padStart(2, '0');

//     return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
//   };

//   // ---------------------------------------------------
//   // 4) Create auction
//   // ---------------------------------------------------
//   const handleCreateAuction = async () => {
//     if (!mandiId) {
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('mandi_not_found_profile') ??
//           'No mandi is linked to this manager profile.',
//       );
//     }
//     if (!selectedCropId) {
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fill_crop') ?? 'Please select crop',
//       );
//     }
//     if (!selectedOfficerId) {
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('select_officer_required') ?? 'Please select an officer',
//       );
//     }
//     if (!scheduledAt) {
//       return Alert.alert(
//         t('error_title') ?? 'Error',
//         t('schedule_required') ?? 'Please select schedule date & time',
//       );
//     }

//     const now = new Date();
//     if (scheduledAt.getTime() <= now.getTime()) {
//       return Alert.alert(
//         t('invalid_schedule_title') ?? 'Invalid date',
//         t('schedule_future_only') ??
//           'Please select a date & time in the future.',
//       );
//     }

//     const dto = {
//       MandiId: mandiId,
//       CropId: selectedCropId,
//       AssignedOfficerId: selectedOfficerId,
//       ScheduledAt: scheduledAt.toISOString(),
//       // CreatedByOfficialId is auto set on backend from JWT (User.GetOfficialId())
//     };

//     setCreating(true);
//     try {
//       const res = await api.post(
//         '/mandiOfficialAuction/mandi/auction/create',
//         dto,
//       );
//       if (!res.status.toString().startsWith('2')) {
//         throw new Error(res.data?.message || 'Failed to create auction');
//       }

//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('auction_created_success') ?? 'Auction created successfully',
//       );

//       // reset only form fields
//       setSelectedCropId(null);
//       setSelectedOfficerId('');
//       setScheduledAt(null);

//       if (showAuctionList) {
//         loadAuctions();
//       }
//     } catch (err: any) {
//       console.log('Create auction error', err?.response?.data ?? err);
//       const msg =
//         err?.response?.data?.message ??
//         t('auction_create_failed') ??
//         'Failed to create auction';
//       Alert.alert(t('error_title') ?? 'Error', msg);
//     } finally {
//       setCreating(false);
//     }
//   };

//   // ---------------------------------------------------
//   // 5) Load auctions for this mandi
//   // ---------------------------------------------------
//   const loadAuctions = async () => {
//     if (!mandiId) return;
//     setLoadingAuctions(true);
//     try {
//       const res = await api.get('/mandiOfficialAuction/mandi/auction/all', {
//         params: { mandiId },
//       });

//       let payload = res?.data ?? [];
//       if (!Array.isArray(payload)) {
//         if (Array.isArray(payload.items)) payload = payload.items;
//         else if (Array.isArray(payload.data)) payload = payload.data;
//         else payload = [payload];
//       }

//       setAuctions(payload);
//     } catch (err: any) {
//       console.log('Load auctions error', err?.response?.data ?? err);
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         t('fetch_auctions_failed') ?? 'Failed to fetch auction schedule',
//       );
//     } finally {
//       setLoadingAuctions(false);
//     }
//   };

//   const toggleShowAuctions = () => {
//     const newVal = !showAuctionList;
//     setShowAuctionList(newVal);
//     if (newVal) {
//       loadAuctions();
//     }
//   };

//   // ---------------------------------------------------
//   // RENDER
//   // ---------------------------------------------------
//   if (loadingProfile) {
//     return (
//       <SafeAreaView
//         style={[
//           styles.container,
//           {
//             backgroundColor: theme.background,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//         ]}
//       >
//         <ActivityIndicator />
//         <Text style={{ marginTop: 8, color: theme.text }}>
//           {t('loading') ?? 'Loading...'}
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.background }]}
//     >
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         {/* Back button */}
//         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
//           <Text style={[styles.backText, { color: '#2b6cb0' }]}>
//             {t('back')}
//           </Text>
//         </TouchableOpacity>

//         {/* Header */}
//         <Text style={[styles.title, { color: theme.text }]}>
//           {t('mandi_manager_dashboard') ?? 'Mandi Manager Dashboard'}
//         </Text>
//         <Text style={[styles.text, { color: theme.text }]}>
//           {t('mandi_manager_msg') ??
//             'Manage auction schedules for your mandi.'}
//         </Text>

//         {/* Manager + Mandi info */}
//         <View style={{ marginTop: 8, marginBottom: 16 }}>
//           {managerName ? (
//             <Text style={{ color: theme.text, fontWeight: '700' }}>
//               {t('manager_name_label') ?? 'Manager'}: {managerName}
//             </Text>
//           ) : null}
//           {mandiName || mandiId ? (
//             <Text style={{ color: theme.text, marginTop: 4 }}>
//               {t('mandi_label') ?? 'Mandi'}:{' '}
//               {mandiName || `#${mandiId}`}
//             </Text>
//           ) : null}
//         </View>

//         {/* Buttons row */}
//         <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
//           <TouchableOpacity
//             style={[
//               styles.primaryButton,
//               showCreateForm && { opacity: 0.8 },
//             ]}
//             onPress={() => setShowCreateForm(prev => !prev)}
//           >
//             <Text style={styles.primaryButtonText}>
//               {t('schedule_auction_btn') ?? 'Schedule / Create Auction'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.secondaryButton,
//               showAuctionList && { opacity: 0.8 },
//             ]}
//             onPress={toggleShowAuctions}
//           >
//             <Text style={styles.secondaryButtonText}>
//               {t('view_auction_schedule_btn') ?? 'View Auction Schedule'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* CREATE AUCTION FORM */}
//         {showCreateForm && (
//           <View
//             style={[
//               styles.card,
//               { borderColor: theme.text, backgroundColor: theme.background },
//             ]}
//           >
//             <Text style={[styles.sectionTitle, { color: theme.text }]}>
//               {t('create_auction_title') ?? 'Create Auction'}
//             </Text>

//             {loadingMeta ? (
//               <ActivityIndicator style={{ marginTop: 10 }} />
//             ) : (
//               <>
//                 {/* Crop */}
//                 <Text style={[styles.label, { color: theme.text }]}>
//                   {t('crop') ?? 'Crop'}
//                 </Text>
//                 <View
//                   style={[
//                     styles.pickerWrap,
//                     { borderColor: theme.text },
//                   ]}
//                 >
//                   <Picker
//                     selectedValue={selectedCropId ?? ''}
//                     onValueChange={v =>
//                       setSelectedCropId(v ? Number(v) : null)
//                     }
//                   >
//                     <Picker.Item
//                       label={t('select_crop') ?? 'Select crop'}
//                       value=""
//                     />
//                     {crops.map((c: any) => {
//                       const id = c.cropId ?? c.CropId ?? c.id;
//                       const name =
//                         c.cropName ?? c.CropName ?? c.name ?? '';
//                       if (!id || !name) return null;
//                       return (
//                         <Picker.Item
//                           key={String(id)}
//                           label={String(name)}
//                           value={Number(id)}
//                         />
//                       );
//                     })}
//                   </Picker>
//                 </View>

//                 {/* Assigned Officer */}
//                 <Text style={[styles.label, { color: theme.text }]}>
//                   {t('assigned_officer_label') ?? 'Assigned Officer'}
//                 </Text>
//                 <View
//                   style={[
//                     styles.pickerWrap,
//                     { borderColor: theme.text },
//                   ]}
//                 >
//                   <Picker
//                     selectedValue={selectedOfficerId}
//                     onValueChange={v =>
//                       setSelectedOfficerId(String(v))
//                     }
//                   >
//                     <Picker.Item
//                       label={
//                         t('select_officer') ?? 'Select officer'
//                       }
//                       value=""
//                     />
//                     {officers.map((o: any) => {
//                       const oid =
//                         o.officialId ??
//                         o.OfficialId ??
//                         o.id;
//                       const oname =
//                         o.officialName ??
//                         o.OfficialName ??
//                         '';
//                       if (!oid || !oname) return null;
//                       return (
//                         <Picker.Item
//                           key={String(oid)}
//                           label={String(oname)}
//                           value={String(oid)}
//                         />
//                       );
//                     })}
//                   </Picker>
//                 </View>

//                 {/* Created By (readonly manager name) */}
//                 <Text style={[styles.label, { color: theme.text }]}>
//                   {t('created_by_label') ?? 'Created By'}
//                 </Text>
//                 <View style={styles.readonlyBox}>
//                   <Text style={{ color: theme.text }}>
//                     {managerName || '-'}
//                   </Text>
//                 </View>

//                 {/* Mandi (readonly) */}
//                 <Text style={[styles.label, { color: theme.text }]}>
//                   {t('mandi_label') ?? 'Mandi'}
//                 </Text>
//                 <View style={styles.readonlyBox}>
//                   <Text style={{ color: theme.text }}>
//                     {mandiName || (mandiId ? `#${mandiId}` : '-')}
//                   </Text>
//                 </View>

//                 {/* Scheduled At */}
//                 <Text style={[styles.label, { color: theme.text }]}>
//                   {t('scheduled_at_label') ?? 'Scheduled At'}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => setShowDatePicker(true)}
//                   style={[
//                     styles.dateBtn,
//                     { borderColor: theme.text },
//                   ]}
//                 >
//                   <Text
//                     style={{
//                       color: scheduledAt
//                         ? theme.text
//                         : '#9ca3af',
//                     }}
//                   >
//                     {formatDateTime(scheduledAt)}
//                   </Text>
//                   <Text style={styles.calendarIcon}>📅</Text>
//                 </TouchableOpacity>

//                 {showDatePicker && (
//                   <DateTimePicker
//                     mode="datetime"
//                     value={scheduledAt ?? new Date()}
//                     minimumDate={new Date()} // 🚫 cannot pick past dates
//                     onChange={onChangeDate}
//                   />
//                 )}

//                 {/* Create button */}
//                 <TouchableOpacity
//                   style={[
//                     styles.submitBtn,
//                     creating && { opacity: 0.7 },
//                   ]}
//                   onPress={handleCreateAuction}
//                   disabled={creating}
//                 >
//                   {creating ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.submitBtnText}>
//                       {t('create_auction_btn') ?? 'Create Auction'}
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         )}

//         {/* AUCTION LIST */}
//         {showAuctionList && (
//           <View
//             style={[
//               styles.card,
//               { borderColor: theme.text, backgroundColor: theme.background },
//             ]}
//           >
//             <Text style={[styles.sectionTitle, { color: theme.text }]}>
//               {t('auction_schedule_title') ?? 'Auction Schedule'}
//             </Text>

//             {loadingAuctions ? (
//               <ActivityIndicator style={{ marginTop: 10 }} />
//             ) : auctions.length === 0 ? (
//               <View style={{ marginTop: 10 }}>
//                 <Text style={{ color: theme.text }}>
//                   {t('no_auctions') ?? 'No auctions scheduled yet'}
//                 </Text>
//               </View>
//             ) : (
//               auctions.map((a: AuctionItem) => {
//                 const id = String(
//                   a.auctionId ?? a.AuctionId ?? '',
//                 );
//                 const cropName =
//                   a.cropName ?? a.CropName ?? '-';
//                 const officerName =
//                   a.assignedOfficerName ??
//                   a.AssignedOfficerName ??
//                   '-';
//                 const status =
//                   a.status ?? a.Status ?? '-';
//                 const schedRaw =
//                   a.scheduledAt ?? a.ScheduledAt ?? '';
//                 const sched = schedRaw
//                   ? new Date(schedRaw).toLocaleString()
//                   : '-';

//                 return (
//                   <View
//                     key={id}
//                     style={[
//                       styles.auctionItem,
//                       { borderColor: theme.text },
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.auctionTitle,
//                         { color: theme.text },
//                       ]}
//                     >
//                       {cropName}
//                     </Text>
//                     <Text style={{ color: theme.text }}>
//                       {t('assigned_officer_label') ??
//                         'Assigned Officer'}
//                       : {officerName}
//                     </Text>
//                     <Text style={{ color: theme.text }}>
//                       {t('scheduled_at_label') ?? 'Scheduled At'}:{' '}
//                       {sched}
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           status === 'scheduled'
//                             ? '#2563eb'
//                             : status === 'started'
//                             ? '#16a34a'
//                             : status === 'ended'
//                             ? '#6b7280'
//                             : theme.text,
//                         marginTop: 4,
//                         fontWeight: '700',
//                       }}
//                     >
//                       {t('status') ?? 'Status'}: {status}
//                     </Text>
//                   </View>
//                 );
//               })
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
//   text: { fontSize: 16 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   backBtn: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#edf2f7',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 10,
//   },

//   primaryButton: {
//     flex: 1,
//     backgroundColor: '#10b981',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

//   secondaryButton: {
//     flex: 1,
//     backgroundColor: '#1d4ed8',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

//   card: {
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '700',
//     marginTop: 10,
//     marginBottom: 4,
//   },
//   pickerWrap: {
//     borderWidth: 1,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   readonlyBox: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 4,
//     borderColor: '#d1d5db',
//   },
//   dateBtn: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 4,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   calendarIcon: {
//     fontSize: 20,
//     marginLeft: 6,
//   },
//   submitBtn: {
//     backgroundColor: '#10b981',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   submitBtnText: { color: '#fff', fontWeight: '700' },

//   auctionItem: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 10,
//   },
//   auctionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { RootStackParamList } from '../../App';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type CropItem = {
  cropId?: number;
  CropId?: number;
  id?: number;
  cropName?: string;
  CropName?: string;
  name?: string;
};

type OfficerItem = {
  officialId?: string;
  OfficialId?: string;
  id?: string;
  officialName?: string;
  OfficialName?: string;
};

type AuctionItem = {
  auctionId?: string;
  AuctionId?: string;
  mandiId?: number;
  MandiId?: number;
  mandiName?: string;
  MandiName?: string;
  cropId?: number;
  CropId?: number;
  cropName?: string;
  CropName?: string;
  assignedOfficerName?: string;
  AssignedOfficerName?: string;
  status?: string;
  Status?: string;
  scheduledAt?: string;
  ScheduledAt?: string;
  createdAt?: string;
  CreatedAt?: string;
};

export default function MandiManagerDashboard() {
  const navigation = useNavigation<PropsNav>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const goBack = () => navigation.navigate('Dashboard');

  // Profile data
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [managerName, setManagerName] = useState<string>('');
  const [managerOfficialId, setManagerOfficialId] = useState<string>('');
  const [mandiId, setMandiId] = useState<number | null>(null);
  const [mandiName, setMandiName] = useState<string>('');

  // Meta dropdowns
  const [crops, setCrops] = useState<CropItem[]>([]);
  const [officers, setOfficers] = useState<OfficerItem[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(false);

  // Create auction form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>('');

  // Scheduled at (future date only, picked by manager)
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Auction list
  const [showAuctionList, setShowAuctionList] = useState(false);
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loadingAuctions, setLoadingAuctions] = useState(false);

  // ---------------------------------------------------
  // 1) Load manager profile → mandiId + managerName + officialId
  // ---------------------------------------------------
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/mandi-official/profile');
        const data = res?.data ?? null;
        if (!data) throw new Error('Profile not found');

        const name = data.officialName ?? data.OfficialName ?? '';
        const mId = data.mandiId ?? data.MandiId ?? null;
        const mName = data.mandiName ?? data.MandiName ?? '';
        const offId = data.officialId ?? data.OfficialId ?? '';

        if (!mId) {
          Alert.alert(
            t('error_title') ?? 'Error',
            t('mandi_not_found_profile') ??
              'No mandi is linked to this manager profile.',
          );
        }

        setManagerName(String(name));
        setManagerOfficialId(offId ? String(offId) : '');
        setMandiId(mId ? Number(mId) : null);
        setMandiName(String(mName));
      } catch (err: any) {
        console.log('Manager profile load error', err?.response?.data ?? err);
        Alert.alert(
          t('error_title') ?? 'Error',
          t('profile_fetch_failed') ?? 'Failed to load manager profile.',
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [t]);

  // ---------------------------------------------------
  // 2) Load crops + officers for this mandi (officers are best-effort)
  // ---------------------------------------------------
  const loadMeta = async (mId: number) => {
    setLoadingMeta(true);
    try {
      // CROPS
      const cropsRes = await api.get('/crops');
      const cropData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
      setCrops(cropData);

      // OFFICERS – non-fatal if fails
      try {
        const officersRes = await api.get('/mandi-official/officers', {
          params: { mandiId: mId },
        });
        const officerData = Array.isArray(officersRes.data)
          ? officersRes.data
          : [];

        if (officerData.length > 0) {
          setOfficers(officerData);
        } else if (managerOfficialId && managerName) {
          setOfficers([
            { officialId: managerOfficialId, officialName: managerName },
          ]);
        } else {
          setOfficers([]);
        }
      } catch (err) {
        console.log('Officer list load error (non-fatal):', err);
        if (managerOfficialId && managerName) {
          setOfficers([
            { officialId: managerOfficialId, officialName: managerName },
          ]);
        } else {
          setOfficers([]);
        }
      }
    } catch (err: any) {
      console.log('Manager meta load error', err?.response?.data ?? err);
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fetch_meta_failed') ?? 'Failed to load dropdown data.',
      );
    } finally {
      setLoadingMeta(false);
    }
  };

  useEffect(() => {
    if (mandiId) {
      loadMeta(mandiId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mandiId, managerOfficialId, managerName]);

  // ---------------------------------------------------
  // 3) Date picker handlers (future date only, prevents crash)
  // ---------------------------------------------------
  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    // On Android we must hide the picker manually
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    // If user cancelled / dismissed, do nothing
    if (event.type === 'dismissed') {
      return;
    }

    if (!date) return;

    // Compare only by date (not time) or use full timestamp as you like
    const now = new Date();
    // We want strictly future date (cannot schedule for now or past)
    if (date.getTime() <= now.getTime()) {
      Alert.alert(
        t('invalid_schedule_title') ?? 'Invalid date',
        t('schedule_future_only') ??
          'Please select a date & time in the future.',
      );
      return;
    }

    setScheduledAt(date);
  };

  const formatDateTime = (d: Date | null) => {
    if (!d) return t('select_date_time') ?? 'Select date & time';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // ---------------------------------------------------
  // 4) Create auction
  // ---------------------------------------------------
  const handleCreateAuction = async () => {
    if (!mandiId) {
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('mandi_not_found_profile') ??
          'No mandi is linked to this manager profile.',
      );
    }
    if (!selectedCropId) {
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_crop') ?? 'Please select crop',
      );
    }
    if (!selectedOfficerId) {
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('select_officer_required') ?? 'Please select an officer',
      );
    }
    if (!scheduledAt) {
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('schedule_required') ?? 'Please select schedule date',
      );
    }

    const now = new Date();
    if (scheduledAt.getTime() <= now.getTime()) {
      return Alert.alert(
        t('invalid_schedule_title') ?? 'Invalid date',
        t('schedule_future_only') ??
          'Please select a date & time in the future.',
      );
    }

    const dto = {
      MandiId: mandiId,
      CropId: selectedCropId,
      AssignedOfficerId: selectedOfficerId,
      ScheduledAt: scheduledAt.toISOString(),
      // CreatedByOfficialId is set in backend from JWT
    };

    setCreating(true);
    try {
      const res = await api.post(
        '/mandiOfficialAuction/mandi/auction/create',
        dto,
      );
      if (!res.status.toString().startsWith('2')) {
        throw new Error(res.data?.message || 'Failed to create auction');
      }

      Alert.alert(
        t('success_title') ?? 'Success',
        t('auction_created_success') ?? 'Auction created successfully',
      );

      setSelectedCropId(null);
      setSelectedOfficerId('');
      setScheduledAt(null);

      if (showAuctionList) {
        loadAuctions();
      }
    } catch (err: any) {
      console.log('Create auction error', err?.response?.data ?? err);
      const msg =
        err?.response?.data?.message ??
        t('auction_create_failed') ??
        'Failed to create auction';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setCreating(false);
    }
  };

  // ---------------------------------------------------
  // 5) Load auctions for this mandi
  // ---------------------------------------------------
  const loadAuctions = async () => {
    if (!mandiId) return;
    setLoadingAuctions(true);
    try {
      const res = await api.get('/mandiOfficialAuction/mandi/auction/all', {
        params: { mandiId },
      });

      let payload = res?.data ?? [];
      if (!Array.isArray(payload)) {
        if (Array.isArray(payload.items)) payload = payload.items;
        else if (Array.isArray(payload.data)) payload = payload.data;
        else payload = [payload];
      }

      setAuctions(payload);
    } catch (err: any) {
      console.log('Load auctions error', err?.response?.data ?? err);
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fetch_auctions_failed') ?? 'Failed to fetch auction schedule',
      );
    } finally {
      setLoadingAuctions(false);
    }
  };

  const toggleShowAuctions = () => {
    const newVal = !showAuctionList;
    setShowAuctionList(newVal);
    if (newVal) {
      loadAuctions();
    }
  };

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  if (loadingProfile) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator />
        <Text style={{ marginTop: 8, color: theme.text }}>
          {t('loading') ?? 'Loading...'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Back button */}
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={[styles.backText, { color: '#2b6cb0' }]}>
            {t('back')}
          </Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={[styles.title, { color: theme.text }]}>
          {t('mandi_manager_dashboard') ?? 'Mandi Manager Dashboard'}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          {t('mandi_manager_msg') ??
            'Manage auction schedules for your mandi.'}
        </Text>

        {/* Manager + Mandi info */}
        <View style={{ marginTop: 8, marginBottom: 16 }}>
          {managerName ? (
            <Text style={{ color: theme.text, fontWeight: '700' }}>
              {t('manager_name_label') ?? 'Manager'}: {managerName}
            </Text>
          ) : null}
          {mandiName || mandiId ? (
            <Text style={{ color: theme.text, marginTop: 4 }}>
              {t('mandi_label') ?? 'Mandi'}:{' '}
              {mandiName || (mandiId ? `#${mandiId}` : '')}
            </Text>
          ) : null}
        </View>

        {/* Buttons row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              showCreateForm && { opacity: 0.8 },
            ]}
            onPress={() => setShowCreateForm(prev => !prev)}
          >
            <Text style={styles.primaryButtonText}>
              {t('schedule_auction_btn') ?? 'Schedule / Create Auction'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              showAuctionList && { opacity: 0.8 },
            ]}
            onPress={toggleShowAuctions}
          >
            <Text style={styles.secondaryButtonText}>
              {t('view_auction_schedule_btn') ?? 'View Auction Schedule'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CREATE AUCTION FORM */}
        {showCreateForm && (
          <View
            style={[
              styles.card,
              { borderColor: theme.text, backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('create_auction_title') ?? 'Create Auction'}
            </Text>

            {loadingMeta ? (
              <ActivityIndicator style={{ marginTop: 10 }} />
            ) : (
              <>
                {/* Crop */}
                <Text style={[styles.label, { color: theme.text }]}>
                  {t('crop') ?? 'Crop'}
                </Text>
                <View
                  style={[
                    styles.pickerWrap,
                    { borderColor: theme.text },
                  ]}
                >
                  <Picker
                    selectedValue={selectedCropId ?? ''}
                    onValueChange={v =>
                      setSelectedCropId(v ? Number(v) : null)
                    }
                  >
                    <Picker.Item
                      label={t('select_crop') ?? 'Select crop'}
                      value=""
                    />
                    {crops.map((c: any) => {
                      const id = c.cropId ?? c.CropId ?? c.id;
                      const name =
                        c.cropName ?? c.CropName ?? c.name ?? '';
                      if (!id || !name) return null;
                      return (
                        <Picker.Item
                          key={String(id)}
                          label={String(name)}
                          value={Number(id)}
                        />
                      );
                    })}
                  </Picker>
                </View>

                {/* Assigned Officer */}
                <Text style={[styles.label, { color: theme.text }]}>
                  {t('assigned_officer_label') ?? 'Assigned Officer'}
                </Text>
                <View
                  style={[
                    styles.pickerWrap,
                    { borderColor: theme.text },
                  ]}
                >
                  <Picker
                    selectedValue={selectedOfficerId}
                    onValueChange={v =>
                      setSelectedOfficerId(String(v))
                    }
                  >
                    <Picker.Item
                      label={
                        t('select_officer') ?? 'Select officer'
                      }
                      value=""
                    />
                    {officers.map((o: any) => {
                      const oid =
                        o.officialId ??
                        o.OfficialId ??
                        o.id;
                      const oname =
                        o.officialName ??
                        o.OfficialName ??
                        '';
                      if (!oid || !oname) return null;
                      return (
                        <Picker.Item
                          key={String(oid)}
                          label={String(oname)}
                          value={String(oid)}
                        />
                      );
                    })}
                  </Picker>
                </View>

                {/* Created By */}
                <Text style={[styles.label, { color: theme.text }]}>
                  {t('created_by_label') ?? 'Created By'}
                </Text>
                <View style={styles.readonlyBox}>
                  <Text style={{ color: theme.text }}>
                    {managerName || '-'}
                  </Text>
                </View>

                {/* Mandi */}
                <Text style={[styles.label, { color: theme.text }]}>
                  {t('mandi_label') ?? 'Mandi'}
                </Text>
                <View style={styles.readonlyBox}>
                  <Text style={{ color: theme.text }}>
                    {mandiName || (mandiId ? `#${mandiId}` : '-')}
                  </Text>
                </View>

                {/* Scheduled At */}
                <Text style={[styles.label, { color: theme.text }]}>
                  {t('scheduled_at_label') ?? 'Scheduled At'}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={[
                    styles.dateBtn,
                    { borderColor: theme.text },
                  ]}
                >
                  <Text
                    style={{
                      color: scheduledAt
                        ? theme.text
                        : '#9ca3af',
                    }}
                  >
                    {formatDateTime(scheduledAt)}
                  </Text>
                  <Text style={styles.calendarIcon}>📅</Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    value={scheduledAt ?? new Date()}
                    minimumDate={new Date()} // cannot pick past dates
                    onChange={onChangeDate}
                  />
                )}

                {/* Create button */}
                <TouchableOpacity
                  style={[
                    styles.submitBtn,
                    creating && { opacity: 0.7 },
                  ]}
                  onPress={handleCreateAuction}
                  disabled={creating}
                >
                  {creating ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitBtnText}>
                      {t('create_auction_btn') ?? 'Create Auction'}
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* AUCTION LIST */}
        {showAuctionList && (
          <View
            style={[
              styles.card,
              { borderColor: theme.text, backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('auction_schedule_title') ?? 'Auction Schedule'}
            </Text>

            {loadingAuctions ? (
              <ActivityIndicator style={{ marginTop: 10 }} />
            ) : auctions.length === 0 ? (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: theme.text }}>
                  {t('no_auctions') ?? 'No auctions scheduled yet'}
                </Text>
              </View>
            ) : (
              auctions.map((a: AuctionItem) => {
                const id = String(a.auctionId ?? a.AuctionId ?? '');
                const cropName =
                  a.cropName ?? a.CropName ?? '-';
                const officerName =
                  a.assignedOfficerName ??
                  a.AssignedOfficerName ??
                  '-';
                const status =
                  a.status ?? a.Status ?? '-';
                const schedRaw =
                  a.scheduledAt ?? a.ScheduledAt ?? '';
                const sched = schedRaw
                  ? new Date(schedRaw).toLocaleDateString()
                  : '-';

                return (
                  <View
                    key={id}
                    style={[
                      styles.auctionItem,
                      { borderColor: theme.text },
                    ]}
                  >
                    <Text
                      style={[
                        styles.auctionTitle,
                        { color: theme.text },
                      ]}
                    >
                      {cropName}
                    </Text>
                    <Text style={{ color: theme.text }}>
                      {t('assigned_officer_label') ??
                        'Assigned Officer'}
                      : {officerName}
                    </Text>
                    <Text style={{ color: theme.text }}>
                      {t('scheduled_at_label') ?? 'Scheduled At'}:{' '}
                      {sched}
                    </Text>
                    <Text
                      style={{
                        color:
                          status === 'scheduled'
                            ? '#2563eb'
                            : status === 'started'
                            ? '#16a34a'
                            : status === 'ended'
                            ? '#6b7280'
                            : theme.text,
                        marginTop: 4,
                        fontWeight: '700',
                      }}
                    >
                      {t('status') ?? 'Status'}: {status}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
  text: { fontSize: 16 },
  backText: { fontWeight: '700', fontSize: 16 },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#edf2f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  secondaryButton: {
    flex: 1,
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
  },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  readonlyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    borderColor: '#d1d5db',
  },
  dateBtn: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 20,
    marginLeft: 6,
  },
  submitBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitBtnText: { color: '#fff', fontWeight: '700' },

  auctionItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  auctionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
});

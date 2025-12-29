// // // // import React, { useState, useMemo } from 'react';
// // // // import { Text,StyleSheet,TouchableOpacity,View,TextInput,ScrollView,FlatList, Modal,Alert } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { RootStackParamList } from '../../App';

// // // // import { useTheme } from '../context/ThemeContext';
// // // // import { useLanguage } from '../context/LanguageContext';

// // // // type Farmer = {
// // // //   id: string;
// // // //   name: string;
// // // //   location: string;
// // // //   crop: string;
// // // //   landSize: number;
// // // // };

// // // // const registeredFarmers: Farmer[] = [
// // // //   { id: '1', name: 'Ramesh Kumar', location: 'Pune, Maharashtra', crop: 'Onion', landSize: 5 },
// // // //   { id: '2', name: 'Suresh Patil', location: 'Nashik, Maharashtra', crop: 'Potato', landSize: 7 },
// // // //   { id: '3', name: 'Vijay Singh', location: 'Solapur, Maharashtra', crop: 'Tomato', landSize: 4 },
// // // //   { id: '4', name: 'Prakash Rao', location: 'Pune, Maharashtra', crop: 'Wheat', landSize: 10 },
// // // // ];

// // // // const cropDistribution = [
// // // //   { name: 'Onion', value: 350, farmers: 45 },
// // // //   { name: 'Potato', value: 420, farmers: 62 },
// // // //   { name: 'Tomato', value: 280, farmers: 38 },
// // // //   { name: 'Wheat', value: 550, farmers: 78 },
// // // //   { name: 'Rice', value: 380, farmers: 51 },
// // // // ];

// // // // export default function AnchorDashboard() {
// // // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// // // //   const { theme } = useTheme();
// // // //   const { t } = useLanguage();

// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [showBulkModal, setShowBulkModal] = useState(false);

// // // //   const [newFarmer, setNewFarmer] = useState({
// // // //     name: '',
// // // //     phone: '',
// // // //     location: '',
// // // //     crop: '',
// // // //     landSize: '',
// // // //   });

// // // //   const goBack = () => {
// // // //     navigation.navigate('Dashboard');
// // // //   };

// // // //   const filteredFarmers = useMemo(
// // // //     () =>
// // // //       registeredFarmers.filter(
// // // //         (farmer) =>
// // // //           farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //           farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
// // // //       ),
// // // //     [searchTerm]
// // // //   );

// // // //   const handleAddFarmer = () => {
// // // //     if (!newFarmer.name || !newFarmer.phone || !newFarmer.location || !newFarmer.crop || !newFarmer.landSize) {
// // // //       Alert.alert('Missing details', 'Please fill all the required fields.');
// // // //       return;
// // // //     }

// // // //     // In production, send to API and update list
// // // //     Alert.alert('Success', 'Farmer registered (demo only).');
// // // //     setNewFarmer({
// // // //       name: '',
// // // //       phone: '',
// // // //       location: '',
// // // //       crop: '',
// // // //       landSize: '',
// // // //     });
// // // //     setShowAddModal(false);
// // // //   };

// // // //   const handleBulkImport = () => {
// // // //     // In production, handle CSV/Excel upload & API call
// // // //     Alert.alert('Import', 'Bulk import triggered (demo only).');
// // // //     setShowBulkModal(false);
// // // //   };

// // // //   const totalFarmers = 274;
// // // //   const totalVolume = '1,980 Q';
// // // //   const activeTransactions = 48;
// // // //   const totalLand = '1,458';

// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // // //       {/* Header */}
// // // //       <View style={styles.header}>
// // // //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // // //           <Text style={styles.backText}>{t('back')}</Text>
// // // //         </TouchableOpacity>
// // // //         <View>
// // // //           <Text style={[styles.appTitle, { color: theme.primary || '#4f46e5' }]}>
// // // //             {t('anchor_dashboard') || 'Anchor Dashboard'}
// // // //           </Text>
// // // //           <Text style={[styles.appSubtitle, { color: theme.text || '#4b5563' }]}>
// // // //             AgriConnect Solutions Pvt. Ltd.
// // // //           </Text>
// // // //         <Text style={[styles.bottomMsg, { color: theme.text }]}>
// // // //           {t('anchor_msg')}
// // // //         </Text>
// // // //         </View>
// // // //       </View>

// // // //       {/* Main content */}
// // // //       <ScrollView
// // // //         contentContainerStyle={styles.scrollContent}
// // // //         showsVerticalScrollIndicator={false}
// // // //       >
// // // //         {/* Stats Cards */}
// // // //         <View style={styles.statsRow}>
// // // //           <View style={[styles.card, styles.cardIndigo]}>
// // // //             <Text style={styles.cardIcon}>🚜</Text>
// // // //             <Text style={styles.cardLabel}>{t('anchor_stats_registered_farmers')}</Text>
// // // //             <Text style={[styles.cardValue, { color: '#4f46e5' }]}>{totalFarmers}</Text>
// // // //           </View>

// // // //           <View style={[styles.card, styles.cardGreen]}>
// // // //             <Text style={styles.cardIcon}>📦</Text>
// // // //             <Text style={styles.cardLabel}>{t('anchor_stats_total_crop_volume')} </Text>
// // // //             <Text style={[styles.cardValue, { color: '#059669' }]}>{totalVolume}</Text>
// // // //           </View>

// // // //           <View style={[styles.card, styles.cardOrange]}>
// // // //             <Text style={styles.cardIcon}>📈</Text>
// // // //             <Text style={styles.cardLabel}>{t('anchor_stats_active_transactions')}</Text>
// // // //             <Text style={[styles.cardValue, { color: '#ea580c' }]}>{activeTransactions}</Text>
// // // //           </View>

// // // //           <View style={[styles.card, styles.cardPurple]}>
// // // //             <Text style={styles.cardIcon}>👨‍🌾</Text>
// // // //             <Text style={styles.cardLabel}>{t('anchor_stats_total_land')}</Text>
// // // //             <Text style={[styles.cardValue, { color: '#7c3aed' }]}>{totalLand}</Text>
// // // //           </View>
// // // //         </View>

// // // //         {/* Action Buttons */}
// // // //         <View style={styles.actionsRow}>
// // // //           <TouchableOpacity
// // // //             style={[styles.primaryBtn, { backgroundColor: theme.primary || '#4f46e5' }]}
// // // //             onPress={() => setShowAddModal(true)}
// // // //           >
// // // //             <Text style={styles.primaryBtnText}>{t('anchor_action_register_single_farmer')}</Text>
// // // //           </TouchableOpacity>

// // // //           <TouchableOpacity
// // // //             style={styles.secondaryBtn}
// // // //             onPress={() => setShowBulkModal(true)}
// // // //           >
// // // //             <Text style={styles.secondaryBtnText}>{t('anchor_action_bulk_import_farmers')}</Text>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         {/* Farmers List */}
// // // //         <View style={styles.sectionCard}>
// // // //           <Text style={styles.sectionTitle}>{t('anchor_section_registered_farmers')}</Text>
// // // //           <View style={styles.searchBox}>
// // // //             <TextInput
// // // //               placeholder={t('anchor_search_placeholder')}
// // // //               placeholderTextColor="#9ca3af"
// // // //               value={searchTerm}
// // // //               onChangeText={setSearchTerm}
// // // //               style={styles.searchInput}
// // // //             />
// // // //           </View>

// // // //           <FlatList
// // // //             data={filteredFarmers}
// // // //             keyExtractor={(item) => item.id}
// // // //             style={{ marginTop: 8 }}
// // // //             renderItem={({ item }) => (
// // // //               <View style={styles.farmerItem}>
// // // //                 <View style={{ flex: 1 }}>
// // // //                   <Text style={[styles.farmerName, { color: theme.text }]}>{item.name}</Text>
// // // //                   <Text style={styles.farmerLocation}>{item.location}</Text>
// // // //                   <Text style={styles.farmerMeta}>
// // // //                     Crop: {item.crop} • Land: {item.landSize} acres
// // // //                   </Text>
// // // //                 </View>
// // // //                 <TouchableOpacity style={styles.outlineBtn}>
// // // //                   <Text style={styles.outlineBtnText}>{t('anchor_btn_view_farmer')}</Text>
// // // //                 </TouchableOpacity>
// // // //               </View>
// // // //             )}
// // // //           />
// // // //         </View>

// // // //         {/* Analytics */}
// // // //         <View style={styles.analyticsRow}>
// // // //           {/* Crop Distribution (Simple bar view) */}
// // // //           <View style={styles.sectionCardHalf}>
// // // //             <Text style={styles.sectionTitle}>{t('anchor_section_crop_distribution_title')}</Text>
// // // //             <View style={{ marginTop: 10 }}>
// // // //               {cropDistribution.map((crop) => {
// // // //                 const maxValue = 550; // from data
// // // //                 const widthPercent = `${(crop.value / maxValue) * 100}%`;
// // // //                 return (
// // // //                   <View key={crop.name} style={{ marginBottom: 8 }}>
// // // //                     <View style={styles.analyticsLabelRow}>
// // // //                       <Text style={styles.analyticsLabel}>{crop.name}</Text>
// // // //                       <Text style={styles.analyticsValue}>{crop.value} Q</Text>
// // // //                     </View>
// // // //                     <View style={styles.progressBg}>
// // // //                       <View style={[styles.progressBar]} />
// // // //                     </View>
// // // //                   </View>
// // // //                 );
// // // //               })}
// // // //             </View>
// // // //           </View>

// // // //           {/* Farmers by Crop Type (Simple proportional view) */}
// // // //           <View style={styles.sectionCardHalf}>
// // // //             <Text style={styles.sectionTitle}>{t('anchor_section_farmers_by_crop_type_title')}</Text>
// // // //             <View style={{ marginTop: 10 }}>
// // // //               {cropDistribution.map((crop) => {
// // // //                 const maxFarmers = 78;
// // // //                 const widthPercent = `${(crop.farmers / maxFarmers) * 100}%`;
// // // //                 return (
// // // //                   <View key={crop.name} style={{ marginBottom: 8 }}>
// // // //                     <View style={styles.analyticsLabelRow}>
// // // //                       <Text style={styles.analyticsLabel}>{crop.name}</Text>
// // // //                       <Text style={styles.analyticsValue}>{crop.farmers}</Text>
// // // //                     </View>
// // // //                     <View style={styles.progressBgAlt}>
// // // //                       <View style={[styles.progressBarAlt]} />
// // // //                     </View>
// // // //                   </View>
// // // //                 );
// // // //               })}
// // // //             </View>
// // // //           </View>
// // // //         </View>
// // // //       </ScrollView>

// // // //       {/* Register Single Farmer Modal */}
// // // //       <Modal
// // // //         visible={showAddModal}
// // // //         animationType="slide"
// // // //         transparent
// // // //         onRequestClose={() => setShowAddModal(false)}
// // // //       >
// // // //         <View style={styles.modalOverlay}>
// // // //           <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
// // // //             <Text style={styles.modalTitle}>{t('anchor_modal_register_farmer_title')}</Text>
// // // //             <Text style={styles.modalSubtitle}>{t('anchor_modal_register_farmer_description')}</Text>

// // // //             <ScrollView
// // // //               showsVerticalScrollIndicator={false}
// // // //               contentContainerStyle={{ paddingBottom: 16 }}
// // // //             >
// // // //               <View style={styles.modalField}>
// // // //                 <Text style={styles.fieldLabel}>{t('anchor_label_farmer_name')}</Text>
// // // //                 <TextInput
// // // //                   style={styles.fieldInput}
// // // //                   placeholder={t('anchor_placeholder_farmer_name')} 
// // // //                   value={newFarmer.name}
// // // //                   onChangeText={(text) => setNewFarmer({ ...newFarmer, name: text })}
// // // //                 />
// // // //               </View>

// // // //               <View style={styles.modalField}>
// // // //                 <Text style={styles.fieldLabel}>{t('anchor_label_phone_number')}</Text>
// // // //                 <TextInput
// // // //                   style={styles.fieldInput}
// // // //                   placeholder={t('anchor_placeholder_phone_number')}
// // // //                   keyboardType="phone-pad"
// // // //                   value={newFarmer.phone}
// // // //                   onChangeText={(text) => setNewFarmer({ ...newFarmer, phone: text })}
// // // //                 />
// // // //               </View>

// // // //               <View style={styles.modalField}>
// // // //                 <Text style={styles.fieldLabel}>{t('anchor_label_location')}</Text>
// // // //                 <TextInput
// // // //                   style={styles.fieldInput}
// // // //                   placeholder={t('anchor_placeholder_location')}
// // // //                   value={newFarmer.location}
// // // //                   onChangeText={(text) => setNewFarmer({ ...newFarmer, location: text })}
// // // //                 />
// // // //               </View>

// // // //               <View style={styles.modalField}>
// // // //                 <Text style={styles.fieldLabel}>{t('anchor_label_primary_crop')}</Text>
// // // //                 <TextInput
// // // //                   style={styles.fieldInput}
// // // //                   placeholder={t('anchor_placeholder_primary_crop')}
// // // //                   value={newFarmer.crop}
// // // //                   onChangeText={(text) => setNewFarmer({ ...newFarmer, crop: text })}
// // // //                 />
// // // //               </View>

// // // //               <View style={styles.modalField}>
// // // //                 <Text style={styles.fieldLabel}>{t('anchor_label_land_size')}</Text>
// // // //                 <TextInput
// // // //                   style={styles.fieldInput}
// // // //                   placeholder={t('anchor_placeholder_land_size')}
// // // //                   keyboardType="numeric"
// // // //                   value={newFarmer.landSize}
// // // //                   onChangeText={(text) => setNewFarmer({ ...newFarmer, landSize: text })}
// // // //                 />
// // // //               </View>

// // // //               <TouchableOpacity
// // // //                 onPress={handleAddFarmer}
// // // //                 style={[styles.primaryBtn, { marginTop: 12, backgroundColor: theme.primary || '#4f46e5' }]}
// // // //               >
// // // //                 <Text style={styles.primaryBtnText}>{t('anchor_btn_register_farmer')}</Text>
// // // //               </TouchableOpacity>

// // // //               <TouchableOpacity
// // // //                 onPress={() => setShowAddModal(false)}
// // // //                 style={[styles.secondaryBtnPlain, { marginTop: 8 }]}
// // // //               >
// // // //                 <Text style={[styles.secondaryBtnPlainText, { color: theme.primary || '#4f46e5' }]}>
// // // //                   {t('anchor_btn_cancel')}
// // // //                 </Text>
// // // //               </TouchableOpacity>
// // // //             </ScrollView>
// // // //           </View>
// // // //         </View>
// // // //       </Modal>

// // // //       {/* Bulk Import Modal */}
// // // //       <Modal
// // // //         visible={showBulkModal}
// // // //         animationType="slide"
// // // //         transparent
// // // //         onRequestClose={() => setShowBulkModal(false)}
// // // //       >
// // // //         <View style={styles.modalOverlay}>
// // // //           <View style={[styles.modalContentLarge, { backgroundColor: theme.background }]}>
// // // //             <Text style={styles.modalTitle}>{t('anchor_modal_bulk_import_title')}</Text>
// // // //             <Text style={styles.modalSubtitle}>
// // // //               {t('anchor_modal_bulk_import_description')}
// // // //             </Text>

// // // //             <ScrollView
// // // //               showsVerticalScrollIndicator={false}
// // // //               contentContainerStyle={{ paddingBottom: 16 }}
// // // //             >
// // // //               {/* Instructions */}
// // // //               <View style={styles.infoBox}>
// // // //                 <Text style={styles.infoTitle}>{t('anchor_import_instructions_title')}</Text>
// // // //                 <Text style={styles.infoText}>{t('anchor_import_instructions_line1')}</Text>
// // // //                 <Text style={styles.infoText}>
// // // //                  {t('anchor_import_instructions_line2')}
// // // //                 </Text>
// // // //                 <Text style={styles.infoText}>{t('anchor_import_instructions_line3')}</Text>
// // // //               </View>

// // // //               {/* File Upload Placeholder */}
// // // //               <View style={styles.uploadBox}>
// // // //                 <Text style={styles.uploadIcon}>⬆</Text>
// // // //                 <Text style={styles.uploadTitle}>Select CSV / Excel file</Text>
// // // //                 <Text style={styles.uploadSubtitle}>Mobile file picker integration goes here</Text>
// // // //               </View>

// // // //               {/* Import Stats Preview */}
// // // //               <View style={styles.importStatsRow}>
// // // //                 <View style={[styles.importStatCard, { backgroundColor: '#ecfdf3', borderColor: '#bbf7d0' }]}>
// // // //                   <Text style={[styles.importStatLabel, { color: '#15803d' }]}>{t('anchor_import_stat_farmers_label')}</Text>
// // // //                   <Text style={[styles.importStatValue, { color: '#166534' }]}>{t('anchor_import_stat_farmers_value')}</Text>
// // // //                 </View>
// // // //                 <View style={[styles.importStatCard, { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }]}>
// // // //                   <Text style={[styles.importStatLabel, { color: '#1d4ed8' }]}>{t('anchor_import_stat_buyers_label')}</Text>
// // // //                   <Text style={[styles.importStatValue, { color: '#1d4ed8' }]}>{t('anchor_import_stat_buyers_value')}</Text>
// // // //                 </View>
// // // //                 <View style={[styles.importStatCard, { backgroundColor: '#fffbeb', borderColor: '#fef3c7' }]}>
// // // //                   <Text style={[styles.importStatLabel, { color: '#d97706' }]}>{t('anchor_import_stat_sellers_label')}</Text>
// // // //                   <Text style={[styles.importStatValue, { color: '#b45309' }]}>{t('anchor_import_stat_sellers_value')}</Text>
// // // //                 </View>
// // // //               </View>

// // // //               <TouchableOpacity
// // // //                 onPress={handleBulkImport}
// // // //                 style={[styles.primaryBtn, { marginTop: 16, backgroundColor: theme.primary || '#4f46e5' }]}
// // // //               >
// // // //                 <Text style={styles.primaryBtnText}>{t('anchor_btn_import_all_users')}</Text>
// // // //               </TouchableOpacity>

// // // //               <TouchableOpacity
// // // //                 onPress={() => setShowBulkModal(false)}
// // // //                 style={[styles.secondaryBtnPlain, { marginTop: 8 }]}
// // // //               >
// // // //                 <Text style={[styles.secondaryBtnPlainText, { color: theme.primary || '#4f46e5' }]}>
// // // //                   {t('anchor_btn_close')}
// // // //                 </Text>
// // // //               </TouchableOpacity>
// // // //             </ScrollView>
// // // //           </View>
// // // //         </View>
// // // //       </Modal>
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1 },
// // // //   header: {
// // // //     paddingHorizontal: 20,
// // // //     paddingTop: 10,
// // // //     paddingBottom: 6,
// // // //   },
// // // //   backBtn: {
// // // //     alignSelf: 'flex-start',
// // // //     backgroundColor: '#edf2f7',
// // // //     paddingVertical: 6,
// // // //     paddingHorizontal: 12,
// // // //     borderRadius: 6,
// // // //     marginBottom: 10,
// // // //   },
// // // //   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },
// // // //   appTitle: { fontSize: 24, fontWeight: '700' },
// // // //   appSubtitle: { fontSize: 13, marginTop: 2 },

// // // //   scrollContent: {
// // // //     paddingHorizontal: 20,
// // // //     paddingBottom: 24,
// // // //   },

// // // //   // Stats cards
// // // //   statsRow: {
// // // //     flexDirection: 'row',
// // // //     flexWrap: 'wrap',
// // // //     gap: 10,
// // // //     marginTop: 8,
// // // //   },
// // // //   card: {
// // // //     flexBasis: '48%',
// // // //     borderRadius: 12,
// // // //     padding: 12,
// // // //     marginBottom: 8,
// // // //     backgroundColor: '#fff',
// // // //     borderWidth: 1,
// // // //   },
// // // //   cardIndigo: { borderColor: '#e0e7ff' },
// // // //   cardGreen: { borderColor: '#bbf7d0' },
// // // //   cardOrange: { borderColor: '#fed7aa' },
// // // //   cardPurple: { borderColor: '#e9d5ff' },
// // // //   cardIcon: {
// // // //     fontSize: 22,
// // // //     marginBottom: 6,
// // // //   },
// // // //   cardLabel: {
// // // //     fontSize: 12,
// // // //     color: '#6b7280',
// // // //   },
// // // //   cardValue: {
// // // //     fontSize: 18,
// // // //     fontWeight: '700',
// // // //     marginTop: 2,
// // // //   },

// // // //   // Buttons
// // // //   actionsRow: {
// // // //     flexDirection: 'row',
// // // //     marginTop: 12,
// // // //     marginBottom: 12,
// // // //     gap: 10,
// // // //   },
// // // //   primaryBtn: {
// // // //     flex: 1,
// // // //     borderRadius: 999,
// // // //     paddingVertical: 10,
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //   },
// // // //   primaryBtnText: {
// // // //     color: '#fff',
// // // //     fontWeight: '600',
// // // //     fontSize: 14,
// // // //   },
// // // //   secondaryBtn: {
// // // //     flex: 1,
// // // //     borderRadius: 999,
// // // //     paddingVertical: 10,
// // // //     borderWidth: 1,
// // // //     borderColor: '#c7d2fe',
// // // //     backgroundColor: '#eef2ff',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //   },
// // // //   secondaryBtnText: {
// // // //     color: '#4f46e5',
// // // //     fontWeight: '500',
// // // //     fontSize: 13,
// // // //   },

// // // //   // Section cards
// // // //   sectionCard: {
// // // //     backgroundColor: '#fff',
// // // //     borderRadius: 12,
// // // //     borderWidth: 1,
// // // //     borderColor: '#e5e7eb',
// // // //     padding: 12,
// // // //     marginTop: 6,
// // // //   },
// // // //   sectionTitle: {
// // // //     fontSize: 16,
// // // //     fontWeight: '600',
// // // //     marginBottom: 4,
// // // //   },

// // // //   searchBox: {
// // // //     marginTop: 6,
// // // //     marginBottom: 4,
// // // //   },
// // // //   searchInput: {
// // // //     borderRadius: 999,
// // // //     backgroundColor: '#f3f4f6',
// // // //     paddingVertical: 8,
// // // //     paddingHorizontal: 14,
// // // //     fontSize: 13,
// // // //     color: '#111827',
// // // //   },

// // // //   farmerItem: {
// // // //     marginTop: 8,
// // // //     padding: 10,
// // // //     borderRadius: 10,
// // // //     borderWidth: 1,
// // // //     borderColor: '#e5e7eb',
// // // //     backgroundColor: '#f9fafb',
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     gap: 8,
// // // //   },
// // // //   farmerName: {
// // // //     fontSize: 14,
// // // //     fontWeight: '600',
// // // //   },
// // // //   farmerLocation: {
// // // //     fontSize: 12,
// // // //     color: '#4b5563',
// // // //   },
// // // //   farmerMeta: {
// // // //     fontSize: 12,
// // // //     color: '#6b7280',
// // // //     marginTop: 2,
// // // //   },
// // // //   outlineBtn: {
// // // //     borderRadius: 999,
// // // //     borderWidth: 1,
// // // //     borderColor: '#d1d5db',
// // // //     paddingVertical: 6,
// // // //     paddingHorizontal: 10,
// // // //   },
// // // //   outlineBtnText: {
// // // //     fontSize: 12,
// // // //     color: '#111827',
// // // //     fontWeight: '500',
// // // //   },

// // // //   // Analytics
// // // //   analyticsRow: {
// // // //     flexDirection: 'row',
// // // //     flexWrap: 'wrap',
// // // //     gap: 10,
// // // //     marginTop: 12,
// // // //   },
// // // //   sectionCardHalf: {
// // // //     flexBasis: '48%',
// // // //     backgroundColor: '#fff',
// // // //     borderRadius: 12,
// // // //     borderWidth: 1,
// // // //     borderColor: '#e5e7eb',
// // // //     padding: 12,
// // // //   },
// // // //   analyticsLabelRow: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'space-between',
// // // //   },
// // // //   analyticsLabel: {
// // // //     fontSize: 12,
// // // //     color: '#4b5563',
// // // //   },
// // // //   analyticsValue: {
// // // //     fontSize: 12,
// // // //     color: '#111827',
// // // //     fontWeight: '500',
// // // //   },
// // // //   progressBg: {
// // // //     marginTop: 3,
// // // //     height: 8,
// // // //     borderRadius: 999,
// // // //     backgroundColor: '#e0e7ff',
// // // //     overflow: 'hidden',
// // // //   },
// // // //   progressBar: {
// // // //     height: '100%',
// // // //     borderRadius: 999,
// // // //     backgroundColor: '#4f46e5',
// // // //   },
// // // //   progressBgAlt: {
// // // //     marginTop: 3,
// // // //     height: 8,
// // // //     borderRadius: 999,
// // // //     backgroundColor: '#fee2e2',
// // // //     overflow: 'hidden',
// // // //   },
// // // //   progressBarAlt: {
// // // //     height: '100%',
// // // //     borderRadius: 999,
// // // //     backgroundColor: '#f97316',
// // // //   },

// // // //   bottomMsg: {
// // // //     fontSize: 13,
// // // //     marginTop: 18,
// // // //     marginBottom: 8,
// // // //     textAlign: 'center',
// // // //   },

// // // //   // Modals
// // // //   modalOverlay: {
// // // //     flex: 1,
// // // //     backgroundColor: 'rgba(15,23,42,0.4)',
// // // //     justifyContent: 'center',
// // // //     paddingHorizontal: 16,
// // // //   },
// // // //   modalContent: {
// // // //     borderRadius: 16,
// // // //     padding: 16,
// // // //     maxHeight: '85%',
// // // //   },
// // // //   modalContentLarge: {
// // // //     borderRadius: 16,
// // // //     padding: 16,
// // // //     maxHeight: '90%',
// // // //   },
// // // //   modalTitle: {
// // // //     fontSize: 18,
// // // //     fontWeight: '700',
// // // //     marginBottom: 4,
// // // //   },
// // // //   modalSubtitle: {
// // // //     fontSize: 13,
// // // //     color: '#4b5563',
// // // //     marginBottom: 10,
// // // //   },
// // // //   modalField: {
// // // //     marginBottom: 8,
// // // //   },
// // // //   fieldLabel: {
// // // //     fontSize: 12,
// // // //     color: '#4b5563',
// // // //     marginBottom: 3,
// // // //   },
// // // //   fieldInput: {
// // // //     borderRadius: 8,
// // // //     borderWidth: 1,
// // // //     borderColor: '#e5e7eb',
// // // //     paddingHorizontal: 10,
// // // //     paddingVertical: 8,
// // // //     fontSize: 13,
// // // //     color: '#111827',
// // // //     backgroundColor: '#f9fafb',
// // // //   },

// // // //   secondaryBtnPlain: {
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //     paddingVertical: 6,
// // // //   },
// // // //   secondaryBtnPlainText: {
// // // //     fontSize: 13,
// // // //     fontWeight: '500',
// // // //   },

// // // //   // Bulk import helpers
// // // //   infoBox: {
// // // //     borderRadius: 10,
// // // //     padding: 10,
// // // //     backgroundColor: '#eef2ff',
// // // //     borderWidth: 1,
// // // //     borderColor: '#e0e7ff',
// // // //     marginTop: 8,
// // // //   },
// // // //   infoTitle: {
// // // //     fontSize: 13,
// // // //     fontWeight: '600',
// // // //     marginBottom: 4,
// // // //     color: '#1e3a8a',
// // // //   },
// // // //   infoText: {
// // // //     fontSize: 12,
// // // //     color: '#1d4ed8',
// // // //     marginBottom: 2,
// // // //   },
// // // //   uploadBox: {
// // // //     marginTop: 10,
// // // //     borderRadius: 10,
// // // //     borderWidth: 1,
// // // //     borderStyle: 'dashed',
// // // //     borderColor: '#c7d2fe',
// // // //     paddingVertical: 20,
// // // //     alignItems: 'center',
// // // //     backgroundColor: '#f9fafb',
// // // //   },
// // // //   uploadIcon: {
// // // //     fontSize: 24,
// // // //     marginBottom: 6,
// // // //     color: '#4f46e5',
// // // //   },
// // // //   uploadTitle: {
// // // //     fontSize: 13,
// // // //     fontWeight: '600',
// // // //     color: '#111827',
// // // //   },
// // // //   uploadSubtitle: {
// // // //     fontSize: 12,
// // // //     color: '#6b7280',
// // // //     marginTop: 2,
// // // //   },
// // // //   importStatsRow: {
// // // //     flexDirection: 'row',
// // // //     gap: 8,
// // // //     marginTop: 10,
// // // //   },
// // // //   importStatCard: {
// // // //     flex: 1,
// // // //     borderRadius: 10,
// // // //     borderWidth: 1,
// // // //     paddingVertical: 10,
// // // //     alignItems: 'center',
// // // //   },
// // // //   importStatLabel: {
// // // //     fontSize: 12,
// // // //     marginBottom: 2,
// // // //   },
// // // //   importStatValue: {
// // // //     fontSize: 14,
// // // //     fontWeight: '700',
// // // //   },
// // // // });

// // // import React, { useState, useMemo, useEffect } from 'react';
// // // import {
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   View,
// // //   TextInput,
// // //   ScrollView,
// // //   FlatList,
// // //   Modal,
// // //   Alert,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation } from '@react-navigation/native';
// // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '../../App';

// // // import { useTheme } from '../context/ThemeContext';
// // // import { useLanguage } from '../context/LanguageContext';
// // // import api from '../services/api';

// // // type Farmer = {
// // //   id: string;
// // //   name: string;
// // //   location: string;
// // //   crop: string;
// // //   landSize: number;
// // // };

// // // const cropDistribution = [
// // //   { name: 'Onion', value: 350, farmers: 45 },
// // //   { name: 'Potato', value: 420, farmers: 62 },
// // //   { name: 'Tomato', value: 280, farmers: 38 },
// // //   { name: 'Wheat', value: 550, farmers: 78 },
// // //   { name: 'Rice', value: 380, farmers: 51 },
// // // ];

// // // export default function AnchorDashboard() {
// // //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //   const { theme } = useTheme();
// // //   const { t } = useLanguage();

// // //   const [registeredFarmers, setRegisteredFarmers] = useState<Farmer[]>([]);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [showBulkModal, setShowBulkModal] = useState(false);

// // //   const [newFarmer, setNewFarmer] = useState({
// // //     name: '',
// // //     phone: '',
// // //     location: '',
// // //     crop: '',
// // //     landSize: '',
// // //   });

// // //   const goBack = () => navigation.navigate('Dashboard');

// // //   //  Load farmers from backend
// // //   const loadFarmers = async () => {
// // //     try {
// // //       const res = await api.get('/anchor/farmers');

// // //       const mapped: Farmer[] = res.data.map((f: any) => ({
// // //         id: f.farmerId,
// // //         name: f.farmerName,
// // //         location: f.location,
// // //         crop: f.interestedCrops?.join(', ') ?? '-',
// // //         landSize: f.totalFarms ?? 0,
// // //       }));

// // //       setRegisteredFarmers(mapped);
// // //     } catch (e) {
// // //       console.warn('Failed to load farmers', e);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadFarmers();
// // //   }, []);

// // //   const filteredFarmers = useMemo(
// // //     () =>
// // //       registeredFarmers.filter(
// // //         (f) =>
// // //           f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //           f.location.toLowerCase().includes(searchTerm.toLowerCase())
// // //       ),
// // //     [searchTerm, registeredFarmers]
// // //   );

// // //   //  REGISTER SINGLE FARMER 
// // //   const handleAddFarmer = async () => {
// // //     if (
// // //       !newFarmer.name ||
// // //       !newFarmer.phone ||
// // //       !newFarmer.location ||
// // //       !newFarmer.crop ||
// // //       !newFarmer.landSize
// // //     ) {
// // //       Alert.alert(t('error_title') ?? 'Error', 'Please fill all fields');
// // //       return;
// // //     }

// // //     try {
// // //       await api.post('/anchor/farmer/register-single', {
// // //         farmerName: newFarmer.name,
// // //         mobileNumber: newFarmer.phone,
// // //         location: newFarmer.location,
// // //         interestedCrops: [newFarmer.crop],
// // //         farms: [
// // //           {
// // //             farmLocation: newFarmer.location,
// // //             primaryCrop: newFarmer.crop,
// // //             farmSize: Number(newFarmer.landSize),
// // //           },
// // //         ],
// // //       });

// // //       Alert.alert(
// // //         t('success_title') ?? 'Success',
// // //         t('anchor_farmer_registered_success') ?? 'Farmer registered successfully'
// // //       );

// // //       setNewFarmer({
// // //         name: '',
// // //         phone: '',
// // //         location: '',
// // //         crop: '',
// // //         landSize: '',
// // //       });

// // //       setShowAddModal(false);
// // //       loadFarmers(); //  refresh list
// // //     } catch (error: any) {
// // //       Alert.alert(
// // //         t('error_title') ?? 'Error',
// // //         error?.response?.data?.message ?? 'Farmer registration failed'
// // //       );
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // //       {/* Header */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={goBack} style={styles.backBtn}>
// // //           <Text style={styles.backText}>{t('back')}</Text>
// // //         </TouchableOpacity>
// // //         <View>
// // //           <Text style={[styles.appTitle, { color: theme.primary || '#46e54eff' }]}>
// // //             {t('anchor_dashboard') || 'Anchor Dashboard'}
// // //           </Text>
// // //           <Text style={[styles.appSubtitle, { color: theme.text }]}>
// // //             AgriConnect Solutions Pvt. Ltd.
// // //           </Text>
// // //           <Text style={[styles.bottomMsg, { color: theme.text }]}>
// // //             {t('anchor_msg')}
// // //           </Text>
// // //         </View>
// // //       </View>

// // //       <ScrollView contentContainerStyle={styles.scrollContent}>
// // //         {/* Actions */}
// // //         <View style={styles.actionsRow}>
// // //           <TouchableOpacity
// // //             style={[styles.primaryBtn, { backgroundColor: theme.primary || '#4f46e5' }]}
// // //             onPress={() => setShowAddModal(true)}
// // //           >
// // //             <Text style={styles.primaryBtnText}>
// // //               {t('anchor_action_register_single_farmer')}
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* Farmers List */}
// // //         <View style={styles.sectionCard}>
// // //           <Text style={styles.sectionTitle}>
// // //             {t('anchor_section_registered_farmers')}
// // //           </Text>

// // //           <TextInput
// // //             placeholder={t('anchor_search_placeholder')}
// // //             value={searchTerm}
// // //             onChangeText={setSearchTerm}
// // //             style={styles.searchInput}
// // //           />

// // //           <FlatList
// // //             data={filteredFarmers}
// // //             keyExtractor={(item) => item.id}
// // //             renderItem={({ item }) => (
// // //               <View style={styles.farmerItem}>
// // //                 <View style={{ flex: 1 }}>
// // //                   <Text style={[styles.farmerName, { color: theme.text }]}>
// // //                     {item.name}
// // //                   </Text>
// // //                   <Text style={styles.farmerLocation}>{item.location}</Text>
// // //                   <Text style={styles.farmerMeta}>
// // //                     Crop: {item.crop} • Farms: {item.landSize}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             )}
// // //           />
// // //         </View>
// // //       </ScrollView>

// // //       {/* REGISTER SINGLE FARMER MODAL */}
// // //       <Modal visible={showAddModal} animationType="slide" transparent>
// // //         <View style={styles.modalOverlay}>
// // //           <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
// // //             <Text style={styles.modalTitle}>
// // //               {t('anchor_modal_register_farmer_title')}
// // //             </Text>

// // //             <TextInput
// // //               placeholder={t('anchor_placeholder_farmer_name')}
// // //               style={styles.fieldInput}
// // //               value={newFarmer.name}
// // //               onChangeText={(v) => setNewFarmer({ ...newFarmer, name: v })}
// // //             />

// // //             <TextInput
// // //               placeholder={t('anchor_placeholder_phone_number')}
// // //               style={styles.fieldInput}
// // //               keyboardType="phone-pad"
// // //               value={newFarmer.phone}
// // //               onChangeText={(v) => setNewFarmer({ ...newFarmer, phone: v })}
// // //             />

// // //             <TextInput
// // //               placeholder={t('anchor_placeholder_location')}
// // //               style={styles.fieldInput}
// // //               value={newFarmer.location}
// // //               onChangeText={(v) => setNewFarmer({ ...newFarmer, location: v })}
// // //             />

// // //             <TextInput
// // //               placeholder={t('anchor_placeholder_primary_crop')}
// // //               style={styles.fieldInput}
// // //               value={newFarmer.crop}
// // //               onChangeText={(v) => setNewFarmer({ ...newFarmer, crop: v })}
// // //             />

// // //             <TextInput
// // //               placeholder={t('anchor_placeholder_land_size')}
// // //               style={styles.fieldInput}
// // //               keyboardType="numeric"
// // //               value={newFarmer.landSize}
// // //               onChangeText={(v) => setNewFarmer({ ...newFarmer, landSize: v })}
// // //             />

// // //             <TouchableOpacity
// // //               onPress={handleAddFarmer}
// // //               style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// // //             >
// // //               <Text style={styles.primaryBtnText}>
// // //                 {t('anchor_btn_register_farmer')}
// // //               </Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity onPress={() => setShowAddModal(false)}>
// // //               <Text style={{ textAlign: 'center', marginTop: 8 }}>
// // //                 {t('anchor_btn_cancel')}
// // //               </Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         </View>
// // //       </Modal>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1 },
// // //   header: { padding: 20 },
// // //   backBtn: { marginBottom: 10 },
// // //   backText: { fontWeight: '700', color: '#2b6cb0' },
// // //   appTitle: { fontSize: 24, fontWeight: '700' },
// // //   appSubtitle: { fontSize: 13 },
// // //   bottomMsg: { fontSize: 13, marginTop: 6 },
// // //   scrollContent: { padding: 20 },
// // //   actionsRow: { marginBottom: 10 },
// // //   primaryBtn: {
// // //     padding: 12,
// // //     borderRadius: 999,
// // //     alignItems: 'center',
// // //   },
// // //   primaryBtnText: { color: '#fff', fontWeight: '700' },
// // //   sectionCard: {
// // //     backgroundColor: '#fff',
// // //     padding: 12,
// // //     borderRadius: 12,
// // //   },
// // //   sectionTitle: { fontSize: 16, fontWeight: '600' },
// // //   searchInput: {
// // //     backgroundColor: '#f3f4f6',
// // //     borderRadius: 999,
// // //     padding: 10,
// // //     marginVertical: 8,
// // //   },
// // //   farmerItem: {
// // //     padding: 10,
// // //     borderBottomWidth: 1,
// // //     borderColor: '#e5e7eb',
// // //   },
// // //   farmerName: { fontWeight: '600' },
// // //   farmerLocation: { fontSize: 12 },
// // //   farmerMeta: { fontSize: 12 },
// // //   modalOverlay: {
// // //     flex: 1,
// // //     backgroundColor: 'rgba(0,0,0,0.4)',
// // //     justifyContent: 'center',
// // //     padding: 16,
// // //   },
// // //   modalContent: {
// // //     borderRadius: 16,
// // //     padding: 16,
// // //   },
// // //   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
// // //   fieldInput: {
// // //     borderWidth: 1,
// // //     borderColor: '#e5e7eb',
// // //     borderRadius: 8,
// // //     padding: 10,
// // //     marginBottom: 8,
// // //   },
// // // });

// // // // import React, { useEffect, useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   FlatList,
// // // //   TextInput,
// // // //   Modal,
// // // //   ScrollView,
// // // //   Alert,
// // // //   Platform,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { RootStackParamList } from '../../App';
// // // // import DocumentPicker from 'react-native-document-picker';
// // // // import RNFS from 'react-native-fs';

// // // // import api from '../services/api';
// // // // import { useTheme } from '../context/ThemeContext';
// // // // import { useLanguage } from '../context/LanguageContext';

// // // // type Nav = NativeStackNavigationProp<RootStackParamList>;

// // // // type Farmer = {
// // // //   farmerId: string;
// // // //   farmerName: string;
// // // //   location: string;
// // // //   totalFarms: number;
// // // //   interestedCrops: string[];
// // // // };

// // // // export default function AnchorDashboardScreen() {
// // // //   const navigation = useNavigation<Nav>();
// // // //   const { theme } = useTheme();
// // // //   const { t } = useLanguage();

// // // //   const [farmers, setFarmers] = useState<Farmer[]>([]);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [showBulkModal, setShowBulkModal] = useState(false);

// // // //   const [newFarmer, setNewFarmer] = useState({
// // // //     farmerName: '',
// // // //     mobileNumber: '',
// // // //     location: '',
// // // //     crop: '',
// // // //     farmSize: '',
// // // //   });

// // // //   /* ---------------------------------------------------- */
// // // //   /* LOAD FARMERS */
// // // //   /* ---------------------------------------------------- */
// // // //   const loadFarmers = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api.get('/anchor/farmers');
// // // //       setFarmers(res.data ?? []);
// // // //     } catch {
// // // //       Alert.alert('Error', 'Failed to load farmers');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     loadFarmers();
// // // //   }, []);

// // // //   /* ---------------------------------------------------- */
// // // //   /* REGISTER SINGLE FARMER */
// // // //   /* ---------------------------------------------------- */
// // // //   const registerSingleFarmer = async () => {
// // // //     const { farmerName, mobileNumber, location, crop, farmSize } = newFarmer;

// // // //     if (!farmerName || !mobileNumber || !location || !crop || !farmSize) {
// // // //       Alert.alert('Missing details', 'All fields are required');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await api.post('/anchor/farmer/register-single', {
// // // //         farmerName,
// // // //         mobileNumber,
// // // //         location,
// // // //         interestedCrops: [crop],
// // // //         farms: [
// // // //           {
// // // //             farmLocation: location,
// // // //             primaryCrop: crop,
// // // //             farmSize: Number(farmSize),
// // // //           },
// // // //         ],
// // // //       });

// // // //       Alert.alert('Success', 'Farmer registered');
// // // //       setShowAddModal(false);
// // // //       setNewFarmer({
// // // //         farmerName: '',
// // // //         mobileNumber: '',
// // // //         location: '',
// // // //         crop: '',
// // // //         farmSize: '',
// // // //       });
// // // //       loadFarmers();
// // // //     } catch (e: any) {
// // // //       Alert.alert('Error', e?.response?.data?.message ?? 'Registration failed');
// // // //     }
// // // //   };

// // // //   /* ---------------------------------------------------- */
// // // //   /* VIEW FARMER DETAIL */
// // // //   /* ---------------------------------------------------- */
// // // //   const viewFarmer = async (farmerId: string) => {
// // // //     try {
// // // //       const res = await api.get(`/anchor/farmers/${farmerId}`);
// // // //       Alert.alert(
// // // //         res.data.farmerName,
// // // //         `Location: ${res.data.location}\nCrops: ${res.data.interestedCrops.join(', ')}`
// // // //       );
// // // //     } catch {
// // // //       Alert.alert('Error', 'Failed to load farmer detail');
// // // //     }
// // // //   };

// // // //   /* ---------------------------------------------------- */
// // // //   /* DOWNLOAD TEMPLATE */
// // // //   /* ---------------------------------------------------- */
// // // //  const downloadTemplate = async (type: 'csv' | 'excel') => {
// // // //   try {
// // // //     const endpoint =
// // // //       type === 'csv'
// // // //         ? '/anchor/download-template/csv'
// // // //         : '/anchor/download-template/excel';

// // // //     const fileName =
// // // //       type === 'csv'
// // // //         ? 'anchor_farmers_template.csv'
// // // //         : 'anchor_farmers_template.xlsx';

// // // //     const path =
// // // //       Platform.OS === 'android'
// // // //         ? `${RNFS.DownloadDirectoryPath}/${fileName}`
// // // //         : `${RNFS.DocumentDirectoryPath}/${fileName}`;

// // // //     // ✅ SAFELY RESOLVE TOKEN AS STRING
// // // //     const authHeader = api.defaults.headers.common.Authorization;
// // // //     if (!authHeader || typeof authHeader !== 'string') {
// // // //       Alert.alert('Error', 'Authorization token missing');
// // // //       return;
// // // //     }

// // // //     await RNFS.downloadFile({
// // // //       fromUrl: `${api.defaults.baseURL}${endpoint}`,
// // // //       toFile: path,
// // // //       headers: {
// // // //         Authorization: authHeader, // ✅ now guaranteed string
// // // //       },
// // // //     }).promise;

// // // //     Alert.alert('Downloaded', fileName);
// // // //   } catch (error) {
// // // //     Alert.alert('Error', 'Template download failed');
// // // //   }
// // // // };

// // // //   /* ---------------------------------------------------- */
// // // //   /* BULK UPLOAD */
// // // //   /* ---------------------------------------------------- */
// // // //   const uploadBulkFile = async () => {
// // // //     try {
// // // //       const file = await DocumentPicker.pickSingle({
// // // //         type: [DocumentPicker.types.csv, DocumentPicker.types.xlsx],
// // // //       });

// // // //       const formData = new FormData();
// // // //       formData.append('File', {
// // // //         uri: file.uri,
// // // //         name: file.name,
// // // //         type: file.type,
// // // //       } as any);

// // // //       await api.post('/anchor/farmers/register-bulk', formData, {
// // // //         headers: { 'Content-Type': 'multipart/form-data' },
// // // //       });

// // // //       Alert.alert('Success', 'Bulk import completed');
// // // //       setShowBulkModal(false);
// // // //       loadFarmers();
// // // //     } catch (e: any) {
// // // //       if (!DocumentPicker.isCancel(e)) {
// // // //         Alert.alert('Error', 'Bulk upload failed');
// // // //       }
// // // //     }
// // // //   };

// // // //   /* ---------------------------------------------------- */
// // // //   /* UI */
// // // //   /* ---------------------------------------------------- */
// // // //   return (
// // // //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// // // //       <Text style={[styles.title, { color: theme.text }]}>Anchor Dashboard</Text>

// // // //       <View style={styles.actionsRow}>
// // // //         <TouchableOpacity
// // // //           style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// // // //           onPress={() => setShowAddModal(true)}
// // // //         >
// // // //           <Text style={styles.btnText}>Register Single Farmer</Text>
// // // //         </TouchableOpacity>

// // // //         <TouchableOpacity
// // // //           style={styles.secondaryBtn}
// // // //           onPress={() => setShowBulkModal(true)}
// // // //         >
// // // //           <Text style={styles.secondaryBtnText}>Bulk Import</Text>
// // // //         </TouchableOpacity>
// // // //       </View>

// // // //       <FlatList
// // // //         data={farmers}
// // // //         refreshing={loading}
// // // //         onRefresh={loadFarmers}
// // // //         keyExtractor={(item) => item.farmerId}
// // // //         renderItem={({ item }) => (
// // // //           <View style={styles.card}>
// // // //             <Text style={styles.name}>{item.farmerName}</Text>
// // // //             <Text style={styles.meta}>
// // // //               {item.location} • Farms: {item.totalFarms}
// // // //             </Text>
// // // //             <TouchableOpacity
// // // //               style={styles.viewBtn}
// // // //               onPress={() => viewFarmer(item.farmerId)}
// // // //             >
// // // //               <Text style={styles.viewText}>View</Text>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         )}
// // // //       />

// // // //       {/* SINGLE REGISTER MODAL */}
// // // //       <Modal visible={showAddModal} transparent animationType="slide">
// // // //         <View style={styles.modalOverlay}>
// // // //           <View style={styles.modal}>
// // // //             {['farmerName', 'mobileNumber', 'location', 'crop', 'farmSize'].map(
// // // //               (f) => (
// // // //                 <TextInput
// // // //                   key={f}
// // // //                   placeholder={f}
// // // //                   style={styles.input}
// // // //                   value={(newFarmer as any)[f]}
// // // //                   onChangeText={(v) =>
// // // //                     setNewFarmer((p) => ({ ...p, [f]: v }))
// // // //                   }
// // // //                 />
// // // //               )
// // // //             )}
// // // //             <TouchableOpacity
// // // //               style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// // // //               onPress={registerSingleFarmer}
// // // //             >
// // // //               <Text style={styles.btnText}>Register</Text>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         </View>
// // // //       </Modal>

// // // //       {/* BULK MODAL */}
// // // //       <Modal visible={showBulkModal} transparent animationType="slide">
// // // //         <View style={styles.modalOverlay}>
// // // //           <View style={styles.modal}>
// // // //             <TouchableOpacity onPress={() => downloadTemplate('csv')}>
// // // //               <Text style={styles.link}>Download CSV Template</Text>
// // // //             </TouchableOpacity>
// // // //             <TouchableOpacity onPress={() => downloadTemplate('excel')}>
// // // //               <Text style={styles.link}>Download Excel Template</Text>
// // // //             </TouchableOpacity>
// // // //             <TouchableOpacity
// // // //               style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// // // //               onPress={uploadBulkFile}
// // // //             >
// // // //               <Text style={styles.btnText}>Upload File</Text>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         </View>
// // // //       </Modal>
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // /* ---------------------------------------------------- */
// // // // /* STYLES */
// // // // /* ---------------------------------------------------- */
// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, padding: 16 },
// // // //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// // // //   actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
// // // //   primaryBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
// // // //   btnText: { color: '#fff', fontWeight: '700' },
// // // //   secondaryBtn: {
// // // //     flex: 1,
// // // //     padding: 12,
// // // //     borderRadius: 10,
// // // //     borderWidth: 1,
// // // //     alignItems: 'center',
// // // //   },
// // // //   secondaryBtnText: { fontWeight: '600' },
// // // //   card: {
// // // //     padding: 12,
// // // //     borderWidth: 1,
// // // //     borderRadius: 10,
// // // //     marginBottom: 8,
// // // //   },
// // // //   name: { fontWeight: '700', fontSize: 16 },
// // // //   meta: { color: '#555', marginTop: 2 },
// // // //   viewBtn: { marginTop: 6 },
// // // //   viewText: { color: '#2563eb', fontWeight: '600' },
// // // //   modalOverlay: {
// // // //     flex: 1,
// // // //     backgroundColor: 'rgba(0,0,0,0.4)',
// // // //     justifyContent: 'center',
// // // //     padding: 20,
// // // //   },
// // // //   modal: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
// // // //   input: {
// // // //     borderWidth: 1,
// // // //     borderRadius: 8,
// // // //     padding: 10,
// // // //     marginBottom: 8,
// // // //   },
// // // //   link: { color: '#2563eb', marginBottom: 10, fontWeight: '600' },
// // // // });

// // import React, { useState, useMemo, useEffect } from 'react';
// // import {
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   View,
// //   TextInput,
// //   ScrollView,
// //   FlatList,
// //   Modal,
// //   Alert,
// //   Platform,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import filepicker from 'react-native-file-picker';
// // import RNFS from 'react-native-fs';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import api from '../services/api';
// // import { PermissionsAndroid } from 'react-native';

// // type Farmer = {
// //   id: string;
// //   name: string;
// //   location: string;
// //   crop: string;
// //   landSize: number;
// // };

// // export default function AnchorDashboard() {
// //   const navigation =
// //     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   const [registeredFarmers, setRegisteredFarmers] = useState<Farmer[]>([]);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showBulkModal, setShowBulkModal] = useState(false);

// //   const [newFarmer, setNewFarmer] = useState({
// //     name: '',
// //     phone: '',
// //     location: '',
// //     crop: '',
// //     landSize: '',
// //   });

// //   const goBack = () => navigation.navigate('Dashboard');

// //   /* ---------------------------------------------------- */
// //   /* LOAD FARMERS */
// //   /* ---------------------------------------------------- */
// //   const loadFarmers = async () => {
// //     try {
// //       const res = await api.get('/anchor/farmers');

// //       const mapped: Farmer[] = res.data.map((f: any) => ({
// //         id: f.farmerId,
// //         name: f.farmerName,
// //         location: f.location,
// //         crop: f.interestedCrops?.join(', ') ?? '-',
// //         landSize: f.totalFarms ?? 0,
// //       }));

// //       setRegisteredFarmers(mapped);
// //     } catch (e) {
// //       console.warn('Failed to load farmers', e);
// //     }
// //   };

// //   useEffect(() => {
// //     loadFarmers();
// //   }, []);

// //   const filteredFarmers = useMemo(
// //     () =>
// //       registeredFarmers.filter(
// //         (f) =>
// //           f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           f.location.toLowerCase().includes(searchTerm.toLowerCase())
// //       ),
// //     [searchTerm, registeredFarmers]
// //   );

// //   /* ---------------------------------------------------- */
// //   /* REGISTER SINGLE FARMER (UNCHANGED) */
// //   /* ---------------------------------------------------- */
// //   const handleAddFarmer = async () => {
// //     if (
// //       !newFarmer.name ||
// //       !newFarmer.phone ||
// //       !newFarmer.location ||
// //       !newFarmer.crop ||
// //       !newFarmer.landSize
// //     ) {
// //       Alert.alert(t('error_title') ?? 'Error', 'Please fill all fields');
// //       return;
// //     }

// //     try {
// //       await api.post('/anchor/farmer/register-single', {
// //         farmerName: newFarmer.name,
// //         mobileNumber: newFarmer.phone,
// //         location: newFarmer.location,
// //         interestedCrops: [newFarmer.crop],
// //         farms: [
// //           {
// //             farmLocation: newFarmer.location,
// //             primaryCrop: newFarmer.crop,
// //             farmSize: Number(newFarmer.landSize),
// //           },
// //         ],
// //       });

// //       Alert.alert('Success', 'Farmer registered successfully');

// //       setNewFarmer({
// //         name: '',
// //         phone: '',
// //         location: '',
// //         crop: '',
// //         landSize: '',
// //       });

// //       setShowAddModal(false);
// //       loadFarmers();
// //     } catch (error: any) {
// //       Alert.alert(
// //         'Error',
// //         error?.response?.data?.message ?? 'Farmer registration failed'
// //       );
// //     }
// //   };

// //   /* ---------------------------------------------------- */
// //   /* DOWNLOAD TEMPLATE */
// //   /* ---------------------------------------------------- */
// //   const downloadTemplate = async (type: 'csv' | 'excel') => {
// //     try {
// //       const endpoint =
// //         type === 'csv'
// //           ? '/anchor/download-template/csv'
// //           : '/anchor/download-template/excel';

// //       const fileName =
// //         type === 'csv'
// //           ? 'anchor_farmers_template.csv'
// //           : 'anchor_farmers_template.xlsx';

// //       const path =
// //         Platform.OS === 'android'
// //           ? `${RNFS.DownloadDirectoryPath}/${fileName}`
// //           : `${RNFS.DocumentDirectoryPath}/${fileName}`;

// //       const authHeader = api.defaults.headers.common.Authorization as string;

// //       await RNFS.downloadFile({
// //         fromUrl: `${api.defaults.baseURL}${endpoint}`,
// //         toFile: path,
// //         headers: {
// //           Authorization: authHeader,
// //         },
// //       }).promise;

// //       Alert.alert('Downloaded', fileName);
// //     } catch {
// //       Alert.alert('Error', 'Template download failed');
// //     }
// //   };

// //   /* ---------------------------------------------------- */
// //   /* BULK REGISTER */
// //   /* ---------------------------------------------------- */

// // const requestStoragePermission = async () => {
// //   if (Platform.OS === 'android') {
// //     await PermissionsAndroid.request(
// //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
// //     );
// //   }
// // };

// //   // const uploadBulkFile = async () => {
// //   //   try {
// //   //     const file = await DocumentPicker.pickSingle({
// //   //       type: [
// //   //         DocumentPicker.types.csv,
// //   //         DocumentPicker.types.xlsx,
// //   //       ],
// //   //     });

// //   //     const formData = new FormData();
// //   //     formData.append('File', {
// //   //       uri: file.uri,
// //   //       name: file.name,
// //   //       type: file.type,
// //   //     } as any);

// //   //     await api.post('/anchor/farmers/register-bulk', formData, {
// //   //       headers: { 'Content-Type': 'multipart/form-data' },
// //   //     });

// //   //     Alert.alert('Success', 'Bulk farmer registration completed');
// //   //     setShowBulkModal(false);
// //   //     loadFarmers();
// //   //   } catch (e: any) {
// //   //     if (!DocumentPicker.isCancel(e)) {
// //   //       Alert.alert(
// //   //         'Error',
// //   //         e?.response?.data?.message ?? 'Bulk upload failed'
// //   //       );
// //   //     }
// //   //   }
// //   // };

// // const uploadBulkFile = async () => {
// //   try {
// //     await requestStoragePermission();

// //     const file = await filepicker.pickSingle({
// //       type: [
// //         filepicker.types.csv,
// //         filepicker.types.xlsx,
// //       ],
// //       copyTo: 'cachesDirectory', // VERY IMPORTANT
// //     });

// //     const formData = new FormData();
// //     formData.append('File', {
// //       uri: file.fileCopyUri ?? file.uri,
// //       name: file.name,
// //       type: file.type,
// //     } as any);

// //     await api.post('/anchor/farmers/register-bulk', formData, {
// //       headers: {
// //         'Content-Type': 'multipart/form-data',
// //       },
// //     });

// //     Alert.alert('Success', 'Bulk farmer registration completed');
// //     setShowBulkModal(false);
// //     loadFarmers();
// //   } catch (e: any) {
// //     if (!filepicker.isCancel(e)) {
// //       Alert.alert(
// //         'Error',
// //         e?.response?.data?.message ?? 'Bulk upload failed'
// //       );
// //     }
// //   }
// // };

// //   /* ---------------------------------------------------- */
// //   /* UI */
// //   /* ---------------------------------------------------- */
// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={goBack}>
// //           <Text style={styles.backText}>{t('back')}</Text>
// //         </TouchableOpacity>
// //         <Text style={styles.appTitle}>Anchor Dashboard</Text>
// //       </View>

// //       <ScrollView contentContainerStyle={styles.scrollContent}>
// //         <View style={styles.actionsRow}>
// //           <TouchableOpacity
// //             style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// //             onPress={() => setShowAddModal(true)}
// //           >
// //             <Text style={styles.primaryBtnText}>Register Single Farmer</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={styles.secondaryBtn}
// //             onPress={() => setShowBulkModal(true)}
// //           >
// //             <Text style={styles.secondaryBtnText}>Bulk Register</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* <TextInput
// //           placeholder="Search farmer"
// //           value={searchTerm}
// //           onChangeText={setSearchTerm}
// //           style={styles.searchInput}
// //         /> */}

// //         {/* <FlatList
// //           data={filteredFarmers}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => (
// //             <View style={styles.farmerItem}>
// //               <Text style={styles.farmerName}>{item.name}</Text>
// //               <Text>{item.location}</Text>
// //               <Text>
// //                 Crops: {item.crop} • Farms: {item.landSize}
// //               </Text>
// //             </View>
// //           )}
// //         /> */}
// //         <FlatList
// //   data={filteredFarmers}
// //   keyExtractor={(item) => item.id}
// //   ListHeaderComponent={
// //     <>
// //       <View style={styles.actionsRow}>
// //         ...
// //       </View>

// //       <TextInput
// //         placeholder="Search farmer"
// //         value={searchTerm}
// //         onChangeText={setSearchTerm}
// //         style={styles.searchInput}
// //       />
// //     </>
// //   }
// //   renderItem={({ item }) => (
// //     <View style={styles.farmerItem}>
// //       <Text style={styles.farmerName}>{item.name}</Text>
// //       <Text>{item.location}</Text>
// //       <Text>Crops: {item.crop}</Text>
// //     </View>
// //   )}
// // />
// //       </ScrollView>

// //       {/* BULK MODAL */}
// //       <Modal visible={showBulkModal} transparent animationType="slide">
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContent}>
// //             <Text style={styles.modalTitle}>Bulk Register Farmers</Text>

// //             <TouchableOpacity onPress={() => downloadTemplate('csv')}>
// //               <Text style={styles.link}>Download CSV Template</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity onPress={() => downloadTemplate('excel')}>
// //               <Text style={styles.link}>Download Excel Template</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// //               onPress={uploadBulkFile}
// //             >
// //               <Text style={styles.primaryBtnText}>Upload File</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity onPress={() => setShowBulkModal(false)}>
// //               <Text style={styles.cancelText}>Cancel</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>

// //       {/* SINGLE FARMER MODAL (UNCHANGED) */}
// //       <Modal visible={showAddModal} transparent animationType="slide">
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContent}>
// //             {['name', 'phone', 'location', 'crop', 'landSize'].map((f) => (
// //               <TextInput
// //                 key={f}
// //                 placeholder={f}
// //                 style={styles.fieldInput}
// //                 value={(newFarmer as any)[f]}
// //                 onChangeText={(v) =>
// //                   setNewFarmer((p) => ({ ...p, [f]: v }))
// //                 }
// //               />
// //             ))}

// //             <TouchableOpacity
// //               style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
// //               onPress={handleAddFarmer}
// //             >
// //               <Text style={styles.primaryBtnText}>Register</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   header: { padding: 16 },
// //   backText: { fontWeight: '700', color: '#2563eb' },
// //   appTitle: { fontSize: 22, fontWeight: '700' },
// //   scrollContent: { padding: 16 },
// //   actionsRow: { flexDirection: 'row', gap: 10 },
// //   primaryBtn: { padding: 12, borderRadius: 10, alignItems: 'center', flex: 1 },
// //   primaryBtnText: { color: '#fff', fontWeight: '700' },
// //   secondaryBtn: {
// //     padding: 12,
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     flex: 1,
// //     alignItems: 'center',
// //   },
// //   secondaryBtnText: { fontWeight: '600' },
// //   searchInput: {
// //     backgroundColor: '#f3f4f6',
// //     borderRadius: 10,
// //     padding: 10,
// //     marginVertical: 10,
// //   },
// //   farmerItem: {
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#e5e7eb',
// //   },
// //   farmerName: { fontWeight: '700' },
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.4)',
// //     justifyContent: 'center',
// //     padding: 16,
// //   },
// //   modalContent: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
// //   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
// //   fieldInput: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     padding: 10,
// //     marginBottom: 8,
// //   },
// //   link: { color: '#2563eb', marginBottom: 10, fontWeight: '600' },
// //   cancelText: { textAlign: 'center', marginTop: 10 },
// // });

// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   TextInput,
//   ScrollView,
//   FlatList,
//   Modal,
//   Alert,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import RNFS from 'react-native-fs';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';
// import { launchImageLibrary } from 'react-native-image-picker';

// type Farmer = {
//   id: string;
//   name: string;
//   location: string;
//   crop: string;
//   landSize: number;
// };

// export default function AnchorDashboard() {
//   const navigation =
//   useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [registeredFarmers, setRegisteredFarmers] = useState<Farmer[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);

//   const [newFarmer, setNewFarmer] = useState({
//     name: '',
//     phone: '',
//     location: '',
//     crop: '',
//     landSize: '',
//   });

//   const goBack = () => navigation.navigate('Dashboard');

//     //  REGISTER SINGLE FARMER 
//   const handleAddFarmer = async () => {
//     if (
//       !newFarmer.name ||
//       !newFarmer.phone ||
//       !newFarmer.location ||
//       !newFarmer.crop ||
//       !newFarmer.landSize
//     ) {
//       Alert.alert(t('error_title') ?? 'Error', 'Please fill all fields');
//       return;
//     }

//     try {
//       await api.post('/anchor/farmer/register-single', {
//         farmerName: newFarmer.name,
//         mobileNumber: newFarmer.phone,
//         location: newFarmer.location,
//         interestedCrops: [newFarmer.crop],
//         farms: [
//           {
//             farmLocation: newFarmer.location,
//             primaryCrop: newFarmer.crop,
//             farmSize: Number(newFarmer.landSize),
//           },
//         ],
//       });

//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('anchor_farmer_registered_success') ?? 'Farmer registered successfully'
//       );

//       setNewFarmer({
//         name: '',
//         phone: '',
//         location: '',
//         crop: '',
//         landSize: '',
//       });

//       setShowAddModal(false);
//       loadFarmers(); //  refresh list
//     } catch (error: any) {
//       Alert.alert(
//         t('error_title') ?? 'Error',
//         error?.response?.data?.message ?? 'Farmer registration failed'
//       );
//     }
//   };

//   /* ---------------------------------------------------- */
//   /* LOAD FARMERS */
//   /* ---------------------------------------------------- */
//   const loadFarmers = async () => {
//     try {
//       const res = await api.get('/anchor/farmers');

//       const mapped: Farmer[] = res.data.map((f: any) => ({
//         id: f.farmerId,
//         name: f.farmerName,
//         location: f.location,
//         crop: f.interestedCrops?.join(', ') ?? '-',
//         landSize: f.totalFarms ?? 0,
//       }));

//       setRegisteredFarmers(mapped);
//     } catch (e) {
//       console.warn('Failed to load farmers', e);
//     }
//   };

//   useEffect(() => {
//     loadFarmers();
//   }, []);

//   const filteredFarmers = useMemo(
//     () =>
//       registeredFarmers.filter(
//         (f) =>
//           f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           f.location.toLowerCase().includes(searchTerm.toLowerCase())
//       ),
//     [searchTerm, registeredFarmers]
//   );

//   /* ---------------------------------------------------- */
//   /* VIEW FARMER DETAIL */
//   /* ---------------------------------------------------- */
//   const viewFarmer = async (farmerId: string) => {
//     try {
//       const res = await api.get(`/anchor/farmers/${farmerId}`);
//       Alert.alert(
//         res.data.farmerName,
//         `Location: ${res.data.location}\nCrops: ${res.data.interestedCrops.join(', ')}`
//       );
//     } catch {
//       Alert.alert('Error', 'Failed to load farmer detail');
//     }
//   };

//   /* ---------------------------------------------------- */
//   /* STORAGE PERMISSION (ANDROID) */
//   /* ---------------------------------------------------- */
//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//       );
//     }
//   };

//   /* ---------------------------------------------------- */
//   /* BULK REGISTER */
//   /* ---------------------------------------------------- */
// const uploadBulkFile = async () => {
//   try {
//     await requestStoragePermission();

//     const res = await launchImageLibrary({
//       mediaType: 'mixed',   // allows CSV, XLSX, PDF on Android
//       selectionLimit: 1,
//     });

//     if (res.didCancel || !res.assets || res.assets.length === 0) {
//       return;
//     }

//     const file = res.assets[0];

//     const formData = new FormData();
//     formData.append('File', {
//       uri: file.uri!,
//       name: file.fileName ?? 'bulk_upload.csv',
//       type: file.type ?? 'text/csv',
//     } as any);

//     await api.post('/anchor/farmers/register-bulk', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     Alert.alert('Success', 'Bulk farmer registration completed');
//     setShowBulkModal(false);
//     loadFarmers();
//   } catch (e: any) {
//     Alert.alert(
//       'Error',
//       e?.response?.data?.message ?? 'Bulk upload failed'
//     );
//   }
// };

//   /* ---------------------------------------------------- */
//   /* DOWNLOAD TEMPLATE */
//   /* ---------------------------------------------------- */
//   const downloadTemplate = async (type: 'csv' | 'excel') => {
//     try {
//       const endpoint =
//         type === 'csv'
//           ? '/anchor/download-template/csv'
//           : '/anchor/download-template/excel';

//       const fileName =
//         type === 'csv'
//           ? 'anchor_farmers_template.csv'
//           : 'anchor_farmers_template.xlsx';

//       const path =
//         Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${fileName}`
//           : `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       const authHeader = api.defaults.headers.common.Authorization as string;

//       await RNFS.downloadFile({
//         fromUrl: `${api.defaults.baseURL}${endpoint}`,
//         toFile: path,
//         headers: { Authorization: authHeader },
//       }).promise;

//       Alert.alert('Downloaded', fileName);
//     } catch {
//       Alert.alert('Error', 'Template download failed');
//     }
//   };

//   /* ---------------------------------------------------- */
//   /* UI */
//   /* ---------------------------------------------------- */
//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={goBack}>
//           <Text style={styles.backText}>{t('back')}</Text>
//         </TouchableOpacity>
//         <Text style={styles.appTitle}>{t('anchor_dashboard')}</Text>
//       </View>

//       <FlatList
//         data={filteredFarmers}
//         keyExtractor={(item) => item.id}
//         ListHeaderComponent={
//           <>
//             <View style={styles.actionsRow}>
//               <TouchableOpacity
//                 style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
//                 onPress={() => setShowAddModal(true)}
//               >
//                 <Text style={[styles.primaryBtnText,{color:theme.text}]}>{t('anchor_action_register_single_farmer')}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.secondaryBtn}
//                 onPress={() => setShowBulkModal(true)}
//               >
//                 <Text style={[styles.secondaryBtnText,{color:theme.text}]}>{t('anchor_action_bulk_register_farmers')}</Text>
//               </TouchableOpacity>
//             </View>

//             <TextInput
//               placeholder= {t('anchor_search_placeholder') || "Search farmer"}
//               value={searchTerm}
//               onChangeText={setSearchTerm}
//               style={styles.searchInput}
//             />
//           </>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.farmerItem}>
//             <Text style={styles.farmerName}>{item.name}</Text>
//             <Text>{item.location}</Text>
//             <Text>Crops: {item.crop}</Text>
//           </View>
//         )}
//       />

//       {/* BULK MODAL */}
//       <Modal visible={showBulkModal} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Bulk Register Farmers</Text>

//             <TouchableOpacity onPress={() => downloadTemplate('csv')}>
//               <Text style={styles.link}>Download CSV Template</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => downloadTemplate('excel')}>
//               <Text style={styles.link}>Download Excel Template</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
//               onPress={uploadBulkFile}
//             >
//               <Text style={[styles.primaryBtnText,{color:theme.text}]}>Upload File</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => setShowBulkModal(false)}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { padding: 16 },
//   backText: { fontWeight: '700', color: '#2563eb' },
//   appTitle: { fontSize: 22, fontWeight: '700' },
//   actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
//   primaryBtn: { padding: 12, borderRadius: 10, alignItems: 'center', flex: 1 },
//   primaryBtnText: { fontWeight: '700' },
//   secondaryBtn: {
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     flex: 1,
//     alignItems: 'center',
//   },
//   secondaryBtnText: { fontWeight: '600' },
//   searchInput: {
//     backgroundColor: '#f3f4f6',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   farmerItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   farmerName: { fontWeight: '700' },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   modalContent: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
//   link: { color: '#2563eb', marginBottom: 10, fontWeight: '600' },
//   cancelText: { textAlign: 'center', marginTop: 10 },
// });

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'
import AppHamburgerMenu from '../components/AppHamburgerMenu';

type Farmer = {
  id: string;
  name: string;
  location: string;
  crop: string;
};

export default function AnchorDashboard() {

  const navigation =
   useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  /* ---------------- STATE ---------------- */
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchText, setSearchText] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [newFarmer, setNewFarmer] = useState({
    name: '',
    phone: '',
    location: '',
    crop: '',
    landSize: '',
    flocation: '',
    fcrop: '',
  });

  /* ---------------- LOAD FARMERS ---------------- */
  const loadFarmers = async () => {
    try {
      const res = await api.get('/anchor/farmers');
      const mapped: Farmer[] = res.data.map((f: any) => ({
        id: f.farmerId,
        name: f.farmerName,
        location: f.location,
        crop: f.interestedCrops?.join(', ') ?? '-',
      }));
      setFarmers(mapped);
    } catch {
      Alert.alert('Error', 'Failed to load farmers');
    }
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  /* ---------------------------------------------------- */
  /* VIEW FARMER DETAIL */
  /* ---------------------------------------------------- */
  const viewFarmer = async (farmerId: string) => {
    try {
      const res = await api.get(`/anchor/farmers/${farmerId}`);
      Alert.alert(
        `Name: ${res.data.farmerName}`,
        `Location: ${res.data.location}\nIntrested Crops: ${res.data.interestedCrops.join(', ')}\nMobile Number: ${res.data.mobileNumber}
        
        Farm Details:
        Farm Location: ${res.data.farms.map((farm: any) => farm.farmLocation).join(', ')}
        Primary Crop: ${res.data.farms.map((farm: any) => farm.primaryCrop).join(', ')}
        Farm Size(Aceres): ${res.data.farms.map((farm: any) => farm.farmSize).join(', ')}`
      );
    } catch {
      Alert.alert('Error', 'Failed to load farmer detail');
    }
  };

  /* ---------------- SEARCH (BUTTON BASED) ---------------- */
  const onSearch = () => {
    setAppliedSearch(searchText.trim());
  };

  const filteredFarmers = useMemo(() => {
    if (!appliedSearch) return farmers;
    return farmers.filter(
      (f) =>
        f.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        f.location.toLowerCase().includes(appliedSearch.toLowerCase())
    );
  }, [appliedSearch, farmers]);

  const goBack = () => navigation.navigate('Dashboard');

  /* ---------------- REGISTER SINGLE FARMER ---------------- */
  const registerFarmer = async () => {
  const { name, phone, location, crop, landSize, flocation, fcrop } = newFarmer;

  if (!name || !phone || !location || !crop || !landSize ||!flocation || !fcrop) {
    Alert.alert(t('error_title') ?? 'Error', 'Please fill all fields');
    return;
  }

  try {
    await api.post('/anchor/farmer/register-single', {
      farmerName: name,
      mobileNumber: phone,
      location: location,
      interestedCrops: [crop],
      farms: [
        {
          farmLocation: flocation,
          primaryCrop: fcrop,
          farmSize: Number(landSize),
        },
      ],
    });

    Alert.alert(
      t('success_title') ?? 'Success',
      t('anchor_farmer_registered_success') ??
        'Farmer registered successfully'
    );

    setNewFarmer({
      name: '',
      phone: '',
      location: '',
      crop: '',
      landSize: '',
      flocation: '',
      fcrop: '',
    });

    setShowRegisterForm(false);

    // ✅ IMPORTANT: reset search filters
    setSearchText('');
    setAppliedSearch('');

    // ✅ reload list
    loadFarmers();
  } catch (e: any) {
    Alert.alert(
      'Error',
      e?.response?.data?.message ?? 'Registration failed'
    );
  }
};


  /* ---------------- ANDROID STORAGE PERMISSION ---------------- */
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
    }
  };

  /* ---------------- DOWNLOAD TEMPLATE ---------------- */
  const downloadTemplate = async (type: 'csv' | 'excel') => {
    try {
      await requestPermission();

      const endpoint =
        type === 'csv'
          ? '/anchor/download-template/csv'
          : '/anchor/download-template/excel';

      const fileName =
        type === 'csv'
          ? 'anchor_farmers_template.csv'
          : 'anchor_farmers_template.xlsx';

      const path =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}`
          : `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const authHeader = api.defaults.headers.common.Authorization as string;

      await RNFS.downloadFile({
        fromUrl: `${api.defaults.baseURL}${endpoint}`,
        toFile: path,
        headers: { Authorization: authHeader },
      }).promise;

      Alert.alert('Downloaded', fileName);
    } catch {
      Alert.alert('Error', 'Template download failed');
    }
  };

  /* ---------------- BULK UPLOAD ---------------- */
  const uploadBulkFile = async () => {
    try {
      await requestPermission();

      const res = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 1,
      });

      if (!res.assets?.length) return;

      const file = res.assets[0];

      const formData = new FormData();
      formData.append('File', {
        uri: file.uri!,
        name: file.fileName ?? 'bulk_upload.csv',
        type: file.type ?? 'text/csv',
      } as any);

      await api.post('/anchor/farmers/register-bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Success', 'Bulk farmer registration completed');
      setShowBulkModal(false);
      loadFarmers();
    } catch (e: any) {
      Alert.alert(
        'Error',
        e?.response?.data?.message ?? 'Bulk upload failed'
      );
    }
  };

  /* ---------------- UI ---------------- */
  return (
    // <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
    //        <TouchableOpacity onPress={goBack}>
    //       <Text style={styles.backText}>{t('back')}</Text>
    //     </TouchableOpacity>
    //   <Text style={styles.title}>{t('anchor_dashboard')}</Text>
    //   <Text style={[styles.btnText,{color: theme.text}]}>{t('anchor_msg')}</Text>
    //   <Text> </Text>

    <SafeAreaView style={styles.container}>

  {/* Row 1: Back + Hamburger */}
  <View style={styles.headerTopRow}>
    <TouchableOpacity onPress={goBack}>
      <Text style={[styles.backText, { color: theme.primary }]}>
        {t('back') || 'Back'}
      </Text>
    </TouchableOpacity>

    {/* 👇 SAME hamburger component */}
    <AppHamburgerMenu role="anchor" />
  </View>

  {/* Row 2: Title + subtitle */}
  <View style={styles.headerTextBlock}>
    <Text style={[styles.title, { color: theme.text }]}>
      {t('anchor_dashboard') || 'Anchor Dashboard'}
    </Text>
    <Text style={[styles.btnText, { color: theme.text }]}>
      {t('anchor_msg') ||
        'Here you can manage contracts, farmers, and assigned lots'}
    </Text>
    <Text> </Text>
  </View>


      {/* ACTION BUTTONS */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.secondaryBtn, { backgroundColor: theme.primary }]}
          onPress={() => setShowRegisterForm((p) => !p)}
        >
          <Text style={[styles.btnText]}>
            {t('anchor_action_register_single_farmer')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryBtn, { backgroundColor: theme.primary }]}
          onPress={() => setShowBulkModal(true)}
        >
          <Text style={[styles.secondaryBtnText,{color: theme.text}]}>
            {t('anchor_action_bulk_register_farmers')}
          </Text>
        </TouchableOpacity>
      </View>
      {showRegisterForm && (
        <View style={styles.formCard}>
          <TextInput
  placeholder="Farmer Name"
  value={newFarmer.name}
  onChangeText={(v) => setNewFarmer(p => ({ ...p, name: v }))}
  style={styles.input}
/>

<TextInput
  placeholder="Phone Number"
  value={newFarmer.phone}
  keyboardType="numeric"
  onChangeText={(v) => setNewFarmer(p => ({ ...p, phone: v }))}
  style={styles.input}
/>

<TextInput
  placeholder="Farmer Location"
  value={newFarmer.location}
  onChangeText={(v) => setNewFarmer(p => ({ ...p, location: v }))}
  style={styles.input}
/>

<TextInput
  placeholder="Interested Crop"
  value={newFarmer.crop}
  onChangeText={(v) => setNewFarmer(p => ({ ...p, crop: v }))}
  style={styles.input}
/>

<TextInput
  placeholder="Land Size (Acres)"
  value={newFarmer.landSize}
  keyboardType="numeric"
  onChangeText={(v) => setNewFarmer(p => ({ ...p, landSize: v }))}
  style={styles.input}
/>

<TextInput
  placeholder="Farm Location"
  value={newFarmer.flocation}
  onChangeText={(v) => setNewFarmer(p => ({ ...p, flocation: v }))}
  style={styles.input}
/>

<TextInput
  placeholder="Primary Crop"
  value={newFarmer.fcrop}
  onChangeText={(v) => setNewFarmer(p => ({ ...p, fcrop: v }))}
  style={styles.input}
/>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
            onPress={registerFarmer}
          >
            <Text style={styles.btnText}>
              {t('anchor_btn_register_farmer')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Text></Text>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder={t('anchor_search_placeholder')}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
          <Text style={styles.searchText}>{t('search')}</Text>
        </TouchableOpacity>
      </View>

      {/* REGISTERED FARMERS SECTION */}
<Text style={styles.sectionTitle}>
  {t('anchor_section_registered_farmers') ?? 'Anchor Registered Farmers'}
</Text>


      {/* FARMERS LIST */}
      <FlatList
        data={filteredFarmers}
        keyExtractor={(i) => i.id}

renderItem={({ item }) => (
  <View style={styles.farmerCard}>
    <View style={{ flex: 1 }}>
      <Text style={styles.subText}>Farmer Name: {item.name}</Text>
      <Text style={styles.subText}>Location: {item.location}</Text>
      <Text style={styles.subText}>Intrested Crops: {item.crop}</Text>
    </View>

    <TouchableOpacity
      style={styles.viewBtn}
      onPress={() => viewFarmer(item.id)}
    >
      <Text style={styles.viewBtnText}>View</Text>
    </TouchableOpacity>
  </View>
)}
></FlatList>

      {/* BULK MODAL */}
      <Modal visible={showBulkModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Bulk Register Farmers</Text>

            <TouchableOpacity onPress={() => downloadTemplate('csv')}>
              <Text style={styles.link}>Download CSV Template</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => downloadTemplate('excel')}>
              <Text style={styles.link}>Download Excel Template</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
              onPress={uploadBulkFile}
            >
              <Text style={[styles.btnText]}>Upload File</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowBulkModal(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },

  actionsRow: { flexDirection: 'row', gap: 10 },
  primaryBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth:1,
    alignItems: 'center',
  },
  secondaryBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  btnText: { fontWeight: '700' },
  secondaryBtnText: { fontWeight: '600' },

  formCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },

  searchRow: { flexDirection: 'row', gap: 8, marginVertical: 10 },
  searchInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 10,
  },
  searchBtn: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#22c55e',
  },
  searchText: { color: '#fff', fontWeight: '700' },

  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  name: { fontWeight: '700' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modal: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  link: { color: '#2563eb', marginBottom: 10, fontWeight: '600' },
  cancel: { textAlign: 'center', marginTop: 10 },
   backText: { fontWeight: '700', color: '#2563eb' },

   sectionTitle: {
  marginTop: 16,
  marginBottom: 8,
  fontSize: 16,
  fontWeight: '700',
},

farmerCard: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  marginBottom: 10,
},

subText: {
  fontSize: 13,
  color: '#4b5563',
  marginTop: 2,
},

viewBtn: {
  borderWidth: 1,
  borderColor: '#000',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 6,
},

viewBtnText: {
  fontWeight: '600',
},

headerContainer: {
  marginBottom: 12,
},

headerTopRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

headerTextBlock: {
  marginTop: 8,
},


});


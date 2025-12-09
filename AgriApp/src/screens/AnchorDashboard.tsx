import React, { useState, useMemo } from 'react';
import { Text,StyleSheet,TouchableOpacity,View,TextInput,ScrollView,FlatList, Modal,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type Farmer = {
  id: string;
  name: string;
  location: string;
  crop: string;
  landSize: number;
};

const registeredFarmers: Farmer[] = [
  { id: '1', name: 'Ramesh Kumar', location: 'Pune, Maharashtra', crop: 'Onion', landSize: 5 },
  { id: '2', name: 'Suresh Patil', location: 'Nashik, Maharashtra', crop: 'Potato', landSize: 7 },
  { id: '3', name: 'Vijay Singh', location: 'Solapur, Maharashtra', crop: 'Tomato', landSize: 4 },
  { id: '4', name: 'Prakash Rao', location: 'Pune, Maharashtra', crop: 'Wheat', landSize: 10 },
];

const cropDistribution = [
  { name: 'Onion', value: 350, farmers: 45 },
  { name: 'Potato', value: 420, farmers: 62 },
  { name: 'Tomato', value: 280, farmers: 38 },
  { name: 'Wheat', value: 550, farmers: 78 },
  { name: 'Rice', value: 380, farmers: 51 },
];

export default function AnchorDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [newFarmer, setNewFarmer] = useState({
    name: '',
    phone: '',
    location: '',
    crop: '',
    landSize: '',
  });

  const goBack = () => {
    navigation.navigate('Dashboard');
  };

  const filteredFarmers = useMemo(
    () =>
      registeredFarmers.filter(
        (farmer) =>
          farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const handleAddFarmer = () => {
    if (!newFarmer.name || !newFarmer.phone || !newFarmer.location || !newFarmer.crop || !newFarmer.landSize) {
      Alert.alert('Missing details', 'Please fill all the required fields.');
      return;
    }

    // In production, send to API and update list
    Alert.alert('Success', 'Farmer registered (demo only).');
    setNewFarmer({
      name: '',
      phone: '',
      location: '',
      crop: '',
      landSize: '',
    });
    setShowAddModal(false);
  };

  const handleBulkImport = () => {
    // In production, handle CSV/Excel upload & API call
    Alert.alert('Import', 'Bulk import triggered (demo only).');
    setShowBulkModal(false);
  };

  const totalFarmers = 274;
  const totalVolume = '1,980 Q';
  const activeTransactions = 48;
  const totalLand = '1,458';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.appTitle, { color: theme.primary || '#4f46e5' }]}>
            {t('anchor_dashboard') || 'Anchor Dashboard'}
          </Text>
          <Text style={[styles.appSubtitle, { color: theme.text || '#4b5563' }]}>
            AgriConnect Solutions Pvt. Ltd.
          </Text>
        <Text style={[styles.bottomMsg, { color: theme.text }]}>
          {t('anchor_msg')}
        </Text>
        </View>
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.card, styles.cardIndigo]}>
            <Text style={styles.cardIcon}>🚜</Text>
            <Text style={styles.cardLabel}>{t('anchor_stats_registered_farmers')}</Text>
            <Text style={[styles.cardValue, { color: '#4f46e5' }]}>{totalFarmers}</Text>
          </View>

          <View style={[styles.card, styles.cardGreen]}>
            <Text style={styles.cardIcon}>📦</Text>
            <Text style={styles.cardLabel}>{t('anchor_stats_total_crop_volume')} </Text>
            <Text style={[styles.cardValue, { color: '#059669' }]}>{totalVolume}</Text>
          </View>

          <View style={[styles.card, styles.cardOrange]}>
            <Text style={styles.cardIcon}>📈</Text>
            <Text style={styles.cardLabel}>{t('anchor_stats_active_transactions')}</Text>
            <Text style={[styles.cardValue, { color: '#ea580c' }]}>{activeTransactions}</Text>
          </View>

          <View style={[styles.card, styles.cardPurple]}>
            <Text style={styles.cardIcon}>👨‍🌾</Text>
            <Text style={styles.cardLabel}>{t('anchor_stats_total_land')}</Text>
            <Text style={[styles.cardValue, { color: '#7c3aed' }]}>{totalLand}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: theme.primary || '#4f46e5' }]}
            onPress={() => setShowAddModal(true)}
          >
            <Text style={styles.primaryBtnText}>{t('anchor_action_register_single_farmer')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => setShowBulkModal(true)}
          >
            <Text style={styles.secondaryBtnText}>{t('anchor_action_bulk_import_farmers')}</Text>
          </TouchableOpacity>
        </View>

        {/* Farmers List */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('anchor_section_registered_farmers')}</Text>
          <View style={styles.searchBox}>
            <TextInput
              placeholder={t('anchor_search_placeholder')}
              placeholderTextColor="#9ca3af"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
            />
          </View>

          <FlatList
            data={filteredFarmers}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 8 }}
            renderItem={({ item }) => (
              <View style={styles.farmerItem}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.farmerName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={styles.farmerLocation}>{item.location}</Text>
                  <Text style={styles.farmerMeta}>
                    Crop: {item.crop} • Land: {item.landSize} acres
                  </Text>
                </View>
                <TouchableOpacity style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>{t('anchor_btn_view_farmer')}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Analytics */}
        <View style={styles.analyticsRow}>
          {/* Crop Distribution (Simple bar view) */}
          <View style={styles.sectionCardHalf}>
            <Text style={styles.sectionTitle}>{t('anchor_section_crop_distribution_title')}</Text>
            <View style={{ marginTop: 10 }}>
              {cropDistribution.map((crop) => {
                const maxValue = 550; // from data
                const widthPercent = `${(crop.value / maxValue) * 100}%`;
                return (
                  <View key={crop.name} style={{ marginBottom: 8 }}>
                    <View style={styles.analyticsLabelRow}>
                      <Text style={styles.analyticsLabel}>{crop.name}</Text>
                      <Text style={styles.analyticsValue}>{crop.value} Q</Text>
                    </View>
                    <View style={styles.progressBg}>
                      <View style={[styles.progressBar]} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Farmers by Crop Type (Simple proportional view) */}
          <View style={styles.sectionCardHalf}>
            <Text style={styles.sectionTitle}>{t('anchor_section_farmers_by_crop_type_title')}</Text>
            <View style={{ marginTop: 10 }}>
              {cropDistribution.map((crop) => {
                const maxFarmers = 78;
                const widthPercent = `${(crop.farmers / maxFarmers) * 100}%`;
                return (
                  <View key={crop.name} style={{ marginBottom: 8 }}>
                    <View style={styles.analyticsLabelRow}>
                      <Text style={styles.analyticsLabel}>{crop.name}</Text>
                      <Text style={styles.analyticsValue}>{crop.farmers}</Text>
                    </View>
                    <View style={styles.progressBgAlt}>
                      <View style={[styles.progressBarAlt]} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Register Single Farmer Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={styles.modalTitle}>{t('anchor_modal_register_farmer_title')}</Text>
            <Text style={styles.modalSubtitle}>{t('anchor_modal_register_farmer_description')}</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
            >
              <View style={styles.modalField}>
                <Text style={styles.fieldLabel}>{t('anchor_label_farmer_name')}</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder={t('anchor_placeholder_farmer_name')} 
                  value={newFarmer.name}
                  onChangeText={(text) => setNewFarmer({ ...newFarmer, name: text })}
                />
              </View>

              <View style={styles.modalField}>
                <Text style={styles.fieldLabel}>{t('anchor_label_phone_number')}</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder={t('anchor_placeholder_phone_number')}
                  keyboardType="phone-pad"
                  value={newFarmer.phone}
                  onChangeText={(text) => setNewFarmer({ ...newFarmer, phone: text })}
                />
              </View>

              <View style={styles.modalField}>
                <Text style={styles.fieldLabel}>{t('anchor_label_location')}</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder={t('anchor_placeholder_location')}
                  value={newFarmer.location}
                  onChangeText={(text) => setNewFarmer({ ...newFarmer, location: text })}
                />
              </View>

              <View style={styles.modalField}>
                <Text style={styles.fieldLabel}>{t('anchor_label_primary_crop')}</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder={t('anchor_placeholder_primary_crop')}
                  value={newFarmer.crop}
                  onChangeText={(text) => setNewFarmer({ ...newFarmer, crop: text })}
                />
              </View>

              <View style={styles.modalField}>
                <Text style={styles.fieldLabel}>{t('anchor_label_land_size')}</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder={t('anchor_placeholder_land_size')}
                  keyboardType="numeric"
                  value={newFarmer.landSize}
                  onChangeText={(text) => setNewFarmer({ ...newFarmer, landSize: text })}
                />
              </View>

              <TouchableOpacity
                onPress={handleAddFarmer}
                style={[styles.primaryBtn, { marginTop: 12, backgroundColor: theme.primary || '#4f46e5' }]}
              >
                <Text style={styles.primaryBtnText}>{t('anchor_btn_register_farmer')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                style={[styles.secondaryBtnPlain, { marginTop: 8 }]}
              >
                <Text style={[styles.secondaryBtnPlainText, { color: theme.primary || '#4f46e5' }]}>
                  {t('anchor_btn_cancel')}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        visible={showBulkModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowBulkModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContentLarge, { backgroundColor: theme.background }]}>
            <Text style={styles.modalTitle}>{t('anchor_modal_bulk_import_title')}</Text>
            <Text style={styles.modalSubtitle}>
              {t('anchor_modal_bulk_import_description')}
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
            >
              {/* Instructions */}
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>{t('anchor_import_instructions_title')}</Text>
                <Text style={styles.infoText}>{t('anchor_import_instructions_line1')}</Text>
                <Text style={styles.infoText}>
                 {t('anchor_import_instructions_line2')}
                </Text>
                <Text style={styles.infoText}>{t('anchor_import_instructions_line3')}</Text>
              </View>

              {/* File Upload Placeholder */}
              <View style={styles.uploadBox}>
                <Text style={styles.uploadIcon}>⬆</Text>
                <Text style={styles.uploadTitle}>Select CSV / Excel file</Text>
                <Text style={styles.uploadSubtitle}>Mobile file picker integration goes here</Text>
              </View>

              {/* Import Stats Preview */}
              <View style={styles.importStatsRow}>
                <View style={[styles.importStatCard, { backgroundColor: '#ecfdf3', borderColor: '#bbf7d0' }]}>
                  <Text style={[styles.importStatLabel, { color: '#15803d' }]}>{t('anchor_import_stat_farmers_label')}</Text>
                  <Text style={[styles.importStatValue, { color: '#166534' }]}>{t('anchor_import_stat_farmers_value')}</Text>
                </View>
                <View style={[styles.importStatCard, { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }]}>
                  <Text style={[styles.importStatLabel, { color: '#1d4ed8' }]}>{t('anchor_import_stat_buyers_label')}</Text>
                  <Text style={[styles.importStatValue, { color: '#1d4ed8' }]}>{t('anchor_import_stat_buyers_value')}</Text>
                </View>
                <View style={[styles.importStatCard, { backgroundColor: '#fffbeb', borderColor: '#fef3c7' }]}>
                  <Text style={[styles.importStatLabel, { color: '#d97706' }]}>{t('anchor_import_stat_sellers_label')}</Text>
                  <Text style={[styles.importStatValue, { color: '#b45309' }]}>{t('anchor_import_stat_sellers_value')}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleBulkImport}
                style={[styles.primaryBtn, { marginTop: 16, backgroundColor: theme.primary || '#4f46e5' }]}
              >
                <Text style={styles.primaryBtnText}>{t('anchor_btn_import_all_users')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowBulkModal(false)}
                style={[styles.secondaryBtnPlain, { marginTop: 8 }]}
              >
                <Text style={[styles.secondaryBtnPlainText, { color: theme.primary || '#4f46e5' }]}>
                  {t('anchor_btn_close')}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#edf2f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },
  appTitle: { fontSize: 24, fontWeight: '700' },
  appSubtitle: { fontSize: 13, marginTop: 2 },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  // Stats cards
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  card: {
    flexBasis: '48%',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  cardIndigo: { borderColor: '#e0e7ff' },
  cardGreen: { borderColor: '#bbf7d0' },
  cardOrange: { borderColor: '#fed7aa' },
  cardPurple: { borderColor: '#e9d5ff' },
  cardIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },

  // Buttons
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
    gap: 10,
  },
  primaryBtn: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryBtn: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#4f46e5',
    fontWeight: '500',
    fontSize: 13,
  },

  // Section cards
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  searchBox: {
    marginTop: 6,
    marginBottom: 4,
  },
  searchInput: {
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#111827',
  },

  farmerItem: {
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  farmerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  farmerLocation: {
    fontSize: 12,
    color: '#4b5563',
  },
  farmerMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  outlineBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  outlineBtnText: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
  },

  // Analytics
  analyticsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  sectionCardHalf: {
    flexBasis: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
  },
  analyticsLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#4b5563',
  },
  analyticsValue: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
  },
  progressBg: {
    marginTop: 3,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#e0e7ff',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#4f46e5',
  },
  progressBgAlt: {
    marginTop: 3,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#fee2e2',
    overflow: 'hidden',
  },
  progressBarAlt: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#f97316',
  },

  bottomMsg: {
    fontSize: 13,
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'center',
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    borderRadius: 16,
    padding: 16,
    maxHeight: '85%',
  },
  modalContentLarge: {
    borderRadius: 16,
    padding: 16,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 10,
  },
  modalField: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 3,
  },
  fieldInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },

  secondaryBtnPlain: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  secondaryBtnPlainText: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Bulk import helpers
  infoBox: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#e0e7ff',
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1e3a8a',
  },
  infoText: {
    fontSize: 12,
    color: '#1d4ed8',
    marginBottom: 2,
  },
  uploadBox: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#c7d2fe',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  uploadIcon: {
    fontSize: 24,
    marginBottom: 6,
    color: '#4f46e5',
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  importStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  importStatCard: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  importStatLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  importStatValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});

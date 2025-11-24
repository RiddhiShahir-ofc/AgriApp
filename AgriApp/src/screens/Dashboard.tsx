import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoleCard from '../components/RoleCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GraphChart from '../components/GraphChart';
import FilterBar from '../components/FilterBar';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const roles = [
  { id: 'farmer', name: 'Farmer' },
  { id: 'buyer', name: 'Buyer' },
  { id: 'seller', name: 'Seller' },
  { id: 'mandi', name: 'Mandi Official' },
  { id: 'anchor', name: 'Anchor' },
];

export default function Dashboard({ navigation }: Props) {
  const [phone, setPhone] = useState<string | null>(null);
  const [filters, setFilters] = useState({ mandi: '', crop: '' });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('LOGGED_IN_USER');
    await AsyncStorage.removeItem('LOGGED_IN_ROLE');

    Alert.alert(t('success_title') ?? 'Success', t('success_logged_out') ?? 'User Logged out Successfully');
   
     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  const handleSearch = () => {
  setAppliedFilters(filters);
  };

  const handleRoleSelect = async (roleId: string) => {
    const phone = await AsyncStorage.getItem("LOGGED_IN_USER");
  
    if (!phone) {
  Alert.alert(t('error_title'),t('error_phone_not_found'));
  return;
}

const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
const roles = rolesJson ? JSON.parse(rolesJson) : [];

if (roles.includes(roleId)) {
  // redirect to dashboard
  switch (roleId) {
    case 'farmer': navigation.navigate("FarmerDashboard"); return;
    case 'buyer': navigation.navigate("BuyerDashboard"); return;
    case 'seller': navigation.navigate("SellerDashboard"); return;
    case 'mandi': navigation.navigate("MandiOfficialDashboard"); return;
    case 'anchor': navigation.navigate("AnchorDashboard"); return;
  }
}

// Not registered → go to register page
switch (roleId) {
  case 'farmer': navigation.navigate("FarmerRegister"); break;
  case 'buyer': navigation.navigate("BuyerRegister"); break;
  case 'seller': navigation.navigate("SellerRegister"); break;
  case 'mandi': navigation.navigate("MandiOfficialRegister"); break;
  case 'anchor': navigation.navigate("AnchorRegister"); break;
}

  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{t('dashboard_title')}</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sub}>{t('welcome')}{phone ? `, ${phone}` : ''}</Text>

        <Text style={styles.sectionTitle}>{t('select_role')}</Text>
        <View style={styles.rolesContainer}>
          {roles.map((r) => (
            <RoleCard key={r.id} name={r.name} onPress={() => handleRoleSelect(r.id)} />
          ))}
        </View>

        {/* Filters */}

         <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

       {/* Graph */}

       <View style={styles.graphContainer}>
          <Text style={styles.sectionTitle}>{t('market_trends')}</Text>
          <GraphChart filters={appliedFilters} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '700' },
  logoutBtn: { backgroundColor: '#e53e3e', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: '600' },
  sub: { color: '#555', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  rolesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  graphContainer: { marginBottom: 20 },
  graphWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
});
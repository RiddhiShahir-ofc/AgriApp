// // import React, { useEffect, useState } from 'react';
// // import {Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // export default function Dashboard({ navigation }: any) {
// //   const [phone, setPhone] = useState<string | null>(null);

// //   useEffect(() => {
// //     AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
// //   }, []);

// //   const logout = async () => {
// //     await AsyncStorage.removeItem('LOGGED_IN_USER');
// //     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.title}>Dashboard</Text>
// //       <Text>Welcome{phone ? `, ${phone}` : ''}</Text>
// //       <TouchableOpacity style={styles.btn} onPress={logout}>
// //         <Text style={styles.btnText}>Logout</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// //   btn: { marginTop: 20, backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
// //   btnText: { color: '#fff', fontWeight: '700' },
// // });

// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import GraphChart from '../components/GraphChart';
// import FilterBar from '../components/FilterBar';
// import RoleCard from '../components/RoleCard';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// const roles = [
//   { id: 'farmer', name: 'Farmer' },
//   { id: 'buyer', name: 'Buyer' },
//   { id: 'seller', name: 'Seller' },
//   { id: 'mandi', name: 'Mandi Official' },
//   { id: 'anchor', name: 'Anchor' },
// ];

// export default function Dashboard({ navigation }: Props) {
//   const [phone, setPhone] = useState<string | null>(null);
//   const [filters, setFilters] = useState({ mandi: '', crop: '' });

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
//   }, []);

//   const logout = async () => {
//     await AsyncStorage.removeItem('LOGGED_IN_USER');
//     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
//   };

//   const handleRoleSelect = (roleId: string) => {
//   switch (roleId) {
//     case 'farmer':
//       navigation.navigate('FarmerRegister');
//       break;
//     case 'buyer':
//       navigation.navigate('BuyerRegister');
//       break;
//     case 'seller':
//       navigation.navigate('SellerRegister');
//       break;
//     case 'mandi':
//       navigation.navigate('MandiOfficialRegister');
//       break;
//     case 'anchor':
//       navigation.navigate('AnchorRegister');
//       break;
//     default:
//       break;
//   }
// };


//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Text style={styles.title}>Dashboard</Text>
//         <Text style={styles.sub}>Welcome{phone ? `, ${phone}` : ''}</Text>

//     {/* Roles Section */}
//         <Text style={styles.sectionTitle}>Select Role</Text>
//         <View style={styles.rolesContainer}>
//           {roles.map((r) => (
//             <RoleCard key={r.id} name={r.name} onPress={() => handleRoleSelect(r.id)} />
//           ))}
//         </View>

//         {/* Filter Section */}
//         <FilterBar filters={filters} setFilters={setFilters} />

//         {/* Graph Section */}
//         <View style={styles.graphContainer}>
//           <Text style={styles.sectionTitle}>Market Trends</Text>
//           <GraphChart filters={filters} />
//         </View>

//         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 26, fontWeight: '700', marginBottom: 5 },
//   sub: { color: '#555', marginBottom: 15 },
//   graphContainer: { marginBottom: 20 },
//   sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
//   rolesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   logoutBtn: {
//     backgroundColor: '#e53e3e',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   logoutText: { color: '#fff', fontWeight: '700' },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GraphChart from '../components/GraphChart';
import FilterBar from '../components/FilterBar';
import RoleCard from '../components/RoleCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

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

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('LOGGED_IN_USER');
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  const handleRoleSelect = (roleId: string) => {
    switch (roleId) {
      case 'farmer':
        navigation.navigate('FarmerRegister');
        break;
      case 'buyer':
        navigation.navigate('BuyerRegister');
        break;
      case 'seller':
        navigation.navigate('SellerRegister');
        break;
      case 'mandi':
        navigation.navigate('MandiOfficialRegister');
        break;
      case 'anchor':
        navigation.navigate('AnchorRegister');
        break;
      default:
        navigation.navigate('RoleRegister', { role: roleId });
        break;
    }
  };

  const handleSearch = async () => {
    // Apply current filters to graph
    setAppliedFilters(filters);

  //    // optionally fetch aggregated data for main dashboard:
  // const res = await getJSON(`/api/market-data?mandi=${encodeURIComponent(filters.mandi)}&crop=${encodeURIComponent(filters.crop)}`);
  // // pass res to GraphChart or set state to pass to chart
  // setChartData(res.chart);

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with Logout */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sub}>Welcome{phone ? `, ${phone}` : ''}</Text>

          {/* Roles Section */}
        <Text style={styles.sectionTitle}>Select Role</Text>
        <View style={styles.rolesContainer}>
          {roles.map((r) => (
            <RoleCard key={r.id} name={r.name} onPress={() => handleRoleSelect(r.id)} />
          ))}
        </View>

        {/* Filter Section */}
        <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

        {/* Graph Section */}
        <View style={styles.graphContainer}>
          <Text style={styles.sectionTitle}>Market Trends</Text>
          <GraphChart filters={appliedFilters} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 26, fontWeight: '700' },
  logoutBtn: {
    backgroundColor: '#e53e3e',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '600' },
  sub: { color: '#555', marginBottom: 15 },
  graphContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});



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
//   const [appliedFilters, setAppliedFilters] = useState(filters);

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
//   }, []);

//   // FULL LOGOUT — clears both phone + role
//   const logout = async () => {
//     await AsyncStorage.removeItem('LOGGED_IN_USER');
//     //await AsyncStorage.removeItem('LOGGED_IN_ROLE');

//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Landing' }],
//     });
//   };

// //   // ROLE SELECTION WITH CHECK
// //   const handleRoleSelect = async (roleId: string) => {
// //     //const savedRole = await AsyncStorage.getItem('LOGGED_IN_ROLE');
// //     const rolesJson = await AsyncStorage.getItem("REGISTERED_ROLES");
// // const roles = rolesJson ? JSON.parse(rolesJson) : [];

// //     // if (savedRole === roleId) {
// //     if (roles.includes(roleId)) {
// //       // User already registered → redirect to corresponding dashboard
// //       switch (roleId) {
// //         case 'farmer':
// //           navigation.navigate('FarmerDashboard');
// //           return;
// //         case 'buyer':
// //           navigation.navigate('BuyerDashboard');
// //           return;
// //         case 'seller':
// //           navigation.navigate('SellerDashboard');
// //           return;
// //         case 'mandi':
// //           navigation.navigate('MandiOfficialDashboard');
// //           return;
// //         case 'anchor':
// //           navigation.navigate('AnchorDashboard');
// //           return;
// //       }
// //     }

// //     // If role not registered → open registration screen
// //     switch (roleId) {
// //       case 'farmer':
// //         navigation.navigate('FarmerRegister');
// //         break;
// //       case 'buyer':
// //         navigation.navigate('BuyerRegister');
// //         break;
// //       case 'seller':
// //         navigation.navigate('SellerRegister');
// //         break;
// //       case 'mandi':
// //         navigation.navigate('MandiOfficialRegister');
// //         break;
// //       case 'anchor':
// //         navigation.navigate('AnchorRegister');
// //         break;
// //     }
// //   };

// const handleRoleSelect = async (roleId: string) => {
//   const phone = await AsyncStorage.getItem("LOGGED_IN_USER");
//   if (!phone) return;

//   const roles = await getRoles(phone);

//   if (roles.includes(roleId)) {
//     // Redirect to dashboard
//     switch (roleId) {
//       case 'farmer': navigation.navigate('FarmerDashboard'); return;
//       case 'buyer': navigation.navigate('BuyerDashboard'); return;
//       case 'seller': navigation.navigate('SellerDashboard'); return;
//       case 'mandi': navigation.navigate('MandiOfficialDashboard'); return;
//       case 'anchor': navigation.navigate('AnchorDashboard'); return;
//     }
//   }

//   // Not registered — redirect to register form
//   switch (roleId) {
//     case 'farmer': navigation.navigate('FarmerRegister'); break;
//     case 'buyer': navigation.navigate('BuyerRegister'); break;
//     case 'seller': navigation.navigate('SellerRegister'); break;
//     case 'mandi': navigation.navigate('MandiOfficialRegister'); break;
//     case 'anchor': navigation.navigate('AnchorRegister'); break;
//   }
// };



//   const handleSearch = () => {
//     setAppliedFilters(filters);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
        
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.title}>Dashboard</Text>

//           <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sub}>Welcome{phone ? `, ${phone}` : ''}</Text>

//         {/* Role Section */}
//         <Text style={styles.sectionTitle}>Select Role</Text>
//         <View style={styles.rolesContainer}>
//           {roles.map((r) => (
//             <RoleCard key={r.id} name={r.name} onPress={() => handleRoleSelect(r.id)} />
//           ))}
//         </View>

//         {/* Filters */}
//         <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

//         {/* Graph */}
//         <View style={styles.graphContainer}>
//           <Text style={styles.sectionTitle}>Market Trends</Text>
//           <GraphChart filters={appliedFilters} />
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: { fontSize: 26, fontWeight: '700' },
//   logoutBtn: {
//     backgroundColor: '#e53e3e',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   logoutText: { color: '#fff', fontWeight: '600' },
//   sub: { color: '#555', marginBottom: 15 },
//   graphContainer: { marginBottom: 20 },
//   sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
//   rolesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoleCard from '../components/RoleCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GraphChart from '../components/GraphChart';
import FilterBar from '../components/FilterBar';

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
    await AsyncStorage.removeItem('LOGGED_IN_ROLE');
    Alert.alert("User Logged out Successfully");
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  const handleSearch = () => {
  setAppliedFilters(filters);
  };

  const handleRoleSelect = async (roleId: string) => {
    const phone = await AsyncStorage.getItem("LOGGED_IN_USER");
    // const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
    // const registered: string[] = rolesJson ? JSON.parse(rolesJson) : [];

    // if (registered.includes(roleId)) {
    //   // already registered -> go to the dashboard
    //   switch (roleId) {
    //     case 'farmer': navigation.navigate('FarmerDashboard'); return;
    //     case 'buyer': navigation.navigate('BuyerDashboard'); return;
    //     case 'seller': navigation.navigate('SellerDashboard'); return;
    //     case 'mandi': navigation.navigate('MandiOfficialDashboard'); return;
    //     case 'anchor': navigation.navigate('AnchorDashboard'); return;
    //   }
    // } else {
    //   // not registered -> navigate to register screen
    //   switch (roleId) {
    //     case 'farmer': navigation.navigate('FarmerRegister'); return;
    //     case 'buyer': navigation.navigate('BuyerRegister'); return;
    //     case 'seller': navigation.navigate('SellerRegister'); return;
    //     case 'mandi': navigation.navigate('MandiOfficialRegister'); return;
    //     case 'anchor': navigation.navigate('AnchorRegister'); return;
    //   }
    // }

    if (!phone) {
  Alert.alert("Error", "Phone number not found.");
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sub}>Welcome{phone ? `, ${phone}` : ''}</Text>

        <Text style={styles.sectionTitle}>Select Role</Text>
        <View style={styles.rolesContainer}>
          {roles.map((r) => (
            <RoleCard key={r.id} name={r.name} onPress={() => handleRoleSelect(r.id)} />
          ))}
        </View>

        {/* Filters */}

         <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

       {/* Graph */}

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
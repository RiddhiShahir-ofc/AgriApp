// // import React, { useEffect, useState } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Alert } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import RoleCard from '../components/RoleCard';
// // import { NativeStackScreenProps } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';
// // import GraphChart from '../components/GraphChart';
// // import FilterBar from '../components/FilterBar';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // import { Tractor, ShoppingCart, Store, User, Users } from 'lucide-react-native';

// // type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// // const roles = [
// //   { id: 'farmer', name: 'Farmer' },
// //   { id: 'buyer', name: 'Buyer' },
// //   { id: 'seller', name: 'Seller' },
// //   { id: 'mandi', name: 'Mandi Official' },
// //   { id: 'anchor', name: 'Anchor' },
// // ];

// // export default function Dashboard({ navigation }: Props) {
// //   const [phone, setPhone] = useState<string | null>(null);
// //   const [filters, setFilters] = useState({ mandi: '', crop: '' });
// //   const [appliedFilters, setAppliedFilters] = useState(filters);

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   useEffect(() => {
// //     AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
// //   }, []);

// //   const logout = async () => {
// //     await AsyncStorage.removeItem('LOGGED_IN_USER');
// //     await AsyncStorage.removeItem('LOGGED_IN_ROLE');

// //     Alert.alert(t('success_title') ?? 'Success', t('success_logged_out') ?? 'User Logged out Successfully');
   
// //      navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
// //   };

// //   const handleSearch = () => {
// //   setAppliedFilters(filters);
// //   };

// //   const handleRoleSelect = async (roleId: string) => {
// //     const phone = await AsyncStorage.getItem("LOGGED_IN_USER");
  
// //     if (!phone) {
// //   Alert.alert(t('error_title'),t('error_phone_not_found'));
// //   return;
// // }

// // const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
// // const roles = rolesJson ? JSON.parse(rolesJson) : [];

// // const roleIcons: Record<string, any> = {
// //   farmer: Tractor,
// //   buyer: ShoppingCart,
// //   seller: Store,
// //   mandi: User,
// //   anchor: Users,
// // };


// // if (roles.includes(roleId)) {
// //   // redirect to dashboard
// //   switch (roleId) {
// //     case 'farmer': navigation.navigate("FarmerDashboard"); return;
// //     case 'buyer': navigation.navigate("BuyerDashboard"); return;
// //     case 'seller': navigation.navigate("SellerDashboard"); return;
// //     case 'mandi': navigation.navigate("MandiOfficialDashboard"); return;
// //     case 'anchor': navigation.navigate("AnchorDashboard"); return;
// //   }
// // }

// // // Not registered → go to register page
// // switch (roleId) {
// //   case 'farmer': navigation.navigate("FarmerRegister"); break;
// //   case 'buyer': navigation.navigate("BuyerRegister"); break;
// //   case 'seller': navigation.navigate("SellerRegister"); break;
// //   case 'mandi': navigation.navigate("MandiOfficialRegister"); break;
// //   case 'anchor': navigation.navigate("AnchorRegister"); break;
// // }

// //   };

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
// //       <ScrollView>
// //         <View style={styles.header}>
// //           <Text style={[styles.title,{color:theme.text}]}>{t('dashboard_title')}</Text>
// //           <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
// //             <Text style={styles.logoutText}>{t('logout')}</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <Text style={[styles.sub,{color:theme.text}]}>{t('welcome')}{phone ? `, ${phone}` : ''}</Text>

// //         {/* <Text style={[styles.sectionTitle,{color:theme.text}]}>{t('select_role')}</Text>
// //         <View style={styles.rolesContainer}>
// //           {roles.map((r) => (
// //             <RoleCard key={r.id} name={r.name} onPress={() => handleRoleSelect(r.id)} />
// //           ))}
// //         </View> */}

// //         <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //   {t('select_role')}
// // </Text>

// // <ScrollView
// //   horizontal
// //   showsHorizontalScrollIndicator={false}
// //   contentContainerStyle={styles.roleScroll}
// // >
// //   {roles.map((r) => (
// //     <TouchableOpacity
// //       key={r.id}
// //       onPress={() => handleRoleSelect(r.id)}
// //       activeOpacity={0.8}
// //       style={[
// //         styles.roleCard,
// //         { backgroundColor: theme.background ?? '#f9fafb' },
// //       ]}
// //     >
// //       <View
// //         style={[
// //           styles.roleIconWrapper,
// //           { backgroundColor: theme.primary + '22' },
// //         ]}
// //       >
// //       </View>

// //       <Text style={[styles.roleText, { color: theme.text }]}>
// //         {r.name}
// //       </Text>
// //     </TouchableOpacity>
// //   ))}
// // </ScrollView>


// //         <View style={{ marginVertical: 12 }}>
// //   <TouchableOpacity
// //     onPress={() => navigation.navigate('MandiDashboard')}
// //     style={[{
// //       backgroundColor: theme.primary,
// //       paddingVertical: 12,
// //       borderRadius: 10,
// //       alignItems: 'center',
      
// //     }]}
// //   >
// //     <Text style={{ color: theme.text ?? '#fff', fontWeight: '700' }}>{t('mandi') ?? 'Mandi'}</Text>
// //   </TouchableOpacity>
// // </View>

// //         {/* Filters */}

// //          <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

// //        {/* Graph */}

// //        <View style={styles.graphContainer}>
// //           <Text style={[styles.sectionTitle,{color:theme.text},{borderColor:theme.text}]}>{t('market_trends')}</Text>
// //           <GraphChart filters={appliedFilters} />
// //         </View>

// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
// //   title: { fontSize: 26, fontWeight: '700' },
// //   logoutBtn: { backgroundColor: '#d63333ff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
// //   logoutText: { color: 'theme.text', fontWeight: '600' },
// //   sub: { color: '#555', marginBottom: 15 },
// //   sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
// //   rolesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
// //   graphContainer: { marginBottom: 20 },
// //   graphWrap: { borderWidth: 1, borderRadius: 12, padding: 12 },
// //   roleScroll: {
// //   paddingVertical: 10,
// //   gap: 12,
// // },

// // roleCard: {
// //   width: 110,
// //   paddingVertical: 12,
// //   paddingHorizontal: 8,
// //   borderRadius: 16,
// //   alignItems: 'center',
// //   marginRight: 12,
// //   borderWidth: 1,
// //   borderColor: '#e5e7eb',
// // },

// // roleIconWrapper: {
// //   width: 56,
// //   height: 56,
// //   borderRadius: 28,
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   marginBottom: 8,
// // },

// // roleIcon: {
// //   width: 32,
// //   height: 32,
// // },

// // roleText: {
// //   fontSize: 14,
// //   fontWeight: '600',
// //   textAlign: 'center',
// // },

// // });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import GraphChart from '../components/GraphChart';
// import FilterBar from '../components/FilterBar';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// import {
//   Tractor,
//   ShoppingCart,
//   Store,
//   User,
//   Users,
// } from 'lucide-react-native';

// type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// const roles = [
//   { id: 'farmer', name: 'Farmer' },
//   { id: 'buyer', name: 'Buyer' },
//   { id: 'seller', name: 'Seller' },
//   { id: 'mandi', name: 'Mandi Official' },
//   { id: 'anchor', name: 'Anchor' },
// ];

// // 🔹 Role → Icon mapping (Lucide)
// const roleIcons: Record<string, any> = {
//   farmer: Tractor,
//   buyer: ShoppingCart,
//   seller: Store,
//   mandi: User,
//   anchor: Users,
// };

// export default function Dashboard({ navigation }: Props) {
//   const [phone, setPhone] = useState<string | null>(null);
//   const [filters, setFilters] = useState({ mandi: '', crop: '' });
//   const [appliedFilters, setAppliedFilters] = useState(filters);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
//   }, []);

//   const logout = async () => {
//     await AsyncStorage.removeItem('LOGGED_IN_USER');
//     await AsyncStorage.removeItem('LOGGED_IN_ROLE');

//     Alert.alert(
//       t('success_title') ?? 'Success',
//       t('success_logged_out') ?? 'User Logged out Successfully'
//     );

//     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
//   };

//   const handleSearch = () => {
//     setAppliedFilters(filters);
//   };

//   const handleRoleSelect = async (roleId: string) => {
//     const phone = await AsyncStorage.getItem('LOGGED_IN_USER');

//     if (!phone) {
//       Alert.alert(t('error_title'), t('error_phone_not_found'));
//       return;
//     }

//     const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
//     const registeredRoles = rolesJson ? JSON.parse(rolesJson) : [];

//     if (registeredRoles.includes(roleId)) {
//       switch (roleId) {
//         case 'farmer':
//           navigation.navigate('FarmerDashboard');
//           return;
//         case 'buyer':
//           navigation.navigate('BuyerDashboard');
//           return;
//         case 'seller':
//           navigation.navigate('SellerDashboard');
//           return;
//         case 'mandi':
//           navigation.navigate('MandiOfficialDashboard');
//           return;
//         case 'anchor':
//           navigation.navigate('AnchorDashboard');
//           return;
//       }
//     }

//     // Not registered
//     switch (roleId) {
//       case 'farmer':
//         navigation.navigate('FarmerRegister');
//         break;
//       case 'buyer':
//         navigation.navigate('BuyerRegister');
//         break;
//       case 'seller':
//         navigation.navigate('SellerRegister');
//         break;
//       case 'mandi':
//         navigation.navigate('MandiOfficialRegister');
//         break;
//       case 'anchor':
//         navigation.navigate('AnchorRegister');
//         break;
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView>

//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={[styles.title, { color: theme.text }]}>
//             {t('dashboard_title')}
//           </Text>
//           <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
//             <Text style={styles.logoutText}>{t('logout')}</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={[styles.sub, { color: theme.text }]}>
//           {t('welcome')}
//           {phone ? `, ${phone}` : ''}
//         </Text>

//         {/* 🔹 SELECT ROLE (UPDATED SECTION) */}
//         <Text style={[styles.sectionTitle, { color: theme.text }]}>
//           {t('select_role')}
//         </Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.roleScroll}
//         >

//           {roles.map((r) => {
//             const Icon = roleIcons[r.id];

//             return (
//               <TouchableOpacity
//                 key={r.id}
//                 onPress={() => handleRoleSelect(r.id)}
//                 activeOpacity={0.8}
//                 style={[
//                   styles.roleCard,
//                   { backgroundColor: theme.background },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.roleIconWrapper,
//                     { backgroundColor: theme.primary + '22' },
//                   ]}
//                 >
//                   <Icon size={28} color={theme.primary} />
//                 </View>

//                 <Text style={[styles.roleText, { color: theme.text }]}>
//                   {r.name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>

//         {/* Mandi Shortcut */}
//         <View style={{ marginVertical: 12 }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('MandiDashboard')}
//             style={{
//               backgroundColor: theme.primary,
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center',
//             }}
//           >
//             <Text style={{ color: '#fff', fontWeight: '700' }}>
//               {t('mandi') ?? 'Mandi'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Filters */}
//         <FilterBar
//           filters={filters}
//           setFilters={setFilters}
//           onSearch={handleSearch}
//         />

//         {/* Graph */}
//         <View style={styles.graphContainer}>
//           <Text style={[styles.sectionTitle, { color: theme.text }]}>
//             {t('market_trends')}
//           </Text>
//           <GraphChart filters={appliedFilters} />
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },

//   title: { fontSize: 26, fontWeight: '700' },

//   logoutBtn: {
//     backgroundColor: '#d63333ff',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },

//   logoutText: { color: '#fff', fontWeight: '600' },

//   sub: { marginBottom: 15 },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 10,
//   },

//   graphContainer: { marginBottom: 20 },

//   /* 🔹 Role styles */
//   roleScroll: {
//     paddingVertical: 10,
//   },

//   roleCard: {
//     width: 110,
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },

//   roleIconWrapper: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },

//   roleText: {
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import GraphChart from '../components/GraphChart';
import FilterBar from '../components/FilterBar';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

import {
  Tractor,
  ShoppingCart,
  Store,
  User,
  Users,
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const roles = [
  { id: 'farmer', name: 'Farmer' },
  { id: 'buyer', name: 'Buyer' },
  { id: 'seller', name: 'Seller' },
  { id: 'mandi', name: 'Mandi Official' },
  { id: 'anchor', name: 'Anchor' },
];

// 🔹 Role → Lucide icon mapping
const roleIcons: Record<string, any> = {
  farmer: Tractor,
  buyer: ShoppingCart,
  seller: Store,
  mandi: User,
  anchor: Users,
};

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

    Alert.alert(
      t('success_title') ?? 'Success',
      t('success_logged_out') ?? 'User Logged out Successfully'
    );

    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleRoleSelect = async (roleId: string) => {
    const phone = await AsyncStorage.getItem('LOGGED_IN_USER');

    if (!phone) {
      Alert.alert(t('error_title'), t('error_phone_not_found'));
      return;
    }

    const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
    const registeredRoles = rolesJson ? JSON.parse(rolesJson) : [];

    if (registeredRoles.includes(roleId)) {
      switch (roleId) {
        case 'farmer':
          navigation.navigate('FarmerDashboard');
          return;
        case 'buyer':
          navigation.navigate('BuyerDashboard');
          return;
        case 'seller':
          navigation.navigate('SellerDashboard');
          return;
        case 'mandi':
          navigation.navigate('MandiOfficialDashboard');
          return;
        case 'anchor':
          navigation.navigate('AnchorDashboard');
          return;
      }
    }

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
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('dashboard_title')}
          </Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sub, { color: theme.text }]}>
          {t('welcome')}
          {phone ? `, ${phone}` : ''}
        </Text>

        {/* ✅ SELECT ROLE (FIXED & VISIBLE) */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('select_role')}
        </Text>

        <View style={{ marginBottom: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {roles.map((r) => {
              const Icon = roleIcons[r.id];

              return (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => handleRoleSelect(r.id)}
                  activeOpacity={0.8}
                  style={styles.roleCard}
                >
                  <View
                    style={[
                      styles.roleIconWrapper,
                      { backgroundColor: theme.primary },
                    ]}
                  >
                    <Icon size={28} color="#ffffff" />
                  </View>

                  <Text style={[styles.roleText, { color: theme.text }]}>
                    {r.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Mandi shortcut */}
        <View style={{ marginVertical: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MandiDashboard')}
            style={{
              backgroundColor: theme.primary,
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>
              {t('mandi') ?? 'Mandi'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />

        {/* Graph */}
        <View style={styles.graphContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('market_trends')}
          </Text>
          <GraphChart filters={appliedFilters} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: { fontSize: 26, fontWeight: '700' },

  logoutBtn: {
    backgroundColor: '#d63333ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  logoutText: { color: '#fff', fontWeight: '600' },

  sub: { marginBottom: 15 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },

  graphContainer: { marginBottom: 20 },

  /* 🔹 ROLE STYLES (VISIBLE & SCROLLABLE) */
  roleCard: {
    width: 110,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 3, // Android shadow
  },

  roleIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  roleText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// //   Alert,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { NativeStackScreenProps } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import GraphChart from '../components/GraphChart';
// // import FilterBar from '../components/FilterBar';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // import {
// //   Tractor,
// //   ShoppingCart,
// //   Store,
// //   User,
// //   Users,
// // } from 'lucide-react-native';

// // type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// // const roles = [
// //   { id: 'farmer', name: 'Farmer' },
// //   { id: 'buyer', name: 'Buyer' },
// //   { id: 'seller', name: 'Seller' },
// //   { id: 'mandi', name: 'Mandi Official' },
// //   { id: 'anchor', name: 'Anchor' },
// // ];

// // // 🔹 Role → Lucide icon mapping
// // const roleIcons: Record<string, any> = {
// //   farmer: Tractor,
// //   buyer: ShoppingCart,
// //   seller: Store,
// //   mandi: User,
// //   anchor: Users,
// // };

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

// //     Alert.alert(
// //       t('success_title') ?? 'Success',
// //       t('success_logged_out') ?? 'User Logged out Successfully'
// //     );

// //     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
// //   };

// //   const handleSearch = () => {
// //     setAppliedFilters(filters);
// //   };

// //   const handleRoleSelect = async (roleId: string) => {
// //     const phone = await AsyncStorage.getItem('LOGGED_IN_USER');

// //     if (!phone) {
// //       Alert.alert(t('error_title'), t('error_phone_not_found'));
// //       return;
// //     }

// //     const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
// //     const registeredRoles = rolesJson ? JSON.parse(rolesJson) : [];

// //     if (registeredRoles.includes(roleId)) {
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

// //   return (
// //     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
// //       <ScrollView>

// //         {/* Header */}
// //         <View style={styles.header}>
// //           <Text style={[styles.title, { color: theme.text }]}>
// //             {t('dashboard_title')}
// //           </Text>
// //           <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
// //             <Text style={styles.logoutText}>{t('logout')}</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <Text style={[styles.sub, { color: theme.text }]}>
// //           {t('welcome')}
// //           {phone ? `, ${phone}` : ''}
// //         </Text>

// //         {/* ✅ SELECT ROLE (FIXED & VISIBLE) */}
// //         <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //           {t('select_role')}
// //         </Text>

// //         <View style={{ marginBottom: 12 }}>
// //           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //             {roles.map((r) => {
// //               const Icon = roleIcons[r.id];

// //               return (
// //                 <TouchableOpacity
// //                   key={r.id}
// //                   onPress={() => handleRoleSelect(r.id)}
// //                   activeOpacity={0.8}
// //                   style={styles.roleCard}
// //                 >
// //                   <View
// //                     style={[
// //                       styles.roleIconWrapper,
// //                       { backgroundColor: theme.primary },
// //                     ]}
// //                   >
// //                     <Icon size={28} color="#ffffff" />
// //                   </View>

// //                   <Text style={[styles.roleText, { color: theme.text }]}>
// //                     {r.name}
// //                   </Text>
// //                 </TouchableOpacity>
// //               );
// //             })}
// //           </ScrollView>
// //         </View>

// //         {/* Mandi shortcut */}
// //         <View style={{ marginVertical: 12 }}>
// //           <TouchableOpacity
// //             onPress={() => navigation.navigate('MandiDashboard')}
// //             style={{
// //               backgroundColor: theme.primary,
// //               paddingVertical: 12,
// //               borderRadius: 10,
// //               alignItems: 'center',
// //             }}
// //           >
// //             <Text style={{ color: '#fff', fontWeight: '700' }}>
// //               {t('mandi') ?? 'Mandi'}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Filters */}
// //         <FilterBar
// //           filters={filters}
// //           setFilters={setFilters}
// //           onSearch={handleSearch}
// //         />

// //         {/* Graph */}
// //         <View style={styles.graphContainer}>
// //           <Text style={[styles.sectionTitle, { color: theme.text }]}>
// //             {t('market_trends')}
// //           </Text>
// //           <GraphChart filters={appliedFilters} />
// //         </View>

// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },

// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },

// //   title: { fontSize: 26, fontWeight: '700' },

// //   logoutBtn: {
// //     backgroundColor: '#d63333ff',
// //     paddingHorizontal: 10,
// //     paddingVertical: 6,
// //     borderRadius: 8,
// //   },

// //   logoutText: { color: '#fff', fontWeight: '600' },

// //   sub: { marginBottom: 15 },

// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     marginVertical: 10,
// //   },

// //   graphContainer: { marginBottom: 20 },

// //   /* 🔹 ROLE STYLES (VISIBLE & SCROLLABLE) */
// //   roleCard: {
// //     width: 110,
// //     paddingVertical: 14,
// //     paddingHorizontal: 8,
// //     borderRadius: 16,
// //     alignItems: 'center',
// //     marginRight: 12,
// //     backgroundColor: '#ffffff',
// //     borderWidth: 1,
// //     borderColor: '#e5e7eb',
// //     elevation: 3, // Android shadow
// //   },

// //   roleIconWrapper: {
// //     width: 56,
// //     height: 56,
// //     borderRadius: 28,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 8,
// //   },

// //   roleText: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     textAlign: 'center',
// //   },
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Modal,
//   TextInput,
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
//   User,
//   Pencil,
//   LogOut,
//   Settings,
// } from 'lucide-react-native';

// type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// export default function Dashboard({ navigation }: Props) {
//   const [phone, setPhone] = useState<string | null>(null);
//   const [profileName, setProfileName] = useState<string | null>(null);

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showEditName, setShowEditName] = useState(false);
//   const [tempName, setTempName] = useState('');

//   const [filters, setFilters] = useState({ mandi: '', crop: '' });
//   const [appliedFilters, setAppliedFilters] = useState(filters);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   useEffect(() => {
//     AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
//     AsyncStorage.getItem('PROFILE_NAME').then(setProfileName);
//   }, []);

//   const displayName = profileName
//     ? profileName
//     : phone
//     ? `+91 ${phone}`
//     : '';

//   const saveName = async () => {
//     if (!tempName.trim()) return;
//     await AsyncStorage.setItem('PROFILE_NAME', tempName.trim());
//     setProfileName(tempName.trim());
//     setShowEditName(false);
//   };

//   const logout = async () => {
//     await AsyncStorage.multiRemove([
//       'LOGGED_IN_USER',
//       'LOGGED_IN_ROLE',
//       'PROFILE_NAME',
//     ]);
//     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <Text style={[styles.title, { color: theme.text }]}>
//             {t('dashboard_title')}
//           </Text>

//           {/* PROFILE ICON */}
//           <TouchableOpacity onPress={() => setShowProfileMenu(true)}>
//             <User size={28} color={theme.text} />
//           </TouchableOpacity>
//         </View>

//         {/* WELCOME */}
//         <View style={styles.welcomeRow}>
//           <Text style={[styles.welcomeText, { color: theme.text }]}>
//             {t('welcome')}, {displayName}
//           </Text>

//           <TouchableOpacity onPress={() => {
//             setTempName(profileName ?? '');
//             setShowEditName(true);
//           }}>
//             <Pencil size={18} color={theme.primary} />
//           </TouchableOpacity>
//         </View>

//         {/* FILTERS & GRAPH */}
//         <FilterBar filters={filters} setFilters={setFilters} onSearch={() => setAppliedFilters(filters)} />

//         <GraphChart filters={appliedFilters} />

//       </ScrollView>

//       {/* EDIT NAME MODAL */}
//       <Modal transparent visible={showEditName} animationType="fade">
//         <View style={styles.modalBackdrop}>
//           <View style={[styles.modalCard, { backgroundColor: theme.background }]}>
//             <Text style={[styles.modalTitle, { color: theme.text }]}>
//               Edit Name
//             </Text>

//             <TextInput
//               value={tempName}
//               onChangeText={setTempName}
//               placeholder="Enter your name"
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <TouchableOpacity style={styles.saveBtn} onPress={saveName}>
//               <Text style={styles.saveText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* PROFILE MENU */}
//       <Modal transparent visible={showProfileMenu} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalBackdrop}
//           onPress={() => setShowProfileMenu(false)}
//         >
//           <View style={[styles.profileMenu, { backgroundColor: theme.background }]}>
//             <TouchableOpacity style={styles.menuItem}>
//               <Settings size={18} />
//               <Text style={styles.menuText}>Settings</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.menuItem} onPress={logout}>
//               <LogOut size={18} color="red" />
//               <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   title: { fontSize: 24, fontWeight: '700' },

//   welcomeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginVertical: 12,
//   },

//   welcomeText: { fontSize: 18, fontWeight: '600' },

//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   modalCard: {
//     width: '80%',
//     padding: 20,
//     borderRadius: 12,
//   },

//   modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },

//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//   },

//   saveBtn: {
//     backgroundColor: '#22c55e',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },

//   saveText: { color: '#fff', fontWeight: '700' },

//   profileMenu: {
//     position: 'absolute',
//     top: 60,
//     right: 20,
//     borderRadius: 12,
//     padding: 10,
//     width: 180,
//   },

//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     paddingVertical: 10,
//   },

//   menuText: { fontSize: 16 },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TextInput,
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
  User,
  Pencil,
  LogOut,
  Settings,
  Tractor,
  ShoppingCart,
  Store,
  Users,
  ArrowLeft,
} from 'lucide-react-native';

import AppHamburgerMenu from '../components/AppHamburgerMenu';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

interface DashboardFilters {
  mandi: string;
  crop: string;
  district: string;
  days: number;
}

/* ---------------- Roles ---------------- */
const roles = [
  { id: 'farmer', name: 'Farmer', icon: Tractor },
  { id: 'buyer', name: 'Buyer', icon: ShoppingCart },
  { id: 'seller', name: 'Seller', icon: Store },
  { id: 'mandi', name: 'Mandi Official', icon: User },
  { id: 'anchor', name: 'Anchor', icon: Users },
];

export default function Dashboard({ navigation }: Props) {
  const [phone, setPhone] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);

  //const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [tempName, setTempName] = useState('');

  //const [filters, setFilters] = useState({ mandi: '', crop: '', district: '', days: 1 });
  const [filters, setFilters] = useState<DashboardFilters>({
  mandi: '',
  crop: '',
  district: '',
  days: 1,
});

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then(setPhone);
    AsyncStorage.getItem('PROFILE_NAME').then(setProfileName);
  }, []);

  /* ---------------- Helpers ---------------- */
  const displayName = profileName
    ? profileName
    : phone
    ? `+91 ${phone}`
    : '';

  const saveName = async () => {
    if (!tempName.trim()) return;
    await AsyncStorage.setItem('PROFILE_NAME', tempName.trim());
    setProfileName(tempName.trim());
    setShowEditName(false);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([
      'LOGGED_IN_USER',
      'LOGGED_IN_ROLE',
      'PROFILE_NAME',
    ]);
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  const handleSearch = () => {
    setAppliedFilters({...filters});
  };

const goBack = () => navigation.navigate('Dashboard');

  const handleRoleSelect = async (roleId: string) => {
    const phone = await AsyncStorage.getItem('LOGGED_IN_USER');
    if (!phone) return;

    const rolesJson = await AsyncStorage.getItem(`REGISTERED_ROLES_${phone}`);
    const registeredRoles = rolesJson ? JSON.parse(rolesJson) : [];

    if (registeredRoles.includes(roleId)) {
      switch (roleId) {
        case 'farmer': navigation.navigate('FarmerDashboard'); return;
        case 'buyer': navigation.navigate('BuyerDashboard'); return;
        case 'seller': navigation.navigate('SellerDashboard'); return;
        case 'mandi': navigation.navigate('MandiOfficialDashboard'); return;
        case 'anchor': navigation.navigate('AnchorDashboard'); return;
      }
    }

    switch (roleId) {
      case 'farmer': navigation.navigate('FarmerRegister'); break;
      case 'buyer': navigation.navigate('BuyerRegister'); break;
      case 'seller': navigation.navigate('SellerRegister'); break;
      case 'mandi': navigation.navigate('MandiOfficialRegister'); break;
      case 'anchor': navigation.navigate('AnchorRegister'); break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>

        {/* ---------------- Header ---------------- */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('dashboard_title')}
          </Text>

          <AppHamburgerMenu role="user" />
          {/* <TouchableOpacity onPress={() => setShowProfileMenu(true)}>
            <User size={28} color={theme.text} />
          </TouchableOpacity> */}

        </View>

        {/* ---------------- Welcome ---------------- */}
        <View style={styles.welcomeRow}>
          <Text style={[styles.welcomeText, { color: theme.text }]}>
            {t('welcome')}, {displayName}
          </Text>

          <TouchableOpacity onPress={() => {
            setTempName(profileName ?? '');
            setShowEditName(true);
          }}>
            <Pencil size={18} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {/* ---------------- SELECT ROLE ---------------- */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('select_role')}
        </Text>

        <View style={{ marginBottom: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {roles.map((r) => {
              const Icon = r.icon;
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
                    <Icon size={26} color="#fff" />
                  </View>

                  <Text style={[styles.roleText]}>
                    {r.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ---------------- MANDI QUICK ACCESS ---------------- */}
<View style={{ marginVertical: 12 }}>
  <TouchableOpacity
    onPress={() => navigation.navigate('MandiDashboard')}
    style={[
      styles.mandiBtn,{ backgroundColor: theme.primary }]}
  >
    <Text style={[styles.mandiBtnText,{color: theme.text}]}>
      {t('mandi') ?? 'Mandi'}
    </Text>
  </TouchableOpacity>
</View>


        {/* ---------------- Filters & Graph ---------------- */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('market_trends')}
        </Text>

        <GraphChart filters={appliedFilters} />

      </ScrollView>

      {/* ---------------- Edit Name Modal ---------------- */}
<Modal transparent visible={showEditName} animationType="fade">
  <View style={styles.modalBackdrop}>
    <View style={[styles.modalCard, { backgroundColor: theme.background }]}>

      {/* Modal Header */}
      <View style={styles.modalHeader}>
        <TouchableOpacity
          onPress={() => {
            setTempName(profileName ?? '');
            setShowEditName(false);
          }}
        >
          <ArrowLeft size={22} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.modalTitle, { color: theme.text }]}>
          {t('edit_name') ?? 'Edit Name'}
        </Text>

        {/* spacer to balance layout */}
        <View style={{ width: 22 }} />
      </View>

      {/* Input */}
      <TextInput
        value={tempName}
        onChangeText={setTempName}
        placeholder={t('enter_name') ?? 'Enter your name'}
        placeholderTextColor={theme.placeholder ?? '#999'}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.text },
        ]}
      />

      {/* Save */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveName}>
        <Text style={styles.saveText}>{t('save') ?? 'Save'}</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { fontSize: 24, fontWeight: '700' },

  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },

  welcomeText: { fontSize: 18, fontWeight: '600' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },

  roleCard: {
    width: 110,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 3,
  },

  roleIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  roleText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
  },

  saveText: { color: '#fff', fontWeight: '700' },

  profileMenu: {
    position: 'absolute',
    top: 60,
    right: 20,
    borderRadius: 12,
    padding: 10,
    width: 180,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },

  menuText: { fontSize: 16 },

  mandiBtn: {
  paddingVertical: 10,
  borderRadius: 30,
  alignItems: 'center',
  elevation: 3,
},

mandiBtnText: {
  fontWeight: '700',
  fontSize: 16,
},

  backBtn: {
    alignContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  backText: { fontWeight: '700', fontSize: 16 },

  modalHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
},

});

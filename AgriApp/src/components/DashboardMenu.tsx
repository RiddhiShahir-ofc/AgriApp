// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   GestureResponderEvent,
// } from 'react-native';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type ThemeKey = 'light' | 'dark' | 'system';

// type DashboardMenuProps = {
//   // Required actions
//   onOpenProfile: (e?: GestureResponderEvent) => void;
//   onLogout: (e?: GestureResponderEvent) => void;

//   // Optional: plug your real setters here
//   onChangeTheme?: (theme: ThemeKey) => void;
//   onChangeLanguage?: (langCode: string) => void;

//   // For highlighting current selection (optional)
//   currentTheme?: ThemeKey;
//   currentLanguage?: string; // e.g. 'en', 'mr'
// };

// const DashboardMenu: React.FC<DashboardMenuProps> = ({
//   onOpenProfile,
//   onLogout,
//   onChangeTheme,
//   onChangeLanguage,
//   currentTheme = 'light',
//   currentLanguage = 'en',
// }) => {
//   const [visible, setVisible] = useState(false);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const close = () => setVisible(false);
//   const open = () => setVisible(true);

//   const handleThemeChange = (value: ThemeKey) => {
//     onChangeTheme?.(value);
//   };

//   const handleLanguageChange = (code: string) => {
//     onChangeLanguage?.(code);
//   };

//   return (
//     <>
//       {/* 🔹 Hamburger button – put this in your header row */}
//       <TouchableOpacity onPress={open} style={styles.hamburgerBtn}>
//         {/* Simple 3-line hamburger icon */}
//         <View style={[styles.bar, { backgroundColor: theme.text }]} />
//         <View style={[styles.bar, { backgroundColor: theme.text }]} />
//         <View style={[styles.bar, { backgroundColor: theme.text }]} />
//       </TouchableOpacity>

//       {/* 🔹 Right-side drawer menu */}
//       <Modal
//         transparent
//         animationType="slide"
//         visible={visible}
//         onRequestClose={close}
//       >
//         <View style={styles.overlay}>
//           {/* Tap on dark area to close */}
//           <TouchableOpacity style={styles.flexFill} onPress={close} />

//           <View
//             style={[
//               styles.drawer,
//               { backgroundColor: theme.background, borderLeftColor: '#e5e7eb' },
//             ]}
//           >
//             {/* Header */}
//             <View style={styles.drawerHeader}>
//               <Text style={[styles.drawerTitle, { color: theme.text }]}>
//                 {t('menu') ?? 'Menu'}
//               </Text>
//               <TouchableOpacity onPress={close}>
//                 <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Profile */}
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={(e) => {
//                 close();
//                 onOpenProfile(e);
//               }}
//             >
//               <Text style={[styles.menuItemText, { color: theme.text }]}>
//                 {t('profile') ?? 'Profile'}
//               </Text>
//             </TouchableOpacity>

//             {/* Settings section */}
//             <View style={styles.menuSection}>
//               <Text style={[styles.sectionTitle, { color: theme.text }]}>
//                 {t('settings') ?? 'Settings'}
//               </Text>

//               {/* Theme selector */}
//               <Text style={[styles.smallLabel, { color: theme.text }]}>
//                 {t('selectTheme') ?? 'Select Theme'}
//               </Text>
//               <View style={styles.chipRow}>
//                 {(['light', 'dark', 'system'] as ThemeKey[]).map((key) => (
//                   <TouchableOpacity
//                     key={key}
//                     style={[
//                       styles.chip,
//                       currentTheme === key && styles.chipActive,
//                     ]}
//                     onPress={() => handleThemeChange(key)}
//                   >
//                     <Text
//                       style={[
//                         styles.chipText,
//                         currentTheme === key && styles.chipTextActive,
//                       ]}
//                     >
//                       {key === 'light'
//                         ? t('modelight') ?? 'Light'
//                         : key === 'dark'
//                         ? t('modedark') ?? 'Dark'
//                         : t('modelight') ?? 'System'}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               {/* Language selector */}
//               <Text style={[styles.smallLabel, { color: theme.text, marginTop: 12 }]}>
//                 {t('selectLanguage') ?? 'Select Language'}
//               </Text>
//               <View style={styles.chipRow}>
//                 {[
//                   { code: 'en', label: 'English' },
//                   { code: 'mr', label: 'मराठी' },
//                   { code: 'hi', label: 'हिन्दी' },
//                 ].map((lang) => (
//                   <TouchableOpacity
//                     key={lang.code}
//                     style={[
//                       styles.chip,
//                       currentLanguage === lang.code && styles.chipActive,
//                     ]}
//                     onPress={() => handleLanguageChange(lang.code)}
//                   >
//                     <Text
//                       style={[
//                         styles.chipText,
//                         currentLanguage === lang.code && styles.chipTextActive,
//                       ]}
//                     >
//                       {lang.label}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Help (optional simple button) */}
//             <TouchableOpacity
//               style={styles.menuItem}
//               onPress={() => {
//                 // you can replace this with navigation to Help screen
//                 close();
//               }}
//             >
//               <Text style={[styles.menuItemText, { color: theme.text }]}>
//                 {t('help') ?? 'Help'}
//               </Text>
//             </TouchableOpacity>

//             {/* Logout */}
//             <TouchableOpacity
//               style={[styles.menuItem, { marginTop: 8 }]}
//               onPress={(e) => {
//                 close();
//                 onLogout(e);
//               }}
//             >
//               <Text style={[styles.menuItemText, { color: '#dc2626' }]}>
//                 {t('logout') ?? 'Logout'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default DashboardMenu;

// const styles = StyleSheet.create({
//   hamburgerBtn: {
//     padding: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bar: {
//     width: 22,
//     height: 2,
//     borderRadius: 2,
//     marginVertical: 2,
//   },
//   overlay: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   flexFill: {
//     flex: 1,
//   },
//   drawer: {
//     width: '70%',
//     borderLeftWidth: 1,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 30,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   drawerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   closeText: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   menuItem: {
//     paddingVertical: 10,
//   },
//   menuItemText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   menuSection: {
//     marginVertical: 10,
//     paddingVertical: 8,
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderColor: '#e5e7eb',
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 6,
//   },
//   smallLabel: {
//     fontSize: 13,
//     marginBottom: 4,
//   },
//   chipRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     marginRight: 8,
//     marginBottom: 6,
//   },
//   chipActive: {
//     backgroundColor: '#2563eb',
//     borderColor: '#2563eb',
//   },
//   chipText: {
//     fontSize: 13,
//     color: '#374151',
//   },
//   chipTextActive: {
//     color: '#fff',
//     fontWeight: '700',
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Alert
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ThemeKey = 'light' | 'dark';

type DashboardMenuProps = {
  // Required actions
  onOpenProfile: (e?: GestureResponderEvent) => void;
  onLogout: (e?: GestureResponderEvent) => void;

  // Optional: plug your real setters here
  onChangeTheme?: (theme: ThemeKey) => void;
  onChangeLanguage?: (langCode: string) => void;

  // For highlighting current selection (optional)
  currentTheme?: ThemeKey;
  currentLanguage?: string; // e.g. 'en', 'mr'
};

const DashboardMenu: React.FC<DashboardMenuProps> = ({
  onOpenProfile,
  onLogout,
  onChangeTheme,
  onChangeLanguage,
  currentTheme = 'light',
  currentLanguage = 'en',
}) => {
  const [visible, setVisible] = useState(false);

  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const close = () => setVisible(false);
  const open = () => setVisible(true);

  const handleThemeChange = (value: ThemeKey) => {
    onChangeTheme?.(value);
  };

  const handleLanguageChange = (code: string) => {
    onChangeLanguage?.(code);
  };

const onlogout = async () => {
  await AsyncStorage.removeItem('LOGGED_IN_USER');
  await AsyncStorage.removeItem('LOGGED_IN_ROLE');

  Alert.alert(
    t('success_title') ?? 'Success',
    t('success_logged_out') ?? 'User Logged out Successfully'
  );

  navigation.reset({
    index: 0,
    routes: [{ name: 'Landing' }],
  });
};
  return (
    <>
      {/* 🔹 Hamburger button – put this in your header row */}
      <TouchableOpacity onPress={open} style={styles.hamburgerBtn}>
        {/* Simple 3-line hamburger icon */}
        <View style={[styles.bar, { backgroundColor: theme.text }]} />
        <View style={[styles.bar, { backgroundColor: theme.text }]} />
        <View style={[styles.bar, { backgroundColor: theme.text }]} />
      </TouchableOpacity>

      {/* 🔹 Right-side drawer menu */}
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        onRequestClose={close}
      >
        <View style={styles.overlay}>
          {/* Tap on dark area to close */}
          <TouchableOpacity style={styles.flexFill} onPress={close} />

          <View
            style={[
              styles.drawer,
              { backgroundColor: theme.background, borderLeftColor: '#e5e7eb' },
            ]}
          >
            {/* Header */}
            <View style={styles.drawerHeader}>
              <Text style={[styles.drawerTitle, { color: theme.text }]}>
                {t('menu') ?? 'Menu'}
              </Text>
              <TouchableOpacity onPress={close}>
                <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Profile */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={e => {
                close();
                onOpenProfile(e);
              }}
            >
              <Text style={[styles.menuItemText, { color: theme.text }]}>
                {t('profile') ?? 'Profile'}
              </Text>
            </TouchableOpacity>

            {/* Settings section */}
            <View style={styles.menuSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {t('settings') ?? 'Settings'}
              </Text>

              {/* Theme selector */}
              <Text style={[styles.smallLabel, { color: theme.text }]}>
                {t('selectTheme') ?? 'Select Theme'}
              </Text>
              <View style={styles.chipRow}>
                {(['light', 'dark'] as ThemeKey[]).map(key => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.chip,
                      currentTheme === key && styles.chipActive,
                    ]}
                    onPress={() => handleThemeChange(key)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        currentTheme === key && styles.chipTextActive,
                      ]}
                    >
                      {key === 'light'
                        ? t('modelight') ?? 'Light'
                        : key === 'dark'
                        ? t('modedark') ?? 'Dark'
                        : t('modelight') ?? 'System'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Language selector */}
              <Text
                style={[styles.smallLabel, { color: theme.text, marginTop: 12 }]}
              >
                {t('selectLanguage') ?? 'Select Language'}
              </Text>
              <View style={styles.chipRow}>
                {[
                  { code: 'en', label: 'English' },
                  { code: 'mr', label: 'मराठी' },
                  { code: 'hi', label: 'हिन्दी' },
                ].map(lang => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.chip,
                      currentLanguage === lang.code && styles.chipActive,
                    ]}
                    onPress={() => handleLanguageChange(lang.code)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        currentLanguage === lang.code && styles.chipTextActive,
                      ]}
                    >
                      {lang.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Help (placeholder) */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                // you can replace this with navigation to Help screen
                close();
              }}
            >
              <Text style={[styles.menuItemText, { color: theme.text }]}>
                {t('help') ?? 'Help'}
              </Text>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              style={[styles.menuItem, { marginTop: 8 }]}
              onPress={e => {
                 const logout = async () => {
    await AsyncStorage.removeItem('LOGGED_IN_USER');
    await AsyncStorage.removeItem('LOGGED_IN_ROLE');

    Alert.alert(t('success_title') ?? 'Success', t('success_logged_out') ?? 'User Logged out Successfully');
   
     navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };
              }}
            >
              <Text style={[styles.menuItemText, { color: '#dc2626' }]}>
                {t('logout') ?? 'Logout'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DashboardMenu;

const styles = StyleSheet.create({
  hamburgerBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: 22,
    height: 2,
    borderRadius: 2,
    marginVertical: 2,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  flexFill: {
    flex: 1,
  },
  drawer: {
    width: '70%',
    borderLeftWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSection: {
    marginVertical: 10,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  smallLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 8,
    marginBottom: 6,
  },
  chipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  chipText: {
    fontSize: 13,
    color: '#374151',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
});

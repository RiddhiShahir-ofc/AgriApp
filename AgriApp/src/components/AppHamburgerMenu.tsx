import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

import {User,LogOut,Settings} from 'lucide-react-native';

type Role =
  | 'farmer'
  | 'buyer'
  | 'seller'
  | 'anchor'
  | 'mandiofficial'
  | 'user';

const PROFILE_ROUTE_MAP: Record<Role, string> = {
  farmer: 'FarmerProfile',
  buyer: 'BuyerProfile',
  seller: 'SellerProfile',
  anchor: 'AnchorProfile',
  mandiofficial: 'MandiOfficialProfile',
  user: 'UserProfile',
};

export default function AppHamburgerMenu({ role }: { role: Role }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const logout = async () => {
    await AsyncStorage.multiRemove([
      'ACCESS_TOKEN',
      'LOGGED_IN_USER',
      'LOGGED_IN_ROLE',
    ]);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Landing' }],
    });
  };

  return (
    <>
      {/* ☰ icon */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={{ fontSize: 22, color: theme.text }}>☰</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.menu,
              { backgroundColor: theme.background },
            ]}
          >
            {/* Profile */}
            <MenuItem
            icon={<User size={18} />}
              label={t('profile') ?? 'Profile'}
              onPress={() => {
                setVisible(false);
                navigation.navigate(PROFILE_ROUTE_MAP[role]);
              }}
            />

            {/* Settings */}
            <MenuItem
              icon={<Settings size={18} />}
              label={t('settings') ?? 'Settings'}
              onPress={() => {
                setVisible(false);
                navigation.navigate('Settings');
              }}
            />

            {/* Logout */}
            <MenuItem
              icon={<LogOut size={18} color="red" />}
              label={t('logout') ?? 'Logout'}
              danger
              onPress={() => {
                setVisible(false);
                logout();
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

// const MenuItem = ({
//   label,
//   onPress,
//   danger,
//   icon,
// }: {
//   label: string;
//   onPress: () => void;
//   danger?: boolean;
//   icon?: React.ReactElement;
// }) => (

//   <TouchableOpacity style={styles.item} onPress={onPress}>
//     {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
//     <Text
//       style={[
//         styles.text,
//         danger && { color: '#dc2626' }, // Tailwind red-600 color    
//       ]}
//     >
//       {label}
//     </Text>
//   </TouchableOpacity>
// );

// const MenuItem = ({
//   label,
//   onPress,
//   danger,
//   icon,
// }: {
//   label: string;
//   onPress: () => void;
//   danger?: boolean;
//   icon?: React.ReactElement;
// }) => {
//   const { theme } = useTheme(); // 👈 get theme here

//   return (
//     <TouchableOpacity style={styles.item} onPress={onPress}>
//       {icon && <View style={{ marginRight: 8 }}>{icon}</View>}

//       <Text
//         style={[
//           styles.text,
//           { color: danger ? '#dc2626' : theme.text }, // 👈 dynamic color
//         ]}
//       >
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// };

const MenuItem = ({
  label,
  onPress,
  danger,
  icon,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
  icon?: React.ReactElement<{ color?: string; size?: number }>;

}) => {
  const { theme } = useTheme();

  const iconColor = danger ? '#dc2626' : theme.text;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {icon && (
        <View style={{ marginRight: 8 }}>
          {React.cloneElement(icon, {
            color: iconColor, //  icon color controlled here
          })}
        </View>
      )}

      <Text
        style={[
          styles.text,
          { color: iconColor }, //  text color matches icon
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    marginTop: 60,
    marginRight: 12,
    borderRadius: 8,
    minWidth: 160,
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',      // THIS IS THE KEY
    alignItems: 'center',      // vertically center icon + text
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

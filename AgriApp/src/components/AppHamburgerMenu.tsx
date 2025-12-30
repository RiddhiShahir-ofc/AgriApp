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

type Role =
  | 'farmer'
  | 'buyer'
  | 'seller'
  | 'anchor'
  | 'mandiofficial';

const PROFILE_ROUTE_MAP: Record<Role, string> = {
  farmer: 'FarmerProfile',
  buyer: 'BuyerProfile',
  seller: 'SellerProfile',
  anchor: 'AnchorProfile',
  mandiofficial: 'MandiOfficialProfile',
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
              label={t('profile') ?? 'Profile'}
              onPress={() => {
                setVisible(false);
                navigation.navigate(PROFILE_ROUTE_MAP[role]);
              }}
            />

            {/* Settings */}
            <MenuItem
              label={t('settings') ?? 'Settings'}
              onPress={() => {
                setVisible(false);
                navigation.navigate('Settings');
              }}
            />

            {/* Logout */}
            <MenuItem
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

const MenuItem = ({
  label,
  onPress,
  danger,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text
      style={[
        styles.text,
        danger && { color: '#dc2626' },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DashboardMenu from '../DashboardMenu';

type Props = {
  theme: any;
  t: (key: string) => string;
  onBack: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
};

export default function FarmerTopBar({
  theme,
  t,
  onBack,
  onOpenProfile,
  onLogout,
}: Props) {
  return (
    <View style={styles.topBarRow}>
      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        style={[
          styles.backBtn,
          { backgroundColor: theme.background ?? '#edf2f7' },
        ]}
      >
        <Text
          style={[
            styles.backText,
            { color: theme.primary ?? '#2b6cb0' },
          ]}
        >
          {t('back') ?? 'Back'}
        </Text>
      </TouchableOpacity>

      {/* Title + subtitle */}
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('farmer_dashboard') ?? 'Farmer Dashboard'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {t('farmer_message') ?? 'Manage your crop lots'}
        </Text>
      </View>

      {/* Hamburger menu */}
      <DashboardMenu
        onOpenProfile={onOpenProfile}
        onLogout={onLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  backText: {
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
  },
});

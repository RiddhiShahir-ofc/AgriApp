import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type UserProfile = {
  userId: string;
  mobileNumber: string;
  preferredLanguage: string;
  isVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
};

type RoleStatus = {
  isFarmer: boolean;
  isBuyer: boolean;
  isSeller: boolean;
  isMandiOfficial: boolean;
  isAnchor: boolean;
};

export default function UserProfile() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<RoleStatus | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, roleRes] = await Promise.all([
          api.get('user/profile'),
          api.get('/roles/status'),
        ]);

        setProfile(profileRes.data);
        setRoles(roleRes.data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </SafeAreaView>
    );
  }

  if (!profile || !roles) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>
          {t('profile_load_failed') || 'Unable to load profile'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>
          {t('profile') || 'User Profile'}
        </Text>

        {/* Profile Info */}
        <View style={[styles.card, { backgroundColor: theme.primary }]}>
          <Info label="Mobile Number" value={profile.mobileNumber} theme={theme} />
          <Info label="Preferred Language" value={profile.preferredLanguage} theme={theme} />
          <Info
            label="Verification Status"
            value={profile.isVerified ? 'Verified' : 'Not Verified'}
            theme={theme}
          />
          <Info label="Last Login" value={formatDate(profile.lastLoginAt)} theme={theme} />
          <Info label="Created At" value={formatDate(profile.createdAt)} theme={theme} />
        </View>

        {/* Roles */}
        <Text style={[styles.subHeading, { color: theme.text }]}>
          {t('roles') || 'Assigned Roles'}
        </Text>

        <View style={[styles.card, { backgroundColor: theme.primary }]}>
          {renderRole('Farmer', roles.isFarmer, theme)}
          {renderRole('Buyer', roles.isBuyer, theme)}
          {renderRole('Seller', roles.isSeller, theme)}
          {renderRole('Mandi Official', roles.isMandiOfficial, theme)}
          {renderRole('Anchor', roles.isAnchor, theme)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Helpers ---------- */

function Info({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: any;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

function renderRole(name: string, enabled: boolean, theme: any) {
  return (
    <View style={styles.roleRow}>
      <Text style={{ color: theme.text }}>{name}</Text>
      <Text style={{ color: enabled ? theme.success : theme.danger }}>
        {enabled ? 'Yes' : 'No'}
      </Text>
    </View>
  );
}

function formatDate(date?: string) {
  if (!date) return '-';
  return new Date(date).toLocaleString();
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
  card: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});

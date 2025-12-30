import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type MandiOfficialProfile = {
  officialId: string;
  officialName: string;
  employeeId: string;
  email: string;

  mandiId: number;
  mandiName?: string;
  mandiLocation?: string;

  officialRoleId: string;
  officialRoleName?: string;

  createdAt: string;
  updatedAt?: string;
};

export default function MandiOfficialProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [profile, setProfile] = useState<MandiOfficialProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const goBack = () => navigation.goBack();

  /* ---------------- LOAD PROFILE ---------------- */
  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/mandi-official/profile');
      setProfile(res.data);
    } catch (err: any) {
      Alert.alert(
        t('error_title') ?? 'Error',
        err?.response?.data?.message ?? 'Failed to load profile',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: theme.background }]}
      >
        <Text style={{ color: theme.text }}>
          {t('profile_not_found') ?? 'Profile not found'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text
          onPress={goBack}
          style={[styles.backText, { color: theme.primary }]}
        >
          {t('back') ?? 'Back'}
        </Text>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        {t('profile') ?? 'Mandi Official Profile'}
      </Text>

      {/* Profile Card */}
      <View
        style={[
          styles.card,
          { borderColor: theme.text + '30', backgroundColor: theme.background },
        ]}
      >
        <ProfileRow
          label={t('official_name') ?? 'Name'}
          value={profile.officialName}
          theme={theme}
        />

        <ProfileRow
          label={t('employee_id') ?? 'Employee ID'}
          value={profile.employeeId}
          theme={theme}
        />

        <ProfileRow
          label={t('email') ?? 'Email'}
          value={profile.email}
          theme={theme}
        />

        <ProfileRow
          label={t('role') ?? 'Role'}
          value={profile.officialRoleName ?? '-'}
          theme={theme}
        />

        <ProfileRow
          label={t('mandi') ?? 'Mandi'}
          value={profile.mandiName ?? '-'}
          theme={theme}
        />

        <ProfileRow
          label={t('location') ?? 'Location'}
          value={profile.mandiLocation ?? '-'}
          theme={theme}
        />

        <ProfileRow
          label={t('created_at') ?? 'Created At'}
          value={new Date(profile.createdAt).toLocaleDateString()}
          theme={theme}
        />

        {profile.updatedAt && (
          <ProfileRow
            label={t('updated_at') ?? 'Updated At'}
            value={new Date(profile.updatedAt).toLocaleDateString()}
            theme={theme}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

/* ---------------- SMALL REUSABLE ROW ---------------- */

function ProfileRow({
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
      <Text style={[styles.label, { color: theme.text }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: theme.text }]}>
        {value}
      </Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
  },
});

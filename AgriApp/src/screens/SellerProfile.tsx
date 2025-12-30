import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type SellerProfile = {
  sellerId: string;
  sellerName: string;
  businessName: string;
  location: string;
  profilePhotoUrl?: string | null;
  interestedCropIds: number[];
  createdAt: string;
  updatedAt: string;
};

export default function SellerProfileScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  const fetchSellerProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/seller/profile');
      setProfile(res.data);
    } catch (err) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('profile_load_failed') ?? 'Unable to load seller profile'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>
          {t('no_profile_data') ?? 'No profile data available'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image
        <Image
          source={
            profile.profilePhotoUrl
              ? { uri: profile.profilePhotoUrl }
              : require('../assets/user-placeholder.png')
          }
          style={styles.avatar}
        /> */}

        {/* Seller Name */}
        <Text style={[styles.name, { color: theme.text }]}>
          {profile.sellerName}
        </Text>

        {/* Basic Info */}
        <View style={styles.card}>
          <ProfileRow
            label={t('business_name') ?? 'Business Name'}
            value={profile.businessName}
          />
          <ProfileRow
            label={t('location') ?? 'Location'}
            value={profile.location}
          />
        </View>

        {/* Interested Crops */}
        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('interested_crops') ?? 'Interested Crops'}
          </Text>

          {profile.interestedCropIds.length === 0 ? (
            <Text style={{ color: theme.muted }}>
              {t('no_crops_selected') ?? 'No crops selected'}
            </Text>
          ) : (
            profile.interestedCropIds.map((cropId) => (
              <View key={cropId} style={styles.chip}>
                <Text style={styles.chipText}>
                  {t(`crop_${cropId}`) ?? `Crop ID: ${cropId}`}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Meta Info */}
        <View style={styles.card}>
          <ProfileRow
            label={t('created_at') ?? 'Created At'}
            value={new Date(profile.createdAt).toLocaleString()}
          />
          <ProfileRow
            label={t('updated_at') ?? 'Updated At'}
            value={new Date(profile.updatedAt).toLocaleString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔹 Reusable row */
function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#777',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  chip: {
    backgroundColor: '#E8F0FE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 13,
    color: '#1A73E8',
  },
});

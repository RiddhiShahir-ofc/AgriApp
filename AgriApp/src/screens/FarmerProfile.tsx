import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type FarmDetail = {
  farmId: number;
  farmLocation: string;
  primaryCrop: string;
  farmSize: number;
};

type FarmerProfileData = {
  farmerId: string;
  farmerName: string;
  profilePhotoUrl?: string;
  location?: string;
  interestedCropIds: number[];
  farmDetails: FarmDetail[];
  createdAt: string;
  updatedAt: string;
};

export default function FarmerProfile() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [profile, setProfile] = useState<FarmerProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/farmer/profile');
        setProfile(res.data);
      } catch (err) {
        console.warn('Failed to load farmer profile', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backText, { color: theme.primary }]}>
            {t('back') ?? 'Back'}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>
          {t('profile') ?? 'My Profile'}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : !profile ? (
          <Text style={{ color: theme.text }}>
            {t('no_data') ?? 'No profile data found'}
          </Text>
        ) : (
          <>
            {/* Profile Card */}
            <View
              style={[
                styles.card,
                { borderColor: theme.text ?? '#ddd' },
              ]}
            >
              {profile.profilePhotoUrl ? (
                <Image
                  source={{ uri: profile.profilePhotoUrl }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={{ color: '#666', fontSize: 28 }}>
                    {profile.farmerName?.charAt(0)}
                  </Text>
                </View>
              )}

              <Text
                style={[styles.name, { color: theme.text }]}
              >
              </Text>
             <ProfileRow
                label={t('farmer_name') ?? 'Farmer Name'}
                value={profile.farmerName}
                />
            <ProfileRow
                label={t('location') ?? 'Location'}
                value={profile.location}
              />
            <ProfileRow
                label={t('intrested_crop') ?? 'Intrested Crops'}
                value={profile.interestedCropIds.join(', ')}
              />
            </View>

            {/* Farm Details */}
            <Text
              style={[styles.sectionTitle, { color: theme.text }]}
            >
              {t('farm_details') ?? 'Farm Details'}
            </Text>

            {profile.farmDetails.length === 0 ? (
              <Text style={{ color: theme.text }}>
                {t('no_farm_details') ?? 'No farm details available'}
              </Text>
            ) : (
              profile.farmDetails.map(farm => (
                <View
                  key={farm.farmId}
                  style={[
                    styles.farmCard,
                    { borderColor: theme.text ?? '#ddd' },
                  ]}
                >
                  <ProfileRow
                    label={t('farm_location') ?? 'Farm Location'}
                    value={farm.farmLocation}
                  />
                  <ProfileRow
                    label={t('primary_crop') ?? 'Primary Crop'}
                    value={farm.primaryCrop}
                  />
                  <ProfileRow
                    label={t('farm_size') ?? 'Farm Size'}
                    value={`${farm.farmSize} acres`}
                  />
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const ProfileRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || '-'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backText: { fontSize: 16, marginBottom: 10, fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },

  farmCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  row: { marginBottom: 8 },
  label: { fontSize: 13, color: '#6b7280' },
  value: { fontSize: 15, fontWeight: '600' },
});

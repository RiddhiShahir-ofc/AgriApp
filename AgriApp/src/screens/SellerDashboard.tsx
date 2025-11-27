// import React from 'react';
// import {Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// export default function SellerDashboard() {const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//  const { theme } = useTheme();
//  const { t } = useLanguage();

//   const goBack = () => {
//     navigation.navigate('Dashboard');
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
//       <TouchableOpacity onPress={goBack} style={styles.backBtn}>
//         <Text style={[styles.backText,{color:theme.text},{backgroundColor:theme.background}]}>{t('back')}</Text>
//       </TouchableOpacity>
//       <Text style={[styles.title,{color:theme.text}]}>{t('seller_dashboard')}</Text>
//       <Text style={[styles.text,{color:theme.text}]}>{t('seller_msg')}</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
//   text: { fontSize: 16 },
//   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },
//   backBtn: { alignSelf: 'flex-start',
//     paddingVertical: 6,paddingHorizontal: 12, borderRadius: 6,marginBottom: 10 },
// });

import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SellerDashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { theme } = useTheme();
  const { t } = useLanguage();

  const goBack = () => {
    navigation.navigate('Dashboard');
  };

  // Tabs: daily market price and short term forecast
  const [selectedTab, setSelectedTab] = useState<'daily' | 'short'>('daily');

  // Daily search
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');

  // Short term forecast inline
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  const onSearchMandi = async () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    try {
      // optional: save last search
      // await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
    } catch (e) {
      // ignore
    }
    Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
  };

  const getShortTermForecastInline = async () => {
    if (!stfMandi && !stfCrop) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }
    try {
      setForecastLoading(true);
      setForecastSummary(null);

      // Mocked summary — replace with actual API call or GraphChart usage
      const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${
        horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'
      }.`;

      // small delay to simulate fetch
      setTimeout(() => {
        setForecastSummary(summary);
        setForecastLoading(false);
      }, 350);
    } catch (err) {
      console.error(err);
      setForecastLoading(false);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Original header/back + texts preserved exactly */}
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={[styles.backText, { color: theme.text }]}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>{t('seller_dashboard')}</Text>
        <Text style={[styles.text, { color: theme.text }]}>{t('seller_msg')}</Text>

        {/* Tabs added (daily | short) */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'daily'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => setSelectedTab('daily')}
          >
            <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}, { color: selectedTab === 'daily' ? '#fff' : theme.text }]}>
              {t('daily_market_price')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'short'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => setSelectedTab('short')}
          >
            <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}, { color: selectedTab === 'short' ? '#fff' : theme.text }]}>
              {t('short_term_forecast')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily Market Price UI */}
        {selectedTab === 'daily' && (
          <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
            <TextInput
              placeholder={t('enter_mandi') ?? 'Enter mandi name'}
              placeholderTextColor={theme.placeholder ?? '#999'}
              value={mandiName}
              onChangeText={setMandiName}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />
            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
            <TextInput
              placeholder={t('enter_crop') ?? 'Enter crop name'}
              placeholderTextColor={theme.placeholder ?? '#999'}
              value={cropName}
              onChangeText={setCropName}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />
            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
              <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
            </TouchableOpacity>

            <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background, marginTop: 12 }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Short term forecast UI */}
        {selectedTab === 'short' && (
          <View>
            <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
              <TextInput
                placeholder={t('enter_mandi') ?? 'Enter mandi name'}
                placeholderTextColor={theme.placeholder ?? '#999'}
                value={stfMandi}
                onChangeText={setStfMandi}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />
              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
              <TextInput
                placeholder={t('enter_crop') ?? 'Enter crop name'}
                placeholderTextColor={theme.placeholder ?? '#999'}
                value={stfCrop}
                onChangeText={setStfCrop}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              />

              <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
              <View style={styles.horizonRow}>
                <TouchableOpacity style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('7days')}>
                  <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('14days')}>
                  <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]} onPress={() => setHorizon('30days')}>
                  <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background, marginTop: 12 }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={{ color: theme.text }}>{forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}</Text>
              </View>
              {forecastSummary && <Text style={{ color: theme.text, marginTop: 8 }}>{forecastSummary}</Text>}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 12 },

  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },

  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tab: { flex: 0.48, padding: 12, borderRadius: 8, alignItems: 'center' },
  tabText: { fontWeight: '600' },
  tabTextSelected: { color: '#fff' },

  searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchTitle: { fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },
  searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  searchBtnText: { fontWeight: '700' },

  chartBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
  chartTitle: { fontWeight: '700', marginBottom: 10 },
  chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { color: '#333', fontWeight: '600' },
  horizonTextActive: { color: '#fff', fontWeight: '700' },
});

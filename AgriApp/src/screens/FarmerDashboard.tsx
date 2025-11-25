// // import React, { useEffect, useState } from 'react';
// // import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';

// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';

// // export default function FarmerDashboard() {
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const goBack = () => navigation.navigate('Dashboard');

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   return (
// //    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
// //       <TouchableOpacity onPress={goBack} style={styles.backBtn}><Text style={styles.backText}>{t('back')}</Text></TouchableOpacity>
// //       <Text style={[styles.title,{color:theme.text}]}>{t('farmer_dashboard')}</Text>

// //       <Text style={[styles.text,{color:theme.text}]}>{t('farmer_message')}</Text>
// //     </SafeAreaView>
// //   );
// // } 

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// //   title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
// //   text: { fontSize: 16, color: '#333' },
// //   backText: { color: '#2b6cb0', fontWeight: '700', fontSize: 16 },
// //   backBtn: { alignSelf: 'flex-start', backgroundColor: '#edf2f7', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   TextInput,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// export default function FarmerDashboard() {
//   const navigation = useNavigation<PropsNav>();
//   const goBack = () => navigation.navigate('Dashboard');

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // Which tab is selected: 'daily' | 'short' | 'preregister'
//   const [selectedTab, setSelectedTab] = useState<'daily market price' | 'short term forcast' | 'pre-register lot'>('daily market price');

//   // Mandi search inputs
//   const [mandiName, setMandiName] = useState('');
//   const [cropName, setCropName] = useState('');

//   // load any state if needed
//   useEffect(() => {
//     // by default daily is selected (already set)
//     // Example: you can load cached preference here
//   }, []);

//   const onSelectTab = (tab: 'daily market price' | 'short term forcast' | 'pre-register lot') => {
//     setSelectedTab(tab);

//     if (tab === 'short term forcast') {
//       // navigate to ShortTermForecast screen (user requested)
//       // If screen doesn't exist yet, create ShortTermForecast and add to navigation stack
//       navigation.navigate('ShortTermForecast' as any);
//       return;
//     }

//     if (tab === 'pre-register lot') {
//       // navigate to pre-register lots screen
//       navigation.navigate('PreRegisterLot' as any);
//       return;
//     }

//     // daily -> stay on this screen and show daily market price
//   };

//   const onSearchMandi = async () => {
//     // simple validation
//     if (!mandiName && !cropName) {
//       Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
//       return;
//     }

//     // You can either navigate to a search results screen or filter charts here.
//     // For now we navigate to a Mandi search results screen if present, otherwise show an alert.
//     try {
//       // store last search in AsyncStorage (optional)
//       await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
//     } catch (e) {
//       // ignore
//     }

//     // If you have a dedicated screen:
//     if ((navigation as any).navigate) {
//       // if a screen exists named 'MandiSearchResults', use it; otherwise just alert
//       const possibleScreen = 'MandiSearchResults' as any;
//       // try navigate (it will fail silently if route not found in dev, so we fallback to alert)
//       try {
//         navigation.navigate(possibleScreen, { mandiName, cropName } as any);
//         return;
//       } catch (err) {
//         // fallthrough to alert
//       }
//     }

//     Alert.alert(t('search') ?? 'Search', `${t('mandi')}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//         <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>

//         <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

//         {/* Tabs / small action cards */}
//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'daily market price'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('daily market price')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'daily market price' ? styles.tabTextSelected : {}]}>
//               {t('daily_market_price')}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'short term forcast'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background ?? '#f0f0f0' },
//             ]}
//             onPress={() => onSelectTab('short term forcast')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'short term forcast' ? styles.tabTextSelected : {}]}>
//               {t('short_term_forecast')}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tab,
//               selectedTab === 'pre-register lot'
//                 ? { backgroundColor: theme.primary ?? '#3182ce' }
//                 : { backgroundColor: theme.background  },
//             ]}
//             onPress={() => onSelectTab('pre-register lot')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'pre-register lot' ? styles.tabTextSelected : {}]}>
//               {t('pre_register_lot')}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Mandi Search Box */}
//         {/* Only show mandi search when daily selected (per your mock). */}
//         {selectedTab === 'daily market price' && (
//           <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
//             <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi')}</Text>

//             <Text style={[styles.inputLabel, { color: theme.text }]}>{t('mandi')}</Text>
//             <TextInput
//               placeholder={t('enter_mandi')}
//               placeholderTextColor={theme.text}
//               value={mandiName}
//               onChangeText={setMandiName}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <Text style={[styles.inputLabel, { color: theme.text }]}>{t('crop')}</Text>
//             <TextInput
//               placeholder={t('enter_crop')}
//               placeholderTextColor={theme.text}
//               value={cropName}
//               onChangeText={setCropName}
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//             />

//             <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
//               <Text style={[styles.searchBtnText, { color: theme.text }]}>{t('search')}</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Daily Market Price area */}
//         {selectedTab === 'daily market price' && (
//           <View style={[styles.chartBox, { borderColor: theme.text, backgroundColor: theme.background  }]}>
//             <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>

//             {/* Placeholder chart — replace with your GraphChart component */}
//             <View style={styles.chartPlaceholder}>
//               <Text style={{ color: theme.text }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
//             </View>
//           </View>
//         )}

//         {/* Note: short/peregister navigate away per requirements */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
//   text: { fontSize: 14, marginBottom: 12 },

//   tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
//   tabText: { fontWeight: '600', color: '#333' },
//   tabTextSelected: { color: '#fff' },

//   searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
//   searchTitle: { fontWeight: '700', marginBottom: 8 },
//   inputLabel: { fontSize: 12, marginBottom: 6 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },

//   searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
//   searchBtnText: { fontWeight: '700' },

//   chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   chartTitle: { fontWeight: '700', marginBottom: 10 },
//   chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

// });

import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

export default function FarmerDashboard() {
  const navigation = useNavigation<PropsNav>();
  const goBack = () => navigation.navigate('Dashboard');

  const { theme } = useTheme();
  const { t } = useLanguage();

  // Which tab is selected: 'daily' | 'short' | 'preregister'
  const [selectedTab, setSelectedTab] = useState<'daily' | 'short' | 'preregister'>('daily');

  // Mandi search inputs (for daily section)
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');

  // Inline ShortTermForecast UI state
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  useEffect(() => {
    // Daily is default; you could load last-search from storage here if needed.
  }, []);

  const onSelectTab = (tab: 'daily' | 'short' | 'preregister') => {
    // Instead of navigating away for 'short', open inline UI:
    if (tab === 'short') {
      setSelectedTab('short');
      // preload if you want: copy mandiName/cropName into inline form
      setStfMandi(mandiName);
      setStfCrop(cropName);
      return;
    }

    if (tab === 'preregister') {
      // keep navigation behavior unchanged for pre-register
      setSelectedTab('preregister');
      navigation.navigate('PreRegisterLot' as any);
      return;
    }

    // daily
    setSelectedTab('daily');
  };

  const onSearchMandi = async () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }

    try {
      await AsyncStorage.setItem('LAST_MANDI_SEARCH', JSON.stringify({ mandiName, cropName }));
    } catch (e) {
      // ignore
    }

    // If you have a dedicated results screen, you can navigate. For now we show an alert.
    Alert.alert(t('search') ?? 'Search', `${t('mandi') ?? 'Mandi'}: ${mandiName}\n${t('crop') ?? 'Crop'}: ${cropName}`);
  };

  // Inline short term forecast "Get" action
  const getShortTermForecastInline = async () => {
    if (!stfMandi && !stfCrop) {
      Alert.alert(t('error_title') ?? 'Error', t('fill_mandi_search') ?? 'Enter mandi or crop to search');
      return;
    }

    try {
      setForecastLoading(true);
      setForecastSummary(null);

      // --- Replace this block with real API call or GraphChart update ---
      // Demo: create a simple mocked summary based on inputs and horizon
      //await new Promise((res) => setTimeout(res, 700)); // simulate network
      const summary = `${t('short_term_forecast') ?? 'Short term forecast'}: ${stfCrop || 'selected crop'} at ${stfMandi || 'selected mandi'} — ${horizon === '7days' ? 'Next 7 days' : horizon === '14days' ? 'Next 14 days' : 'Next 30 days'}.`;
      setForecastSummary(summary);
      // --- End mock ---
    } catch (err) {
      console.error(err);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
    } finally {
      setForecastLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('farmer_dashboard')}</Text>

        <Text style={[styles.text, { color: theme.text }]}>{t('farmer_message')}</Text>

        {/* Tabs / action cards */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'daily'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('daily')}
          >
            <Text style={[styles.tabText, selectedTab === 'daily' ? styles.tabTextSelected : {}]}>
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
            onPress={() => onSelectTab('short')}
          >
            <Text style={[styles.tabText, selectedTab === 'short' ? styles.tabTextSelected : {}]}>
              {t('short_term_forecast')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'preregister'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('preregister')}
          >
            <Text style={[styles.tabText, selectedTab === 'preregister' ? styles.tabTextSelected : {}]}>
              {t('pre_register_lot')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mandi Search Box (daily) */}
        {selectedTab === 'daily' && (
          <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
            <TextInput
              placeholder={t('enter_mandi') ?? 'Enter mandi name'}
              placeholderTextColor={theme.text}
              value={mandiName}
              onChangeText={setMandiName}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />

            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
            <TextInput
              placeholder={t('enter_crop') ?? 'Enter crop name'}
              placeholderTextColor={theme.text}
              value={cropName}
              onChangeText={setCropName}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />

            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={onSearchMandi}>
              <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('search')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Inline ShortTermForecast UI (shown when short selected) */}
        {selectedTab === 'short' && (
          <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
            <TextInput
              placeholder={t('enter_mandi') ?? 'Enter mandi name'}
              placeholderTextColor={theme.text}
              value={stfMandi}
              onChangeText={setStfMandi}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />

            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
            <TextInput
              placeholder={t('enter_crop') ?? 'Enter crop name'}
              placeholderTextColor={theme.text}
              value={stfCrop}
              onChangeText={setStfCrop}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />

            <Text style={[styles.searchTitle, { color: theme.text }]}>{t('forecast_horizon') ?? 'Duration (in days)'}</Text>
            <View style={styles.horizonRow}>
              <TouchableOpacity
                style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
                onPress={() => setHorizon('7days')}
              >
                <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
                onPress={() => setHorizon('14days')}
              >
                <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
                onPress={() => setHorizon('30days')}
              >
                <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={getShortTermForecastInline}>
              <Text style={[styles.searchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get short term Forecast'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Daily market price area (only show on daily) */}
        {selectedTab === 'daily' && (
          <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>{t('daily_market_price_chart_title')}</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: theme.input }}>{t('chart_placeholder_text') ?? 'Daily market price chart goes here'}</Text>
            </View>
          </View>
        )}

        {/* Inline short term forecast results (only show after running forecast) */}
        {selectedTab === 'short' && (
          <View style={[styles.chartBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>{t('short_term_forecast')}</Text>

            <View style={styles.chartPlaceholder}>
              <Text style={{ color: theme.text }}>
                {forecastLoading ? (t('loading') ?? 'Loading...') : forecastSummary ?? (t('chart_placeholder_text') ?? 'Chart will appear here')}
              </Text>
            </View>

            {forecastSummary && (
              <View style={{ marginTop: 8 }}>
                <Text style={{ color: theme.text }}>{forecastSummary}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 12 },

  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tab: { flex: 0.32, padding: 12, borderRadius: 8, alignItems: 'center' },
  tabText: { fontWeight: '600', color: '#333' },
  tabTextSelected: { color: '#fff' },

  searchBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  searchTitle: { fontWeight: '700', marginBottom: 8 },
  inputLabel: { fontSize: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },

  searchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  searchBtnText: { fontWeight: '700' },

  chartBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
  chartTitle: { fontWeight: '700', marginBottom: 10 },
  chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },

  // horizon buttons
  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: { padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center', minWidth: 44 },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { color: '#333', fontWeight: '600' },
  horizonTextActive: { color: '#fff', fontWeight: '700' },
});

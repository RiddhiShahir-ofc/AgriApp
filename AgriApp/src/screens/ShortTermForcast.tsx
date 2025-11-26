// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// import GraphChart from '../components/GraphChart';

// type PropsNav = NativeStackNavigationProp<RootStackParamList>;
// type RouteProps = {
//   params?: {
//     mandiName?: string;
//     cropName?: string;
//   };
// };

// export default function ShortTermForecast() {
//   const navigation = useNavigation<PropsNav>();
//   const route = useRoute<RouteProps>();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   // optional pre-filled values from route (from Dashboard search)
//   const [mandiName, setMandiName] = useState(route.params?.mandiName ?? '');
//   const [cropName, setCropName] = useState(route.params?.cropName ?? '');

//   // UI state for selecting forecast horizon, etc.
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');

//   useEffect(() => {
//     // fetch initial forecast data (call API or load from storage)
//     // fetchForecast();
//   }, []);

//   const fetchForecast = async () => {
//     // placeholder: replace with real API call
//     // use mandiName, cropName and horizon to fetch data
//     // setForecastData(...)
//     Alert.alert(t('info'), t('forecast_fetching') ?? 'Fetching forecast (demo)');
//   };

//   const onBack = () => navigation.goBack();

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: theme.background }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('short_term_forecast')}</Text>

//         <Text style={[styles.label, { color: theme.text }]}>{t('mandi')}</Text>
//         <TextInput
//           value={mandiName}
//           onChangeText={setMandiName}
//           placeholder={t('enter_mandi')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         />

//         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
//         <TextInput
//           value={cropName}
//           onChangeText={setCropName}
//           placeholder={t('enter_crop')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         />

//         <Text style={[styles.label, { color: theme.text }]}>{t('forecast_horizon') ?? 'Forecast horizon'}</Text>
//         <View style={styles.horizonRow}>
//           <TouchableOpacity
//             style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
//             onPress={() => setHorizon('7days')}
//           >
//             <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7d</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
//             onPress={() => setHorizon('14days')}
//           >
//             <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14d</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
//             onPress={() => setHorizon('30days')}
//           >
//             <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30d</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={[styles.fetchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={fetchForecast}>
//           <Text style={[styles.fetchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
//         </TouchableOpacity>

//         {/* Forecast results area: replace placeholder with GraphChart or list */}
//         <View style={[styles.resultBox, { borderColor: '#ddd', backgroundColor: theme.background  }]}>
//           <Text style={[styles.resultTitle, { color: theme.text }]}>{t('forecast_results') ?? 'Forecast Results'}</Text>
//           <View style={styles.chartPlaceholder}>
//             <Text style={{ color: theme.text }}>{t('chart_placeholder_text')}</Text>
//           </View>

//           {/* Optionally add a small summary */}
//           <View style={styles.summary}>
//             <Text style={{ color: theme.text }}>{t('forcast_summary') ?? 'Short term forecast summary will be shown here.'}</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
//   label: { fontSize: 12, marginBottom: 6 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 10 },

//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: { flex: 1, padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center' },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },

//   fetchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
//   fetchBtnText: { fontWeight: '700' },

//   resultBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   resultTitle: { fontWeight: '700', marginBottom: 8 },
//   chartPlaceholder: { height: 160, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
//   summary: { paddingTop: 8 },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// import GraphChart from '../components/GraphChart';

// type PropsNav = NativeStackNavigationProp<RootStackParamList, 'ShortTermForecast'>;
// type RouteProps = RouteProp<RootStackParamList, 'ShortTermForecast'>;

// export default function ShortTermForecast() {
//   const navigation = useNavigation<PropsNav>();
//   const route = useRoute<RouteProps>();
//   const { theme } = useTheme();

//   // Safe useLanguage: if LanguageProvider is not mounted, use fallback translator (identity)
//   let t: (key: string) => string = (k) => k;
//   try {
//     const lang = useLanguage();
//     if (lang && typeof lang.t === 'function') {
//       t = lang.t;
//     }
//   } catch (e) {
//     // If useLanguage throws (no provider), don't crash — use fallback translator.
//     // You can remove this console.warn when you fix provider wrapping in App.
//     // eslint-disable-next-line no-console
//     console.warn('useLanguage hook used outside LanguageProvider — using fallback translator.');
//   }

//   // optional pre-filled values from route (from Dashboard search)
//   const [mandiName, setMandiName] = useState(route.params?.mandiName ?? '');
//   const [cropName, setCropName] = useState(route.params?.cropName ?? '');

//   // UI state for selecting forecast horizon, etc.
//   const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');

//   useEffect(() => {
//     // fetch initial forecast data (call API or load from storage)
//     // fetchForecast();
//   }, []);

//   const fetchForecast = async () => {
//     // placeholder: replace with real API call
//     // use mandiName, cropName and horizon to fetch data
//     // setForecastData(...)
//     Alert.alert(t('info'), t('forecast_fetching') ?? 'Fetching forecast (demo)');
//   };

//   const onBack = () => navigation.goBack();

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: theme.background }]}>
//           <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
//         </TouchableOpacity>

//         <Text style={[styles.title, { color: theme.text }]}>{t('short_term_forecast')}</Text>

//         <Text style={[styles.label, { color: theme.text }]}>{t('mandi')}</Text>
//         <TextInput
//           value={mandiName}
//           onChangeText={setMandiName}
//           placeholder={t('enter_mandi')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         />

//         <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
//         <TextInput
//           value={cropName}
//           onChangeText={setCropName}
//           placeholder={t('enter_crop')}
//           placeholderTextColor={theme.text}
//           style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//         />

//         <Text style={[styles.label, { color: theme.text }]}>{t('forecast_horizon') ?? 'Forecast horizon'}</Text>
//         <View style={styles.horizonRow}>
//           <TouchableOpacity
//             style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
//             onPress={() => setHorizon('7days')}
//           >
//             <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7d</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
//             onPress={() => setHorizon('14days')}
//           >
//             <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14d</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
//             onPress={() => setHorizon('30days')}
//           >
//             <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30d</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={[styles.fetchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={fetchForecast}>
//           <Text style={[styles.fetchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
//         </TouchableOpacity>

//         {/* Forecast results area: replace placeholder with GraphChart or list */}
//         <View style={[styles.resultBox, { borderColor: '#ddd', backgroundColor: theme.background  }]}>
//           <Text style={[styles.resultTitle, { color: theme.text }]}>{t('forecast_results') ?? 'Forecast Results'}</Text>
//           <View style={styles.chartPlaceholder}>
//             <Text style={{ color: theme.text }}>{t('chart_placeholder_text')}</Text>
//           </View>

//           {/* Optionally add a small summary */}
//           <View style={styles.summary}>
//             <Text style={{ color: theme.text }}>{t('forcast_summary') ?? 'Short term forecast summary will be shown here.'}</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
//   backText: { fontWeight: '700', fontSize: 16 },
//   title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
//   label: { fontSize: 12, marginBottom: 6 },
//   input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 10 },

//   horizonRow: { flexDirection: 'row', marginBottom: 12 },
//   horizonBtn: { flex: 1, padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center' },
//   horizonBtnActive: { backgroundColor: '#2b6cb0' },
//   horizonText: { color: '#333', fontWeight: '600' },
//   horizonTextActive: { color: '#fff', fontWeight: '700' },

//   fetchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
//   fetchBtnText: { fontWeight: '700' },

//   resultBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
//   resultTitle: { fontWeight: '700', marginBottom: 8 },
//   chartPlaceholder: { height: 160, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
//   summary: { paddingTop: 8 },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App'; // keep if you want stricter typing elsewhere
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

import GraphChart from '../components/GraphChart';

// loosened navigation type to avoid RootStackParamList mismatch errors
type PropsNav = NativeStackNavigationProp<any>;

export default function ShortTermForecast() {
  const navigation = useNavigation<PropsNav>();

  // Use `any` for route to prevent the "never" param typing when your RootStackParamList
  // doesn't include this screen name or if there's a spelling mismatch.
  const route = useRoute<any>();

  const { theme } = useTheme();

  // Safe useLanguage: try to get real language hook, otherwise fallback to identity translator.
  // We cast lang.t to a (key: string) => string so TypeScript accepts assignment from a narrower typed function.
  let t: (key: string) => string = (k: string) => k;
  try {
    // Attempt to call the hook; if provider missing this may throw.
    const lang = useLanguage();
    if (lang && typeof lang.t === 'function') {
      // lang.t often has a narrower typed key union; cast to broader signature to satisfy TS.
      t = (lang.t as unknown) as (key: string) => string;
    }
  } catch (e) {
    // If provider not mounted, use fallback translator (identity).
    // eslint-disable-next-line no-console
    console.warn('useLanguage hook used outside LanguageProvider — using fallback translator.');
  }

  // optional pre-filled values from route (from Dashboard search)
  const [mandiName, setMandiName] = useState<string>(route?.params?.mandiName ?? '');
  const [cropName, setCropName] = useState<string>(route?.params?.cropName ?? '');

  // UI state for selecting forecast horizon, etc.
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');

  useEffect(() => {
    // fetch initial forecast data (call API or load from storage)
    // fetchForecast();
  }, []);

  const fetchForecast = async () => {
    // placeholder: replace with real API call
    // use mandiName, cropName and horizon to fetch data
    // setForecastData(...)
    Alert.alert(t('info'), (t('forecast_fetching') as string) ?? 'Fetching forecast (demo)');
  };

  const onBack = () => navigation.goBack();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: theme.background }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('short_term_forecast')}</Text>

        <Text style={[styles.label, { color: theme.text }]}>{t('mandi')}</Text>
        <TextInput
          value={mandiName}
          onChangeText={setMandiName}
          placeholder={t('enter_mandi')}
          placeholderTextColor={theme.text}
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
        <TextInput
          value={cropName}
          onChangeText={setCropName}
          placeholder={t('enter_crop')}
          placeholderTextColor={theme.text}
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('forecast_horizon') ?? 'Forecast horizon'}</Text>
        <View style={styles.horizonRow}>
          <TouchableOpacity
            style={[styles.horizonBtn, horizon === '7days' ? styles.horizonBtnActive : {}]}
            onPress={() => setHorizon('7days')}
          >
            <Text style={horizon === '7days' ? styles.horizonTextActive : styles.horizonText}>7d</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.horizonBtn, horizon === '14days' ? styles.horizonBtnActive : {}]}
            onPress={() => setHorizon('14days')}
          >
            <Text style={horizon === '14days' ? styles.horizonTextActive : styles.horizonText}>14d</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.horizonBtn, horizon === '30days' ? styles.horizonBtnActive : {}]}
            onPress={() => setHorizon('30days')}
          >
            <Text style={horizon === '30days' ? styles.horizonTextActive : styles.horizonText}>30d</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.fetchBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={fetchForecast}>
          <Text style={[styles.fetchBtnText, { color: '#fff' }]}>{t('get_forecast') ?? 'Get Forecast'}</Text>
        </TouchableOpacity>

        {/* Forecast results area: replace placeholder with GraphChart or list */}
        <View style={[styles.resultBox, { borderColor: '#ddd', backgroundColor: theme.background  }]}>
          <Text style={[styles.resultTitle, { color: theme.text }]}>{t('forecast_results') ?? 'Forecast Results'}</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={{ color: theme.text }}>{t('chart_placeholder_text')}</Text>
          </View>

          {/* Optionally add a small summary */}
          <View style={styles.summary}>
            <Text style={{ color: theme.text }}>{t('forcast_summary') ?? 'Short term forecast summary will be shown here.'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 10 },

  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: { flex: 1, padding: 10, borderRadius: 6, marginRight: 8, backgroundColor: '#efefef', alignItems: 'center' },
  horizonBtnActive: { backgroundColor: '#2b6cb0' },
  horizonText: { color: '#333', fontWeight: '600' },
  horizonTextActive: { color: '#fff', fontWeight: '700' },

  fetchBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  fetchBtnText: { fontWeight: '700' },

  resultBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 8 },
  resultTitle: { fontWeight: '700', marginBottom: 8 },
  chartPlaceholder: { height: 160, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  summary: { paddingTop: 8 },
});

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet,Alert,Switch } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import GraphChart from '../components/GraphChart';

// import { useLanguage } from '../context/LanguageContext';
// import { useTheme } from '../context/ThemeContext';


// type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

// export default function Landing({ navigation }: Props) {

//   const { locale, setLocale, t } = useLanguage();
//   const { theme,isDark,toggleTheme } = useTheme();

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
//       <Text style={[styles.title, {color :theme.text}]}>{t('title')}</Text>
//       <Text style={[styles.subtitle, {color :theme.text}]}>{t('aboutUs')}</Text>

//       <View style={styles.langRow}>
//         <TouchableOpacity
//           onPress={() => setLocale('en')}
//           style={[styles.langBtn,{borderColor:theme.text}, locale === 'en' && styles.active]}
//         >
//           <Text style={[styles.langText,{color:theme.text}]}>{t('english')}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setLocale('hi')}
//           style={[styles.langBtn, {borderColor:theme.text}, locale === 'hi' && styles.active]}
//         >
//           <Text style={[styles.langText,{color:theme.text}]}>{t('hindi')}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setLocale('mr')}
//           style={[styles.langBtn,{borderColor:theme.text}, locale === 'mr' && styles.active]}
//         >
//           <Text style={[styles.langText,{color:theme.text}]}>{t('marathi')}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* <Text style={[styles.subtitle, {color : theme.text}]}>{t('selectTheme')}</Text> */}
//       {/* <View style={styles.toggleContainer}>
//         <Text style={[styles.label, { color: theme.text }]}>
//           {isDark ? t('modedark') : t('modelight')}
//         </Text>
//         <Switch
//           value={isDark}
//           onValueChange={toggleTheme}
//           trackColor={{ false: '#767577', true: theme.primary }}
//           thumbColor={isDark ? theme.secondary : '#f4f3f4'}/>
//       </View> */}

//       <Text style={[styles.subtitle, { color: theme.text }]}>
//   {t('selectTheme')}
// </Text>

// <View style={styles.themeRow}>

//   {/* Light Theme */}
//   <TouchableOpacity
//     style={[
//       styles.themeCard,
//       !isDark && styles.themeActive,
//     ]}
//     onPress={() => isDark && toggleTheme()} // 🔧 no logic change
//   >
//     <View style={styles.lightPreview}>
//       <View style={styles.line} />
//       <View style={styles.line} />
//       <View style={styles.blueBtn} />
//     </View>
//     <Text style={[styles.themeLabel, { color: theme.text }]}>
//       {t('modelight')}
//     </Text>
//   </TouchableOpacity>

//   {/* Dark Theme */}
//   <TouchableOpacity
//     style={[
//       styles.themeCard,
//       isDark && styles.themeActive,
//     ]}
//     onPress={() => !isDark && toggleTheme()} // 🔧 no logic change
//   >
//     <View style={styles.darkPreview}>
//       <View style={styles.darkLine} />
//       <View style={styles.darkLine} />
//       <View style={styles.blueBtn} />
//     </View>
//     <Text style={[styles.themeLabel, { color: theme.text }]}>
//       {t('modedark')}
//     </Text>
//   </TouchableOpacity>

// </View>


//       <Text style={[styles.subtitle, {color :theme.text}]}>{t('dailyMarketWatch')}</Text>

//       <TouchableOpacity
//         style={[styles.graphWrap,{ borderColor:theme.text}]}
//         onPress={() => navigation.navigate('Register', { fromGraph: true })}
//       >
//         <GraphChart />
//       </TouchableOpacity>

//       <View style={{ height: 20 }} />

//       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
//         <Text style={[styles.btnText,{color:theme.text}]}>{t('loginRegister')}</Text>
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'flex-start' },
//   title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
//   langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
//   langBtn: { padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 20 },
//   active: { backgroundColor: '#d28465ff' ,color:'#000'},
//   subtitle: { fontSize: 18, marginBottom: 12 ,fontWeight:500},
//   graphWrap: { borderWidth: 1, borderRadius: 10, padding: 12 },
//   btn: { marginTop: 12, backgroundColor: '#15f048ff', padding: 15, borderRadius: 30, alignItems: 'center' },
//   btnText: { fontWeight: '700' },
//   toggleContainer: {flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between', marginBottom: 16 },
//   label: { fontSize: 16 },
//   langText: { fontSize: 16 },
//   themeRow: {
//   flexDirection: 'row',
//   gap: 16,
//   marginBottom: 20,
// },

// themeCard: {
//   flex: 1,
//   padding: 12,
//   borderRadius: 14,
//   borderWidth: 2,
//   borderColor: '#ddd',
//   alignItems: 'center',
// },

// themeActive: {
//   borderColor: '#3182ce',
// },

// themeLabel: {
//   marginTop: 8,
//   fontSize: 14,
//   fontWeight: '600',
// },

// lightPreview: {
//   width: '100%',
//   height: 70,
//   padding: 8,
// },

// darkPreview: {
//   width: '100%',
//   height: 70,
//   backgroundColor: '#1a202c',
//   borderRadius: 10,
//   padding: 8,
// },

// line: {
//   height: 6,
//   backgroundColor: '#e2e8f0',
//   borderRadius: 4,
//   marginBottom: 6,
// },

// darkLine: {
//   height: 6,
//   backgroundColor: '#4a5568',
//   borderRadius: 4,
//   marginBottom: 6,
// },

// blueBtn: {
//   height: 8,
//   width: 40,
//   backgroundColor: '#3182ce',
//   borderRadius: 6,
//   marginTop: 6,
// },

// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GraphChart from '../components/GraphChart';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function Landing({ navigation }: Props) {
  const { locale, setLocale, t } = useLanguage();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      <Text style={[styles.title, { color: theme.text }]}>{t('title')}</Text>

      {/* Safe about text */}
      <Text style={[styles.about, { color: theme.text }]}>
        {t('aboutUs') ?? ''}
      </Text>

      <Text> </Text>

      {/* Language */}
      <View style={styles.langRow}>
        {['en', 'hi', 'mr'].map(code => (
          <TouchableOpacity
            key={code}
            onPress={() => setLocale(code as any)}
            style={[
              styles.langBtn,
              { borderColor: theme.text },
              locale === code && styles.active,
            ]}
          >
            <Text style={[styles.langText, { color: theme.text }]}>
              {t(code === 'en' ? 'english' : code === 'hi' ? 'hindi' : 'marathi')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Theme selector */}
      <Text style={[styles.subtitle, { color: theme.text }]}>
        {t('selectTheme')}
      </Text>

      <View style={styles.themeRow}>
        {/* Light */}
        <TouchableOpacity
          style={[styles.themeCard, !isDark && styles.themeActive]}
          onPress={() => isDark && toggleTheme()}
        >
          <View style={styles.lightPreview}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.blueBtn} />
          </View>
          <Text style={[styles.themeLabel, { color: theme.text }]}>
            {t('modelight')}
          </Text>
        </TouchableOpacity>

        {/* Dark */}
        <TouchableOpacity
          style={[styles.themeCard, isDark && styles.themeActive]}
          onPress={() => !isDark && toggleTheme()}
        >
          <View style={styles.darkPreview}>
            <View style={styles.darkLine} />
            <View style={styles.darkLine} />
            <View style={styles.blueBtn} />
          </View>
          <Text style={[styles.themeLabel, { color: theme.text }]}>
            {t('modedark')}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle, { color: theme.text }]}>
        {t('dailyMarketWatch')}
      </Text>

      <TouchableOpacity
        style={[styles.graphWrap, { borderColor: theme.text }]}
        onPress={() => navigation.navigate('Register', { fromGraph: true })}
      >
        <GraphChart />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[styles.btnText,{color:theme.text}]}>{t('loginRegister')}</Text>
        
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  subtitle: { fontSize: 18, marginBottom: 12, fontWeight: '500' },
  about: { fontSize: 16, marginBottom: 12, fontWeight: '400' },

  langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  langBtn: { padding: 15, borderWidth: 1, borderRadius: 20 },
  active: { backgroundColor: '#15f048ff' },
  langText: { fontSize: 16 },

  themeRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  themeCard: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  themeActive: { borderColor: 'rgba(18, 172, 54, 1)' },
  themeLabel: { marginTop: 8, fontSize: 14, fontWeight: '600' },

  lightPreview: {
    width: '100%',
    height: 70,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 8,
  },
  darkPreview: {
    width: '100%',
    height: 70,
    backgroundColor: '#1a202c',
    borderRadius: 10,
    padding: 8,
  },

  line: { height: 6, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 6 },
  darkLine: { height: 6, backgroundColor: '#4a5568', borderRadius: 4, marginBottom: 6 },
  blueBtn: { height: 8, width: 40, backgroundColor: '#15f048ff', borderRadius: 6 },

  graphWrap: { borderWidth: 1, borderRadius: 10, padding: 12 },

  btn: {
    marginTop: 16,
    backgroundColor: '#15f048ff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '700',
  },
});

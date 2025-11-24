// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
// // import { SafeAreaView } from 'react-native-safe-area-context'; 
// // import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
// // import { RootStackParamList } from '../../App'; 
// // import GraphChart from '../components/GraphChart'; 
// // type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>; 
// // export default function Landing(
// // { navigation }: Props) 
// // { const [lang, setLang] = useState<'en'|'hi'|'mr'>('en');
// //  return ( 
// // <SafeAreaView style={styles.container}> 
// // <Text style={styles.title}>Welcome to AgriApp</Text> 
// // <Text style={styles.subtitle}>Select preferred Language</Text> <View style={styles.langRow}> 
// // <TouchableOpacity onPress={() => setLang('en')}
// // style={[styles.langBtn, lang === 'en' && styles.active]}> <Text>English</Text> 
// // </TouchableOpacity> 
// // <TouchableOpacity onPress={() => setLang('hi')}
// // style={[styles.langBtn, lang === 'hi' && styles.active]}> 
// // <Text>हिंदी</Text> </TouchableOpacity> 
// // <TouchableOpacity onPress={() => setLang('mr')} 
// // style={[styles.langBtn, lang === 'mr' && styles.active]}> <Text>मराठी</Text> 
// // </TouchableOpacity> 
// // </View> 
// // <Text style={styles.subtitle}>Daily Market Watch</Text> 
// // <TouchableOpacity style={styles.graphWrap} onPress={() => navigation.navigate('Register', { fromGraph: true })}> 
// // <GraphChart /> 
// // </TouchableOpacity> <View style={{height:20}} /> 
// // <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}> 
// // <Text style={styles.btnText}>Login / Register</Text> 
// // </TouchableOpacity> 
// // </SafeAreaView> ); 
// // } 
// // const styles = StyleSheet.create({ 
// //   container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' }, 
// //   title: { fontSize: 28, fontWeight: '700', marginBottom: 12 }, 
// //   langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 }, 
// //   langBtn: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }, 
// //   active: { backgroundColor: '#eee' },
// //   subtitle: { fontSize: 18, marginBottom: 12 }, 
// //   graphWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
// //   btn: { marginTop: 12, backgroundColor: '#2b6cb0', padding: 12,borderRadius: 8, alignItems: 'center' }, 
// //   btnText: { color: '#fff', fontWeight: '700' },
// //  });

// // src/screens/Landing.tsx
// import i18n from 'i18next';
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import GraphChart from '../components/GraphChart';
// import { useTranslation } from 'react-i18next';
// import { setAppLanguage } from '../i18n';


// type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

// export default function Landing({ navigation }: Props) {
//   const { t, i18n } = useTranslation();
//   // local UI state for showing active button quickly; it mirrors i18n.language
//   const [lang, setLang] = useState<'en' | 'hi' | 'mr'>(
//     (i18n.language && (i18n.language as any).slice(0,2)) || 'en'
//   );

//   useEffect(() => {
//     const handle = () => {
//       const cur = (i18n.language && (i18n.language as any).slice(0,2)) || 'en';
//       setLang(cur as 'en' | 'hi' | 'mr');
//     };
//     // ensure state sync on mount
//     handle();
//     // subscribe to languageChanged events (i18next)
//     i18n.on && i18n.on('languageChanged', handle);
//     return () => {
//       i18n.off && i18n.off('languageChanged', handle);
//     };
//   }, [i18n]);

//   const changeLanguage = async (l: 'en' | 'hi' | 'mr') => {
//     await setAppLanguage(l);
//     // local state update will be handled by languageChanged event, but set immediately for snappiness
//     setLang(l);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>{t('landing.title')}</Text>
//       <Text style={styles.subtitle}>{t('landing.selectLanguage')}</Text>

//       <View style={styles.langRow}>
//         <TouchableOpacity
//           onPress={() => changeLanguage('en')}
//           style={[styles.langBtn, lang === 'en' && styles.active]}
//         >
//           <Text>{t('landing.lang_english')}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => changeLanguage('hi')}
//           style={[styles.langBtn, lang === 'hi' && styles.active]}
//         >
//           <Text>{t('landing.lang_hindi')}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => changeLanguage('mr')}
//           style={[styles.langBtn, lang === 'mr' && styles.active]}
//         >
//           <Text>{t('landing.lang_marathi')}</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.subtitle}>{t('landing.dailyMarketWatch')}</Text>

//       <TouchableOpacity
//         style={styles.graphWrap}
//         onPress={() => navigation.navigate('Register', { fromGraph: true })}
//       >
//         <GraphChart />
//       </TouchableOpacity>

//       <View style={{ height: 20 }} />

//       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.btnText}>{t('landing.loginRegister')}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
//   title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
//   langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
//   langBtn: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
//   active: { backgroundColor: '#eee' },
//   subtitle: { fontSize: 18, marginBottom: 12 },
//   graphWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
//   btn: { marginTop: 12, backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
//   btnText: { color: '#fff', fontWeight: '700' }
// });

// src/screens/Landing.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GraphChart from '../components/GraphChart';
import { useTranslation } from 'react-i18next';
import i18 from '../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function Landing({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  // local UI state for showing active button quickly; it mirrors i18n.language
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>(
    (i18n.language && (i18n.language as any).slice(0,2)) || 'en'
  );

  useEffect(() => {
    const handle = () => {
      const cur = (i18n.language && (i18n.language as any).slice(0,2)) || 'en';
      setLang(cur as 'en' | 'hi' | 'mr');
    };
    // ensure state sync on mount
    handle();
    // subscribe to languageChanged events (i18next)
    i18n.on && i18n.on('languageChanged', handle);
    return () => {
      i18n.off && i18n.off('languageChanged', handle);
    };
  }, [i18n]);

  const changeLanguage = async (l: 'en' | 'hi' | 'mr') => {
    //await setAppLanguage(l);
    // local state update will be handled by languageChanged event, but set immediately for snappiness
    setLang(l);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('Welcome to AgriApp')}</Text>
      <Text style={styles.subtitle}>{t('Select Preferred Language')}</Text>

      <View style={styles.langRow}>
        <TouchableOpacity
          onPress={() => changeLanguage('en')}
          style={[styles.langBtn, lang === 'en' && styles.active]}
        >
          <Text>{t('English')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeLanguage('hi')}
          style={[styles.langBtn, lang === 'hi' && styles.active]}
        >
          <Text>{t('हिंदी')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeLanguage('mr')}
        
          style={[styles.langBtn, lang === 'mr' && styles.active]}
        >
          <Text>{t('मराठी')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>{t('Daily Market Watch')}</Text>

      <TouchableOpacity
        style={styles.graphWrap}
        onPress={() => navigation.navigate('Register', { fromGraph: true })}
        
      >
        <GraphChart />
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.btnText}>{t('Login / Register')}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  langBtn: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  active: { backgroundColor: '#eee' },
  subtitle: { fontSize: 18, marginBottom: 12 },
  graphWrap: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
  btn: { marginTop: 12, backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' }
});
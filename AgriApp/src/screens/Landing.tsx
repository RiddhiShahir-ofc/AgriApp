import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert,Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GraphChart from '../components/GraphChart';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';


type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function Landing({ navigation }: Props) {

  const { locale, setLocale, t } = useLanguage();
  const { theme,isDark,toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={[styles.title, {color :theme.text}]}>{t('title')}</Text>
      <Text style={[styles.subtitle, {color :theme.text}]}>{t('selectLanguage')}</Text>

      <View style={styles.langRow}>
        <TouchableOpacity
          onPress={() => setLocale('en')}
          style={[styles.langBtn,{borderColor:theme.text}, locale === 'en' && styles.active]}
        >
          <Text style={[styles.langText,{color:theme.text}]}>{t('english')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setLocale('hi')}
          style={[styles.langBtn, {borderColor:theme.text}, locale === 'hi' && styles.active]}
        >
          <Text style={[styles.langText,{color:theme.text}]}>{t('hindi')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setLocale('mr')}
          style={[styles.langBtn,{borderColor:theme.text}, locale === 'mr' && styles.active]}
        >
          <Text style={[styles.langText,{color:theme.text}]}>{t('marathi')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle, {color : theme.text}]}>{t('selectTheme')}</Text>
      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: theme.text }]}>
          {isDark ? t('modedark') : t('modelight')}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: theme.primary }}
          thumbColor={isDark ? theme.secondary : '#f4f3f4'}/>
      </View>

      <Text style={[styles.subtitle, {color :theme.text}]}>{t('dailyMarketWatch')}</Text>

      <TouchableOpacity
        style={[styles.graphWrap,{ borderColor:theme.text}]}
        onPress={() => navigation.navigate('Register', { fromGraph: true })}
      >
        <GraphChart />
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.btnText,{color:theme.text}]}>{t('loginRegister')}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  langRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  langBtn: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  active: { backgroundColor: '#dba4a4ff' ,color:'#000'},
  subtitle: { fontSize: 18, marginBottom: 12 },
  graphWrap: { borderWidth: 1, borderRadius: 12, padding: 12 },
  btn: { marginTop: 12, backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { fontWeight: '700' },
  toggleContainer: {flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 16 },
  langText: { fontSize: 16 },
});


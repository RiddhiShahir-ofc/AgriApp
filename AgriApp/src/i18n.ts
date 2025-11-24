// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_PERSISTENCE_KEY = 'user-language';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
};

function getDeviceLanguage(): string | undefined {
  const locales = RNLocalize.getLocales();
  if (!locales || locales.length === 0) return undefined;
  return locales[0].languageCode; // 'en', 'hi', 'mr' etc.
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  .then(async () => {
    try {
      const stored = await AsyncStorage.getItem(LANGUAGE_PERSISTENCE_KEY);
      if (stored && Object.keys(resources).includes(stored)) {
        await i18n.changeLanguage(stored);
      } else {
        const deviceLang = getDeviceLanguage();
        if (deviceLang && Object.keys(resources).includes(deviceLang)) {
          await i18n.changeLanguage(deviceLang);
        }
      }
    } catch (e) {
      // ignore and keep default
      // console.warn('i18n init read storage error', e);
    }
  })
  .catch(err => {
    console.error('i18n init error', err);
  });

// export async function setAppLanguage(lang: string) {
//   if (!Object.keys(resources).includes(lang)) {
//     console.warn('Language not supported:', lang);
//     return;
//   }
//   try {
//     await i18n.changeLanguage(lang);
//     await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lang);
//   } catch (e) {
//     console.warn('Failed to change/persist language', e);
//   }
// }

export async function setAppLanguage(lang: string) {
  console.log('[i18n] setAppLanguage called with', lang);
  if (!Object.keys(resources).includes(lang)) {
    console.warn('[i18n] Language not supported:', lang);
    return;
  }
  try {
    await i18n.changeLanguage(lang);
    console.log('[i18n] after changeLanguage, i18n.language =', i18n.language);
    await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lang);
    console.log('[i18n] persisted language to AsyncStorage');
  } catch (e) {
    console.warn('[i18n] Failed to change/persist language', e);
  }
}

export default i18n;

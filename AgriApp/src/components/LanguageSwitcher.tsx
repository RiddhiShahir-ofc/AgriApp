import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../i18n';

const languages = [{ code: 'en', label: 'English' }, { code: 'hi', label: 'हिन्दी' }, { code: 'mr', label: 'मराठी' }];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {languages.map(l => (
        <TouchableOpacity
          key={l.code}
          onPress={() => setAppLanguage(l.code)}
          style={{ padding: 8, borderWidth: current === l.code ? 2 : 1, borderRadius: 6 }}
        >
          <Text>{l.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

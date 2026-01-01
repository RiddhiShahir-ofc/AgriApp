import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { locale, setLocale, t } = useLanguage();
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        {t('settings') ?? 'Settings'}
      </Text>

      {/* Language */}
      <Text style={[styles.section, { color: theme.text }]}>
        {t('selectLanguage') ?? 'Language'}
      </Text>

      {[
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'mr', label: 'मराठी' },
      ].map(l => (
        <Option
          key={l.code}
          active={locale === l.code}
          label={l.label}
          onPress={() => setLocale(l.code as any)}
        />
      ))}

      {/* Theme */}
      <Text style={[styles.section, { color: theme.text }]}>
        {t('selectTheme') ?? 'Theme'}
      </Text>

      <Option
        label={t('modelight') ?? 'Light'}
        active={!isDark}
        onPress={() => isDark && toggleTheme()}
      />
      <Option
        label={t('modedark') ?? 'Dark'}
        active={isDark}
        onPress={() => !isDark && toggleTheme()}
      />
    </SafeAreaView>
  );
}

const Option = ({
  label,
  onPress,
  active,
}: {
  label: string;
  onPress: () => void;
  active: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.option,
      active && styles.active,
    ]}
  >
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  section: { fontSize: 16, fontWeight: '600', marginTop: 16 },
  option: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  active: {
    borderColor: '#15f048ff',
    backgroundColor: '#15f04833',
  },
  optionText: { fontSize: 16 },
});
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

interface FilterProps {
  filters: { mandi: string; crop: string };
  setFilters: (filters: { mandi: string; crop: string }) => void;
  onSearch: () => void;
}

export default function FilterBar({ filters, setFilters, onSearch }: FilterProps) {
 
 const { t } = useLanguage();

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>{t('mandi')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_mandi')}
        value={filters.mandi}
        onChangeText={(t) => setFilters({ ...filters, mandi: t })}
      />

      <Text style={styles.label}>{t('crop')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_crop')}
        value={filters.crop}
        onChangeText={(t) => setFilters({ ...filters, crop: t })}
      />

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Text style={styles.searchText}>{t('search')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: { fontWeight: '600', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  searchBtn: {
    marginTop: 10,
    backgroundColor: '#2b6cb0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontWeight: '700',
  },
});


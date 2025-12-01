import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import {Picker} from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';

interface FilterProps {
  filters: { mandi: string; crop: string };
  setFilters: (filters: { mandi: string; crop: string }) => void;
  onSearch: () => void;
}

const defaultMandiOptions = [
  { label: 'Select Mandi', value: '' },
  { label: 'Pune Mandi', value: 'pune' },
  { label: 'Nagpur Mandi', value: 'nagpur' },
  { label: 'Nashik Mandi', value: 'nashik' },
  // add more as you need
];

const defaultCropOptions = [
  { label: 'Select Crop', value: '' },
  { label: 'Wheat', value: 'wheat' },
  { label: 'Rice', value: 'rice' },
  { label: 'Onion', value: 'onion' },
  { label: 'Sugarcane', value: 'sugarcane' },
  // add more as you need
];

export default function FilterBar({ filters, setFilters, onSearch }: FilterProps) {
const { t } = useLanguage();
const { theme } = useTheme();

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>{t('mandi')}</Text>
      {/* <TextInput
        style={styles.input}
        placeholder={t('enter_mandi')}
        value={filters.mandi}
        onChangeText={(t) => setFilters({ ...filters, mandi: t })}
      /> */}

      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={filters.mandi}
          onValueChange={(t) => setFilters({ ...filters, mandi: t })}
          mode="dropdown"
        >
          {defaultMandiOptions.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>{t('crop')}</Text>
      {/* <TextInput
        style={styles.input}
        placeholder={t('enter_crop')}
        value={filters.crop}
        onChangeText={(t) => setFilters({ ...filters, crop: t })}
      /> */}

           <View style={styles.pickerWrap}>
        <Picker
          selectedValue={filters.crop}
          onValueChange={(value) => setFilters({ ...filters, crop: value })}
          mode="dropdown"
        >
          {defaultCropOptions.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Text style={styles.searchText}>{t('search')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#f9f9f9',
    borderColor: 'theme.text',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: { fontWeight: '600', marginTop: 8 },
  // input: {
  //   borderWidth: 1,
  //   borderColor: 'theme.text',
  //   borderRadius: 8,
  //   padding: 8,
  //   marginTop: 4,
  // },

  pickerWrap: { 
     borderWidth: 1,
     borderColor: 'theme.text',
     borderRadius: 8,
     paddingHorizontal: 8,
     paddingVertical: 6,
     marginTop: 4,
     height: 42,         
     justifyContent: 'center',
  },

  searchBtn: {
    marginTop: 10,
    backgroundColor: '#2b6cb0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchText: {
    color: 'theme.text',
    fontWeight: '700',
  },
});


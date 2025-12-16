import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GraphChart from '../GraphChart';

type Props = {
  theme: any;
  t: (key: string) => string;

  mandiName: string;
  cropName: string;

  mandiOptions: string[];
  cropOptions: string[];

  setMandiName: (v: string) => void;
  setCropName: (v: string) => void;

  onSearch: () => void;
  appliedFilters: { mandi: string; crop: string };

  isValidPickerValue: (value: string, options: string[]) => boolean;
};

export default function DailyMarketTab({
  theme,
  t,
  mandiName,
  cropName,
  mandiOptions,
  cropOptions,
  setMandiName,
  setCropName,
  onSearch,
  appliedFilters,
  isValidPickerValue,
}: Props) {
  return (
    <>
      {/* SEARCH BOX */}
      <View
        style={[
          styles.searchBox,
          { backgroundColor: theme.background, borderColor: theme.text },
        ]}
      >
        {/* MANDI */}
        <Text style={[styles.searchTitle, { color: theme.text }]}>
          {t('mandi') ?? 'Mandi'}
        </Text>

        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker
            selectedValue={
              isValidPickerValue(mandiName, mandiOptions)
                ? mandiName
                : ''
            }
            onValueChange={v => setMandiName(v)}
          >
            <Picker.Item
              label={t('select_mandi') ?? 'Select mandi'}
              value=""
            />
            {mandiOptions.map(m => (
              <Picker.Item key={m} label={m} value={m} />
            ))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {mandiName &&
          !isValidPickerValue(mandiName, mandiOptions) &&
          mandiName !== 'Other' && (
            <TextInput
              placeholder={t('type_mandi') ?? 'Type mandi'}
              placeholderTextColor={theme.text ?? '#999'}
              value={mandiName}
              onChangeText={setMandiName}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.text },
              ]}
            />
          )}

        {/* CROP */}
        <Text style={[styles.searchTitle, { color: theme.text }]}>
          {t('crop') ?? 'Crop'}
        </Text>

        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker
            selectedValue={
              isValidPickerValue(cropName, cropOptions)
                ? cropName
                : ''
            }
            onValueChange={v => setCropName(v)}
          >
            <Picker.Item
              label={t('select_crop') ?? 'Select crop'}
              value=""
            />
            {cropOptions.map(c => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {cropName &&
          !isValidPickerValue(cropName, cropOptions) &&
          cropName !== 'Other' && (
            <TextInput
              placeholder={t('type_crop') ?? 'Type crop'}
              placeholderTextColor={theme.text ?? '#999'}
              value={cropName}
              onChangeText={setCropName}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.text },
              ]}
            />
          )}

        {/* SEARCH BUTTON */}
        <TouchableOpacity
          style={[
            styles.searchBtn,
            { backgroundColor: theme.primary ?? '#2b6cb0' },
          ]}
          onPress={onSearch}
        >
          <Text style={[styles.searchBtnText, { color: '#fff' }]}>
            {t('search') ?? 'Search'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CHART */}
      <View
        style={[
          styles.chartBox,
          {
            borderColor: theme.text,
            backgroundColor: theme.background,
          },
        ]}
      >
        <Text style={[styles.chartTitle, { color: theme.text }]}>
          {t('daily_market_price_chart_title')}
        </Text>

        <View style={styles.chartPlaceholder}>
          <GraphChart filters={appliedFilters} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  searchTitle: {
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  searchBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  searchBtnText: {
    fontWeight: '700',
  },
  chartBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  chartTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },
  chartPlaceholder: {
    height: 220,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
  },
});

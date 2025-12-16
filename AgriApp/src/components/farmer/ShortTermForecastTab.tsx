import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {
  theme: any;
  t: (key: string) => string;

  stfMandi: string;
  stfCrop: string;
  horizon: '7days' | '14days' | '30days';

  mandiOptions: string[];
  cropOptions: string[];

  setStfMandi: (v: string) => void;
  setStfCrop: (v: string) => void;
  setHorizon: (v: '7days' | '14days' | '30days') => void;

  onGetForecast: () => void;

  forecastLoading: boolean;
  forecastSummary: string | null;

  isValidPickerValue: (value: string, options: string[]) => boolean;
};

export default function ShortTermForecastTab({
  theme,
  t,
  stfMandi,
  stfCrop,
  horizon,
  mandiOptions,
  cropOptions,
  setStfMandi,
  setStfCrop,
  setHorizon,
  onGetForecast,
  forecastLoading,
  forecastSummary,
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
              isValidPickerValue(stfMandi, mandiOptions)
                ? stfMandi
                : ''
            }
            onValueChange={v => setStfMandi(v)}
          >
            <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
            {mandiOptions.map(m => (
              <Picker.Item key={m} label={m} value={m} />
            ))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {stfMandi &&
          !isValidPickerValue(stfMandi, mandiOptions) &&
          stfMandi !== 'Other' && (
            <TextInput
              placeholder={t('type_mandi') ?? 'Type mandi'}
              placeholderTextColor={theme.text ?? '#999'}
              value={stfMandi}
              onChangeText={setStfMandi}
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
              isValidPickerValue(stfCrop, cropOptions)
                ? stfCrop
                : ''
            }
            onValueChange={v => setStfCrop(v)}
          >
            <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
            {cropOptions.map(c => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {stfCrop &&
          !isValidPickerValue(stfCrop, cropOptions) &&
          stfCrop !== 'Other' && (
            <TextInput
              placeholder={t('type_crop') ?? 'Type crop'}
              placeholderTextColor={theme.text ?? '#999'}
              value={stfCrop}
              onChangeText={setStfCrop}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.text },
              ]}
            />
          )}

        {/* DURATION */}
        <Text style={[styles.searchTitle, { color: theme.text }]}>
          {t('forecast_horizon') ?? 'Duration (days)'}
        </Text>
        <View style={styles.horizonRow}>
          {(['7days', '14days', '30days'] as const).map(d => (
            <TouchableOpacity
              key={d}
              style={[
                styles.horizonBtn,
                horizon === d && styles.horizonBtnActive,
              ]}
              onPress={() => setHorizon(d)}
            >
              <Text
                style={
                  horizon === d
                    ? styles.horizonTextActive
                    : styles.horizonText
                }
              >
                {d === '7days' ? '7' : d === '14days' ? '14' : '30'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[
            styles.searchBtn,
            { backgroundColor: theme.primary ?? '#2b6cb0' },
          ]}
          onPress={onGetForecast}
        >
          <Text style={[styles.searchBtnText, { color: '#fff' }]}>
            {t('get_forecast') ?? 'Get Forecast'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* RESULT */}
      <View
        style={[
          styles.chartBox,
          { borderColor: theme.text, backgroundColor: theme.background },
        ]}
      >
        <Text style={[styles.chartTitle, { color: theme.text }]}>
          {t('short_term_forecast') ?? 'Forecast'}
        </Text>
        <View style={styles.chartPlaceholder}>
          <Text style={{ color: theme.text ?? '#666' }}>
            {forecastLoading
              ? t('loading') ?? 'Loading...'
              : forecastSummary ??
                t('chart_placeholder_text') ??
                'Forecast will appear here'}
          </Text>
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
    height: 160,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizonRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  horizonBtn: {
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#efefef',
    alignItems: 'center',
    minWidth: 44,
  },
  horizonBtnActive: {
    backgroundColor: '#2b6cb0',
  },
  horizonText: {
    color: '#333',
    fontWeight: '600',
  },
  horizonTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
});

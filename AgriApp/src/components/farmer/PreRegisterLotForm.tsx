import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  theme: any;
  t: (key: string) => string;

  prCrop: string;
  prGrade: string;
  prQuantity: string;
  prSellingAmount: string;
  prMandi: string;
  prExpectedArrival: string;

  cropOptions: string[];
  mandiOptions: string[];
  currentGrades: string[];

  setPrCrop: (v: string) => void;
  setPrGrade: (v: string) => void;
  setPrQuantity: (v: string) => void;
  setPrSellingAmount: (v: string) => void;
  setPrMandi: (v: string) => void;
  setPrExpectedArrival: (v: string) => void;

  showDatePicker: boolean;
  dateValue: Date;
  openDatePicker: () => void;
  onChangeDate: (e: any, d?: Date) => void;

  onSubmit: () => void;
  editingLotId: string | null;

  isValidPickerValue: (value: string, options: string[]) => boolean;
};

export default function PreRegisterLotForm({
  theme,
  t,
  prCrop,
  prGrade,
  prQuantity,
  prSellingAmount,
  prMandi,
  prExpectedArrival,
  cropOptions,
  mandiOptions,
  currentGrades,
  setPrCrop,
  setPrGrade,
  setPrQuantity,
  setPrSellingAmount,
  setPrMandi,
  setPrExpectedArrival,
  showDatePicker,
  dateValue,
  openDatePicker,
  onChangeDate,
  onSubmit,
  editingLotId,
  isValidPickerValue,
}: Props) {
  return (
    <View
      style={[
        styles.formBox,
        { backgroundColor: theme.background, borderColor: theme.text },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        {t('pre_register_title') ?? 'Register Harvested Crop Lot'}
      </Text>

      {/* CROP */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('crop') ?? 'Crop'}
      </Text>
      <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
        <Picker
          selectedValue={
            isValidPickerValue(prCrop, cropOptions) ? prCrop : ''
          }
          onValueChange={setPrCrop}
        >
          <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
          {cropOptions.map(c => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {prCrop &&
        !isValidPickerValue(prCrop, cropOptions) &&
        prCrop !== 'Other' && (
          <TextInput
            placeholder={t('type_crop') ?? 'Type crop'}
            placeholderTextColor={theme.text ?? '#999'}
            value={prCrop}
            onChangeText={setPrCrop}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.text },
            ]}
          />
        )}

      {/* GRADE */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('grade_label') ?? 'Grade'}
      </Text>
      <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
        <Picker selectedValue={prGrade} onValueChange={setPrGrade}>
          <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
          {currentGrades.map(g => (
            <Picker.Item key={g} label={g} value={g} />
          ))}
        </Picker>
      </View>

      {/* QUANTITY */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('quantity_label') ?? 'Quantity'}
      </Text>
      <TextInput
        value={prQuantity}
        onChangeText={setPrQuantity}
        keyboardType="numeric"
        placeholder={t('enter_quantity') ?? 'Enter quantity'}
        placeholderTextColor={theme.text ?? '#999'}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.text },
        ]}
      />

      {/* EXPECTED AMOUNT */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('expected_amount') ?? 'Expected Amount'}
      </Text>
      <TextInput
        value={prSellingAmount}
        onChangeText={setPrSellingAmount}
        placeholder={t('enter_expected_amount') ?? 'Enter amount'}
        placeholderTextColor={theme.text ?? '#999'}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.text },
        ]}
      />

      {/* MANDI */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('mandi_label') ?? 'Mandi'}
      </Text>
      <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
        <Picker
          selectedValue={
            isValidPickerValue(prMandi, mandiOptions) ? prMandi : ''
          }
          onValueChange={setPrMandi}
        >
          <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
          {mandiOptions.map(m => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* ARRIVAL DATE */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('arrival_label') ?? 'Expected Arrival'}
      </Text>
      <TouchableOpacity
        onPress={openDatePicker}
        style={[
          styles.input,
          styles.dateInput,
          { borderColor: theme.text },
        ]}
      >
        <Text style={{ color: prExpectedArrival ? theme.text : '#999' }}>
          {prExpectedArrival || t('enter_date') || 'dd-mm-yyyy'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      {/* SUBMIT */}
      <TouchableOpacity
        style={[
          styles.submitBtn,
          { backgroundColor: theme.primary ?? '#2b6cb0' },
        ]}
        onPress={onSubmit}
      >
        <Text style={styles.submitBtnText}>
          {editingLotId
            ? t('update_lot') ?? 'Update Lot'
            : t('add_lot') ?? 'Add Lot'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: {
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
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
  dateInput: {
    justifyContent: 'center',
  },
  submitBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
});

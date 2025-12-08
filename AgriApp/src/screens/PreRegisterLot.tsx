///old one, new integrations not implemented.

import React, { useEffect, useState } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,FlatList,Alert,Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
};

export default function PreRegisterLot() {
  const navigation = useNavigation<PropsNav>();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [crop, setCrop] = useState('');
  const [grade, setGrade] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mandi, setMandi] = useState('');
  const [expectedArrival, setExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

 // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const STORAGE_KEY = (p: string) => `REGISTERED_LOTS_${p}`;

    // Example lists - edit as needed or fetch from API
  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Other'];
  const mandiOptions = ['Mandi A', 'Mandi B', 'Mandi C', 'Other'];

   // grade options by crop (simple mapping)
  const gradeMap: Record<string, string[]> = {
    Wheat: ['Select grade', 'A', 'B', 'C', 'Other'],
    Rice: ['Select grade', 'Super', 'Medium', 'Low', 'Other'],
    Maize: ['Select grade', 'Grade 1', 'Grade 2', 'Grade 3', 'Other'],
    Cotton: ['Select grade', 'Lip', 'Medium', 'Low', 'Other'],
    Other: ['Other'],
  };

  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then((p) => {
      setPhone(p);
      if (p) {
        AsyncStorage.getItem(STORAGE_KEY(p)).then((j) => {
          if (j) {
            try {
              setLots(JSON.parse(j));
            } catch (e) {
              console.warn('Failed parse lots', e);
            }
          }
        });
      }
    });
  }, []);

   useEffect(() => {
    // when crop changes, reset grade if it's not in the new list
    if (!crop) {
      setGrade('');
      return;
    }
    const options = gradeMap[crop] || ['Other'];
    if (!options.includes(grade)) {
      setGrade('');
    }
  }, [crop]);

  const saveLotsToStorage = async (newLots: Lot[]) => {
    if (!phone) return;
    await AsyncStorage.setItem(STORAGE_KEY(phone), JSON.stringify(newLots));
  };

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
  
    // On Android the event may be 'dismissed' so selectedDate can be undefined
   // setShowDatePicker(Platform.OS === 'ios'); // keep open on iOS if needed, close on Android
   if (Platform.OS==='android'){
    setShowDatePicker(false);
   }
     if (selectedDate) {
    setDateValue(selectedDate);
    setExpectedArrival(formatDate(selectedDate));
  }
  };

  const openDatePicker = () => {
    // Try to pre-populate with current selected date if present
    if (expectedArrival) {
      // parse dd-mm-yyyy
      const [dd, mm, yyyy] = expectedArrival.split('-').map((s) => parseInt(s, 10));
      if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
        setDateValue(new Date(yyyy, mm - 1, dd));
      }
    } else {
      setDateValue(new Date());
    }
    setShowDatePicker(true);
  };

  const validateAndAdd = async () => {
    if (!crop) return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
    if (!quantity) return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter quantity');
    if (!mandi) return Alert.alert(t('error_title') ?? 'Error', t('fill_mandi') ?? 'Please select mandi');
    // expectedArrival optional, but if provided basic format check could be added

    const newLot: Lot = {
      id: `${Date.now()}`,
      crop,
      grade: grade || '-',
      quantity,
      mandi,
      expectedArrival: expectedArrival || '-',
      createdAt: Date.now(),
    };

    const newLots = [newLot, ...lots];
    setLots(newLots);
    await saveLotsToStorage(newLots);

    // clear inputs
    setCrop('');
    setGrade('');
    setQuantity('');
    setMandi('');
    setExpectedArrival('');
    setDateValue(new Date());
    setShowDatePicker(false);

    Alert.alert(t('success_title') ?? 'Success', t('lot_added_success') ?? 'Lot added');
  };

  const removeLot = async (id: string) => {
    const filtered = lots.filter((l) => l.id !== id);
    setLots(filtered);
    if (phone) await AsyncStorage.setItem(STORAGE_KEY(phone), JSON.stringify(filtered));
  };

  const goBack = () => navigation.navigate('Dashboard' as any);

   // Helper: show text input when "Other" selected
  const isCropOther = crop === 'Other';
  const isMandiOther = mandi === 'Other';
  const isGradeOther = grade === 'Other';

  // current grades list
  const currentGrades = crop ? gradeMap[crop] ?? ['Other'] : ['Select grade'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity onPress={goBack} style={[styles.backBtn, { backgroundColor: theme.background ?? '#edf2f7' }]}>
          <Text style={[styles.backText, { color: theme.primary ?? '#2b6cb0' }]}>{t('back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{t('pre_register_title')}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>{t('pre_register_subtitle')}</Text>

        <View style={[styles.formBox, { borderColor: '#ddd', backgroundColor: theme.background }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('crop')}</Text>
          {/* <TextInput
            placeholder={t('select_crop') ?? 'select crop'}
            placeholderTextColor={theme.text ?? '#999'}
            value={crop}
            onChangeText={setCrop}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          /> */}
           <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
            <Picker
              selectedValue={crop}
              onValueChange={(v) => setCrop(v)}
            >
              <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
              {cropOptions.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>

          {isCropOther && (
            <TextInput
              placeholder={t('type_crop') ?? 'Type crop'}
              placeholderTextColor={theme.text ?? '#999'}
              value={crop === 'Other' ? '' : crop}
              onChangeText={(txt) => setCrop(txt)}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />
          )}

          {/* Grade picker (dependent on crop) */}
          <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
          <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
            <Picker
              selectedValue={grade}
              onValueChange={(v) => setGrade(v)}
            >
              <Picker.Item label={t('select_grade') ?? 'Select grade'} value="" />
              {currentGrades.map((g) => (
                <Picker.Item key={g} label={g} value={g} />
              ))}
            </Picker>
          </View>

           {isGradeOther && (
            <TextInput
              placeholder={t('type_grade') ?? 'Type grade'}
              placeholderTextColor={theme.text ?? '#999'}
              value={isGradeOther ? '' : grade}
              onChangeText={(txt) => setGrade(txt)}
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            />
          )}

          {/* <Text style={[styles.label, { color: theme.text }]}>{t('grade_label')}</Text>
          <TextInput
            placeholder={t('select_grade') ?? 'select grade'}
            placeholderTextColor={theme.text ?? '#999'}
            value={grade}
            onChangeText={setGrade}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          /> */}

          <Text style={[styles.label, { color: theme.text }]}>{t('quantity_label')}</Text>
          <TextInput
            placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
            placeholderTextColor={theme.text}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.label, { color: theme.text }]}>{t('mandi_label')}</Text>
              {/* <TextInput
                placeholder={t('select_mandi') ?? 'select mandi'}
                placeholderTextColor={theme.text}
                value={mandi}
                onChangeText={setMandi}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              /> */}
               <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={mandi}
                  onValueChange={(v) => setMandi(v)}
                >
                  <Picker.Item label={t('select_mandi') ?? 'Select mandi'} value="" />
                  {mandiOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                </Picker>
            </View>
            {isMandiOther && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={isMandiOther ? '' : mandi}
                  onChangeText={(txt) => setMandi(txt)}
                  style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.text }]}>{t('arrival_label')}</Text>
              {/* <TextInput
                placeholder={t('enter_date') ?? 'dd-mm-yy'}
                placeholderTextColor={theme.text}
                value={expectedArrival}
                onChangeText={setExpectedArrival}
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              /> */}

                {/* DATE PICKER TOUCHABLE */}
              <TouchableOpacity
                style={[styles.input, { justifyContent: 'center', borderColor: theme.text }]}
                onPress={openDatePicker}
              >
                <Text style={{ color: expectedArrival ? theme.text : theme.text }}>
                  {expectedArrival ? expectedArrival : (t('enter_date') ?? 'dd-mm-yyyy')}
                </Text>
              </TouchableOpacity>

              {/* Clear date button */}
              {expectedArrival ? (
                <TouchableOpacity
                  onPress={() => {
                    setExpectedArrival('');
                  }}
                  style={{ marginTop: 6 }}
                >
                  <Text style={{ color: theme.primary, fontSize: 12 }}>{t('clear') ?? 'Clear'}</Text>
                </TouchableOpacity>
              ) : null}

              {/* Native DateTimePicker */}
              {showDatePicker && (
                <DateTimePicker
                  value={dateValue}
                  mode="date"
                  display={Platform.OS === 'android' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  maximumDate={new Date(2100, 11, 31)}
                  minimumDate={new Date(2000, 0, 1)}
                />
              )}
            </View>
          </View>

          <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary ?? '#2b6cb0' }]} onPress={validateAndAdd}>
            <Text style={[styles.addBtnText, { color: '#fff' }]}>{t('add_lot')}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 12 }} />

        <Text style={[styles.title, { color: theme.text }]}>{t('your_registered_lots')}</Text>

        {lots.length === 0 ? (
          <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
            <Text style={{ color: theme.text }}>{t('no_lots')}</Text>
          </View>
        ) : (
          <FlatList
            data={lots}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.lotItem, { borderColor: '#ccc', backgroundColor: theme.background }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('crop')}: </Text>{item.crop}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('grade_label')}: </Text>{item.grade}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('quantity_label')}: </Text>{item.quantity}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('mandi_label')}: </Text>{item.mandi}</Text>
                  <Text style={[styles.lotText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('arrival_label')}: </Text>{item.expectedArrival}</Text>
                </View>

                <TouchableOpacity style={styles.removeBtn} onPress={() => removeLot(item.id)}>
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginBottom: 10 },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 13, marginBottom: 12 },

  formBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
  label: { fontSize: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 8 },

  addBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  addBtnText: { fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  emptyBox: { borderWidth: 1, borderRadius: 8, padding: 14, alignItems: 'center' },

  lotItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
  lotText: { marginBottom: 6 },

  removeBtn: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6, marginLeft: 10 },
  removeBtnText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row' },

 pickerWrap: { borderWidth: 1, borderRadius: 6, marginBottom: 8, overflow: 'hidden', },
});

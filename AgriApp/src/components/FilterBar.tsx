// import React from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { useLanguage } from '../context/LanguageContext';
// import {Picker} from '@react-native-picker/picker';
// import { useTheme } from '../context/ThemeContext';

// interface FilterProps {
//   filters: { mandi: string; crop: string };
//   setFilters: (filters: { mandi: string; crop: string }) => void;
//   onSearch: () => void;
// }

// const defaultMandiOptions = [
//   { label: 'Select Mandi', value: '' },
//   { label: 'Pune Mandi', value: 'pune' },
//   { label: 'Nagpur Mandi', value: 'nagpur' },
//   { label: 'Nashik Mandi', value: 'nashik' },
//   // add more as you need
// ];

// const defaultCropOptions = [
//   { label: 'Select Crop', value: '' },
//   { label: 'Wheat', value: 'wheat' },
//   { label: 'Rice', value: 'rice' },
//   { label: 'Onion', value: 'onion' },
//   { label: 'Sugarcane', value: 'sugarcane' },
//   // add more as you need
// ];

// export default function FilterBar({ filters, setFilters, onSearch }: FilterProps) {
// const { t } = useLanguage();
// const { theme } = useTheme();

//   return (
//     <View style={styles.filterContainer}>
//       <Text style={styles.label}>{t('mandi')}</Text>
//       {/* <TextInput
//         style={styles.input}
//         placeholder={t('enter_mandi')}
//         value={filters.mandi}
//         onChangeText={(t) => setFilters({ ...filters, mandi: t })}
//       /> */}

//       <View style={styles.pickerWrap}>
//         <Picker
//           selectedValue={filters.mandi}
//           onValueChange={(t) => setFilters({ ...filters, mandi: t })}
//           mode="dropdown"
//           style={[styles.picker, { color: theme.text }]}
//           dropdownIconColor={theme.text}
//         >
//           {defaultMandiOptions.map((opt) => (
//             <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
//           ))}
//         </Picker>
//       </View>

//       <Text style={styles.label}>{t('crop')}</Text>
//       {/* <TextInput
//         style={styles.input}
//         placeholder={t('enter_crop')}
//         value={filters.crop}
//         onChangeText={(t) => setFilters({ ...filters, crop: t })}
//       /> */}

//            <View style={styles.pickerWrap}>
//         <Picker
//           selectedValue={filters.crop}
//           onValueChange={(value) => setFilters({ ...filters, crop: value })}
//           mode="dropdown"
//           style={[styles.picker, { color: theme.text }]}
//           dropdownIconColor={theme.text}
//         >
//           {defaultCropOptions.map((opt) => (
//             <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
//           ))}
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
//         <Text style={[styles.searchText,{color:theme.text}]}>{t('search')}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   filterContainer: {
//     backgroundColor: '#f9f9f9',
//     borderColor: 'theme.text',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   label: { fontWeight: '600', marginTop: 8 },
//   // input: {
//   //   borderWidth: 1,
//   //   borderColor: 'theme.text',
//   //   borderRadius: 8,
//   //   padding: 8,
//   //   marginTop: 4,
//   // },

//   pickerWrap: { 
//      borderWidth: 1,
//      borderColor: 'theme.text',
//      borderRadius: 8,
//      paddingHorizontal: 8,
//      paddingVertical: 6,
//      marginTop: 4,
//      height: 42,         
//      justifyContent: 'center',
//   },

//   searchBtn: {
//     marginTop: 10,
//     backgroundColor: '#15f048ff',
//     borderRadius: 30,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   searchText: {
//     color: 'theme.text',
//     fontWeight: '700',
//   },
//   picker:{},
// });

// // import React, { useEffect, useState } from 'react';
// // import { View } from 'react-native';
// // import DropDownPicker from 'react-native-dropdown-picker';

// // import { useLanguage } from '../context/LanguageContext';
// // import { useTheme } from '../context/ThemeContext';
// // import api from '../services/api';

// // type Option = {
// //   label: string;
// //   value: string;
// // };

// // export default function MandiCropSelector() {
// //   const { t } = useLanguage();
// //   const { theme } = useTheme();

// //   // 🔹 Mandi state
// //   const [mandiOptions, setMandiOptions] = useState<Option[]>([]);
// //   const [selectedMandiId, setSelectedMandiId] = useState<string | null>(null);
// //   const [mandiOpen, setMandiOpen] = useState(false);

// //   // 🔹 Crop state (depends on selected mandi)
// //   const [cropOptions, setCropOptions] = useState<Option[]>([]);
// //   const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
// //   const [cropOpen, setCropOpen] = useState(false);

// //   // ⬇️ Load mandis from DB
// //   useEffect(() => {
// //     const loadMandis = async () => {
// //       try {
// //         const res = await api.get('/mandis'); // adjust endpoint if needed
// //         const mapped = res.data.map((m: any) => ({
// //           // If your DB has localized names (e.g. m.nameHi), you can switch on current language here.
// //           label: `${m.mandiName}, ${m.location}`,
// //           value: String(m.mandiId),
// //         }));
// //         setMandiOptions(mapped);

// //         if (!selectedMandiId && mapped.length > 0) {
// //           setSelectedMandiId(mapped[0].value);
// //         }
// //       } catch (err) {
// //         console.log('Error loading mandis:', err);
// //       }
// //     };

// //     loadMandis();
// //   }, []);

// //   // ⬇️ Load crops whenever mandi changes
// //   useEffect(() => {
// //     const loadCrops = async () => {
// //       if (!selectedMandiId) {
// //         setCropOptions([]);
// //         setSelectedCropId(null);
// //         return;
// //       }

// //       try {
// //         // Example: /mandis/{id}/crops – change to your actual route
// //         const res = await api.get(`/mandis/${selectedMandiId}/crops`);
// //         const mapped = res.data.map((c: any) => ({
// //           // same idea: if you have multilingual fields, pick based on current language
// //           label: c.cropName,
// //           value: String(c.cropId),
// //         }));
// //         setCropOptions(mapped);
// //         setSelectedCropId(null); // reset crop when mandi changes
// //       } catch (err) {
// //         console.log('Error loading crops:', err);
// //       }
// //     };

// //     loadCrops();
// //   }, [selectedMandiId]);

// //   return (
// //     <View style={{ zIndex: 2000 }}>
// //       {/* 🔹 Mandi Dropdown */}
// //       <DropDownPicker
// //         open={mandiOpen}
// //         value={selectedMandiId}
// //         items={mandiOptions}
// //         setOpen={setMandiOpen}
// //         setValue={setSelectedMandiId}
// //         setItems={setMandiOptions}
// //         placeholder={t('select_mandi') ?? 'Select Mandi'}
// //         style={{ borderColor: theme.text, marginBottom: 8 }}
// //         dropDownContainerStyle={{ borderColor: theme.text }}
// //         listMode="MODAL"
// //         modalTitle={t('select_mandi') ?? 'Select Mandi'}
// //       />

// //       {/* 🔹 Crop Dropdown (depends on selected mandi) */}
// //       <DropDownPicker
// //         open={cropOpen}
// //         value={selectedCropId}
// //         items={cropOptions}
// //         setOpen={setCropOpen}
// //         setValue={setSelectedCropId}
// //         setItems={setCropOptions}
// //         placeholder={t('select_crop') ?? 'Select Crop'}
// //         disabled={!selectedMandiId}
// //         style={{ borderColor: theme.text, marginTop: 8 }}
// //         dropDownContainerStyle={{ borderColor: theme.text }}
// //         listMode="MODAL"
// //         modalTitle={t('select_crop') ?? 'Select Crop'}
// //       />
// //     </View>
// //   );
// // }


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

interface FilterProps {
  filters: { mandi: string; crop: string; district: string };
  setFilters: (filters: { mandi: string; crop: string; district: string }) => void;
  onSearch: () => void;
}

type Option = {
  label: string;
  value: string;
};

export default function FilterBar({ filters, setFilters, onSearch }: FilterProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [mandiOptions, setMandiOptions] = useState<Option[]>([]);
  const [cropOptions, setCropOptions] = useState<Option[]>([]);
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);


  const handleSearch = () => {
  if (!filters.mandi || !filters.crop) {
    Alert.alert(
      t('error_title') ?? 'Error',
      t('fill_mandi_search') ??
        'Please select mandi and crop, then click on search'
    );
    return;
  }

  onSearch();
};


  /* ---------------- Load Mandis ---------------- */
  useEffect(() => {
    const loadMandis = async () => {
      try {
        const res = await api.get('/mandis');
        const mapped: Option[] = [
          { label: t('select_mandi') ?? 'Select Mandi', value: '' },
          ...res.data.map((m: any) => ({
            label: m.mandiName,      // adjust if backend differs
            value: String(m.mandiId),
          })),
        ];
        setMandiOptions(mapped);
      } catch (err) {
        console.log('Error loading mandis', err);
      }
    };

    loadMandis();
  }, []);

    /* ---------------- Load Districts ---------------- */
  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const res = await api.get('/mandis');
        const mapped: Option[] = [
          { label: t('select_district') ?? 'Select District', value: '' },
          ...res.data.map((m: any) => ({
            label: m.district,    
            value: String(m.mandiId),
          })),
        ];
        setDistrictOptions(mapped);
      } catch (err) {
        console.log('Error loading district', err);
      }
    };

    loadDistricts();
  }, []);

  /* ---------------- Load Crops ---------------- */
  useEffect(() => {
    const loadCrops = async () => {
      try {
        const res = await api.get('/crops');
        const mapped: Option[] = [
          { label: t('select_crop') ?? 'Select Crop', value: '' },
          ...res.data.map((c: any) => ({
            label: c.cropName,
            value: String(c.cropId),
          })),
        ];
        setCropOptions(mapped);
      } catch (err) {
        console.log('Error loading crops', err);
      }
    };

    loadCrops();
  }, []);

  return (
    <View style={[styles.filterContainer, { backgroundColor: theme.background }]}>

      
           {/* ---------------- District ---------------- */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('district')}
      </Text>

      <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
        <Picker
          selectedValue={filters.district}
          onValueChange={(value) =>
            setFilters({ ...filters, district: value })
          }
          style={[styles.picker, { color: theme.text }]}
          dropdownIconColor={theme.text}
        >
          {districtOptions.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      {/* ---------------- Mandi ---------------- */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('mandi')}
      </Text>

      <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
        <Picker
          selectedValue={filters.mandi}
          onValueChange={(value) =>
            setFilters({ ...filters, mandi: value })
          }
          style={[styles.picker, { color: theme.text }]}
          dropdownIconColor={theme.text}
        >
          {mandiOptions.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      {/* ---------------- Crop ---------------- */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t('crop')}
      </Text>

      <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
        <Picker
          selectedValue={filters.crop}
          onValueChange={(value) =>
            setFilters({ ...filters, crop: value })
          }
          style={[styles.picker, { color: theme.text }]}
          dropdownIconColor={theme.text}
        >
          {cropOptions.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      {/* ---------------- Search ---------------- */}
      <TouchableOpacity
        style={[styles.searchBtn, { backgroundColor: theme.primary }]}
        onPress={handleSearch}
      >

        <Text style={[styles.searchText, { color: theme.text }]}>
          {t('search')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginTop: 6,
  },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    marginTop: 2,
    height: 48,
    justifyContent: 'center',
  },
  picker: {
    height: 52,
  },
  searchBtn: {
    marginTop: 12,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchText: {
    fontWeight: '700',
  },
});

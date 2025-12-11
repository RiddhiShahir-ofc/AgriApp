// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import api from '../services/api';
// import { useTheme } from '../context/ThemeContext';

// export default function EditArrivedLot() {
//   const route = useRoute<any>();
//   const navigation = useNavigation();
//   const { theme } = useTheme();
//   const arrivedLotId = route.params?.arrivedLotId;

//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({
//     quantity: '',
//     grade: '',
//     cropId: '',
//     lotOwnerName: '',
//     mobileNum: '',
//     lotOwnerRole: '',
//     lotImageUrl: '',
//   });

//   const loadDetails = async () => {
//     try {
//       const res = await api.get(`/mandiOfficialAuction/mandi/arrivedLots/${arrivedLotId}`);
//       const data = res.data;

//       setForm({
//         quantity: String(data.quantity),
//         grade: data.grade,
//         cropId: String(data.cropId),
//         lotOwnerName: data.lotOwnerName ?? '',
//         mobileNum: data.mobileNum ?? '',
//         lotOwnerRole: data.lotOwnerRole ?? '',
//         lotImageUrl: data.lotImageUrl ?? '',
//       });
//     } catch (err) {
//       Alert.alert('Error', 'Failed to load lot details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDetails();
//   }, []);

//   const submitEdit = async () => {
//     try {
//       await api.put(`/mandi-official/lots/arrived/${arrivedLotId}/edit`, {
//         Quantity: Number(form.quantity),
//         Grade: form.grade,
//         CropId: Number(form.cropId),
//         LotImageUrl: form.lotImageUrl,
//         LotOwnerName: form.lotOwnerName,
//         MobileNum: form.mobileNum,
//         LotOwnerRole: form.lotOwnerRole,
//       });

//       await api.patch(`/mandi-official/lots/arrived/${arrivedLotId}/status`, {
//         newStatus: 'verified'
//       });

//       Alert.alert('Success', 'Updated and verified successfully');
//       navigation.goBack();

//     } catch (err) {
//       Alert.alert('Error', 'Failed to update');
//     }
//   };

//   if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

//   return (
//     <ScrollView style={{ padding: 16, backgroundColor: theme.background }}>

//       <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text }}>
//         Edit Arrived Lot
//       </Text>

//       {Object.keys(form).map((key) => (
//         <View style={{ marginTop: 16 }} key={key}>
//           <Text style={{ color: theme.text, marginBottom: 4 }}>{key}</Text>
//           <TextInput
//             style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//             value={form[key]}
//             onChangeText={(v) => setForm({ ...form, [key]: v })}
//           />
//         </View>
//       ))}

//       <TouchableOpacity style={styles.submitBtn} onPress={submitEdit}>
//         <Text style={styles.submitText}>Save & Verify</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 6
//   },
//   submitBtn: {
//     backgroundColor: '#16a34a',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20
//   },
//   submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
// });

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function EditArrivedLot() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const arrivedLotId = route.params?.arrivedLotId;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    quantity: '',
    grade: '',
    cropId: '',
    lotOwnerName: '',
    mobileNum: '',
    lotOwnerRole: '',
    lotImageUrl: '',
  });

  const loadDetails = async () => {
    try {
      const res = await api.get(`/mandiOfficialAuction/mandi/arrivedLots/${arrivedLotId}`);
      const data = res.data;

      setForm({
        quantity: String(data.quantity),
        grade: data.grade,
        cropId: String(data.cropId),
        lotOwnerName: data.lotOwnerName ?? '',
        mobileNum: data.mobileNum ?? '',
        lotOwnerRole: data.lotOwnerRole ?? '',
        lotImageUrl: data.lotImageUrl ?? '',
      });
    } catch (err) {
      Alert.alert(t('error_title') ?? 'Error', t('lot_details_failed') ?? 'Failed to load lot details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const submitEdit = async () => {
    try {
      await api.put(`/mandi-official/lots/arrived/${arrivedLotId}/edit`, {
        Quantity: Number(form.quantity),
        Grade: form.grade,
        CropId: Number(form.cropId),
        LotImageUrl: form.lotImageUrl,
        LotOwnerName: form.lotOwnerName,
        MobileNum: form.mobileNum,
        LotOwnerRole: form.lotOwnerRole,
      });

      // auto verify
      await api.patch(`/mandi-official/lots/arrived/${arrivedLotId}/status`, {
        newStatus: 'verified'
      });

      Alert.alert(t('success_title') ?? 'Success', t('update_success') ?? 'Updated successfully');
      navigation.goBack();

    } catch (err) {
      Alert.alert(t('error_title') ?? 'Error', t('update_failed') ?? 'Failed to update');
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={{ padding: 16, backgroundColor: theme.background }}>

      <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text }}>
        {t('edit_lot_title') ?? 'Edit Arrived Lot'}
      </Text>

      {/* Input fields */}
      {[
        ['quantity', t('quantity')],
        ['grade', t('grade_label')],
        ['cropId', t('crop')],
        ['lotOwnerName', t('owner_name_placeholder')],
        ['mobileNum', t('owner_mobile_placeholder')],
        ['lotOwnerRole', t('owner_role_label')],
        ['lotImageUrl', t('image_url')],
      ].map(([key, label]: any) => (
        <View style={{ marginTop: 16 }} key={key}>
          <Text style={{ color: theme.text, marginBottom: 4 }}>{label}</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.text, color: theme.text }]}
           // value={form[key]}
            onChangeText={(v) => setForm({ ...form, [key]: v })}
          />
        </View>
      ))}

      <TouchableOpacity
        style={[styles.submitBtn, { backgroundColor: theme.text }]}
        onPress={submitEdit}
      >
        <Text style={[styles.submitText, { color: theme.text }]}>
          {t('save_verify') ?? 'Save & Verify'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6
  },
  submitBtn: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  submitText: { fontWeight: '700', fontSize: 16 },
});

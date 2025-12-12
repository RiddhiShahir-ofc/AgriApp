// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   Alert,
// //   ActivityIndicator
// // } from 'react-native';
// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import api from '../services/api';
// // import { useTheme } from '../context/ThemeContext';

// // export default function EditArrivedLot() {
// //   const route = useRoute<any>();
// //   const navigation = useNavigation();
// //   const { theme } = useTheme();
// //   const arrivedLotId = route.params?.arrivedLotId;

// //   const [loading, setLoading] = useState(true);
// //   const [form, setForm] = useState({
// //     quantity: '',
// //     grade: '',
// //     cropId: '',
// //     lotOwnerName: '',
// //     mobileNum: '',
// //     lotOwnerRole: '',
// //     lotImageUrl: '',
// //   });

// //   const loadDetails = async () => {
// //     try {
// //       const res = await api.get(`/mandiOfficialAuction/mandi/arrivedLots/${arrivedLotId}`);
// //       const data = res.data;

// //       setForm({
// //         quantity: String(data.quantity),
// //         grade: data.grade,
// //         cropId: String(data.cropId),
// //         lotOwnerName: data.lotOwnerName ?? '',
// //         mobileNum: data.mobileNum ?? '',
// //         lotOwnerRole: data.lotOwnerRole ?? '',
// //         lotImageUrl: data.lotImageUrl ?? '',
// //       });
// //     } catch (err) {
// //       Alert.alert('Error', 'Failed to load lot details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadDetails();
// //   }, []);

// //   const submitEdit = async () => {
// //     try {
// //       await api.put(`/mandi-official/lots/arrived/${arrivedLotId}/edit`, {
// //         Quantity: Number(form.quantity),
// //         Grade: form.grade,
// //         CropId: Number(form.cropId),
// //         LotImageUrl: form.lotImageUrl,
// //         LotOwnerName: form.lotOwnerName,
// //         MobileNum: form.mobileNum,
// //         LotOwnerRole: form.lotOwnerRole,
// //       });

// //       await api.patch(`/mandi-official/lots/arrived/${arrivedLotId}/status`, {
// //         newStatus: 'verified'
// //       });

// //       Alert.alert('Success', 'Updated and verified successfully');
// //       navigation.goBack();

// //     } catch (err) {
// //       Alert.alert('Error', 'Failed to update');
// //     }
// //   };

// //   if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

// //   return (
// //     <ScrollView style={{ padding: 16, backgroundColor: theme.background }}>

// //       <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text }}>
// //         Edit Arrived Lot
// //       </Text>

// //       {Object.keys(form).map((key) => (
// //         <View style={{ marginTop: 16 }} key={key}>
// //           <Text style={{ color: theme.text, marginBottom: 4 }}>{key}</Text>
// //           <TextInput
// //             style={[styles.input, { borderColor: theme.text, color: theme.text }]}
// //             value={form[key]}
// //             onChangeText={(v) => setForm({ ...form, [key]: v })}
// //           />
// //         </View>
// //       ))}

// //       <TouchableOpacity style={styles.submitBtn} onPress={submitEdit}>
// //         <Text style={styles.submitText}>Save & Verify</Text>
// //       </TouchableOpacity>

// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   input: {
// //     borderWidth: 1,
// //     padding: 10,
// //     borderRadius: 6
// //   },
// //   submitBtn: {
// //     backgroundColor: '#16a34a',
// //     padding: 14,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 20
// //   },
// //   submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
// // });

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
// import { useLanguage } from '../context/LanguageContext';

// export default function EditArrivedLot() {
//   const route = useRoute<any>();
//   const navigation = useNavigation();
//   const { theme } = useTheme();
//   const { t } = useLanguage();

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
//       Alert.alert(t('error_title') ?? 'Error', t('lot_details_failed') ?? 'Failed to load lot details');
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

//       // auto verify
//       await api.patch(`/mandi-official/lots/arrived/${arrivedLotId}/status`, {
//         newStatus: 'verified'
//       });

//       Alert.alert(t('success_title') ?? 'Success', t('update_success') ?? 'Updated successfully');
//       navigation.goBack();

//     } catch (err) {
//       Alert.alert(t('error_title') ?? 'Error', t('update_failed') ?? 'Failed to update');
//     }
//   };

//   if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

//   return (
//     <ScrollView style={{ padding: 16, backgroundColor: theme.background }}>

//       <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text }}>
//         {t('edit_lot_title') ?? 'Edit Arrived Lot'}
//       </Text>

//       {/* Input fields */}
//       {[
//         ['quantity', t('quantity')],
//         ['grade', t('grade_label')],
//         ['cropId', t('crop')],
//         ['lotOwnerName', t('owner_name_placeholder')],
//         ['mobileNum', t('owner_mobile_placeholder')],
//         ['lotOwnerRole', t('owner_role_label')],
//         ['lotImageUrl', t('image_url')],
//       ].map(([key, label]: any) => (
//         <View style={{ marginTop: 16 }} key={key}>
//           <Text style={{ color: theme.text, marginBottom: 4 }}>{label}</Text>
//           <TextInput
//             style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//            // value={form[key]}
//             onChangeText={(v) => setForm({ ...form, [key]: v })}
//           />
//         </View>
//       ))}

//       <TouchableOpacity
//         style={[styles.submitBtn, { backgroundColor: theme.primary }]}
//         onPress={submitEdit}
//       >
//         <Text style={[styles.submitText, { color: theme.text }]}>
//           {t('save_verify') ?? 'Save & Verify'}
//         </Text>
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
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20
//   },
//   submitText: { fontWeight: '700', fontSize: 16 },
// });

// src/screens/EditArrivedLot.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// loose navigation typing to avoid 'never' errors (you can tighten later)
type NavAny = any;
type RouteAny = any;

export default function EditArrivedLot() {
  const navigation = useNavigation<NavAny>();
  const route = useRoute<RouteAny>();
  const arrivedLotId = route.params?.arrivedLotId;

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // form state
  const [crops, setCrops] = useState<any[]>([]);
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [lotOwnerName, setLotOwnerName] = useState<string>('');
  const [mobileNum, setMobileNum] = useState<string>('');
  const [lotImageUrl, setLotImageUrl] = useState<string | null>(null);
  const [mandiName, setMandiName] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (!arrivedLotId) {
      Alert.alert(t('error_title') ?? 'Error', t('invalid_id') ?? 'Invalid lot id');
      navigation.goBack();
      return;
    }
    loadData();
    // refresh when screen focused
    const unsub = navigation.addListener?.('focus', loadData);
    return () => unsub?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivedLotId]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1) load lot details
      const res = await api.get(`/mandiOfficialAuction/mandi/arrivedLots/${arrivedLotId}`);
      const dto = res?.data ?? null;
      if (!dto) throw new Error('Lot not found');

      // DTO fields from your service:
      // ArrivedLotDetailDto contains: ArrivedLotId, CropId, CropName, MandiName, Status, Quantity, Grade, LotImageUrl, QrCodeUrl, ...
      setSelectedCropId(dto.cropId ?? dto.CropId ?? null);
      setQuantity(dto.quantity != null ? String(dto.quantity) : '');
      setGrade(dto.grade ?? '');
      setLotImageUrl(dto.lotImageUrl ?? null);
      setMandiName(dto.mandiName ?? dto.MandiName ?? '');
      setStatus(dto.status ?? '');

      // Some endpoints may not return owner name / mobile; allow approver to fill
      // Attempt to read if fields exist
      setLotOwnerName(dto.lotOwnerName ?? dto.LotOwnerName ?? '');
      setMobileNum(dto.mobileNum ?? dto.MobileNum ?? '');

      // 2) load crops for dropdown
      try {
        const cropsRes = await api.get('/crops');
        const cropData = Array.isArray(cropsRes.data) ? cropsRes.data : [];
        setCrops(cropData);
      } catch (err) {
        console.log('EditArrivedLot: crops load failed', err);
        setCrops([]);
      }
    } catch (err: any) {
      console.log('EditArrivedLot load error', err?.response?.data ?? err);
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fetch_lot_failed') ?? 'Failed to load arrived lot details.',
      );
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const validateAndSubmit = async () => {
    // basic validation
    if (!selectedCropId) {
      return Alert.alert(t('error_title') ?? 'Error', t('fill_crop') ?? 'Please select crop');
    }
    if (!quantity || Number(quantity) <= 0) {
      return Alert.alert(t('error_title') ?? 'Error', t('fill_quantity') ?? 'Please enter valid quantity');
    }
    if (!lotOwnerName) {
      return Alert.alert(t('error_title') ?? 'Error', t('fill_owner') ?? 'Please enter owner name');
    }
    if (!mobileNum) {
      return Alert.alert(t('error_title') ?? 'Error', t('fill_mobile') ?? 'Please enter mobile number');
    }

    const dto = {
      Quantity: Number(quantity),
      Grade: grade || null,
      CropId: selectedCropId,
      LotImageUrl: lotImageUrl || null,
      LotOwnerName: lotOwnerName,
      MobileNum: mobileNum,
      LotOwnerRole: 'farmer', // default; if you want to allow changing, add UI for role
    };

    setSaving(true);
    try {
      // PUT edit
      const editRes = await api.put(`/mandi-official/lots/arrived/${arrivedLotId}/edit`, dto);
      if (!editRes.status.toString().startsWith('2')) {
        throw new Error(editRes.data?.message || 'Edit failed');
      }

      // After editing, mark as verified (approver action)
      const statusRes = await api.patch(`/mandi-official/lots/arrived/${arrivedLotId}/status`, {
        NewStatus: 'verified', // backend expects NewStatus per DTO shape earlier; if it expects newStatus lowercase adjust accordingly
      });

      if (!statusRes.status.toString().startsWith('2')) {
        throw new Error(statusRes.data?.message || 'Status update failed');
      }

      Alert.alert(
        t('success_title') ?? 'Success',
        t('lot_verified_success') ?? 'Lot edited and verified successfully',
      );

      // go back to list (or refresh)
      navigation.goBack();
    } catch (err: any) {
      console.log('EditArrivedLot submit error', err?.response?.data ?? err);
      const msg =
        err?.response?.data?.message ??
        t('edit_failed') ??'Failed to edit/verify lot';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8, color: theme.text }}>{t('loading') ?? 'Loading...'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>{t('edit_arrived_lot') ?? 'Edit Arrived Lot'}</Text>

        {/* Mandi name (readonly) */}
        <Text style={[styles.label, { color: theme.text }]}>{t('mandi') ?? 'Mandi'}</Text>
        <View style={[styles.readonlyBox, { borderColor: theme.text }]}>
          <Text style={{ color: theme.text }}>{mandiName || '-'}</Text>
        </View>

        {/* Current status */}
        <Text style={[styles.label, { color: theme.text }]}>{t('status') ?? 'Status'}</Text>
        <View style={[styles.readonlyBox, { borderColor: theme.text }]}>
          <Text style={{ color: theme.text }}>{status || '-'}</Text>
        </View>

        {/* Crop */}
        <Text style={[styles.label, { color: theme.text }]}>{t('crop') ?? 'Crop'}</Text>
        <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
          <Picker
            selectedValue={selectedCropId ?? ''}
            onValueChange={(v) => setSelectedCropId(v ? Number(v) : null)}
          >
            <Picker.Item label={t('select_crop') ?? 'Select crop'} value="" />
            {crops.map((c: any) => {
              const id = c.cropId ?? c.CropId ?? c.id;
              const name = c.cropName ?? c.CropName ?? c.name ?? '';
              if (!id || !name) return null;
              return <Picker.Item key={String(id)} label={String(name)} value={Number(id)} />;
            })}
          </Picker>
        </View>

        {/* Quantity */}
        <Text style={[styles.label, { color: theme.text }]}>{t('quantity') ?? 'Quantity'}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          keyboardType="numeric"
          value={quantity}
          onChangeText={(v) => setQuantity(v)}
          placeholder={t('enter_quantity') ?? 'Enter quantity'}
          placeholderTextColor="#9ca3af"
        />

        {/* Grade */}
        <Text style={[styles.label, { color: theme.text }]}>{t('grade_label') ?? 'Grade'}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          value={grade}
          onChangeText={(v) => setGrade(v)}
          placeholder={t('type_grade') ?? 'Enter grade'}
          placeholderTextColor="#9ca3af"
        />

        {/* Owner name */}
        <Text style={[styles.label, { color: theme.text }]}>{t('owner_name_placeholder') ?? 'Owner Name'}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          value={lotOwnerName}
          onChangeText={(v) => setLotOwnerName(v)}
          placeholder={t('enter_owner_name') ?? 'Enter owner name'}
          placeholderTextColor="#9ca3af"
        />

        {/* Mobile number */}
        <Text style={[styles.label, { color: theme.text }]}>{t('mobile') ?? 'Mobile'}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          value={mobileNum}
          onChangeText={(v) => setMobileNum(v)}
          placeholder={t('enter_mobile_number') ?? 'Enter mobile number'}
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
        />

        {/* Existing image preview (optional) */}
        {lotImageUrl ? (
          <>
            <Text style={[styles.label, { color: theme.text }]}>{t('lot_image') ?? 'Lot Image'}</Text>
            <Image source={{ uri: lotImageUrl }} style={styles.image} />
          </>
        ) : null}

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, saving && { opacity: 0.7 }]}
          onPress={validateAndSubmit}
          disabled={saving}
        >
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>{t('submit_and_verify') ?? 'Submit & Verify'}</Text>}
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  readonlyBox: { borderWidth: 1, borderRadius: 8, padding: 10 },
  pickerWrap: { borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 4 },
  submitBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: { color: '#fff', fontWeight: '700' },
  image: { width: '100%', height: 180, borderRadius: 8, marginTop: 8 },
});

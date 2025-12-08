// // import React, { useState, useEffect } from 'react';
// // import {
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   Image,
// //   PermissionsAndroid,
// //   Platform,
// //   View,
// //   ScrollView,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation } from '@react-navigation/native';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../../App';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {
// //   launchCamera,
// //   launchImageLibrary,
// //   CameraOptions,
// //   ImageLibraryOptions,
// // } from 'react-native-image-picker';
// // import DropDownPicker from 'react-native-dropdown-picker';

// // import { addRole } from '../utils/storage';
// // import { useTheme } from '../context/ThemeContext';
// // import { useLanguage } from '../context/LanguageContext';
// // import api from '../services/api';

// // type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// // type FarmDetail = {
// //   id: string;
// //   location: string;
// //   crop: string;
// //   landSize: string;
// // };

// // const FarmerRegister: React.FC = () => {
// //   const navigation = useNavigation<PropsNav>();

// //   const [name, setName] = useState('');
// //   const [village, setVillage] = useState('');
// //   const [profileImage, setProfileImage] = useState<string | null>(null);

// //   // farm detail inputs and list
// //   const [farmLocation, setFarmLocation] = useState('');
// //   const [farmCrop, setFarmCrop] = useState('');
// //   const [farmLandSize, setFarmLandSize] = useState('');
// //   const [farms, setFarms] = useState<FarmDetail[]>([]);

// //   // crop multi-select
// //   const [open, setOpen] = useState(false);
// //   const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
// //   const [cropItems, setCropItems] = useState<{ label: string; value: string }[]>(
// //     []
// //   );

// //   const [submitting, setSubmitting] = useState(false);

// //   const { theme } = useTheme();
// //   const { t } = useLanguage();

// //   // ---- permissions / image picking ----
// //   const requestCameraPermission = async () => {
// //     if (Platform.OS !== 'android') return true;

// //     const granted = await PermissionsAndroid.request(
// //       PermissionsAndroid.PERMISSIONS.CAMERA,
// //       {
// //         title: t('camera_permission'),
// //         message: t('app_needs_photo'),
// //         buttonPositive: t('allow') ?? 'Allow',
// //       }
// //     );
// //     return granted === PermissionsAndroid.RESULTS.GRANTED;
// //   };

// //   const requestReadPermission = async () => {
// //     if (Platform.OS !== 'android') return true;

// //     const granted = await PermissionsAndroid.request(
// //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
// //       {
// //         title: t('storage_permission'),
// //         message: t('app_storage_permission'),
// //         buttonPositive: 'Allow',
// //       }
// //     );
// //     return granted === PermissionsAndroid.RESULTS.GRANTED;
// //   };

// //   const openCamera = async () => {
// //     const ok = await requestCameraPermission();
// //     if (!ok) return Alert.alert(t('permission_req'), t('camera'));

// //     const options: CameraOptions = {
// //       mediaType: 'photo',
// //       saveToPhotos: true,
// //       quality: 0.8,
// //     };
// //     launchCamera(options, (resp) => {
// //       if (resp.didCancel) return;
// //       if (resp.errorMessage)
// //         return Alert.alert(t('error_title'), resp.errorMessage);
// //       if (resp.assets && resp.assets.length > 0) {
// //         setProfileImage(resp.assets[0].uri || null);
// //       }
// //     });
// //   };

// //   const openGallery = async () => {
// //     const ok = await requestReadPermission();
// //     if (!ok) return Alert.alert(t('permission_req'), t('storage'));

// //     const options: ImageLibraryOptions = {
// //       mediaType: 'photo',
// //       selectionLimit: 1,
// //     };
// //     launchImageLibrary(options, (resp) => {
// //       if (resp.didCancel) return;
// //       if (resp.errorMessage)
// //         return Alert.alert(t('error_title'), resp.errorMessage);
// //       if (resp.assets && resp.assets.length > 0) {
// //         setProfileImage(resp.assets[0].uri || null);
// //       }
// //     });
// //   };

// //   // ---- Farm list handling ----
// //   const onAddFarm = () => {
// //     if (!farmLocation && !farmCrop && !farmLandSize) {
// //       return Alert.alert(
// //         t('missing_some_fields') ?? 'Missing fields',
// //         t('fill_farm_fields') ?? 'Please fill farm details'
// //       );
// //     }

// //     const newFarm: FarmDetail = {
// //       id: `${Date.now()}`,
// //       location: farmLocation || '-',
// //       crop: farmCrop || '-',
// //       landSize: farmLandSize || '-',
// //     };

// //     setFarms((prev) => [newFarm, ...prev]);
// //     setFarmLocation('');
// //     setFarmCrop('');
// //     setFarmLandSize('');
// //   };

// //   const removeFarm = (id: string) => {
// //     setFarms((prev) => prev.filter((f) => f.id !== id));
// //   };

// //   // ---- Load crops from backend ----
// //   useEffect(() => {
// //     const loadCrops = async () => {
// //       try {
// //         const res = await api.get('/crops');
// //         const data = res.data;
// //         setCropItems(
// //           data.map((c: { name: string; id: number | string }) => ({
// //             label: c.name,
// //             value: String(c.id), // store as string, convert later
// //           }))
// //         );
// //       } catch (err) {
// //         console.log('Crop Fetch Error: ', err);
// //       }
// //     };
// //     loadCrops();
// //   }, []);

// //   // ---- Helper: upload profile image to backend ----
// //   const uploadProfileImage = async (imageUri: string): Promise<string> => {
// //     const formData = new FormData();

// //     const fileName = imageUri.split('/').pop() || 'profile.jpg';
// //     const file: any = {
// //       uri: imageUri,
// //       name: fileName,
// //       type: 'image/jpeg', // adjust if needed
// //     };

// //     formData.append('file', file);
// //     formData.append('folder', 'farmers/profile-photos');

// //     const res = await api.post('/files/upload', formData, {
// //       headers: {
// //         'Content-Type': 'multipart/form-data',
// //       },
// //     });

// //     const json = res.data;
// //     if (!res.status.toString().startsWith('2')) {
// //       throw new Error(json.message || 'Failed to upload profile photo');
// //     }

// //     // FileUploadController returns { url }
// //     return json.url as string;
// //   };

// //   // ---- Helper: call /farmer/register ----
// //   const registerFarmerOnBackend = async (
// //     profilePhotoUrl: string | null
// //   ): Promise<void> => {
// //     // backend expects List<int> CropIds
// //     const cropIds = selectedCrops
// //       .map((val) => Number(val))
// //       .filter((n) => !Number.isNaN(n));

// //     const farmDetailsPayload = farms.map((f) => ({
// //       farmLocation: f.location,
// //       primaryCrop: f.crop,
// //       farmSize: parseFloat(f.landSize) || 0,
// //     }));

// //     const payload = {
// //       farmerName: name,
// //       profilePhotoUrl: profilePhotoUrl,
// //       location: village,
// //       cropIds,
// //       farmDetails: farmDetailsPayload,
// //     };

// //     const res = await api.post('/farmer/register', payload);
// //     if (!res.status.toString().startsWith('2')) {
// //       throw new Error(res.data?.message || 'Farmer registration failed');
// //     }
// //   };

// //   // ---- Register button handler ----
// //   const onRegister = async () => {
// //     if (!name || !village || !profileImage) {
// //       return Alert.alert(
// //         t('missing_some_fields') ?? 'Missing fields',
// //         t('fill_fields') ?? 'Please fill all required fields'
// //       );
// //     }

// //     if (!selectedCrops.length) {
// //       return Alert.alert(
// //         t('missing_some_fields') ?? 'Missing fields',
// //         t('select_crops') ?? 'Please select at least one interested crop'
// //       );
// //     }

// //     if (!farms.length) {
// //       return Alert.alert(
// //         t('missing_some_fields') ?? 'Missing fields',
// //         t('fill_farm_fields') ?? 'Please add at least one farm entry'
// //       );
// //     }

// //     setSubmitting(true);
// //     try {
// //       // Optional: ensure user is logged in
// //       const token = await AsyncStorage.getItem('ACCESS_TOKEN');
// //       if (!token) {
// //         Alert.alert(
// //           t('error_title') ?? 'Error',
// //           // t('not_logged_in') ??
// //             'You must be logged in to register as a farmer.'
// //         );
// //         setSubmitting(false);
// //         return;
// //       }

// //       // 1) Upload profile image
// //       let uploadedUrl: string | null = null;
// //       if (profileImage) {
// //         uploadedUrl = await uploadProfileImage(profileImage);
// //       }

// //       // 2) Call /farmer/register
// //       await registerFarmerOnBackend(uploadedUrl);

// //       // 3) Mark role locally
// //       const phone =
// //         (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
// //       if (phone) await addRole(phone, 'farmer');
// //       await AsyncStorage.setItem(
// //         'LOGGED_IN_ROLE',
// //         t('farmer') ?? 'Farmer'
// //       );

// //       // 4) Optional: store local profile
// //       const profile = { name, village, profileImage: uploadedUrl, phone, farms };
// //       await AsyncStorage.setItem('farmerProfile', JSON.stringify(profile));

// //       Alert.alert(
// //         t('success_title') ?? 'Success',
// //         t('farmer_reg_success') ?? 'Farmer registered successfully',
// //         [
// //           {
// //             text: t('ok') ?? 'OK',
// //             onPress: () =>
// //               navigation.reset({
// //                 index: 0,
// //                 routes: [{ name: 'FarmerDashboard' }],
// //               }),
// //           },
// //         ]
// //       );
// //     } catch (err: any) {
// //       console.error('Farmer register error:', err?.response ?? err);
// //       const msg =
// //         err?.response?.data?.message ??
// //         err?.message ??
// //         t('error_generic') ??
// //         'Something went wrong';
// //       Alert.alert(t('error_title') ?? 'Error', msg);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // ---- UI ----
// //   return (
// //     <SafeAreaView
// //       style={[styles.container, { backgroundColor: theme.background }]}
// //     >
// //       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
// //         <Text style={[styles.title, { color: theme.text }]}>
// //           {t('farmer_reg')}
// //         </Text>

// //         <View style={styles.imageContainer}>
// //           {profileImage ? (
// //             <Image source={{ uri: profileImage }} style={styles.profileImage} />
// //           ) : (
// //             <Text style={[styles.imageLabel, { color: theme.text }]}>
// //               {t('no_image')}
// //             </Text>
// //           )}

// //           <View style={styles.row}>
// //             <TouchableOpacity style={styles.smallBtn} onPress={openCamera}>
// //               <Text style={[styles.btnText, { color: '#fff' }]}>
// //                 📸 {t('take_photo')}
// //               </Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.smallBtn} onPress={openGallery}>
// //               <Text style={[styles.btnText, { color: '#fff' }]}>
// //                 🖼️ {t('gallery')}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         <TextInput
// //           placeholder={t('farmer_name')}
// //           placeholderTextColor={theme.text}
// //           style={[
// //             styles.input,
// //             { color: theme.text, borderColor: theme.text },
// //           ]}
// //           value={name}
// //           onChangeText={setName}
// //         />
// //         <TextInput
// //           placeholder={t('village')}
// //           placeholderTextColor={theme.text}
// //           style={[
// //             styles.input,
// //             { color: theme.text, borderColor: theme.text },
// //           ]}
// //           value={village}
// //           onChangeText={setVillage}
// //         />

// //         {/* Multi crop selector */}
// //         <DropDownPicker
// //           multiple
// //           open={open}
// //           value={selectedCrops}
// //           items={cropItems}
// //           setOpen={setOpen}
// //           setValue={setSelectedCrops}
// //           setItems={setCropItems}
// //           placeholder={t('intrested_crop')}
// //           listMode="MODAL"
// //           modalProps={{ animationType: 'slide' }}
// //           style={{ marginBottom: 10 }}
// //         />

// //         {/* Farm Details Box */}
// //         <View
// //           style={[
// //             styles.farmBox,
// //             { backgroundColor: theme.background, borderColor: '#ddd' },
// //           ]}
// //         >
// //           <View style={styles.farmHeaderRow}>
// //             <Text style={[styles.farmTitle, { color: theme.text }]}>
// //               {t('farm_details') ?? 'Farm Details'}
// //             </Text>
// //             <TouchableOpacity style={styles.addSmallBtn} onPress={onAddFarm}>
// //               <Text style={styles.addSmallBtnText}>
// //                 {t('add') ?? 'Add'}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>

// //           <TextInput
// //             placeholder={t('farm_location')}
// //             placeholderTextColor={theme.text}
// //             style={[
// //               styles.input,
// //               { color: theme.text, borderColor: theme.text },
// //             ]}
// //             value={farmLocation}
// //             onChangeText={setFarmLocation}
// //           />
// //           <TextInput
// //             placeholder={t('crop') ?? 'Crop'}
// //             placeholderTextColor={theme.text}
// //             style={[
// //               styles.input,
// //               { color: theme.text, borderColor: theme.text },
// //             ]}
// //             value={farmCrop}
// //             onChangeText={setFarmCrop}
// //           />
// //           <TextInput
// //             placeholder={t('land_size') ?? 'Land Size'}
// //             placeholderTextColor={theme.text}
// //             style={[
// //               styles.input,
// //               { color: theme.text, borderColor: theme.text },
// //             ]}
// //             value={farmLandSize}
// //             onChangeText={setFarmLandSize}
// //           />
// //         </View>

// //         {/* List of farms */}
// //         {farms.length > 0 && (
// //           <View style={styles.farmList}>
// //             <Text style={[styles.sectionLabel, { color: theme.text }]}>
// //               {t('list_of_farms') ??
// //                 'List of Farm Details displayed after clicking on add'}
// //             </Text>
// //             {farms.map((f) => (
// //               <View
// //                 key={f.id}
// //                 style={[
// //                   styles.farmItem,
// //                   { borderColor: '#ccc', backgroundColor: theme.background },
// //                 ]}
// //               >
// //                 <View style={{ flex: 1 }}>
// //                   <Text
// //                     style={[styles.farmItemText, { color: theme.text }]}
// //                   >
// //                     <Text style={{ fontWeight: '700' }}>
// //                       {t('farm_location') ?? 'Farm Location'}:{' '}
// //                     </Text>
// //                     {f.location}
// //                   </Text>
// //                   <Text
// //                     style={[styles.farmItemText, { color: theme.text }]}
// //                   >
// //                     <Text style={{ fontWeight: '700' }}>
// //                       {t('crop') ?? 'Crop'}:{' '}
// //                     </Text>
// //                     {f.crop}
// //                   </Text>
// //                   <Text
// //                     style={[styles.farmItemText, { color: theme.text }]}
// //                   >
// //                     <Text style={{ fontWeight: '700' }}>
// //                       {t('land_size') ?? 'Land Size'}:{' '}
// //                     </Text>
// //                     {f.landSize}
// //                   </Text>
// //                 </View>
// //                 <TouchableOpacity
// //                   style={styles.removeBtn}
// //                   onPress={() => removeFarm(f.id)}
// //                 >
// //                   <Text style={styles.removeBtnText}>✕</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             ))}
// //           </View>
// //         )}

// //         <TouchableOpacity
// //           style={[styles.btn, submitting && { opacity: 0.6 }]}
// //           onPress={onRegister}
// //           disabled={submitting}
// //         >
// //           <Text style={[styles.btnText, { color: '#fff' }]}>
// //             {submitting
// //               ? t('loading') ?? 'Submitting...'
// //               : t('register')}
// //           </Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default FarmerRegister;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
// //   imageContainer: { alignItems: 'center', marginBottom: 20 },
// //   profileImage: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
// //   imageLabel: { marginBottom: 10 },
// //   row: { flexDirection: 'row', justifyContent: 'center' },
// //   smallBtn: {
// //     backgroundColor: '#4A90E2',
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     borderRadius: 8,
// //     marginHorizontal: 6,
// //   },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
// //   btn: {
// //     backgroundColor: '#2b6cb0',
// //     padding: 12,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   btnText: { fontWeight: '700' },

// //   farmBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 10 },
// //   farmHeaderRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },
// //   farmTitle: { fontSize: 16, fontWeight: '700' },
// //   addSmallBtn: {
// //     backgroundColor: '#1f7a1f',
// //     paddingHorizontal: 10,
// //     paddingVertical: 6,
// //     borderRadius: 6,
// //   },
// //   addSmallBtnText: { color: '#fff', fontWeight: '700' },

// //   farmList: { marginTop: 12 },
// //   sectionLabel: { fontSize: 12, marginBottom: 8 },
// //   farmItem: {
// //     flexDirection: 'row',
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     padding: 10,
// //     marginBottom: 8,
// //     alignItems: 'center',
// //   },
// //   farmItemText: { marginBottom: 6 },
// //   removeBtn: {
// //     backgroundColor: '#e53e3e',
// //     padding: 6,
// //     borderRadius: 6,
// //     marginLeft: 10,
// //   },
// //   removeBtnText: { color: '#fff', fontWeight: '700' },
// // });

// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   PermissionsAndroid,
//   Platform,
//   View,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   launchCamera,
//   launchImageLibrary,
//   CameraOptions,
//   ImageLibraryOptions,
// } from 'react-native-image-picker';
// import DropDownPicker from 'react-native-dropdown-picker';

// import { addRole } from '../utils/storage';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import api from '../services/api';

// type PropsNav = NativeStackNavigationProp<RootStackParamList>;

// type FarmDetail = {
//   id: string;
//   location: string;
//   crop: string;
//   landSize: string;
// };

// const FarmerRegister: React.FC = () => {
//   const navigation = useNavigation<PropsNav>();

//   const [name, setName] = useState('');
//   const [village, setVillage] = useState('');
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   // farm detail inputs and list
//   const [farmLocation, setFarmLocation] = useState('');
//   const [farmCrop, setFarmCrop] = useState('');
//   const [farmLandSize, setFarmLandSize] = useState('');
//   const [farms, setFarms] = useState<FarmDetail[]>([]);

//   // crop multi-select
//   const [open, setOpen] = useState(false);
//   const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
//   const [cropItems, setCropItems] = useState<{ label: string; value: string }[]>(
//     []
//   );

//   const [submitting, setSubmitting] = useState(false);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//     // ⬇️ NEW: If already registered as farmer, skip this screen
//   useEffect(() => {
//     const checkExistingFarmer = async () => {
//       try {
//         // Optional: ensure user is logged in
//         const phone = await AsyncStorage.getItem('LOGGED_IN_USER');
//         if (!phone) return;

//         const existingProfile = await AsyncStorage.getItem('farmerProfile');
//         if (existingProfile) {
//           // User already registered as farmer → go straight to dashboard
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'FarmerDashboard' }],
//           });
//         }
//       } catch (e) {
//         console.warn('Failed to check farmer registration', e);
//       }
//     };

//     checkExistingFarmer();
//   }, [navigation]);


//   // ---- permissions / image picking ----
//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: t('camera_permission'),
//         message: t('app_needs_photo'),
//         buttonPositive: t('allow') ?? 'Allow',
//       }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const requestReadPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       {
//         title: t('storage_permission'),
//         message: t('app_storage_permission'),
//         buttonPositive: 'Allow',
//       }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const openCamera = async () => {
//     const ok = await requestCameraPermission();
//     if (!ok) return Alert.alert(t('permission_req'), t('camera'));

//     const options: CameraOptions = {
//       mediaType: 'photo',
//       saveToPhotos: true,
//       quality: 0.8,
//     };
//     launchCamera(options, (resp) => {
//       if (resp.didCancel) return;
//       if (resp.errorMessage)
//         return Alert.alert(t('error_title'), resp.errorMessage);
//       if (resp.assets && resp.assets.length > 0) {
//         setProfileImage(resp.assets[0].uri || null);
//       }
//     });
//   };

//   const openGallery = async () => {
//     const ok = await requestReadPermission();
//     if (!ok) return Alert.alert(t('permission_req'), t('storage'));

//     const options: ImageLibraryOptions = {
//       mediaType: 'photo',
//       selectionLimit: 1,
//     };
//     launchImageLibrary(options, (resp) => {
//       if (resp.didCancel) return;
//       if (resp.errorMessage)
//         return Alert.alert(t('error_title'), resp.errorMessage);
//       if (resp.assets && resp.assets.length > 0) {
//         setProfileImage(resp.assets[0].uri || null);
//       }
//     });
//   };

//   // ---- Farm list handling ----
//   const onAddFarm = () => {
//     if (!farmLocation && !farmCrop && !farmLandSize) {
//       return Alert.alert(
//         t('missing_some_fields') ?? 'Missing fields',
//         t('fill_farm_fields') ?? 'Please fill farm details'
//       );
//     }

//     const newFarm: FarmDetail = {
//       id: `${Date.now()}`,
//       location: farmLocation || '-',
//       crop: farmCrop || '-',
//       landSize: farmLandSize || '-',
//     };

//     setFarms((prev) => [newFarm, ...prev]);
//     setFarmLocation('');
//     setFarmCrop('');
//     setFarmLandSize('');
//   };

//   const removeFarm = (id: string) => {
//     setFarms((prev) => prev.filter((f) => f.id !== id));
//   };

//   // ---- Load crops from backend (fix for undefined id) ----
//   useEffect(() => {
//     const loadCrops = async () => {
//       try {
//         const res = await api.get('/crops');
//         const data = res.data;

//         const mapped = data
//           .map((c: any) => {
//             // try several possible id/name shapes
//             const rawId =
//               c.id ??
//               c.cropId ??
//               c.cropID ??
//               c.CropId ??
//               c.CropID ??
//               null;
//             const name =
//               c.name ??
//               c.cropName ??
//               c.CropName ??
//               '';

//             if (!rawId || !name) {
//               // skip invalid entries
//               return null;
//             }

//             return {
//               label: String(name),
//               value: String(rawId),
//             };
//           })
//           .filter(Boolean) as { label: string; value: string }[];

//         setCropItems(mapped);
//       } catch (err) {
//         console.log('Crop Fetch Error: ', err);
//       }
//     };
//     loadCrops();
//   }, []);

//   // ---- Helper: upload profile image to backend ----
//   const uploadProfileImage = async (imageUri: string): Promise<string> => {
//     const formData = new FormData();

//     const fileName = imageUri.split('/').pop() || 'profile.jpg';
//     const file: any = {
//       uri: imageUri,
//       name: fileName,
//       type: 'image/jpeg', // adjust if needed
//     };

//     formData.append('file', file);
//     formData.append('folder', 'farmers/profile-photos');

//     const res = await api.post('/files/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     const json = res.data;
//     if (!res.status.toString().startsWith('2')) {
//       throw new Error(json.message || 'Failed to upload profile photo');
//     }

//     // FileUploadController returns { url }
//     return json.url as string;
//   };

//   // ---- Helper: call /farmer/register ----
//   const registerFarmerOnBackend = async (
//     profilePhotoUrl: string | null
//   ): Promise<void> => {
//     // backend expects List<int> CropIds
//     const cropIds = selectedCrops
//       .map((val) => Number(val))
//       .filter((n) => !Number.isNaN(n));

//     const farmDetailsPayload = farms.map((f) => ({
//       farmLocation: f.location,
//       primaryCrop: f.crop,
//       farmSize: parseFloat(f.landSize) || 0,
//     }));

//     const payload = {
//       farmerName: name,
//       profilePhotoUrl: profilePhotoUrl,
//       location: village,
//       cropIds,
//       farmDetails: farmDetailsPayload,
//     };

//     const res = await api.post('/farmer/register', payload);
//     if (!res.status.toString().startsWith('2')) {
//       throw new Error(res.data?.message || 'Farmer registration failed');
//     }
//   };

//   // ---- Register button handler ----
//   const onRegister = async () => {
//     if (!name || !village || !profileImage) {
//       return Alert.alert(
//         t('missing_some_fields') ?? 'Missing fields',
//         t('fill_fields') ?? 'Please fill all required fields'
//       );
//     }

//     if (!selectedCrops.length) {
//       return Alert.alert(
//         t('missing_some_fields') ?? 'Missing fields',
//         t('select_crops') ?? 'Please select at least one interested crop'
//       );
//     }

//     if (!farms.length) {
//       return Alert.alert(
//         t('missing_some_fields') ?? 'Missing fields',
//         t('fill_farm_fields') ?? 'Please add at least one farm entry'
//       );
//     }

//     setSubmitting(true);
//     try {
//       // Optional: ensure user is logged in
//       const token = await AsyncStorage.getItem('ACCESS_TOKEN');
//       if (!token) {
//         Alert.alert(
//           t('error_title') ?? 'Error',
//           // t('not_logged_in') ??
//             'You must be logged in to register as a farmer.'
//         );
//         setSubmitting(false);
//         return;
//       }

//       // 1) Upload profile image
//       let uploadedUrl: string | null = null;
//       if (profileImage) {
//         uploadedUrl = await uploadProfileImage(profileImage);
//       }

//       // 2) Call /farmer/register
//       await registerFarmerOnBackend(uploadedUrl);

//       // 3) Mark role locally
//       const phone =
//         (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
//       if (phone) await addRole(phone, 'farmer');
//       await AsyncStorage.setItem(
//         'LOGGED_IN_ROLE',
//         t('farmer') ?? 'Farmer'
//       );

//       // 4) Optional: store local profile
//       const profile = { name, village, profileImage: uploadedUrl, phone, farms };
//       await AsyncStorage.setItem('farmerProfile', JSON.stringify(profile));

//       Alert.alert(
//         t('success_title') ?? 'Success',
//         t('farmer_reg_success') ?? 'Farmer registered successfully',
//         [
//           {
//             text: t('ok') ?? 'OK',
//             onPress: () =>
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'FarmerDashboard' }],
//               }),
//           },
//         ]
//       );
//     } catch (err: any) {
//       console.error('Farmer register error:', err?.response ?? err);
//       const msg =
//         err?.response?.data?.message ??
//         err?.message ??
//         t('error_generic') ??
//         'Something went wrong';
//       Alert.alert(t('error_title') ?? 'Error', msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ---- UI ----
//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.background }]}
//     >
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text style={[styles.title, { color: theme.text }]}>
//           {t('farmer_reg')}
//         </Text>

//         <View style={styles.imageContainer}>
//           {profileImage ? (
//             <Image source={{ uri: profileImage }} style={styles.profileImage} />
//           ) : (
//             <Text style={[styles.imageLabel, { color: theme.text }]}>
//               {t('no_image')}
//             </Text>
//           )}

//           <View style={styles.row}>
//             <TouchableOpacity style={styles.smallBtn} onPress={openCamera}>
//               <Text style={[styles.btnText, { color: '#fff' }]}>
//                 📸 {t('take_photo')}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.smallBtn} onPress={openGallery}>
//               <Text style={[styles.btnText, { color: '#fff' }]}>
//                 🖼️ {t('gallery')}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TextInput
//           placeholder={t('farmer_name')}
//           placeholderTextColor={theme.text}
//           style={[
//             styles.input,
//             { color: theme.text, borderColor: theme.text },
//           ]}
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           placeholder={t('village')}
//           placeholderTextColor={theme.text}
//           style={[
//             styles.input,
//             { color: theme.text, borderColor: theme.text },
//           ]}
//           value={village}
//           onChangeText={setVillage}
//         />

//         {/* Multi crop selector */}
//         <DropDownPicker
//           multiple
//           open={open}
//           value={selectedCrops}
//           items={cropItems}
//           setOpen={setOpen}
//           setValue={setSelectedCrops}
//           setItems={setCropItems}
//           placeholder={t('intrested_crop')}
//           listMode="MODAL"
//           modalProps={{ animationType: 'slide' }}
//           style={{ marginBottom: 10 }}
//         />

//         {/* Farm Details Box */}
//         <View
//           style={[
//             styles.farmBox,
//             { backgroundColor: theme.background, borderColor: '#ddd' },
//           ]}
//         >
//           <View style={styles.farmHeaderRow}>
//             <Text style={[styles.farmTitle, { color: theme.text }]}>
//               {t('farm_details') ?? 'Farm Details'}
//             </Text>
//             <TouchableOpacity style={styles.addSmallBtn} onPress={onAddFarm}>
//               <Text style={styles.addSmallBtnText}>
//                 {t('add') ?? 'Add'}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <TextInput
//             placeholder={t('farm_location')}
//             placeholderTextColor={theme.text}
//             style={[
//               styles.input,
//               { color: theme.text, borderColor: theme.text },
//             ]}
//             value={farmLocation}
//             onChangeText={setFarmLocation}
//           />
//           <TextInput
//             placeholder={t('crop') ?? 'Crop'}
//             placeholderTextColor={theme.text}
//             style={[
//               styles.input,
//               { color: theme.text, borderColor: theme.text },
//             ]}
//             value={farmCrop}
//             onChangeText={setFarmCrop}
//           />
//           <TextInput
//             placeholder={t('land_size') ?? 'Land Size'}
//             placeholderTextColor={theme.text}
//             style={[
//               styles.input,
//               { color: theme.text, borderColor: theme.text },
//             ]}
//             value={farmLandSize}
//             onChangeText={setFarmLandSize}
//           />
//         </View>

//         {/* List of farms */}
//         {farms.length > 0 && (
//           <View style={styles.farmList}>
//             <Text style={[styles.sectionLabel, { color: theme.text }]}>
//               {t('list_of_farms') ??
//                 'List of Farm Details displayed after clicking on add'}
//             </Text>
//             {farms.map((f) => (
//               <View
//                 key={f.id}
//                 style={[
//                   styles.farmItem,
//                   { borderColor: '#ccc', backgroundColor: theme.background },
//                 ]}
//               >
//                 <View style={{ flex: 1 }}>
//                   <Text
//                     style={[styles.farmItemText, { color: theme.text }]}
//                   >
//                     <Text style={{ fontWeight: '700' }}>
//                       {t('farm_location') ?? 'Farm Location'}:{' '}
//                     </Text>
//                     {f.location}
//                   </Text>
//                   <Text
//                     style={[styles.farmItemText, { color: theme.text }]}
//                   >
//                     <Text style={{ fontWeight: '700' }}>
//                       {t('crop') ?? 'Crop'}:{' '}
//                     </Text>
//                     {f.crop}
//                   </Text>
//                   <Text
//                     style={[styles.farmItemText, { color: theme.text }]}
//                   >
//                     <Text style={{ fontWeight: '700' }}>
//                       {t('land_size') ?? 'Land Size'}:{' '}
//                     </Text>
//                     {f.landSize}
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   style={styles.removeBtn}
//                   onPress={() => removeFarm(f.id)}
//                 >
//                   <Text style={styles.removeBtnText}>✕</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         )}

//         <TouchableOpacity
//           style={[styles.btn, submitting && { opacity: 0.6 }]}
//           onPress={onRegister}
//           disabled={submitting}
//         >
//           <Text style={[styles.btnText, { color: '#fff' }]}>
//             {submitting
//               ? t('loading') ?? 'Submitting...'
//               : t('register')}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default FarmerRegister;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   imageContainer: { alignItems: 'center', marginBottom: 20 },
//   profileImage: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
//   imageLabel: { marginBottom: 10 },
//   row: { flexDirection: 'row', justifyContent: 'center' },
//   smallBtn: {
//     backgroundColor: '#4A90E2',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginHorizontal: 6,
//   },
//   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
//   btn: {
//     backgroundColor: '#2b6cb0',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   btnText: { fontWeight: '700' },

//   farmBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 10 },
//   farmHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   farmTitle: { fontSize: 16, fontWeight: '700' },
//   addSmallBtn: {
//     backgroundColor: '#1f7a1f',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   addSmallBtnText: { color: '#fff', fontWeight: '700' },

//   farmList: { marginTop: 12 },
//   sectionLabel: { fontSize: 12, marginBottom: 8 },
//   farmItem: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   farmItemText: { marginBottom: 6 },
//   removeBtn: {
//     backgroundColor: '#e53e3e',
//     padding: 6,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   removeBtnText: { color: '#fff', fontWeight: '700' },
// });

import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import { addRole } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type FarmDetail = {
  id: string;
  location: string;
  crop: string;
  landSize: string;
};

const FarmerRegister: React.FC = () => {
  const navigation = useNavigation<PropsNav>();

  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // farm detail inputs and list
  const [farmLocation, setFarmLocation] = useState('');
  const [farmCrop, setFarmCrop] = useState('');
  const [farmLandSize, setFarmLandSize] = useState('');
  const [farms, setFarms] = useState<FarmDetail[]>([]);

  // crop multi-select
  const [open, setOpen] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [cropItems, setCropItems] = useState<{ label: string; value: string }[]>(
    []
  );

  const [submitting, setSubmitting] = useState(false);

  //  NEW: while checking /farmer/status, we hide the form
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { theme } = useTheme();
  const { t } = useLanguage();

  // ---- permissions / image picking ----
  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: t('camera_permission'),
        message: t('app_needs_photo'),
        buttonPositive: t('allow') ?? 'Allow',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestReadPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: t('storage_permission'),
        message: t('app_storage_permission'),
        buttonPositive: 'Allow',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const ok = await requestCameraPermission();
    if (!ok) return Alert.alert(t('permission_req'), t('camera'));

    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.8,
    };
    launchCamera(options, (resp) => {
      if (resp.didCancel) return;
      if (resp.errorMessage)
        return Alert.alert(t('error_title'), resp.errorMessage);
      if (resp.assets && resp.assets.length > 0) {
        setProfileImage(resp.assets[0].uri || null);
      }
    });
  };

  const openGallery = async () => {
    const ok = await requestReadPermission();
    if (!ok) return Alert.alert(t('permission_req'), t('storage'));

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    launchImageLibrary(options, (resp) => {
      if (resp.didCancel) return;
      if (resp.errorMessage)
        return Alert.alert(t('error_title'), resp.errorMessage);
      if (resp.assets && resp.assets.length > 0) {
        setProfileImage(resp.assets[0].uri || null);
      }
    });
  };

  // ---- Farm list handling ----
  const onAddFarm = () => {
    if (!farmLocation && !farmCrop && !farmLandSize) {
      return Alert.alert(
        t('missing_some_fields') ?? 'Missing fields',
        t('fill_farm_fields') ?? 'Please fill farm details'
      );
    }

    const newFarm: FarmDetail = {
      id: `${Date.now()}`,
      location: farmLocation || '-',
      crop: farmCrop || '-',
      landSize: farmLandSize || '-',
    };

    setFarms((prev) => [newFarm, ...prev]);
    setFarmLocation('');
    setFarmCrop('');
    setFarmLandSize('');
  };

  const removeFarm = (id: string) => {
    setFarms((prev) => prev.filter((f) => f.id !== id));
  };

  // ---- Load crops from backend (fix for undefined id) ----
  useEffect(() => {
    const loadCrops = async () => {
      try {
        const res = await api.get('/crops');
        const data = res.data;

        const mapped = data
          .map((c: any) => {
            // try several possible id/name shapes
            const rawId =
              c.id ??
              c.cropId ??
              c.cropID ??
              c.CropId ??
              c.CropID ??
              null;
            const name =
              c.name ??
              c.cropName ??
              c.CropName ??
              '';

            if (!rawId || !name) {
              // skip invalid entries
              return null;
            }

            return {
              label: String(name),
              value: String(rawId),
            };
          })
          .filter(Boolean) as { label: string; value: string }[];

        setCropItems(mapped);
      } catch (err) {
        console.log('Crop Fetch Error: ', err);
      }
    };
    loadCrops();
  }, []);

  // 🔵 NEW: use backend /farmer/status to decide where to go
  useEffect(() => {
    const checkFarmerStatus = async () => {
      try {
        // api should already attach the Authorization header (token)
        const res = await api.get('/farmer/status');
        const isFarmer = !!res.data?.isFarmer;

        if (isFarmer) {
          // already registered → go straight to FarmerDashboard
          navigation.reset({
            index: 0,
            routes: [{ name: 'FarmerDashboard' }],
          });
        } else {
          // show registration form
          setCheckingStatus(false);
        }
      } catch (e) {
        console.warn('Failed to check farmer status', e);
        // on error, fall back to showing registration form
        setCheckingStatus(false);
      }
    };

    checkFarmerStatus();
  }, [navigation]);

  // ---- Helper: upload profile image to backend ----
  const uploadProfileImage = async (imageUri: string): Promise<string> => {
    const formData = new FormData();

    const fileName = imageUri.split('/').pop() || 'profile.jpg';
    const file: any = {
      uri: imageUri,
      name: fileName,
      type: 'image/jpeg', // adjust if needed
    };

    formData.append('file', file);
    formData.append('folder', 'farmers/profile-photos');

    const res = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const json = res.data;
    if (!res.status.toString().startsWith('2')) {
      throw new Error(json.message || 'Failed to upload profile photo');
    }

    // FileUploadController returns { url }
    return json.url as string;
  };

  // ---- Helper: call /farmer/register ----
  const registerFarmerOnBackend = async (
    profilePhotoUrl: string | null
  ): Promise<void> => {
    // backend expects List<int> CropIds
    const cropIds = selectedCrops
      .map((val) => Number(val))
      .filter((n) => !Number.isNaN(n));

    const farmDetailsPayload = farms.map((f) => ({
      farmLocation: f.location,
      primaryCrop: f.crop,
      farmSize: parseFloat(f.landSize) || 0,
    }));

    const payload = {
      farmerName: name,
      profilePhotoUrl: profilePhotoUrl,
      location: village,
      cropIds,
      farmDetails: farmDetailsPayload,
    };

    const res = await api.post('/farmer/register', payload);
    if (!res.status.toString().startsWith('2')) {
      throw new Error(res.data?.message || 'Farmer registration failed');
    }
  };

  // ---- Register button handler ----
  const onRegister = async () => {
    if (!name || !village || !profileImage) {
      return Alert.alert(
        t('missing_some_fields') ?? 'Missing fields',
        t('fill_fields') ?? 'Please fill all required fields'
      );
    }

    if (!selectedCrops.length) {
      return Alert.alert(
        t('missing_some_fields') ?? 'Missing fields',
        t('select_crops') ?? 'Please select at least one interested crop'
      );
    }

    if (!farms.length) {
      return Alert.alert(
        t('missing_some_fields') ?? 'Missing fields',
        t('fill_farm_fields') ?? 'Please add at least one farm entry'
      );
    }

    setSubmitting(true);
    try {
      // Optional: ensure user is logged in
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (!token) {
        Alert.alert(
          t('error_title') ?? 'Error',
          'You must be logged in to register as a farmer.'
        );
        setSubmitting(false);
        return;
      }

      // 1) Upload profile image
      let uploadedUrl: string | null = null;
      if (profileImage) {
        uploadedUrl = await uploadProfileImage(profileImage);
      }

      // 2) Call /farmer/register
      await registerFarmerOnBackend(uploadedUrl);

      // 3) Mark role locally
      const phone =
        (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
      if (phone) await addRole(phone, 'farmer');
      await AsyncStorage.setItem(
        'LOGGED_IN_ROLE',
        t('farmer') ?? 'Farmer'
      );

      // 4) Optional: store local profile
      const profile = { name, village, profileImage: uploadedUrl, phone, farms };
      await AsyncStorage.setItem('farmerProfile', JSON.stringify(profile));

      Alert.alert(
        t('success_title') ?? 'Success',
        t('farmer_reg_success') ?? 'Farmer registered successfully',
        [
          {
            text: t('ok') ?? 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'FarmerDashboard' }],
              }),
          },
        ]
      );
    } catch (err: any) {
      console.error('Farmer register error:', err?.response ?? err);
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        t('error_generic') ??
        'Something went wrong';
      Alert.alert(t('error_title') ?? 'Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  //  NEW: while we are checking /farmer/status, show a simple loading screen
  if (checkingStatus) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.text }}>
            {t('loading') ?? 'Checking farmer status...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ---- UI ----
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t('farmer_reg')}
        </Text>

        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={[styles.imageLabel, { color: theme.text }]}>
              {t('no_image')}
            </Text>
          )}

          <View style={styles.row}>
            <TouchableOpacity style={styles.smallBtn} onPress={openCamera}>
              <Text style={[styles.btnText, { color: '#fff' }]}>
                📸 {t('take_photo')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} onPress={openGallery}>
              <Text style={[styles.btnText, { color: '#fff' }]}>
                🖼️ {t('gallery')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholder={t('farmer_name')}
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder={t('village')}
          placeholderTextColor={theme.text}
          style={[
            styles.input,
            { color: theme.text, borderColor: theme.text },
          ]}
          value={village}
          onChangeText={setVillage}
        />

        {/* Multi crop selector */}
        <DropDownPicker
          multiple
          open={open}
          value={selectedCrops}
          items={cropItems}
          setOpen={setOpen}
          setValue={setSelectedCrops}
          setItems={setCropItems}
          placeholder={t('intrested_crop')}
          listMode="MODAL"
          modalProps={{ animationType: 'slide' }}
          style={{ marginBottom: 10 }}
        />

        {/* Farm Details Box */}
        <View
          style={[
            styles.farmBox,
            { backgroundColor: theme.background, borderColor: '#ddd' },
          ]}
        >
          <View style={styles.farmHeaderRow}>
            <Text style={[styles.farmTitle, { color: theme.text }]}>
              {t('farm_details') ?? 'Farm Details'}
            </Text>
            <TouchableOpacity style={styles.addSmallBtn} onPress={onAddFarm}>
              <Text style={styles.addSmallBtnText}>
                {t('add') ?? 'Add'}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder={t('farm_location')}
            placeholderTextColor={theme.text}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.text },
            ]}
            value={farmLocation}
            onChangeText={setFarmLocation}
          />
          <TextInput
            placeholder={t('crop') ?? 'Crop'}
            placeholderTextColor={theme.text}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.text },
            ]}
            value={farmCrop}
            onChangeText={setFarmCrop}
          />
          <TextInput
            placeholder={t('land_size') ?? 'Land Size'}
            placeholderTextColor={theme.text}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.text },
            ]}
            value={farmLandSize}
            onChangeText={setFarmLandSize}
          />
        </View>

        {/* List of farms */}
        {farms.length > 0 && (
          <View style={styles.farmList}>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>
              {t('list_of_farms') ??
                'List of Farm Details displayed after clicking on add'}
            </Text>
            {farms.map((f) => (
              <View
                key={f.id}
                style={[
                  styles.farmItem,
                  { borderColor: '#ccc', backgroundColor: theme.background },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.farmItemText, { color: theme.text }]}
                  >
                    <Text style={{ fontWeight: '700' }}>
                      {t('farm_location') ?? 'Farm Location'}:{' '}
                    </Text>
                    {f.location}
                  </Text>
                  <Text
                    style={[styles.farmItemText, { color: theme.text }]}
                  >
                    <Text style={{ fontWeight: '700' }}>
                      {t('crop') ?? 'Crop'}:{' '}
                    </Text>
                    {f.crop}
                  </Text>
                  <Text
                    style={[styles.farmItemText, { color: theme.text }]}
                  >
                    <Text style={{ fontWeight: '700' }}>
                      {t('land_size') ?? 'Land Size'}:{' '}
                    </Text>
                    {f.landSize}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFarm(f.id)}
                >
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.btn, submitting && { opacity: 0.6 }]}
          onPress={onRegister}
          disabled={submitting}
        >
          <Text style={[styles.btnText, { color: '#fff' }]}>
            {submitting
              ? t('loading') ?? 'Submitting...'
              : t('register')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmerRegister;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
  imageLabel: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'center' },
  smallBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: {
    backgroundColor: '#2b6cb0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { fontWeight: '700' },

  farmBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 10 },
  farmHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  farmTitle: { fontSize: 16, fontWeight: '700' },
  addSmallBtn: {
    backgroundColor: '#1f7a1f',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addSmallBtnText: { color: '#fff', fontWeight: '700' },

  farmList: { marginTop: 12 },
  sectionLabel: { fontSize: 12, marginBottom: 8 },
  farmItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  farmItemText: { marginBottom: 6 },
  removeBtn: {
    backgroundColor: '#e53e3e',
    padding: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  removeBtnText: { color: '#fff', fontWeight: '700' },
});


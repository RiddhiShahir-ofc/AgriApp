// import React, { useState } from 'react';
// import {Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,PermissionsAndroid,Platform,View,} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
// import { addRole } from '.././utils/storage'; 

// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';

// export default function FarmerRegister() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const [name, setName] = useState('');
//   const [village, setVillage] = useState('');
//   const [crop, setCrop] = useState('');
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       { title: t('camera_permission'), message: t('app_needs_photo'), buttonPositive: (t('allow')) }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const requestReadPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       { title: t('storage_permission'), message: t('app_storage_permission'), buttonPositive: 'Allow' }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const openCamera = async () => {
//     const ok = await requestCameraPermission();
//     if (!ok) return Alert.alert(t('permission_req'), t('camera'));

//     const options: CameraOptions = { mediaType: 'photo', saveToPhotos: true, quality: 0.8 };
//     launchCamera(options, (resp) => {
//       if (resp.didCancel) return;
//       if (resp.errorMessage) return Alert.alert(t('error_title'), resp.errorMessage);
//       if (resp.assets && resp.assets.length > 0) setProfileImage(resp.assets[0].uri || null);
//     });
//   };

//   const openGallery = async () => {
//     const ok = await requestReadPermission();
//     if (!ok) return Alert.alert(t('permission_req'), t('storage'));

//     const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
//     launchImageLibrary(options, (resp) => {
//       if (resp.didCancel) return;
//       if (resp.errorMessage) return Alert.alert(t('error_title'), resp.errorMessage);
//       if (resp.assets && resp.assets.length > 0) setProfileImage(resp.assets[0].uri || null);
//     });
//   };

//   const onRegister = async () => {
//     if (!name || !village || !crop || !profileImage) {
//       return Alert.alert(t('missing_some_fields'), t('fill_fields'));
//     }

//     // Save role with phone and record role registration
//     const phone = await AsyncStorage.getItem('LOGGED_IN_USER') || 'unknown';
//     if (phone) await addRole(phone, "farmer");  // or buyer/seller etc.
//     await AsyncStorage.setItem('LOGGED_IN_ROLE', t('farmer'));

//     await AsyncStorage.setItem('farmerProfile', JSON.stringify({ name, village, crop, profileImage, phone }));

//     Alert.alert(t('success_title'), t('farmer_reg_success'), [
//       { text: t('ok'), onPress: () => navigation.reset({ index: 0, routes: [{ name: 'FarmerDashboard' }] }) },
//     ]);
//   };

//   return (
//    <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
//       <Text style={[styles.title,{color:theme.text}]}>{t('farmer_reg')}</Text>

//       <View style={styles.imageContainer}>
//         {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImage} /> : <Text style={[styles.imageLabel,{color:theme.text}]}>{t('no_image')}</Text>}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.smallBtn} onPress={openCamera}><Text style={[styles.btnText,{color:theme.text}]}>📸 {t('take_photo')}</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.smallBtn} onPress={openGallery}><Text style={[styles.btnText,{color:theme.text}]}>🖼️ {t('gallery')}</Text></TouchableOpacity>
//         </View>
//       </View>

//       <TextInput placeholder={t('farmer_name')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} value={name} onChangeText={setName} />
//       <TextInput placeholder={t('village')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} value={village} onChangeText={setVillage} />
//       <TextInput placeholder={t('intrested_crop')} placeholderTextColor={theme.text} style={[styles.input,{color:theme.text},{borderColor:theme.text}]} value={crop} onChangeText={setCrop} />

//       <TouchableOpacity style={styles.btn} onPress={onRegister}><Text style={[styles.btnText,{color:theme.text}]}>{t('register')}</Text></TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   imageContainer: { alignItems: 'center', marginBottom: 20 },
//   profileImage: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
//   imageLabel: { marginBottom: 10 },
//   row: { flexDirection: 'row', gap: 10 },
//   smallBtn: { backgroundColor: '#4A90E2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
//   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
//   btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
//   btnText: { fontWeight: '700' },
// });

import React, { useState } from 'react';
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
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { addRole } from '.././utils/storage';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type FarmDetail = {
  id: string;
  location: string;
  crop: string;
  landSize: string;
};

export default function FarmerRegister() {
  const navigation = useNavigation<PropsNav>();

  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [crop, setCrop] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // NEW: farm detail inputs and list
  const [farmLocation, setFarmLocation] = useState('');
  const [farmCrop, setFarmCrop] = useState('');
  const [farmLandSize, setFarmLandSize] = useState('');
  const [farms, setFarms] = useState<FarmDetail[]>([]);

  const { theme } = useTheme();
  const { t } = useLanguage();

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      { title: t('camera_permission'), message: t('app_needs_photo'), buttonPositive: t('allow') ?? 'Allow' }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestReadPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      { title: t('storage_permission'), message: t('app_storage_permission'), buttonPositive: 'Allow' }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const ok = await requestCameraPermission();
    if (!ok) return Alert.alert(t('permission_req'), t('camera'));

    const options: CameraOptions = { mediaType: 'photo', saveToPhotos: true, quality: 0.8 };
    launchCamera(options, (resp) => {
      if (resp.didCancel) return;
      if (resp.errorMessage) return Alert.alert(t('error_title'), resp.errorMessage);
      if (resp.assets && resp.assets.length > 0) setProfileImage(resp.assets[0].uri || null);
    });
  };

  const openGallery = async () => {
    const ok = await requestReadPermission();
    if (!ok) return Alert.alert(t('permission_req'), t('storage'));

    const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(options, (resp) => {
      if (resp.didCancel) return;
      if (resp.errorMessage) return Alert.alert(t('error_title'), resp.errorMessage);
      if (resp.assets && resp.assets.length > 0) setProfileImage(resp.assets[0].uri || null);
    });
  };

  // Add a farm to the farms list
  const onAddFarm = () => {
    if (!farmLocation && !farmCrop && !farmLandSize) {
      return Alert.alert(t('missing_some_fields') ?? 'Missing', t('fill_farm_fields') ?? 'Please fill farm details');
    }

    const newFarm: FarmDetail = {
      id: `${Date.now()}`,
      location: farmLocation || '-',
      crop: farmCrop || '-',
      landSize: farmLandSize || '-',
    };

    setFarms((prev) => [newFarm, ...prev]);
    // clear inputs
    setFarmLocation('');
    setFarmCrop('');
    setFarmLandSize('');
  };

  // remove farm
  const removeFarm = (id: string) => {
    setFarms((prev) => prev.filter((f) => f.id !== id));
  };

  const onRegister = async () => {
    if (!name || !village || !crop || !profileImage) {
      return Alert.alert(t('missing_some_fields') ?? 'Missing fields', t('fill_fields') ?? 'Please fill all required fields');
    }

    try {
      // Save role with phone and record role registration
      const phone = (await AsyncStorage.getItem('LOGGED_IN_USER')) || 'unknown';
      if (phone) await addRole(phone, "farmer"); // or buyer/seller etc.
      await AsyncStorage.setItem('LOGGED_IN_ROLE', t('farmer') ?? 'Farmer');

      const profile = { name, village, crop, profileImage, phone, farms };
      await AsyncStorage.setItem('farmerProfile', JSON.stringify(profile));

      Alert.alert(t('success_title') ?? 'Success', t('farmer_reg_success') ?? 'Registered successfully', [
        { text: t('ok') ?? 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'FarmerDashboard' }] }) },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert(t('error_title') ?? 'Error', t('error_generic') ?? 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, { color: theme.text }]}>{t('farmer_reg')}</Text>

        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={[styles.imageLabel, { color: theme.text }]}>{t('no_image')}</Text>
          )}

          <View style={styles.row}>
            <TouchableOpacity style={styles.smallBtn} onPress={openCamera}>
              <Text style={[styles.btnText, { color: '#fff' }]}>📸 {t('take_photo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} onPress={openGallery}>
              <Text style={[styles.btnText, { color: '#fff' }]}>🖼️ {t('gallery')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholder={t('farmer_name')}
          placeholderTextColor={theme.text}
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder={t('village')}
          placeholderTextColor={theme.text}
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          value={village}
          onChangeText={setVillage}
        />
        <TextInput
          placeholder={t('intrested_crop')}
          placeholderTextColor={theme.text}
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          value={crop}
          onChangeText={setCrop}
        />

        {/* NEW: Farm Details Box */}
        <View style={[styles.farmBox, { backgroundColor: theme.background, borderColor: '#ddd' }]}>
          <View style={styles.farmHeaderRow}>
            <Text style={[styles.farmTitle, { color: theme.text }]}>{t('farm_details') ?? 'Farm Details'}</Text>
            <TouchableOpacity style={styles.addSmallBtn} onPress={onAddFarm}>
              <Text style={styles.addSmallBtnText}>{t('add') ?? 'Add'}</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder={t('farm_location')}
            placeholderTextColor={theme.text}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            value={farmLocation}
            onChangeText={setFarmLocation}
          />
          <TextInput
            placeholder={t('crop') ?? 'Crop'}
            placeholderTextColor={theme.text}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            value={farmCrop}
            onChangeText={setFarmCrop}
          />
          <TextInput
            placeholder={t('land_size') ?? 'Land Size'}
            placeholderTextColor={theme.text}
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            value={farmLandSize}
            onChangeText={setFarmLandSize}
          />
        </View>

        {/* NEW: List of farms (displayed after adding) */}
        {farms.length > 0 && (
          <View style={styles.farmList}>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>{t('list_of_farms') ?? 'List of Farm Details displayed after clicking on add'}</Text>
            {farms.map((f) => (
              <View key={f.id} style={[styles.farmItem, { borderColor: '#ccc', backgroundColor: theme.background }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.farmItemText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('farm_location') ?? 'Farm Location'}: </Text>{f.location}</Text>
                  <Text style={[styles.farmItemText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('crop') ?? 'Crop'}: </Text>{f.crop}</Text>
                  <Text style={[styles.farmItemText, { color: theme.text }]}><Text style={{fontWeight:'700'}}>{t('land_size') ?? 'Land Size'}: </Text>{f.landSize}</Text>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeFarm(f.id)}>
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.btn} onPress={onRegister}>
          <Text style={[styles.btnText, { color: '#fff' }]}>{t('register')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
  imageLabel: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'center', gap: undefined },
  smallBtn: { backgroundColor: '#4A90E2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginHorizontal: 6 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { fontWeight: '700' },

  // farm box
  farmBox: { borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 10 },
  farmHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  farmTitle: { fontSize: 16, fontWeight: '700' },
  addSmallBtn: { backgroundColor: '#1f7a1f', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  addSmallBtnText: { color: '#fff', fontWeight: '700' },

  // list
  farmList: { marginTop: 12 },
  sectionLabel: { fontSize: 12, marginBottom: 8 },
  farmItem: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8, alignItems: 'center' },
  farmItemText: { marginBottom: 6 },
  removeBtn: { backgroundColor: '#e53e3e', padding: 6, borderRadius: 6, marginLeft: 10 },
  removeBtnText: { color: '#fff', fontWeight: '700' },
});

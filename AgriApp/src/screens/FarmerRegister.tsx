import React, { useState } from 'react';
import {Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,PermissionsAndroid,Platform,View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { addRole } from '.././utils/storage'; 

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function FarmerRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [crop, setCrop] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { theme } = useTheme();
  const { t } = useLanguage();

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      { title: 'Camera permission', message: 'App needs camera to take photos.', buttonPositive: 'Allow' }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestReadPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      { title: 'Storage permission', message: 'App needs storage permission to select photos.', buttonPositive: 'Allow' }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const ok = await requestCameraPermission();
    if (!ok) return Alert.alert('Permission required', 'Camera permission denied.');

    const options: CameraOptions = { mediaType: 'photo', saveToPhotos: true, quality: 0.8 };
    launchCamera(options, (resp) => {
      if (resp.didCancel) return;
      if (resp.errorMessage) return Alert.alert('Error', resp.errorMessage);
      if (resp.assets && resp.assets.length > 0) setProfileImage(resp.assets[0].uri || null);
    });
  };

  const openGallery = async () => {
    const ok = await requestReadPermission();
    if (!ok) return Alert.alert('Permission required', 'Storage permission denied.');

    const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(options, (resp) => {
      if (resp.didCancel) return;
      if (resp.errorMessage) return Alert.alert('Error', resp.errorMessage);
      if (resp.assets && resp.assets.length > 0) setProfileImage(resp.assets[0].uri || null);
    });
  };

  const onRegister = async () => {
    if (!name || !village || !crop || !profileImage) {
      return Alert.alert('Missing Fields', 'Please fill all fields & upload a photo.');
    }

    // Save role with phone and record role registration
    const phone = await AsyncStorage.getItem('LOGGED_IN_USER') || 'unknown';
    if (phone) await addRole(phone, "farmer");  // or buyer/seller etc.
    await AsyncStorage.setItem('LOGGED_IN_ROLE', 'farmer');

    await AsyncStorage.setItem('farmerProfile', JSON.stringify({ name, village, crop, profileImage, phone }));

    Alert.alert('Success', 'Farmer registered successfully!', [
      { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'FarmerDashboard' }] }) },
    ]);
  };

  return (
   <SafeAreaView style={[styles.container, { backgroundColor:theme.background}]}>
      <Text style={styles.title}>{t('farmer_reg')}</Text>

      <View style={styles.imageContainer}>
        {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImage} /> : <Text style={styles.imageLabel}>{t('no_image')}</Text>}
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallBtn} onPress={openCamera}><Text style={styles.btnText}>📸 {t('take_photo')}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={openGallery}><Text style={styles.btnText}>🖼️ {t('gallery')}</Text></TouchableOpacity>
        </View>
      </View>

      <TextInput placeholder={t('farmer_name')} style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder={t('village')} style={styles.input} value={village} onChangeText={setVillage} />
      <TextInput placeholder={t('intrested_crop')} style={styles.input} value={crop} onChangeText={setCrop} />

      <TouchableOpacity style={styles.btn} onPress={onRegister}><Text style={styles.btnText}>{t('register')}</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
  imageLabel: { color: '#777', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10 },
  smallBtn: { backgroundColor: '#4A90E2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '700' },
});

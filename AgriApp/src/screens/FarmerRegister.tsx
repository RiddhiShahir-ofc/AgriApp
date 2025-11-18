
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

export default function FarmerRegister() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [crop, setCrop] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const openCamera = async () => {
    const camPerm = await requestCameraPermission();
    if (!camPerm) return Alert.alert('Permission required', 'Camera permission denied.');

    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri!);
      }
    });
  };

  const openGallery = async () => {
    const storagePerm = await requestStoragePermission();
    if (!storagePerm)
      return Alert.alert('Permission required', 'Storage permission denied.');

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri!);
      }
    });
  };

  const handleSubmit = async () => {
    if (!name || !village || !crop || !profileImage) {
      return Alert.alert('Missing Fields', 'Please fill all fields & upload a photo.');
    }

    await AsyncStorage.setItem(
      'farmerProfile',
      JSON.stringify({ name, village, crop, profileImage })
    );

    Alert.alert('Success', 'Farmer registered successfully!', [
      {
        text: 'OK',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'FarmerDashboard' }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Farmer Registration</Text>

      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageLabel}>No Image Selected</Text>
        )}
        

        <View style={styles.row}>
          <TouchableOpacity style={styles.smallBtn} onPress={openCamera}>
            <Text style={styles.btnText}>📸 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBtn} onPress={openGallery}>
            <Text style={styles.btnText}>🖼️ Choose From Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        placeholder="Farmer Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Village Location"
        style={styles.input}
        value={village}
        onChangeText={setVillage}
      />

      <TextInput
        placeholder="Interested Crop"
        style={styles.input}
        value={crop}
        onChangeText={setCrop}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
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
  smallBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#2b6cb0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});

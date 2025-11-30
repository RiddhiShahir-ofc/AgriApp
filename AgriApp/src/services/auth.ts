import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postJSON } from './mockapi';

export async function sendOtp(mobileNumber: string) {
  // backend expects: { mobileNumber: "..." } (your DTO property is MobileNumber)
  const body = { mobileNumber };
  const res = await api.post('/auth/send-otp', body);
  // The backend returns only message (not the OTP). For dev/testing you might return code when OTP service allows it.
  return res.data; // { message: "OTP sent successfully." }
}

export async function verifyOtp(mobileNumber: string, otp: string, deviceInfo?: string) {
  const body = { mobileNumber, otp, deviceInfo };
  const res = await api.post('/auth/verify-otp', body);

  // your backend returns: userId, mobileNumber, accessToken, refreshToken, expiresIn, isVerified
  const data = res.data;
  // persist tokens & basic user info
  await AsyncStorage.setItem('ACCESS_TOKEN', data.accessToken);
  await AsyncStorage.setItem('REFRESH_TOKEN', data.refreshToken);
  await AsyncStorage.setItem('LOGGED_IN_USER', data.mobileNumber);
  await AsyncStorage.setItem('USER_ID', data.userId);

  // set default header for axios instance immediately (so subsequent api calls use it)
  api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  return data;
}

export async function logout(refreshToken?: string) {
  const token = refreshToken || (await AsyncStorage.getItem('REFRESH_TOKEN'));
  if (!token) return;
  try {
    await api.post('/auth/logout', { refreshToken: token });
  } finally {
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    await AsyncStorage.removeItem('REFRESH_TOKEN');
    await AsyncStorage.removeItem('LOGGED_IN_USER');
    await AsyncStorage.removeItem('USER_ID');
    await AsyncStorage.removeItem('LOGGED_IN_ROLE');
    delete api.defaults.headers.common['Authorization'];
  }
}

export async function registerRole(role: string, payload: any) {
  // Hit mock API (or real API)
  const json = await postJSON('/api/register', { role, ...payload });

  // MOCK: simulate backend delay
  await new Promise<void>(resolve => setTimeout(resolve, 700));

  let phone = payload.phone || '9999999999';

  // If backend returns real data, overwrite mock values
  if (json?.phone) phone = json.phone;

  // Save login info
  await AsyncStorage.setItem('LOGGED_IN_USER', phone);
  await AsyncStorage.setItem('LOGGED_IN_ROLE', role);

  return {
    success: true,
    phone,
    role
  };
}

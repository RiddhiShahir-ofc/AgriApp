import AsyncStorage from '@react-native-async-storage/async-storage';
import { postJSON } from './mockapi';

export const sendOtp = async (phone: string) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  await AsyncStorage.setItem(`OTP_${phone}`, code);
  return code; // return code for testing/demo
};

export const verifyOtp = async (phone: string, code: string) => {
  const real = await AsyncStorage.getItem(`OTP_${phone}`);
  return real === code;
};

// export async function verifyOtp(phone: string, otp: string) {
//   console.log('Simulating OTP verification for:', phone, otp);
//   //await new Promise(resolve => setTimeout(resolve, 1500)); // simulate delay
//   return otp === '1234'; // only 1234 works
// }

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

export async function logout() {
  await AsyncStorage.removeItem('LOGGED_IN_USER');
  await AsyncStorage.removeItem('LOGGED_IN_ROLE');
}



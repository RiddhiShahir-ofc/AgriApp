import AsyncStorage from '@react-native-async-storage/async-storage';

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

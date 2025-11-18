import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './src/screens/Landing';
import Register from './src/screens/Register';
import OTP from './src/screens/Otp';
import Dashboard from './src/screens/Dashboard';
import FarmerRegister from './src/screens/FarmerRegister';
import BuyerRegister from './src/screens/BuyerRegister';
import SellerRegister from './src/screens/SellerRegister';
import MandiOfficialRegister from './src/screens/MandiOfficialRegister';
import AnchorRegister from './src/screens/AnchorRegister';
import FarmerDashboard from './src/screens/FarmerDashboard';
import BuyerDashboard from './src/screens/BuyerDashboard';
import SellerDashboard from './src/screens/SellerDashboard';
import MandiOfficialDashboard from './src/screens/MandiOfficialDashboard';
import AnchorDashboard from './src/screens/AnchorDashboard';

export type RootStackParamList = {
  Landing: undefined;
  Register: { fromGraph?: boolean } | undefined;
  Otp: { phone: string } | undefined;
  Dashboard: undefined;
  RoleRegister: { role: string } | undefined;
  FarmerRegister: undefined;
  BuyerRegister: undefined;
  SellerRegister: undefined;
  MandiOfficialRegister: undefined;
  AnchorRegister: undefined;
  FarmerDashboard: undefined;
  BuyerDashboard: undefined;
  SellerDashboard: undefined;
  MandiOfficialDashboard: undefined;
  AnchorDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="Otp" component={OTP} options={{ title: 'OTP Verification' }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="FarmerRegister" component={FarmerRegister} options={{ title: 'Back' }} />
        <Stack.Screen name="BuyerRegister" component={BuyerRegister} options={{ title: '' }} />
        <Stack.Screen name="SellerRegister" component={SellerRegister} options={{ title: '' }} />
        <Stack.Screen name="MandiOfficialRegister" component={MandiOfficialRegister} options={{ title: '' }} />
        <Stack.Screen name="AnchorRegister" component={AnchorRegister} options={{title:'Back' }} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="SellerDashboard" component={SellerDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="MandiOfficialDashboard" component={MandiOfficialDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AnchorDashboard" component={AnchorDashboard} options={{ headerShown:false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
} 

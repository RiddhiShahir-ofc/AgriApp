import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';

import Landing from './src/screens/Landing';
import Register from './src/screens/Register/Login';
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

import ShortTermForecast from './src/screens/ShortTermForcast';
import PreRegisterLot from './src/screens/PreRegisterLot';
import BuyerPreBidding from './src/screens/BuyerPreBidding';
import MandiDashboard from './src/screens/MandiDashboard';

import MandiManagerDashboard from './src/screens/MandiManagerDashboard';
import MandiApproverDashboard from './src/screens/MandiApproverDashboard';
import MandiOfficerDashboard from './src/screens/MandiOfficerDashboard';
import RegisterLot from './src/screens/RegisterLot';

import ArrivedLotDetails from './src/screens/ArrivedLotDetails';
import ArrivedLotsList from './src/screens/ArrivedLotsList';

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
  MandiDashboard: undefined;
  MandiOfficerDashboard: undefined;
  MandiManagerDashboard: undefined;
  MandiApproverDashboard: undefined;

  ShortTermForecast: undefined;
  PreRegisterLot: undefined;
  BuyerPreBidding: undefined;
  RegisterLot: undefined;

  ArrivedLotsList: { mandiId: number };
  ArrivedLotDetails: { arrivedLotId: Number };

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<
    | 'Landing'
    | 'FarmerDashboard'
    | 'BuyerDashboard'
    | 'SellerDashboard'
    | 'MandiOfficialDashboard'
    | 'AnchorDashboard'
    | 'Dashboard'
    |'MandiDashboard'
  >('Landing');

  useEffect(() => {
    // On app start, check if user+role exist — auto-redirect to that role dashboard
    (async () => {
      try {
        const phone = await AsyncStorage.getItem('LOGGED_IN_USER');
        const role = await AsyncStorage.getItem('LOGGED_IN_ROLE');
        if (phone && role) {
          switch (role) {
            case 'farmer':
              setInitialRoute('FarmerDashboard');
              break;
            case 'buyer':
              setInitialRoute('BuyerDashboard');
              break;
            case 'seller':
              setInitialRoute('SellerDashboard');
              break;
            case 'mandi':
              setInitialRoute('MandiOfficialDashboard');
              break;
            case 'anchor':
              setInitialRoute('AnchorDashboard');
              break;
            default:
              setInitialRoute('Dashboard');
              break;
          }
        } else {
          setInitialRoute('Landing');
        }
      } catch (e) {
        setInitialRoute('Landing');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{}} />
            {/* Use a static title here so we don't call useLanguage before the provider is mounted */}
            <Stack.Screen name="Otp" component={OTP} options={{ title: 'Verify OTP' }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />

            <Stack.Screen name="FarmerRegister" component={FarmerRegister} options={{ title: 'Back' }} />
            <Stack.Screen name="BuyerRegister" component={BuyerRegister} options={{ title: 'Back' }} />
            <Stack.Screen name="SellerRegister" component={SellerRegister} options={{ title: 'Back' }} />
            <Stack.Screen name="MandiOfficialRegister" component={MandiOfficialRegister} options={{ title: 'Back' }} />
            <Stack.Screen name="AnchorRegister" component={AnchorRegister} options={{ title: 'Back' }} />

            <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="SellerDashboard" component={SellerDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="MandiOfficialDashboard" component={MandiOfficialDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="AnchorDashboard" component={AnchorDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="MandiDashboard" component={MandiDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="MandiOfficerDashboard" component={MandiOfficerDashboard} options={{ headerShown: false }}/>
            <Stack.Screen name="MandiManagerDashboard" component={MandiManagerDashboard} options={{ headerShown: false }}/>
            <Stack.Screen name="MandiApproverDashboard" component={MandiApproverDashboard} options={{ headerShown: false }}/>

            <Stack.Screen name="ShortTermForecast" component={ShortTermForecast} />
            <Stack.Screen name="PreRegisterLot" component={PreRegisterLot} />
            <Stack.Screen name="BuyerPreBidding" component={BuyerPreBidding} />
            <Stack.Screen name="RegisterLot" component={RegisterLot} />

            <Stack.Screen name="ArrivedLotDetails" component={ArrivedLotDetails} />
            <Stack.Screen name="ArrivedLotsList" component={ArrivedLotsList} />

          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
}

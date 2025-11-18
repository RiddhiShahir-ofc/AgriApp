import React from 'react';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import RoleProfile from './roleTabs/RoleProfile';
import RoleReports from './roleTabs/RoleReports';
import RoleNotifications from './roleTabs/RoleNotifications';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'> & { role: string };

type RoleTabParamList = {
  Profile: undefined;
  Reports: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<RoleTabParamList>();

export default function RoleDashboard({ role }: { role: string }) {
  // pass `role` to each tab screen via initialParams or context
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile">
        {(props: BottomTabScreenProps<RoleTabParamList, 'Profile'>) => <RoleProfile {...props} role={role} />}
      </Tab.Screen>
      <Tab.Screen name="Reports">
        {(props: BottomTabScreenProps<RoleTabParamList, 'Reports'>) => <RoleReports {...props} role={role} />}
      </Tab.Screen>
      <Tab.Screen name="Notifications">
        {(props: BottomTabScreenProps<RoleTabParamList, 'Notifications'>) => <RoleNotifications {...props} role={role} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

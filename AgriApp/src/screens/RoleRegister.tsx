// import React from 'react';
// import {Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'RoleRegister'>;

// export default function RoleRegister({ route }: Props) {
//   const { role } = route.params || {};

//   const handleSubmit = () => {
//     Alert.alert('Success', `Registered successfully as ${role || 'User'}`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Register as {role ? role.toUpperCase() : 'User'}</Text>

//       <TextInput placeholder="Full Name" style={styles.input} />
//       <TextInput placeholder="Mobile Number" keyboardType="phone-pad" style={styles.input} />
//       <TextInput placeholder="Email (optional)" keyboardType="email-address" style={styles.input} />

//       <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
//         <Text style={styles.btnText}>Submit</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
//   input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10 },
//   btn: { backgroundColor: '#2b6cb0', padding: 12, borderRadius: 8, alignItems: 'center' },
//   btnText: { color: '#fff', fontWeight: '700' },
// });

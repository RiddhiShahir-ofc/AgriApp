import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useLanguage } from '../context/LanguageContext';

interface RoleCardProps {
  name: string;
  onPress: () => void;
}

export default function RoleCard({ name, onPress }: RoleCardProps) {

  const { t } = useLanguage();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: '#f7fafc',
  },
  cardText: { fontWeight: '600', fontSize: 16 },
});

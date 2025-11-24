import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface FilterProps {
  filters: { mandi: string; crop: string };
  setFilters: (filters: { mandi: string; crop: string }) => void;
  onSearch: () => void;
}

export default function FilterBar({ filters, setFilters, onSearch }: FilterProps) {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>Mandi:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter mandi name"
        value={filters.mandi}
        onChangeText={(t) => setFilters({ ...filters, mandi: t })}
      />

      <Text style={styles.label}>Crop:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter crop name" 
        value={filters.crop}
        onChangeText={(t) => setFilters({ ...filters, crop: t })}
      />

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: { fontWeight: '600', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  searchBtn: {
    marginTop: 10,
    backgroundColor: '#2b6cb0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontWeight: '700',
  },
});


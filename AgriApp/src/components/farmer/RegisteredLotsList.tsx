import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  sellingamount: string;
  mandi: string;
  expectedArrival: string;
};

type Props = {
  theme: any;
  t: (key: string) => string;

  lots: Lot[];

  onEdit: (lot: Lot) => void;
  onDelete: (lotId: string) => void;
};

export default function RegisteredLotsList({
  theme,
  t,
  lots,
  onEdit,
  onDelete,
}: Props) {
  const renderItem = ({ item }: { item: Lot }) => (
    <View
      style={[
        styles.lotItem,
        {
          borderColor: theme.text ?? '#ccc',
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={styles.bold}>{t('crop') ?? 'Crop'}: </Text>
          {item.crop}
        </Text>

        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={styles.bold}>{t('grade_label') ?? 'Grade'}: </Text>
          {item.grade}
        </Text>

        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={styles.bold}>
            {t('quantity_label') ?? 'Quantity'}:{' '}
          </Text>
          {item.quantity}
        </Text>

        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={styles.bold}>
            {t('expected_amount') ?? 'Expected Amount'}:{' '}
          </Text>
          {item.sellingamount}
        </Text>

        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={styles.bold}>
            {t('mandi_label') ?? 'Mandi'}:{' '}
          </Text>
          {item.mandi}
        </Text>

        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={styles.bold}>
            {t('arrival_label') ?? 'Arrival'}:{' '}
          </Text>
          {item.expectedArrival}
        </Text>
      </View>

      <View style={styles.actionCol}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.editBtnText}>
            {t('edit') ?? 'Edit'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.deleteBtnText}>
            {t('delete') ?? 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!lots.length) {
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>
          {t('no_lots') ?? 'No lots registered yet'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={lots}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
      removeClippedSubviews={false}
    />
  );
}

const styles = StyleSheet.create({
  lotItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  lotText: {
    marginBottom: 4,
    fontSize: 14,
  },
  bold: {
    fontWeight: '700',
  },
  actionCol: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  editBtn: {
    backgroundColor: '#4B9CFD',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: '#e53e3e',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
});

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type TabKey = 'daily' | 'short' | 'preregister' | 'received';

type Props = {
  selectedTab: TabKey;
  onSelect: (tab: TabKey) => void;
  theme: any;
  t: (key: string) => string;
};

export default function FarmerTabs({
  selectedTab,
  onSelect,
  theme,
  t,
}: Props) {
  return (
    <View style={styles.tabsRow}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'daily' && {
            backgroundColor: theme.primary ?? '#3182ce',
          },
        ]}
        onPress={() => onSelect('daily')}
      >
        <Text
          style={[
            styles.tabText,
            {
              color:
                selectedTab === 'daily' ? '#fff' : theme.text,
            },
          ]}
        >
          {t('daily_market_price')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'short' && {
            backgroundColor: theme.primary ?? '#3182ce',
          },
        ]}
        onPress={() => onSelect('short')}
      >
        <Text
          style={[
            styles.tabText,
            {
              color:
                selectedTab === 'short' ? '#fff' : theme.text,
            },
          ]}
        >
          {t('short_term_forecast')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'preregister' && {
            backgroundColor: theme.primary ?? '#3182ce',
          },
        ]}
        onPress={() => onSelect('preregister')}
      >
        <Text
          style={[
            styles.tabText,
            {
              color:
                selectedTab === 'preregister'
                  ? '#fff'
                  : theme.text,
            },
          ]}
        >
          {t('pre_register_lot')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'received' && {
            backgroundColor: theme.primary ?? '#3182ce',
          },
        ]}
        onPress={() => onSelect('received')}
      >
        <Text
          style={[
            styles.tabText,
            {
              color:
                selectedTab === 'received'
                  ? '#fff'
                  : theme.text,
            },
          ]}
        >
          {t('received_bids') ?? 'Received Bids'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 13,
  },
});

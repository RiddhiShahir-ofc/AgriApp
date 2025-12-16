import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

type Bid = {
  bidder: string;
  bidValue: string;
  createdAt: number;
  status?: 'pending' | 'accepted' | 'rejected';
};

type LotWithBids = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  sellingamount: string;
  mandi: string;
  expectedArrival: string;
  bids: Bid[];
};

type Props = {
  theme: any;
  t: (key: string) => string;


  
  loading: boolean;
  lotsWithBids: LotWithBids[];

  onAccept: (lotId: string, createdAt: number) => void;
  onReject: (lotId: string, createdAt: number) => void;
};

export default function ReceivedBidsTab({
  theme,
  t,
  loading,
  lotsWithBids,
  onAccept,
  onReject,
}: Props) {
  if (loading) {
    return (
      <Text style={{ color: theme.text }}>
        {t('loading') ?? 'Loading...'}
      </Text>
    );
  }

  if (!lotsWithBids.length) {
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>
          {t('no_bids_yet') ?? 'No bids received yet'}
        </Text>
      </View>
    );
  }

  return (
    <>
      {lotsWithBids.map(lot => (
        <View
          key={lot.id}
          style={[
            styles.lotBox,
            {
              backgroundColor: theme.background,
              borderColor: theme.text,
            },
          ]}
        >
          <Text style={[styles.lotTitle, { color: theme.text }]}>
            {lot.crop} ({t('grade_label')}: {lot.grade})
          </Text>

          <Text style={[styles.lotText, { color: theme.text }]}>
            {t('quantity_label')}: {lot.quantity}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            {t('expected_amount')}: {lot.sellingamount}
          </Text>
          <Text style={[styles.lotText, { color: theme.text }]}>
            {t('mandi')}: {lot.mandi}
          </Text>

          <Text style={[styles.bidCount, { color: theme.text }]}>
            {t('received_bids') ?? 'Bids'} ({lot.bids.length})
          </Text>

          {lot.bids.map(bid => (
            <View
              key={bid.createdAt}
              style={[
                styles.bidBox,
                { borderColor: theme.text ?? '#ccc' },
              ]}
            >
              <Text style={{ color: theme.text }}>
                {t('bidder') ?? 'Bidder'}: {bid.bidder}
              </Text>
              <Text style={{ color: theme.text }}>
                {t('bid_value') ?? 'Bid'}: ₹{bid.bidValue}/quintal
              </Text>
              <Text style={{ color: theme.text }}>
                {new Date(bid.createdAt).toLocaleString()}
              </Text>

              {(!bid.status || bid.status === 'pending') && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#16a34a' }]}
                    onPress={() => onAccept(lot.id, bid.createdAt)}
                  >
                    <Text style={styles.actionText}>
                      {t('accept') ?? 'Accept'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#b91c1c' }]}
                    onPress={() => onReject(lot.id, bid.createdAt)}
                  >
                    <Text style={styles.actionText}>
                      {t('reject') ?? 'Reject'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {bid.status && (
                <Text
                  style={{
                    marginTop: 6,
                    fontWeight: '700',
                    color:
                      bid.status === 'accepted'
                        ? '#15803d'
                        : bid.status === 'rejected'
                        ? '#b91c1c'
                        : '#92400e',
                  }}
                >
                  {bid.status.toUpperCase()}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  lotBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  lotTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },
  lotText: {
    marginBottom: 4,
  },
  bidCount: {
    marginTop: 8,
    fontWeight: '700',
  },
  bidBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
});

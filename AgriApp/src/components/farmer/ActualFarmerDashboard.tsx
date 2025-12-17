import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../../../App';

import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

import DashboardMenu from '../DashboardMenu';

/* 👇 NEW COMPONENTS */
import DailyMarketTab from './DailyMarketTab';
import ShortTermForecastTab from './ShortTermForecastTab';
import PreRegisterLotForm from './PreRegisterLotForm';
import RegisteredLotsList from './RegisteredLotsList';
import ReceivedBidsTab from './ReceivedBidsTab';
import { TranslateFn } from '../../types/i18n';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type Lot = {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  sellingamount: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
};

type Bid = {
  lotId: string;
  lotOwner: string;
  bidder: string;
  bidValue: string;
  createdAt: number;
  status?: 'pending' | 'accepted' | 'rejected';
};

type LotWithBids = Lot & {
  bids: Bid[];
};

type UICrop = { id: number; name: string; grade?: string | null };
type UIMandi = { id: number; name: string; location: string };

type Props = {
  theme: any;
  t: TranslateFn;
};

export default function FarmerDashboard() {
  const navigation = useNavigation<PropsNav>();
  const { theme } = useTheme();
  const { t } = useLanguage();
  // widen t signature for components expecting TranslateFn (key: string)
  const translate: TranslateFn = (k: string) => t(k as any);

  const goBack = () => navigation.navigate('Dashboard');

  const [selectedTab, setSelectedTab] =
    useState<'daily' | 'short' | 'preregister' | 'received'>('daily');

  /* ---------------- DAILY ---------------- */
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ mandi: '', crop: '' });

  /* ---------------- SHORT ---------------- */
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>('7days');
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);

  /* ---------------- PRE REGISTER ---------------- */
  const [prCrop, setPrCrop] = useState('');
  const [prGrade, setPrGrade] = useState('');
  const [prQuantity, setPrQuantity] = useState('');
  const [prSellingAmount, setPrSellingAmount] = useState('');
  const [prMandi, setPrMandi] = useState('');
  const [prExpectedArrival, setPrExpectedArrival] = useState('');
  const [editingLotId, setEditingLotId] = useState<string | null>(null);

  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  /* ---------------- DATE PICKER ---------------- */
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  /* ---------------- RECEIVED ---------------- */
  const [lotsWithBids, setLotsWithBids] = useState<LotWithBids[]>([]);
  const [loadingBids, setLoadingBids] = useState(false);

  /* ---------------- META ---------------- */
  const [crops, setCrops] = useState<UICrop[]>([]);
  const [mandis, setMandis] = useState<UIMandi[]>([]);

  const cropOptions = useMemo(
    () => Array.from(new Set(crops.map(c => c.name))),
    [crops],
  );

  const mandiOptions = useMemo(
    () => Array.from(new Set(mandis.map(m => m.name))),
    [mandis],
  );

  const currentGrades = useMemo(() => {
    if (!prCrop) return [];
    const grades = crops
      .filter(c => c.name === prCrop && c.grade)
      .map(c => String(c.grade));
    const unique = Array.from(new Set(grades));
    if (!unique.length) return ['Other'];
    if (!unique.includes('Other')) unique.push('Other');
    return unique;
  }, [prCrop, crops]);

  const isValidPickerValue = (v: string, opts: string[]) =>
    v === '' || opts.includes(v) || v === 'Other';

  /* ---------------- LOAD META ---------------- */
  useEffect(() => {
    (async () => {
      const [cRes, mRes] = await Promise.all([
        api.get('/crops'),
        api.get('/mandis'),
      ]);
      setCrops(cRes.data ?? []);
      setMandis(mRes.data ?? []);
    })();
  }, []);

  /* ---------------- LOAD USER & LOTS ---------------- */
  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then(async p => {
      setPhone(p);
      const res = await api.get('/farmer/lots/all');
      setLots(
        (res.data ?? []).map((d: any) => ({
          id: String(d.preLotId),
          crop: d.cropName,
          grade: d.grade ?? '-',
          quantity: String(d.quantity),
          sellingamount: String(d.sellingamount),
          mandi: d.mandiName,
          expectedArrival: d.expectedArrivalDate ?? '-',
          createdAt: Date.now(),
        })),
      );
    });
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const onSearchDaily = () => {
    if (!mandiName && !cropName) {
      Alert.alert(t('error_title'), t('fill_mandi_search'));
      return;
    }
    setAppliedFilters({ mandi: mandiName, crop: cropName });
  };

  const getShortTermForecastInline = async () => {
    setForecastLoading(true);
    setForecastSummary(
      `${t('short_term_forecast')}: ${stfCrop} @ ${stfMandi}`,
    );
    setForecastLoading(false);
  };

  const openDatePicker = () => setShowDatePicker(true);

  const onChangeDate = (_: DateTimePickerEvent, d?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (d) {
      setDateValue(d);
      setPrExpectedArrival(d.toISOString().split('T')[0]);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <Text style={[styles.backText, { color: theme.primary }]}>
            {t('back')}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>
          {t('farmer_dashboard')}
        </Text>

        <DashboardMenu
          onOpenProfile={() => navigation.navigate('Dashboard')}
          onLogout={async () => {
            await AsyncStorage.multiRemove([
              'ACCESS_TOKEN',
              'LOGGED_IN_USER',
              'LOGGED_IN_ROLE',
            ]);
            navigation.navigate('Dashboard');
          }}
        />
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        {['daily', 'short', 'preregister', 'received'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab as any)}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.primary },
            ]}
          >
            <Text
              style={{
                color: selectedTab === tab ? '#fff' : theme.text,
                fontWeight: '700',
              }}
            >
              {translate(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CONTENT */}
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            {selectedTab === 'daily' && (
              <DailyMarketTab
                theme={theme}
                t={translate}
                mandiName={mandiName}
                cropName={cropName}
                mandiOptions={mandiOptions}
                cropOptions={cropOptions}
                setMandiName={setMandiName}
                setCropName={setCropName}
                onSearch={onSearchDaily}
                appliedFilters={appliedFilters}
                isValidPickerValue={isValidPickerValue}
              />
            )}

            {selectedTab === 'short' && (
              <ShortTermForecastTab
                theme={theme}
                t={translate}
                stfMandi={stfMandi}
                stfCrop={stfCrop}
                horizon={horizon}
                mandiOptions={mandiOptions}
                cropOptions={cropOptions}
                setStfMandi={setStfMandi}
                setStfCrop={setStfCrop}
                setHorizon={setHorizon}
                onGetForecast={getShortTermForecastInline}
                forecastLoading={forecastLoading}
                forecastSummary={forecastSummary}
                isValidPickerValue={isValidPickerValue}
              />
            )}

            {selectedTab === 'preregister' && (
              <>
                <PreRegisterLotForm
                  theme={theme}
                  t={translate}
                  prCrop={prCrop}
                  prGrade={prGrade}
                  prQuantity={prQuantity}
                  prSellingAmount={prSellingAmount}
                  prMandi={prMandi}
                  prExpectedArrival={prExpectedArrival}
                  cropOptions={cropOptions}
                  mandiOptions={mandiOptions}
                  currentGrades={currentGrades}
                  setPrCrop={setPrCrop}
                  setPrGrade={setPrGrade}
                  setPrQuantity={setPrQuantity}
                  setPrSellingAmount={setPrSellingAmount}
                  setPrMandi={setPrMandi}
                  setPrExpectedArrival={setPrExpectedArrival}
                  showDatePicker={showDatePicker}
                  dateValue={dateValue}
                  openDatePicker={openDatePicker}
                  onChangeDate={onChangeDate}
                  onSubmit={() => {}}
                  editingLotId={editingLotId}
                  isValidPickerValue={isValidPickerValue}
                />

                <RegisteredLotsList
                  theme={theme}
                  t={translate}
                  lots={lots}
                  onEdit={lot => setEditingLotId(lot.id)}
                  onDelete={id =>
                    setLots(prev => prev.filter(l => l.id !== id))
                  }
                />
              </>
            )}

            {selectedTab === 'received' && (
              <ReceivedBidsTab
                theme={theme}
                t={translate}
                loading={loadingBids}
                lotsWithBids={lotsWithBids}
                onAccept={() => {}}
                onReject={() => {}}
              />
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 18, fontWeight: '700' },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
});

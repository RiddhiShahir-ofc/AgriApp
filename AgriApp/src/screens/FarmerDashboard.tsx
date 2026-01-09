import React, { useEffect, useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import GraphChart from '../components/GraphChart';
import AppHamburgerMenu from '../components/AppHamburgerMenu';
import api from '../services/api';
import MandiPriceSummary from '../components/MandiPriceSummary';

type PropsNav = NativeStackNavigationProp<RootStackParamList>;

type Lot = {
  id: string; // PreLotId from backend
  preLotId?: string;
  crop: string;
  grade: string;
  quantity: string;
  sellingamount: string;
  mandi: string;
  expectedArrival: string;
  createdAt: number;
  isEditing?: boolean;
};

type Bid = {
  buyerInterestLotId: number;
  lotOwner: string;
  lotId: string;
  bidder: string;
  bidValue: string;
  createdAt: number;
  status?: 'pending' | 'accepted' | 'rejected';
};

type LotWithBids = Lot & {
  bids: Bid[];
};

// DB crop / mandi shapes for UI
type UICrop = { id: number; name: string; grade?: string | null };
type UIMandi = {
  id: number;
  name: string;
  location: string;
  district?: string;
};

export default function FarmerDashboard() {
  // // Daily price filters
  // const [dailyPriceFilters, setDailyPriceFilters] = useState<{
  //   district: string;
  //   mandi: string;
  //   days: number;
  // } | null>(null);


  // // Short-term price filters
  // const [shortPriceFilters, setShortPriceFilters] = useState<{
  //   district: string;
  //   mandi: string;
  //   days: number;
  // } | null>(null);

  const navigation = useNavigation<PropsNav>();
  const goBack = () => navigation.navigate('Dashboard');

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [selectedTab, setSelectedTab] = useState<
    'daily' | 'short' | 'preregister' | 'received'
  >('daily');

  // Daily mandi/crop search
  const [district, setDistrict] = useState('');
  const [mandiName, setMandiName] = useState('');
  const [cropName, setCropName] = useState('');
  // const [appliedFilter, setAppliedFilter] = useState({ district: '', mandi: '', crop: '', days: 1 });
const [appliedFilter, setAppliedFilter] = useState<{
  district: string;
  mandi: string;
  crop: string;
  days: number;
} | null>(null);
const [dailyFilters, setDailyFilters] = useState({
  district: '',
  mandi: '',
  crop: '',
  days: 1,
});

  // Short-term forecast state
  const [stfDistrict, setStfDistrict] = useState('');
  const [stfMandi, setStfMandi] = useState('');
  const [stfCrop, setStfCrop] = useState('');
  const [horizon, setHorizon] = useState<'7days' | '14days' | '30days'>(
    '7days',
  );
  const [forecastSummary, setForecastSummary] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
const [appliedFilters, setAppliedFilters] = useState<{
  district: string;
  mandi: string;
  crop: string;
  days: number;
} | null>(null);

  // Pre-register state
  const [prCrop, setPrCrop] = useState(''); // crop name
  const [prGrade, setPrGrade] = useState(''); // grade from DB
  const [prQuantity, setPrQuantity] = useState('');
  const [prSellingAmount, setPrSellingAmount] = useState('');
  const [prMandi, setPrMandi] = useState(''); // mandi name
  const [prExpectedArrival, setPrExpectedArrival] = useState('');
  const [lots, setLots] = useState<Lot[]>([]);
  const [phone, setPhone] = useState<string | null>(null);
  const [PreLotId, setPreLotId] = useState<string | null>(null);

  // Date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  // Received bids state
  const [lotsWithBids, setLotsWithBids] = useState<LotWithBids[]>([]);
  const [loadingBids, setLoadingBids] = useState(false);

  const STORAGE_KEY_PREFIX = 'REGISTERED_LOTS_';

  //  Crops & Mandis from DB
  const [crops, setCrops] = useState<UICrop[]>([]);
  const [mandis, setMandis] = useState<UIMandi[]>([]);

  // // 🔹 Shared price filter state (SAME AS Dashboard)
  // const [mandi, setMandi] = useState('');
  // const [days, setDays] = useState<number>();

  // Unique crop names for dropdowns
  const cropOptions = useMemo(
    () => Array.from(new Set(crops.map(c => c.name))),
    [crops],
  );

  // Unique district names for dropdowns
  const districtOptions = useMemo(
    () =>
      Array.from(
        new Set(mandis.map(m => m.district).filter(Boolean)),
      ) as string[],
    [mandis],
  );

  // Unique mandi names for dropdowns
  // const mandiOptions = useMemo(
  //   () => Array.from(new Set(mandis.map(m => m.name))),
  //   [mandis],
  // );
  const mandiOptions = useMemo(() => {
    return mandis
      .filter(m => !district || m.district === district)
      .map(m => m.name);
  }, [mandis, district]);

const shortTermMandiOptions = useMemo(() => {
  return mandis
    .filter(m => !stfDistrict || m.district === stfDistrict)
    .map(m => m.name);
}, [mandis, stfDistrict]);



  //  Get grades from DB for selected crop
  const currentGrades = useMemo(() => {
    if (!prCrop) return [];

    const grades = crops
      .filter(c => c.name === prCrop && c.grade != null && c.grade !== '')
      .map(c => String(c.grade));

    const uniqueGrades = Array.from(new Set(grades));

    // if no grade in DB, still allow "Other"
    if (!uniqueGrades.length) return ['Other'];
    if (!uniqueGrades.includes('Other')) uniqueGrades.push('Other');
    return uniqueGrades;
  }, [prCrop, crops]);

  const isValidPickerValue = (value: string, options: string[]) => {
    return value === '' || options.includes(value) || value === 'Other';
  };

  // //  when crop changes, reset grade if not valid for that crop
  useEffect(() => {
    if (!prCrop) {
      setPrGrade('');
      return;
    }
    if (prGrade && !currentGrades.includes(prGrade)) {
      setPrGrade('');
    }
  }, [prCrop, prGrade, currentGrades]);

  
//   const getGradesForCrop = (cropName: string) => {
//   const grades = crops
//     .filter(c => c.name === cropName && c.grade)
//     .map(c => String(c.grade));
//   const unique = Array.from(new Set(grades));
//   if (!uniqueGrades.length) return ['Other'];
//   if (!uniqueGrades.includes('Other')) unique.push('Other');
//   return uniqueGrades;

// };

  //  helper: sync lots to AsyncStorage (for buyer pre-bidding)
  const syncLotsToStorage = async (
    lotsToStore: Lot[],
    ownerPhone: string | null,
  ) => {
    if (!ownerPhone) return;
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEY_PREFIX}${ownerPhone}`,
        JSON.stringify(lotsToStore),
      );
    } catch (e) {
      console.warn('Failed to sync lots to storage', e);
    }
  };

  const startEditLot = (id: string) => {
    setLots(prev =>
      prev.map(l => (l.id === id ? { ...l, isEditing: true } : l)),
    );
  };

  const cancelEditLot = (id: string) => {
    setLots(prev =>
      prev.map(l => (l.id === id ? { ...l, isEditing: false } : l)),
    );
  };

  //  load lots from backend /farmer/lots/all
  const loadLotsFromBackend = async (ownerPhone: string | null) => {
    try {
      const res = await api.get('/farmer/lots/all');
      const data = Array.isArray(res.data) ? res.data : [];

      const mapped: Lot[] = data.map((d: any) => {
        // const id =
        //   d.preLotId ??
        //   d.PreLotId ??
        //   d.id ??
        //   d.lotId ??
        //   `${Date.now()}_${Math.random()}`;

        // return {
        //   id: String(id),
        //   crop: d.cropName ?? d.CropName ?? d.crop ?? '',
        //   grade: d.grade ?? d.Grade ?? '-',
        //   quantity: String(d.quantity ?? d.Quantity ?? ''),
        //   sellingamount: String(d.sellingamount ?? d.SellingAmount ?? ''),
        //   mandi:
        //     d.mandiName ??
        //     d.MandiName ??
        //     d.mandiLocation ??
        //     d.MandiLocation ??
        //     '',
        //   expectedArrival:
        //     d.expectedArrivalDate ??
        //     d.ExpectedArrivalDate ??
        //     d.expectedArrival ??
        //     '-',
        //   createdAt: d.createdAt
        //     ? new Date(d.createdAt).getTime()
        //     : Date.now(),
        // };
        const preLotId = d.preLotId ?? d.PreLotId ?? null;

        const id =
          d.id ??
          d.lotId ??
          preLotId ?? // fallback
          `${Date.now()}_${Math.random()}`;

        return {
          id: String(id), // UI key
          preLotId: preLotId ? String(preLotId) : undefined, // 👈 KEEP IT
          crop: d.cropName ?? d.CropName ?? d.crop ?? '',
          grade: d.grade ?? d.Grade ?? '-',
          quantity: String(d.quantity ?? d.Quantity ?? ''),
          sellingamount: String(d.sellingamount ?? d.SellingAmount ?? d.sellingAmount??''),
          mandi:
            d.mandiName ??
            d.MandiName ??
            d.mandiLocation ??
            d.MandiLocation ??
            '',
          expectedArrival:
            d.expectedArrivalDate ??
            d.ExpectedArrivalDate ??
            d.expectedArrival ??
            '-',
          createdAt: d.createdAt ? new Date(d.createdAt).getTime() : Date.now(),
        };
      });

      setLots(mapped);
      await syncLotsToStorage(mapped, ownerPhone);
    } catch (err) {
      console.warn('Failed to load Farmer lots from backend', err);

      
      // fallback: try existing local storage if any

      if (ownerPhone) {

        const j = await AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${ownerPhone}`);

        if (j) {

          try {

            setLots(JSON.parse(j));

          } catch (e) {

            console.warn('Failed parse lots from local storage', e);

          }

        }

      }
    }
  };

  //  load crops & mandis from backend
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [cropsRes, mandisRes] = await Promise.all([
          api.get('/crops'),
          api.get('/mandis'),
        ]);

        const cropsData = cropsRes.data ?? [];
        const mandisData = mandisRes.data ?? [];

        const mappedCrops: UICrop[] = cropsData
          .map((c: any) => {
            const id = c.cropId ?? c.CropId ?? c.id;
            const name = c.cropName ?? c.CropName ?? c.name;
            const grade = c.grade ?? c.Grade ?? null;
            if (!id || !name) return null;
            return {
              id: Number(id),
              name: String(name),
              grade,
            };
          })
          .filter(Boolean) as UICrop[];

        const mappedMandis: UIMandi[] = mandisData
          .map((m: any) => {
            const id = m.mandiId ?? m.MandiId ?? m.id;
            const name = m.mandiName ?? m.MandiName ?? m.name;
            const location = m.location ?? m.Location ?? '';
            const district = m.district ?? m.District ?? '';
            if (!id || !name) return null;
            return {
              id: Number(id),
              name: String(name),
              location: String(location),
              district: String(district),
            };
          })
          .filter(Boolean) as UIMandi[];

        setCrops(mappedCrops);
        setMandis(mappedMandis);
      } catch (e) {
        console.warn('Failed to load crops/mandis', e);
      }
    };

    loadMeta();
  }, []);

  // Load logged-in farmer & lots
  useEffect(() => {
    AsyncStorage.getItem('LOGGED_IN_USER').then(async p => {
      setPhone(p);
      await loadLotsFromBackend(p);
    });
  }, []);

  // Load received bids when tab changes to "received"
  // useEffect(() => {
  //   if (selectedTab === 'received' && phone) {
  //     loadReceivedBids(phone);
  //   }
  // }, [selectedTab, phone]);
  useEffect(() => {
    if (selectedTab === 'received') {
      loadReceivedBids();
    }
  }, [selectedTab]);

  const onSelectTab = (tab: 'daily' | 'short' | 'preregister' | 'received') => {
    if (tab === 'short') {
      setSelectedTab('short');
      setStfMandi(mandiName);
      setStfCrop(cropName);
      return;
    }
    if (tab === 'preregister') {
      setSelectedTab('preregister');
      return;
    }
    if (tab === 'received') {
      setSelectedTab('received');
      return;
    }
    setSelectedTab('daily');
  };

  const onSearchDaily = () => {
    if (!mandiName || !district || !cropName) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_mandi_search') ?? 'Enter mandi or crop to search',
      );
      return;
    }
    setAppliedFilter({ district, mandi: mandiName, crop: cropName, days: 1 });
  };


   const getDaysFromHorizon = () => {
  if (horizon === '14days') return 14;
  if (horizon === '30days') return 30;
  return 7; // default
};

const getShortTermForecastInline = async () => {
  if (!stfDistrict || !stfMandi  || !stfCrop) {
    // Alert.alert('Error', 'Please select district and mandi');
    Alert.alert('Error', 'Select district, mandi and crop');
    return;
  }

  try {
    setForecastLoading(true);
    setForecastSummary(null);

    const days = getDaysFromHorizon();

      // ✅ SAFE: runs only on button press
    setAppliedFilters({
      district: stfDistrict,
      mandi: stfMandi,
      crop: stfCrop,
      days,
    });

//     {appliedFilters.district ? (
//   <MandiPriceSummary
//     key={`${appliedFilters.district}_${appliedFilters.mandi}_${appliedFilters.days}`}
//     district={appliedFilters.district}
//     mandi={appliedFilters.mandi}
//     days={appliedFilters.days}
//   />
// ) : (
//   <View style={styles.chartPlaceholder}>
//     <Text style={{ color: theme.text }}>
//       {t('select_district_mandi_days') ??
//         'Select district, mandi and days to view prices'}
//     </Text>
//   </View>
// )}


    setForecastSummary(
      `${t('short_term_forecast') ?? 'Short term forecast'}: ${
        stfCrop || 'selected crop'
      } at ${stfMandi} — ${days} days`
    );
  } catch (err) {
    console.error(err);
    Alert.alert(
      t('error_title') ?? 'Error',
      t('error_generic') ?? 'Something went wrong'
    );
  } finally {
    setForecastLoading(false);
  }
};


  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) {
      setDateValue(selectedDate);
      setPrExpectedArrival(formatDate(selectedDate));
    }
  };

  const openDatePicker = () => {
    if (prExpectedArrival) {
      const parts = prExpectedArrival.split('-').map(p => parseInt(p, 10));
      if (parts.length === 3 && !isNaN(parts[0])) {
        setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
      } else {
        setDateValue(new Date());
      }
    } else {
      setDateValue(new Date());
    }
    setShowDatePicker(true);
  };

  const resetLotForm = () => {
    setPrCrop('');
    setPrGrade('');
    setPrQuantity('');
    setPrMandi('');
    setPrSellingAmount('');
    setPrExpectedArrival('');
    setDateValue(new Date());
    setShowDatePicker(false);
    setPreLotId(null);
  };

  //  pick the correct CropId based on selected crop & grade
  const pickCropIdForSelection = () => {
    if (!prCrop) return null;

    // Try to match crop + grade first
 
    let match = crops.find(

      c =>

        c.name === prCrop &&

        // (c.grade ?? '') === (prGrade) || (c.grade ?? ''),
        (prGrade ? String(c.grade) === prGrade : true),

    );

    // Fallback: any row with same crop name
    if (!match) {
      match = crops.find(c => c.name === prCrop);
    }

    return match?.id ?? null;
  };

  const pickMandiIdForSelection = () => {
    if (!prMandi) return null;
    const m = mandis.find(m => m.name === prMandi);
    return m?.id ?? null;
  };

  //  Register lot with CropId & MandiId from DB + selected grade
  const addLotInline = async () => {
    if (!prCrop)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_crop') ?? 'Please select crop',
      );
    if (!prQuantity)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_quantity') ?? 'Please enter quantity',
      );
    if (!prSellingAmount)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('expected_amount') ?? 'Please enter expected amount',
      );
    if (!prMandi)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_mandi') ?? 'Please select mandi',
      );

    const cropId = pickCropIdForSelection();
    const mandiId = pickMandiIdForSelection();

    if (!cropId || !mandiId) {
      Alert.alert(
        t('error_title') ?? 'Error',
        'Invalid crop or mandi selected. Please re-select.',
      );
      return;
    }

    try {
      const formData = new FormData();

      // Names MUST match LotRegisterRequest
      formData.append('CropId', String(cropId));
      formData.append('MandiId', String(mandiId));
      formData.append('Quantity', prQuantity);
      formData.append('SellingAmount', prSellingAmount);
      formData.append('Grade', prGrade || '-');

      if (prExpectedArrival) {
        formData.append('ExpectedArrivalDate', dateValue.toISOString());
      }

      const res = await api.post('/farmer/lots/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data: any = res.data ?? {};
      const id = String(
        data.preLotId ??
          data.PreLotId ??
          data.id ??
          data.lotId ??
          `${Date.now()}`,
      );

      const newLot: Lot = {
        id: data.preLotId,
        crop: data.cropName ?? data.CropName ?? prCrop,
        grade: (data.grade ?? data.Grade ?? prGrade) || '-',
        quantity: String(data.quantity ?? data.Quantity ?? prQuantity),
        sellingamount: String(
          data.sellingAmount ?? data.SellingAmount ?? prSellingAmount,
        ),
        mandi:
          data.mandiName ??
          data.MandiName ??
          data.mandiLocation ??
          data.MandiLocation ??
          prMandi,
        expectedArrival:
          (data.expectedArrivalDate ??
            data.ExpectedArrivalDate ??
            prExpectedArrival) ||
          '-',
        createdAt: data.createdAt
          ? new Date(data.createdAt).getTime()
          : Date.now(),
      };

      const newLots = [newLot, ...lots];
      setLots(newLots);
      await syncLotsToStorage(newLots, phone);

      resetLotForm();

      Alert.alert(
        t('success_title') ?? 'Success',
        t('lot_added_success') ?? 'Lot added successfully',
      );
    } catch (err: any) {
      console.error(
        'Register lot error:',
        err?.response?.status,
        err?.response?.data ?? err,
      );
      Alert.alert(
        t('error_title') ?? 'Error',
        t('lot_add_failed') ?? 'Failed to register lot',
      );
    }
  };

  const startEditingLot = (lot: Lot) => {
    setSelectedTab('preregister');
    setPreLotId(lot.id);
    setPrCrop(lot.crop);
    setPrGrade(lot.grade);
    setPrQuantity(lot.quantity);
    setPrSellingAmount(lot.sellingamount);
    setPrMandi(lot.mandi);
    setPrExpectedArrival(
      lot.expectedArrival && lot.expectedArrival !== '-'
        ? lot.expectedArrival
        : '',
    );

    if (lot.expectedArrival && lot.expectedArrival.includes('-')) {
      const parts = lot.expectedArrival.split('-').map(p => parseInt(p, 10));
      if (parts.length === 3 && !isNaN(parts[0])) {
        setDateValue(new Date(parts[2], parts[1] - 1, parts[0]));
      } else {
        setDateValue(new Date());
      }
    } else {
      setDateValue(new Date());
    }
  };

  const updateLotInline = async () => {
    if (!PreLotId) return;
    if (!prCrop)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_crop') ?? 'Please select crop',
      );
    if (!prQuantity)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_quantity') ?? 'Please enter quantity',
      );
    if (!prMandi)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('fill_mandi') ?? 'Please select mandi',
      );
    if (!prSellingAmount)
      return Alert.alert(
        t('error_title') ?? 'Error',
        t('expected_amount') ?? 'Please enter Expected Amount',
      );

    const cropId = pickCropIdForSelection();
    const mandiId = pickMandiIdForSelection();

    if (!cropId || !mandiId) {
      Alert.alert(
        t('error_title') ?? 'Error',
        'Invalid crop or mandi selected. Please re-select.',
      );
      return;
    }

    try {
      const formData = new FormData();

      formData.append('CropId', String(cropId));
      formData.append('MandiId', String(mandiId));
      formData.append('Quantity', prQuantity);
      formData.append('SellingAmount', prSellingAmount);
      formData.append('Grade', prGrade || '-');
      if (prExpectedArrival) {
        formData.append('ExpectedArrivalDate', dateValue.toISOString());
      }

      const res = await api.put(`/farmer/lots/${PreLotId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data: any = res.data ?? {};

      const updatedLot: Lot = {
        id: String(
          data.preLotId ?? data.PreLotId ?? data.id ?? data.lotId ?? PreLotId,
        ),
        crop: data.cropName ?? data.CropName ?? prCrop,
        grade: (data.grade ?? data.Grade ?? prGrade) || '-',
        quantity: String(data.quantity ?? data.Quantity ?? prQuantity),
        sellingamount: String(
          data.sellingamount ?? data.SellingAmount ?? prSellingAmount,
        ),
        mandi:
          data.mandiName ??
          data.MandiName ??
          data.mandiLocation ??
          data.MandiLocation ??
          prMandi,
        expectedArrival:
          (data.expectedArrivalDate ??
            data.ExpectedArrivalDate ??
            prExpectedArrival) ||
          '-',
        createdAt: data.createdAt
          ? new Date(data.createdAt).getTime()
          : Date.now(),
      };

      const newLots = lots.map(l => (l.id === PreLotId ? updatedLot : l));
      setLots(newLots);
      await syncLotsToStorage(newLots, phone);

      resetLotForm();

      Alert.alert(
        t('success_title') ?? 'Success',
        t('lot_updated_success') ?? 'Lot updated successfully',
      );
    } catch (err: any) {
      console.error(
        'Edit lot error:',
        err?.response?.status,
        err?.response?.data ?? err,
      );
      Alert.alert(
        t('error_title') ?? 'Error',
        t('lot_update_failed') ?? 'Failed to update lot',
      );
    }
  };

  const removeLot = async (id: string) => {
    try {
      await api.delete(`/farmer/lots/${PreLotId}`);
    } catch (err) {
      console.warn('Delete lot API error:', err);
    }

    const filtered = lots.filter(l => l.id !== id);
    setLots(filtered);
    await syncLotsToStorage(filtered, phone);

    if (PreLotId === id) {
      resetLotForm();
    }
  };

  const loadReceivedBids = async () => {
    setLoadingBids(true);
    try {
      const res = await api.get('/farmer/lots/bids');

      const data = Array.isArray(res.data) ? res.data : [];

      const mapped: LotWithBids[] = data.map((item: any) => ({
        id: item.preLotId,
        crop: item.cropName,
        mandi: item.mandiName,
        grade: item.grade,
        quantity: item.quantity,
        sellingamount: item.expectedAmount,
        expectedArrival: item.expectedArrivalDate,
        createdAt: Date.now(),
        bids: item.bids.map((b: any) => ({
          lotId: item.preLotId,
          bidder: `${b.buyerName} (${b.buyerMobile})`,
          bidValue: String(b.bidAmount),
          createdAt: new Date(b.createdAt).getTime(),
          status: b.status,
          buyerInterestLotId: b.buyerInterestLotId,
        })),
      }));

      setLotsWithBids(mapped);
    } catch (err) {
      console.warn('Failed to load received bids', err);
    } finally {
      setLoadingBids(false);
    }
  };

  const handleAcceptBid = async (lotId: string, buyerInterestLotId: number) => {
    try {
      await api.post(`/farmer/lots/${lotId}/bids/${buyerInterestLotId}/accept`);

      Alert.alert(
        t('success_title') ?? 'Success',
        t('bid_accepted') ?? 'Bid accepted successfully',
      );

      loadReceivedBids();
    } catch (err) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('accept_failed') ?? 'Failed to accept bid',
      );
    }
  };

  const handleRejectBid = async (lotId: string, buyerInterestLotId: number) => {
    try {
      await api.post(`/farmer/lots/${lotId}/bids/${buyerInterestLotId}/reject`);

      Alert.alert(
        t('success_title') ?? 'Success',
        t('bid_rejected') ?? 'Bid rejected successfully',
      );

      loadReceivedBids();
    } catch (err) {
      Alert.alert(
        t('error_title') ?? 'Error',
        t('reject_failed') ?? 'Failed to reject bid',
      );
    }
  };

  // Actual Display Screen
  const ListHeaderElement = useMemo(() => {
    return (
      <View>
        <View style={styles.container}>
          {/* Row 1: Back + Hamburger */}
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={goBack} style={styles.backBtn}>
              <Text style={[styles.backText, { color: theme.primary }]}>
                {t('back') || 'Back'}
              </Text>
            </TouchableOpacity>

            {/* 👇 SAME hamburger component */}
            <AppHamburgerMenu role="farmer" />
          </View>

          {/* Row 2: Title + subtitle */}
          <View style={styles.headerTextBlock}>
            <Text style={[styles.title, { color: theme.text }]}>
              {t('farmer_dashboard') || 'Farmer Dashboard'}
            </Text>
            <Text style={[styles.text, { color: theme.text }]}>
              {t('farmer_message') || ''}
            </Text>
          </View>
        </View>

        {/* Tabs row */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'daily'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('daily')}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'daily' ? styles.tabTextSelected : {},
              ]}
            >
              {t('daily_market_price')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'short'
                ? { backgroundColor: theme.primary ?? '#15f048ff' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('short')}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'short' ? styles.tabTextSelected : {},
              ]}
            >
              {t('short_term_forecast')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'preregister'
                ? { backgroundColor: theme.primary ?? '#15f048ff' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('preregister')}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'preregister' ? styles.tabTextSelected : {},
              ]}
            >
              {t('pre_register_lot')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'received'
                ? { backgroundColor: theme.primary ?? '#3182ce' }
                : { backgroundColor: theme.background ?? '#f0f0f0' },
            ]}
            onPress={() => onSelectTab('received')}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                selectedTab === 'received' ? styles.tabTextSelected : {},
              ]}
            >
              {t('received_bids') ?? 'Received Bids'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* DAILY */}
        {selectedTab === 'daily' && (
          <>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.text,
                },
              ]}
            >
              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('district') ?? 'District'}
              </Text>

              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={district}
                  onValueChange={v => {
                    setDistrict(v);
                    setMandiName(''); // reset mandi
                  }}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_district') ?? 'Select district'}
                    value=""
                  />
                  {districtOptions.map(d => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('mandi') ?? 'Mandi'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={
                    isValidPickerValue(mandiName, mandiOptions) ? mandiName : ''
                  }
                  onValueChange={v => {
                    setMandiName(v);
                    //setMandi(v);
                  }}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_mandi') ?? 'Select mandi'}
                    value=""
                  />
                  {mandiOptions.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {mandiName &&
                !isValidPickerValue(mandiName, mandiOptions) &&
                mandiName !== 'Other' && (
                  <TextInput
                    placeholder={t('type_mandi') ?? 'Type mandi'}
                    placeholderTextColor={theme.text ?? '#999'}
                    value={mandiName}
                    onChangeText={setMandiName}
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('crop') ?? 'Crop'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={
                    isValidPickerValue(cropName, cropOptions) ? cropName : ''
                  }
                  onValueChange={v => setCropName(v)}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_crop') ?? 'Select crop'}
                    value=""
                  />
                  {cropOptions.map(c => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {cropName &&
                !isValidPickerValue(cropName, cropOptions) &&
                cropName !== 'Other' && (
                  <TextInput
                    placeholder={t('type_crop') ?? 'Type crop'}
                    placeholderTextColor={theme.text ?? '#999'}
                    value={cropName}
                    onChangeText={setCropName}
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.text,
                      },
                    ]}
                  />
                )}

              <TouchableOpacity
                style={[
                  styles.searchBtn,
                  { backgroundColor: theme.primary ?? '#2b6cb0' },
                ]}
                onPress={onSearchDaily}
              >
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>
                  {t('search')}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartBox,
                {
                  borderColor: theme.text,
                  backgroundColor: theme.background,
                },
              ]}
            >
              <Text style={[styles.chartTitle, { color: theme.text }]}>
                {t('daily_market_price_chart_title')}
              </Text>
              <View
                style={[
                  styles.chartPlaceholder,
                  { borderColor: theme.text },
                ]}
              >
                {/* <GraphChart filters={appliedFilter} /> */}
                {appliedFilter ? (
  <GraphChart
    key={`${appliedFilter.district}_${appliedFilter.mandi}_${appliedFilter.crop}`}
    filters={appliedFilter}
  />
) : (
  <View style={styles.chartPlaceholder}>
    <Text style={{ color: theme.text }}>
      Select district, mandi and crop, then click Search
    </Text>
  </View>
)}
               
              </View>

              {/* <View>
                {dailyPriceFilters ? (
                  <MandiPriceSummary
                    district={dailyPriceFilters.district}
                    mandi={dailyPriceFilters.mandi}
                    days={dailyPriceFilters.days}
                  />
                ) : (
                  <View style={styles.chartPlaceholder}>
                    <Text style={{ color: theme.text }}>
                      {t('select_district_mandi') ??
                        'Select district & mandi to view today’s price'}
                    </Text>
                  </View>
                )}
              </View> */}
            </View>
          </>
        )}

        {/* SHORT TERM */}
        {selectedTab === 'short' && (
          <>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.text ?? '#ddd',
                },
              ]}
            >
              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('district') ?? 'District'}
              </Text>

              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={stfDistrict}
                  onValueChange={v => {
                    setStfDistrict(v);
                    setStfMandi('');
                  }}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_district') ?? 'Select district'}
                    value=""
                  />
                  {districtOptions.map(d => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('mandi') ?? 'Mandi'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={
                    isValidPickerValue(stfMandi, shortTermMandiOptions) ? stfMandi : ''
                  }
                  onValueChange={v => setStfMandi(v)}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_mandi') ?? 'Select mandi'}
                    value=""
                  />
                  {shortTermMandiOptions.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {stfMandi && !isValidPickerValue(stfMandi,shortTermMandiOptions) && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi name'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={stfMandi}
                  onChangeText={setStfMandi}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.text,
                    },
                  ]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('crop') ?? 'Crop'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={
                    isValidPickerValue(stfCrop, cropOptions) ? stfCrop : ''
                  }
                  onValueChange={v => setStfCrop(v)}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_crop') ?? 'Select crop'}
                    value=""
                  />
                  {cropOptions.map(c => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {stfCrop && !isValidPickerValue(stfCrop, cropOptions) && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop name'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={stfCrop}
                  onChangeText={setStfCrop}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.text,
                    },
                  ]}
                />
              )}

              <Text style={[styles.searchTitle, { color: theme.text }]}>
                {t('forecast_horizon') ?? 'Duration (in days)'}
              </Text>
              <View style={styles.horizonRow}>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '7days' ? styles.horizonBtnActive : {},
                  ]}
                  onPress={() => setHorizon('7days')}
                >
                  <Text
                    style={
                      horizon === '7days'
                        ? styles.horizonTextActive
                        : styles.horizonText
                    }
                  >
                    7
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '14days' ? styles.horizonBtnActive : {},
                  ]}
                  onPress={() => setHorizon('14days')}
                >
                  <Text
                    style={
                      horizon === '14days'
                        ? styles.horizonTextActive
                        : styles.horizonText
                    }
                  >
                    14
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.horizonBtn,
                    horizon === '30days' ? styles.horizonBtnActive : {},
                  ]}
                  onPress={() => setHorizon('30days')}
                >
                  <Text
                    style={
                      horizon === '30days'
                        ? styles.horizonTextActive
                        : styles.horizonText
                    }
                  >
                    30
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.searchBtn,
                  { backgroundColor: theme.primary ?? '#15f048ff' },
                ]}
                onPress={getShortTermForecastInline}
              >
                <Text style={[styles.searchBtnText, { color: '#fff' }]}>
                  {t('get_forecast') ?? 'Get Forecast'}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.chartBox,
                {
                  borderColor: theme.text ?? '#ddd',
                  backgroundColor: theme.background ?? '#fff',
                },
              ]}
            >
              <Text style={[styles.chartTitle, { color: theme.text }]}>
                {t('short_term_forecast')}
              </Text>
              {/* <View style={styles.chartPlaceholder}>
                <Text style={{ color: theme.text ?? '#666' }}>
                  {forecastLoading
                    ? t('loading') ?? 'Loading...'
                    : forecastSummary ??
                      t('chart_placeholder_text') ??
                      'Forecast chart will appear here'}
                </Text>
              </View> */}

              {/* <View>
                {shortPriceFilters ? (
                  <MandiPriceSummary
                  key={`${shortPriceFilters.district}_${shortPriceFilters.mandi}_${shortPriceFilters.days}`}
                    district={shortPriceFilters.district}
                    mandi={shortPriceFilters.mandi}
                    days={shortPriceFilters.days}
                  />
                ) : (
                  <View style={styles.chartPlaceholder}>
                    <Text style={{ color: theme.text }}>
                      {t('select_district_mandi_days') ??
                        'Select district, mandi and days to view prices'}
                    </Text>
                  </View>
                )}
              </View>

              {forecastSummary && (
                <Text style={{ color: theme.text, marginTop: 8 }}>
                  {forecastSummary}
                </Text>
              )} */}
              {/* <GraphChart filters={appliedFilters} /> */}
              {appliedFilters ? (
  <GraphChart
    key={`${appliedFilters.district}_${appliedFilters.mandi}_${appliedFilters.crop}_${appliedFilters.days}`}
    filters={appliedFilters}
  />
) : (
  <View style={styles.chartPlaceholder}>
    <Text style={{ color: theme.text }}>
      Select district, mandi, crop and click Get Forecast
    </Text>
  </View>
)}

            </View>
          </>
        )}

        {/* PRE-REGISTER FORM */}
        {selectedTab === 'preregister' && (
          <>
            <View
              style={[
                styles.formBox,
                {
                  borderColor: theme.text ?? '#ddd',
                  backgroundColor: theme.background,
                },
              ]}
            >
              <View style={styles.formHeaderRow}>
                <Text style={[styles.title, { color: theme.text }]}>
                  {t('pre_register_title') ?? 'Register Harvested Crop Lot'}
                </Text>
              </View>

              {/* Crop */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('crop') ?? 'Crop'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={
                    isValidPickerValue(prCrop, cropOptions) ? prCrop : ''
                  }
                  onValueChange={v => setPrCrop(v)}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_crop') ?? 'Select crop'}
                    value=""
                  />
                  {cropOptions.map(c => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {prCrop && !isValidPickerValue(prCrop, cropOptions) && (
                <TextInput
                  placeholder={t('type_crop') ?? 'Type crop'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prCrop}
                  onChangeText={setPrCrop}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.text,
                    },
                  ]}
                />
              )}

              {/* Grade from DB */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('grade_label') ?? 'Grade'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={prGrade}
                  onValueChange={v => setPrGrade(v)}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_grade') ?? 'Select grade'}
                    value=""
                  />
                  {currentGrades.map(g => (
                    <Picker.Item key={g} label={g} value={g} />
                  ))}
                </Picker>
              </View>
              {prGrade === 'Other' && (
                <TextInput
                  placeholder={t('type_grade') ?? 'Type grade'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prGrade}
                  onChangeText={setPrGrade}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.text,
                    },
                  ]}
                />
              )}

              {/* Quantity */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('quantity_label') ?? 'Quantity (quintal)'}
              </Text>
              <TextInput
                placeholder={t('enter_quantity') ?? 'Enter Quantity (quintal)'}
                placeholderTextColor={theme.text ?? '#999'}
                value={prQuantity}
                onChangeText={setPrQuantity}
                keyboardType="numeric"
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.text,
                  },
                ]}
              />

              {/* Selling Amount */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('expected_amount') ?? 'Expected Amount'}
              </Text>
              <TextInput
                placeholder={
                  t('enter_expected_amount') ?? 'Please Enter Expected Amount'
                }
                placeholderTextColor={theme.text ?? '#999'}
                value={prSellingAmount}
                //onChangeText={setPrSellingAmount}
                onChangeText={text => {
                  console.log('typed selling amount:', text, typeof text);
                  setPrSellingAmount(text);
                }}
                keyboardType="number-pad"
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.text,
                  },
                ]}
              />

              {/* Mandi */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('mandi_label') ?? 'Mandi Location'}
              </Text>
              <View style={[styles.pickerWrap, { borderColor: theme.text }]}>
                <Picker
                  selectedValue={
                    isValidPickerValue(prMandi, mandiOptions) ? prMandi : ''
                  }
                  onValueChange={v => setPrMandi(v)}
                  style={[styles.picker, { color: theme.text }]}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item
                    label={t('select_mandi') ?? 'Select mandi'}
                    value=""
                  />
                  {mandiOptions.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {prMandi && !isValidPickerValue(prMandi, mandiOptions) && (
                <TextInput
                  placeholder={t('type_mandi') ?? 'Type mandi'}
                  placeholderTextColor={theme.text ?? '#999'}
                  value={prMandi}
                  onChangeText={setPrMandi}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.text,
                    },
                  ]}
                />
              )}

              {/* Expected Arrival Date */}
              <Text style={[styles.formTitle, { color: theme.text }]}>
                {t('arrival_label') ?? 'Expected Arrival Date'}
              </Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  styles.dateInput,
                  {
                    borderColor: theme.text,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}
                onPress={openDatePicker}
              >
                <Text
                  style={{
                    color: prExpectedArrival ? theme.text : '#999',
                  }}
                >
                  {prExpectedArrival || (t('enter_date') ?? 'dd-mm-yyyy')}
                </Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              {prExpectedArrival && (
                <TouchableOpacity
                  onPress={() => setPrExpectedArrival('')}
                  style={{ marginTop: 6 }}
                >
                  <Text
                    style={{
                      color: theme.primary ?? '#2b6cb0',
                      fontSize: 12,
                    }}
                  >
                    {t('clear') ?? 'Clear'}
                  </Text>
                </TouchableOpacity>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={dateValue}
                  mode="date"
                  display={Platform.OS === 'android' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  maximumDate={new Date(2100, 11, 31)}
                  minimumDate={new Date(2000, 0, 1)}
                />
              )}

              <TouchableOpacity
                style={[
                  styles.addBtn,
                  { backgroundColor: theme.primary ?? '#2b6cb0' },
                ]}
                onPress={PreLotId ? updateLotInline : addLotInline}
              >
                <Text style={[styles.addBtnText, { color: '#fff' }]}>
                  {PreLotId
                    ? t('update_lot') ?? 'Update Lot'
                    : t('add_lot') ?? 'Add Lot'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('your_registered_lots') ?? 'Your Registered Lots'}
            </Text>
          </>
        )}

        {/* RECEIVED BIDS */}
        {selectedTab === 'received' && (
          <View
            style={[
              styles.formBox,
              {
                borderColor: theme.text ?? '#ddd',
                backgroundColor: theme.background,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('received_bids') ?? 'Received Bids on Your Lots'}
            </Text>

            {loadingBids ? (
              <Text style={{ color: theme.text, marginTop: 10 }}>
                {t('loading') ?? 'Loading...'}
              </Text>
            ) : lotsWithBids.length === 0 ? (
              <View
                style={[styles.emptyBox, { borderColor: '#eee', marginTop: 8 }]}
              >
                <Text style={{ color: theme.text ?? '#666' }}>
                  {t('no_bids_yet') ?? 'No bids received yet'}
                </Text>
              </View>
            ) : (
              lotsWithBids.map(lotWithBids => (
                <View
                  key={lotWithBids.id}
                  style={[
                    styles.lotItemReceived,
                    {
                      borderColor: theme.text ?? '#ccc',
                      backgroundColor: theme.background,
                    },
                  ]}
                >
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={[
                        styles.lotText,
                        {
                          color: theme.text,
                          fontWeight: '700',
                          marginBottom: 4,
                        },
                      ]}
                    >
                      {lotWithBids.crop} ({'Grade :'}
                      {lotWithBids.grade})
                    </Text>
                    <Text style={[styles.lotText, { color: theme.text }]}>
                      {t('quantity_label') ?? 'Quantity'}:{' '}
                      {lotWithBids.quantity}
                    </Text>
                    <Text style={[styles.lotText, { color: theme.text }]}>
                      {t('expected_amount') ?? 'Expected Amount'}:{' '}
                      {lotWithBids.sellingamount}
                    </Text>
                    <Text style={[styles.lotText, { color: theme.text }]}>
                      {t('mandi') ?? 'Mandi'}: {lotWithBids.mandi}
                    </Text>
                    <Text style={[styles.lotText, { color: theme.text }]}>
                      {t('arrival_label') ?? 'Arrival'}:{' '}
                      {lotWithBids.expectedArrival}
                    </Text>
                  </View>

                  <View style={{ marginTop: 8 }}>
                    <Text
                      style={[
                        styles.formTitle,
                        { color: theme.text, fontSize: 14 },
                      ]}
                    >
                      {t('received_bids') ?? 'Bids'} ({lotWithBids.bids.length})
                    </Text>

                    {lotWithBids.bids.map(bid => (
                      <View
                        key={bid.createdAt}
                        style={{
                          marginTop: 8,
                          padding: 8,
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: theme.text ?? '#ccc',
                        }}
                      >
                        <Text style={{ color: theme.text }}>
                          {t('bidder') ?? 'Bidder'}: {bid.bidder}
                        </Text>
                        <Text style={{ color: theme.text }}>
                          {t('bid_value') ?? 'Bid'}: ₹{bid.bidValue}
                          /quintal
                        </Text>
                        <Text style={{ color: theme.text }}>
                          {t('date') ?? 'Date'}:{' '}
                          {new Date(bid.createdAt).toLocaleString()}
                        </Text>

                        {bid.status && (
                          <Text
                            style={{
                              marginTop: 4,
                              color:
                                bid.status === 'accepted'
                                  ? '#15803d'
                                  : bid.status === 'rejected'
                                  ? '#b91c1c'
                                  : '#92400e',
                              fontWeight: '700',
                              fontSize: 12,
                            }}
                          >
                            {bid.status.toUpperCase()}
                          </Text>
                        )}

                        {(!bid.status || bid.status === 'pending') && (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 8,
                            }}
                          >
                            <TouchableOpacity
                              style={[
                                styles.addBtn,
                                {
                                  flex: 1,
                                  marginRight: 4,
                                  backgroundColor: '#16a34a',
                                },
                              ]}
                              // onPress={() =>
                              //   handleAcceptBid(
                              //     lotWithBids.id,
                              //     bid.createdAt,
                              //   )
                              // }
                              onPress={() =>
                                handleAcceptBid(
                                  lotWithBids.id,
                                  bid.buyerInterestLotId,
                                )
                              }
                            >
                              <Text
                                style={[styles.addBtnText, { color: '#fff' }]}
                              >
                                {t('accept') ?? 'Accept'}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.addBtn,
                                {
                                  flex: 1,
                                  marginLeft: 4,
                                  backgroundColor: '#b91c1c',
                                },
                              ]}
                              // onPress={() =>
                              //   handleRejectBid(
                              //     lotWithBids.id,
                              //     bid.createdAt,
                              //   )
                              // }
                              onPress={() =>
                                handleAcceptBid(
                                  lotWithBids.id,
                                  bid.buyerInterestLotId,
                                )
                              }
                            >
                              <Text
                                style={[styles.addBtnText, { color: '#fff' }]}
                              >
                                {t('reject') ?? 'Reject'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </View>
    );
  }, [
    theme,
    t,
    selectedTab,
    mandiName,
    cropName,
    stfMandi,
    stfCrop,
    horizon,
    forecastLoading,
    forecastSummary,
    prCrop,
    prGrade,
    prQuantity,
    prSellingAmount,
    prMandi,
    prExpectedArrival,
    appliedFilters,
    showDatePicker,
    dateValue,
    lotsWithBids,
    loadingBids,
    PreLotId,
    cropOptions,
    mandiOptions,
    currentGrades,
  ]);

  const renderLotItem = ({ item }: { item: Lot }) => (
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
          <Text style={{ fontWeight: '700' }}>PreLot ID: </Text>
          {item.preLotId}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('crop')}: </Text>
          {item.crop}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('grade_label')}: </Text>
          {item.grade}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('quantity_label')}: </Text>
          {item.quantity}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('expected_amount')}: </Text>
          {item.sellingamount}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('mandi_label')}: </Text>
          {item.mandi}
        </Text>
        <Text style={[styles.lotText, { color: theme.text }]}>
          <Text style={{ fontWeight: '700' }}>{t('arrival_label')}: </Text>
          {item.expectedArrival}
        </Text>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={styles.smallEditBtn}
          onPress={() => startEditingLot(item)}
        >
          <Text style={styles.smallEditBtnText}>{t('edit') ?? 'Edit Lot'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeLot(item.id)}
        >
          <Text style={styles.removeBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => {
    if (selectedTab !== 'preregister') return null;
    return (
      <View style={[styles.emptyBox, { borderColor: '#eee' }]}>
        <Text style={{ color: theme.text ?? '#666' }}>
          {t('no_lots') ?? 'No lots registered yet'}
        </Text>
      </View>
    );
  };

  const listData = selectedTab === 'preregister' ? lots : [];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={renderLotItem}
        ListHeaderComponent={ListHeaderElement}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  // 🔹 NEW: top bar with back + title + hamburger
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  backText: { fontWeight: '700', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
  text: { fontSize: 14, marginBottom: 12 },

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tab: { flex: 0.24, padding: 12, borderRadius: 8, alignItems: 'center' },
  tabText: { fontWeight: '600', color: '#333' },
  tabTextSelected: { color: '#fff' },

  searchBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  searchTitle: {
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  searchBtn: {
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 6,
  },
  searchBtnText: { fontWeight: '700' },

  chartBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginTop: 8,
  },
  chartTitle: { fontWeight: '700', marginBottom: 10 },
  chartPlaceholder: {
    height: 220,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  horizonRow: { flexDirection: 'row', marginBottom: 12 },
  horizonBtn: {
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#efefef',
    alignItems: 'center',
    minWidth: 44,
  },
  horizonBtnActive: { backgroundColor: '#15f048ff' },
  horizonText: { color: '#333', fontWeight: '600' },
  horizonTextActive: { color: '#fff', fontWeight: '700' },

  formBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  addBtn: {
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  addBtnText: { fontWeight: '700', color: '#fff' },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },

  lotItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  lotItemReceived: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  lotText: { marginBottom: 6 },
  removeBtn: {
    backgroundColor: '#e53e3e',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  removeBtnText: { color: '#fff', fontWeight: '700' },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },

  dateInput: {
    paddingVertical: 14,
  },
  calendarIcon: {
    fontSize: 22,
    marginLeft: 8,
  },

  smallEditBtn: {
    backgroundColor: '#4B9CFD',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  smallEditBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  pickerWrapper: {
    // backgroundColor: '#fff',   // ✅ white background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  picker: {},
  headerContainer: {
    marginBottom: 12,
  },

  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTextBlock: {
    marginTop: 8,
  },
});

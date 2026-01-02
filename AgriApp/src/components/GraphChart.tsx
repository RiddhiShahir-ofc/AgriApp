// // import React, { useEffect, useState } from 'react';
// // import { View, Dimensions, Text, ActivityIndicator } from 'react-native';
// // import {
// //   LineChart,
// //   BarChart,
// //   PieChart,
// // } from 'react-native-chart-kit';

// // import {
// //   getMandiPrices,
// //   mapMandiPricesToChart,
// // } from '../services/mandiPriceApi';

// // const screenWidth = Dimensions.get('window').width - 60;

// // // ---------------- Default Line Chart (unchanged) ----------------

// // interface GraphChartProps {
// //   filters: {
// //     district: string;
// //     mandi: string;
// //     days?: number;
// //     crop?: string;
// //   };
// // }


// // // export default function GraphChart({ filters }: GraphChartProps) {
// // //   // Simulate dynamic data based on filters
// // //   const baseData = [10, 15, 12, 20, 18, 16];
// // //   const adjusted =
// // //     filters?.district || filters?.mandi || filters?.crop ? baseData.map(v => v + 10) : baseData;

// // //   const data = {
// // //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
// // //     datasets: [{ data: adjusted }],
// // //   };

// // //   return (
// // //     <View>
// // //       <LineChart
// // //         data={data}
// // //         width={screenWidth}
// // //         height={180}
// // //         chartConfig={{
// // //           backgroundGradientFrom: '#fff',
// // //           backgroundGradientTo: '#fff',
// // //           decimalPlaces: 0,
// // //           color: (opacity = 1) => `rgba(21, 240, 72, 1)`,
// // //           labelColor: () => '#666666ff',
// // //         }}
// // //         bezier
// // //         withInnerLines={false}
// // //         withOuterLines={false}
// // //       />
// // //     </View>
// // //   );
// // // }

// // export default function GraphChart( {filters={district: '', mandi: '', days: 1 },} : GraphChartProps) {
// //   const [loading, setLoading] = useState(false);
// //   const [todayData, setTodayData] = useState<any>(null);
// //   const [chartData, setChartData] = useState<any>(null);

// //   //const days = filters.days ?? 1;

// //   const safeFilters = filters ?? { district: '', mandi: '', days: 1 };
// // const { district, mandi, days } = safeFilters;


// //   // ---------------- STEP 4: Loader ----------------
// //   const loadGraphData = async () => {
// //     console.log('GRAPH FILTERS:', district, mandi, days);

// //     if (!district || !mandi) return;

// //     try {
// //       setLoading(true);

// //       const response = await getMandiPrices({
// //         district,
// //         market : mandi,
// //         days: days ?? 1,
// //       });

// //       if (days === 1) {
// //         setTodayData(response.data[0]);
// //         setChartData(null);
// //       } else {
// //         setChartData(mapMandiPricesToChart(response));
// //         setTodayData(null);
// //       }
// //     } catch (err) {
// //       console.log('Graph API error', err);
// //     } finally {
// //       setLoading(false);
// //       console.log('Calling API with:', district, mandi, days);

// //     }
// //   };

// //   // ---------------- STEP 5: Auto-trigger ----------------
// //   useEffect(() => {
// //     loadGraphData();
// //   }, [filters]);

// //   // ---------------- STEP 6: UI ----------------
// //   if (!district || !mandi) {
// //     return <Text>Select district and mandi to view prices</Text>;
// //   }

// //   if (loading) {
// //     return <ActivityIndicator />;
// //   }

// //   return (
// //     <View>
// //       {todayData && (
// //         <View style={{ marginBottom: 12 }}>
// //           <Text style={{ fontWeight: '700' }}>
// //             Today Price: ₹{todayData.pred_price_kg} / kg
// //           </Text>
// //           <Text>Min: ₹{todayData.min_kg}</Text>
// //           <Text>Max: ₹{todayData.max_kg}</Text>
// //           <Text>Avg: ₹{todayData.avg_kg}</Text>
// //         </View>
// //       )}

// //       {chartData && (
// //         <LineChart
// //           data={chartData}
// //           width={screenWidth}
// //           height={200}
// //           yAxisSuffix="₹"
// //           chartConfig={{
// //             backgroundGradientFrom: '#fff',
// //             backgroundGradientTo: '#fff',
// //             decimalPlaces: 1,
// //             color: () => 'rgba(21, 240, 72, 1)',
// //             labelColor: () => '#666',
// //           }}
// //           bezier
// //           withInnerLines={false}
// //           withOuterLines={false}
// //         />
// //       )}
// //     </View>
// //   );
// // }



// // // ---------------- Quantity Bar Chart ----------------

// // type QuantityDatum = {
// //   label: string;
// //   value: number;
// // };

// // interface QuantityBarChartProps {
// //   data: QuantityDatum[];
// // }

// // export function QuantityBarChart({ data }: QuantityBarChartProps) {
// //   const labels = data.map(d => d.label);
// //   const values = data.map(d => d.value);

// //   return (
// //     <View>
// //       <BarChart
// //         data={{
// //           labels,
// //           datasets: [{ data: values }],
// //         }}
// //         width={screenWidth}
// //         height={200}
// //         fromZero={true}
// //         showBarTops={true}
// //         withInnerLines={false}
// //         // 👇 These two satisfy the TS type requirements
// //         yAxisLabel=""
// //         yAxisSuffix=""
// //         chartConfig={{
// //           backgroundGradientFrom: '#fff',
// //           backgroundGradientTo: '#fff',
// //           decimalPlaces: 0,
// //           color: (opacity = 1) => `rgba(251,146,60, ${opacity})`, // orange
// //           labelColor: () => '#666',
// //         }}
// //         style={{ borderRadius: 8 }}
// //       />
// //     </View>
// //   );
// // }

// // // ---------------- Crop Distribution Pie Chart ----------------

// // type DistributionItem = {
// //   name: string;
// //   value: number;
// //   color: string;
// // };

// // interface CropDistributionPieChartProps {
// //   data: DistributionItem[];
// // }

// // export function CropDistributionPieChart({
// //   data,
// // }: CropDistributionPieChartProps) {
// //   const pieData = data.map(item => ({
// //     name: item.name,
// //     population: item.value,
// //     color: item.color,
// //     legendFontColor: '#4B5563',
// //     legendFontSize: 12,
// //   }));

// //   return (
// //     <View>
// //       <PieChart
// //         data={pieData}
// //         width={screenWidth}
// //         height={200}
// //         chartConfig={{
// //           backgroundGradientFrom: '#fff',
// //           backgroundGradientTo: '#fff',
// //           color: (opacity = 1) => `rgba(59,130,246, ${opacity})`,
// //           labelColor: () => '#374151',
// //         }}
// //         accessor="population"
// //         backgroundColor="transparent"
// //         paddingLeft="10"
// //         hasLegend={true}
// //         center={[0, 0]}
// //       />
// //     </View>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { getMandiPrices } from '../services/mandiPriceApi';

// interface GraphChartProps {
//   filters: {
//     district: string;
//     mandi: string;
//     days: number;
//   };
// }

// export default function GraphChart({ filters }: GraphChartProps) {
//     const {
//     district = '',
//     mandi = '',
//     days = 1,
//   } = filters ?? {};
//   const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState<any>(null);

//   useEffect(() => {
//     if (!filters.district || !filters.mandi) return;

//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const res = await getMandiPrices({
//           district: filters.district,
//           market: filters.mandi,
//           days: filters.days ?? 1,
//         });
//         setApiResponse(res);
//       } catch (err) {
//         console.log('API error', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [filters]);

//   if (!filters.district || !filters.mandi) {
//     return <Text>Select district and mandi to view prices</Text>;
//   }

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   if (!apiResponse || !apiResponse.data?.length) {
//     return <Text>No price data available</Text>;
//   }

//   const item = apiResponse.data[0];

//   return (
//     <View style={{ marginTop: 12 }}>
//       <Text style={{ fontWeight: '700' }}>
//         District: {apiResponse.district}
//       </Text>
//       <Text>Mandi: {apiResponse.market}</Text>
//       <Text>Unit: {apiResponse.unit}</Text>

//       <View style={{ marginTop: 10 }}>
//         <Text>Date: {new Date(item.date).toDateString()}</Text>
//         <Text>Predicted Price: ₹{item.pred_price_kg} / kg</Text>
//         <Text>Minimum Price: ₹{item.min_kg}</Text>
//         <Text>Maximum Price: ₹{item.max_kg}</Text>
//         <Text>Average Price: ₹{item.avg_kg}</Text>
//         <Text>Daily Change: {item['daily_change_%']} %</Text>
//         <Text>Weekly Change: {item['weekly_change_%']} %</Text>
//       </View>
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';

import { getMandiPrices } from '../services/mandiPriceApi';

const screenWidth = Dimensions.get('window').width - 60;

interface GraphChartProps {
  filters?: {
    district?: string;
    mandi?: string;
    days?: number;
    crop?: string;
  };
}

export default function GraphChart({ filters }: GraphChartProps) {
  /* ---------------- SAFE FILTERS ---------------- */
  const {
    district = '',
    mandi = '',
    days = 1,
  } = filters ?? {};

  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- API LOADER ---------------- */
  const loadData = async () => {
    if (!district || !mandi) return;

    try {
      setLoading(true);
      setError(null);

      console.log('Calling API with:', district, mandi, days);

      const response = await getMandiPrices({
        district,
        market: mandi,
        days,
      });

      setData(response?.data ?? []);
    } catch (err: any) {
      console.log('Graph API error', err);
      setError('Failed to load mandi prices');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- AUTO TRIGGER ---------------- */
  useEffect(() => {
    loadData();
  }, [district, mandi, days]);

  /* ---------------- UI STATES ---------------- */
  if (!district || !mandi) {
    return <Text>Select district and mandi to view prices</Text>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!data.length) {
    return <Text>No price data available</Text>;
  }

  /* ---------------- TEXT RESPONSE VIEW ---------------- */
  return (
    <View>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>
        Price Details ({days} day{days > 1 ? 's' : ''})
      </Text>

      {data.map((item, index) => (
        <View
          key={index}
          style={{
            marginBottom: 10,
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#f3f4f6',
          }}
        >
          <Text>Date: {new Date(item.date).toDateString()}</Text>
          <Text>Predicted Price: ₹{item.pred_price_kg} / kg</Text>
          <Text>Min: ₹{item.min_kg}</Text>
          <Text>Max: ₹{item.max_kg}</Text>
          <Text>Average: ₹{item.avg_kg}</Text>
          <Text>Daily Change: {item['daily_change_%']}%</Text>
          <Text>Weekly Change: {item['weekly_change_%']}%</Text>
        </View>
      ))}
    </View>
  );
}

// ---------------- Quantity Bar Chart ----------------

type QuantityDatum = {
  label: string;
  value: number;
};

interface QuantityBarChartProps {
  data: QuantityDatum[];
}

export function QuantityBarChart({ data }: QuantityBarChartProps) {
  const labels = data.map(d => d.label);
  const values = data.map(d => d.value);

  return (
    <View>
      <BarChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={screenWidth}
        height={200}
        fromZero={true}
        showBarTops={true}
        withInnerLines={false}
        // 👇 These two satisfy the TS type requirements
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(251,146,60, ${opacity})`, // orange
          labelColor: () => '#666',
        }}
        style={{ borderRadius: 8 }}
      />
    </View>
  );
}

// ---------------- Crop Distribution Pie Chart ----------------

type DistributionItem = {
  name: string;
  value: number;
  color: string;
};

interface CropDistributionPieChartProps {
  data: DistributionItem[];
}

export function CropDistributionPieChart({
  data,
}: CropDistributionPieChartProps) {
  const pieData = data.map(item => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: '#4B5563',
    legendFontSize: 12,
  }));

  return (
    <View>
      <PieChart
        data={pieData}
        width={screenWidth}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(59,130,246, ${opacity})`,
          labelColor: () => '#374151',
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        hasLegend={true}
        center={[0, 0]}
      />
    </View>
  );
}

// import React from 'react';
// import { View } from 'react-native';
// import { LineChart,BarChart,PieChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width - 60;

// interface GraphChartProps {
//   filters?: { mandi?: string; crop?: string };
// }

// export default function GraphChart({ filters }: GraphChartProps) {
//   // Simulate dynamic data based on filters
//   const baseData = [10, 15, 12, 20, 18, 16];
//   const adjusted = filters?.mandi || filters?.crop ? baseData.map((v) => v + 10) : baseData;

//   const data = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//     datasets: [{ data: adjusted }],
//   };

//   return (
//     <View>
//       <LineChart
//         data={data}
//         width={screenWidth}
//         height={180}
//         chartConfig={{
//           backgroundGradientFrom: '#fff',
//           backgroundGradientTo: '#fff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(43,108,176, ${opacity})`,
//           labelColor: () => '#666',
//         }}
//         bezier
//         withInnerLines={false}
//         withOuterLines={false}
//       />
//     </View>
//   );
// }

// // ---------- NEW: BAR CHART FOR QUANTITY ----------

// type QuantityBarChartItem = {
//   label: string;   // e.g. "Onion"
//   value: number;   // e.g. 2500
// };

// interface QuantityBarChartProps {
//   data: QuantityBarChartItem[];
// }

// export const QuantityBarChart: React.FC<QuantityBarChartProps> = ({ data }) => {
//   if (!data || data.length === 0) return null;

//   const chartData = {
//     labels: data.map(d => d.label),
//     datasets: [{ data: data.map(d => d.value) }],
//   };

//   return (
//     <View>
//       <BarChart
//         data={chartData}
//         width={screenWidth}
//         height={220}
//         fromZero
//         showBarTops
//         withInnerLines={false}
//         withOuterLines={false}
//         chartConfig={{
//           backgroundGradientFrom: '#fff',
//           backgroundGradientTo: '#fff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // orange-ish bars
//           labelColor: () => '#666',
//         }}
//         style={{ borderRadius: 8 }}
//       />
//     </View>
//   );
// };

// // ---------- NEW: PIE CHART FOR CROP DISTRIBUTION ----------

// type PieItem = {
//   name: string;   // e.g. "Onion"
//   value: number;  // e.g. 2500
//   color: string;  // e.g. "#10b981"
// };

// interface CropDistributionPieChartProps {
//   data: PieItem[];
// }

// export const CropDistributionPieChart: React.FC<CropDistributionPieChartProps> = ({
//   data,
// }) => {
//   if (!data || data.length === 0) return null;

//   const pieData = data.map(d => ({
//     name: d.name,
//     population: d.value,
//     color: d.color,
//     legendFontColor: '#666',
//     legendFontSize: 12,
//   }));

//   return (
//     <View>
//       <PieChart
//         data={pieData}
//         width={screenWidth}
//         height={220}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft="0"
//         center={[0, 0]}
//         absolute
//         chartConfig={{
//           backgroundGradientFrom: '#fff',
//           backgroundGradientTo: '#fff',
//           color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
//           labelColor: () => '#666',
//         }}
//       />
//     </View>
//   );
// };

import React from 'react';
import { View, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 60;

// ---------------- Default Line Chart (unchanged) ----------------

interface GraphChartProps {
  filters?: { mandi?: string; crop?: string };
}

export default function GraphChart({ filters }: GraphChartProps) {
  // Simulate dynamic data based on filters
  const baseData = [10, 15, 12, 20, 18, 16];
  const adjusted =
    filters?.mandi || filters?.crop ? baseData.map(v => v + 10) : baseData;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{ data: adjusted }],
  };

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={180}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(21, 240, 72, 1)`,
          labelColor: () => '#666666ff',
        }}
        bezier
        withInnerLines={false}
        withOuterLines={false}
      />
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

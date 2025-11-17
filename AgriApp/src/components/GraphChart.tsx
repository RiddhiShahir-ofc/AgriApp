import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width - 40;

interface GraphChartProps {
  filters?: { mandi?: string; crop?: string };
}

export default function GraphChart({ filters }: GraphChartProps) {
  // Simulate dynamic data based on filters
  const baseData = [20, 45, 28, 80, 99, 43];
  const adjusted = filters?.mandi || filters?.crop ? baseData.map((v) => v + 10) : baseData;

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
          color: (opacity = 1) => `rgba(43,108,176, ${opacity})`,
          labelColor: () => '#666',
        }}
        bezier
        withInnerLines={false}
        withOuterLines={false}
      />
    </View>
  );
}


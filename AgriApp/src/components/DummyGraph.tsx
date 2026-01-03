// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Svg, { Path, Line } from 'react-native-svg';
// import { useTheme } from '../context/ThemeContext';

// export default function DummyGraph() {
//   const { theme } = useTheme();

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Svg width="100%" height="120" viewBox="0 0 300 120">
//         {/* X-axis */}
//         <Line x1="10" y1="100" x2="290" y2="100" stroke="#ccc" strokeWidth="1" />

//         {/* Y-axis */}
//         <Line x1="10" y1="10" x2="10" y2="100" stroke="#ccc" strokeWidth="1" />

//         {/* Dummy trend line */}
//         <Path
//           d="M10 80
//              C 50 40, 90 60, 130 30
//              S 210 70, 290 40"
//           fill="none"
//           stroke="#15f048ff"
//           strokeWidth="3"
//         />
//       </Svg>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 8,
//     paddingVertical: 10,
//   },
// });

import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const screenWidth = Dimensions.get('window').width - 60;

export default function GraphChart() {
  const { theme } = useTheme();

  // ✅ Dummy static data
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [12, 18, 14, 22, 20, 17],
        strokeWidth: 3,
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={180}
        bezier
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withShadow={true}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: () => '#15f048ff', // green line
          labelColor: () => theme.text ?? '#666',
          fillShadowGradient: '#15f048ff',
          fillShadowGradientOpacity: 0.2,
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  );
}

import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function StepOverview({ onNext, onBack, data }) {
  // Mock data for chart if not provided
  const chartData = [
      { key: 'daily', value: 20, color: '#D7CCC8', label: 'Daily Spending' },
      { key: 'fixed', value: 20, color: '#A5D6A7', label: 'Fixed Payments' },
      { key: 'savings', value: 20, color: '#90CAF9', label: 'Savings Goals' },
      { key: 'future', value: 20, color: '#CE93D8', label: 'Future Budget' },
      { key: 'other', value: 20, color: '#C5A880', label: 'Other' },
  ];
  
  // Calculate donute segments
  const radius = 60;
  const strokeWidth = 30;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={styles.container}>
       <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
       </Pressable>
      <Text style={styles.headerTitle}>Let’s plan your budget</Text>
      <Text style={styles.subTitle}>Every dong gets a job,{'\n'}so nothing goes to waste.</Text>

      <View style={styles.card}>
         <View style={styles.header}>
             <MaterialCommunityIcons name="sprout" size={24} color="#64DD17" />
             <Text style={styles.overviewTitle}> Overview</Text>
         </View>
         <Text style={styles.overviewSub}>Don’t worry, you can change anything anytime in setting later.</Text>

         <View style={styles.chartContainer}>
            <Svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}>
                <G rotation="-90" origin={`${center}, ${center}`}>
                    {(() => {
                        let currentAngle = 0;
                        return chartData.map((item, index) => {
                            const percent = item.value / 100;
                            const strokeDasharray = `${circumference * percent} ${circumference}`;
                            const rotationAngle = currentAngle;
                            currentAngle += item.value / 100 * 360;
                            
                            return (
                                <Circle
                                    key={index}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    stroke={item.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={0}
                                    rotation={rotationAngle}
                                    origin={`${center}, ${center}`}
                                    fill="none"
                                />
                            );
                        });
                    })()}
                </G>
            </Svg>
         </View>

         <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
                <View key={index} style={styles.legendRow}>
                    <Text style={[styles.legendLabel, { color: item.key === 'other' ? 'transparent' : item.color }]}>
                        {item.key === 'other' ? '' : item.label}
                    </Text>
                    {item.key !== 'other' && (
                        <View style={styles.legendValBox}>
                            <Text style={styles.legendVal}>{item.value}%</Text>
                            <MaterialCommunityIcons name="chevron-up-down" size={16} color="#999" />
                        </View>
                    )}
                </View>
            ))}
         </View>

         <Pressable style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next →</Text>
         </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingTop: 60,
  },
  backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 10,
      padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#CCC',
    paddingHorizontal: 24,
    marginBottom: 30,
    lineHeight: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
  },
  overviewTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 8,
  },
  overviewSub: {
      fontSize: 12,
      color: '#888',
      marginBottom: 30,
  },
  chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
  },
  legendContainer: {
      marginBottom: 20,
  },
  legendRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      height: 24,
  },
  legendLabel: {
      fontSize: 16,
      fontWeight: '500',
  },
  legendValBox: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  legendVal: {
      fontSize: 16,
      color: '#666',
      marginRight: 4,
  },
  nextButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

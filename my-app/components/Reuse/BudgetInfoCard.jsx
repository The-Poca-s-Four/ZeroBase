import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';

export default function BudgetInfoCard({ 
    type, // 'daily', 'future', 'fixed', 'savings'
    color, 
    icon, 
    title, 
    progressText, 
    statusTitle, 
    statusValue,
    percent = 100
}) {
  
  // Ring Config
  const radius = 24;
  const strokeWidth = 6;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <View style={styles.card}>
       <View style={styles.topRow}>
           {/* Ring Icon */}
           <View style={styles.iconWrapper}>
               <Svg width={center * 2} height={center * 2}>
                   <G rotation="-90" origin={`${center}, ${center}`}>
                       <Circle 
                           cx={center} cy={center} r={radius} 
                           stroke={color} strokeWidth={strokeWidth} 
                           fill="none" 
                           strokeOpacity={0.3}
                       />
                       <Circle 
                           cx={center} cy={center} r={radius} 
                           stroke={color} strokeWidth={strokeWidth} 
                           fill="none" 
                           strokeDasharray={strokeDasharray}
                           strokeDashoffset={strokeDashoffset}
                           strokeLinecap="round"
                       />
                   </G>
               </Svg>
               <View style={styles.innerIcon}>
                   <MaterialCommunityIcons name={icon} size={20} color="#6D4C41" />
               </View>
           </View>

           {/* Right Info */}
           <View style={styles.rightInfo}>
               <Text style={styles.statusTitle}>{statusTitle}</Text>
               <Text style={[styles.statusValue, { color: color }]}>{statusValue}</Text>
               <Pressable style={[styles.payButton, { backgroundColor: color }]}>
                   <Text style={styles.payText}>Pay</Text>
               </Pressable>
           </View>
       </View>

       {/* Bottom Info */}
       <View style={styles.bottomInfo}>
           <Text style={styles.mainTitle}>{title}</Text>
           <Text style={styles.progressText}>
               {progressText.split('/').map((part, index) => (
                   <Text key={index} style={index === 0 ? {color: color, fontWeight: 'bold'} : {color: '#000', fontWeight: 'bold'}}>
                       {index === 1 ? ' / ' : ''}{part.trim()}
                   </Text>
               ))}
           </Text>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
      backgroundColor: '#FFF',
      borderRadius: 20,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10, // slightly less margin for grid
      width: '100%',
  },
  topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
  },
  iconWrapper: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
  },
  innerIcon: {
      position: 'absolute',
      width: 30,
      height: 30,
      backgroundColor: '#D7CCC8', // Light brown bg for icon
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#8D6E63',
  },
  rightInfo: {
      alignItems: 'flex-end',
      flex: 1,
      marginLeft: 8,
  },
  statusTitle: {
      fontSize: 10,
      color: '#666',
  },
  statusValue: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 4,
  },
  payButton: {
      paddingVertical: 4,
      paddingHorizontal: 16,
      borderRadius: 12,
  },
  payText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: 'bold',
  },
  bottomInfo: {
      marginTop: 4,
  },
  mainTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 2,
  },
  progressText: {
      fontSize: 11,
      color: '#333',
  },
});

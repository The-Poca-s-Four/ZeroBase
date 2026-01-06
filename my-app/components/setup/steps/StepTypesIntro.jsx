import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BudgetInfoCard from '../../Reuse/BudgetInfoCard';

export default function StepTypesIntro({ onNext, onBack }) {
  return (
    <View style={styles.containerDark}>
       {/* Back Button */}
       <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
       </Pressable>

       <View style={styles.card}>
            <Text style={styles.cardTitle}>🌱 Let’s us introduce 4 main type</Text>
            <Text style={styles.cardSub}>Each one will have special function.</Text>

            <View style={styles.grid}>
                <View style={styles.gridItemWrapper}>
                     <BudgetInfoCard 
                        type="daily"
                        color="#C5A880" // Gold/Brown
                        icon="silverware-fork-knife"
                        title="Daily spending sample"
                        progressText="500 000 paid / 1 000 000"
                        statusTitle="Safe to Spend"
                        statusValue="300 000 left"
                        percent={50}
                     />
                </View>
                <View style={styles.gridItemWrapper}>
                     <BudgetInfoCard 
                        type="fixed"
                        color="#4E81A5" // Blue
                        icon="scooter"
                        title="Fixed payment sample"
                        progressText="1 000 000 / 4 000 000"
                        statusTitle="Payment Date"
                        statusValue="June 14"
                        percent={25}
                     />
                </View>
                <View style={styles.gridItemWrapper}>
                     <BudgetInfoCard 
                        type="savings"
                        color="#4A7C59" // Green
                        icon="piggy-bank"
                        title="Savings goals sample"
                        progressText="5 000 000 / 10 000 000"
                        statusTitle="Congratulation!"
                        statusValue="You got 100%"
                        percent={100}
                     />
                </View>
                <View style={styles.gridItemWrapper}>
                     <BudgetInfoCard 
                         type="future"
                         color="#BC5090" // Pink
                         icon="store"
                         title="Future Budget sample"
                         progressText="5 000 000 / 10 000 000"
                         statusTitle="Congratulation!"
                         statusValue="You got 100%"
                         percent={50}
                     />
                </View>
            </View>

            <Pressable style={styles.nextButtonDark} onPress={onNext}>
                <Text style={styles.nextButtonTextWhite}>Next →</Text>
            </Pressable>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 10,
      padding: 8,
  },
  card: {
      flex: 1,
      backgroundColor: '#FFF',
      borderRadius: 30,
      padding: 20,
      marginTop: 40,
      marginBottom: 20,
  },
  cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
  },
  cardSub: {
      fontSize: 14,
      color: '#999',
      marginBottom: 20,
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
  },
  gridItemWrapper: {
      width: '48%',
      marginBottom: 16,
  },
  gridTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
  },
  gridDesc: {
      fontSize: 12,
      color: '#666',
      marginBottom: 10,
  },
  sampleBox: {
      flex: 1,
      borderRadius: 12,
      width: '100%',
  },
  nextButtonDark: {
      backgroundColor: '#1C1C1E',
      borderRadius: 30,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 'auto',
  },
  nextButtonTextWhite: {
      color: '#FFF',
      fontWeight: '600',
  },
});

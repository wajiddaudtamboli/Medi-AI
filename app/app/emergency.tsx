import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmergencyPage() {
  const emergencyNumber = '8047492503';
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const handleCallNow = () => {
    Alert.alert(
      "Emergency Call",
      `You are about to call ${emergencyNumber}. This will connect you to our 24/7 emergency medical assistance.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call Now",
          style: "destructive",
          onPress: () => {
            setIsEmergencyActive(true);
            let phoneNumber = '';
            if (Platform.OS === 'android') {
              phoneNumber = `tel:${emergencyNumber}`;
            } else {
              phoneNumber = `telprompt:${emergencyNumber}`;
            }
            Linking.openURL(phoneNumber);
          }
        }
      ]
    );
  };

  const handleVideoEmergency = () => {
    Alert.alert(
      "Emergency Video Call",
      "This will initiate an emergency video consultation with available doctors. Please ensure you have a stable internet connection.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Start Video Call",
          style: "destructive",
          onPress: () => {
            setIsEmergencyActive(true);
            Linking.openURL('https://video-call-final-git-main-orthodox-64s-projects.vercel.app/?roomID=emergency');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false, // Hide default header
        }}
      />

      {/* Top Section: Emergency Assistance */}
      <View style={styles.topSection}>
        <MaterialCommunityIcons name="bell-alert-outline" size={50} color="#fff" />
        <Text style={styles.topSectionText}>Emergency Assistance</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* IVR Emergency Number Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="phone" size={24} color="#E74C3C" />
            <Text style={styles.cardTitle}>IVR Emergency Number</Text>
          </View>
          <Text style={styles.phoneNumber}>{emergencyNumber}</Text>
          <Text style={styles.cardDescription}>
            Call this number for immediate medical assistance.
          </Text>
          <Text style={styles.cardDescription}>
            Follow the IVR instructions to get the required help.
          </Text>
          <TouchableOpacity style={styles.callButton} onPress={handleCallNow}>
            <Feather name="phone-call" size={20} color="#fff" />
            <Text style={styles.callButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Video Call Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="video" size={24} color="#FF6B35" />
            <Text style={styles.cardTitle}>Emergency Video Call</Text>
          </View>
          <Text style={styles.cardDescription}>
            Instant video consultation with emergency doctors.
          </Text>
          <Text style={styles.cardDescription}>
            Get immediate medical guidance through video call.
          </Text>
          <TouchableOpacity style={[styles.callButton, {backgroundColor: '#FF6B35'}]} onPress={handleVideoEmergency}>
            <MaterialCommunityIcons name="video" size={20} color="#fff" />
            <Text style={styles.callButtonText}>Start Video Call</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Status Indicator */}
        {isEmergencyActive && (
          <View style={styles.emergencyStatus}>
            <View style={styles.emergencyStatusHeader}>
              <MaterialCommunityIcons name="alert-circle" size={20} color="#E74C3C" />
              <Text style={styles.emergencyStatusText}>Emergency Active</Text>
            </View>
            <Text style={styles.emergencyStatusDescription}>
              Emergency services have been contacted. Help is on the way.
            </Text>
          </View>
        )}

        {/* Additional Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#3498DB" />
            <Text style={styles.cardTitle}>Additional Information</Text>
          </View>
          <Text style={styles.infoText}>- Available 24/7 for emergencies.</Text>
          <Text style={styles.infoText}>- Multi-language IVR support.</Text>
          <Text style={styles.infoText}>- Connects you to the nearest medical help.</Text>
          <Text style={styles.infoText}>- Supports both keypad and touch-tone responses.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E7FF', // Light blue background
  },
  topSection: {
    backgroundColor: '#6A5ACD', // Darker blue for top section
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  topSectionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  phoneNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E74C3C', // Red color for phone number
    textAlign: 'center',
    marginBottom: 15,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  callButton: {
    backgroundColor: '#E74C3C', // Red button
    borderRadius: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  emergencyStatus: {
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderColor: '#FCA5A5',
    borderWidth: 1,
  },
  emergencyStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyStatusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginLeft: 8,
  },
  emergencyStatusDescription: {
    fontSize: 14,
    color: '#B91C1C',
    lineHeight: 20,
  },
});

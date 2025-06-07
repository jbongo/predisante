import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const HISTORY = [
  {
    id: 1,
    year: '2024',
    appointments: [
      {
        id: 101,
        type: 'Bilan sanguin',
        date: '15 janvier 2024',
        doctor: 'Dr. Martin',
        location: 'Laboratoire Central',
        notes: 'Résultats normaux',
        status: 'completed',
        color: '#10B981',
        icon: 'vial'
      },
      {
        id: 102,
        type: 'Consultation dentaire',
        date: '3 février 2024',
        doctor: 'Dr. Dubois',
        location: 'Cabinet Dentaire du Centre',
        notes: 'Détartrage effectué',
        status: 'completed',
        color: '#3B82F6',
        icon: 'tooth'
      }
    ]
  },
  {
    id: 2,
    year: '2023',
    appointments: [
      {
        id: 201,
        type: 'Vaccin grippe',
        date: '12 octobre 2023',
        doctor: 'Dr. Bernard',
        location: 'Centre de vaccination',
        notes: 'Rappel effectué',
        status: 'completed',
        color: '#8B5CF6',
        icon: 'syringe'
      },
      {
        id: 202,
        type: 'Examen dermatologique',
        date: '5 juillet 2023',
        doctor: 'Dr. Laurent',
        location: 'Clinique de la peau',
        notes: 'RAS - Prochain contrôle dans 1 an',
        status: 'completed',
        color: '#EC4899',
        icon: 'user-md'
      }
    ]
  }
];

const FilterChip = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-3 ${active ? 'bg-violet-500' : 'bg-gray-100'}`}
  >
    <Text className={`font-medium ${active ? 'text-white' : 'text-gray-600'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function HistoryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="px-6 pt-6 pb-4 flex-row items-center">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100"
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 ml-4">
          Historique santé
        </Text>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-6 mb-6"
      >
        <FilterChip 
          label="Tout" 
          active={activeFilter === 'all'} 
          onPress={() => setActiveFilter('all')} 
        />
        <FilterChip 
          label="Vaccins" 
          active={activeFilter === 'vaccines'} 
          onPress={() => setActiveFilter('vaccines')} 
        />
        <FilterChip 
          label="Consultations" 
          active={activeFilter === 'checkups'} 
          onPress={() => setActiveFilter('checkups')} 
        />
        <FilterChip 
          label="Examens" 
          active={activeFilter === 'exams'} 
          onPress={() => setActiveFilter('exams')} 
        />
      </ScrollView>

      {/* Timeline */}
      <ScrollView className="flex-1 px-6">
        {HISTORY.map((yearGroup, yearIndex) => (
          <Animated.View 
            key={yearGroup.id}
            entering={FadeInDown.delay(yearIndex * 100)}
            className="mb-8"
          >
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              {yearGroup.year}
            </Text>
            <View className="space-y-4">
              {yearGroup.appointments.map((appointment, index) => (
                <Animated.View
                  key={appointment.id}
                  entering={FadeInDown.delay(index * 100 + 200)}
                >
                  <TouchableOpacity className="bg-white rounded-xl p-4 border border-gray-100">
                    <View className="flex-row items-start">
                      <View 
                        style={{ backgroundColor: appointment.color + '20' }}
                        className="w-12 h-12 rounded-lg items-center justify-center"
                      >
                        <FontAwesome5 
                          name={appointment.icon} 
                          size={20} 
                          color={appointment.color} 
                        />
                      </View>
                      <View className="flex-1 ml-4">
                        <View className="flex-row items-center justify-between">
                          <Text className="text-lg font-semibold text-gray-900">
                            {appointment.type}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {appointment.date}
                          </Text>
                        </View>
                        <Text className="text-gray-600 mt-1">
                          {appointment.doctor}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {appointment.location}
                        </Text>
                        <View className="mt-2 p-2 rounded-lg bg-gray-50">
                          <Text className="text-gray-600 text-sm">
                            {appointment.notes}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} 
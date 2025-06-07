import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const APPOINTMENTS = [
  {
    id: 1,
    type: 'Vaccin grippe',
    date: 'Octobre 2024',
    description: 'Recommandé chaque année',
    status: 'pending',
    color: '#8B5CF6',
    icon: 'syringe'
  },
  {
    id: 2,
    type: 'Bilan sanguin',
    date: 'Juin 2024',
    description: 'Surveillance annuelle',
    status: 'done',
    color: '#10B981',
    icon: 'vial'
  },
  {
    id: 3,
    type: 'Examen dentaire',
    date: 'Août 2024',
    description: 'Détartrage conseillé',
    status: 'todo',
    color: '#3B82F6',
    icon: 'tooth'
  }
];

const HABITS = [
  {
    id: 1,
    title: 'Activité physique',
    target: '30 min / jour',
    status: 'done',
    icon: 'running',
    color: '#EC4899'
  },
  {
    id: 2,
    title: 'Alimentation',
    target: 'Légumes de saison',
    status: 'pending',
    icon: 'carrot',
    color: '#F59E0B'
  },
  {
    id: 3,
    title: 'Sommeil',
    target: '7h par nuit',
    status: 'pending',
    icon: 'bed',
    color: '#6366F1'
  }
];

export default function PreventionScreen() {
  const today = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'todo':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView className="flex-1">
        {/* En-tête */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-gray-900">
            Bonjour, Claire
          </Text>
          <Text className="text-gray-500 mt-1 capitalize">
            {today}
          </Text>
        </View>

        {/* Rendez-vous */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Vos rendez-vous à venir
          </Text>
          <View className="space-y-4">
            {APPOINTMENTS.map((appointment, index) => (
              <Animated.View 
                key={appointment.id}
                entering={FadeInDown.delay(index * 100)}
              >
                <TouchableOpacity 
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <View className="flex-row items-center">
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
                        <View className={`px-3 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                          <Text className="text-sm font-medium">
                            {appointment.date}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-gray-500 mt-1">
                        {appointment.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Habitudes recommandées */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Vos habitudes recommandées
          </Text>
          <View className="space-y-4">
            {HABITS.map((habit, index) => (
              <Animated.View 
                key={habit.id}
                entering={FadeInDown.delay(index * 100 + 300)}
              >
                <TouchableOpacity 
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <View className="flex-row items-center">
                    <View 
                      style={{ backgroundColor: habit.color + '20' }}
                      className="w-12 h-12 rounded-lg items-center justify-center"
                    >
                      <FontAwesome5 
                        name={habit.icon} 
                        size={20} 
                        color={habit.color} 
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-semibold text-gray-900">
                          {habit.title}
                        </Text>
                        <View className={`px-3 py-1 rounded-full ${getStatusColor(habit.status)}`}>
                          <Text className="text-sm font-medium">
                            {habit.status === 'done' ? '✓' : '○'}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-gray-500 mt-1">
                        Objectif : {habit.target}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View className="px-6 pb-8 space-y-4">
          <TouchableOpacity 
            className="bg-violet-500 rounded-xl py-4 px-6"
            onPress={() => router.push("/prevention/history")}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Voir mon historique santé
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-white border border-gray-200 rounded-xl py-4 px-6"
            onPress={() => router.push("/prevention/reminders")}
          >
            <Text className="text-gray-700 text-center font-semibold text-lg">
              Gérer mes rappels
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
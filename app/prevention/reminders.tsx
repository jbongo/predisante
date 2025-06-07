import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Switch, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const REMINDER_SETTINGS = [
  {
    id: 1,
    title: 'Notifications push',
    description: 'Recevoir des notifications sur votre téléphone',
    icon: 'bell',
    color: '#8B5CF6'
  },
  {
    id: 2,
    title: 'Rappels par email',
    description: 'Recevoir des rappels par email',
    icon: 'envelope',
    color: '#3B82F6'
  },
  {
    id: 3,
    title: 'Calendrier synchronisé',
    description: 'Ajouter les rendez-vous à votre calendrier',
    icon: 'calendar',
    color: '#10B981'
  }
];

const REMINDER_TIMES = [
  {
    id: 1,
    title: '1 semaine avant',
    selected: true
  },
  {
    id: 2,
    title: '3 jours avant',
    selected: true
  },
  {
    id: 3,
    title: 'Le jour même',
    selected: true
  }
];

const UPCOMING_REMINDERS = [
  {
    id: 1,
    type: 'Vaccin grippe',
    date: '15 octobre 2024',
    reminderDate: '8 octobre 2024',
    status: 'pending',
    color: '#8B5CF6',
    icon: 'syringe'
  },
  {
    id: 2,
    type: 'Bilan sanguin',
    date: '1 juin 2024',
    reminderDate: '25 mai 2024',
    status: 'pending',
    color: '#10B981',
    icon: 'vial'
  }
];

export default function RemindersScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(
    REMINDER_SETTINGS.map(setting => ({ ...setting, enabled: true }))
  );
  const [times, setTimes] = useState(REMINDER_TIMES);

  const toggleSetting = (id: number) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const toggleTime = (id: number) => {
    setTimes(times.map(time =>
      time.id === id ? { ...time, selected: !time.selected } : time
    ));
  };

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
          Gérer mes rappels
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Paramètres des notifications */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Paramètres des notifications
          </Text>
          <View className="space-y-4">
            {settings.map((setting, index) => (
              <Animated.View
                key={setting.id}
                entering={FadeInDown.delay(index * 100)}
              >
                <View className="bg-white rounded-xl p-4 border border-gray-100">
                  <View className="flex-row items-center">
                    <View 
                      style={{ backgroundColor: setting.color + '20' }}
                      className="w-12 h-12 rounded-lg items-center justify-center"
                    >
                      <FontAwesome5 
                        name={setting.icon} 
                        size={20} 
                        color={setting.color} 
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className="text-lg font-semibold text-gray-900">
                        {setting.title}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {setting.description}
                      </Text>
                    </View>
                    <Switch
                      value={setting.enabled}
                      onValueChange={() => toggleSetting(setting.id)}
                      trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                    />
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Délais de rappel */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Délais de rappel
          </Text>
          <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {times.map((time, index) => (
              <Animated.View
                key={time.id}
                entering={FadeInDown.delay(index * 100 + 300)}
              >
                <TouchableOpacity 
                  className="p-4 flex-row items-center justify-between border-b border-gray-100 last:border-b-0"
                  onPress={() => toggleTime(time.id)}
                >
                  <Text className="text-gray-700 font-medium">
                    {time.title}
                  </Text>
                  <View 
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center
                      ${time.selected ? 'bg-violet-500 border-violet-500' : 'border-gray-300'}`}
                  >
                    {time.selected && (
                      <FontAwesome5 name="check" size={12} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Prochains rappels */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Prochains rappels
          </Text>
          <View className="space-y-4">
            {UPCOMING_REMINDERS.map((reminder, index) => (
              <Animated.View
                key={reminder.id}
                entering={FadeInDown.delay(index * 100 + 600)}
              >
                <View className="bg-white rounded-xl p-4 border border-gray-100">
                  <View className="flex-row items-center">
                    <View 
                      style={{ backgroundColor: reminder.color + '20' }}
                      className="w-12 h-12 rounded-lg items-center justify-center"
                    >
                      <FontAwesome5 
                        name={reminder.icon} 
                        size={20} 
                        color={reminder.color} 
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className="text-lg font-semibold text-gray-900">
                        {reminder.type}
                      </Text>
                      <Text className="text-gray-500">
                        Rendez-vous le {reminder.date}
                      </Text>
                      <Text className="text-violet-500 text-sm mt-1">
                        Rappel prévu le {reminder.reminderDate}
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Action */}
        <View className="px-6 pb-8">
          <TouchableOpacity className="bg-violet-500 rounded-xl py-4 px-6">
            <Text className="text-white text-center font-semibold text-lg">
              Enregistrer les modifications
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
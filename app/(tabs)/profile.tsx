import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

interface ProfileSection {
  id: string;
  title: string;
  icon: string;
  items: ProfileItem[];
}

interface ProfileItem {
  id: string;
  title: string;
  type: 'link' | 'toggle' | 'info';
  value?: string;
  icon?: string;
}

const profileSections: ProfileSection[] = [
  {
    id: '1',
    title: 'Informations personnelles',
    icon: 'user-circle',
    items: [
      { id: '1.1', title: 'Modifier mon profil', type: 'link', icon: 'user-edit' },
      { id: '1.2', title: 'Antécédents médicaux', type: 'link', icon: 'file-medical' },
      { id: '1.3', title: 'Allergies et intolérances', type: 'link', icon: 'allergies' },
    ]
  },
  {
    id: '2',
    title: 'Notifications',
    icon: 'bell',
    items: [
      { id: '2.1', title: 'Rappels de rendez-vous', type: 'toggle' },
      { id: '2.2', title: 'Alertes de prévention', type: 'toggle' },
      { id: '2.3', title: 'Actualités santé', type: 'toggle' },
    ]
  },
  {
    id: '3',
    title: 'Confidentialité et sécurité',
    icon: 'shield-alt',
    items: [
      { id: '3.1', title: 'Paramètres de confidentialité', type: 'link', icon: 'user-shield' },
      { id: '3.2', title: 'Gestion des données', type: 'link', icon: 'database' },
      { id: '3.3', title: 'Authentification', type: 'link', icon: 'lock' },
    ]
  },
  {
    id: '4',
    title: 'À propos',
    icon: 'info-circle',
    items: [
      { id: '4.1', title: 'Version de l\'application', type: 'info', value: '1.0.0' },
      { id: '4.2', title: 'Mentions légales', type: 'link', icon: 'gavel' },
      { id: '4.3', title: 'Politique de confidentialité', type: 'link', icon: 'file-contract' },
    ]
  }
];

const ProfileSectionCard = ({ section }: { section: ProfileSection }) => (
  <View className="bg-white rounded-xl mb-6">
    <View className="flex-row items-center p-4 border-b border-gray-100">
      <FontAwesome5 name={section.icon} size={20} color="#4F46E5" />
      <Text className="text-lg font-semibold text-gray-800 ml-3">
        {section.title}
      </Text>
    </View>
    {section.items.map(item => (
      <TouchableOpacity
        key={item.id}
        className="flex-row items-center justify-between p-4 border-b border-gray-50 last:border-b-0"
      >
        <View className="flex-row items-center flex-1">
          {item.icon && (
            <FontAwesome5 name={item.icon} size={16} color="#6B7280" className="mr-3" />
          )}
          <Text className="text-gray-700">{item.title}</Text>
        </View>
        {item.type === 'toggle' ? (
          <Switch />
        ) : item.type === 'info' ? (
          <Text className="text-gray-500">{item.value}</Text>
        ) : (
          <FontAwesome5 name="chevron-right" size={16} color="#9CA3AF" />
        )}
      </TouchableOpacity>
    ))}
  </View>
);

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-6">
      {/* En-tête du profil */}
      <View className="items-center mb-8">
        <View className="bg-indigo-100 w-24 h-24 rounded-full items-center justify-center mb-4">
          <FontAwesome5 name="user" size={40} color="#4F46E5" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Bongo Jean</Text>
        <Text className="text-gray-600">bongo.jean@gmail.com</Text>
      </View>

      {/* Sections du profil */}
      {profileSections.map(section => (
        <ProfileSectionCard key={section.id} section={section} />
      ))}

      {/* Bouton de déconnexion */}
      <TouchableOpacity className="bg-red-50 rounded-xl p-4 mb-8 flex-row items-center justify-center">
        <FontAwesome5 name="sign-out-alt" size={20} color="#DC2626" />
        <Text className="text-red-600 font-semibold ml-2">Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
} 
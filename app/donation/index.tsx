import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const InfoCard = ({ title, content, icon, color }: { title: string; content: string; icon: string; color: string }) => (
  <View className={`bg-white rounded-2xl p-6 mb-4 border-l-4`} style={{ borderLeftColor: color }}>
    <View className="flex-row items-center mb-3">
      <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3`} style={{ backgroundColor: `${color}20` }}>
        <FontAwesome5 name={icon} size={20} color={color} />
      </View>
      <Text className="text-gray-900 text-xl font-semibold">{title}</Text>
    </View>
    <Text className="text-gray-700 text-base leading-relaxed">{content}</Text>
  </View>
);

const DonationCenter = ({ name, address, phone, type }: { name: string; address: string; phone: string; type: 'blood' | 'marrow' }) => (
  <TouchableOpacity 
    className="bg-white rounded-2xl p-4 mb-4 border border-gray-100"
    onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`)}
  >
    <View className="flex-row items-center mb-2">
      <View className="w-12 h-12 rounded-xl bg-red-50 items-center justify-center mr-4">
        <FontAwesome5 name={type === 'blood' ? 'tint' : 'bone'} size={24} color="#DC2626" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-lg">{name}</Text>
        <Text className="text-gray-500">{type === 'blood' ? 'Centre de don du sang' : 'Don de moelle osseuse'}</Text>
      </View>
    </View>
    <Text className="text-gray-700 mb-2">{address}</Text>
    <TouchableOpacity 
      className="flex-row items-center"
      onPress={() => Linking.openURL(`tel:${phone}`)}
    >
      <FontAwesome5 name="phone" size={14} color="#DC2626" />
      <Text className="text-red-600 ml-2">{phone}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const bloodCenters = [
  {
    name: 'EFS Paris Crozatier',
    address: '21 Rue Crozatier, 75012 Paris',
    phone: '01 53 02 92 00',
    type: 'blood' as const
  },
  {
    name: 'EFS Saint-Louis',
    address: '38 Rue Bichat, 75010 Paris',
    phone: '01 53 72 22 50',
    type: 'blood' as const
  },
  {
    name: 'EFS Pitié-Salpêtrière',
    address: '47-83 Boulevard de l\'Hôpital, 75013 Paris',
    phone: '01 42 16 02 52',
    type: 'blood' as const
  }
];

const marrowCenters = [
  {
    name: 'Centre de don de moelle Saint-Louis',
    address: '1 Avenue Claude Vellefaux, 75010 Paris',
    phone: '01 42 49 91 91',
    type: 'marrow' as const
  },
  {
    name: 'Centre de don de moelle Necker',
    address: '149 Rue de Sèvres, 75015 Paris',
    phone: '01 44 49 40 00',
    type: 'marrow' as const
  }
];

export default function Donation() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'blood' | 'marrow'>('blood');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4 border border-gray-100"
              onPress={() => router.back()}
            >
              <FontAwesome5 name="arrow-left" size={16} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">
              Don de sang et moelle
            </Text>
          </View>

          {/* Tabs */}
          <View className="flex-row bg-white rounded-xl p-1 mb-6">
            <TouchableOpacity 
              className={`flex-1 py-3 px-4 rounded-lg ${activeTab === 'blood' ? 'bg-red-500' : ''}`}
              onPress={() => setActiveTab('blood')}
            >
              <Text className={`text-center font-medium ${activeTab === 'blood' ? 'text-white' : 'text-gray-700'}`}>
                Don du sang
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-3 px-4 rounded-lg ${activeTab === 'marrow' ? 'bg-red-500' : ''}`}
              onPress={() => setActiveTab('marrow')}
            >
              <Text className={`text-center font-medium ${activeTab === 'marrow' ? 'text-white' : 'text-gray-700'}`}>
                Moelle osseuse
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'blood' ? (
            <>
              <InfoCard
                title="Don du sang"
                content="Le don de sang est un acte généreux qui permet de sauver des vies. Un don peut aider jusqu'à 3 personnes différentes. Les besoins sont constants car la durée de vie des produits sanguins est limitée : 7 jours pour les plaquettes, 42 jours pour les globules rouges."
                icon="tint"
                color="#DC2626"
              />
              <InfoCard
                title="Qui peut donner ?"
                content="Vous pouvez donner si vous avez entre 18 et 70 ans, pesez plus de 50kg et êtes en bonne santé. Le don dure environ 45 minutes, dont 10 minutes pour le prélèvement."
                icon="user-check"
                color="#059669"
              />
              <Text className="text-xl font-bold text-gray-900 mb-4 mt-6">
                Centres de don
              </Text>
              {bloodCenters.map((center, index) => (
                <DonationCenter key={index} {...center} />
              ))}
            </>
          ) : (
            <>
              <InfoCard
                title="Don de moelle osseuse"
                content="Le don de moelle osseuse peut sauver la vie de personnes atteintes de maladies graves du sang. Chaque année, des milliers de personnes ont besoin d'une greffe de moelle osseuse pour guérir d'une leucémie ou d'autres maladies du sang."
                icon="bone"
                color="#DC2626"
              />
              <InfoCard
                title="Processus de don"
                content="L'inscription au registre des donneurs se fait après un entretien médical et une prise de sang. Le don effectif n'aura lieu que si votre compatibilité avec un patient est établie, ce qui est rare (1 chance sur 1 million)."
                icon="procedures"
                color="#059669"
              />
              <Text className="text-xl font-bold text-gray-900 mb-4 mt-6">
                Centres spécialisés
              </Text>
              {marrowCenters.map((center, index) => (
                <DonationCenter key={index} {...center} />
              ))}
            </>
          )}

          {/* Bouton d'action */}
          <TouchableOpacity
            className="bg-red-500 rounded-xl py-4 px-6 items-center mt-6"
            onPress={() => Linking.openURL('https://dondesang.efs.sante.fr/')}
          >
            <Text className="text-white text-lg font-medium">
              {activeTab === 'blood' ? 'Prendre RDV pour un don' : "S'inscrire comme donneur"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
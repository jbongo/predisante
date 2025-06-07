import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const ResultCard = ({ title, content, icon, color }: { title: string; content: string; icon: string; color: string }) => (
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

const riskLevels = {
  low: {
    title: "Risque faible",
    color: "#059669",
    icon: "check-circle"
  },
  moderate: {
    title: "Risque modéré",
    color: "#F59E0B",
    icon: "exclamation-circle"
  },
  high: {
    title: "Risque élevé",
    color: "#DC2626",
    icon: "exclamation-triangle"
  }
};

const lesionTypes = {
  benign_nevus: {
    title: "Grain de beauté bénin",
    description: "Un naevus (grain de beauté) normal sans signes suspects."
  },
  dysplastic_nevus: {
    title: "Naevus dysplasique",
    description: "Un grain de beauté atypique qui nécessite une surveillance."
  },
  melanoma: {
    title: "Mélanome suspect",
    description: "Une lésion présentant des caractéristiques suspectes nécessitant une évaluation urgente."
  }
};

export default function SkinCancerResults() {
  const router = useRouter();
  const { image, risk, type, advice } = useLocalSearchParams();

  const riskLevel = risk as keyof typeof riskLevels;
  const lesionType = type as keyof typeof lesionTypes;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View className="flex-1 px-6 pt-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100"
            onPress={() => router.push("/")}
          >
            <FontAwesome5 name="times" size={16} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">
            Résultats de l'analyse
          </Text>
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100"
            onPress={() => {/* Sauvegarder */}}
          >
            <FontAwesome5 name="save" size={16} color="#374151" />
          </TouchableOpacity>
        </View>

        <View className="items-center mb-6">
          <View className="bg-white p-2 rounded-2xl shadow-sm">
            <Image
              source={{ uri: image as string }}
              style={{ width: width - 40, height: width - 40 }}
              className="rounded-xl"
            />
          </View>
        </View>

        <ResultCard
          title={riskLevels[riskLevel].title}
          content={lesionTypes[lesionType].description}
          icon={riskLevels[riskLevel].icon}
          color={riskLevels[riskLevel].color}
        />

        <ResultCard
          title="Recommandation"
          content={advice as string}
          icon="user-md"
          color="#3B82F6"
        />

        <View className="flex-1" />

        <TouchableOpacity
          className="bg-blue-500 rounded-xl py-4 px-6 items-center mb-2"
          onPress={() => {/* Prendre RDV */}}
        >
          <Text className="text-white text-lg font-medium">
            Prendre rendez-vous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-xl py-4 px-6 items-center mb-6 border border-gray-200"
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="text-gray-700 text-lg font-medium">
            Retour à l'accueil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 
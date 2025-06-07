import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const InfoCard = ({ title, content, icon, color }: { title: string; content: string; icon: string; color: string }) => (
  <View className={`bg-white rounded-2xl p-6 mb-4 border-l-4`} style={{ borderLeftColor: color }}>
    <View className="flex-row items-center mb-3">
      <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3`} style={{ backgroundColor: `${color}20` }}>
        <FontAwesome5 name={icon} size={20} color={color} />
      </View>
      <Text className="text-gray-900 text-xl font-semibold">{title}</Text>
    </View>
    {content.split('\n').map((line, index) => (
      <Text key={index} className="text-gray-700 text-base leading-relaxed mb-1">
        {line}
      </Text>
    ))}
  </View>
);

export default function SkinCancerIntro() {
  const router = useRouter();

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
              Détection préliminaire des lésions cutanées
            </Text>
          </View>

          <InfoCard
            title="Comment ça marche ?"
            content="Cette fonctionnalité utilise une analyse d'image pour estimer le risque d'une tache sur la peau. L'intelligence artificielle examine la photo et fournit une évaluation préliminaire."
            icon="info-circle"
            color="#0EA5E9"
          />

          <InfoCard
            title="Important"
            content="Cette analyse ne remplace en aucun cas un diagnostic médical professionnel. En cas de doute, consultez toujours un dermatologue."
            icon="exclamation-triangle"
            color="#DC2626"
          />

          <InfoCard
            title="Conseils pour la photo"
            content={[
              "• Prenez la photo dans un endroit bien éclairé",
              "• Centrez la lésion dans l'image",
              "• Évitez le flou",
              "• Retirez les vêtements ou accessoires de la zone"
            ].join('\n')}
            icon="camera"
            color="#059669"
          />

          <TouchableOpacity
            className="bg-blue-500 rounded-xl py-4 px-6 items-center mt-6"
            onPress={() => router.push("/skin-cancer/capture")}
          >
            <Text className="text-white text-lg font-medium">
              Commencer l'analyse
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
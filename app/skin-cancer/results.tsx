import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

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
  },
  basal_cell_carcinoma: {
    title: "Carcinome basocellulaire",
    description: "Le carcinome basocellulaire est un type fréquent de cancer de la peau. Il évolue lentement et est rarement dangereux s'il est traité rapidement. Il apparaît souvent sur les zones exposées au soleil (visage, cou, oreilles…)."
  }
};

export default function SkinCancerResults() {
  const router = useRouter();
  const { image, risk, type, advice, confidence, additionalResults, description } = useLocalSearchParams();

  const riskLevel = risk as keyof typeof riskLevels;
  const lesionType = type as keyof typeof lesionTypes;
  const additionalResultsArray = additionalResults ? JSON.parse(additionalResults as string) : [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View className="flex-1">
        <View className="px-6 pt-6 pb-4 bg-white border-b border-gray-100">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
              onPress={() => router.push("/")}
            >
              <FontAwesome5 name="times" size={16} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">
              Résultats de l'analyse
            </Text>
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
              onPress={() => {/* Sauvegarder */}}
            >
              <FontAwesome5 name="save" size={16} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 py-4">
            <View className="items-center mb-6">
              <View className="bg-white p-2 rounded-2xl shadow-sm">
                <Image
                  source={{ uri: image as string }}
                  style={{ width: width * 0.7, height: width * 0.7 }}
                  className="rounded-xl"
                />
              </View>
            </View>

            <View className="space-y-6">
              <View className="bg-white rounded-2xl p-6 shadow-sm">
                <Text className="text-2xl font-bold text-gray-900 mb-6">
                  ✅ Résultat de l'analyse
                </Text>
                <Text className="text-gray-700 text-base leading-relaxed mb-6">
                  🖼️ L'image que vous avez envoyée a été analysée par notre intelligence artificielle spécialisée dans la détection des maladies de la peau.
                </Text>

                <View className="bg-blue-50 rounded-xl p-4 mb-6">
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    🔍 Résultat principal
                  </Text>
                  <Text className="text-gray-700 text-lg font-medium mb-2">
                    Probable diagnostic : {lesionTypes[lesionType].title}
                  </Text>
                  <Text className="text-blue-600 text-lg font-medium">
                    🔸 Fiabilité estimée : {confidence}%
                  </Text>
                </View>

                <View className="mb-6">
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    ℹ️ Que signifie cela ?
                  </Text>
                  <Text className="text-gray-700 text-base leading-relaxed">
                    {description as string || lesionTypes[lesionType].description}
                  </Text>
                </View>

                <View className="bg-yellow-50 rounded-xl p-4 mb-6">
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    🧭 Que faire maintenant ?
                  </Text>
                  <Text className="text-gray-700 text-base leading-relaxed">
                    Même si l'IA donne un indice, seul un professionnel de santé peut poser un diagnostic fiable.
                  </Text>
                </View>

                <View className="bg-green-50 rounded-xl p-4 mb-6">
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    ✅ Recommandation
                  </Text>
                  <Text className="text-gray-700 text-base leading-relaxed">
                    {advice as string}
                  </Text>
                </View>

                {additionalResultsArray.length > 0 && (
                  <View className="bg-gray-50 rounded-xl p-4">
                    <Text className="text-xl font-bold text-gray-900 mb-3">
                      📌 Autres résultats détectés
                    </Text>
                    <Text className="text-gray-500 text-sm mb-2">
                      (faible probabilité)
                    </Text>
                    {additionalResultsArray.map((result: any, index: number) => (
                      <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <Text className="text-gray-700 text-base">
                          {result.name}
                        </Text>
                        <Text className="text-gray-900 font-medium">
                          {result.probability}%
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="px-6 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            className="bg-blue-500 rounded-xl py-4 px-6 items-center mb-2"
            onPress={() => {/* Prendre RDV */}}
          >
            <Text className="text-white text-lg font-medium">
              Prendre rendez-vous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-xl py-4 px-6 items-center border border-gray-200"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-gray-700 text-lg font-medium">
              Retour à l'accueil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 
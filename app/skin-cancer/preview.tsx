import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function SkinCancerPreview() {
  const router = useRouter();
  const { image } = useLocalSearchParams();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simuler une analyse
    setTimeout(() => {
      router.push({
        pathname: "./results",
        params: { 
          image,
          risk: "high",
          type: "basal_cell_carcinoma",
          advice: "Prenez rendez-vous avec un dermatologue dès que possible",
          confidence: "69",
          additionalResults: JSON.stringify([
            { name: "Kératose actinique", probability: "25" },
            { name: "Mélanome", probability: "2.6" },
            { name: "Grain de beauté bénin", probability: "2.4" },
            { name: "Lésion vasculaire", probability: "0.5" }
          ]),
          description: "Le carcinome basocellulaire est un type fréquent de cancer de la peau. Il évolue lentement et est rarement dangereux s'il est traité rapidement. Il apparaît souvent sur les zones exposées au soleil (visage, cou, oreilles…)."
        }
      });
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View className="flex-1 px-6 pt-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100"
            onPress={() => router.back()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">
            Prévisualisation
          </Text>
          <View className="w-10 h-10" />
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

        <View className="space-y-4">
          <TouchableOpacity
            className="bg-white rounded-xl p-4 flex-row items-center border border-gray-200"
          >
            <View className="w-10 h-10 rounded-lg bg-blue-50 items-center justify-center mr-4">
              <FontAwesome5 name="crop" size={20} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-medium text-lg">
                Recadrer l'image
              </Text>
              <Text className="text-gray-500">
                Ajustez le cadrage pour centrer la lésion
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-xl p-4 flex-row items-center border border-gray-200"
          >
            <View className="w-10 h-10 rounded-lg bg-blue-50 items-center justify-center mr-4">
              <FontAwesome5 name="circle" size={20} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-medium text-lg">
                Délimiter la tache
              </Text>
              <Text className="text-gray-500">
                Dessinez un cercle autour de la lésion
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-1" />

        <TouchableOpacity
          className={`rounded-xl py-4 px-6 items-center mb-6 ${isAnalyzing ? 'bg-gray-400' : 'bg-blue-500'}`}
          onPress={handleAnalyze}
          disabled={isAnalyzing}
        >
          <Text className="text-white text-lg font-medium">
            {isAnalyzing ? 'Analyse en cours...' : 'Analyser l\'image'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function SkinCancerCapture() {
  const router = useRouter();

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Vous devez autoriser l'accès à la caméra pour utiliser cette fonctionnalité");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "./preview",
        params: { image: result.assets[0].uri }
      });
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Vous devez autoriser l'accès à la galerie pour utiliser cette fonctionnalité");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "./preview",
        params: { image: result.assets[0].uri }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View className="flex-1 px-6 pt-6">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4 border border-gray-100"
            onPress={() => router.back()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">
            Choisir une image
          </Text>
        </View>

        <View className="flex-1 justify-center space-y-6">
          <TouchableOpacity
            className="bg-blue-500 rounded-2xl p-6 items-center"
            onPress={takePicture}
          >
            <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-4">
              <FontAwesome5 name="camera" size={32} color="#FFFFFF" />
            </View>
            <Text className="text-white text-xl font-medium">
              Prendre une photo
            </Text>
            <Text className="text-white/80 text-base mt-2 text-center">
              Utilisez votre appareil photo pour capturer la lésion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-2xl p-6 items-center border border-gray-200"
            onPress={pickImage}
          >
            <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center mb-4">
              <FontAwesome5 name="images" size={32} color="#3B82F6" />
            </View>
            <Text className="text-gray-900 text-xl font-medium">
              Choisir dans la galerie
            </Text>
            <Text className="text-gray-600 text-base mt-2 text-center">
              Sélectionnez une photo existante de votre appareil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 
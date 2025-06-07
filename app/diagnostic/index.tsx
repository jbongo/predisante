import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
  title: string;
  icon: string;
  emoji: string;
  route: string;
}

const CategoryCard = ({ title, icon, emoji, route }: CategoryCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      className="w-full mb-4"
      onPress={() => router.push(route as any)}
    >
      <View className="flex-row items-center bg-white rounded-2xl p-4 border border-gray-100">
        <View className="w-12 h-12 rounded-xl bg-gray-50 items-center justify-center mr-4">
          <Text className="text-2xl">{emoji}</Text>
        </View>
        <Text className="text-gray-900 text-lg flex-1">{title}</Text>
        <FontAwesome5 name="chevron-right" size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

export default function Diagnostic() {
  const router = useRouter();
  const categories: CategoryCardProps[] = [
    {
      title: 'Tête / Neurologie',
      icon: 'brain',
      emoji: '🧠',
      route: '/diagnostic/symptoms?category=head'
    },
    {
      title: 'Yeux / Ophtalmologie',
      icon: 'eye',
      emoji: '👁️',
      route: '/diagnostic/symptoms?category=eyes'
    },
    {
      title: 'Oreilles / ORL',
      icon: 'ear',
      emoji: '👂',
      route: '/diagnostic/symptoms?category=ears'
    },
    {
      title: 'Nez / ORL',
      icon: 'nose',
      emoji: '👃',
      route: '/diagnostic/symptoms?category=nose'
    },
    {
      title: 'Bouche / Dents',
      icon: 'tooth',
      emoji: '👄',
      route: '/diagnostic/symptoms?category=mouth'
    },
    {
      title: 'Poitrine / Thorax',
      icon: 'heart',
      emoji: '❤️',
      route: '/diagnostic/symptoms?category=chest'
    },
    {
      title: 'Estomac / Digestion',
      icon: 'stomach',
      emoji: '🤢',
      route: '/diagnostic/symptoms?category=stomach'
    },
    {
      title: 'Mains / Bras',
      icon: 'hand',
      emoji: '👋',
      route: '/diagnostic/symptoms?category=arms'
    },
    {
      title: 'Pieds / Jambes',
      icon: 'shoe-prints',
      emoji: '🦶',
      route: '/diagnostic/symptoms?category=legs'
    },
    {
      title: 'Peau / Dermatologie',
      icon: 'user',
      emoji: '🧍',
      route: '/diagnostic/symptoms?category=skin'
    },
    {
      title: 'Appareil génital',
      icon: 'venus',
      emoji: '♀️',
      route: '/diagnostic/symptoms?category=genital'
    },
    {
      title: 'Général / Fièvre / Fatigue',
      icon: 'pills',
      emoji: '💊',
      route: '/diagnostic/symptoms?category=general'
    },
    {
      title: 'Autre / Je ne sais pas',
      icon: 'question',
      emoji: '❓',
      route: '/diagnostic/symptoms?category=other'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-2">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4 border border-gray-100"
              onPress={() => router.back()}
            >
              <FontAwesome5 name="arrow-left" size={16} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">
              Prédiagnostic
            </Text>
          </View>
          <Text className="text-gray-500 text-lg mb-6">
            Sélectionnez la zone concernée
          </Text>

          {/* Barre de progression */}
          <View className="h-2 bg-gray-100 rounded-full mb-8">
            <View className="h-2 bg-blue-500 rounded-full w-1/4" />
          </View>

          {/* Liste des catégories */}
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { ColorValue } from 'react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: [string, string];
  route: '/diagnostic' | '/(tabs)/prevention' | '/skin-cancer' | '/donation';
}

const ActionCard = ({ title, description, icon, gradient, route }: ActionCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      className="w-full mb-4" 
      onPress={() => router.push(route as any)}
    >
      <LinearGradient
        colors={gradient as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6 rounded-2xl"
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <FontAwesome5 name={icon} size={24} color="white" />
          </View>
          <Text className="text-white text-xl font-bold ml-4">{title}</Text>
        </View>
        <Text className="text-white/90 text-base">{description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Home() {
  const actions: ActionCardProps[] = [
    {
      title: 'Prédiagnostic',
      description: 'Évaluez vos symptômes et recevez des recommandations personnalisées',
      icon: 'stethoscope',
      gradient: ['#00C6FB', '#005BEA'],
      route: '/diagnostic'
    },
    {
      title: 'Prévention',
      description: 'Calendrier de santé et recommandations préventives',
      icon: 'heart',
      gradient: ['#FF512F', '#DD2476'],
      route: '/(tabs)/prevention'
    },
    {
      title: 'Détection cancer de peau',
      description: 'Analysez vos grains de beauté et lésions cutanées',
      icon: 'camera',
      gradient: ['#11998e', '#38ef7d'],
      route: '/skin-cancer'
    },
    {
      title: 'Dons',
      description: 'Donnez votre sang ou rejoignez le registre de moelle osseuse',
      icon: 'hand-holding-heart',
      gradient: ['#6B73FF', '#000DFF'],
      route: '/donation'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* En-tête avec fond dégradé */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED'] as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-16 pb-8"
      >
        <Text className="text-white text-3xl font-bold mb-2">
          Bienvenue sur PrédiSanté
        </Text>
        <Text className="text-white/80 text-lg">
          Votre compagnon santé intelligent
        </Text>
      </LinearGradient>

      {/* Section principale avec les cartes d'action */}
      <View className="px-6 py-8">
        <Text className="text-gray-800 text-xl font-semibold mb-6">
          Que souhaitez-vous faire ?
        </Text>
        
        {actions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </View>

      {/* Section d'urgence */}
      <View className="px-6 pb-8">
        <TouchableOpacity className="bg-red-50 p-4 rounded-xl flex-row items-center">
          <View className="bg-red-100 p-3 rounded-full">
            <FontAwesome5 name="phone" size={20} color="#DC2626" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-red-700 font-semibold text-lg">
              Urgence médicale ?
            </Text>
            <Text className="text-red-600">
              Composez le 15 immédiatement
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} 
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
  iconColor: string;
  route: '/diagnostic' | '/(tabs)/prevention' | '/skin-cancer' | '/donation';
}

const ActionCard = ({ title, description, icon, backgroundColor, iconColor, route }: ActionCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      className="w-[47%] aspect-square mb-4"
      onPress={() => router.push(route as any)}
    >
      <View style={{ backgroundColor }} className="w-full h-full rounded-[28px] p-6 justify-between">
        <View className="bg-white/20 w-14 h-14 rounded-2xl items-center justify-center">
          <FontAwesome5 name={icon} size={26} color="#FFFFFF" />
        </View>
        <View>
          <Text className="text-white text-xl font-bold mb-1 leading-tight">{title}</Text>
          <Text className="text-white/90 text-sm leading-tight">{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DisclaimerCard = () => (
  <View className="bg-gray-50 rounded-[28px] p-5 mb-6">
    <View className="flex-row items-start mb-3">
      <View className="bg-gray-100 p-2 rounded-xl mr-3">
        <FontAwesome5 name="info-circle" size={20} color="#374151" />
      </View>
      <Text className="text-gray-900 font-bold text-lg flex-1">
        Information importante
      </Text>
    </View>
    <Text className="text-gray-700 leading-5">
      Cette application ne remplace en aucun cas une consultation médicale professionnelle. 
      Elle est conçue pour vous guider et vous informer, mais ne constitue pas un diagnostic médical. 
      En cas de doute ou d'urgence, consultez immédiatement un professionnel de santé.
    </Text>
  </View>
);

export default function Home() {
  const actions: ActionCardProps[] = [
    {
      title: 'Prédiagnostic',
      description: 'Évaluez vos symptômes',
      icon: 'stethoscope',
      backgroundColor: '#ef4444',
      iconColor: '#FFFFFF',
      route: '/diagnostic'
    },
    {
      title: 'Prévention',
      description: 'Calendrier de santé',
      icon: 'heart',
      backgroundColor: '#c026d3',
      iconColor: '#FFFFFF',
      route: '/(tabs)/prevention'
    },
    {
      title: 'Cancer de peau',
      description: 'Analysez vos grains de beauté',
      icon: 'camera',
      backgroundColor: '#0ea5e9' ,
      iconColor: '#FFFFFF',
      route: '/skin-cancer'
    },
    {
      title: 'Dons',
      description: 'Sang et moelle osseuse',
      icon: 'hand-holding-heart',
      backgroundColor: '#84cc16',
      iconColor: '#FFFFFF',
      route: '/donation'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView className="flex-1">
        {/* En-tête moderne */}
        <View className="px-6 pt-6 pb-8">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <FontAwesome5 name="bell" size={18} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <FontAwesome5 name="user" size={18} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">
              Bonjour Bongo Jean👋
            </Text>
            <Text className="text-gray-500 text-lg">
              Que pouvons-nous faire pour vous ?
            </Text>
          </View>
        </View>

        {/* Section principale */}
        <View className="px-6">
          <View className="flex-row flex-wrap justify-between">
            {actions.map((action, index) => (
              <ActionCard key={index} {...action} />
            ))}
          </View>

          {/* Disclaimer */}
          <DisclaimerCard />

          {/* Section d'urgence */}
          <TouchableOpacity className="bg-red-50 rounded-[28px] p-5 mb-6">
            <View className="flex-row items-center">
              <View className="w-14 h-14 rounded-2xl bg-red-100 items-center justify-center">
                <FontAwesome5 name="phone" size={24} color="#DC2626" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-red-700 font-bold text-xl">
                  Urgence médicale ?
                </Text>
                <Text className="text-red-600 mt-1 text-base">
                  Composez le 15 immédiatement
                </Text>
              </View>
              <FontAwesome5 name="chevron-right" size={20} color="#DC2626" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
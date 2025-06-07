import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

interface SymptomCardProps {
  title: string;
  icon: string;
  symptomId: string;
}

const SymptomCard = ({ title, icon, symptomId }: SymptomCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/diagnostic/questions?symptom=${symptomId}`);
  };

  return (
    <TouchableOpacity 
      className="w-full mb-4"
      onPress={handlePress}
    >
      <View className="flex-row items-center bg-white rounded-2xl p-4 border border-gray-100">
        <View className="w-12 h-12 rounded-xl bg-blue-50 items-center justify-center mr-4">
          <FontAwesome5 name={icon} size={24} color="#3B82F6" />
        </View>
        <Text className="text-gray-900 text-lg flex-1">{title}</Text>
        <FontAwesome5 name="chevron-right" size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

const symptoms = {
  head: [
    {
      title: 'Maux de tête',
      icon: 'head-side-virus',
      symptomId: 'headache'
    },
    {
      title: 'Vertiges',
      icon: 'dizzy',
      symptomId: 'dizziness'
    },
    {
      title: 'Troubles de la mémoire',
      icon: 'brain',
      symptomId: 'memory'
    },
    {
      title: 'Troubles de l\'équilibre',
      icon: 'walking',
      symptomId: 'balance'
    }
  ],
  eyes: [
    {
      title: 'Vision trouble',
      icon: 'eye-slash',
      symptomId: 'blurred_vision'
    },
    {
      title: 'Yeux rouges',
      icon: 'eye',
      symptomId: 'red_eyes'
    },
    {
      title: 'Douleurs oculaires',
      icon: 'eye-dropper',
      symptomId: 'eye_pain'
    }
  ],
  ears: [
    {
      title: 'Douleurs aux oreilles',
      icon: 'deaf',
      symptomId: 'ear_pain'
    },
    {
      title: 'Acouphènes',
      icon: 'volume-up',
      symptomId: 'tinnitus'
    },
    {
      title: 'Perte d\'audition',
      icon: 'deaf',
      symptomId: 'hearing_loss'
    }
  ],
  nose: [
    {
      title: 'Nez bouché',
      icon: 'head-side-mask',
      symptomId: 'stuffy_nose'
    },
    {
      title: 'Saignements de nez',
      icon: 'tint',
      symptomId: 'nosebleed'
    },
    {
      title: 'Perte d\'odorat',
      icon: 'nose',
      symptomId: 'smell_loss'
    }
  ],
  mouth: [
    {
      title: 'Mal de dents',
      icon: 'tooth',
      symptomId: 'toothache'
    },
    {
      title: 'Gencives qui saignent',
      icon: 'teeth-open',
      symptomId: 'bleeding_gums'
    },
    {
      title: 'Aphtes',
      icon: 'dot-circle',
      symptomId: 'mouth_ulcers'
    }
  ],
  chest: [
    {
      title: 'Douleurs thoraciques',
      icon: 'heart-broken',
      symptomId: 'chest_pain'
    },
    {
      title: 'Difficultés à respirer',
      icon: 'lungs',
      symptomId: 'breathing'
    },
    {
      title: 'Toux',
      icon: 'head-side-cough',
      symptomId: 'cough'
    },
    {
      title: 'Palpitations',
      icon: 'heartbeat',
      symptomId: 'palpitations'
    }
  ],
  stomach: [
    {
      title: 'Douleurs abdominales',
      icon: 'user-injured',
      symptomId: 'stomach_pain'
    },
    {
      title: 'Nausées / Vomissements',
      icon: 'head-side-mask',
      symptomId: 'nausea'
    },
    {
      title: 'Diarrhée',
      icon: 'toilet',
      symptomId: 'diarrhea'
    },
    {
      title: 'Constipation',
      icon: 'stop-circle',
      symptomId: 'constipation'
    }
  ],
  skin: [
    {
      title: 'Bouton ou éruption',
      icon: 'dot-circle',
      symptomId: 'rash'
    },
    {
      title: 'Rougeur ou irritation',
      icon: 'fire',
      symptomId: 'irritation'
    },
    {
      title: 'Démangeaisons',
      icon: 'hand-paper',
      symptomId: 'itching'
    },
    {
      title: 'Tache noire ou suspecte',
      icon: 'circle',
      symptomId: 'spot'
    },
    {
      title: 'Brûlure',
      icon: 'fire-alt',
      symptomId: 'burn'
    },
    {
      title: 'Plaie',
      icon: 'band-aid',
      symptomId: 'wound'
    }
  ],
  arms: [
    {
      title: 'Douleurs articulaires',
      icon: 'bone',
      symptomId: 'joint_pain_arms'
    },
    {
      title: 'Faiblesse musculaire',
      icon: 'dumbbell',
      symptomId: 'muscle_weakness_arms'
    },
    {
      title: 'Engourdissements',
      icon: 'hand-paper',
      symptomId: 'numbness_arms'
    }
  ],
  legs: [
    {
      title: 'Douleurs articulaires',
      icon: 'bone',
      symptomId: 'joint_pain_legs'
    },
    {
      title: 'Crampes',
      icon: 'walking',
      symptomId: 'leg_cramps'
    },
    {
      title: 'Gonflement',
      icon: 'expand',
      symptomId: 'swelling_legs'
    }
  ],
  general: [
    {
      title: 'Fièvre',
      icon: 'thermometer-full',
      symptomId: 'fever'
    },
    {
      title: 'Fatigue',
      icon: 'bed',
      symptomId: 'fatigue'
    },
    {
      title: 'Perte d\'appétit',
      icon: 'utensils',
      symptomId: 'appetite_loss'
    },
    {
      title: 'Perte de poids',
      icon: 'weight',
      symptomId: 'weight_loss'
    }
  ]
};

const categoryTitles = {
  skin: 'Peau / Dermatologie',
  head: 'Tête / Neurologie',
  eyes: 'Yeux / Ophtalmologie',
  ears: 'Oreilles / ORL',
  nose: 'Nez / ORL',
  mouth: 'Bouche / Dents',
  chest: 'Poitrine / Thorax',
  stomach: 'Estomac / Digestion',
  arms: 'Mains / Bras',
  legs: 'Pieds / Jambes',
  genital: 'Appareil génital',
  general: 'Général / Fièvre / Fatigue',
  other: 'Autre / Je ne sais pas'
};

export default function Symptoms() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const currentCategory = category as keyof typeof symptoms;

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
              {categoryTitles[currentCategory]}
            </Text>
          </View>
          <Text className="text-gray-500 text-lg mb-6">
            Quel est votre principal symptôme ?
          </Text>

          {/* Barre de progression */}
          <View className="h-2 bg-gray-100 rounded-full mb-8">
            <View className="h-2 bg-blue-500 rounded-full w-2/4" />
          </View>

          {/* Liste des symptômes */}
          {symptoms[currentCategory]?.map((symptom, index) => (
            <SymptomCard key={index} {...symptom} />
          )) || (
            <Text className="text-gray-500 text-center py-4">
              Cette catégorie sera bientôt disponible
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const ResultSection = ({ title, content, icon, color }: { title: string; content: string; icon: string; color: string }) => (
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

const ActionButton = ({ title, onPress, icon, primary = false }: { title: string; onPress: () => void; icon: string; primary?: boolean }) => (
  <TouchableOpacity
    className={`flex-row items-center justify-center py-4 px-6 rounded-xl mb-3 ${
      primary ? 'bg-blue-500' : 'bg-white border border-gray-200'
    }`}
    onPress={onPress}
  >
    <FontAwesome5 
      name={icon} 
      size={16} 
      color={primary ? '#FFFFFF' : '#374151'} 
      style={{ marginRight: 8 }}
    />
    <Text className={primary ? 'text-white font-medium' : 'text-gray-700'}>
      {title}
    </Text>
  </TouchableOpacity>
);

// Fonction pour analyser les réponses et déterminer l'urgence
const analyzeAnswers = (symptom: string, answers: Record<string, string>) => {
  let urgencyLevel = "faible";
  let recommendation = "Surveillance à domicile conseillée";
  let details = "";

  // Analyse spécifique selon le symptôme
  switch (symptom) {
    case "chest_pain":
      if (
        answers[0] === "Oppression/serrement" &&
        (answers[1] === "Vers le bras gauche" || answers[1] === "Vers la mâchoire") &&
        answers[2] === "L'effort physique"
      ) {
        urgencyLevel = "très élevé";
        recommendation = "Appelez immédiatement le 15";
        details = "Les symptômes suggèrent un possible problème cardiaque nécessitant une prise en charge immédiate.";
      }
      break;

    case "headache":
      if (
        answers[0] === "Moins de 4 heures" &&
        answers[1] === "Très intense/insupportable"
      ) {
        urgencyLevel = "modéré";
        recommendation = "Consultation médicale dans la journée recommandée";
        details = "L'intensité des maux de tête nécessite une évaluation médicale rapide.";
      }
      break;

    case "breathing":
      if (answers[0] === "Essoufflement au repos" || answers[0] === "Sensation d'étouffement") {
        urgencyLevel = "élevé";
        recommendation = "Consultation médicale urgente nécessaire";
        details = "Les difficultés respiratoires au repos nécessitent une évaluation médicale rapide.";
      }
      break;

    case "fever":
      if (answers[0] === "Plus de 40°C") {
        urgencyLevel = "élevé";
        recommendation = "Consultation médicale urgente nécessaire";
        details = "Une température très élevée nécessite une évaluation médicale rapide.";
      } else if (answers[0] === "39-40°C" && answers[1] === "Plus d'une semaine") {
        urgencyLevel = "modéré";
        recommendation = "Consultation médicale recommandée";
        details = "La persistance de la fièvre nécessite une évaluation médicale.";
      }
      break;

    case "rash":
      if (
        answers[1] === "Cloques" &&
        answers[2] === "Oui, rapidement"
      ) {
        urgencyLevel = "modéré à élevé";
        recommendation = "Consultation médicale rapide recommandée";
        details = "L'extension rapide et la présence de cloques nécessitent une évaluation médicale.";
      }
      break;
  }

  return { urgencyLevel, recommendation, details };
};

export default function DiagnosticResults() {
  const router = useRouter();
  const { answers, symptom } = useLocalSearchParams();
  const parsedAnswers = answers ? JSON.parse(answers as string) : {};
  
  const { urgencyLevel, recommendation, details } = analyzeAnswers(symptom as string, parsedAnswers);

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "très élevé":
        return "#DC2626"; // red-600
      case "élevé":
        return "#EA580C"; // orange-600
      case "modéré à élevé":
        return "#F59E0B"; // amber-500
      case "modéré":
        return "#F59E0B"; // amber-500
      default:
        return "#10B981"; // emerald-500
    }
  };

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
              Résultats
            </Text>
          </View>
          <Text className="text-gray-500 text-lg mb-6">
            Voici notre analyse basée sur vos réponses
          </Text>

          {/* Barre de progression complète */}
          <View className="h-2 bg-gray-100 rounded-full mb-8">
            <View className="h-2 bg-blue-500 rounded-full w-full" />
          </View>

          {/* Sections de résultats */}
          <ResultSection
            title="Niveau d'urgence"
            content={`Le niveau d'urgence est ${urgencyLevel}. ${recommendation}.`}
            icon="exclamation-circle"
            color={getUrgencyColor(urgencyLevel)}
          />

          <ResultSection
            title="Analyse détaillée"
            content={details || "Surveillez l'évolution de vos symptômes. Consultez un médecin si votre état s'aggrave."}
            icon="clipboard-list"
            color="#3B82F6"
          />

          <ResultSection
            title="⚠️ Important"
            content="Ce prédiagnostic ne remplace pas l'avis d'un professionnel de santé. En cas de doute ou d'aggravation, contactez immédiatement le 15 ou rendez-vous aux urgences."
            icon="info-circle"
            color="#EF4444"
          />

          {/* Actions */}
          <View className="mt-6">
            {urgencyLevel === "très élevé" ? (
              <ActionButton
                title="Appeler le 15"
                onPress={() => {/* Implémenter l'appel */}}
                icon="phone"
                primary
              />
            ) : (
              <ActionButton
                title="Prendre rendez-vous"
                onPress={() => {/* Implémenter la prise de rendez-vous */}}
                icon="calendar-alt"
                primary
              />
            )}
            <ActionButton
              title="Enregistrer le résultat"
              onPress={() => {/* Implémenter la sauvegarde */}}
              icon="save"
            />
            <ActionButton
              title="Retour à l'accueil"
              onPress={() => router.push("/")}
              icon="home"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
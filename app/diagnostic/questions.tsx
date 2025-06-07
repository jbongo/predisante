import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}

const Question = ({ question, options, onAnswer, selectedAnswer }: QuestionProps) => {
  return (
    <View className="mb-8">
      <Text className="text-gray-900 text-lg font-medium mb-4">{question}</Text>
      <View className="space-y-3">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`p-4 rounded-xl border ${
              selectedAnswer === option
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200'
            }`}
            onPress={() => onAnswer(option)}
          >
            <Text
              className={`text-lg ${
                selectedAnswer === option ? 'text-blue-700' : 'text-gray-700'
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const questions = {
  headache: [
    {
      question: "Depuis combien de temps avez-vous mal à la tête ?",
      options: [
        "Moins de 4 heures",
        "4-24 heures",
        "1-3 jours",
        "Plus de 3 jours",
        "Chronique (régulièrement)"
      ]
    },
    {
      question: "Comment décririez-vous la douleur ?",
      options: [
        "Pulsatile/battante",
        "Pression/étau",
        "Lancinante/perçante",
        "Diffuse"
      ]
    },
    {
      question: "Où est localisée la douleur ?",
      options: [
        "Un seul côté",
        "Les deux côtés",
        "Front",
        "Arrière de la tête",
        "Toute la tête"
      ]
    },
    {
      question: "Avez-vous des symptômes associés ?",
      options: [
        "Nausées/vomissements",
        "Sensibilité à la lumière",
        "Sensibilité au bruit",
        "Troubles de la vision",
        "Aucun"
      ]
    }
  ],
  chest_pain: [
    {
      question: "Comment décririez-vous la douleur ?",
      options: [
        "Oppression/serrement",
        "Brûlure",
        "Point/piqûre",
        "Diffuse"
      ]
    },
    {
      question: "La douleur irradie-t-elle ?",
      options: [
        "Vers le bras gauche",
        "Vers la mâchoire",
        "Vers le dos",
        "Non, reste localisée"
      ]
    },
    {
      question: "Qu'est-ce qui déclenche ou aggrave la douleur ?",
      options: [
        "L'effort physique",
        "Le stress/l'anxiété",
        "Les repas",
        "La respiration profonde",
        "Rien de particulier"
      ]
    },
    {
      question: "Avez-vous des symptômes associés ?",
      options: [
        "Essoufflement",
        "Sueurs",
        "Nausées",
        "Palpitations",
        "Aucun"
      ]
    }
  ],
  fever: [
    {
      question: "Quelle est votre température ?",
      options: [
        "37.5-38°C",
        "38-38.5°C",
        "38.5-39°C",
        "39-40°C",
        "Plus de 40°C",
        "Je ne sais pas"
      ]
    },
    {
      question: "Depuis combien de temps avez-vous de la fièvre ?",
      options: [
        "Moins de 24h",
        "1-3 jours",
        "4-7 jours",
        "Plus d'une semaine"
      ]
    },
    {
      question: "La fièvre baisse-t-elle avec les médicaments ?",
      options: [
        "Oui, complètement",
        "Oui, partiellement",
        "Non, pas du tout",
        "Je n'ai pas pris de médicaments"
      ]
    },
    {
      question: "Avez-vous des symptômes associés ?",
      options: [
        "Toux",
        "Maux de gorge",
        "Courbatures",
        "Maux de tête",
        "Diarrhée",
        "Plusieurs de ces symptômes"
      ]
    }
  ],
  rash: [
    {
      question: "Depuis combien de temps avez-vous ce symptôme ?",
      options: [
        "Moins de 24 heures",
        "1-3 jours",
        "4-7 jours",
        "Plus d'une semaine",
        "Plus d'un mois"
      ]
    },
    {
      question: "Quelle est l'apparence de l'éruption ?",
      options: [
        "Plaques rouges",
        "Petits boutons",
        "Cloques",
        "Desquamation (peau qui pèle)",
        "Points rouges"
      ]
    },
    {
      question: "Le symptôme s'étend-il ?",
      options: [
        "Non, reste stable",
        "Oui, légèrement",
        "Oui, rapidement",
        "Je ne sais pas"
      ]
    },
    {
      question: "Est-ce que ça démange ?",
      options: [
        "Pas du tout",
        "Légèrement",
        "Modérément",
        "Très fortement"
      ]
    },
    {
      question: "Avez-vous identifié un déclencheur possible ?",
      options: [
        "Contact avec une plante",
        "Nouveau produit (cosmétique, lessive...)",
        "Aliment",
        "Médicament",
        "Aucun déclencheur identifié"
      ]
    }
  ],
  breathing: [
    {
      question: "Comment décririez-vous votre difficulté à respirer ?",
      options: [
        "Essoufflement à l'effort",
        "Essoufflement au repos",
        "Sensation d'étouffement",
        "Respiration sifflante"
      ]
    },
    {
      question: "Depuis combien de temps avez-vous ce symptôme ?",
      options: [
        "Quelques heures",
        "Quelques jours",
        "Quelques semaines",
        "Chronique"
      ]
    },
    {
      question: "Qu'est-ce qui aggrave les symptômes ?",
      options: [
        "L'effort physique",
        "La position allongée",
        "Certains moments de la journée",
        "Le stress/l'anxiété",
        "Rien de particulier"
      ]
    },
    {
      question: "Avez-vous des antécédents ?",
      options: [
        "Asthme",
        "Allergie",
        "Problème cardiaque",
        "COVID-19",
        "Aucun"
      ]
    }
  ]
  // ... Ajoutez d'autres symptômes selon le même modèle
};

export default function DiagnosticQuestions() {
  const router = useRouter();
  const { symptom } = useLocalSearchParams();
  const currentSymptom = symptom as keyof typeof questions;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestions = questions[currentSymptom] || [];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      router.push({
        pathname: "/diagnostic/results",
        params: { 
          answers: JSON.stringify(answers),
          symptom: symptom as string
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      router.push("/diagnostic/symptoms");
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
              onPress={handlePrevious}
            >
              <FontAwesome5 name="arrow-left" size={16} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">
              Questions complémentaires
            </Text>
          </View>
          <Text className="text-gray-500 text-lg mb-6">
            Question {currentQuestionIndex + 1} sur {currentQuestions.length}
          </Text>

          {/* Barre de progression */}
          <View className="h-2 bg-gray-100 rounded-full mb-8">
            <View 
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </View>

          {/* Question courante */}
          {currentQuestions[currentQuestionIndex] && (
            <Question
              {...currentQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              selectedAnswer={answers[currentQuestionIndex]}
            />
          )}

          {/* Bouton suivant */}
          {answers[currentQuestionIndex] && (
            <TouchableOpacity
              className="bg-blue-500 rounded-xl py-4 px-6 items-center"
              onPress={handleNext}
            >
              <Text className="text-white text-lg font-medium">
                {currentQuestionIndex < currentQuestions.length - 1 ? 'Suivant' : 'Voir le résultat'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
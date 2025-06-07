import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#4F46E5' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      presentation: 'modal'
    }}>
      <Stack.Screen 
        name="skin-cancer" 
        options={{ 
          title: 'Détection cancer de peau',
          headerBackTitle: 'Retour'
        }} 
      />
      <Stack.Screen 
        name="donation" 
        options={{ 
          title: 'Dons',
          headerBackTitle: 'Retour'
        }} 
      />
    </Stack>
  );
} 
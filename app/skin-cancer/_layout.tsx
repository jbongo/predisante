import { Stack } from 'expo-router';

export default function SkinCancerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="capture" />
      <Stack.Screen name="preview" />
      <Stack.Screen name="results" />
    </Stack>
  );
} 
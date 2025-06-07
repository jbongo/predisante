import { Stack } from 'expo-router';
import React from 'react';

export default function PreventionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="history" />
      <Stack.Screen name="reminders" />
    </Stack>
  );
} 
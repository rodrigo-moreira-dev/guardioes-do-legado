// app/_layout.tsx
import { Stack } from "expo-router";
import RootLayout from "./components/RootLayout";

export default function AppLayout() {
  return (
    <RootLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* Adicione outras telas se necessário */}
      </Stack>
    </RootLayout>
  );
}

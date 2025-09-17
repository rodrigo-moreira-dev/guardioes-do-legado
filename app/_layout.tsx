// app/_layout.tsx (alternativa com controle preciso)
import { Stack } from "expo-router";
import { useState } from "react";
import RootLayout from "./components/RootLayout";
import SplashScreen from "./components/SplashScreen";

export default function AppLayout() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <RootLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RootLayout>
  );
}

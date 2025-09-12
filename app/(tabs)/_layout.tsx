import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

const tabConfig = {
  index: {
    title: "Pergaminhos",
    icon: "scroll" as const,
  },
  b: {
    title: "Missões",
    icon: "tasks" as const,
  },
  c: {
    title: "Desafio",
    icon: "trophy" as const,
  },
  d: {
    title: "Recompensas",
    icon: "gift" as const,
  },
  e: {
    title: "Informativos",
    icon: "info-circle" as const,
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const tabName = route.name as keyof typeof tabConfig;
        const config = tabConfig[tabName];

        return {
          title: config.title,
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name={config.icon} color={color} />
          ),
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
        };
      }}
    />
  );
}

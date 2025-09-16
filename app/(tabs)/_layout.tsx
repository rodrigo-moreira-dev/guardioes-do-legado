// app/(tabs)/_layout.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

function TabBarIcon(props: { name: string; color: string }) {
  return <FontAwesome5 size={24} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: "Desafios",
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          title: "Histórias",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          title: "Missões",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Biblioteca",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book-open" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: "Conquistas",
          tabBarIcon: ({ color }) => <TabBarIcon name="medal" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="life-ring" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

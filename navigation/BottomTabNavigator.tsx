import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { Octicons } from "../assets/fonts/Octicons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TroveIcon from "../components/TroveIcon";
import {
  TroveStackNavigator,
  ListsStackNavigator,
  SettingsStackNavigator,
} from "./StackNavigators";

import { RootTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TroveTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            style={StyleSheet.absoluteFill}
            tint={colorScheme === "dark" ? "dark" : "light"}
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="ListsTab"
        component={ListsStackNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="log" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TroveTab"
        component={TroveStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TroveIcon active={focused} theme={colorScheme} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>["name"];
  color: string;
}) {
  return <Octicons size={16} style={{ marginBottom: -3 }} {...props} />;
}

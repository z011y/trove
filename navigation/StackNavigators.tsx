import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Text } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TopTabNavigator from "./TopTabNavigator";
import FilterScreen from "../screens/FilterScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ListsScreen from "../screens/ListsScreen";
import SettingsScreen from "../screens/SettingsScreen";

import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function TroveStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TroveStack"
        component={TopTabNavigator}
        options={{
          title: "Trove",
          // headerLargeTitle: true,
          // headerLargeTitleStyle: { fontFamily: "epilogue-black" },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontFamily: "epilogue-black",
            fontSize: 24,
          },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function ListsStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListsStack"
        component={ListsScreen}
        options={{
          title: "Lists",
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: "epilogue-black" },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function SettingsStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsStack"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: "epilogue-black" },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

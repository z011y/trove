import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TopTabNavigator from "./TopTabNavigator";
import ItemScreen from "../screens/ItemScreen";
import ActionsScreen from "../components/ActionsMenu";
import NotFoundScreen from "../screens/NotFoundScreen";
import ListsScreen from "../screens/ListsScreen";
import ListScreen from "../screens/ListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddListScreen from "../screens/AddListScreen";

import { RootStackParamList } from "../types";
import { Octicons } from "../assets/fonts/Octicons";
import { useNavigation } from "@react-navigation/native";
import Navigation from ".";
import FilterView from "../screens/FilterView";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function TroveStackNavigator() {
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TroveStack"
        component={FilterView}
        options={{
          title: "Trove",
          // headerLargeTitle: true,
          // headerLargeTitleStyle: { fontFamily: "epilogue-black" },
          headerShadowVisible: false,
          headerRight: () => (
            <View
              style={{
                backgroundColor: Colors[colorScheme].primary,
                paddingTop: 7,
                paddingBottom: 4,
                paddingRight: 12,
                paddingLeft: 12,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: "epilogue-bold",
                  fontSize: 14,
                  overflow: "hidden",
                  color: Colors["dark"].text,
                }}
              >
                ADD
              </Text>
            </View>
          ),
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
        name="ListStack"
        component={ListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View
                style={{
                  display: "flex",
                  backgroundColor: Colors[colorScheme].accent,
                  padding: 4,
                  borderRadius: 28,
                  width: 28,
                  height: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: Colors[colorScheme].border,
                }}
              >
                <Octicons
                  name="chevron-left"
                  size={20}
                  color={Colors[colorScheme].text}
                />
              </View>
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{
                backgroundColor: Colors[colorScheme].primary,
                paddingTop: 7,
                paddingBottom: 4,
                paddingRight: 12,
                paddingLeft: 12,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: "epilogue-bold",
                  fontSize: 14,
                  overflow: "hidden",
                  color: Colors["dark"].text,
                }}
              >
                ADD
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontFamily: "epilogue-black",
            fontSize: 16,
          },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Item"
          component={ItemScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddList"
          component={AddListScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function ListsStackNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListsStack"
        component={ListsScreen}
        options={{
          title: "Lists",
          headerRight: () => (
            <View
              style={{
                backgroundColor: Colors[colorScheme].primary,
                paddingTop: 7,
                paddingBottom: 4,
                paddingRight: 12,
                paddingLeft: 12,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: "epilogue-bold",
                  fontSize: 14,
                  overflow: "hidden",
                  color: Colors["dark"].text,
                }}
              >
                NEW
              </Text>
            </View>
          ),
          // headerLargeTitle: true,
          // headerLargeTitleStyle: { fontFamily: "epilogue-black" },
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontFamily: "epilogue-black",
            fontSize: 16,
          },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}
      />
      <Stack.Screen
        name="ListStack"
        component={ListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View
                style={{
                  display: "flex",
                  backgroundColor: Colors[colorScheme].accent,
                  padding: 4,
                  borderRadius: 28,
                  width: 28,
                  height: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: Colors[colorScheme].border,
                }}
              >
                <Octicons
                  name="chevron-left"
                  size={20}
                  color={Colors[colorScheme].text}
                />
              </View>
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{
                backgroundColor: Colors[colorScheme].primary,
                paddingTop: 7,
                paddingBottom: 4,
                paddingRight: 12,
                paddingLeft: 12,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: "epilogue-bold",
                  fontSize: 14,
                  overflow: "hidden",
                  color: Colors["dark"].text,
                }}
              >
                ADD
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontFamily: "epilogue-black",
            fontSize: 16,
          },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Item"
          component={ItemScreen}
          options={{
            headerShown: false,
            contentStyle: {
              borderWidth: 1,
              borderColor: Colors[colorScheme].border,
            },
          }}
        />
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
          headerRight: () => (
            <Octicons
              name="person"
              size={24}
              color={Colors[colorScheme].primary}
            />
          ),
          headerLargeTitle: true,
          headerLargeTitleStyle: { fontFamily: "epilogue-black" },
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontFamily: "epilogue-black",
            fontSize: 16,
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
        <Stack.Screen
          name="Item"
          component={ItemScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

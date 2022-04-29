import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MyTroveScreen from "../screens/MyTroveScreen";
import TroveScreen from "../screens/TroveScreen";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: Colors[colorScheme].background,
      }}
      initialRouteName="MyTrove"
    >
      <Tab.Screen
        name="DateAdded"
        options={{
          title: "Date Added",
          tabBarStyle: {
            backgroundColor: Colors[colorScheme].background,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme].border,
          },
          tabBarLabelStyle: {
            fontFamily: "epilogue-bold",
            fontSize: 12,
            textTransform: "capitalize",
          },
          tabBarActiveTintColor: Colors[colorScheme].primary,
          tabBarInactiveTintColor: Colors[colorScheme].text,
          tabBarIndicatorStyle: {
            display: "none",
          },
        }}
      >
        {() => <TroveScreen filter="dateAdded" />}
      </Tab.Screen>
      <Tab.Screen
        name="MyTrove"
        options={{
          title: "My Trove",
          tabBarStyle: {
            backgroundColor: Colors[colorScheme].background,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme].border,
          },
          tabBarLabelStyle: {
            fontFamily: "epilogue-bold",
            fontSize: 12,
            textTransform: "capitalize",
          },
          tabBarActiveTintColor: Colors[colorScheme].primary,
          tabBarInactiveTintColor: Colors[colorScheme].text,
          tabBarIndicatorStyle: {
            display: "none",
          },
        }}
      >
        {() => <MyTroveScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="ByBrand"
        options={{
          title: "By Brand",
          tabBarStyle: {
            backgroundColor: Colors[colorScheme].background,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme].border,
          },
          tabBarLabelStyle: {
            fontFamily: "epilogue-bold",
            fontSize: 12,
            textTransform: "capitalize",
          },
          tabBarActiveTintColor: Colors[colorScheme].primary,
          tabBarInactiveTintColor: Colors[colorScheme].text,
          tabBarIndicatorStyle: {
            display: "none",
          },
        }}
      >
        {() => <TroveScreen filter="byBrand" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DateAddedScreen from "../screens/DateAddedScreen";
import RecentlyViewedScreen from "../screens/RecentlyViewedScreen";
import BrandNameScreen from "../screens/BrandNameScreen";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: Colors[colorScheme].background,
      }}
    >
      <Tab.Screen
        name="DateAdded"
        component={DateAddedScreen}
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
            // height: "50%",
            // borderRadius: 24,
            // marginBottom: 12,
            // backgroundColor: Colors[colorScheme].primary,
            // top: "25%",
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="RecentlyViewed"
        component={RecentlyViewedScreen}
        options={{
          title: "Recently Viewed",
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
            // height: "50%",
            // borderRadius: 24,
            // marginBottom: 12,
            // backgroundColor: Colors[colorScheme].primary,
            // top: "25%",
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="BrandName"
        component={BrandNameScreen}
        options={{
          title: "Brand Name",
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
            // height: "50%",
            // borderRadius: 24,
            // marginBottom: 12,
            // backgroundColor: Colors[colorScheme].primary,
            // top: "25%",
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}

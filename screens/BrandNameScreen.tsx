import { StyleSheet, SectionList, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "../hooks/useColorScheme";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView } from "../components/Themed";

const DATA = [
  {
    title: "Nike",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Target",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Aerie",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Zara",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function BrandNameScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerSearchBarOptions: {
  //       placeholder: "Search Trove",
  //     },
  //   });
  // }, [navigation]);

  return (
    <SectionList
      contentInsetAdjustmentBehavior="automatic"
      style={{ paddingBottom: tabBarHeight }}
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <BlurView
          intensity={100}
          tint={colorScheme === "dark" ? "dark" : "light"}
        >
          <Text style={styles.header}>{title}</Text>
        </BlurView>
      )}
      stickySectionHeadersEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 24,
  },
  header: {
    fontSize: 14,
    padding: 16,
    fontFamily: "epilogue-bold",
  },
  title: {
    fontSize: 16,
  },
});

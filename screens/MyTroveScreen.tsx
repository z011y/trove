import {
  StyleSheet,
  SectionList,
  useWindowDimensions,
  Pressable,
  ImageBackground,
  Alert,
  ActivityIndicator,
  ActionSheetIOS,
  Share,
} from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { ApiError } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import MasonryList from "@react-native-seoul/masonry-list";

import ActionsMenu from "../components/ActionsMenu";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import ScaledImage from "../components/ScaledImage";
import { Text, View } from "../components/Themed";
import { Octicons } from "../assets/fonts/Octicons";
import { SessionContext } from "../context/SessionContext";
import { TroveContext } from "../context/TroveContext";
import useSortByBrand from "../hooks/useSortByBrand";
import useSortByDate from "../hooks/useSortByDate";

export default function MyTroveScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState(null);
  const [actionsScreen, setActionsScreen] = useState(false);
  const [browserResult, setBrowserResult] = useState(null);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();
  const session = useContext(SessionContext);
  const trove = useContext(TroveContext);
  let isActive = false;
  const [result, setResult] = useState("🔮");

  const toggleActionSheet = (item) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Get", "Copy Link", "Share", "Remove", "Cancel"],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 4,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        const openWebBrowser = async () => {
          let browserResult = await WebBrowser.openBrowserAsync(item.url);
          setBrowserResult(browserResult);
        };
        if (buttonIndex === 0) {
          Haptics.selectionAsync();
          openWebBrowser();
        } else if (buttonIndex === 1) {
          Haptics.selectionAsync();
        } else if (buttonIndex === 2) {
          Haptics.selectionAsync();
          onShare(item);
        } else if (buttonIndex === 3) {
          console.log("Remove");
        } else if (buttonIndex === 4) {
          setResult("🔮");
        }
      }
    );

  const onShare = async (item) => {
    try {
      const result = await Share.share({
        message: `Trove | ${item.name}`,
        title: `Trove | ${item.name}`,
        url: item.url,
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  const keyExtractor = (item) => {
    return item.id;
  };

  const renderListItem = ({ item }) => {
    return (
      <Pressable
        key={item.id}
        style={{
          width: "100%",
          padding: 8,
          paddingBottom: 16,
        }}
        onPress={() => {
          Haptics.selectionAsync();
          navigation.navigate("Item", {
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
            url: item.url,
            dateAdded: item.created_at,
            brand: item.brand,
          });
        }}
      >
        <View
          key={item.id}
          style={{
            // overflow: "hidden",
            minHeight: 144,
          }}
        >
          <ScaledImage
            uri={item.image}
            width={window.width / 2 - 26}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors[colorScheme].border,
            }}
          />
          <View
            style={{
              paddingTop: 8,
              width: window.width / 2 - 24,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "epilogue-bold",
                marginBottom: 4,
                textTransform: "capitalize",
              }}
            >
              {item.brand}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "epilogue-regular",
                marginBottom: 4,
                opacity: 0.5,
                textTransform: "uppercase",
                lineHeight: 20,
              }}
            >
              {item.name}
            </Text>
            {!item.available ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e93d82",
                    width: 8,
                    height: 8,
                    borderRadius: 24,
                    marginRight: 4,
                    marginBottom: 2,
                  }}
                ></View>
                <Text
                  style={{
                    fontFamily: "epilogue-regular",
                    fontSize: 12,
                    overflow: "hidden",
                    textTransform: "uppercase",
                  }}
                >
                  Out of Stock
                </Text>
              </View>
            ) : null}
            {item.price ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: Colors[colorScheme].accent,
                    paddingTop: 7,
                    paddingBottom: 4,
                    paddingRight: 8,
                    paddingLeft: 8,
                    borderRadius: 24,
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: Colors[colorScheme].border,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "epilogue-regular",
                      fontSize: 14,
                      overflow: "hidden",
                    }}
                  >
                    {Number(item.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Text>
                  {Math.random() > 0.5 ? (
                    <Octicons
                      name="arrow-down"
                      size={12}
                      color={Colors[colorScheme].primary}
                      style={{ marginLeft: 4 }}
                    />
                  ) : (
                    <Octicons
                      name="arrow-up"
                      size={12}
                      color="#e93d82"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  };

  const getTotal = () => {
    let total = 0;
    if (trove.items) {
      trove.items.forEach((item) => {
        total += Number(item.price);
      });
    }
    return total;
  };

  return trove.items ? (
    <View style={{ ...StyleSheet.absoluteFill, marginTop: 48 }}>
      <MasonryList
        contentInset={{ bottom: tabBarHeight, top: 48 }}
        renderItem={renderListItem}
        data={trove.items}
        onRefresh={() => {
          setRefreshing(true);
          trove.refreshItems().then(() => {
            setRefreshing(false);
          });
        }}
        contentContainerStyle={{
          padding: 8,
          alignItems: "center",
        }}
        refreshing={refreshing}
      />
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        intensity={100}
        tint={colorScheme}
      >
        <Text style={styles.header}>Total:</Text>
        <Text style={styles.header}>
          {Number(getTotal()).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </BlurView>
    </View>
  ) : (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
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

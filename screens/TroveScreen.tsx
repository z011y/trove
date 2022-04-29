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
  FlatList,
  Image,
} from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { ApiError } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";

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

type TroveScreenProps = {
  filter: "dateAdded" | "recentlyViewed" | "byBrand";
};

export default function TroveScreen({ filter }: TroveScreenProps) {
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

  const formatItems = (
    items: any,
    filter: "dateAdded" | "recentlyViewed" | "byBrand"
  ) => {
    if (filter === "dateAdded") {
      setItems(useSortByDate(items, filter));
    }
    if (filter === "recentlyViewed") {
      setItems(useSortByDate(items, filter));
    }
    if (filter === "byBrand") {
      setItems(useSortByBrand(items));
    }
  };

  useFocusEffect(
    useCallback(() => {
      isActive = true;
      if (session) formatItems(trove.items, filter);

      return () => {
        isActive = false;
      };
    }, [trove])
  );

  const keyExtractor = (item) => {
    return item.id;
  };

  const renderImageItem = (item: any) => {
    return (
      <View>
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Item", {
              name: item.item.name,
              price: item.item.price,
              image: item.item.image,
              description: item.item.description,
              url: item.item.url,
              dateAdded: item.item.created_at,
              brand: item.item.brand,
            });
          }}
          style={{
            borderRadius: 8,
            marginRight: 16,
            borderWidth: 1,
            borderColor: Colors[colorScheme].border,
            overflow: "hidden",
            maxHeight: window.width / 2 - 34,
          }}
        >
          <Image
            key={item.item.id}
            source={{ uri: item.item.image }}
            style={{
              width: window.width / 2 - 34,
              height: window.width / 2 - 34,
            }}
          />
        </Pressable>
      </View>
    );
  };

  const renderListItem = (item: any) => {
    return (
      <View
        style={{
          width: "100%",
          marginTop: 16,
          marginBottom: 16,
          // paddingBottom: 48,
          // borderBottomWidth: 1,
          // borderBottomColor: Colors[colorScheme].border,
        }}
      >
        {item.item ? (
          <FlatList
            data={item.item}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            style={{ paddingLeft: 16 }}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
          />
        ) : (
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 72,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "epilogue-bold",
              }}
            >
              No items to show
            </Text>
          </View>
        )}
      </View>
    );
  };

  return items ? (
    <SectionList
      keyExtractor={keyExtractor}
      contentInsetAdjustmentBehavior="automatic"
      sections={items}
      renderItem={renderListItem}
      renderSectionHeader={({ section: { title, data } }) => (
        <BlurView
          intensity={100}
          tint={colorScheme}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>{title}</Text>
          <Pressable
            onPress={() => {
              console.log(data);
              navigation.navigate("ListStack", {
                title: title,
                items: data[0],
              });
            }}
          >
            <View
              style={{
                backgroundColor: Colors[colorScheme].accent,
                borderWidth: 1,
                borderColor: Colors[colorScheme].border,
                paddingTop: 7,
                paddingBottom: 4,
                paddingRight: 12,
                paddingLeft: 12,
                borderRadius: 24,
                marginRight: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "epilogue-bold",
                  fontSize: 14,
                  overflow: "hidden",
                  color: Colors[colorScheme].text,
                }}
              >
                SEE ALL
              </Text>
            </View>
          </Pressable>
        </BlurView>
      )}
      stickySectionHeadersEnabled={true}
      onRefresh={() => {
        setRefreshing(true);
        trove.refreshItems().then(() => {
          setRefreshing(false);
        });
      }}
      refreshing={refreshing}
      progressViewOffset={100}
      ListFooterComponent={() => (
        <View
          style={{ height: tabBarHeight - 16, backgroundColor: "transparent" }}
        />
      )}
    />
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

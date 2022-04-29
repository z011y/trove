import { useHeaderHeight } from "@react-navigation/elements";
import {
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  SectionList,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  Pressable,
} from "react-native";
import { useContext, useCallback, useState } from "react";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

import ScaledImage from "../components/ScaledImage";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { TroveContext } from "../context/TroveContext";

export default function ListsScreen({
  navigation,
}: RootTabScreenProps<"ListsTab">) {
  const [loading, setLoading] = useState(true);
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();
  const trove = useContext(TroveContext);

  const renderImageItem = (item: any) => {
    return (
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
        }}
      >
        <ScaledImage key={item.item.id} uri={item.item.image} height={128} />
      </Pressable>
    );
  };

  const renderListItem = (listItem: any) => {
    const data = trove.items.filter(
      (item) => item.list_id === listItem.item.id
    );

    return (
      <View
        style={{
          width: "100%",
          marginBottom: 16,
          // paddingBottom: 48,
          // borderBottomWidth: 1,
          // borderBottomColor: Colors[colorScheme].border,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 16,
            backgroundColor: "transparent",
          }}
        >
          {listItem.item.description ? (
            <Text
              style={{
                fontSize: 14,
                opacity: 0.5,
                lineHeight: 20,
                padding: 16,
                paddingTop: 0,
              }}
            >
              {listItem.item.description}
            </Text>
          ) : null}
        </View>

        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            style={{ paddingLeft: 16 }}
            showsHorizontalScrollIndicator={false}
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

  const formatData = () => {
    const data = trove.lists.map((list) => {
      return {
        title: list.name,
        data: [list],
      };
    });
    return data;
  };

  return trove.lists && trove.items ? (
    <SectionList
      sections={formatData()}
      renderItem={renderListItem}
      contentInsetAdjustmentBehavior="automatic"
      stickySectionHeadersEnabled={true}
      renderSectionHeader={({ section: { title, data } }) => {
        console.log(data);
        const items = trove.items.filter((item) => item.list_id === data[0].id);

        return (
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
                  items: items,
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
        );
      }}
    />
  ) : (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    fontSize: 14,
    padding: 16,
    fontFamily: "epilogue-bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

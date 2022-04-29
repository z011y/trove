import {
  Platform,
  StyleSheet,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";

import { Octicons } from "../assets/fonts/Octicons";
import ScaledImage from "../components/ScaledImage";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import IconButton from "../components/IconButton";

type ItemScreenProps = {
  navigation: any;
  route: any;
};

export default function ItemScreen({ navigation, route }: ItemScreenProps) {
  const [result, setResult] = useState(null);
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();
  const dateAdded = new Date(route.params.dateAdded);

  const _handlePressButtonAsync = async () => {
    console.log(route.params.url);
    let browserResult = await WebBrowser.openBrowserAsync(route.params.url);
    setResult(browserResult);
  };

  return (
    <ImageBackground
      source={{ uri: route.params.image }}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      blurRadius={32}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        tint={colorScheme}
        intensity={100}
      />

      <ScrollView
        style={{
          width: "100%",
          height: window.height,
          paddingTop: 72,
        }}
      >
        <ScaledImage uri={route.params.image} width={window.width} />
        <View
          style={{ width: "100%", padding: 16, backgroundColor: "transparent" }}
        >
          <Text
            style={{
              fontFamily: "epilogue-black",
              fontSize: 24,
              marginBottom: 8,
              textTransform: "capitalize",
            }}
          >
            {route.params.name}
          </Text>
          <Text
            style={{
              fontFamily: "epilogue-regular",
              fontSize: 18,
              marginBottom: 8,
              opacity: 0.5,
            }}
          >
            {route.params.brand}
          </Text>
          <Text
            style={{
              fontFamily: "epilogue-regular",
              fontSize: 18,
              marginBottom: 24,
              opacity: 0.5,
            }}
          >
            {Number(route.params.price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 24,
              lineHeight: 32,
              opacity: 0.8,
            }}
          >
            {route.params.description}
          </Text>
          <Text
            style={{
              fontFamily: "epilogue-regular",
              fontSize: 14,
              marginBottom: 24,
              lineHeight: 32,
              opacity: 0.5,
            }}
          >
            <Text style={{ fontFamily: "epilogue-bold" }}>Added:</Text>{" "}
            {dateAdded.toDateString()}
          </Text>
          <View
            style={{
              width: "100%",
              display: "flex",
              borderColor: Colors[colorScheme].border,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderRadius: 16,
              padding: 16,
              overflow: "hidden",
            }}
          >
            <BlurView
              style={StyleSheet.absoluteFill}
              tint={colorScheme}
              intensity={50}
            />
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                _handlePressButtonAsync();
              }}
            >
              <IconButton
                text="Get"
                backgroundColor={Colors[colorScheme].primary}
                textColor={Colors["dark"].text}
                colorScheme={colorScheme}
                icon="link-external"
                blur={false}
              />
            </Pressable>
            <IconButton
              text="Copy Link"
              backgroundColor="transparent"
              textColor={Colors[colorScheme].text}
              colorScheme={colorScheme}
              icon="link"
              blur={true}
              style={{
                borderWidth: 1,
                borderColor: Colors[colorScheme].border,
              }}
            />
            <IconButton
              text="Share"
              backgroundColor="transparent"
              textColor={Colors[colorScheme].text}
              colorScheme={colorScheme}
              icon="share"
              blur={true}
              style={{
                borderWidth: 1,
                borderColor: Colors[colorScheme].border,
              }}
            />
            <IconButton
              text="Remove"
              backgroundColor="transparent"
              textColor="#e93d82"
              colorScheme={colorScheme}
              icon="trash"
              blur={true}
              style={{
                borderWidth: 1,
                borderColor: Colors[colorScheme].border,
                marginBottom: 0,
              }}
            />
          </View>
          <View style={{ height: 52 + 72, backgroundColor: "transparent" }} />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 72,
          width: window.width,
          backgroundColor: "transparent",
          paddingTop: 8,
          paddingLeft: 16,
          paddingRight: 16,
          overflow: "hidden",
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme].border,
          zIndex: 1,
        }}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          tint={colorScheme}
          intensity={100}
        />
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            navigation.goBack();
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
              DONE
            </Text>
          </View>
        </Pressable>
        <View
          style={{
            display: "flex",
            backgroundColor: "transparent",
            alignItems: "center",
            overflow: "hidden",
            maxWidth: "60%",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "epilogue-bold",
              fontSize: 16,
              overflow: "hidden",
              marginBottom: 4,
            }}
          >
            {route.params.brand}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "epilogue-regular",
              fontSize: 14,
              overflow: "hidden",
              opacity: 0.5,
              textTransform: "uppercase",
            }}
          >
            {route.params.name}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            _handlePressButtonAsync();
          }}
        >
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
              GET
            </Text>
          </View>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

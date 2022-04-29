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
import ScaledImage from "./ScaledImage";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import IconButton from "./IconButton";

type ActionsMenuProps = {
  navigation: any;
  route: any;
};

export default function ActionsMenu({ url }: ActionsMenuProps) {
  const [result, setResult] = useState(null);
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();

  const _handlePressButtonAsync = async () => {
    let browserResult = await WebBrowser.openBrowserAsync(url);
    setResult(browserResult);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
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
          intensity={100}
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

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
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

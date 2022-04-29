import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { Octicons } from "../assets/fonts/Octicons";

type IconButtonProps = {
  text: string;
  backgroundColor: string;
  textColor: string;
  colorScheme: "light" | "dark";
  icon: any;
  blur: boolean;
  style?: any;
};

export default function IconButton({
  text,
  backgroundColor,
  textColor,
  colorScheme,
  icon,
  blur,
  style,
}: IconButtonProps) {
  return (
    <View
      style={{
        width: "100%",
        height: 48,
        backgroundColor: backgroundColor,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 16,
        overflow: "hidden",
        ...style,
      }}
    >
      {blur ? (
        <BlurView
          style={{
            ...StyleSheet.absoluteFill,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 24,
            paddingRight: 24,
          }}
          tint={colorScheme}
          intensity={50}
        />
      ) : null}
      <Text
        style={{
          fontFamily: "epilogue-bold",
          fontSize: 14,
          color: textColor,
        }}
      >
        {text.toUpperCase()}
      </Text>
      <Octicons name={icon} size={16} color={textColor} />
    </View>
  );
}

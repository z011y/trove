import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Octicons } from "../assets/fonts/Octicons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MyTroveScreen from "./MyTroveScreen";

export default function FilterView() {
  const colorScheme = useColorScheme();

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignItems: "center",
        }}
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: 48,
          paddingLeft: 16,
        }}
      >
        <View
          style={{
            backgroundColor: Colors[colorScheme].primary,
            paddingHorizontal: 16,
            paddingBottom: 2,
            paddingTop: 4,
            borderRadius: 40,
            height: 32,
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "epilogue-regular",
              color: Colors["dark"].text,
            }}
          >
            Date Added
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors[colorScheme].accent,
            borderWidth: 1,
            borderColor: Colors[colorScheme].border,
            paddingHorizontal: 16,
            paddingBottom: 2,
            paddingTop: 4,
            borderRadius: 40,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "epilogue-regular",
              color: Colors[colorScheme].text,
              marginRight: 8,
            }}
          >
            Brand
          </Text>
          <Octicons
            name="chevron-down"
            size={12}
            color={Colors[colorScheme].text}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors[colorScheme].accent,
            borderWidth: 1,
            borderColor: Colors[colorScheme].border,
            paddingHorizontal: 16,
            paddingBottom: 2,
            paddingTop: 4,
            borderRadius: 40,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "epilogue-regular",
              color: Colors[colorScheme].text,
            }}
          >
            Price
          </Text>
        </View>
      </ScrollView>
      <MyTroveScreen />
    </View>
  );
}

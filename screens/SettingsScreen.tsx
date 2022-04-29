import { StyleSheet } from "react-native";
import { useContext } from "react";

import { Text, View } from "../components/Themed";
import { SessionContext } from "../context/SessionContext";

export default function SettingsScreen() {
  const session = useContext(SessionContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>
        Logged in as{" "}
        <Text style={{ fontFamily: "epilogue-bold" }}>
          {session.user.email}
        </Text>
      </Text>
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

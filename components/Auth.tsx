import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  async function signInWithEmail() {
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        backgroundColor: Colors[colorScheme].background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
      }}
    >
      <Image
        source={
          colorScheme === "dark"
            ? require("../assets/images/trove-logo-dark.png")
            : require("../assets/images/trove-logo-light.png")
        }
        style={{
          height: 48,
        }}
        resizeMode="contain"
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={{
            borderWidth: 1,
            borderColor: Colors[colorScheme].border,
            borderRadius: 8,
            padding: 8,
            color: Colors[colorScheme].text,
          }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          style={{
            borderWidth: 1,
            borderColor: Colors[colorScheme].border,
            borderRadius: 8,
            padding: 8,
            color: Colors[colorScheme].text,
          }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
          color={Colors[colorScheme].primary}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          color={Colors[colorScheme].primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

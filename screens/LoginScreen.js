import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.labelTitle}>Sign In</Text>
          <Text style={styles.labelSubtitle}>Sign In to your account</Text>
        </View>

        <View>
          <View style={styles.containerInput}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={styles.input(email)}
            />
          </View>

          <View style={styles.containerInput}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholderTextColor="black"
              style={styles.input(email)}
            />
          </View>

          <Pressable style={styles.btnLogin}>
            <Text style={styles.labelLogin}>Login</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.labelRegister}>
              Don't have a account ? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  labelTitle: {
    fontSize: 20,
    color: "#662d91",
    fontWeight: "bold",
  },
  labelSubtitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: (input) => ({
    fontSize: input ? 18 : 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    marginVertical: 10,
  }),
  btnLogin: {
    width: 200,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  labelLogin: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  labelRegister: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
});

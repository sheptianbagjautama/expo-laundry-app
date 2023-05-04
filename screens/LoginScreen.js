import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ActivityIndicator } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    //When user after register it will navigate to home screen
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("subscribe login => ", authUser);
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
  };

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text style={{ marginRight: 10 }}>Loading</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
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

            <Pressable onPress={login} style={styles.btnLogin}>
              <Text style={styles.labelLogin}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.labelRegister}>
                Don't have a account ? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
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

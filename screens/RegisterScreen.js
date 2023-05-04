import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email == "" || password == "" || phone == "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("user credential => ", userCredential);
        const userEmail = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: userEmail,
          phone: phone,
        });

        showMessage({
          message: "Succesfully register !",
          type: "success",
        });
      }
    );
  };

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.labelTitle}>Register</Text>
          <Text style={styles.labelSubtitle}>Create a new Account</Text>
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

          <View style={styles.containerInput}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone No"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor="black"
              style={styles.input(phone)}
            />
          </View>

          <Pressable onPress={register} style={styles.btnLogin}>
            <Text style={styles.labelLogin}>Register</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.labelRegister}>
              Already have a account ? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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

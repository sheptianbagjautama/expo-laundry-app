import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  //get from current firebase
  // const user = auth.currentUser;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const email = await AsyncStorage.getItem("email");
    const token = await AsyncStorage.getItem("token");
    if (email != null && token != null) {
      setEmail(email);
      setToken(token);
    }
  };

  const navigation = useNavigation();
  const signOutUser = () => {
    //SIGNOUT FIREBASE
    signOut(auth)
      .then(() => {
        AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");

        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });

    // AsyncStorage.removeItem("email");
    // AsyncStorage.removeItem("token");
    // AsyncStorage.removeItem("user");

    // navigation.replace("Login");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Pressable style={{ marginVertical: 10 }}>
        <Text>Welcome {email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

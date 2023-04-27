import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../components/Carousel";
import Services from "../components/Services";

const HomeScreen = () => {
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
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
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
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

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
      {/* Location and Profile */}
      <View style={styles.container}>
        <MaterialIcons name="location-on" size={24} color="#fd5c63" />
        <View>
          <Text style={styles.label}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable style={styles.btnImage}>
          <Image
            style={styles.image}
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AOLn63EP1jh2_EfySNDXaRPN4e7eW81r_uNGQeQY4KER8w=s32-c-mo",
            }}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.inputSearchBar}>
        <TextInput placeholder="Search for items or More" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/* Image Carousel */}
      <Carousel />

      {/* Service Component */}
      <Services />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  btnImage: {
    marginLeft: "auto",
    marginRight: 7,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputSearchBar: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    borderRadius: 7,
  },
});

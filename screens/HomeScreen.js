import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Carousel from "../components/Carousel";
import DressItem from "../components/DressItem";
import Services from "../components/Services";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log("cart ==> ", JSON.stringify(cart, undefined, 2));

  const navigation = useNavigation();

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  const [items, setItems] = useState([]);

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

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        console.log(JSON.stringify("doc data ==> ", doc.data(), undefined, 2));
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View style={styles.container}>
          <MaterialIcons name="location-on" size={24} color="#fd5c63" />
          <View>
            <Text style={styles.label}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={styles.btnImage}
          >
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

        {/* Render All The Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={styles.btnSummary}>
          <View>
            <Text style={styles.labelItems}>
              {cart.length} items | ${total}
            </Text>
            <Text style={styles.sublabelItems}>extra charges might apply</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={styles.labelItems}>Proceed to pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
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
  btnSummary: {
    backgroundColor: "#088F8F",
    padding: 10,
    // marginBottom: 20,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelItems: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sublabelItems: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    marginVertical: 6,
  },
});

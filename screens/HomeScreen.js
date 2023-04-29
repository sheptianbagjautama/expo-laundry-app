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

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log("cart ==> ", JSON.stringify(cart, undefined, 2));

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

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = () => {
      services.map((service) => dispatch(getProducts(service)));
    };

    fetchProducts();
  }, []);

  // console.log(JSON.stringify(product, undefined, 2));
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "Shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "Dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "Jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "Shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

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

          <Pressable>
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

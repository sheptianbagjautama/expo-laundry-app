import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable key={index} style={styles.btnService}>
            <Image source={{ uri: service.image }} style={styles.image} />
            <Text style={styles.labelService}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 7,
  },
  btnService: {
    margin: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 7,
  },
  labelService: {
    textAlign: "center",
    marginTop: 6,
  },
  image: {
    width: 70,
    height: 70,
  },
});

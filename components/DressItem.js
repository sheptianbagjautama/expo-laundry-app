import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const DressItem = ({ item }) => {
  return (
    <View>
      <Pressable style={styles.btnItem}>
        <View>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>

        <View>
          <Text style={styles.labelName}>{item.name}</Text>
          <Text style={styles.labelPrice}>${item.price}</Text>
        </View>

        <Pressable style={styles.btnAdd}>
          <Text style={styles.labelAdd}>Add</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({
  btnItem: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
  },
  image: {
    width: 70,
    height: 70,
  },
  labelName: {
    width: 83,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 7,
  },
  labelPrice: {
    width: 60,
    color: "gray",
    fontSize: 15,
  },
  btnAdd: {
    width: 80,
  },
  labelAdd: {
    borderRadius: 4,
    borderColor: "gray",
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088F8F",
    textAlign: "center",
    padding: 5,
    fontSize: 17,
    fontWeight: "bold",
  },
});

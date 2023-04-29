import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/CartReducer";
import { decrementQty, incrementQty } from "../redux/ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQty(item)); //product
  };
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

        {cart.some((c) => c.id === item.id) ? (
          <Pressable style={styles.btnCartContainer}>
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); //cart
                dispatch(decrementQty(item)); //product
              }}
              style={styles.btnCart}
            >
              <Text style={styles.labelCart}>-</Text>
            </Pressable>

            <Pressable>
              <Text style={styles.labelQuantity}>{item.quantity}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); //cart
                dispatch(incrementQty(item)); //product
              }}
              style={styles.btnCart}
            >
              <Text style={styles.labelCart}>+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={styles.btnAdd}>
            <Text style={styles.labelAdd}>Add</Text>
          </Pressable>
        )}
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
  btnCartContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnCart: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  labelCart: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  labelQuantity: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",
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

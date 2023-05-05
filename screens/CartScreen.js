import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/CartReducer";
import { decrementQty, incrementQty } from "../redux/ProductReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const userUID = auth.currentUser.uid;
  console.log("userUId => ", userUID);
  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUID}`),
      {
        order: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
  };

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={styles.containerEmptyCart}>
            <Text style={styles.labelEmpty}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View style={styles.containerNav}>
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text>Your Bucket</Text>
            </View>

            <Pressable style={styles.containerCart}>
              {cart.map((item, index) => (
                <View key={index} style={styles.containerRowCartItem}>
                  <Text style={styles.labelNameCart}>{item.name}</Text>

                  {/* - + button */}
                  <Pressable style={styles.containerQtyCart}>
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); //cart
                        dispatch(decrementQty(item)); //product
                      }}
                    >
                      <Text style={styles.labelCart}>-</Text>
                    </Pressable>

                    <Pressable>
                      <Text style={styles.labelQty}>{item.quantity}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); //cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text style={styles.labelCart}>+</Text>
                    </Pressable>
                  </Pressable>

                  <Text style={styles.labelTotal}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={styles.containerBillingDetails}>
              <Text style={styles.labelTitle}>Billing Details</Text>
              <View style={styles.subContainerBillingDetails}>
                <View style={styles.subContainerRow()}>
                  <Text style={styles.labelName}>Item Total</Text>
                  <Text style={styles.labelValue()}>${total}</Text>
                </View>

                <View style={styles.subContainerRow(8)}>
                  <Text style={styles.labelName}>Delivery Free | 1.2KM</Text>
                  <Text style={styles.labelValue("#088F8F")}>FREE</Text>
                </View>

                <View style={styles.labelAlert}>
                  <Text style={styles.labelName}>
                    Free Delivery on Your order
                  </Text>
                </View>

                <View style={styles.line} />

                <View style={styles.subContainerRow(10)}>
                  <Text style={styles.labelName}>Selected Date</Text>
                  <Text style={styles.labelValue("#088F8F")}>
                    {/* {route.params.pickUpDate} */}
                    Pikupdate
                  </Text>
                </View>

                <View style={styles.subContainerRow()}>
                  <Text style={styles.labelName}>No Of Days</Text>

                  <Text style={styles.labelValue("#088F8F")}>
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View style={styles.subContainerRow(10)}>
                  <Text style={styles.labelName}>Selected Pick Up Time</Text>

                  <Text style={styles.labelValue("#088F8F")}>
                    {route.params.selectedTime}
                  </Text>
                </View>

                <View style={styles.line} />

                <View style={styles.subContainerRow(8)}>
                  <Text style={styles.labelSummary}>To Pay</Text>
                  <Text style={styles.labelSummary}>${total}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={styles.btnSummary}>
          <View>
            <Text style={styles.labelItems}>
              {cart.length} items | ${total}
            </Text>
            <Text style={styles.sublabelItems}>extra charges might apply</Text>
          </View>

          <Pressable onPress={placeOrder}>
            <Text style={styles.labelItems}>Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  containerEmptyCart: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelEmpty: {
    marginTop: 40,
  },
  containerNav: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  containerCart: {
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    padding: 14,
  },
  containerRowCartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  labelNameCart: {
    width: 100,
    fontSize: 16,
    fontWeight: "500",
  },
  containerQtyCart: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "#BEBEBE",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  labelCart: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  labelQty: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  labelTotal: {
    fontSize: 16,
    fontWeight: "500",
  },
  // BILLING DETAIL
  containerBillingDetails: {
    marginHorizontal: 10,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
  },
  subContainerBillingDetails: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
  },
  subContainerRow: (marginVertical) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: marginVertical ? marginVertical : 0,
  }),
  line: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,

    marginTop: 10,
  },
  labelName: {
    fontSize: 18,
    fontWeight: "400",
    color: "gray",
  },
  labelValue: (color) => ({
    fontSize: 18,
    fontWeight: "400",
    color: color ? color : "#000000",
  }),
  labelAlert: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelSummary: {
    fontSize: 18,
    fontWeight: "bold",
  },
  //POP UP SUMMARY
  btnSummary: {
    marginTop: "auto",
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

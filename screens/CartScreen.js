import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { decrementQuantity, incrementQuantity } from "../redux/CartReducer";
import { decrementQty, incrementQty } from "../redux/ProductReducer";
import { useRoute } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  console.log("cart bambang ==> ", JSON.stringify(cart, undefined, 2));
  console.log("total", total);

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
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    ${total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Free | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {/* {route.params.pickUpDate} */}
                    Pikupdate
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,

                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total + 95}
                  </Text>
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

          <Pressable>
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

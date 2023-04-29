import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log("cart ==> ", JSON.stringify(cart, undefined, 2));

  console.log("selectedTime => ", selectedTime);

  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
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
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart");
    }
  };
  return (
    <>
      <SafeAreaView>
        <Text style={styles.label}>Enter Address</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Pick Up Date</Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-02-22")}
          endDate={new Date("2023-02-28")}
          initialSelectedDate={new Date("2020-08-22")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={styles.label}>Select Time</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              // style={styles.btnSelectTime}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.label}>Select Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <Pressable
              onPress={() => setDelivery(item.name)}
              key={index}
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable style={styles.btnSummary}>
          <View>
            <Text style={styles.labelItems}>
              {cart.length} items | ${total}
            </Text>
            <Text style={styles.sublabelItems}>extra charges might apply</Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text style={styles.labelItems}>Proceed to Cart</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  input: {
    padding: 40,
    borderColor: "gray",
    borderWidth: 0.7,
    paddingVertical: 80,
    borderRadius: 9,
    margin: 10,
  },
  //   btnSelectTime: {
  //     margin: 10,
  //     borderRadius: 7,
  //     padding: 15,
  //     borderColor: "gray",
  //     borderWidth: 0.7,
  //   },
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

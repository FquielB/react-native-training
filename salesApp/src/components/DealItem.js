import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { priceDisplay } from "../util";

export default function DealItem({ deal, onPress }) {
  const handlePress = () => {
    onPress(deal.key);
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.simpleDetails}>
          <Text>{priceDisplay(deal.price)}</Text>
          <Text>{deal.cause.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#94938f",
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 2,
    borderRadius: 10,
  },
  info: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderColor: "#94938f",
  },
  title: {
    fontWeight: "bold",
  },
  simpleDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

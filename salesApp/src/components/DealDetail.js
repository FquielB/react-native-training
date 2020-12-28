import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

import { priceDisplay } from "../util";
import ajax from "../ajax";

export default function DealDetail({ initialDealData }) {
  const [deal, setDeal] = useState(initialDealData);

  useEffect(() => {
    ajax.requestDealdetail(deal.key).then((fullDeal) => setDeal(fullDeal));
  });

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />
      <Text style={styles.title}>{deal.title}</Text>
      <View style={styles.info}>
        <View style={styles.headerDetails}>
          <View style={styles.simpleDetails}>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.cause}>{deal.cause.name}</Text>
          </View>
          {deal.user && (
            <View style={styles.user}>
              <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
          )}
        </View>
        <Text style={styles.description}>{deal.description}</Text>
      </View>
    </View>
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
    marginVertical: 50,
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
    backgroundColor: "#ffd780",
    padding: 10,
  },
  simpleDetails: {
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
  },
  user: {
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  headerDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#94938f",
  },
  description: {
    marginVertical: 10,
  },
});

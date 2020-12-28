import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import ajax from "./src/ajax";
import DealDetail from "./src/components/DealDetail";
import DealList from "./src/components/DealList";

export default function App() {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState();

  useEffect(() => {
    const ac = new AbortController();
    ajax.requestInitialDeals().then((data) => setDeals(data));

    return () => ac.abort();
  }, []);

  const currentDeal = () => {
    return deals.find((deal) => deal.key === currentDealId);
  };

  if (currentDealId) {
    return <DealDetail initialDealData={currentDeal()} />;
  }
  if (deals.length > 0) {
    return <DealList deals={deals} onItemPress={setCurrentDealId} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sales!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
  },
});

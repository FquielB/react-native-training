import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import ajax from "./src/ajax";
import { DealDetail, DealList, SearchBar } from "./src/components";

export default function App() {
  const [deals, setDeals] = useState([]);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);
  const [currentDealId, setCurrentDealId] = useState();
  useEffect(() => {
    const ac = new AbortController();
    ajax.requestInitialDeals().then((data) => setDeals(data));

    return () => ac.abort();
  }, []);

  const currentDeal = () => {
    return deals.find((deal) => deal.key === currentDealId);
  };

  const searchDeals = (searchTerm) => {
    searchTerm
      ? ajax
          .requestDealsSearch(searchTerm)
          .then((data) => setDealsFromSearch(data))
      : setDealsFromSearch([]);
  };

  if (currentDealId) {
    return (
      <DealDetail initialDealData={currentDeal()} onBack={setCurrentDealId} />
    );
  }

  return (
    <View style={styles.container}>
      {deals.length > 0 ? (
        <View>
          <SearchBar searchDeals={searchDeals} />
          <DealList
            deals={dealsFromSearch.length > 0 ? dealsFromSearch : deals}
            onItemPress={setCurrentDealId}
          />
        </View>
      ) : (
        <Text style={styles.header}>Sales!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#eee",
  },
  header: {
    fontSize: 40,
  },
});

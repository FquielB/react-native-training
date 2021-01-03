import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";

import ajax from "./src/ajax";
import { DealDetail, DealList, SearchBar } from "./src/components";

export default function App() {
  let titleXPos = new Animated.Value(0);
  const [deals, setDeals] = useState([]);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);
  const [currentDealId, setCurrentDealId] = useState();

  const AnimateTitle = (direction = 1) => {
    const windowWidth = Dimensions.get("window").width - 135;
    Animated.timing(titleXPos, {
      toValue: (windowWidth / 2) * direction,
      useNativeDriver: false,
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => finished && AnimateTitle(-1 * direction));
  };

  useEffect(() => {
    AnimateTitle();
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
        <Animated.View style={[{ left: titleXPos }]}>
          <Text style={styles.header}>Sales!</Text>
        </Animated.View>
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

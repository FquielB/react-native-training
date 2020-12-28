import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import DealItem from "./DealItem";

export default function dealList({ deals, onItemPress }) {
  return (
    <View style={styles.list}>
      <FlatList
        data={deals}
        renderItem={({ item }) => (
          <DealItem onPress={onItemPress} deal={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    flex: 1,
    width: "100%",
    paddingTop: 50,
  },
});

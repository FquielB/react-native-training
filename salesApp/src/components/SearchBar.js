import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import debounce from "lodash.debounce";

export default function SearchBar({ searchDeals }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchDeals = debounce(searchDeals, 300);
  useEffect(() => {
    debouncedSearchDeals(searchTerm);
  }, [searchTerm]);

  return (
    <TextInput
      placeholder="Search"
      style={styles.input}
      onChangeText={setSearchTerm}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#94938f56",
    borderRadius: 10,
    elevation: 1,
  },
});

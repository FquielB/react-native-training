import React, { useEffect, useRef, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import debounce from "lodash.debounce";

export default function SearchBar({ searchDeals, initialSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const inputElementRef = useRef();

  const debouncedSearchDeals = debounce(searchDealsInt, 300);
  useEffect(() => {
    debouncedSearchDeals(searchTerm);
  }, [searchTerm]);

  function searchDealsInt(searchDealTerm) {
    searchDeals(searchDealTerm);
    inputElementRef.current.blur();
  }

  return (
    <TextInput
      ref={(inputElement) => {
        inputElementRef.current = inputElement;
      }}
      value={searchTerm}
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

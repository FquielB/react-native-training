import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RandomNumber({ number, isDisable, onPress, id }) {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={isDisable}>
      <Text style={[styles.randomNumber, isDisable && styles.disabled]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  randomNumber: {
    borderRadius: 10,
    backgroundColor: "#999",
    width: 100,
    height: 50,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.3,
  },
});

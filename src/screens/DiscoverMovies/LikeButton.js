import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({ text, onPress, style }) {
  return (
    <TouchableOpacity style={{ ...styles.button, ...style }} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 70,
    alignItems: "center",
    marginHorizontal: "15%",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 14,
    // color: "#2e78b7",
  },
});

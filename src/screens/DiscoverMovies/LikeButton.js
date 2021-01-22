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
    marginTop: 40,
    justifyContent: "center",
    width: 150,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    // color: "#2e78b7",
  },
});

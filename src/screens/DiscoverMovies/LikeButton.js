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
    marginHorizontal: "12%",
    marginTop: 29,
    alignItems: "center",
    width: 120,
    height: 60,
    borderWidth: 1.6,
    borderRadius: 34,
  },
  buttonText: {
    fontSize: 15,
    // color: "#2e78b7",
  },
});

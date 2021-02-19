import React from "react";
import { StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Logo() {
  return (
    <Text style={styles.text}>
      <Feather name="film" size={36} color="red" /> Match {"  "}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    marginBottom: 100,
    fontWeight: "700",
  },
});

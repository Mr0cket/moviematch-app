import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Container from "../../components/Container";
export default function NotFound() {
  return (
    <Container style={styles.container}>
      <Text style={styles.title}>The Screen you are looking for cannot be found </Text>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4f7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 100,
  },
});

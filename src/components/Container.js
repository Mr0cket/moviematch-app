import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectMessage } from "../store/appState/selectors";

export default function Container({ children }) {
  const message = useSelector(selectMessage);
  const MessageBox = styled.View``;
  const MessageText = styled.Text``;
  return (
    <View style={styles.container}>
      <MessageBox>
        <MessageText>{message && message}</MessageText>
      </MessageBox>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#d4d4f7",
    alignItems: "center",
    overflow: "scroll",
  },
});

/* flex: 1;
align-items: "center";
overflow: "scroll"; */

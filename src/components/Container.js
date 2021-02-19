import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { appLoading, selectMessage } from "../store/appState/selectors";

export default function Container({ children, style }) {
  const message = useSelector(selectMessage);
  const loading = useSelector(appLoading);
  const backgroundColor = !message ? "" : message.variant === "success" ? "green" : "red";
  const MessageBox = styled.View`
    width: 100%;
    align-items: center;
  `;
  const MessageText = styled.Text``;
  if (message) console.log(`App message: ${message.text}`);
  return (
    <View style={{ ...styles.container, ...style }}>
      {
        <MessageBox style={{ backgroundColor }}>
          <MessageText>{message && message.text}</MessageText>
        </MessageBox>
      }
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
});

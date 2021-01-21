import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { appLoading, selectMessage } from "../store/appState/selectors";

export default function Container({ children, style }) {
  const message = useSelector(selectMessage);
  const MessageBox = styled.View``;
  const MessageText = styled.Text``;
  const loading = useSelector(appLoading);
  if (loading) return <ActivityIndicator />;
  if (message) console.log(`App message: ${message.text}`);
  return (
    <View style={{ ...styles.container, ...style }}>
      <MessageBox>
        <MessageText>{message && message.text}</MessageText>
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
    // alignContent: "center",
  },
});

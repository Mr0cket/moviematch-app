import React from "react";
import { View, Text } from "react-native";

export default function Container({ children }) {
  return <View>{props.children}</View>;
}

function Ascreen() {
  return <Container></Container>;
}

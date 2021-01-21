import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

export default function UserItem({ user }) {
  const { name } = user;
  const Row = styled.View`
    justify-content: center;
    flex-direction: row;
    margin-bottom: 5px;
    width: 80%;
  `;
  const UserText = styled.Text`
    font-size: 18px;
  `;
  return (
    <Row>
      <UserText>
        <FontAwesome name="user-circle-o" color="black" /> {name}
      </UserText>
    </Row>
  );
}

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import randomColor from "random-color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { inviteFriend } from "../../store/user/actions";
import { useDispatch } from "react-redux";
export default function UserItem({ user, addList }) {
  const { email, name } = user;

  return (
    <Row>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="user-circle-o" color={backgroundColor} size={30} />
        <UserText>{"    " + name}</UserText>
      </View>
      {addList && <AddUser email={email} />}
    </Row>
  );
}

function AddUser({ email }) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(inviteFriend(email))}>
      <Text style={{ color: "blue", fontSize: 16 }}>Add</Text>
    </TouchableOpacity>
  );
}

const backgroundColor = randomColor().hexString();
const Row = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  border-radius: 15px;
  padding: 2%;
  justify-content: space-between;
`;
const UserText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

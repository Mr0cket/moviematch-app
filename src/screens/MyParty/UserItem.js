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
  const backgroundColor = randomColor().hexString();
  const Row = styled.View`
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 5px;
    width: 80%;
    border: 0.5px black;
    border-radius: 15px;
    padding: 2%;
    background-color: ${backgroundColor};
  `;
  const UserText = styled.Text`
    font-size: 20px;
  `;
  return (
    <Row>
      <UserText>
        <FontAwesome name="user-circle-o" color="black" size={22} /> {"  " + name}
        {addList && <AddUser email={email} />}
      </UserText>
    </Row>
  );
}

function AddUser({ email }) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity style={styles.addButton} onPress={() => dispatch(inviteFriend(email))}>
      <Text>Add</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "yellow",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 20,
  },
});

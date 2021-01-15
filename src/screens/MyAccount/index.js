import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { logOut } from "../../store/user/actions";
import Button from "../../components/Button";
export default function MyAccount() {
  const dispatch = useDispatch();
  const accountName = useSelector((state) => state.user.name);

  const Container = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;
  return (
    <Container>
      <Button
        style={{ backgroundColor: "rgb(245, 201, 72)" }}
        onPress={() => dispatch(logOut())}
        text="Sign Out"
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    justifyContent: "center",
    backgroundColor: "rgb(255, 125, 45)",
    width: 150,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

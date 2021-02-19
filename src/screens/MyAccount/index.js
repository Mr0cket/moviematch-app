import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { logOut } from "../../store/user/actions";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import SetLocale from "./SetLocale";
import matchCountry from "../../lib/matchCountry";
export default function MyAccount() {
  const dispatch = useDispatch();
  const { locale, name, email } = useSelector((state) => state.user);
  const { width, height } = Dimensions.get("screen");
  return (
    <Container>
      <Title>{name}</Title>
      <SubTitle style={styles.subtitle}>Email: {email}</SubTitle>
      <SubTitle style={styles.subtitle}>My Country: {matchCountry(locale) || "not set"}</SubTitle>
      <SubTitle style={styles.subtitle}>Change Country</SubTitle>
      <SetLocale />
      <Button
        style={{ backgroundColor: "rgb(245, 201, 72)", marginTop: height / 2.5 }}
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
  subtitle: {
    fontWeight: "600",
    marginTop: 20,
  },
});

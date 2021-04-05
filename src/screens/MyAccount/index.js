import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { logOut } from "../../store/user/actions";
import Button from "../../components/Button";
import Container from "../../components/Container";
import SubTitle from "../../components/SubTitle";
import matchCountry from "../../lib/matchCountry";
import { Entypo } from "@expo/vector-icons";
import Setting from "./Setting";
export default function MyAccount({navigation}) {
  const dispatch = useDispatch();
  const { locale, name, email } = useSelector((state) => state.user);
  const { width, height } = Dimensions.get("screen");
  return (
    <Container style={styles.container}>
      <SubTitle style={styles.subtitle}>Account Name </SubTitle>
      <Setting>{name}</Setting>
      <SubTitle style={styles.subtitle}>Email </SubTitle>
      <Setting>{email}</Setting>
      <SubTitle style={styles.subtitle}>Country</SubTitle>
      <Setting onPress={() => navigation.navigate("SetLocale")}>
        <Entypo name="location-pin" size={30} color="blue" />
        {matchCountry(locale) || "not set"} {locale && `(${locale})`}
      </Setting>
      <SubTitle style={styles.subtitle}>Change Country</SubTitle>
      <Button
        style={{ backgroundColor: "rgb(245, 201, 72)", marginTop: height / 4.5 }}
        onPress={() => dispatch(logOut())}
        text="Sign Out"
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    marginTop: 15,
    marginLeft: 20,
  },
});

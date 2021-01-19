import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "../../components/Button";
import { inviteFriend } from "../../store/user/actions";

export default function index() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const Title = styled.Text`
    font-size: 26;
    margin-bottom: 100;
  `;

  return (
    <View>
      <Title>Invite A Friend</Title>
      <TextInput style={styles.input} onChangeText={setEmail} placeholder="email" />
      <Button
        text="dislike "
        style={{ backgroundColor: "rgb(244, 67, 54)" }}
        onPress={() => dispatch(inviteFriend(email))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",

    marginTop: 15,
    paddingLeft: 10,
  },
});

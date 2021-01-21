import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { inviteFriend } from "../../store/user/actions";
import UserItem from "./UserItem";
import { selectParty } from "../../store/user/selectors";

export default function index() {
  const [email, setEmail] = useState();
  const partyUsers = useSelector(selectParty);
  const dispatch = useDispatch();

  const SubTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 5%;
    margin-top: 15%;
  `;
  console.log("partyUsers length:", partyUsers.length);
  const partyList = partyUsers.map((user) => <UserItem key={user.id} user={user} />);

  return (
    <Container>
      <Title>My party</Title>
      {partyList}
      <SubTitle>Invite A Friend</SubTitle>
      <TextInput value={email} style={styles.input} onChangeText={setEmail} placeholder="email" />
      <Button
        text="Invite a Friend "
        style={{ backgroundColor: "rgb(244, 67, 54)" }}
        onPress={() => {
          dispatch(inviteFriend(email));
          setEmail("");
        }}
      />
    </Container>
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

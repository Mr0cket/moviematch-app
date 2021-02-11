import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import UserItem from "./UserItem";
import { selectParty } from "../../store/user/selectors";
import SearchForUser from "./SearchForUser";

console.log(process.env);
export default function index() {
  // const userSearchState = useSelector(selectUserSearch)
  const partyUsers = useSelector(selectParty);
  const dispatch = useDispatch();
  const partyList = partyUsers.map((user) => <UserItem key={user.id} user={user} />);
  return (
    <Container>
      <Title>My party</Title>
      <SubTitle>Users</SubTitle>
      {partyList}
      <SubTitle>Invite A Friend</SubTitle>
      <SearchForUser />
      {/* <Button
        text="Invite a Friend "
        style={{ backgroundColor: "rgb(244, 67, 54)" }}
        onPress={() => {
          dispatch(inviteFriend(email));
          setEmail("");
        }}
      /> */}
    </Container>
  );
}

const SubTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 5%;
  margin-top: 15%;
  margin-left: 15%;
  align-self: flex-start;
`;

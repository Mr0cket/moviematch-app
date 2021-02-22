import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import SubTitle from "../../components/SubTitle";
import Container from "../../components/Container";
import UserItem from "./UserItem";
import { selectParty } from "../../store/user/selectors";
import SearchForUser from "./SearchForUser";
import { StyleSheet, View } from "react-native";

export default function index() {
  // const userSearchState = useSelector(selectUserSearch)
  const partyUsers = useSelector(selectParty);
  const partyList = partyUsers.map((user) => <UserItem key={user.id} user={user} />);
  return (
    <Container>
      <SubTitle style={styles.subtitle}>Party Members {"  "}</SubTitle>
      <View style={{ backgroundColor: "white", width: "95%", borderRadius: 8 }}>{partyList}</View>
      <SubTitle style={styles.subtitle}>Invite A Friend {"  "}</SubTitle>
      <SearchForUser />
    </Container>
  );
}
const styles = StyleSheet.create({
  subtitle: {
    marginTop: 15,
    marginLeft: 20,
  },
});

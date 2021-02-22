import React, { useState } from "react";
import { Dimensions, View, Text, StyleSheet, FlatList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { inviteFriend } from "../../store/user/actions";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import UserItem from "./UserItem";

const { width, height } = Dimensions.get("screen");

export default function SearchForUser() {
  const [searchString, setsearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchForUser = async () => {
    // Query BE for the search search results
    try {
      const res = await axios.get(`${apiUrl}/party/usersearch?searchString=${searchString}`);
      setSearchResults(res.data);
    } catch (e) {
      console.log("error :(");
      console.log(e.message);
      if (e.response) console.log(e.response.data);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={searchString}
          style={styles.input}
          onChangeText={setsearchString}
          placeholder="name or email"
        />
        <TouchableOpacity onPress={searchForUser}>
          <MaterialIcons name="person-search" size={38} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.userList}>
        {searchResults.length > 0 &&
          searchResults.map((user) => <UserItem key={user.id} user={user} addList={true} />)}
      </View>
      {/* <FlatList data={searchResults} renderItem={UserItem} keyExtractor={(item) => item.id} style={styles.userSearchList} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
  },
  inputContainer: {
    width: width * 0.95,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 15,
    marginLeft: 10,
    paddingLeft: 10,
    flexDirection: "row",
  },
  input: { width: "90%", height: "100%" },
  userList: {
    backgroundColor: "white",
    width: "95%",
    borderRadius: 8,
    marginTop: "5%",
    marginLeft: 10,
  },
});

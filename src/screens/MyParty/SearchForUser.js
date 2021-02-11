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
    console.log("Implement the searchy stuff here");

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
  console.log("searchResults:", searchResults);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={searchString}
          style={styles.input}
          onChangeText={setsearchString}
          placeholder="name or email"
        />
        <TouchableOpacity style={{ marginTop: 20, marginLeft: 10 }} onPress={searchForUser}>
          <MaterialIcons name="person-search" size={38} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: "5%" }}>
        {searchResults.length > 0 &&
          searchResults.map((user) => <UserItem key={user.id} user={user} addList={true} />)}
      </View>
      {/* <FlatList data={searchResults} renderItem={UserItem} keyExtractor={(item) => item.id} style={styles.userSearchList} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
  },
  input: {
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 15,
    paddingLeft: 10,
  },
  userSearchList: {},
});

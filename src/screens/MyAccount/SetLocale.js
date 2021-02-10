import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Dimensions } from "react-native";
import { matchSorter } from "match-sorter";

export default function SetLocale() {
  const [searchPredictions, setSearchPredictions] = useState([]);

  return (
    <View style={styles.autocompleteContainer}>
      <TextInput style={styles.searchBox} textContentType="countryName" />
      {searchPredictions && (
        <FlatList
          data={searchPredictions}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => this.setState({ searchKeyword: item.description })}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          style={styles.searchResultsContainer}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchResultsContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },
  searchBox: {
    width: 200,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 10,
  },
});

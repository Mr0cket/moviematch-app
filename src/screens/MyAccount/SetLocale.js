import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import Container from '../../components/Container'
import { matchSorter } from "match-sorter";
import Countries from "../../config/countries.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setLocale } from "../../store/user/actions";
import { showMessageWithTimeout } from "../../store/appState/actions";
const { width, height } = Dimensions.get("screen");
// const plainCountryArr = Countries.map((country) => `${country.name} (${country.code})`);
export default function SetLocale() {
  const dispatch = useDispatch();
  const [searchLocale, setSearchLocale] = useState({ name: "", code: "" });

  const searchPredictions =
    searchLocale.name.length > 1 && matchSorter(Countries, searchLocale.name, { keys: ["name"] });
  searchPredictions.length = Math.min(searchPredictions.length, 5);
  const setNewLocale = () => {
    dispatch(setLocale(searchLocale.code))
    dispatch(showMessageWithTimeout("success", false, `Country set: ${searchLocale.name}`, 3000));
  };

  return (
    <Container>
      <KeyboardAvoidingView style={styles.autocompleteContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            autoCompleteType="off"
            style={styles.searchBox}
            textContentType="none"
            onChangeText={(value) => setSearchLocale({ ...searchPredictions, name: value || '' })}
            value={searchLocale.name || ''}
          />
          <TouchableOpacity style={styles.setButton} onPress={setNewLocale}>
            <Text style={{ color: "white" }}>Set country </Text>
          </TouchableOpacity>
        </View>
        {searchPredictions.length > 0 && (
          <FlatList
            data={searchPredictions}
            renderItem={({ item, index, separators }) => {
              const fontWeight = index === 0 ? "700" : "500";
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}
                  onPress={() => setSearchLocale(item)}
                >
                  <Text style={{ ...styles.countryText, fontWeight }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={({ highlighted }) => (
              <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
            )}
            keyExtractor={(item) => item.code}
            style={styles.searchResultsContainer}
          />
        )}
      </KeyboardAvoidingView>
    </Container>
  );
}
const styles = StyleSheet.create({
  searchResultsContainer: {
    width: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
    borderRadius: 10,
    padding: 5,
  },
  searchBox: {
    width: 200,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 10,
  },
  setButton: {
    marginLeft: 10,
    marginTop: 14,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 15,
  },
  separator: {
    height: 5,
  },
  countryText: {
    // fontWeight: "600",
    fontSize: 14,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

export default function Setting({ onPress, children }) {
  return (
    <View style={styles.settingContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.setting}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    width: "96%",
    borderRadius: 9,
    backgroundColor: "white",
    padding: "3%",
    marginBottom: 5,
  },
  setting: {
    fontSize: 18,
  },
});

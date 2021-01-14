import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function index({ navigation }) {
  return (
    <View>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.push("NotFound")}>
        <Text>Go up to the </Text>
      </TouchableOpacity>
    </View>
  );
}

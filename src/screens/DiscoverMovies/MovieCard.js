import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, PanResponder, Image, InteractionManager, Pressable } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const platform = Object.keys(Constants.platform)[0];
const { width, height } = Dimensions.get("window");

export default function MovieCard ({ poster, handlePress, movieId }) {
  return (
    <View style={[shadow, styles.card]}>
      <TouchableHighlight onPress={() => handlePress(movieId)}>
        <Image
          source={{
            uri: poster
          }}
          defaultSource={require('../../../assets/placeholder.png')}
          style={styles.poster}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  ios: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "black",
  },
  android: {
    elevation: 10,
  },
  poster: {
    resizeMode: "contain",
    width: width / 1.17,
    height: height / 1.5,
    borderRadius: 15,
  },
  card: {
    borderRadius: 23,
    overflow: "hidden",
    // position: "absolute",
  },
});
const shadow = platform === "ios" ? styles.ios : styles.android;

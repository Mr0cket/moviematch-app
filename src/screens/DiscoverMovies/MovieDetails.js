import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Genres from "../../components/Genres";
import StarRating from "../../components/StarRating";

export default function MovieDetails({ movie }) {
  const { title, rating, releaseDate, mainGenre } = movie;

  const titleFontSize =
    title.length < 16
      ? 30
      : title.length < 22
      ? 24
      : title.length < 25
      ? 22
      : title.length < 32
      ? 20
      : 16;
  return (
    <AnimatedView style={[styles.details, { opacity }]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.title, fontSize: titleFontSize }}>{title + "  "} </Text>
        <Text style={styles.year}>
          ({releaseDate ? moment(releaseDate).format("YYYY") : "N/A"})
        </Text>
      </View>
      <StarRating size={25} rating={rating} />
      <Genres genreList={mainGenre} />
    </AnimatedView>
  );
}
const styles = StyleSheet.create({
  ios: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "black",
    borderRadius: 15,
  },
  android: {
    elevation: 21,
    borderRadius: 15,
    overflow: "hidden",
  },
  poster: {
    resizeMode: "contain",
    width: 352,
    height: 528,
  },
  title: {
    fontWeight: "700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
  details: {
    width: "80%",
    justifyContent: "flex-start",
    marginTop: "2%",
    marginLeft: 25,
    marginRight: 25,
  },
  year: {
    fontSize: 18,
    alignSelf: "flex-end",
  },
});

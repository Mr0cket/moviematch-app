import moment from "moment";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Genres from "../../components/Genres";
import StarRating from "../../components/StarRating";

const { width, height } = Dimensions.get("window");

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
    <View style={styles.details}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.title, fontSize: titleFontSize }}>{title + "  "} </Text>
        <Text style={styles.year}>
          ({releaseDate ? moment(releaseDate).format("YYYY") : "N/A"})
        </Text>
      </View>
      <StarRating size={25} rating={rating} />
      <Genres genreList={mainGenre} />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
  details: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: height / 33,
    backgroundColor: "rgb(242, 242, 242)",
    height: height / 7.9,
    overflow: "hidden",
  },
  year: {
    fontSize: 18,
    alignSelf: "flex-end",
  },
});

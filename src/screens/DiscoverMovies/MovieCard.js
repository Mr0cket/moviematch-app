import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import GenreBadge from "../../components/GenreBadge";
import StarRating from "../../components/StarRating";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
const platform = Object.keys(Constants.platform)[0];
console.log("screen Dimensions:", Dimensions.get("screen"));
export default function MovieCard({ posterUrl, overview, title, rating, releaseDate, mainGenre }) {
  const shadow = platform === "ios" ? styles.ios : styles.android;
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

  // map genre badges
  const genres = mainGenre.split(",", 3).map((genre, index) => (
    <GenreBadge key={index} style={{ borderRadius: 15 }}>
      {genre + "  "}
    </GenreBadge>
  ));
  console.log("title:", title);
  return (
    <>
      <View style={shadow}>
        <MoviePoster
          source={{
            uri: posterUrl,
          }}
          defaultSource={require("../../../assets/placeholder.png")} // need to figure out how to rescale the poster to display the top part
          style={styles.poster}
        />
      </View>
      <Details>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.title, fontSize: titleFontSize }}>{title + "    "} </Text>
          <Year>({moment(releaseDate).format("YYYY") || "no date"})</Year>
        </View>
        <StarRating rating={rating} />
        <View style={{ flexDirection: "row" }}>{genres}</View>
      </Details>
    </>
  );
}
const styles = StyleSheet.create({
  ios: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "black",
    borderRadius: 25,
  },
  android: {
    elevation: 16,
    borderRadius: 25,
    overflow: "hidden",
  },
  poster: {
    resizeMode: "contain",
    borderRadius: 13,
    width: 352,
    height: 528,
  },
  title: {
    fontWeight: "700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
});

const marginTop = "10%";
const Card = styled.View`
  border-radius: 25px;
  overflow: hidden;
`;

// moviePoster default dimensions: 750*500
const MoviePoster = styled.Image`
  border-radius: 13px;
  width: 400px;
  height: 600px;
`;

const Year = styled.Text`
  margin-left: 5px;
  font-size: 18px;
  align-self: flex-end;
`;
const Details = styled.View`
  width: 80%;
  justify-content: flex-start;
  margin-top: 2%;
  margin-left: 25px;
  margin-right: 25px;
`;

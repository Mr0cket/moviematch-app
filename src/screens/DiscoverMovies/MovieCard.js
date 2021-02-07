import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import GenreBadge from "../../components/GenreBadge";
import StarRating from "../../components/StarRating";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";
const platform = Object.keys(Constants.platform)[0];
// console.log("screen Dimensions:", Dimensions.get("screen"));

export default function MovieCard({ movie, navigation }) {
  const { movieId, posterUrl, overview, title, rating, releaseDate, mainGenre } = movie;
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
  const openMovieDetails = (movieId) => {
    // console.log("navigating to movie details page");
    navigation.navigate("MovieDetails", { movie });

    // navigate to movie details, & give the movie ID, title, rating etc.???
    // loading screen shows until 1st req is finished.
    // loading screen displays movie title & poster & activity indicator
    // query TMDB API with 2 requests
    // 1. movie details: https://api.themoviedb.org/3/movie/${movieId}?api_key=eb066629e9e5aca99797f3955400c4bd
    // 2. watch providers: https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=eb066629e9e5aca99797f3955400c4bd
    // store in redux state w/ movie?
  };
  console.log("title:", title, title.length);
  console.log("movieId:", movieId);
  return (
    <>
      <TouchableHighlight onPress={openMovieDetails} style={{ borderRadius: 25 }}>
        <View style={shadow}>
          <MoviePoster
            source={{
              uri: posterUrl,
            }}
            defaultSource={require("../../../assets/placeholder.png")} // need to figure out how to rescale the poster to display the top part
            style={styles.poster}
          />
        </View>
      </TouchableHighlight>
      <Details>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.title, fontSize: titleFontSize }}>{title + "  "} </Text>
          <Year>({releaseDate ? moment(releaseDate).format("YYYY") : "N/A"})</Year>
        </View>
        <StarRating size={25} rating={rating} />
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

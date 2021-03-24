import React from "react";
import styled from "styled-components";
import moment from "moment";
import StarRating from "./StarRating";
import Genres from "./Genres";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions, View } from "react-native";
const { width, height } = Dimensions.get("screen");
const Row = styled.View`
  flex-direction: row;
  background-color: white;
  width: 100%;
  margin-top: 5px;
  margin-left: 3px;
  height: 200px;
`;
const MoviePoster = styled.Image`
  height: 100%;
  border-radius: 10px;
`;
const MovieDetails = styled.View`
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
`;
const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  width: 100%;
  /* text-align: center; */
  margin-bottom: 2%;
`;
const Description = styled.Text`
  font-size: 13px;
  font-weight: 500;
  width: 70%;
  margin-bottom: 2%;
`;
const Rating = styled.Text`
  font-weight: 700;
  /* align-self: flex-start; */
`;

export default function MovieRow({ index, item, separators, navigation }) {
  const { posterUrl, title, releaseDate, rating, mainGenre, overview, movieId } = item;

  return (
    <Row>
      <TouchableOpacity
        onPress={() => navigation.navigate("MovieDetails", { movieId })}
        style={{ width: width / 3, borderRadius: 10 }}
      >
        <MoviePoster source={{ uri: posterUrl }} />
      </TouchableOpacity>
      <MovieDetails>
        <TouchableOpacity onPress={() => navigation.navigate("MovieDetails", { movieId })}>
          <Title>{title} </Title>
        </TouchableOpacity>
        <Rating>{moment(releaseDate).format("MMM YYYY")} </Rating>
        <StarRating rating={rating} size={24} />
        <Genres genreList={mainGenre} />
        <Rating>Overview:</Rating>
        <Description>
          {overview && overview.length < 90 ? overview : overview.slice(0, 87) + "..."}
        </Description>
      </MovieDetails>
    </Row>
  );
}

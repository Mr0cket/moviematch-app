import React from "react";
import styled from "styled-components";
import moment from "moment";
import GenreBadge from "./GenreBadge";
import { View } from "react-native";
import StarRating from "./StarRating";

const Row = styled.View`
  flex-direction: row;
  background-color: white;
  width: 100%;
  margin-top: 5px;
  height: 200px;
`;
const MoviePoster = styled.Image`
  background-color: lightblue;
  width: 30%;
  border-radius: 10px;
`;
const MovieDetails = styled.View`
  width: 100%;
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

export default function MovieRow({ index, item, separators }) {
  const { posterUrl, title, releaseDate, rating, mainGenre, overview } = item;
  const genres = mainGenre.split(",", 3).map((genre, index) => (
    <GenreBadge key={index} style={{ borderRadius: 15 }}>
      {genre + "  "}
    </GenreBadge>
  ));

  return (
    <Row>
      <MoviePoster source={{ uri: posterUrl }} />
      <MovieDetails>
        <Title>{title} </Title>
        <Rating>{moment(releaseDate).format("MMM YYYY")} </Rating>
        <StarRating rating={rating} size={24} />
        <View style={{ flexDirection: "row" }}>{genres}</View>
        <Rating>Overview:</Rating>
        <Description>
          {overview && overview.length < 90 ? overview : overview.slice(0, 87) + "..."}
        </Description>
      </MovieDetails>
    </Row>
  );
}

import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import moment from "moment";

export default function MovieRow({ movie }) {
  const { posterUrl, title, releaseDate, rating } = movie;
  const Row = styled.View`
    flex-direction: row;
    background-color: white;
    width: 100%;
    margin-top: 5px;
    height: 22%;
  `;
  const MoviePoster = styled.Image`
    /* background-color: lightblue; */
    width: 30%;
    border-radius: 10px;
  `;
  const MovieDetails = styled.View``;
  const Title = styled.Text`
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin-bottom: 10%;
  `;
  const Description = styled.Text`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-bottom: 10%;
  `;
  const Rating = styled.Text`
    font-weight: 700;
    /* align-self: flex-start; */
    margin-bottom: 10%;
  `;

  /*   const no = new Array(Math.floor(rating / 2));
  const stars = no.map((item) => "⭐️");
  console.log(stars);
 */ return (
    <Row>
      <MoviePoster source={{ uri: posterUrl }} />
      <MovieDetails>
        <Title>{title} </Title>
        <Rating>Released: {moment(releaseDate).format("YYYY")} </Rating>
        <Rating> Rating: {rating} </Rating>
      </MovieDetails>
    </Row>
  );
}

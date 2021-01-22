import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import GenreBadge from "../../components/GenreBadge";
export default function MovieCard({ posterUrl, overview, title, rating, releaseDate, mainGenre }) {
  const marginTop = "10%";
  const MovieCard = styled.View`
    background-color: #efefef;
    width: 75%;
    height: 58%;
    border-radius: 20px;
    margin-top: ${marginTop};
  `;

  // moviePoster default dimensions: 320x250
  const MoviePoster = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 25px;
    /* overflow: visible; */
    padding: 0px;
  `;

  const Title = styled.Text`
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    /* text-align: center; */
  `;

  const Description = styled.Text`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-top: ${marginTop};
  `;

  const Rating = styled.Text`
    font-weight: 700;
    /* text-align: center; */
  `;
  const genres = mainGenre.split(",", 3).map((genre, index) => (
    <GenreBadge key={index} style={{ borderRadius: 15 }}>
      {genre + "  "}
    </GenreBadge>
  ));
  return (
    <MovieCard>
      <MoviePoster
        source={{
          uri: posterUrl,
        }}
        defaultSource={require("../../../assets/placeholder.png")} // need to figure out how to rescale the poster to display the top part
        style={{ resizeMode: "contain" }} // resizeMode: 'cover', 'contain', 'stretch', 'repeat', 'center' - default: "cover"
      />
      <Title>
        {title} - ({moment(releaseDate).format("YYYY") || "no date"}){" "}
      </Title>
      {/*       <Description>
        {overview && overview.length < 150 ? overview : overview.slice(0, 149) + " ..."}{" "}
      </Description> */}
      <Rating>Rating: {rating} </Rating>
      <View style={{ flexDirection: "row" }}>{genres}</View>
    </MovieCard>
  );
}

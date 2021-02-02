import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import GenreBadge from "../../components/GenreBadge";
import StarRating from "../../components/StarRating";
const marginTop = "10%";
const Card = styled.View`
  background-color: #efefef;
  width: 80%;
  height: 64%;
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

const Year = styled.Text`
  margin-left: 5px;
  font-size: 18px;
  align-self: flex-end;
`;
const Description = styled.Text`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  margin-top: ${marginTop};
`;

export default function MovieCard({ posterUrl, overview, title, rating, releaseDate, mainGenre }) {
  const Title = styled.Text`
    font-size: ${title.length < 20
      ? "30px"
      : title.length < 26
      ? "22px"
      : title.length < 32
      ? "20px"
      : "16px"};
    font-weight: 700;
    /* width: 100%; */
    /* text-align: center; */
  `;

  // map genre badges
  const genres = mainGenre.split(",", 3).map((genre, index) => (
    <GenreBadge key={index} style={{ borderRadius: 15 }}>
      {genre + "  "}
    </GenreBadge>
  ));
  console.log("title length:", title.length);
  return (
    <Card>
      <MoviePoster
        source={{
          uri: posterUrl,
        }}
        defaultSource={require("../../../assets/placeholder.png")} // need to figure out how to rescale the poster to display the top part
        style={{ resizeMode: "contain" }} // resizeMode: 'cover', 'contain', 'stretch', 'repeat', 'center' - default: "cover"
      />
      <View style={{ flexDirection: "row" }}>
        <Title>{title + " "} </Title>
        <Year>({moment(releaseDate).format("YYYY") || "no date"})</Year>
      </View>
      <StarRating rating={rating} />
      <View style={{ flexDirection: "row" }}>{genres}</View>
    </Card>
  );
}

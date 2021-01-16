import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
export default function MovieCard({ posterUrl, overview, title, rating, releaseDate, mainGenre }) {
  const marginTop = "5%";
  const MovieCard = styled.View`
    background-color: lightgrey;
    width: 85%;
    height: 75%;
    border-radius: 20px;
    align-items: center;
    margin-top: ${marginTop};
  `;

  // moviePoster default dimensions: 320x250
  const MoviePoster = styled.Image`
    /* background-color: lightblue; */
    width: 90%;
    border-radius: 20px;
    height: 50%;
  `;
  const Title = styled.Text`
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin-top: ${marginTop};
  `;

  const Description = styled.Text`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-top: ${marginTop};
  `;
  const GenreBadge = styled.Text`
    padding: 1% 3%;
    border-radius: 15px;
    background-color: #007bff;
    font-weight: 700;
    margin-top: ${marginTop};
  `;

  const Rating = styled.Text`
    font-weight: 700;
    /* align-self: flex-start; */
    margin-top: ${marginTop};
  `;
  console.log("overview length:", overview.length);
  return (
    <MovieCard>
      <MoviePoster
        source={{
          uri: posterUrl,
        }}
        defaultSource={require("../../../assets/placeholder.png")} // need to figure out how to rescale the poster to display the top part
        style={{ resizeMode: "contain" }} // resizeMode: 'cover', 'contain', 'stretch', 'repeat', 'center' - default: "cover"
        // loadingIndicatorSource
        // progressiveRenderingEnabled
      />
      <Title>
        {title} - ({moment(releaseDate).format("YYYY") || "no date"}){" "}
      </Title>
      <Description>
        {overview && overview.length < 250 ? overview : overview.slice(0, 249) + " ..."}{" "}
      </Description>
      <Rating>Rating: {rating} </Rating>
      <GenreBadge style={{ backgroundColor: "grey" }}>{mainGenre || "GenreTag"} </GenreBadge>
    </MovieCard>
  );
}

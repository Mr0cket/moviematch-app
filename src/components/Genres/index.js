import React from "react";
import { View, Text } from "react-native";
import GenreBadge from "./GenreBadge";
import GenresList from "../../config/genres.json";

export default function Genres({ genreList, style, size }) {
  const genres = genreList.split(",", 3).map((genre, index) => {
    const genreName = Object.values(GenresList).find((Genre) => Genre.name === genre);
    const color = genreName ? genreName.color : "violet";
    return (
      <GenreBadge key={index} color={color} size={size}>
        {genre + "  "}
      </GenreBadge>
    );
  });

  return <View style={{ flexDirection: "row", ...style }}>{genres}</View>;
}

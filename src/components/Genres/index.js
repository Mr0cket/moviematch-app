import React from "react";
import { View, Text } from "react-native";
import GenreBadge from "./GenreBadge";

export default function Genres({ genreList, style, size }) {
  const genres = genreList.split(",", 3).map((genre, index) => (
    <GenreBadge key={index} style={{ borderRadius: 15 }} size={size}>
      {genre + "  "}
    </GenreBadge>
  ));

  return <View style={{ flexDirection: "row", ...style }}>{genres}</View>;
}

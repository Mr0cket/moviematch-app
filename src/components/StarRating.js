import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Rating = styled.Text`
  margin-top: 1%;
  margin-bottom: 2%;
  font-weight: 700;
  /* text-align: center; */
`;

export default function StarRating({ rating, size }) {
  const halfStar =
    (Math.floor(rating) / 2) % 1 ? (
      <FontAwesome name="star-half" size={size || 30} color="#fcbe39" />
    ) : (
      ""
    );

  const stars = new Array(Math.floor(rating / 2)).fill(
    <FontAwesome name="star" size={size || 30} color="#fcbe39" />
  );

  return (
    <Rating>
      {stars}
      {halfStar}
    </Rating>
  );
}

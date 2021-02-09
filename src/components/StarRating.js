import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Rating = styled.Text`
  margin-top: 1%;
  margin-bottom: 1%;
  font-weight: 600;
  font-size: 20px;
  color: #fcbe39;
`;

export default function StarRating({ rating, size, numeric }) {
  const starsCalc = Math.floor(rating / 2);
  const halfStar =
    (Math.floor(rating) / 2) % 1 ? (
      <FontAwesome key={starsCalc + 1} name="star-half" size={size || 30} color="#fcbe39" />
    ) : (
      ""
    );

  const stars = Array.from({ length: starsCalc }, (_, index) => (
    <FontAwesome key={index} name="star" size={size || 30} color="#fcbe39" />
  ));
  halfStar && stars.push(halfStar);
  return (
    <Rating>
      {stars}
      {numeric && "   " + rating / 2}
    </Rating>
  );
}

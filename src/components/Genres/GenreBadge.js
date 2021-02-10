import styled from "styled-components";
import React, { Children } from "react";

const GenreContainer = styled.View`
  padding: 1% 1.5%;
  border-radius: 15px;
  background-color: #bbbdbc; //#007bff;
  font-weight: 700;
  margin-right: 1%;
`;
const GenreText = styled.Text`
  font-weight: 700;
  color: white;
`;

export default function GenreBadge({ children, size }) {
  let fontSize = 14;
  if (size === "small") fontSize = 11;
  return (
    <GenreContainer>
      <GenreText style={{ fontSize }}>{children}</GenreText>
    </GenreContainer>
  );
}

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container";
import { fetchMovieList } from "../../store/movies/actions";
import { selectMatches } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";

export default function Matches() {
  const dispatch = useDispatch();
  const matches = useSelector(selectMatches);

  useEffect(() => {
    // initial list request
    if (matches.length < 1) dispatch(fetchMovieList("matches"));
  }, []);

  const matchesList = matches.map((movie) => <MovieRow key={movie.id} movie={movie} />);
  return (
    <Container>
      <Text>My Matches</Text>
      {matchesList}
    </Container>
  );
}

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container";
import { fetchMovieList } from "../../store/movies/actions";
import { selectlikedMovies } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";

export default function LikedMovies() {
  const dispatch = useDispatch();
  const likedMovies = useSelector(selectlikedMovies);

  useEffect(() => {
    // initial list request
    if (likedMovies.length < 1) dispatch(fetchMovieList("liked"));
  }, []);

  const likedMoviesList = likedMovies.map((movie) => <MovieRow key={movie.id} movie={movie} />);
  return (
    <Container style={{ overflow: "scroll" }}>
      <Text>My liked Movies</Text>
      {likedMoviesList}
    </Container>
  );
}

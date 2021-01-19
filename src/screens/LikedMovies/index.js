import React, { useEffect } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container";
import { fetchMovieList } from "../../store/movies/actions";
import { selectlikedMovies } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";
import Button from "../../components/Button";
export default function LikedMovies() {
  const dispatch = useDispatch();
  const likedMovies = useSelector(selectlikedMovies);

  useEffect(() => {
    // initial list request
    if (likedMovies.length < 1) dispatch(fetchMovieList("liked"));
  }, []);

  const likedMoviesList = likedMovies.map((movie) => <MovieRow key={movie.id} movie={movie} />);
  return (
    <ScrollView style={styles.container}>
      <Text>My liked Movies</Text>
      {likedMoviesList}
      <Button text="reload " onPress={() => dispatch(fetchMovieList("liked"))} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#d4d4f7",
  },
});

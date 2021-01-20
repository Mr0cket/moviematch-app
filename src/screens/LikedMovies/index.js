import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieList } from "../../store/movies/actions";
import { selectlikedMovies } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";
import { appLoading } from "../../store/appState/selectors";
import Title from "../../components/Title";

export default function LikedMovies() {
  const dispatch = useDispatch();
  const likedMovies = useSelector(selectlikedMovies);
  const loading = useSelector(appLoading);
  useEffect(() => {
    // initial list request
    if (likedMovies.length < 1) dispatch(fetchMovieList("liked"));
  }, []);

  // const likedMoviesList = likedMovies.map((movie) => <MovieRow key={movie.id} movie={movie} />);
  return (
    <FlatList
      ListHeaderComponent={<Title>Liked Movies</Title>}
      ListEmptyComponent={
        <>
          <Title>Your liked list is empty</Title>
          <Title>like some movies to add to the list</Title>
        </>
      }
      data={likedMovies}
      renderItem={MovieRow}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => dispatch(fetchMovieList("liked"))} />
      }
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#d4d4f7",
  },
});

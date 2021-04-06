import React, { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieList } from "../../store/movies/actions";
import { selectlikedMovies } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";
import { appLoading } from "../../store/appState/selectors";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";

export default function LikedMovies({ navigation }) {
  const dispatch = useDispatch();
  const likedMovies = useSelector(selectlikedMovies);
  const loading = useSelector(appLoading);
  const fetchMovies = () => dispatch(fetchMovieList("liked"))
  useEffect(() => {
    // initial list request
    if (likedMovies.length < 1) fetchMovies()
  }, [])
  const RenderItem = (props) => <MovieRow {...props} navigation={navigation} />
  const keyExtractor = (item) => item.id.toString()
  // const moviesLimitedLoad = navigation.isFocused() ? likedMovies : likedMovies.slice(0, 10);
  return (
    <FlatList
      ListHeaderComponent={<Title>Liked Movies</Title>}
      ListEmptyComponent={
        <>
          <SubTitle>Your liked list is empty</SubTitle>
          <SubTitle>like some movies to add to the list</SubTitle>
        </>
      }
      data={likedMovies}
      renderItem={RenderItem}
      initialNumToRender={4}
      removeClippedSubviews
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchMovies} />
      }
    />
  );
}

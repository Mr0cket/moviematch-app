import React, { useEffect } from "react";
import { FlatList, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container";
import { fetchMovieList } from "../../store/movies/actions";
import { selectMatches } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";
import { appLoading } from "../../store/appState/selectors";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";

export default function Matches() {
  const dispatch = useDispatch();
  const matches = useSelector(selectMatches);
  const loading = useSelector(appLoading);

  useEffect(() => {
    // initial list request
    if (matches.length < 1) dispatch(fetchMovieList("matches"));
  }, []);

  // const matchesList = matches.map((movie) => <MovieRow key={movie.id} movie={movie} />);
  return (
    <FlatList
      ListHeaderComponent={<Title>Party Matches</Title>}
      ListEmptyComponent={
        <>
          <SubTitle>Your Matches list is empty</SubTitle>
          <SubTitle>Join a party to find matches</SubTitle>
        </>
      }
      data={matches}
      renderItem={MovieRow}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => dispatch(fetchMovieList("matches"))}
        />
      }
    ></FlatList>
  );

  /* return (
    <Container>
      <Text>My Matches</Text>
      {matchesList}
    </Container>
  ); */
}

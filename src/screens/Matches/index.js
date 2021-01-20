import React, { useEffect } from "react";
import { FlatList, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container";
import { fetchMovieList } from "../../store/movies/actions";
import { selectMatches } from "../../store/movies/selectors";
import MovieRow from "../../components/MovieRow";
import styled from "styled-components";
import { appLoading } from "../../store/appState/selectors";

export default function Matches() {
  const dispatch = useDispatch();
  const matches = useSelector(selectMatches);
  const loading = useSelector(appLoading);

  useEffect(() => {
    // initial list request
    if (matches.length < 1) dispatch(fetchMovieList("matches"));
  }, []);
  const Title = styled.Text`
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin-bottom: 10%;
  `;

  // const matchesList = matches.map((movie) => <MovieRow key={movie.id} movie={movie} />);
  return (
    <FlatList
      ListHeaderComponent={<Title>Party Matches</Title>}
      ListEmptyComponent={
        <>
          <Title>Your Matches list is empty</Title>
          <Title>Join a party to find matches</Title>
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

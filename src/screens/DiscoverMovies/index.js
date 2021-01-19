import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { selectTheme } from "../../store/theme/selectors";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import MovieCard from "./MovieCard";
import Button from "../../components/Button";
import { fetchStagingList } from "../../store/staging/actions";
import { movieDisliked, movieliked } from "../../store/movies/actions";
import { selectStagingList } from "../../store/staging/selectors";
import Container from "../../components/Container";

export default function index({ navigation }) {
  const stagingList = useSelector(selectStagingList);
  const dispatch = useDispatch();
  const appLoading = useSelector((state) => state.appState.loading);
  console.log("appLoading:", appLoading);
  // const [screenState, setScreenState] = useState({ status: "idle", data: null, error: null });
  // FrontEnd request staged list of movies from API
  // BE provides List (checks for movies not in userMovies table)
  // adds any movies that have been liked by other users in the group
  /* 
  Behaviour: 
  - display the list 1st movie (item) to last, 
  - remove item from list after user Interaction? 
  - redux action does this??
  
  Redux Behaviour
  when fetched new movies, all movie data is sent to movies slice, id added to staging slice
  movies slice: all movie data fetched. Keyed by movie Ids.
  staging list slice: array of movie Ids
  When movie interacted with: 
  1. Like:
  - remove from staging list\
  - (actions to backend)
  - [on backend response] add to liked list
  - if <3 movies remain in queue, fetch more movies

  2. Dislike:
  - remove from staging List
  - (actions to backend)
  - [on backend response] ??
  - if <3 movies remain in queue, fetch more movies
  
  3.
  */
  useEffect(() => {
    // initial list request
    if (stagingList.length < 1) dispatch(fetchStagingList(true));
  }, []);

  const LoadingCard = styled.View`
    background-color: lightgrey;
    width: 85%;
    height: 75%;
    border-radius: 20px;
    align-items: center;
    margin-top: 5%;
  `;
  const ButtonRow = styled.View`
    flex-direction: row;
  `;

  const handleLike = (movie) => {
    console.log("movie liked, dispatch action");
    // send webSocket message to backend: liked movie
    // remove item from the staging list
    // render the next Image?
    // some animations??

    // temporary (super hacky) way:
    dispatch(movieliked(movie));
    if (stagingList.length < 2) {
      console.log("fetch more movies");
      dispatch(fetchStagingList(false));
    }
  };

  const handleDislike = (movie) => {
    console.log("movie disliked, dispatch action");
    // dispatch redux action
    // send webSocket message to backend: disLiked movie
    // other stuff??
    // temporary (super hacky) way:
    dispatch(movieDisliked(movie));
    if (stagingList.length < 2) {
      console.log("fetch more movies");
      dispatch(fetchStagingList(false));
    }
  };

  if (stagingList.length > 0 && !appLoading) {
    const movie = stagingList[0];
    // console.log("movie in discoverMovies:", movie);
    return (
      <Container>
        <MovieCard {...movie} />
        <ButtonRow>
          <Button
            text="dislike "
            style={{ backgroundColor: "rgb(244, 67, 54)" }}
            onPress={() => handleDislike(movie)}
          />
          <Button
            text="like "
            style={{ backgroundColor: "rgb(76, 175, 80)" }}
            onPress={() => handleLike(movie)}
          />
        </ButtonRow>
      </Container>
    );
  } else
    return (
      <Container>
        <LoadingCard>
          <Text>loading...</Text>
        </LoadingCard>
        <Button
          text="reload movies "
          style={{ backgroundColor: "rgb(244, 67, 54)" }}
          onPress={() => dispatch(fetchStagingList())}
        />
      </Container>
    );
}

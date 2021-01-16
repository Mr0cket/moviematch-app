import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { selectTheme } from "../../store/theme/selectors";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import MovieCard from "./MovieCard";
import Button from "../../components/Button";

export default function index({ navigation }) {
  const [screenState, setScreenState] = useState({ status: "idle", data: null, error: null });
  const [stagingList, setStagingList] = useState([]);
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
    const fetchMovieList = async () => {
      setScreenState({ ...screenState, status: "loading" });
      try {
        const response = await axios.get(apiUrl + "/stagedList");
        setScreenState({ status: "success", data: response.data });
      } catch (error) {
        console.log(error.message);
        setScreenState({ ...screenState, error });
      }
    };
    fetchMovieList();
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

  const handleLike = () => {
    console.log("movie liked, dispatch action");
    // send webSocket message to backend: liked movieId
    // remove item from the staging list
    // render the next Image?
    // some animations??

    // temporary (super hacky) way:
    const arr = screenState.data;
    const likedMovie = arr.shift();
    setScreenState({ ...screenState, data: arr });
    if (screenState.data.length < 3) {
      console.log("fetch more movies");
    }
  };

  const handleDislike = () => {
    console.log("movie disliked, dispatch action");
    // dispatch redux action
    // send webSocket message to backend: disLiked movieId
    // other stuff??
    // temporary (super hacky) way:
    const arr = screenState.data;
    const dislikedMovie = arr.shift();
    setScreenState({ ...screenState, data: arr });
  };

  if (screenState.status === "success") {
    const movie1 = screenState.data[0];
    return (
      <View style={styles.container}>
        <MovieCard {...movie1} />
        <ButtonRow>
          <Button
            text="dislike "
            style={{ backgroundColor: "rgb(244, 67, 54)" }}
            onPress={handleDislike}
          />
          <Button
            text="like "
            style={{ backgroundColor: "rgb(76, 175, 80)" }}
            onPress={handleLike}
          />
        </ButtonRow>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <LoadingCard>
          <Text>loading...</Text>
        </LoadingCard>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#d4d4f7",
    alignItems: "center",
    overflow: "scroll",
  },
});

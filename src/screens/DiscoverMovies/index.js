import { View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
//icons
import { Entypo } from "@expo/vector-icons";

// components
import MovieCard from "./MovieCard";
import Button from "./LikeButton";
import { fetchStagingList } from "../../store/staging/actions";
import { movieDisliked, movieliked } from "../../store/socketActions";
import { selectStagingList } from "../../store/movies/selectors";
import Container from "../../components/Container";
import { selectMatchModal } from "../../store/movies/selectors";
import MatchModal from "./MatchModal";
// import MovieDetails from "./MovieDetails";
// import { useSprings, animated } from "react-spring/native";

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

export default function index({ navigation, route }) {
  const stagingList = useSelector(selectStagingList);
  // const [props, setSprings] = useSprings(stagingList.length, (i) => ({
  //   x: 0,
  //   y: i * height * -1,
  //   scale: 1,
  //   opacity: 1,
  // }));
  const dispatch = useDispatch();
  const modalMovie = useSelector(selectMatchModal);
  useEffect(() => {
    // initial list request
    if (stagingList.length < 2) dispatch(fetchStagingList(true));
  }, []);
  const handleLike = (movie) => {
    dispatch(movieliked(movie));
    if (stagingList.length < 2) {
      console.log("fetching more movies");
      dispatch(fetchStagingList(false));
    }
  };

  const handleDislike = (movie) => {
    dispatch(movieDisliked(movie));
    if (stagingList.length < 2) {
      console.log("fetching more movies");
      dispatch(fetchStagingList(false));
    }
  };

  if (stagingList.length > 0) {
    // const movie = stagingList[0];
    // what should happen when like/dislike movie?
    // definitely not re-render the current list.
    // How do I not rerender the list?
    // don't remove the movie from the list in redux until all the movies of a stack have been interacted with.
    // need two staging lists in redux. current staging list & future staging list.
    // also don't add movies to the list (this will also cause a rerender). need a future list & a current list. maybe several current lists.
    // once all the movies have been interacted with:
    // unmount the first stack (don't unmount 2nd stack)
    // add a new list of movies
    // remount & set position to be underneath the second stack
    const movies = stagingList.map((movie) => <MovieCard movie={movie} navigation={navigation} />);

    return (
      <Container>
        {movies}
        {/* <MovieCard movie={movie} navigation={navigation} /> */}
        {/* <MovieDetails movie={movie} /> */}
        <ButtonRow>
          <Button
            text={<Entypo name="thumbs-down" size={32} color="#f0ece3" />}
            style={{ backgroundColor: "#900d0d", borderColor: "#810000" }}
            onPress={() => handleDislike(movie)}
          />
          <Button
            text={<Entypo name="thumbs-up" size={32} color="#f0ece3" />}
            style={{ backgroundColor: "#158467", borderColor: "#065446" }}
            onPress={() => handleLike(movie)}
          />
        </ButtonRow>
        {modalMovie && <MatchModal navigation={navigation} modalMovie={modalMovie} />}
      </Container>
    );
  } else
    return (
      <Container>
        <LoadingCard>
          <ActivityIndicator size="large" />
        </LoadingCard>
      </Container>
    );
}

function MovieStack({ movies, onAllSwiped }) {
  const [swiped, setSwiped] = useState([]);

  return movies.map((movie) => <MovieCard movie={movie} />);
}

import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
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
// import TinderCard from "react-tinder-card";

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

export default function index({ navigation }) {
  const stagingList = useSelector(selectStagingList);
  const dispatch = useDispatch();
  const modalMovie = useSelector(selectMatchModal);
  useEffect(() => {
    // initial list request
    if (stagingList.length < 1) dispatch(fetchStagingList(true));
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
    const movie = stagingList[0];

    return (
      <Container>
        <MovieCard movie={movie} navigation={navigation} />
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

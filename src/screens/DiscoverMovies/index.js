import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import MovieCard from "./MovieCard";
import Button from "../../components/Button";
import { fetchStagingList } from "../../store/staging/actions";
import { selectMatchModal } from "../../store/movies/selectors";
import { movieDisliked, movieliked } from "../../store/socketActions";
import { selectStagingList } from "../../store/staging/selectors";
import Container from "../../components/Container";
export default function index({ navigation }) {
  const stagingList = useSelector(selectStagingList);
  const dispatch = useDispatch();
  // const matchesModal = useSelector(selectMatchModal);
  const [modalVisible, setModalVisible] = useState(false);
  console.log("modalVisible:", modalVisible);
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
    dispatch(movieliked(movie));
    if (stagingList.length < 2) {
      console.log("fetch more movies");
      dispatch(fetchStagingList(false));
    }
  };

  const handleDislike = (movie) => {
    dispatch(movieDisliked(movie));
    if (stagingList.length < 2) {
      console.log("fetch more movies");
      dispatch(fetchStagingList(false));
    }
  };

  if (stagingList.length > 0) {
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
          <Button
            text="toggle Modal "
            style={{ backgroundColor: "rgb(76, 175, 80)" }}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </ButtonRow>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{ backgroundColor: "blue" }}>
            <Text>Hello</Text>
          </View>
          <Button
            text="toggle Modal "
            style={{ backgroundColor: "rgb(76, 175, 80)" }}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </Modal>
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

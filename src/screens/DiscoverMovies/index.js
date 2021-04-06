import { View, ActivityIndicator, Dimensions } from "react-native";
import React, { createRef, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
//icons
import { Entypo } from "@expo/vector-icons";

// components
import Button from "./LikeButton";
import { fetchStagingList } from "../../store/staging/actions";
import { movieDisliked, movieliked } from "../../store/socketActions";
import { selectStagingList } from "../../store/movies/selectors";
import Container from "../../components/Container";
import { selectMatchModal } from "../../store/movies/selectors";
import MatchModal from "./MatchModal";
import Title from "../../components/Title";
import MovieStack from "./MovieStack";
// import MovieDetails from "./MovieDetails";
// import { useSprings, animated } from "react-spring/native";

const { width, height } = Dimensions.get("window");

const ButtonRow = styled.View`
  flex-direction: row;
`;

export default function index ({ navigation, route }) {
  const dispatch = useDispatch()
  const modalMovie = useSelector(selectMatchModal)
  const stagingLists = useSelector(selectStagingList, (prevList, CurrList) => JSON.stringify(prevList) === JSON.stringify(CurrList))
  // const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    // initial list request
    console.log('staging', stagingLists.map(movie => movie.title))
    if (stagingLists.length < 2) dispatch(fetchStagingList(true))
    // else setMounted(true)
  }, [stagingLists])
  const handleLike = (movie) => {
    dispatch(movieliked(movie))
  }

  const handleDislike = (movie) => {
    dispatch(movieDisliked(movie))
  }
  const handleSwipe = (direction, movie) => {
    console.log("[handleSwipe] direction:", direction)
    switch (direction) {
      case "RIGHT":
        return handleLike(movie)
      case "LEFT":
        return handleDislike(movie)
    }
  }
  const stackRef = React.useRef()

  const onAllSwiped = () => {
    // setMounted(false)
    dispatch(fetchStagingList(false))
  }

  if (stagingLists.length > 0) {
    return (
      <Container>
        <View style={{ width: width / 1.17, height: height / 1.26 }}>
          {/* {isMounted && */}
          <MovieStack
            ref={stackRef}
            listId={0}
            stagingList={stagingLists}
            onAllSwiped={onAllSwiped}
            handleSwipe={handleSwipe}
            navigation={navigation}
          />
        </View>
        <ButtonRow>
          <Button
            text={<Entypo name="thumbs-down" size={32} color="#f0ece3" />}
            style={{ backgroundColor: "#900d0d", borderColor: "#810000" }}
            onPress={() => stackRef.current.imperativeSwipe("LEFT")}
          />
          <Button
            text={<Entypo name="thumbs-up" size={32} color="#f0ece3" />}
            style={{ backgroundColor: "#158467", borderColor: "#065446" }}
            onPress={() => stackRef.current.imperativeSwipe("RIGHT")}
          />
        </ButtonRow>
        {modalMovie && <MatchModal navigation={navigation} modalMovie={modalMovie} />}
      </Container>
    );
  } else
    return (
      <Container style={{ justifyContent: "center" }}>
        <Title>Loading Movies</Title>
        <ActivityIndicator size="large" color="blue" />
      </Container>
    );
}

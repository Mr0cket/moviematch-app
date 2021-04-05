import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, PanResponder, Image, InteractionManager } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import StarRating from "../../components/StarRating";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import Genres from "../../components/Genres";
import { animated, useSpring, interpolate } from "react-spring/native";

const platform = Object.keys(Constants.platform)[0];
const { width, height } = Dimensions.get("window");
const AnimatedView = animated(View);

const MovieCard = React.forwardRef(({ movie, navigation, handleSwipe }, parentRef) => {
  const { movieId, posterUrl, title, rating, releaseDate, mainGenre } = movie;

  const titleFontSize =
    title.length < 16
      ? 30
      : title.length < 22
      ? 24
      : title.length < 25
      ? 22
      : title.length < 32
      ? 20
      : 16;

  const [{ x, y, scale, opacity }, setSpring] = useSpring(() => ({
    to: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    from: {
      x: 0,
      scale: 1.5,
      y: -1000,
      opacity: 0,
    },
  }));
  const animateOut = async (gesture) => {
    // swipe triggered, animate card out in the direction specified
    const multiplier = width * 2;
    setSpring({
      x: gesture.vx * multiplier,
      opacity: 0,
    });
    await new Promise((resolve) => setTimeout(() => resolve(), 500))
  };
  let startTime;
  const filthyPanHandlers = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // create a timestamp to evaluate the length of the touch interation.
        console.log("touch down!");
        startTime = Date.now();
        setSpring({ scale: 1.05 });
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        setSpring({ x: gestureState.dx });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: async (evt, gestureState) => {
        console.log("touch up!");
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        // use gestureState.vx || gestureState.vx for x&y velocities
        const touchDuration = Date.now() - startTime;
        const triggered = Math.abs(gestureState.vx) > 0.5;
        if (touchDuration < 80 && !triggered) {
          // check the length of the touch. if it is <~ 100ms, it was a tap rather than a move gesture...?
          console.log("tap detected");
          setSpring({ x: 0, y: 0, scale: 1 })
          navigation.navigate("MovieDetails", { movieId });
        } else if (triggered) {
          const direction = getSwipeDirection(gestureState);
          await animateOut(gestureState);
          handleSwipe(direction, movie);
        } else {
          // animate the card back to the starting position
          setSpring({ x: 0, y: 0, scale: 1, opacity: 1 });
        }
      },
    })
  ).current;

  React.useImperativeHandle(parentRef, () => ({
    async swipe(dir = "RIGHT") {
      const power = 2;
      const sign = dir === "RIGHT" ? 1 : -1;
      animateOut({ vx: power * sign });
    },
  }));

  return (
    <View style={styles.cardContainer}>
      <AnimatedView
        {...filthyPanHandlers.panHandlers}
        style={[
          shadow,
          styles.card,
          { transform: [{ translateX: x }, { translateY: y }, { scale: scale }] },
        ]}
      >
        <Image
          source={{
            uri: posterUrl,
          }}
          defaultSource={require("../../../assets/placeholder.png")} // need to figure out how to rescale the poster to display the top part
          style={styles.poster}
        />
      </AnimatedView>
      <AnimatedView style={[styles.details, { opacity }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.title, fontSize: titleFontSize }}>{title + "  "} </Text>
          <Year>({releaseDate ? moment(releaseDate).format("YYYY") : "N/A"})</Year>
        </View>
        <StarRating size={25} rating={rating} />
        <Genres genreList={mainGenre} />
      </AnimatedView>
    </View>
  );
});

export default MovieCard;
const styles = StyleSheet.create({
  ios: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "black",
  },
  android: {
    elevation: 10,
  },
  poster: {
    resizeMode: "contain",
    width: width / 1.17,
    height: height / 1.5,
    borderRadius: 15,
  },
  card: {
    borderRadius: 23,
    overflow: "hidden",
    // position: "absolute",
  },
  title: {
    fontWeight: "700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
  details: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: height / 33,
    // marginLeft: 25,
    // marginRight: 25,
    backgroundColor: "rgb(242, 242, 242)",
    height: height / 7.9,
    overflow: "hidden",
  },
  cardContainer: {
    position: "absolute",
  },
});
const shadow = platform === "ios" ? styles.ios : styles.android;

const Year = styled.Text`
  font-size: 18px;
  align-self: flex-end;
`;

function getSwipeDirection(gesture) {
  if (Math.abs(gesture.vx) > Math.abs(gesture.vy)) {
    return gesture.vx > 0 ? "RIGHT" : "LEFT";
  } else {
    return gesture.vy > 0 ? "UP" : "DOWN";
  }
}

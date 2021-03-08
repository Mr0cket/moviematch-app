import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableHighlight, PanResponder } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import StarRating from "../../components/StarRating";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import Genres from "../../components/Genres";

// import animation library
import { animated, useSpring, interpolate } from "react-spring/native";

const platform = Object.keys(Constants.platform)[0];
const { width, height } = Dimensions.get("screen");
const AnimatedView = animated(View);

export default function MovieCard({ movie, navigation, like, dislike }) {
  const { movieId, posterUrl, overview, title, rating, releaseDate, mainGenre } = movie;
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
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  }));
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
        setSpring({ scale: 1.1, opacity: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        setSpring({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log("touch up!");
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        // use gestureState.vx || gestureState.vx for x&y velocities
        const touchDuration = Date.now() - startTime;
        const triggered = Math.abs(gestureState.vx) > 0.5;
        const multiplier = width + 250;
        console.log("velocityX:", gestureState.vx);
        console.log("touchDuration:", touchDuration);
        if (touchDuration < 80 && !triggered) {
          // check the length of the touch. if it is <~ 100ms, it was a tap rather than a move gesture...?
          console.log("tap detected");
          setSpring({ x: 0, y: 0, scale: 1, opacity: 1 });
          navigation.navigate("MovieDetails", { movieId });
        } else if (triggered) {
          // swipe triggered, animate card out in the direction specified
          setSpring({
            x: gestureState.vx * multiplier,
            y: gestureState.vy * multiplier,
            scale: 1.1,
          });
          setTimeout(() => {
            // gestureState.vx > 0 ? like(movie) : dislike(movie);
            // setSpring({ x: 0, y: 0, scale: 1, opacity: 1 });
          }, 1000);
        } else {
          // animate the card back to the starting position
          setSpring({ x: 0, y: 0, scale: 1, opacity: 1 });
        }
      },
    })
  ).current;

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
        <MoviePoster
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
}
const styles = StyleSheet.create({
  ios: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "black",
  },
  android: {
    elevation: 21,
  },
  poster: {
    resizeMode: "contain",
    width: 352,
    height: 528,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
  },
  title: {
    fontWeight: "700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
  details: {
    width: "80%",
    justifyContent: "flex-start",
    marginTop: "2%",
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "white",
    // position: "absolute",
  },
  cardContainer: {
    position: "absolute",
  },
});
const shadow = platform === "ios" ? styles.ios : styles.android;

// moviePoster default dimensions: 750*500
const MoviePoster = styled.Image`
  border-radius: 13px;
  width: 400px;
  height: 600px;
`;

const Year = styled.Text`
  font-size: 18px;
  align-self: flex-end;
`;

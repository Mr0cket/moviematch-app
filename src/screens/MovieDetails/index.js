import React, { useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../store/movies/actions";
import Container from "../../components/Container";
import StarRating from "../../components/StarRating";
import { selectMovie } from "../../store/movies/selectors";
import Genres from "../../components/Genres";
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import WatchProviders from "./WatchProviders";
import moment from "moment";

export default function MovieDetails({ route, navigation }) {
  const dispatch = useDispatch();
  const movieId = route.params.movieId;
  const movie = movieId && useSelector(selectMovie(movieId));

  // loading screen shows until 1st req is finished.
  // loading screen displays movie title & poster & activity indicator
  useEffect(() => {
    if (movie && !movie.runtime) dispatch(fetchMovieDetails(movieId));
  }, [movieId]);

  if (movie) {
    const {
      title,
      backdropUrl,
      posterUrl,
      overview,
      rating,
      runtime,
      mainGenre,
      watchProviders,
      releaseDate,
    } = movie;
    const stringifiedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={{ uri: backdropUrl }} style={styles.background}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
          </TouchableOpacity>
        </ImageBackground>
        {/* <Image source={{ uri: posterUrl }} style={styles.poster} /> */}
        <View style={styles.details}>
          <View>
            <StarRating size={25} rating={rating} numeric={true} />
            <Text style={styles.title}>{title + "  "} </Text>
            <Genres style={{ marginTop: 5 }} genreList={mainGenre} size="small" />
          </View>
          <Text style={{ marginTop: 20 }}>{moment(releaseDate).format("MMMM YYYY")}</Text>
          <Text style={{ marginTop: 20 }}>Runtime: {"  " + stringifiedRuntime}</Text>
          <Text style={styles.subTitle}>Overview: </Text>
          <Text style={styles.body}>{overview}</Text>
          {watchProviders ? (
            <WatchProviders watchProviders={watchProviders} navigation={navigation} />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    );
  } else
    return (
      <Container>
        <Text>
          loading.... <ActivityIndicator />
        </Text>
      </Container>
    );
}
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "white",
  },
  background: {
    height: height / 2.1,
  },
  details: {
    height: height / 1.8,
    paddingHorizontal: 15,
    // position: "absolute",
    borderRadius: 30,
    top: -27,
    backgroundColor: "white",
    overflow: "hidden",
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 25,
  },
  body: {
    fontSize: 14,
  },
  backButton: {
    width: 30,
    marginLeft: 15,
    marginTop: 25,
  },
  poster: {
    width: width / 4,
    resizeMode: "cover",
    position: "absolute",
    zIndex: 100,
    backgroundColor: "black",
  },
});

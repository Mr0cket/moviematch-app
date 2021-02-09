import React, { useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../store/movies/actions";
import Container from "../../components/Container";
import StarRating from "../../components/StarRating";
import { selectMovie } from "../../store/movies/selectors";
import Genres from "../../components/Genres";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import WatchProviders from "./WatchProviders";

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
    const { title, backdropUrl, overview, rating, runtime, mainGenre, watchProviders } = movie;
    // const whereToWatch =
    //   watchProviders &&
    //   Object.values(watchProviders)[1].buy.map((provider) => {
    //     return (
    //
    //     );
    //   });
    // if (whereToWatch.length > 4) whereToWatch.length = 4;
    const stringifiedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    return (
      <View>
        <ImageBackground source={{ uri: backdropUrl }} style={styles.background}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.details}>
          <StarRating size={25} rating={rating} numeric={true} />
          <Text style={styles.title}>{title + "  "} </Text>
          <Genres style={{ marginTop: 5 }} genreList={mainGenre} size="small" />
          <Text style={{ marginTop: 20 }}>Runtime: {"  " + stringifiedRuntime}</Text>
          <Text style={styles.subTitle}>Overview: </Text>
          <Text style={styles.body}>{overview}</Text>
          <Text style={styles.subTitle}>Where to Watch:</Text>
          {watchProviders && <WatchProviders watchProviders={watchProviders} />}
          {/* <View style={{ flexDirection: "row" }}>{whereToWatch}</View> */}
        </View>
      </View>
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
  background: {
    height: height / 2.1,
  },
  details: {
    height: height / 1.8,
    paddingHorizontal: 15,
    position: "absolute",
    borderRadius: 30,
    top: height / 2.2,
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
    fontWeight: "600",
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
});

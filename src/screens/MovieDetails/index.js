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
import Cast from "./Cast";
const { width, height } = Dimensions.get("screen");

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
      cast,
      language,
    } = movie;
    const stringifiedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={{ uri: backdropUrl }} style={styles.background}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.details}>
          <View>
            <StarRating size={25} rating={rating} numeric={true} />
            <Text style={styles.title}>{title + "  "} </Text>
            <Genres style={{ marginTop: 5 }} genreList={mainGenre} size="small" />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <MinorDetailItem
              name="Released"
              value={moment(releaseDate).format("MMMM YYYY") + "  "}
            />
            <MinorDetailItem name="Length" value={stringifiedRuntime} />
            {language && (
              <MinorDetailItem
                name="Language"
                value={language === "en" ? "English" : language.toUpperCase()}
              />
            )}
          </View>
          <Text style={styles.subTitle}>Overview </Text>
          <Text style={styles.body}>{overview}</Text>
          {cast && <Cast cast={cast} />}
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

const MinorDetailItem = ({ name, value }) => (
  <View style={{ marginHorizontal: width / 18 }}>
    <Text style={styles.detailName}>{name} </Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

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
    paddingHorizontal: 15,
    borderRadius: 30,
    top: -27,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "700",
    fontSize: 23,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "lightgrey",
    textShadowRadius: 0.4,
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 25,
  },
  detailName: { color: "grey", fontSize: 18 },
  detailValue: {
    fontSize: 15,
    fontWeight: "700",
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
    backgroundColor: "black",
  },
});

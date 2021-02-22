import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { tmdbImageUrl } from "../../config/constants";
export default function Cast({ cast }) {
  // console.log(cast);
  const actorList = cast.map((actor) => <ActorItem key={actor.cast_id} actor={actor} />);
  console.log("cast size:", actorList.length);
  actorList.length = Math.min(actorList.length, 5);
  return (
    <>
      <Text style={styles.subTitle}>Cast </Text>
      <View style={{ marginBottom: 20, marginTop: 10, flexDirection: "row" }}>{actorList}</View>
    </>
  );
}

function ActorItem({ actor }) {
  const { profile_path, name, gender } = actor;
  console.log(gender);
  return (
    <View style={styles.actorItem}>
      {profile_path ? (
        <Image style={styles.profilePic} source={{ uri: tmdbImageUrl + profile_path }} />
      ) : (
        <Image
          style={styles.profilePic}
          source={
            gender < 2
              ? require("../../../assets/female-profile-icon.png")
              : require("../../../assets/Men-Profile-Image.png")
          }
        />
      )}
      <Text style={styles.actorName}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  profilePic: { width: "100%", height: "100%", borderRadius: 50 },
  actorItem: { width: 60, height: 60, marginHorizontal: 7 },
  actorName: {
    fontSize: 10,
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 25,
  },
});

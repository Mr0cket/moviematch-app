import { Modal, View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import React from "react";
import { clearModal } from "../../store/movies/actions";
// import { selectMatchModal } from "../../store/movies/selectors";
// import { useDispatch, useSelector } from "react-redux";
export default function MatchModal({ modalMovie }) {
  // const modalMovie = useSelector(selectMatchModal);
  const modalVisible = Boolean(modalMovie);
  const { title, posterUrl } = modalMovie;
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.poster} source={{ uri: posterUrl }} />
          <Text style={{ ...styles.modalText, fontWeight: "600" }}>{title}</Text>
          <Text style={styles.modalText}>It's a Match!</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#373950",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});

import { Modal, View, Text, TouchableHighlight, StyleSheet } from "react-native";
import React from "react";
import { clearModal } from "../../store/movies/actions";
import { selectMatchModal } from "../../store/movies/selectors";
import { useDispatch, useSelector } from "react-redux";
export default function MatchModal() {
  const dispatch = useDispatch();
  const matchesModal = useSelector(selectMatchModal);
  const modalVisible = Boolean(matchesModal);
  const handleClick = () => {
    console.log("clicked hide button");
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  },
});

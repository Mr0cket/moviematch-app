import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectToken } from "../store/user/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useToken() {
  const dispatch = useDispatch();
  let token = useSelector(selectToken);
  const getToken = async () => {
    await AsyncStorage.getItem("token", (error, result) => {
      console.log(
        `[asyncStorage]: ${
          error || !result
            ? `error retrieving token: ${error ? error : "incorrect key"}`
            : `token retrieved: ${result}`
        }`
      );

      if (result) {
        dispatch(getUserWithStoredToken(result));
        token = result;
      }
    });
  };
  getToken();

  return token;
}

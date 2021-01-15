import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectToken } from "../store/user/selectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "../store/user/actions";

export default function useToken() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const getToken = async () => {
    const cachedToken = await AsyncStorage.getItem("token");
    console.log("cachedToken:", cachedToken);
    if (cachedToken) {
      dispatch(getUserWithStoredToken(cachedToken));
    }
  };
  useEffect(() => {
    if (!token) getToken();
  }, [getToken]);

  return token;
}

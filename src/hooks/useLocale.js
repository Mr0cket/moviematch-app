import AsyncStorage from "@react-native-async-storage/async-storage";
import { Localization } from "expo-localization";
import { useEffect } from "react";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../store/user/actions";
import { selectLocale } from "../store/user/selectors";
const platform = Object.keys(Constants.platform)[0];

export default function useToken() {
  const dispatch = useDispatch();
  const locale = useSelector(selectLocale);
  const getLocale = async () => {
    let cachedLocale = await AsyncStorage.getItem("locale");

    if (!cachedLocale && platform === "ios") cachedLocale = Localization.region; // won't work if android, but no harm in trying

    if (cachedLocale) {
      console.log("locale:", cachedLocale);
      dispatch(setLocale(cachedLocale));
    }
  };
  useEffect(() => {
    if (!locale) getLocale();
  }, [getLocale]);
  return locale;
}

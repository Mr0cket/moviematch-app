import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectLocale } from "../../store/user/selectors";
import { tmdbImageUrl } from "../../config/constants";
import matchCountry from "../../lib/matchCountry";
export default function WatchProviders({ watchProviders }) {
  const locale = useSelector(selectLocale);
  const country = matchCountry(locale);
  if (!locale)
    return (
      <View>
        <Text>choose your country to see where to watch</Text>
      </View>
    );
  if (watchProviders[locale]) {
    const { flatrate, rent, buy } = watchProviders[locale];
    const servicesList = Object.keys(watchProviders[locale]);
    console.log(`service types in ${country}:`, servicesList.join(", "));
    const serviceToShow = flatrate || rent || buy;
    return (
      <>
        <Text style={styles.subTitle}>
          Where to{" "}
          {servicesList.includes("flatrate")
            ? "stream"
            : servicesList.includes("rent")
            ? "rent"
            : "buy"}{" "}
          in {country}:
        </Text>
        <View style={{ flexDirection: "row" }}>
          {serviceToShow &&
            serviceToShow.map((provider) => (
              <View key={provider.provider_id} style={styles.logo}>
                <Image
                  source={{ uri: `${tmdbImageUrl}${provider.logo_path}` }}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
                <Text style={{ fontSize: 12 }}>{provider.provider_name}</Text>
              </View>
            ))}
        </View>
      </>
    );
  } else
    return (
      <View>
        <Text style={styles.subTitle}>Where to Watch in {country}:</Text>
        <Text>No watch information available</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginTop: 15,
    marginHorizontal: 10,
    resizeMode: "cover",
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 25,
  },
});

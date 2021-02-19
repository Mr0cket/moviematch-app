import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectLocale } from "../../store/user/selectors";
import { tmdbImageUrl } from "../../config/constants";
import matchCountry from "../../lib/matchCountry";
import Button from "../../components/Button";
export default function WatchProviders({ watchProviders, navigation }) {
  const locale = useSelector(selectLocale);
  const country = matchCountry(locale);
  if (!locale)
    return (
      <View>
        <Text style={styles.subTitle}>Where to Watch</Text>
        <Text>To find out where you can watch this movie, set a country</Text>
        <Button
          style={{ backgroundColor: "yellow" }}
          text={"Set Country"}
          onPress={() => navigation.navigate("Account")}
        />
      </View>
    );
  if (watchProviders[locale]) {
    const { flatrate, rent, buy } = watchProviders[locale];
    const servicesList = Object.keys(watchProviders[locale]);
    console.log(watchProviders[locale]);
    console.log(`service types in ${country}:`, servicesList.join(", "));
    const serviceToShow = flatrate || rent || buy;
    console.log(serviceToShow);
    return (
      <>
        <Text style={styles.subTitle}>
          {servicesList.includes("flatrate")
            ? "Stream"
            : servicesList.includes("rent")
            ? "Rent"
            : "Buy"}{" "}
          in {country}:
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 25 }}>
          {serviceToShow &&
            serviceToShow.map((provider) => (
              <View key={provider.provider_id}>
                <View style={styles.logo}>
                  <Image
                    source={{ uri: `${tmdbImageUrl}${provider.logo_path}` }}
                    style={{ width: "100%", height: "100%", borderRadius: 15 }}
                  />
                  <Text style={{ fontSize: 12 }}>{provider.provider_name}</Text>
                </View>
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

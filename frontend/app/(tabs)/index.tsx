import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import SearchResultsList from "../../components/SearchResultsList";

export default function TabOneScreen() {
  const [message, setMessage] = useState("empty");
  const [results, setResults] = useState<string[]>([]); // Annotate results as string[]

  useEffect(() => {
    console.log("Fetching data");
    axios
      .get("http://10.0.0.53:8080/hello")
      .then((response) => {
        console.log("Response:", response);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.title}>{message}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

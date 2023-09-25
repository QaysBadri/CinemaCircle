import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import SearchResultsList from "../../components/SearchResultsList";

export default function TabOneScreen() {
  const [results, setResults] = useState<string[]>([]); // Annotate results as string[]

  return (
    <View style={styles.container}>
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
});

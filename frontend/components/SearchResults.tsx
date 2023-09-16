import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface SearchResultsProps {
  result: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ result }) => {
  return (
    <TouchableOpacity
      style={styles.searchResult}
      onPress={() => alert(`You selected ${result}!`)}
    >
      <Text style={styles.resultText}>{result}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    padding: 10,
    backgroundColor: "#efefef",
    marginBottom: 10,
    borderRadius: 5,
  },
  resultText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchResults;

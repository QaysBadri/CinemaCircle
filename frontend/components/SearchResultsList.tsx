import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SearchResults from "./SearchResults";

interface SearchResultsListProps {
  results: string[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <View style={styles.resultsListContainer}>
      <FlatList
        data={results}
        renderItem={({ item }) => <SearchResults result={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultsListContainer: {
    width: "90%",
    flex: 1,
  },
});

export default SearchResultsList;

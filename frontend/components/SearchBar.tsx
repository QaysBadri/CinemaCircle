import React, { useState } from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";

const SearchBar = () => {
  const [text, setText] = useState("");

  return (
    <View style={styles.searchContainer}>
      <Image
        source={require("../assets/images/favicon.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Once Upon a Time in America"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "75%",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "gray",
    padding: 5,
    fontSize: 18,
    fontStyle: "italic",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    paddingHorizontal: 16,
    backgroundColor: "rgb(51, 51, 51)",
  },
});

export default SearchBar;

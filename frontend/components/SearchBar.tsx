import React, { useState } from "react";
import { TextInput, View, StyleSheet, Platform, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

interface SearchBarProps {
  setResults: (results: string[]) => void;
  results: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults, results }) => {
  const [text, setText] = useState("");

  //insert your backend IP here:
  const backendIp = "192.168.56.1"

  const fetchData = (value: string) => {
    console.log("Fetching data");
    axios
      .get(`http://${backendIp}:8080/search?query=${value}`)
      .then((response) => {
        console.log("Response:", response);
        const results = response.data;
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value: string) => {
    setText(value);
    if (value.trim() !== "") {
      fetchData(value);
    } else {
      // Clear the results if the search bar is empty
      setResults([]);
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <Icon
        name="search"
        size={20}
        color="royalblue"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="Once Upon a Time in America"
        value={text}
        onChangeText={handleChange}
        onFocus={() => {
          if (Platform.OS === "android") {
            return { outlineColor: "transparent", outlineStyle: "none" };
          } else {
            return { borderColor: "transparent", borderWidth: 0 };
          }
        }}
        />
      {/* these lines of code are broken */}
      {results.length > 0 && (
        <FlatList
          data={results}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};
  

const styles = StyleSheet.create({
  inputWrapper: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    padding: 0,
    backgroundColor: "#333333",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444444",
    shadowColor: "#555555",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    color: "#4169E1",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#CCCCCC",
    borderWidth: 0,
    fontSize: 20,
    marginLeft: 10,
  },
});

export default SearchBar;

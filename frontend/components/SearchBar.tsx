import React, { useState } from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

interface SearchBarProps {
  setResults: (results: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [text, setText] = useState("");

  const fetchData = (value: string) => {
    console.log("Fetching data");
    axios
      .get(`http://192.168.1.3:8080/hello?value=${value}`)
      .then((response) => {
        console.log("Response:", response);
        const results = [response.data.message]; // Assuming the "message" property contains "Hello World!"
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value: string) => {
    setText(value);
    fetchData(value);
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

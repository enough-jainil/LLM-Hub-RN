import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchContext } from "~/context/SearchContext";
import { searchAllResources } from "~/hooks/useGlobalSearch";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function SearchBar() {
  const { setSearchQuery } = useContext(SearchContext);
  const [localValue, setLocalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigation = useNavigation();

  const debouncedSearch = useCallback(
    (value) => {
      if (!value.trim()) {
        setSuggestions([]);
        setSearchQuery("");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const results = searchAllResources(value);
        setSuggestions(results);
        setSearchQuery(value.toLowerCase().trim());
        setIsLoading(false);
      }, 300);
    },
    [setSearchQuery]
  );

  useEffect(() => {
    return () => {
      setSuggestions([]);
    };
  }, []);

  const handleSearch = (value) => {
    setLocalValue(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setLocalValue("");
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSuggestionSelect = (suggestion) => {
    if (suggestion.type === "resource") {
      navigation.navigate("ResourceDetail", {
        tag: suggestion.tag || "",
        tag2: suggestion.tag2,
        name: suggestion.name,
      });
    } else if (suggestion.type === "category") {
      setSearchQuery(suggestion.name.toLowerCase());
      setLocalValue(suggestion.name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FontAwesome5
          name="search"
          size={16}
          color="#DAA520"
          style={styles.icon}
        />
        <TextInput
          value={localValue}
          onChangeText={handleSearch}
          placeholder="Search resources..."
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        {localValue.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <FontAwesome5
              name="times"
              size={16}
              color="#DAA520"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && (
        <ActivityIndicator
          size="small"
          color="#DAA520"
          style={styles.loading}
        />
      )}

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.suggestionItem,
                selectedIndex === index && styles.selectedSuggestion,
              ]}
              onPress={() => handleSuggestionSelect(item)}
            >
              <Text style={styles.suggestionText}>{item.name}</Text>
              <Text style={styles.suggestionCategory}>
                {item.type === "resource" ? item.category : "Category"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    alignSelf: "center",
    marginTop: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(218, 165, 32, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  loading: {
    marginTop: 8,
    alignSelf: "center",
  },
  suggestionsContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(218, 165, 32, 0.2)",
  },
  selectedSuggestion: {
    backgroundColor: "rgba(218, 165, 32, 0.2)",
  },
  suggestionText: {
    color: "white",
    fontSize: 16,
  },
  suggestionCategory: {
    fontSize: 12,
    color: "#9ca3af",
  },
});

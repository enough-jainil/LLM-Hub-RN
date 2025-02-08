import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { CategoryContext } from "~/context/CategoryContext"; // Ensure this exists in React Native
import { resourceBlocks } from "~/data/resources";

export default function CategorySelector() {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  return (
    <View style={styles.container}>
      {/* "All" button */}
      <TouchableOpacity
        onPress={() => setSelectedCategory(null)}
        style={[
          styles.button,
          selectedCategory === null && styles.selectedButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selectedCategory === null && styles.selectedButtonText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {/* Category Buttons */}
      <FlatList
        data={resourceBlocks}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item.title)}
            style={[
              styles.button,
              selectedCategory === item.title && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === item.title && styles.selectedButtonText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 500,
    alignSelf: "center",
    marginTop: 16,
  },
  listContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "rgba(220, 220, 220, 0.1)", // Equivalent to bg-doreturn-grey/10
    borderWidth: 1,
    borderColor: "rgba(220, 220, 220, 0.3)", // Equivalent to border-doreturn-grey/30
  },
  selectedButton: {
    backgroundColor: "rgba(218, 165, 32, 0.2)", // doreturn-gold/20
    borderColor: "rgba(218, 165, 32, 0.5)", // doreturn-gold/50
  },
  buttonText: {
    color: "#9ca3af", // Equivalent to text-zinc-400
    fontSize: 14,
  },
  selectedButtonText: {
    color: "#DAA520", // doreturn-gold
  },
});

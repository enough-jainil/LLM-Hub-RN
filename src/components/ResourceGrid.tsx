import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchContext } from "~/context/SearchContext";
import { CategoryContext } from "~/context/CategoryContext";
import { resourceBlocks } from "~/data/resources";
import { searchAllResources } from "~/hooks/useGlobalSearch";

const ResourceBlock = ({ title, description, resources, tag, tag2 }) => {
  const { searchQuery } = useContext(SearchContext);
  const navigation = useNavigation();
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const filteredResources = searchQuery
    ? searchAllResources(searchQuery)
        .filter(
          (result) => result.type === "resource" && result.category === title
        )
        .map((result) => resources.find((r) => r.name === result.name))
        .filter(Boolean)
    : resources;

  if (filteredResources.length === 0) {
    return <Text style={styles.noResourceText}>No resources found</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id.toString()}
        style={styles.resourceList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() =>
              navigation.navigate("ResourceDetail", {
                tag,
                tag2,
                name: item.name,
              })
            }
          >
            <Text style={styles.resourceId}>{item.id}</Text>
            <Image
              source={{ uri: item.favicon }}
              style={styles.favicon}
              onError={() => console.log("Image load failed")}
            />
            <Text style={styles.resourceName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => setIsViewAllOpen(true)}
        style={styles.viewAllButton}
      >
        <Text style={styles.viewAllText}>View All →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ResourceGrid() {
  const { selectedCategory } = useContext(CategoryContext);
  const { searchQuery } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DAA520" />
      </View>
    );
  }

  const getDisplayBlocks = () => {
    let blocks = resourceBlocks;

    if (selectedCategory && selectedCategory !== "all") {
      const [mainTag, subTag, subSubTag] = selectedCategory.split("-");

      blocks = blocks.filter((block) => {
        if (subSubTag) {
          return (
            block.tag === mainTag &&
            block.tag2 === subTag &&
            block.tag3 === subSubTag
          );
        }
        if (subTag) {
          return block.tag === mainTag && block.tag2 === subTag;
        }
        return block.tag === mainTag;
      });
    }

    if (searchQuery) {
      const searchResults = searchAllResources(searchQuery);
      const matchingCategories = new Set(
        searchResults
          .filter((result) => result.type === "category")
          .map((result) => result.name)
      );

      blocks = blocks.filter(
        (block) =>
          matchingCategories.has(block.title) ||
          searchResults.some(
            (result) =>
              result.type === "resource" && result.category === block.title
          )
      );
    }

    return blocks;
  };

  return (
    <FlatList
      data={getDisplayBlocks()}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.gridContainer}
      renderItem={({ item }) => <ResourceBlock {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "rgba(39, 39, 42, 0.1)", // bg-doreturn-grey/10
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(218, 165, 32, 0.3)", // doreturn-gold/30
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 10,
  },
  resourceList: {
    maxHeight: 250,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  resourceId: {
    color: "#9ca3af",
    fontSize: 14,
    minWidth: 24,
  },
  favicon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  resourceName: {
    color: "#fff",
    fontSize: 14,
  },
  viewAllButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(218, 165, 32, 0.8)", // doreturn-gold/80
    borderRadius: 20,
    alignItems: "center",
  },
  viewAllText: {
    color: "#fff",
    fontSize: 14,
  },
  noResourceText: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
  },
});

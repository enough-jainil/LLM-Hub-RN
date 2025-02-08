import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useCategory } from "@src/context/CategoryContext";
import { resourceBlocks } from "~/data/resources";

// Function to get categories and their sub-categories
const getCategories = () => {
  const categories = resourceBlocks.reduce((acc, block) => {
    if (!acc[block.tag]) {
      acc[block.tag] = {
        subTags: new Set(),
        subSubTags: new Map(),
      };
    }
    if (block.tag2) {
      acc[block.tag].subTags.add(block.tag2);
      if (block.tag3) {
        if (!acc[block.tag].subSubTags.has(block.tag2)) {
          acc[block.tag].subSubTags.set(block.tag2, new Set());
        }
        acc[block.tag].subSubTags.get(block.tag2).add(block.tag3);
      }
    }
    return acc;
  }, {});

  return [
    { id: "all", label: "All" },
    ...Object.entries(categories).map(([tag, { subTags, subSubTags }]) => ({
      id: tag,
      label: tag,
      subCategories: Array.from(subTags).map((subTag) => ({
        id: `${tag}-${subTag}`,
        label: subTag,
        subSubCategories: Array.from(subSubTags.get(subTag) || []).map(
          (subSubTag) => ({
            id: `${tag}-${subTag}-${subSubTag}`,
            label: subSubTag,
          })
        ),
      })),
    })),
  ];
};

// Main component
export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const categories = getCategories();
  const [mainCategory, subCategory, subSubCategory] = (
    selectedCategory || ""
  ).split("-");

  const currentMainCategory = categories.find((c) => c.id === mainCategory);
  const currentSubCategory = currentMainCategory?.subCategories?.find(
    (sc) => sc.id === `${mainCategory}-${subCategory}`
  );

  return (
    <View style={styles.container}>
      {/* Main Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[
              styles.categoryButton,
              category.id === mainCategory && styles.selectedCategoryButton,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                category.id === mainCategory && styles.selectedCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Subcategories */}
      {currentMainCategory?.subCategories?.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {currentMainCategory.subCategories.map((subCat) => (
            <TouchableOpacity
              key={subCat.id}
              onPress={() => setSelectedCategory(subCat.id)}
              style={[
                styles.subCategoryButton,
                subCat.id === `${mainCategory}-${subCategory}` &&
                  styles.selectedSubCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  subCat.id === `${mainCategory}-${subCategory}` &&
                    styles.selectedSubCategoryText,
                ]}
              >
                {subCat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Sub-subcategories */}
      {currentSubCategory?.subSubCategories?.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {currentSubCategory.subSubCategories.map((subSubCat) => (
            <TouchableOpacity
              key={subSubCat.id}
              onPress={() => setSelectedCategory(subSubCat.id)}
              style={[
                styles.subSubCategoryButton,
                subSubCat.id === selectedCategory &&
                  styles.selectedSubSubCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.subSubCategoryText,
                  subSubCat.id === selectedCategory &&
                    styles.selectedSubSubCategoryText,
                ]}
              >
                {subSubCat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 800,
    alignSelf: "center",
  },
  scrollContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "rgba(39, 39, 42, 0.5)", // Equivalent to bg-zinc-800/50
  },
  selectedCategoryButton: {
    backgroundColor: "#DAA520", // doreturn-gold
  },
  categoryText: {
    color: "#9ca3af", // text-zinc-400
    fontSize: 14,
  },
  selectedCategoryText: {
    color: "black",
  },
  subCategoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "rgba(39, 39, 42, 0.3)", // Equivalent to bg-zinc-800/30
  },
  selectedSubCategoryButton: {
    backgroundColor: "rgba(218, 165, 32, 0.2)", // doreturn-gold/20
  },
  subCategoryText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  selectedSubCategoryText: {
    color: "#DAA520", // doreturn-gold
  },
  subSubCategoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "rgba(39, 39, 42, 0.2)", // Equivalent to bg-zinc-800/20
  },
  selectedSubSubCategoryButton: {
    backgroundColor: "rgba(218, 165, 32, 0.1)", // doreturn-gold/10
  },
  subSubCategoryText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  selectedSubSubCategoryText: {
    color: "#DAA520",
  },
});

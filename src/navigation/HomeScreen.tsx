import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SearchProvider } from "../context/SearchContext";
import { CategoryProvider } from "../context/CategoryContext";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ResourceGrid from "../components/ResourceGrid";
import ContactSection from "../components/ContactSection";

export default function Index() {
  return (
    <CategoryProvider>
      <SearchProvider>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <Text style={styles.title}>
                Welcome to the MemoryView AI Resources Hub
              </Text>
              <Text style={styles.subtitle}>
                Your one-stop destination for all the resources you need to
                excel in your LLM journey.
              </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.section}>
              <SearchBar />
            </View>

            {/* Category Filter */}
            <View style={styles.section}>
              <CategoryFilter />
            </View>

            {/* Resource Grid */}
            <View style={styles.section}>
              <ResourceGrid />
            </View>

            {/* Contact Section */}
            <View style={styles.section}>
              <ContactSection />
            </View>
          </ScrollView>
        </View>
      </SearchProvider>
    </CategoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    maxWidth: 500,
  },
  section: {
    marginBottom: 32,
  },
});

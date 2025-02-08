import React from "react";
import { View, ScrollView } from "react-native";
import { SearchProvider } from "@src/context/SearchContext";
import { CategoryProvider } from "@src/context/CategoryContext";
import SearchBar from "@src/components/SearchBar";
import CategoryFilter from "@src/components/CategoryFilter";
import ResourceGrid from "@src/components/ResourceGrid";
import ContactSection from "@src/components/ContactSection";

export default function Page() {
  return (
    <CategoryProvider>
      <SearchProvider>
        <View style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* Search Bar */}
            <View style={{ marginBottom: 16 }}>
              <SearchBar />
            </View>

            {/* Category Filter */}
            <View style={{ marginBottom: 16 }}>
              <CategoryFilter />
            </View>

            {/* Resource Grid */}
            <View style={{ marginBottom: 16 }}>
              <ResourceGrid />
            </View>

            {/* Contact Section */}
            <ContactSection />
          </ScrollView>
        </View>
      </SearchProvider>
    </CategoryProvider>
  );
}

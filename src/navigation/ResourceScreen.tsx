import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ResourceCard from "../components/resource/ResourceCard";
import NotFound from "../components/resource/NotFound";
import { routeUtils } from "../utils/routes";

export default function ResourceDetail() {
  const route = useRoute();
  const { title, tag2, name } = route.params || {};

  const { decodedTitle, decodedTag2, decodedName } = routeUtils.decodePath(
    title,
    tag2,
    name
  );
  const { block, resource } = routeUtils.findBlockAndResource(
    decodedTitle,
    decodedTag2,
    decodedName
  );

  if (!resource || !block) {
    return <NotFound tag2={tag2} name={name} />;
  }

  return (
    <View style={styles.container}>
      <ResourceCard resource={resource} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 16,
  },
});

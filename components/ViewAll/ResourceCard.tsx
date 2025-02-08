import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ActionButtons } from "./ActionButtons";

interface Resource {
  favicon: string;
  name: string;
  description?: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {!imageError ? (
            <Image
              source={{ uri: resource.favicon }}
              style={styles.icon}
              onError={() => setImageError(true)}
            />
          ) : null}
        </View>
        <Text style={styles.title}>{resource.name}</Text>
      </View>

      <Text style={styles.description}>
        {resource.description ||
          "Explore this valuable resource for LLM development and research."}
      </Text>

      <ActionButtons resource={resource} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(24, 24, 27, 0.5)", // Equivalent to bg-zinc-900/50
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(39, 39, 42, 0.5)", // Equivalent to border-zinc-800/50
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: "#27272a", // zinc-800
    padding: 8,
    borderRadius: 12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "#9ca3af", // zinc-400
    marginBottom: 12,
    lineHeight: 20,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Clipboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface Resource {
  favicon: string;
  name: string;
  description?: string;
  description2?: string;
  link: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const navigation = useNavigation();

  const handleShare = async () => {
    const shareUrl = resource.link;

    try {
      await Linking.openURL(shareUrl);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome5 name="arrow-left" size={20} color="#9ca3af" />
        <Text style={styles.backText}>Back to All Resources</Text>
      </TouchableOpacity>

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
          <View style={styles.textContainer}>
            <Text style={styles.title}>{resource.name}</Text>
            <Text style={styles.description}>
              {resource.description2 || resource.description}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(resource.link)}
            style={styles.visitButton}
          >
            <Text style={styles.buttonText}>Visit Resource</Text>
            <FontAwesome5 name="arrow-right" size={16} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.buttonText}>Share</Text>
            <FontAwesome5 name="share" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {showShareToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>URL copied to clipboard!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1A",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backText: {
    color: "#9ca3af",
    fontSize: 16,
    marginLeft: 8,
  },
  card: {
    backgroundColor: "rgba(24, 24, 27, 0.5)", // Equivalent to bg-zinc-900/50
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(218, 165, 32, 0.3)", // doreturn-gold/30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: "#27272a", // zinc-800
    padding: 8,
    borderRadius: 12,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "#9ca3af", // zinc-400
    marginBottom: 12,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  visitButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DAA520", // doreturn-gold
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27272a", // zinc-800
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  toast: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#DAA520",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  toastText: {
    color: "#000",
    fontSize: 14,
  },
});

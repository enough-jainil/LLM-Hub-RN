import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowRight } from "lucide-react-native"; // Ensure you have a compatible icon package
import { routes } from "~/utils/routes";

interface Resource {
  link: string;
  tag: string;
  tag2: string;
  name: string;
}

interface ActionButtonsProps {
  resource: Resource;
}

export function ActionButtons({ resource }: ActionButtonsProps) {
  const navigation = useNavigation();

  const openExternalLink = () => {
    Linking.openURL(resource.link).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const navigateToDetails = () => {
    navigation.navigate(
      routes.resourceDetail(resource.tag, resource.tag2, resource.name)
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openExternalLink} style={styles.buttonPrimary}>
        <Text style={styles.buttonText}>Visit Resource</Text>
        <ArrowRight size={16} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToDetails}
        style={styles.buttonSecondary}
      >
        <Text style={styles.buttonText}>View Details</Text>
        <ArrowRight size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  buttonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#DAA520", // doreturn-gold (adjust as needed)
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#27272a", // zinc-800
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

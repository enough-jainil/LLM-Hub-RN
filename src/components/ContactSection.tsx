import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function ContactSection() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Want to showcase your open-source project or app?{"\n"}
        Or would you like to add or update a resource?
      </Text>
      <Text style={styles.description}>
        For project submissions or issues, please create a GitHub issue or DM us
        on Twitter/X.
      </Text>

      <View style={styles.buttonContainer}>
        {/* GitHub Link */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            openLink(
              "https://github.com/enough-jainil/remix-llm-resoures/issues/new"
            )
          }
        >
          <FontAwesome5 name="github" size={20} color="#DAA520" />
          <Text style={styles.buttonText}>GitHub</Text>
        </TouchableOpacity>

        {/* Twitter/X Link */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => openLink("https://twitter.com/doreturn_in")}
        >
          <FontAwesome5 name="twitter" size={20} color="#DAA520" />
          <Text style={styles.buttonText}>Twitter/X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    maxWidth: 600,
    alignSelf: "center",
    padding: 16,
    backgroundColor: "#2A2A2A", // Equivalent to bg-bg-secondary
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#DAA52050", // Equivalent to border-border-primary
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    color: "#9ca3af",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: "rgba(218, 165, 32, 0.1)", // doreturn-gold/10
    borderWidth: 1,
    borderColor: "rgba(218, 165, 32, 0.3)", // doreturn-gold/30
  },
  buttonText: {
    color: "#DAA520",
    fontSize: 16,
    fontWeight: "500",
  },
});

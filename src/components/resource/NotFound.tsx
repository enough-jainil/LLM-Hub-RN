import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"; // React Native icon alternative

interface NotFoundProps {
  tag2?: string;
  name?: string;
}

export default function NotFound({ tag2, name }: NotFoundProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <FontAwesome5
          name="sad-cry"
          size={48}
          color="#DAA520"
          style={styles.icon}
        />
        <Text style={styles.title}>Resource not found 😔</Text>
        {/* <Text style={styles.paramsText}>Params: {tag2}/{name}</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.linkText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: "white",
    marginBottom: 12,
  },
  linkText: {
    color: "#DAA520",
    fontSize: 16,
  },
});

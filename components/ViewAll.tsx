import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Resource } from "~/types/resource";
import { ModalHeader } from "./ViewAll/ModalHeader";
import { ResourceCard } from "./ViewAll/ResourceCard";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Define the props for the ViewAll component
interface ViewAllProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  resources: Resource[];
}

export default function ViewAll({
  isOpen,
  onClose,
  title,
  resources,
}: ViewAllProps) {
  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader
            title={title}
            description="Browse through our curated collection of resources"
            onClose={onClose}
          />

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.gridContainer}>
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </View>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome5 name="times" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 16,
    width: "90%",
    maxHeight: "85%",
    borderWidth: 1,
    borderColor: "rgba(218, 165, 32, 0.3)", // doreturn-gold/30
  },
  scrollContainer: {
    flexGrow: 1,
    paddingRight: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
});

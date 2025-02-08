import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchProvider } from "./context/SearchContext";
import { CategoryProvider } from "./context/CategoryContext";
import Index from "./navigation/HomeScreen"; // Home Screen
import ResourceDetail from "./navigation/ResourceScreen"; // Resource Detail Screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <CategoryProvider>
      <SearchProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Index} />
              <Stack.Screen name="ResourceDetail" component={ResourceDetail} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </SearchProvider>
    </CategoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
});

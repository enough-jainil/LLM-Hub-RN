import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the category context, including the selected category and a function to update it
type CategoryContextType = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

// Create a context for managing category state
export const CategoryContext = createContext<CategoryContextType>({
  selectedCategory: "all",
  setSelectedCategory: () => {},
});

// Provider component that wraps children and provides category state
export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

// Custom hook to use the CategoryContext, ensuring it's used within a provider
export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}

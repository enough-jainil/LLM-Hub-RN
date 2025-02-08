import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the search context, including the search query and a function to update it
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create a context for managing search state
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component that wraps children and provides search state
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook to use the SearchContext, ensuring it's used within a provider
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

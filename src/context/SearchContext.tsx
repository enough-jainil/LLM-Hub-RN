import React, { createContext, useState, useContext, ReactNode } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

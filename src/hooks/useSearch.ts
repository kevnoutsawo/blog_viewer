import { useState, useEffect } from 'react';

interface UseSearchResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
}

export const useSearch = (): UseSearchResult => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    setIsSearching(false);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, isSearching };
};

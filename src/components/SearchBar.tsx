import React, { useState, useRef, useEffect } from 'react';
import { Doctor } from '../types';
import { Search } from 'lucide-react';

interface SearchBarProps {
  doctors: Doctor[];
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, searchQuery, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
    
    if (value.length === 0) {
      onSearch('');
    }
  };

  const handleSuggestionClick = (doctorName: string) => {
    setInputValue(doctorName);
    onSearch(doctorName);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
    setShowSuggestions(false);
  };

  // Get up to 3 doctor name suggestions that match the input
  const getSuggestions = () => {
    if (!inputValue) return [];
    
    return doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 3) // Limit to 3 suggestions
      .map(doctor => doctor.name);
  };

  const suggestions = getSuggestions();

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            data-testid="autocomplete-input"
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            placeholder="Search doctor by name"
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200"
        >
          <ul className="divide-y divide-gray-100">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                data-testid="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm transition duration-150 ease-in-out"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
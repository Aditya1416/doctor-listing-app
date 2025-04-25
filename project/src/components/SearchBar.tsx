import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  suggestions, 
  onSelectSuggestion 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDisplaySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setDisplaySuggestions(newValue.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value) {
      setDisplaySuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    setDisplaySuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className={`
        flex items-center border-2 rounded-lg px-3 py-2 bg-white
        transition-all duration-200
        ${isFocused ? 'border-blue-500 shadow-md' : 'border-gray-200'}
      `}>
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for doctors..."
          className="w-full outline-none text-gray-700"
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            setDisplaySuggestions(value.length > 0);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          data-testid="autocomplete-input"
        />
      </div>
      
      {displaySuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef} 
          className="absolute w-full bg-white mt-1 rounded-lg shadow-lg z-10 border border-gray-200"
        >
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
              data-testid="suggestion-item"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
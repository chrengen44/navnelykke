
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAutocompleteSuggestions } from "@/integrations/supabase/search";
import { debounce } from "@/utils/debounce";
import { cn } from "@/lib/utils";

interface AutocompleteSearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
  inputClassName?: string;
  initialValue?: string; // Add initialValue prop to interface
}

export function AutocompleteSearch({
  placeholder = "Søk etter navn, betydning eller opprinnelse...",
  onSearch,
  className,
  inputClassName,
  initialValue = "" // Set default value
}: AutocompleteSearchProps) {
  // State
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a debounced version of the fetch function
  const debouncedFetch = useRef(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }
      
      setLoading(true);
      try {
        const results = await getAutocompleteSuggestions(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  // Update inputValue when initialValue prop changes
  useEffect(() => {
    if (initialValue !== undefined) {
      setInputValue(initialValue);
    }
  }, [initialValue]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length >= 1) {
      debouncedFetch(value);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setIsOpen(false);
    }
  };

  // Select a suggestion
  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setIsOpen(false);
    onSearch(suggestion);
    // Focus back on input after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
        
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          e.preventDefault();
          handleSelectSuggestion(suggestions[activeIndex]);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={cn("pl-10", inputClassName)}
            autoComplete="off"
          />
        </div>
      </form>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-2 text-center text-gray-500">Søker...</div>
          ) : suggestions.length === 0 ? (
            <div className="p-2 text-center text-gray-500">Ingen resultater funnet</div>
          ) : (
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={cn(
                    "px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2",
                    activeIndex === index ? "bg-gray-100" : ""
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

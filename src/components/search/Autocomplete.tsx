
import { useState, useEffect, useRef, useCallback } from 'react';
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
}

export function AutocompleteSearch({
  placeholder = "Søk etter navn, betydning eller opprinnelse...",
  onSearch,
  className,
  inputClassName
}: AutocompleteSearchProps) {
  // State
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fetch suggestions when input changes
  const fetchSuggestions = useCallback(async (query: string) => {
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
  }, []);
  
  // Create debounced version of fetch function
  const debouncedFetch = useRef(
    debounce((query: string) => fetchSuggestions(query), 300)
  ).current;
  
  // Update suggestions when input value changes
  useEffect(() => {
    debouncedFetch(inputValue);
    
    // Reset active index when input changes
    setActiveIndex(-1);
    
    // Only open dropdown after typing at least 2 characters and if we have results
    if (inputValue.length < 2) {
      setIsOpen(false);
    }
  }, [inputValue, debouncedFetch]);
  
  // Handle selection of a suggestion
  const handleSelectSuggestion = useCallback((value: string) => {
    setInputValue(value);
    onSearch(value);
    setIsOpen(false);
    inputRef.current?.focus();
  }, [onSearch]);
  
  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setIsOpen(false);
    }
  }, [inputValue, onSearch]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  // Handle keydown events for keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault(); // Prevent cursor from moving
        setActiveIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault(); // Prevent cursor from moving
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
        
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          e.preventDefault();
          handleSelectSuggestion(suggestions[activeIndex]);
        }
        break;
        
      case 'Escape':
        setIsOpen(false);
        break;
        
      default:
        break;
    }
  }, [isOpen, activeIndex, suggestions, handleSelectSuggestion]);

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
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (inputValue.length >= 2 && suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
            className={cn("pl-10", inputClassName)}
            autoComplete="off"
          />
        </div>
      </form>
      
      {/* Custom dropdown instead of Popover */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto">
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

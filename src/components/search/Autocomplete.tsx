
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle fetching suggestions when input changes
  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    try {
      const results = await getAutocompleteSuggestions(query);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Create debounced version of fetch function
  const debouncedFetch = useRef(
    debounce((query: string) => fetchSuggestions(query), 300)
  ).current;
  
  // Update suggestions when input value changes
  useEffect(() => {
    debouncedFetch(inputValue);
    
    // Only open popover after typing at least 2 characters
    if (inputValue.length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [inputValue, debouncedFetch]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setOpen(false);
    }
  };
  
  // Handle selection of a suggestion
  const handleSuggestionSelect = (value: string) => {
    setInputValue(value);
    onSearch(value);
    setOpen(false);
    
    // Focus the input after a short delay to ensure DOM updates
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={cn("pl-10", inputClassName)}
          onKeyDown={(e) => {
            // Handle navigation keys
            if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
        />
        
        {/* Suggestions popover */}
        {inputValue.length >= 2 && (
          <Popover 
            open={open} 
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              // If closing, refocus the input
              if (!isOpen) {
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 10);
              }
            }}
          >
            <PopoverTrigger asChild>
              <div className="h-0 w-0 overflow-hidden" />
            </PopoverTrigger>
            <PopoverContent 
              className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto bg-white shadow-lg" 
              align="start"
              sideOffset={5}
              onEscapeKeyDown={() => {
                setOpen(false);
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 10);
              }}
            >
              <Command>
                <CommandList>
                  <CommandEmpty>
                    {loading ? 'Søker...' : 'Ingen resultater funnet'}
                  </CommandEmpty>
                  <CommandGroup>
                    {suggestions.map((suggestion) => (
                      <CommandItem 
                        key={suggestion}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <span>{suggestion}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </form>
  );
}

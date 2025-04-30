
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

  // Create debounced version of the fetch function
  const debouncedFetch = useRef(
    debounce((query: string) => fetchSuggestions(query), 300)
  ).current;

  useEffect(() => {
    debouncedFetch(inputValue);
  }, [inputValue, debouncedFetch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Only open popover after typing at least 2 characters
    if (value.length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setOpen(false);
    }
  };

  const handleSuggestionSelect = (value: string) => {
    setInputValue(value);
    onSearch(value);
    setOpen(false);
    // Refocus the input field after selection
    inputRef.current?.focus();
  };

  // Don't open dropdown on initial click, only when typing
  const handleInputClick = () => {
    // We leave this function intentionally empty to maintain the API
    // The dropdown should only open based on character count, not on click
  };

  // Handle popover opening/closing without losing focus
  const handlePopoverOpenChange = (isOpen: boolean) => {
    // Only allow opening dropdown if there's enough text
    if (isOpen && inputValue.length < 2) {
      return; // Prevent opening if there's not enough text
    }
    
    setOpen(isOpen);
    
    // Critical fix: When popover closes, restore focus to input with a small delay
    // This ensures focus remains in the input field throughout the search process
    if (!isOpen && inputRef.current) {
      // Use requestAnimationFrame to ensure the DOM has updated first
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Popover open={open} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleInputClick}
              className={cn("pl-10", inputClassName)}
              // Enhanced to maintain focus during popover interactions
              onFocus={() => {
                // Only open if there's already enough text
                if (inputValue.length >= 2) {
                  setOpen(true);
                }
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto bg-white" 
          align="start"
          sideOffset={5}
          onInteractOutside={(e) => {
            // Prevent closing the popover when interacting outside but not on search input
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
              setOpen(false);
            }
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
    </form>
  );
}

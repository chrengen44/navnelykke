
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
  };

  // Focus handling
  const handleInputClick = () => {
    // Only open dropdown if there's already text and suggestions
    if (inputValue.length >= 2 && suggestions.length > 0) {
      setOpen(true);
    }
  };

  // Close popover when clicking outside
  const handlePopoverOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // Refocus on input when closing popover
    if (!isOpen && inputRef.current) {
      // Small timeout to ensure DOM is updated
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
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
            />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto" 
          align="start"
          sideOffset={5}
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

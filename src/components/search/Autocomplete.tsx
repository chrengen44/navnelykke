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
  const preserveFocusRef = useRef(false);

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
      // Focus must remain in the input field
      preserveFocusRef.current = true;
    }
  };

  const handleSuggestionSelect = (value: string) => {
    setInputValue(value);
    onSearch(value);
    setOpen(false);
    // Critical: Set flag to preserve focus after selection
    preserveFocusRef.current = true;
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Popover 
        open={open} 
        onOpenChange={(isOpen) => {
          // Only allow opening if we have enough text
          if (isOpen && inputValue.length < 2) return;
          
          setOpen(isOpen);
          
          // If closing popover and we've set the preserve focus flag
          if (!isOpen && preserveFocusRef.current) {
            // Reset flag
            preserveFocusRef.current = false;
            
            // Ensure input gets focus on next tick after React updates
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }
        }}
      >
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              className={cn("pl-10", inputClassName)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto bg-white" 
          align="start"
          sideOffset={5}
          onEscapeKeyDown={() => {
            // When pressing escape, we want to keep focus in the input
            preserveFocusRef.current = true;
          }}
          onPointerDownOutside={(e) => {
            // Don't close if clicking on the input
            if (inputRef.current && inputRef.current.contains(e.target as Node)) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            // If clicking outside but not on the input, allow closing
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
              // But we don't need to force focus in this case since user clicked elsewhere
              preserveFocusRef.current = false;
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

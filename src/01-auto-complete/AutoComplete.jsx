import React, { useCallback, useState } from "react";
import InputText from "./input-text";
import Button from "./button";
import Suggestions from "./suggestions";

function debounce(callback, delay) {
  let timeoutId = "";

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function AutoComplete({
  suggestions,
  onChange = () => {},
  isLoading,
  debounceInput = false,
}) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const debouncedFunction = useCallback(debounce(onChange, 500), []);

  function handleChangeQuery(value) {
    setQuery(value);
    setShowList(true);
    // onChange(value);
    manageDebouncing(value);
  }

  function clearQuery() {
    setQuery("");
  }

  function handleSuggestionSelect(selectedSuggestion) {
    setQuery(selectedSuggestion);
    // onChange(selectedSuggestion);
    manageDebouncing(selectedSuggestion);
    setShowList(false);
  }

  function manageDebouncing(value) {
    if (debounceInput) {
      debouncedFunction();
    } else {
      onChange(value);
    }
  }

  const filteredQuery = suggestions.filter((suggestion) => {
    return suggestion.toLowerCase().includes(query.toLowerCase());
  });

  let showSuggestionsWithLoader = !!query.length && showList;
  if (isLoading && query.length) {
    showSuggestionsWithLoader = true;
  }

  return (
    <div className="autocomplete">
      <div>
        <InputText value={query} onChange={handleChangeQuery} />
        <Button label="Clear" onClick={clearQuery} />
      </div>

      {showSuggestionsWithLoader && (
        <Suggestions
          suggestions={filteredQuery}
          onSelect={handleSuggestionSelect}
          selectedSuggestion={query}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default AutoComplete;

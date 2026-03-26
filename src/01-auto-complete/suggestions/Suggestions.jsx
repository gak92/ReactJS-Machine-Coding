import React from "react";
import "./style.css";
import Button from "../button";

function Suggestions({ suggestions, onSelect, selectedSuggestion, isLoading }) {
  if (isLoading) {
    return <div className="suggestions">Loading...</div>;
  }
  return (
    <div className="suggestions">
      {suggestions.map((suggestion) => {
        return (
          <ListItem
            suggestion={suggestion}
            key={suggestion}
            onSelect={onSelect}
            selectedSuggestion={selectedSuggestion}
          />
        );
      })}
    </div>
  );
}

export default Suggestions;

function ListItem({ suggestion, onSelect, selectedSuggestion }) {
  function handleSelect() {
    onSelect(suggestion);
  }
  return (
    <Button
      label={suggestion}
      onClick={handleSelect}
      data-selected={
        suggestion.toLowerCase() === selectedSuggestion.toLowerCase()
      }
    />
  );
}

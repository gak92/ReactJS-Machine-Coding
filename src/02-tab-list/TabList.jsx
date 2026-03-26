import "./style.css";
import Button from "./button/Button";
import { useState } from "react";

export default function TabList({
  tabs,
  defaultIndex = 0,
  onChange = () => {},
}) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleTabChange = (index) => {
    setSelectedIndex(index);
    onChange(index);
  };

  return (
    <div role="tablist">
      <div>
        {tabs.map((tab, index) => (
          <Button
            key={tab.id}
            label={tab.label}
            onClick={() => handleTabChange(index)}
            data-selected={selectedIndex === index}
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
          />
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`tab-${tabs[selectedIndex].id}`}
        id={`tabpanel-${tabs[selectedIndex].id}`}
      >
        {tabs[selectedIndex]?.component()}
      </div>
    </div>
  );
}

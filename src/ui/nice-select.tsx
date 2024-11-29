"use client";
import React, { useState, useCallback, useRef } from "react";
import { useClickAway } from "react-use";

type Option = {
  value: string;
  label: string;
};

type IPropType = {
  options: Option[];
  defaultCurrent: number;
  placeholder?: string;
  cls?: string | undefined;
  onChange: (item: Option) => void;
  name: string;
};

const NiceSelect = ({
  options,
  defaultCurrent,
  placeholder,
  cls,
  onChange,
  name
}: IPropType) => {
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options); // Holds filtered options
  const [current, setCurrent] = useState(options[defaultCurrent]);

  const onClose = useCallback(() => {
    setOpen(false);
    setSearchItem(""); // Clear the search input
    setFilteredOptions(options); // Reset filtered options to the full list
  }, [options]);

  const ref = useRef(null);
  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    setCurrent(item);
    onChange(item);
    setSearchItem("");
    onClose(); // Close dropdown and reset state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem(value);

    // Filter options based on the search item
    if (value.trim() === "") {
      setFilteredOptions(options); // Show full list if input is cleared
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  return (
    <div
      className={`nice-select ${cls ? cls : ""} ${open && "open"}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      ref={ref}
    >
      <span className="current">{current?.label || placeholder}</span>
      {open && (
        <ul
          className="list"
          role="menubar"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            value={searchItem}
            onChange={handleChange}
            placeholder="Search..."
            className="select-search-input"
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, i) => (
              <li
                key={i}
                data-value={item.value}
                className={`option ${
                  item.value === current?.value && "selected focus"
                }`}
                role="menuitem"
                onClick={() => currentHandler(item)}
              >
                {item.label}
              </li>
            ))
          ) : (
            <li className="no-results" role="menuitem">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default NiceSelect;

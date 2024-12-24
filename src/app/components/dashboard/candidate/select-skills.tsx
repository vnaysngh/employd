import React, { useState } from "react";
import skills from "@/data/json/skills.json";
import Select from "react-select";

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: "#1d1e26",
    border: "1px solid hsla(0, 0%, 100%, 0.1)",
    padding: "6px 0",
    borderRadius: "7px"
  }),
  input: (styles: any) => ({ ...styles, color: "#ffffffd9" })
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectSkills = ({
  defaultValue,
  onChange
}: {
  defaultValue: any[];
  onChange: (item: any) => void;
}) => {
  console.log(defaultValue);
  return (
    <Select
      value={defaultValue}
      isMulti
      placeholder="Select Skills"
      name="colors"
      onChange={onChange}
      options={skills}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={colourStyles}
      components={customComponents}
    />
  );
};

export default SelectSkills;

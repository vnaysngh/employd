import skillOptions from "@/data/json/skills";
import React from "react";
import Select from "react-select";

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    padding: "6px 0",
    borderRadius: "8px",
    fontSize: "14px"
  }),
  input: (styles: any) => ({ ...styles, color: "#1f2937" })
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectSkills = ({
  defaultValue,
  onChange
}: {
  defaultValue?: any[];
  onChange: (item: any) => void;
}) => {
  return (
    <Select
      value={defaultValue}
      isMulti
      placeholder="Select Skills"
      name="colors"
      onChange={onChange}
      options={skillOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={colourStyles}
      components={customComponents}
    />
  );
};

export default SelectSkills;

import React, { useState } from "react";
import roles from "@/data/json/roles.json";
import AsyncSelect from "react-select/async";

type Option = {
  value: string;
  label: string;
};

const styles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    padding: "6px 0",
    borderRadius: "8px",
    fontSize: "14px",
    boxShadow: "6px 6px 0px 0px rgba(0, 0, 0, 0.09)",
    width: "300px"
  }),
  input: (styles: any) => ({ ...styles, color: "#1f2937" }),
  singleValue: (styles: any) => ({ ...styles, color: "#1f2937" })
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectUser = ({
  onChange,
  options
}: {
  onChange: (item: any) => void;
  options: Option[];
}) => {
  const loadOptions = async (inputValue: string) => {
    return options.filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={options}
      placeholder="Search here.."
      onChange={onChange}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
  );
};

export default SelectUser;

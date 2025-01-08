import React, { useState } from "react";
import roles from "@/data/json/roles.json";
import Select from "react-select";

const styles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: "$bg-input",

    padding: "6px 0",
    borderRadius: "8px",
    fontSize: "14px"
  }),
  input: (styles: any) => ({ ...styles, color: "#1f2937" }),
  singleValue: (styles: any) => ({ ...styles, color: "#1f2937" })
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectRole = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    // <div className="multi-select-input">
    <Select
      // defaultValue={}
      // isMulti
      placeholder="Select Role"
      name="colors"
      onChange={onChange}
      options={roles}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
    // </div>
  );
};

export default SelectRole;

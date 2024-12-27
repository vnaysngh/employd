import React from "react";
import Select from "react-select";

const styles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: "$bg-input",
    border: "1px solid $color-border",
    padding: "6px 0",
    borderRadius: "8px"
  }),
  input: (styles: any) => ({ ...styles, color: "#333" }),
  singleValue: (styles: any) => ({ ...styles, color: "#333" })
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectSalaryType = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    <Select
      placeholder={"Employment Type"}
      name="colors"
      onChange={onChange}
      options={[
        { value: "yearly", label: "Yearly" },
        { value: "monthly", label: "Monthly" },
        { value: "weekly", label: "Weekly" },
        { value: "hourly", label: "Hourly" }
      ]}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
  );
};

export default SelectSalaryType;

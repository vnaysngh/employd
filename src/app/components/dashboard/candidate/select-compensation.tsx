import React from "react";
import Select from "react-select";
import compensations from "@/data/json/salary.json";

const styles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: "$bg-input",
    border: "1px solid $color-border",
    padding: "6px 0",
    borderRadius: "8px"
  }),
  input: (styles: any) => ({ ...styles, color: "#1f2937" }),
  singleValue: (styles: any) => ({ ...styles, color: "#1f2937" })
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectCompensation = ({
  onChange,
  placeHolder
}: {
  onChange: (item: any) => void;
  placeHolder: string;
}) => {
  return (
    <Select
      placeholder={placeHolder}
      name="colors"
      onChange={onChange}
      options={compensations}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
  );
};

export default SelectCompensation;

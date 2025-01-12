import React from "react";
import Select from "react-select";
import compensations from "@/data/json/salary.json";

const styles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: "rgb(44, 45, 48)",
    borderColor: "inherit",
    borderRadius: "8px",
    fontSize: "14px"
  }),
  input: (styles: any) => ({ ...styles, color: "#fff" }),
  singleValue: (styles: any) => ({ ...styles, color: "#fff" })
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

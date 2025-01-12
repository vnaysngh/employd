import React from "react";
import Select from "react-select";

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

const SelectEmploymentType = ({
  onChange
}: {
  onChange: (item: any) => void;
}) => {
  return (
    <Select
      placeholder={"Employment Type"}
      name="colors"
      onChange={onChange}
      options={[
        { value: "full-time", label: "Full Time" },
        { value: "part-time", label: "Part Time" },
        { value: "internship", label: "Internship" }
      ]}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
  );
};

export default SelectEmploymentType;

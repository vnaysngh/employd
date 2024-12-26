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

const SelectYear = ({
  placeHolder,
  onChange
}: {
  placeHolder: string;
  onChange: (item: any) => void;
}) => {
  const generateYearOptions = (startYear: number, endYear: number) => {
    return Array.from({ length: startYear - endYear + 1 }, (_, index) => {
      const year = startYear - index;
      return { value: year.toString(), label: year.toString() };
    });
  };

  const options = generateYearOptions(2024, 2001);
  return (
    <Select
      placeholder={placeHolder}
      name="colors"
      onChange={onChange}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
  );
};

export default SelectYear;

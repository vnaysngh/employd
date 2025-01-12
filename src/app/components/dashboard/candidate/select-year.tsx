import React from "react";
import Select from "react-select";

const styles = {
  control: (styles: any, state: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: state.isDisabled ? "#202529" : "rgb(44, 45, 48)",
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

const SelectYear = ({
  placeHolder,
  onChange,
  isDisabled
}: {
  placeHolder: string;
  onChange: (item: any) => void;
  isDisabled?: boolean;
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
      isDisabled={isDisabled}
    />
  );
};

export default SelectYear;

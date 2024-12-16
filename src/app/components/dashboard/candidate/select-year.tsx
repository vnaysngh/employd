import React from "react";
import Select from "react-select";

const styles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: "#1d1e26",
    border: "1px solid hsla(0, 0%, 100%, 0.1)",
    padding: "6px 0",
    borderRadius: "7px"
  }),
  input: (styles: any) => ({ ...styles, color: "#ffffffd9" }),
  singleValue: (styles: any) => ({ ...styles, color: "#ffffffd9" })
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
    />
  );
};

export default SelectYear;

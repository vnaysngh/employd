import React, { useState } from "react";
import Select from "react-select";

const styles = {
  control: (styles: any, state: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: state.isDisabled ? "#202529" : "rgb(44, 45, 48)", // Light grey for disabled
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

const SelectMonth = ({
  placeHolder,
  onChange,
  isDisabled
}: {
  placeHolder: string;
  onChange: (item: any) => void;
  isDisabled?: boolean;
}) => {
  return (
    <Select
      placeholder={placeHolder}
      name="colors"
      onChange={onChange}
      options={[
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" }
      ]}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
      isDisabled={isDisabled}
    />
  );
};

export default SelectMonth;

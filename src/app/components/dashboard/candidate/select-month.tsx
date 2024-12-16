import React, { useState } from "react";
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

const SelectMonth = ({
  placeHolder,
  onChange
}: {
  placeHolder: string;
  onChange: (item: any) => void;
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
    />
  );
};

export default SelectMonth;

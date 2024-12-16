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
        { value: "part-time", label: "Part Time" }
      ]}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
    />
  );
};

export default SelectEmploymentType;

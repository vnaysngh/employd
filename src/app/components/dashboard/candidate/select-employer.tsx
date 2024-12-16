import React, { useState } from "react";
import roles from "@/data/json/roles.json";
import AsyncSelect from "react-select/async";

type Option = {
  value: string;
  label: string;
};

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

const SelectEmployer = ({
  onChange,
  options
}: {
  onChange: (item: any) => void;
  options: Option[];
}) => {
  const loadOptions = async (inputValue: string) => {
    return options.filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  return (
    // <div className="multi-select-input">
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={options}
      // defaultValue={}
      // isMulti
      placeholder="Select Employer"
      // name="colors"
      onChange={onChange}
      // options={roles}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
    />
    // </div>
  );
};

export default SelectEmployer;

import React, { useState } from "react";
import roles from "@/data/json/roles.json";
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

const SelectRole = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    // <div className="multi-select-input">
    <Select
      // defaultValue={}
      // isMulti
      placeholder="Select Role"
      name="colors"
      onChange={onChange}
      options={roles}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
    />
    // </div>
  );
};

export default SelectRole;

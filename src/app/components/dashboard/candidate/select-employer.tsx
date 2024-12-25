import React from "react";
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

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null // Removes the separator line
};

const SelectEmployer = ({
  onChange,
  options
}: {
  onChange: (item: Option) => void;
  options: Option[];
}) => {
  const filterOptions = (inputValue: string) => {
    const matchingOptions = options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (inputValue) {
      matchingOptions.push({
        value: "create-new",
        label: inputValue // Use the user's input directly
      });
    }

    return matchingOptions;
  };

  const loadOptions = async (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
      resolve(filterOptions(inputValue));
    });

  const handleChange = (selectedOption: any) => {
    if (selectedOption?.value === "create-new") {
      const newCompany = selectedOption.label; // Directly use the user's input
      onChange({ value: newCompany, label: newCompany });
    } else {
      onChange(selectedOption);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={options}
      placeholder="Select Employer"
      onChange={handleChange}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={styles}
      components={customComponents}
    />
  );
};

export default SelectEmployer;

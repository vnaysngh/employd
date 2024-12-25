import React from "react";
import AsyncSelect from "react-select/async";
import nav_1 from "@/assets/dashboard/images/icon/company.png";
import Image from "next/image";

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

const CustomOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        borderBottom: "1px solid #ddd"
      }}
    >
      <Image
        src={data?.image || nav_1}
        alt={data.label}
        style={{ borderRadius: "50%", marginRight: "10px", background: "#fff" }}
        height={24}
        width={24}
      />
      <div>
        <div style={{ fontWeight: "bold" }}>{data.label}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {data?.company_details?.website}
        </div>
      </div>
    </div>
  );
};

const customComponents = {
  DropdownIndicator: () => null, // Hides the dropdown indicator
  IndicatorSeparator: () => null,
  Option: CustomOption
  // SingleValue: CustomSingleValue
};

const generateRandomEnsName = (companyName: string) => {
  // Generate a random number between 100 and 999
  const randomNum = Math.floor(Math.random() * 900) + 100;

  // Create the ENS name
  const ensName = `${companyName.toLowerCase()}-${randomNum}`;

  return ensName;
};

const SelectEmployer = ({
  onChange,
  options,
  setNewEmployer
}: {
  onChange: (item: Option) => void;
  options: Option[];
  setNewEmployer: (item: any) => void;
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
      setNewEmployer(true);
      onChange({ value: generateRandomEnsName(newCompany), label: newCompany });
    } else {
      onChange(selectedOption);
      setNewEmployer(false);
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

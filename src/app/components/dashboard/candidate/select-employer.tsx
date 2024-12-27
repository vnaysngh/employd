import React from "react";
import AsyncSelect from "react-select/async";
import nav_1 from "@/assets/dashboard/images/icon/company.png";
import Image from "next/image";

type Option = {
  value: string;
  label: string;
};

const styles = {
  control: (styles: any, state: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: state.isDisabled ? "#f5f5f5" : "$bg-input", // Light grey for disabled
    padding: "6px 0",
    borderRadius: "8px"
  }),
  input: (styles: any) => ({ ...styles, color: "#333" }),
  singleValue: (styles: any) => ({ ...styles, color: "#333" })
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
        style={{
          borderRadius: "50%",
          marginRight: "10px",
          background: "$text-white"
        }}
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

const SelectEmployer = ({
  onChange,
  options,
  isDisabled
}: {
  onChange: (item: Option) => void;
  options: Option[];
  isDisabled: string;
}) => {
  const filterOptions = (inputValue: string) => {
    const matchingOptions = options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    // if (inputValue) {
    //   matchingOptions.push({
    //     value: "create-new",
    //     label: inputValue // Use the user's input directly
    //   });
    // }

    return matchingOptions;
  };

  const loadOptions = async (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
      resolve(filterOptions(inputValue));
    });

  const handleChange = (selectedOption: any) => {
    // if (selectedOption?.value === "create-new") {
    //   const newCompany = selectedOption.label; // Directly use the user's input
    //   setNewEmployer(true);
    //   onChange({ value: generateRandomEnsName(newCompany), label: newCompany });
    // } else {
    onChange(selectedOption);
    // }
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
      isDisabled={Boolean(isDisabled)}
      components={customComponents}
    />
  );
};

export default SelectEmployer;

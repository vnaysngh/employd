import React from "react";
import AsyncSelect from "react-select/async";
import nav_1 from "@/assets/dashboard/images/icon/company.png";
import Image from "next/image";

type Option = {
  value: string;
  label: string;
  ens_name: string;
};

const styles = {
  control: (styles: any, state: any) => ({
    ...styles,
    minHeight: 50,
    backgroundColor: state.isDisabled ? "#f5f5f5" : "$bg-input",
    padding: "6px 0",
    borderRadius: "8px"
  }),
  input: (styles: any) => ({ ...styles, color: "#1f2937" }),
  singleValue: (styles: any) => ({ ...styles, color: "#1f2937" })
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
        height={36}
        width={36}
      />
      <div>
        <div style={{ fontWeight: "bold" }}>{data.label} </div>
        <div
          style={{
            fontSize: "12px",
            background: "#888",
            color: "#fff",
            padding: "2px 5px",
            width: "fit-content",
            borderRadius: "4px"
          }}
        >
          {`${data?.ens_name}.employd.eth`}
        </div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {data?.company_description}
        </div>
      </div>
    </div>
  );
};

const customComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  Option: CustomOption
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
    const matchingOptions = options.filter((option) => {
      // Check if either `label` or `ens_name` matches the input
      const matchesLabel = option.label
        ?.toLowerCase()
        .includes(inputValue.toLowerCase());
      const matchesEnsName = option.ens_name
        ?.toLowerCase()
        .includes(inputValue.toLowerCase());

      return matchesLabel || matchesEnsName;
    });

    return matchingOptions;
  };
  const loadOptions = async (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
      resolve(filterOptions(inputValue));
    });

  const handleChange = (selectedOption: any) => {
    onChange(selectedOption);
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={options}
      placeholder="Search by company name or ens"
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

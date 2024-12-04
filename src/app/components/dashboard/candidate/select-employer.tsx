import NiceSelect from "@/ui/nice-select";
import React from "react";

type Option = {
  value: string;
  label: string;
};

const SelectEmployer = ({
  onChange,
  options
}: {
  onChange: (item: any) => void;
  options: Option[];
}) => {
  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        options={options}
        defaultCurrent={0}
        onChange={onChange}
        name="Employment Type"
      />
    </div>
  );
};

export default SelectEmployer;

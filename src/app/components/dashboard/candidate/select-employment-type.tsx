import NiceSelect from "@/ui/nice-select";
import React from "react";

const SelectEmploymentType = ({
  onChange
}: {
  onChange: (item: any) => void;
}) => {
  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        options={[
          { value: "full-time", label: "Full Time" },
          { value: "part-time", label: "Part Time" }
        ]}
        defaultCurrent={0}
        onChange={onChange}
        name="Employment Type"
      />
    </div>
  );
};

export default SelectEmploymentType;

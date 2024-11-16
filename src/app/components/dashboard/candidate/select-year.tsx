import NiceSelect from "@/ui/nice-select";
import React from "react";

const SelectYear = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        options={[
          { value: "2024", label: "2024" },
          { value: "2023", label: "2023" },
          { value: "2022", label: "2022" },
          { value: "2021", label: "2021" },
          { value: "2020", label: "2020" },
          { value: "2019", label: "2019" },
          { value: "2018", label: "2018" }
        ]}
        defaultCurrent={0}
        onChange={onChange}
        name="Year"
      />
    </div>
  );
};

export default SelectYear;

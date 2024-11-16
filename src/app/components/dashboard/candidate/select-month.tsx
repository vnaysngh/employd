import NiceSelect from "@/ui/nice-select";
import React from "react";

const SelectMonth = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        options={[
          { value: "01", label: "January" },
          { value: "02", label: "February" },
          { value: "03", label: "March" },
          { value: "04", label: "April" },
          { value: "05", label: "May" },
          { value: "06", label: "June" },
          { value: "07", label: "July" },
          { value: "08", label: "August" },
          { value: "09", label: "September" },
          { value: "10", label: "October" },
          { value: "11", label: "November" },
          { value: "12", label: "December" }
        ]}
        defaultCurrent={0}
        onChange={onChange}
        name="Month"
      />
    </div>
  );
};

export default SelectMonth;

import NiceSelect from "@/ui/nice-select";
import React from "react";
import roles from "@/data/json/roles.json";

const SelectRole = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        options={roles}
        defaultCurrent={0}
        onChange={onChange}
        name="Employment Type"
      />
    </div>
  );
};

export default SelectRole;

import NiceSelect from "@/ui/nice-select";
import React from "react";

const SelectUserType = ({ onChange }: { onChange: (item: any) => void }) => {
  return (
    <div className="dash-input-wrapper">
      <NiceSelect
        options={[
          { value: "user", label: "User" },
          { value: "employer", label: "Employer" }
        ]}
        defaultCurrent={0}
        onChange={onChange}
        name="Sign up as"
      />
    </div>
  );
};

export default SelectUserType;

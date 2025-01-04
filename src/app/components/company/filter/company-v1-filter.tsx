import React from "react";
import FilterCompanyLocation from "./filter-company-location";

const CompanyV1Filter = ({
  searchValue,
  handleSearch
}: {
  searchValue: string;
  handleSearch: (e: any) => void;
}) => {
  return (
    <form action="#" className="input-box position-relative">
      <input
        type="text"
        placeholder="Search Company here"
        className="company-search-input"
        value={searchValue}
        onChange={handleSearch}
      />
    </form>
  );
};

export default CompanyV1Filter;

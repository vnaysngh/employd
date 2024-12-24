import React from "react";
import FilterCompanyLocation from "./filter-company-location";

const CompanyV1Filter = () => {
  return (
    <div className="border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
      <div className="filter-block bottom-line pb-25">
        {/*  <a
          className="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseSemploye"
          role="button"
          aria-expanded="false"
        >
          Search Company
        </a> */}
        <div className="collapse show" id="collapseSemploye">
          <div className="main-body">
            <form action="#" className="input-box position-relative">
              <input type="text" placeholder="Company Name" />
              {/* <button>
                <i className="bi bi-search"></i>
              </button> */}
            </form>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
      >
        Apply Filter
      </a>
    </div>
  );
};

export default CompanyV1Filter;

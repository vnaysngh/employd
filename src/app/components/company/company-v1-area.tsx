"use client";
import React, { useState } from "react";
import CompanyGridItem from "./company-grid-item";
import { useStateContext } from "@/context";
import CompanyV1Filter from "./filter/company-v1-filter";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

const CompanyV3Area = () => {
  const { employers } = useStateContext();
  const [searchValue, setSearchValue] = useState("");

  // Filtered employers based on search input
  const filteredEmployers = employers?.filter((employer: any) => {
    const searchLower = searchValue.toLowerCase();
    return (
      employer.name?.toLowerCase().includes(searchLower) ||
      employer.company_name?.toLowerCase().includes(searchLower) ||
      employer.ens_name?.toLowerCase().includes(searchLower)
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <section className="company-profiles pt-50 lg-pt-50 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              <div className="title-two">
                <h2 className={poppins.className}>
                  Connect with Companies Committed to Building Verified Work
                  Histories
                </h2>
              </div>
            </div>
            <div className="col-12">
              <div className="col-3">
                <div className="wrapper mt-30">
                  <div className="upper-filter mb-25">
                    <div className="align-items-center">
                      <CompanyV1Filter
                        searchValue={searchValue}
                        handleSearch={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`accordion-box grid-style show`}>
                <div className="row">
                  {!filteredEmployers || filteredEmployers.length === 0 ? (
                    <h3>No Employers Found</h3>
                  ) : (
                    filteredEmployers.map((item: any) => (
                      <div key={item.id} className="col-xxl-4 col-sm-6 d-flex">
                        <CompanyGridItem item={item} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyV3Area;

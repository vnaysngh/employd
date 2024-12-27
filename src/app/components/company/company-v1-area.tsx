"use client";
import React, { useState } from "react";
import Image from "next/image";
import last_icon from "@/assets/images/icon/icon_50.svg";
import CompanyV1Filter from "./filter/company-v1-filter";
import company_data from "@/data/company-data";
import CompanyGridItem from "./company-grid-item";
import CompanyListItem from "./company-list-item";
import CompanyPagination from "./company-pagination";
import { useStateContext } from "@/context";

const CompanyV1Area = ({ style_2 = false }: { style_2?: boolean }) => {
  const { employers } = useStateContext();
  if (!employers || (employers && !employers.length))
    return <h3>No Candidates Founds</h3>;
  return (
    <section className="company-profiles pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            {/*  <button
              type="button"
              className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
              data-bs-toggle="offcanvas"
              data-bs-target="#filteroffcanvas"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button> */}
            <div
              className="filter-area-tab offcanvas-start"
              id="filteroffcanvas"
            >
              {/* <button
                type="button"
                className="btn-close text-reset d-lg-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button> */}
              <div className="main-title fw-500">Filter By</div>
              {/* CompanyV1Filter */}
              <CompanyV1Filter />
              {/* CompanyV1Filter */}
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="ms-xxl-5 ms-xl-3">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                <div className="total-job-found">
                  <span className="fw-500">{employers.length}</span> companies
                </div>
                {/* <div className="d-flex align-items-center">
                  <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <ShortSelect />
                  </div>
                  <button
                    onClick={() => setJobType("list")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${
                      jobType === "grid" ? "active" : ""
                    }`}
                    title="Active List"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button
                    onClick={() => setJobType("grid")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${
                      jobType === "list" ? "active" : ""
                    }`}
                    title="Active Grid"
                  >
                    <i className="bi bi-grid"></i>
                  </button>
                </div> */}
              </div>

              <div className={`accordion-box grid-style show`}>
                <div className="row">
                  {employers.map((item: any) => {
                    if (item.name) {
                      return (
                        <div
                          key={item.id}
                          className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex"
                        >
                          <CompanyGridItem item={item} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              {/*  <div
                className={`accordion-box list-style ${
                  jobType === "list" ? "show" : ""
                }`}
              >
                {company_data.slice(0, 9).map((item) => (
                  <CompanyListItem key={item.id} item={item} />
                ))}
              </div> */}

              {/* <div className="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                  Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
                  <span className="text-dark fw-500">350</span>
                </p>
                <CompanyPagination />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyV1Area;

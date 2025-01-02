"use client";
import React from "react";
import CompanyGridItem from "./company-grid-item";
import { useStateContext } from "@/context";
import CompanyV1Filter from "./filter/company-v1-filter";

const CompanyV3Area = () => {
  const { employers } = useStateContext();
  if (!employers || (employers && !employers.length))
    return <h3>No Candidates Founds</h3>;
  return (
    <>
      <section className="company-profiles pt-50 lg-pt-50 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              <div className="title-two">
                <h2>
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
                      <CompanyV1Filter />
                    </div>
                  </div>
                </div>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyV3Area;

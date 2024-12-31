"use client";
import React, { useState } from "react";
import candidate_data from "@/data/candidate-data";
import CandidateGridItem from "./candidate-grid-item";
import CandidateListItem from "./candidate-list-item";
import { useStateContext } from "@/context";
import CandidateV1FilterArea from "./filter/candidate-v1-filter-area";

const CandidateV1Area = () => {
  const { talents } = useStateContext();
  if (!talents || (talents && !talents.length))
    return <h3>No Candidates Founds</h3>;
  return (
    <>
      <section className="candidates-profile pt-150 lg-pt-70 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              <div className="title-two">
                <h2>Explore Verified Talent Backed by Attested Experience</h2>
              </div>
            </div>
            <div className="col-12">
              <div className="position-relative">
                <div className="col-3">
                  <div className="wrapper mt-30">
                    <div className="upper-filter mb-25">
                      <div className="align-items-center">
                        <CandidateV1FilterArea />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`accordion-box grid-style show`}>
                  <div className="row">
                    {talents.map((item: any) => {
                      if (item.name) {
                        return (
                          <div
                            key={item.id}
                            className="col-xxl-4 col-sm-6 d-flex"
                          >
                            <CandidateGridItem item={item} />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CandidateV1Area;

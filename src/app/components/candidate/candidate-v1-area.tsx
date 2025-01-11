"use client";
import React, { useState } from "react";
import CandidateGridItem from "./candidate-grid-item";
import { useStateContext } from "@/context";
import CandidateV1FilterArea from "./filter/candidate-v1-filter-area";
import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "700", subsets: ["latin"] });

const CandidateV1Area = () => {
  const { talents } = useStateContext();
  const [searchValue, setSearchValue] = useState("");

  // Filtered employers based on search input
  const filteredTalents = talents?.filter((talent: any) => {
    const searchLower = searchValue.toLowerCase();
    return (
      talent.name?.toLowerCase().includes(searchLower) ||
      talent.ens_name?.toLowerCase().includes(searchLower)
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <section className="candidates-profile pt-50 lg-pt-50 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              <div className="title-two">
                <h2 className={poppins.className}>
                  Explore Verified Talent Backed by Attested Experience
                </h2>
              </div>
            </div>
            <div className="col-12">
              <div className="position-relative">
                <div className="col-3">
                  <div className="wrapper mt-30">
                    <div className="upper-filter mb-25">
                      <div className="align-items-center">
                        <CandidateV1FilterArea
                          searchValue={searchValue}
                          handleSearch={handleSearch}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`accordion-box grid-style show`}>
                  <div className="row">
                    {!filteredTalents || filteredTalents.length === 0 ? (
                      <h3>No Candidates Founds</h3>
                    ) : (
                      filteredTalents.map((item: any) => {
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
                      })
                    )}
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

"use client";
import React, { useEffect, useState } from "react";
import SelectYear from "./select-year";
import SelectEmploymentType from "./select-employment-type";
import SelectMonth from "./select-month";
import { useStateContext } from "@/context";
import TransactionComponent from "../transaction";
import { Dela_Gothic_One } from "next/font/google";
export const DelaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"]
});
//My time at Mudrex as a Frontend Developer allowed me to spearhead the development and maintenance of iOS and Android applications tailored for crypto mutual funds, utilizing technologies such as React.js and React Native to create intuitive and user-friendly interfaces.

type SelectInput = {
  value: string;
  label: string;
};

export type FormData = {
  role: string;
  company: string;
  startMonth: SelectInput;
  startYear: SelectInput;
  endMonth: SelectInput;
  endYear: SelectInput;
  employmentType: SelectInput;
  description: string;
};

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardResume = ({ setIsOpenSidebar }: IProps) => {
  const { initialize, signer, pushUser } = useStateContext();
  const [formData, setFormData] = useState<FormData>({
    role: "",
    company: "",
    startMonth: { value: "04", label: "April" },
    startYear: { value: "2022", label: "2022" },
    endMonth: { value: "04", label: "April" },
    endYear: { value: "2024", label: "2024" },
    employmentType: { value: "full-time", label: "Full Time" },
    description: ""
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const {
    role,
    company,
    startMonth,
    startYear,
    endMonth,
    endYear,
    employmentType,
    description
  } = formData;

  return (
    <>
      <div className={`dashboard-body ${DelaGothic.className}`}>
        <div className="position-relative">
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div>
              <h2 className="main-title">My Resume</h2>
              <label htmlFor="">Add Work Experience</label>
            </div>
            <TransactionComponent {...formData} />
          </div>

          <div className="card-box border-20">
            <div className="accordion dash-accordion-one" id="accordionTwo">
              <div className="accordion-item pt-30">
                <div
                  id="collapseOneA"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOneA"
                  data-bs-parent="#accordionTwo"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Title*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <input
                            type="text"
                            placeholder="Lead Product Designer"
                            value={role}
                            onChange={(e) =>
                              handleChange("role", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Company*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <input
                            type="text"
                            placeholder="Amazon Inc"
                            value={company}
                            onChange={(e) =>
                              handleChange("company", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Duration*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-5">
                                <SelectMonth
                                  onChange={(value) =>
                                    handleChange("startMonth", value)
                                  }
                                />
                              </div>
                              <div className="col-sm-5">
                                <SelectYear
                                  onChange={(value) =>
                                    handleChange("startYear", value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-5">
                                <SelectMonth
                                  onChange={(value) =>
                                    handleChange("endMonth", value)
                                  }
                                />
                              </div>
                              <div className="col-sm-5">
                                <SelectYear
                                  onChange={(value) =>
                                    handleChange("endYear", value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Employment Type*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="row">
                          <div className="col-sm-6">
                            <SelectEmploymentType
                              onChange={(value) =>
                                handleChange("employmentType", value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Description*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <textarea
                            className="size-lg"
                            placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
                            value={description}
                            onChange={(e) =>
                              handleChange("description", e.target.value)
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardResume;

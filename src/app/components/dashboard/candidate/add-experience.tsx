"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
// import TransactionComponent from "../transaction";
import dynamic from "next/dynamic";
import { useStateContext } from "@/context";
import SelectEmployer from "./select-employer";

// Dynamically import client-side only components
const SelectRole = dynamic(() => import("./select-role"), { ssr: true });
const SelectMonth = dynamic(() => import("./select-month"), { ssr: true });
const SelectYear = dynamic(() => import("./select-year"), { ssr: true });
const SelectEmploymentType = dynamic(() => import("./select-employment-type"), {
  ssr: false
});

type SelectInput = {
  value: string;
  label: string;
};

export type FormData = {
  role: SelectInput;
  company: any;
  startMonth: SelectInput;
  startYear: SelectInput;
  endMonth: SelectInput;
  endYear: SelectInput;
  employmentType: SelectInput;
  description: string;
  currentlyWorking: boolean;
  newEmployer: string;
  newEmployerEmail: string;
  notListed: boolean;
};
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardResume = ({ setIsOpenSidebar }: IProps) => {
  const [formData, setFormData] = useState<FormData>({
    role: { value: "", label: "" },
    company: { value: "", label: "" },
    startMonth: { value: "", label: "" },
    startYear: { value: "", label: "" },
    endMonth: { value: "", label: "" },
    endYear: { value: "", label: "" },
    employmentType: { value: "", label: "" },
    description: "",
    currentlyWorking: false,
    newEmployer: "",
    newEmployerEmail: "",
    notListed: false
  });

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { employers, addUserExperienceToResume, createEmployer } =
    useStateContext();
  const handleChange = (
    field: keyof FormData,
    value: SelectInput[] | SelectInput
  ) => {
    if (field === "company") {
      setFormData({
        ...formData,
        newEmployer: ""
      });
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const employerOptions = !employers.length
    ? []
    : employers
        .filter((employer: any) => employer.ens_name && employer.company_name) // Filter valid employers
        .map((employer: any) => ({
          label: employer.company_name,
          value: employer.ens_name,
          ...employer
        }));

  const handleAddExperience = async () => {
    const {
      role,
      company,
      startMonth,
      startYear,
      endMonth,
      endYear,
      currentlyWorking,
      newEmployer,
      newEmployerEmail,
      notListed,
      employmentType
    } = formData;

    // Clear previous transaction hash
    if (txHash) {
      setTxHash(null);
    }

    // Validation logic
    if (!role.value) {
      setError("Role is required.");
      return;
    }

    if (!notListed && (!company.value || !company.label)) {
      setError("Company is required unless a new employer is added.");
      return;
    }

    if (notListed && (!newEmployer || !newEmployerEmail)) {
      setError("New employer and email is required.");
      return;
    }

    if (!startMonth.value || !startYear.value) {
      setError("Start month and year are required.");
      return;
    }

    if (!currentlyWorking && (!endMonth.value || !endYear.value)) {
      setError("End month and year are required unless currently working.");
      return;
    }

    if (!currentlyWorking && Number(endYear.value) < Number(startYear.value)) {
      setError("Duration is incorrect");
      return;
    }

    if (!employmentType.value) {
      setError("Employment type is required.");
      return;
    }

    setError(null);

    setLoading(true);
    try {
      const response = await addUserExperienceToResume(formData);
      if (response.transactionHash) {
        setTxHash(response);
        setTimeout(() => {
          setTxHash(null);
        }, 10000);
      } else {
        setError(response?.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleNewCompany = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className={`dashboard-body`}>
        <div className="position-relative">
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div>
              <h2 className={`main-title`}>Add Experience</h2>
            </div>
          </div>

          <div className="card-box border-20">
            <div className="accordion dash-accordion-one" id="accordionTwo">
              <div className="accordion-item pt-30 pb-30">
                <div
                  id="collapseOneA"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOneA"
                  data-bs-parent="#accordionTwo"
                >
                  <div className="accordion-body">
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Role*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <SelectRole
                            onChange={(value) => handleChange("role", value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Company*</label>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="dash-input-wrapper mb-30">
                          <SelectEmployer
                            onChange={(value) => handleChange("company", value)}
                            options={employerOptions}
                            isDisabled={formData.newEmployer}
                          />
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="dash-input-wrapper mb-30">
                          <div className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  notListed: !formData.notListed
                                });
                              }}
                            />
                            <label>Not Listed?</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {formData.notListed && (
                      <div className="row align-items-center">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-5">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              type="text"
                              name="newEmployer"
                              placeholder="Enter the company name"
                              value={formData.newEmployer}
                              onChange={handleNewCompany}
                            />
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              type="text"
                              name="newEmployerEmail"
                              placeholder="Enter the email address"
                              value={formData.newEmployerEmail}
                              onChange={handleNewCompany}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Duration*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="row">
                          {/* Start Date Inputs */}
                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-5">
                                <div className="dash-input-wrapper mb-30">
                                  <SelectMonth
                                    placeHolder="Start Month"
                                    onChange={(value) =>
                                      handleChange("startMonth", value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-sm-5">
                                <div className="dash-input-wrapper mb-30">
                                  <SelectYear
                                    placeHolder="Start Year"
                                    onChange={(value) =>
                                      handleChange("startYear", value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* End Date Inputs and Checkbox */}
                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-5">
                                <div className="dash-input-wrapper mb-30">
                                  <SelectMonth
                                    placeHolder="End Month"
                                    onChange={(value) =>
                                      handleChange("endMonth", value)
                                    }
                                    isDisabled={formData.currentlyWorking}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-5">
                                <div className="dash-input-wrapper mb-30">
                                  <SelectYear
                                    placeHolder="End Year"
                                    onChange={(value) =>
                                      handleChange("endYear", value)
                                    }
                                    isDisabled={formData.currentlyWorking}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2"></div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <div className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  currentlyWorking: !formData.currentlyWorking
                                });
                              }}
                            />
                            <label>I currently work here</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Employment Type*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
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
                    </div>
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Description (Optional)</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <textarea
                            rows={4}
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {error && (
                      <div className="subname-error mb-10">{error}</div>
                    )}

                    {txHash && (
                      <div className="success-text mb-10">
                        Experience submitted.
                      </div>
                    )}

                    {!txHash && (
                      <div className="d-flex">
                        <button
                          className="tx-btn d-flex align-items-center gap-2"
                          onClick={handleAddExperience}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="spinner" />
                              Awaiting wallet confirmation. Please wait...
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    )}
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

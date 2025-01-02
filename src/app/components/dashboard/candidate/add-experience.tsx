"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
// import TransactionComponent from "../transaction";
import dynamic from "next/dynamic";
import { useStateContext } from "@/context";
import SelectEmployer from "./select-employer";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

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
  company_details?: any;
  address?: any;
  company_name?: any;
};

export type FormData = {
  role: SelectInput;
  company: SelectInput;
  startMonth: SelectInput;
  startYear: SelectInput;
  endMonth: SelectInput;
  endYear: SelectInput;
  employmentType: SelectInput;
  description: string;
  currentlyWorking: boolean;
  newEmployer: string;
};
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardResume = ({ setIsOpenSidebar }: IProps) => {
  const [formData, setFormData] = useState<FormData>({
    role: { value: "", label: "" },
    company: { value: "", label: "" },
    startMonth: { value: "01", label: "January" },
    startYear: { value: "2024", label: "2024" },
    endMonth: { value: "01", label: "January" },
    endYear: { value: "2024", label: "2024" },
    employmentType: { value: "full-time", label: "Full Time" },
    description: "",
    currentlyWorking: false,
    newEmployer: ""
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
          company_details: employer.company_details,
          address: employer.address,
          company_name: employer.company_name
        }));

  const generateEnsName = (companyName: string) => {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const ensName = `${companyName.toLowerCase()}-${randomNum}`;
    return ensName;
  };

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
      employmentType,
      description
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

    if (!employmentType.value) {
      setError("Employment type is required.");
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

    if (!newEmployer && (!company.value || !company.label)) {
      setError("Company is required unless a new employer is added.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    setError(null); // Clear previous errors if validation passes

    if (newEmployer) {
      setLoading(true);
      const newEmployerEnsName = generateEnsName(newEmployer);
      try {
        const response = await createEmployer(
          "employer",
          newEmployer,
          newEmployerEnsName
        );
        if (response && response.length) {
          const response = await addUserExperienceToResume(
            formData,
            newEmployerEnsName
          );
          if (response.transactionHash) {
            setTxHash(response);
            setTimeout(() => {
              setTxHash(null);
            }, 5000);
          } else {
            setError(response.message);
            setTimeout(() => {
              setError(null);
            }, 5000);
          }
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const response = await addUserExperienceToResume(formData);
        if (response.transactionHash) {
          setTxHash(response);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewCompany = (e: any) => {
    setFormData({
      ...formData,
      company: { value: "", label: "" },
      newEmployer: e.target.value
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
                          <input
                            type="text"
                            placeholder="Not listed? Enter the company name"
                            value={formData.newEmployer}
                            onChange={handleNewCompany}
                          />
                        </div>
                      </div>
                    </div>
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
                          <label htmlFor="">Description</label>
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

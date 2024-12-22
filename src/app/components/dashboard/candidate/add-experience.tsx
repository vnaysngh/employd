"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
// import TransactionComponent from "../transaction";
import dynamic from "next/dynamic";
import { useStateContext } from "@/context";
import SelectEmployer from "./select-employer";

// Dynamically import client-side only components
const SelectRole = dynamic(() => import("./select-role"), { ssr: false });
const SelectMonth = dynamic(() => import("./select-month"), { ssr: false });
const SelectYear = dynamic(() => import("./select-year"), { ssr: false });
const SelectEmploymentType = dynamic(() => import("./select-employment-type"), {
  ssr: false
});

type SelectInput = {
  value: string;
  label: string;
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
  skills: any[];
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
    skills: []
  });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { employers, addUserExperienceToResume } = useStateContext();
  const handleChange = (
    field: keyof FormData,
    value: SelectInput[] | SelectInput
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const employerOptions = !employers.length
    ? []
    : employers.map((employer: any) => ({
        label: employer.company_name,
        value: employer.ens_name
      }));

  const handleAddExperience = async () => {
    if (txHash) {
      setTxHash(null);
    } else {
      setLoading(true);
      const response = await addUserExperienceToResume(formData);
      if (response.transactionHash) {
        setTxHash(response);
      } else {
        setError(response.message);
      }
      setLoading(false);
    }
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
              <div className="accordion-item pt-30">
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
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <SelectEmployer
                            onChange={(value) => handleChange("company", value)}
                            options={employerOptions}
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
                        <div className="dash-input-wrapper mb-30">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-5">
                                  <SelectMonth
                                    placeHolder="Start Month"
                                    onChange={(value) =>
                                      handleChange("startMonth", value)
                                    }
                                  />
                                </div>
                                <div className="col-sm-5">
                                  <SelectYear
                                    placeHolder="Start Year"
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
                                    placeHolder="End Month"
                                    onChange={(value) =>
                                      handleChange("endMonth", value)
                                    }
                                  />
                                </div>
                                <div className="col-sm-5">
                                  <SelectYear
                                    placeHolder="End Year"
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
                    {/*  <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Skills</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <SelectSkills
                            onChange={(value: any[]) => {
                              setFormData({
                                ...formData,
                                skills: value.map((item) => item.label)
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div> */}
                    {error && (
                      <div className="subname-error mb-10">{error}</div>
                    )}

                    {txHash && (
                      <div className="success-text mb-10">
                        Experience added successfully.
                      </div>
                    )}

                    {loading && (
                      <div className="loading-text mb-10">
                        Processing your transaction...
                      </div>
                    )}
                    <div className="d-flex">
                      <button
                        className="tx-btn"
                        onClick={handleAddExperience}
                        disabled={loading}
                      >
                        {!txHash ? "Save" : "Add another experience"}
                      </button>
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

/* const SkillSelection = ({ selectedSkills, onSkillChange }: any) => {
  const skillsOptions = [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Python",
    "Django",
    "Ruby"
  ];

  // Function to handle skill selection
  const handleSkillSelect = (skill: any) => {
    if (!selectedSkills.includes(skill)) {
      onSkillChange([...selectedSkills, skill]);
    }
  };

  // Function to handle skill removal
  const handleSkillRemove = (skill: any) => {
    onSkillChange(selectedSkills.filter((s: any) => s !== skill));
  };

  return (
    <div>
      <div className="skills-options">
        {skillsOptions.map((skill) => (
          <button
            key={skill}
            className={`skill-btn ${
              selectedSkills.includes(skill) ? "selected" : ""
            }`}
            onClick={() => handleSkillSelect(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="selected-skills">
        {selectedSkills.map((skill: any) => (
          <span key={skill} className="skill-chip">
            {skill}
            <button
              className="remove-skill"
              onClick={() => handleSkillRemove(skill)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}; */

export default DashboardResume;

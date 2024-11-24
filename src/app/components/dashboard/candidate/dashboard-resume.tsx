"use client";
import React, { useEffect, useState } from "react";
import video_bg from "@/assets/dashboard/images/video_post.jpg";
import DashboardHeader from "./dashboard-header";
import DashboardPortfolio from "./dashboard-portfolio";
import SelectYear from "./select-year";
import SelectEmploymentType from "./select-employment-type";
import SelectMonth from "./select-month";
import { useStateContext } from "@/context";
import TransactionComponent from "../transaction";
import { Dela_Gothic_One, Lexend } from "next/font/google";
export const DelaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"]
});
const lexend = Lexend({ weight: "400", subsets: ["latin"] });

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
  responsibilities: string[];
  skills: string[]; // New field to store selected skills
};
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardResume = () => {
  const [formData, setFormData] = useState<FormData>({
    role: "",
    company: "",
    startMonth: { value: "04", label: "April" },
    startYear: { value: "2022", label: "2022" },
    endMonth: { value: "04", label: "April" },
    endYear: { value: "2024", label: "2024" },
    employmentType: { value: "full-time", label: "Full Time" },
    responsibilities: ["", ""], // Initialize as an empty array
    skills: [] // Initialize the skills as an empty array
  });
  const updateResponsibility = (index: number, updatedText: string) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.map((resp, i) =>
        i === index ? updatedText : resp
      )
    }));
  };

  const handleChange = (field: keyof FormData, value: string[] | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (selectedSkills: string[]) => {
    setFormData((prev) => ({
      ...prev,
      skills: selectedSkills
    }));
  };

  const { role, company } = formData;
  //0x4be3dDbE6EFF04a3a8202c02DFbb568a186306aE

  console.log(formData);

  return (
    <>
      <div className={`dashboard-body ${lexend.className}`}>
        <div className="position-relative">
          {/* header start */}
          {/* <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} /> */}
          {/* header end */}
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div>
              <h2 className={`main-title ${DelaGothic.className}`}>
                My Resume
              </h2>
              <label className={`${DelaGothic.className}`} htmlFor="">
                Add Work Experience
              </label>
            </div>
            {/* <TransactionComponent {...formData} /> */}
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
                          <label htmlFor="">Skills</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <SkillSelection
                            selectedSkills={formData.skills}
                            onSkillChange={handleSkillChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">
                            Responsibilities and Achievements
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          {formData.responsibilities.map(
                            (responsibility, index) => (
                              <div
                                key={index}
                                className="responsibility-item mb-10"
                              >
                                <input
                                  type="text"
                                  className="mb-10"
                                  value={responsibility}
                                  onChange={(e) =>
                                    updateResponsibility(index, e.target.value)
                                  }
                                  placeholder={`Responsibility ${index + 1}`}
                                />
                              </div>
                            )
                          )}
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

const SkillSelection = ({ selectedSkills, onSkillChange }: any) => {
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
};

export default DashboardResume;

"use client";
import React, { useEffect, useState } from "react";
import video_bg from "@/assets/dashboard/images/video_post.jpg";
import { useStateContext } from "@/context";
import { Dela_Gothic_One, Lexend } from "next/font/google";
import SelectMonth from "../dashboard/candidate/select-month";
import SelectEmploymentType from "../dashboard/candidate/select-employment-type";
import SelectYear from "../dashboard/candidate/select-year";
import TransactionComponent from "../dashboard/transaction/attest";
export const DelaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"]
});
const lexend = Lexend({ weight: "400", subsets: ["latin"] });

const Attestations = ({ experience }: { experience: any }) => {
  return (
    <>
      <div className={`dashboard-body ${lexend.className}`}>
        <div className="position-relative">
          <div className="d-flex justify-content-between align-items-center mb-20 mt-30">
            <div>
              <h2 className={`main-title ${DelaGothic.className}`}>
                Attestation Request
              </h2>
              <label className={`${DelaGothic.className}`} htmlFor="">
                By {experience.owner}
              </label>
            </div>
            <TransactionComponent experienceId={experience.id} />
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
                            value={experience.role}
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
                            value={experience.company}
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
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            {experience.startMonth}/{experience.startYear} -
                            {experience.endMonth}/{experience.endYear}
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
                            {experience.employmentType === "full-time"
                              ? "Full Time"
                              : "Part Time"}
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
                          {experience.skills.join(" , ")}
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
                          {experience.responsibilities.join(" , ")}
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

export default Attestations;

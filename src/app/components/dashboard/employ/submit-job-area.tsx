"use client";

import React, { useState } from "react";
import Image from "next/image";
import DashboardHeader from "../candidate/dashboard-header";
import NiceSelect from "@/ui/nice-select";
import SelectSkills from "../candidate/select-skills";
import SelectEmploymentType from "../candidate/select-employment-type";
import SelectSalaryType from "../candidate/select-salary-type";
import { useStateContext } from "@/context";
import SelectCompensation from "../candidate/select-compensation";
import JobDescription from "./job-description";

// Grouped options data for skills (reused by SelectSkills)
const options = [
  {
    label: "Web3 Developer",
    options: [
      { label: "Bitcoin", value: "bitcoin" },
      { label: "Ethereum / Solidity", value: "ethereum_solidity" },
      { label: "Solana", value: "solana" },
      { label: "EOS", value: "eos" },
      { label: "TON (Func)", value: "ton_func" }
    ]
  }
  // Other categories omitted for brevity
];

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const { isUserRegistered } = useStateContext();

  // Define states for all fields
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [skills, setSkills] = useState<any[]>([]);
  const [jobType, setJobType] = useState<string | null>(null);
  const [salaryType, setSalaryType] = useState<string | null>(null);
  const [minSalary, setMinSalary] = useState<string | null>(null);
  const [maxSalary, setMaxSalary] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>(isUserRegistered?.email || "");

  // Form submission handler
  const handleSubmit = () => {
    const formData = {
      jobTitle,
      jobDescription,
      skills,
      jobType,
      salaryType,
      minSalary,
      maxSalary,
      address,
      email
    };

    console.log("Job Form Data Submitted:", formData);
    // Further processing (e.g., API call) can go here
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* Header */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <h2 className="main-title mb-20">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          {/* Job Title */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="job-title">Job Title*</label>
            <input
              id="job-title"
              type="text"
              placeholder="Ex: Product Designer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Job Description */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="job-description">Job Description*</label>
            {/* <textarea
              id="job-description"
              className="size-lg"
              placeholder="Write about the job in details..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea> */}
            <JobDescription />
          </div>

          {/* Skills, Job Type, Salary */}
          <div className="row align-items-end">
            {/* Skills */}
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="skills">Skills</label>
                <SelectSkills onChange={(value: any[]) => setSkills(value)} />
              </div>
            </div>

            {/* Job Type */}
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="job-type">Job Type</label>
                <SelectEmploymentType onChange={(value) => setJobType(value)} />
              </div>
            </div>

            {/* Salary */}
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="salary-type">Salary Type*</label>
                <SelectSalaryType onChange={(value) => setSalaryType(value)} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <SelectCompensation
                  onChange={(value) => {
                    setMinSalary(value);
                  }}
                  placeHolder="Min"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <SelectCompensation
                  onChange={(value) => {
                    setMaxSalary(value);
                  }}
                  placeHolder="Max"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="address">
                  Address (Leave blank if the position is 100% remote)
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="row">
            <div className="col-6">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="email">Work Email (For Invoice)*</label>
                <input
                  id="email"
                  type="email"
                  placeholder="companyinc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-group d-inline-flex align-items-center mt-30">
          <button className="dash-btn-two tran3s me-3" onClick={handleSubmit}>
            Submit
          </button>
          <button
            className="dash-cancel-btn tran3s"
            onClick={() => console.log("Form canceled")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;

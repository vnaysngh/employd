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

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectInput = {
  value: string;
  label: string;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const { createJob } = useStateContext();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Define states for all fields
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [skills, setSkills] = useState<any[]>([]);
  const [jobType, setJobType] = useState<SelectInput | null>(null);
  const [salaryType, setSalaryType] = useState<SelectInput | null>(null);
  const [minSalary, setMinSalary] = useState<SelectInput | null>(null);
  const [maxSalary, setMaxSalary] = useState<SelectInput | null>(null);
  const [address, setAddress] = useState<string>("");
  const [applyLink, setApplyLink] = useState("");
  // const [email, setEmail] = useState<string>(isUserRegistered?.email || "");

  // Form submission handler
  const handleSubmit = async () => {
    // Reset error and success states
    setError(false);
    setSuccess(false);

    // Validation checks
    const isValidLink = (url: string) => {
      const regex =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
      return regex.test(url);
    };

    if (
      !jobTitle ||
      !jobDescription ||
      skills.length === 0 ||
      !jobType ||
      !salaryType ||
      !minSalary ||
      !maxSalary ||
      !applyLink
    ) {
      setError(true);
      console.error("All fields except address must be filled.");
      alert("All fields except address must be filled.");
      return;
    }

    if (maxSalary.value < minSalary.value) {
      console.error("Max salary cannot be less than min salary.");
      alert("Max salary cannot be less than min salary.");
      return;
    }

    if (!isValidLink(applyLink)) {
      setError(true);
      console.error("Apply link is not a valid URL.");
      alert("Apply link is not a valid URL.");
      return;
    }

    // If all validations pass, proceed with form submission
    const formData = {
      jobTitle,
      jobDescription,
      skills,
      jobType,
      salaryType,
      minSalary,
      maxSalary,
      address,
      applyLink
    };

    setLoading(true);
    try {
      const response = await createJob([formData]);
      if (response && response.length) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 10000);
      }
    } catch (error) {
      console.error("Failed to call API:", error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
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
            <JobDescription
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
            />
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

          {/* Email */}
          <div className="row">
            {/* <div className="col-6">
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
            </div> */}
            {/* <div className="col-6"> */}
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="email">Link to apply</label>
              <input
                id="applyLink"
                type="text"
                placeholder="Apply via this link"
                value={applyLink}
                onChange={(e) => setApplyLink(e.target.value)}
              />
            </div>
            {/* </div> */}
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
        </div>

        {error && (
          <div className="subname-error mb-10">Something went wrong</div>
        )}

        {success && (
          <div className="success-text mb-10">
            Thank you! Your job has been submitted.
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            className="dash-btn-two tran3s me-3 d-flex align-items-center gap-2"
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
          {/*           <button
            className="dash-cancel-btn tran3s"
            onClick={() => console.log("Form canceled")}
          >
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;

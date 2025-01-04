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
import WIP from "@/assets/images/assets/work-in-progress.png";

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectInput = {
  value: string;
  label: string;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const { createJob } = useStateContext();
  const [error, setError] = useState<string | boolean>(false);
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
      setError("All fields except address must be filled.");
      return;
    }

    if (maxSalary.value < minSalary.value) {
      console.error("Max salary cannot be less than min salary.");
      setError("Max salary cannot be less than min salary.");
      return;
    }

    if (!isValidLink(applyLink)) {
      console.error("Apply link is not a valid URL.");
      setError("Apply link is not a valid URL.");
      return;
    }

    setError(false);

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
    <div className={`dashboard-body position-relative`}>
      <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
      <h2 className="main-title mb-20">Submit Job</h2>

      <div className="border-20 mt-40 d-flex justify-content-center m-auto">
        <Image src={WIP} alt="work-in-progress" style={{ height: "auto" }} />
      </div>
    </div>
  );
};

export default SubmitJobArea;

{
  /* <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <h2 className="main-title mb-20">Post a New Job</h2>

        <div className="bg-white card-box border-20">
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

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="job-description">Job Description*</label>
            <JobDescription
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
            />
          </div>

          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="skills">Skills</label>
                <SelectSkills onChange={(value: any[]) => setSkills(value)} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="job-type">Job Type</label>
                <SelectEmploymentType onChange={(value) => setJobType(value)} />
              </div>
            </div>

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

          <div className="row">
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
          </div>

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
          <div className="subname-error mt-20">
            {error || "Something went wrong"}
          </div>
        )}

        {success && (
          <div className="success-text mt-20">
            Thank you! Your job has been submitted.
          </div>
        )}

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
        </div>
      </div>
    </div> */
}

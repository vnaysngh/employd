"use client";
import React from "react";
import Image from "next/image";
import DashboardHeader from "../candidate/dashboard-header";
// import StateSelect from "../candidate/state-select";
// import CitySelect from "../candidate/city-select";
// import CountrySelect from "../candidate/country-select";
// import EmployExperience from "./employ-experience";
import NiceSelect from "@/ui/nice-select";
import SelectSkills from "../candidate/select-skills";
import SelectEmploymentType from "../candidate/select-employment-type";
import SelectSalaryType from "../candidate/select-salary-type";
import { useStateContext } from "@/context";

// Grouped options data
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
  },
  {
    label: "Front-end Developer",
    options: [
      { label: "Front-end (Javascript)", value: "front_end_javascript" }
    ]
  },
  {
    label: "Backend Developer",
    options: [
      { label: "C/C++", value: "c_cpp" },
      { label: "C# / .NET", value: "csharp_dotnet" },
      { label: "Golang", value: "golang" },
      { label: "Java", value: "java" },
      { label: "Node.js", value: "node_js" },
      { label: "PHP", value: "php" },
      { label: "Python", value: "python" },
      { label: "Ruby", value: "ruby" },
      { label: "Rust", value: "rust" },
      { label: "Scala", value: "scala" }
    ]
  },
  {
    label: "AI Engineer",
    options: [
      { label: "AI Engineer", value: "ai_engineer" },
      { label: "Prompt Engineer", value: "prompt_engineer" }
    ]
  },
  {
    label: "Full Stack Developer",
    options: [
      { label: "Full Stack (Javascript)", value: "full_stack_javascript" }
    ]
  },
  {
    label: "Game Developer / 3D Developer",
    options: [{ label: "Unity", value: "unity" }]
  },
  {
    label: "Mobile Developer",
    options: [
      { label: "Android", value: "android" },
      { label: "Flutter", value: "flutter" },
      { label: "React Native", value: "react_native" },
      { label: "iOS", value: "ios" }
    ]
  },
  {
    label: "Other Tech",
    options: [
      { label: "Analyst", value: "analyst" },
      { label: "CTO", value: "cto" },
      { label: "Customer Support", value: "customer_support" },
      { label: "Data Science", value: "data_science" },
      { label: "Design", value: "design" },
      { label: "Devops", value: "devops" },
      { label: "Product Manager", value: "product_manager" },
      { label: "Project Manager", value: "project_manager" },
      { label: "Quality Assurance", value: "quality_assurance" },
      { label: "Security", value: "security" },
      { label: "UX Researcher", value: "ux_researcher" }
    ]
  },
  {
    label: "Non-tech",
    options: [
      { label: "Community Manager", value: "community_manager" },
      { label: "Copywriting", value: "copywriting" },
      { label: "Economy Designer", value: "economy_designer" },
      { label: "HR", value: "hr" },
      { label: "KYC", value: "kyc" },
      { label: "Legal", value: "legal" },
      { label: "Marketing", value: "marketing" },
      { label: "Recruiter", value: "recruiter" },
      { label: "SEO", value: "seo" },
      { label: "Sales", value: "sales" },
      { label: "Social Media", value: "social_media" }
    ]
  }
];

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const { isUserRegistered } = useStateContext();
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title mb-20">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            <input type="text" placeholder="Ex: Product Designer" />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description*</label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Skills</label>
                <SelectSkills
                  defaultValue={[]}
                  onChange={(value: any[]) => {
                    // setSkills(value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Type</label>
                <SelectEmploymentType
                  onChange={(value) =>
                    // handleChange("employmentType", value)
                    {}
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Salary*</label>
                <SelectSalaryType
                  onChange={(value) =>
                    // handleChange("employmentType", value)
                    {}
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Min" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Max" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Email*</label>
                <input
                  type="email"
                  placeholder="companyinc@gmail.com"
                  value={isUserRegistered.email}
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </div>
          {/* employ experience start */}
          {/* <EmployExperience /> */}
          {/* employ experience end */}
          {/* <h4 className="dash-title-three pt-50 lg-pt-30">File Attachment</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">File Attachment*</label>
            <div className="attached-file d-flex align-items-center justify-content-between mb-15">
              <span>guidline&requirments.doc</span>
              <a href="#" className="remove-btn">
                <i className="bi bi-x"></i>
              </a>
            </div>
          </div>
          <div className="dash-btn-one d-inline-block position-relative me-3">
            <i className="bi bi-plus"></i>
            Upload File
            <input type="file" id="uploadCV" name="uploadCV" placeholder="" />
          </div>
          <small>Upload file .pdf, .doc, .docx</small>
          <h4 className="dash-title-three pt-50 lg-pt-30">
            Address & Location
          </h4> */}
          {/* <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
                <CitySelect />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <StateSelect />
              </div>
            </div>
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="position-relative">
                  <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <a href="#" className="dash-btn-two tran3s me-3">
            Next
          </a>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;

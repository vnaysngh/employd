import { contract } from "@/context";
import roles from "@/data/roles";
import React from "react";
import { useReadContract } from "thirdweb/react";
import Skills from "./skills";
import Image from "next/image";

const WorkExperience = ({ user }: { user: any }) => {
  // const role: string = user?.role;

  const { data: experiences, isPending } = useReadContract({
    contract,
    method:
      "function getUserExperience(address _owner) view returns ((uint256 id, address owner, string role, string seeker, string employer, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, uint8 attestationStatus, address attestationFromAddress, string attestationFromEns)[])",
    params: [user?.address!]
  });

  if (isPending) return <h5>Loading...</h5>;

  if (!isPending && !experiences) return <h3>Profile Incomplete</h3>;

  return (
    <div className="col-xxl-9 col-lg-8">
      <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
        <div className="inner-card border-style mb-60 lg-mb-50">
          <h3 className="title">Work Experience</h3>
          {experiences?.map((experience: any, index: number) => {
            const role: string = experience?.role;
            return (
              <div
                className="time-line-data position-relative pt-15"
                key={experience?.id}
              >
                <div className="info position-relative">
                  <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                    {index + 1}
                  </div>
                  <div className="text_1 fw-500">
                    {experience.startMonth}/{experience.startYear} -{" "}
                    {experience.endMonth}/{experience.endYear}
                  </div>
                  <h4 className="text-capitalize">
                    {roles[role as keyof typeof roles]} ({experience.employer})
                  </h4>
                  <p>{experience?.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="inner-card border-style mb-75 lg-mb-50">
          <h3 className="title">Skills</h3>
          <Skills skills={user?.skills} />
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;

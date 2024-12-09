"use client";
import React, { useEffect, useState } from "react";
import { Dela_Gothic_One, Lexend } from "next/font/google";
import abi from "@/abis/experience.json";
// import { useReadContract } from "wagmi";
import { contract, useStateContext } from "@/context";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import TransactionComponent from "../transaction/chooseEmployer";
import { baseSepolia } from "thirdweb/chains";
import {
  useActiveAccount,
  useReadContract,
  useWalletInfo
} from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "@/config/thirdwebClient";
import DashboardHeader from "./dashboard-header";
import roles from "@/data/roles";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttestationDashboard = ({ setIsOpenSidebar }: IProps) => {
  const account = useActiveAccount();
  const { data: experiences, isPending } = useReadContract({
    contract,
    method:
      "function getUserExperience(address _owner) view returns ((uint256 id, address owner, string role, string company, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string[] skills, uint8 attestationStatus, address attestationFromAddress, string attestationFromEns)[])",
    params: [account?.address!]
  });

  // if (!experiences || !experiences?.length)
  //   return <div>No Experiences Found</div>;

  const handleRequestAttestation = async (
    experienceId: any,
    employerId: any
  ) => {
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className={`dashboard-body`}>
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="row gx-0 align-items-center">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className={` main-title m0`}>Experience Attestations</h2>
          </div>
        </div>
        {experiences && experiences.length && (
          <div className="experiences-grid mt-30">
            {/* {experiences.map((experience) => ( */}
            <ExperienceCard experiences={experiences} />
            {/* ))} */}
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceCard = ({ experiences }: { experiences: any }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [experience, setExperience] = useState<any>();
  const { initializePushAPI, names, pushUser } = useStateContext();
  const [selectedEmployer, setSelectedEmployer] = useState({
    name: "",
    id: "",
    address: ""
  });
  /*  const filteredUsers = users.map((user: any) => ({
    id: user.id,
    name: `${user.subname}.${user.ens_name}`,
    address: user.address
  })); */

  useEffect(() => {
    const handleAttestation = async () => {
      if (!selectedEmployer.name || !selectedEmployer.address) return;
      initializePushAPI();
    };
    if (showSuccess) handleAttestation();
  }, [showSuccess]);

  const handleOnSelect = (item: any, experience: any) => {
    // the item selectedEmployer
    setSelectedEmployer(item);
    setExperience(experience);
  };

  /*  useEffect(() => {
    const sendMessageToEmployer = async () => {
      setIsRequesting(true);
      try {
        const message = await pushUser.chat.send(selectedEmployer.address, {
          type: "MediaEmbed",
          content: `https://employd.xyz/attestation/${experience.id}`
        });
        console.log(message);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error("Failed to request attestation:", error);
      } finally {
        setIsRequesting(false);
        setSelectedEmployer({ name: "", id: "", address: "" });
      }
    };

    if (pushUser && showSuccess) {
      sendMessageToEmployer();
    }
  }, [pushUser]); */

  /* const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  }; */

  return experiences?.map((experience: any, index: number) => {
    const role: string = experience?.role;
    return (
      <div className="experience-card" key={index}>
        <div className="experience-header">
          <div className="experience-title">
            <h3>
              {experience?.company} - {roles[role as keyof typeof roles]}
            </h3>
            <span
              className={`status-badge ${
                experience.attested ? "attested" : "pending"
              }`}
            >
              {!experience.attestationStatus
                ? "Attestation Not Initiated"
                : experience.attestationStatus === 1
                ? "Pending Attestation"
                : experience.attestationStatus === 2
                ? "Attested ✓"
                : "Rejected"}
            </span>
          </div>
          <div className="employment-details">
            <span className="employment-type">{experience.employmentType}</span>
            <span className="date-duration">
              <span className="duration">
                {experience.startMonth}/{experience.startYear} -{" "}
                {experience.endMonth}/{experience.endYear}
              </span>
            </span>
            <span className="location">{experience.location}</span>
          </div>
        </div>

        {/* <div className="experience-content"> */}
        {/* <div className="skills-section">
            <h4>Skills</h4>
            <div className="skills-list">
              {experience?.skills?.map((skill: any, index: number) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div> */}

        {/*  <div className="description-section">
            <h4>Responsibilities & Achievements</h4>
            <ul className="achievements-list">
              {experience?.responsibilities?.map(
                (achievement: any, index: number) => (
                  <li key={index}>{achievement}</li>
                )
              )}
            </ul>
          </div> */}

        {/* {experience.attestationStatus === 0 ||
          experience.attestationStatus === 1 ? (
            <div className="attestation-section"> */}
        {/* <div className="select-wrapper">
                <label htmlFor={`employer-${experience.id}`}>
                  Select Employer for Attestation:
                </label>
                <ReactSearchAutocomplete
                  items={filteredUsers}
                  onSelect={(item) => handleOnSelect(item, experience)}
                  autoFocus
                  formatResult={formatResult}
                  className="react-search-autocomplete"
                />
              </div> */}

        {/* <button
                className={`request-button ${
                  isRequesting ? "requesting" : ""
                } ${!selectedEmployer ? "disabled" : ""}`}
                onClick={handleAttestation}
                disabled={!selectedEmployer.address || isRequesting}
              >
                {isRequesting ? "Sending Request..." : "Request Attestation"}
              </button>

              {showSuccess && (
                <div className="success-message">
                  ✓ Attestation request sent successfully!
                </div>
              )} */}
        {/* <TransactionComponent
                employerAddress={selectedEmployer.address}
                experienceId={experience.id}
                attestationStatus={experience.attestationStatus}
                setShowSuccess={setShowSuccess}
              /> */}
        {/* </div>
          ) : experience.attestationStatus === 3 ? (
            <div>Attestation Rejected</div>
          ) : null} */}
        {/* </div> */}
      </div>
    );
  });
};

export default AttestationDashboard;

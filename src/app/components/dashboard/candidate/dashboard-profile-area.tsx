"use client";
import React, { useEffect, useState } from "react";
import { Dela_Gothic_One, Lexend } from "next/font/google";
import abi from "@/abis/experience.json";
// import { useReadContract } from "wagmi";
import { contract, useStateContext } from "@/context";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import clock from "@/assets/dashboard/images/icon/icon_42.svg";
import calendar from "@/assets/dashboard/images/icon/icon_43.svg";
import logo from "@/assets/dashboard/images/mudrex-logo.png";
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
import Image from "next/image";
import Link from "next/link";

const lexend400 = Lexend({ weight: "400", subsets: ["latin"] });

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttestationDashboard = ({ setIsOpenSidebar }: IProps) => {
  const account = useActiveAccount();
  const { data: experiences, isPending } = useReadContract({
    contract,
    method:
      "function getUserExperience(address _owner) view returns ((uint256 id, address owner, string role, string seeker, string employer, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string[] skills, uint8 attestationStatus, address attestationFromAddress, string attestationFromEns)[])",
    params: [account?.address!]
  });

  // if (!experiences || !experiences?.length)
  //   return <div>No Experiences Found</div>;

  console.log(experiences, "experiences");

  return (
    <div className={`dashboard-body`}>
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="row gx-0 align-items-center">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className={`main-title m0`}>
              {isPending ? "Loading..." : "Experience Attestations"}
            </h2>
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
  const { requestAttestation, getEmployerDetails } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [experienceId, setExperienceId] = useState(null);
  /*  const filteredUsers = users.map((user: any) => ({
    id: user.id,
    name: `${user.subname}.${user.ens_name}`,
    address: user.address
  })); */

  /*   useEffect(() => {
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
 */
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

  const handleRequestAttestation = async (id: any, ens_name: string) => {
    if (txHash) {
      setTxHash(null);
    } else {
      setLoading(true);
      setExperienceId(id);
      try {
        const employer = await getEmployerDetails(ens_name);
        console.log(employer, id);
        if (employer) {
          const response = await requestAttestation(id, employer.address);
          if (response.transactionHash) {
            setTxHash(response);
          } else {
            setError(response.message);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return experiences?.map((experience: any, index: number) => {
    const role: string = experience?.role;
    return (
      <div className="experience-card" key={experience.id}>
        <div className="experience-header">
          <div className="experience-title">
            <div className="d-flex gap-3">
              <Image src={logo} width={54} height={54} alt="" />
              <div>
                <h3 className={`${lexend400.className} mb-1`}>
                  {roles[role as keyof typeof roles]}
                </h3>
                <div className="company-name d-flex align-items-center gap-2 text-capitalize">
                  <Link href={""}>{experience?.employer}</Link>
                  <span>&#x2022;</span>
                  <span className="employment-type d-flex justify-content-between align-items-center">
                    {experience.employmentType}
                  </span>
                  <span>&#x2022;</span>
                  <div className="employment-details">
                    <span className="date-duration">
                      <span className="duration">
                        {experience.startMonth}/{experience.startYear} -{" "}
                        {experience.endMonth}/{experience.endYear}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="skills-section pt-2">
                  <div className="skills-list">
                    {experience?.skills?.map((skill: any, index: number) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {!experience.attestationStatus ? (
              <button
                onClick={() =>
                  handleRequestAttestation(experience.id, experience.employer)
                }
                className="status-badge not-initiated"
              >
                Request Attestation
              </button>
            ) : experience.attestationStatus === 1 ? (
              <span className="status-badge pending">Pending Attestation</span>
            ) : experience.attestationStatus === 2 ? (
              <span className="status-badge attested"> Attested ✓ </span>
            ) : (
              "Rejected"
            )}
          </div>

          {experience && experience.id === experienceId ? (
            <>
              {error && <div className="subname-error mt-10">{error}</div>}

              {txHash && (
                <div className="success-text mt-10">
                  Experience submitted for attestation.
                </div>
              )}

              {loading && (
                <div className="loading-text mt-10">
                  Processing your transaction...
                </div>
              )}
            </>
          ) : null}
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

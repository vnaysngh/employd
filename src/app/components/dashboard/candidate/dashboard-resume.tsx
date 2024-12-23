"use client";
import React, { useEffect, useState } from "react";
import { Chango, Lexend } from "next/font/google";
// import { useReadContract } from "wagmi";
import { contract, useStateContext } from "@/context";
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
import SelectSkills from "./select-skills";
import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
const chango = Chango({ weight: "400", subsets: ["latin"] });
const lexend400 = Lexend({ weight: "400", subsets: ["latin"] });

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AttestationDashboard = ({ setIsOpenSidebar }: IProps) => {
  const account = useActiveAccount();
  const { updateCandidateSkills, isUserRegistered } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!account?.address) {
      router.push("/");
    }
  }, [account, router]);

  useEffect(() => {
    if (isUserRegistered) setSkills(isUserRegistered.skills);
  }, [isUserRegistered]);

  const handleAddSkills = async () => {
    const body = {
      skills
    };
    setLoading(true);
    try {
      const response = await updateCandidateSkills({
        body,
        address: account?.address
      });
      if (response && response.length) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Failed to call API:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const { data: experiences, isPending } = useReadContract({
    contract,
    method:
      "function getUserExperience(address _owner) view returns ((uint256 id, address owner, string role, string seeker, string employer, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, uint8 attestationStatus, address attestationFromAddress, string attestationFromEns)[])",
    params: [account?.address!]
  });

  return (
    <div className={`dashboard-body position-relative`}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

          <div className="row gx-0 align-items-center">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className={`main-title m0`}>
                {isPending ? "Loading..." : "My Resume"}
              </h2>
            </div>
          </div>

          <div className="experience-card card-box border-20 mt-40">
            <h4 className="dash-title-three">Work Experience</h4>
            <div className="experiences-grid mt-30">
              {experiences && experiences.length ? (
                <ExperienceCard experiences={experiences} />
              ) : (
                <div className="not-found-state">
                  <p>Add your professional experience to build your resume.</p>
                  <button
                    className="tx-btn mb-0"
                    onClick={() =>
                      router.push("/dashboard/candidate-dashboard/experience")
                    }
                    disabled={loading}
                  >
                    Add Experience
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="experience-card card-box border-20 mt-40">
            <h4 className="dash-title-three">Skills</h4>
            <div className="dash-input-wrapper">
              <label htmlFor="">Add Skills*</label>

              <div className="row align-items-center">
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <SelectSkills
                      defaultValue={skills}
                      onChange={(value: any[]) => {
                        setSkills(value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {error && <div className="subname-error mb-10">{error}</div>}

              {success && (
                <div className="success-text mb-10">Skills Updated.</div>
              )}

              {loading && <div className="loading-text mb-10">Saving...</div>}

              <div className="d-flex">
                <button
                  className="tx-btn mb-0"
                  onClick={handleAddSkills}
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ExperienceCard = ({ experiences }: { experiences: any }) => {
  const { requestAttestation, getEmployerDetails } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [experienceId, setExperienceId] = useState(null);

  const handleRequestAttestation = async (id: any, ens_name: string) => {
    if (txHash) {
      setTxHash(null);
    } else {
      setLoading(true);
      setExperienceId(id);
      try {
        const employer = await getEmployerDetails(ens_name);
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
    const nameParts = experience?.employer.trim().split(" "); // Split the name by space (for full names)
    const firstName = nameParts[0]; // Get the first part (first name)
    return (
      <div
        key={experience.id}
        className={index === experiences.length - 1 ? "" : "mb-30"}
      >
        <div className="experience-title">
          <div className="d-flex gap-3">
            <div className={`${chango.className} company-logo-placeholder`}>
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className={`${lexend400.className} mb-1`}>
                {roles[role as keyof typeof roles]}
              </h3>
              <div className="company-name d-flex align-items-center gap-2 text-capitalize">
                <Link
                  href={`/${experience?.employer}.employd.eth`}
                  target="_blank"
                  className="on-hover-underline"
                >
                  {experience?.employer}
                </Link>
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
            </div>
          </div>
          {!experience.attestationStatus && !txHash ? (
            <button
              onClick={() =>
                handleRequestAttestation(experience.id, experience.employer)
              }
              disabled={loading}
              className="status-badge not-initiated"
            >
              Request Attestation
            </button>
          ) : experience.attestationStatus === 1 ? (
            <Link
              href={`/attestation/${experience.id}`}
              target="_blank"
              className="on-hover-underline status-badge pending"
            >
              Pending Attestation
            </Link>
          ) : experience.attestationStatus === 2 ? (
            <Link
              href={`/attestation/${experience.id}`}
              target="_blank"
              className="on-hover-underline status-badge attested"
            >
              Attested ✓
            </Link>
          ) : experience.attestationStatus === 3 ? (
            <Link
              href={`/attestation/${experience.id}`}
              target="_blank"
              className="on-hover-underline status-badge subname-error"
            >
              Rejected
            </Link>
          ) : null}
        </div>
        {experience?.description && (
          <>
            <div className="company-name mt-20">Description</div>
            <div className="description-section mt-5">
              {experience?.description}
            </div>
          </>
        )}

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
    );
  });
};

export default AttestationDashboard;

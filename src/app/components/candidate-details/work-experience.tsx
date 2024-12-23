import { contract } from "@/context";
import roles from "@/data/roles";
import React from "react";
import { useReadContract } from "thirdweb/react";
import Skills from "./skills";
import Image from "next/image";
import Link from "next/link";

enum AttestationStatus {
  PENDING = 1,
  SUBMITTED = 2,
  REJECTED = 3
}

interface StatusDisplay {
  label: string;
  className: string;
}

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

  const STATUS_DISPLAY_MAP: Record<AttestationStatus, StatusDisplay> = {
    [AttestationStatus.PENDING]: {
      label: "Pending",
      className: "attestation-pending"
    },
    [AttestationStatus.SUBMITTED]: {
      label: "Attested",
      className: "attestation-submitted"
    },
    [AttestationStatus.REJECTED]: {
      label: "Rejected",
      className: "attestation-rejected"
    }
  };

  const DEFAULT_STATUS: StatusDisplay = {
    label: "Not Initiated",
    className: "attestation-not-initiated"
  };

  const getAttestationBadge = (
    status: AttestationStatus | null
  ): JSX.Element => {
    const statusDisplay = status ? STATUS_DISPLAY_MAP[status] : DEFAULT_STATUS;

    return (
      <span className={`attestation-badge ${statusDisplay.className}`}>
        {statusDisplay.label}
      </span>
    );
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <div className="profile-image-container">
          <Image
            src={user?.image}
            alt="Profile"
            className="profile-image"
            height={120}
            width={120}
          />
        </div>
        <div className="profile-title">
          <h1>{user.name}</h1>
          <p>{user?.role}</p>
          <div className="profile-badges">
            <span className="badge">
              <span>💳</span> {user?.address}
            </span>
            <a>
              <span className="badge">
                <span>✉️</span> {user?.email}
              </span>
            </a>
          </div>
        </div>
      </header>

      <div className="profile-grid">
        {/* Main Content */}
        <main>
          {/* Bio Section */}
          <section className="card">
            <h2>About</h2>
            <p>{user.bio}</p>
          </section>

          {/* Experience Section */}
          <section className="card">
            <h2>Experience</h2>
            {experiences?.map((exp: any, index: number) => {
              const role: string = exp?.role;
              return (
                <div key={index} className="experience-item">
                  <h3>{roles[role as keyof typeof roles]}</h3>
                  <div className="d-flex align-items-center gap-3">
                    <Link
                      href={`/${exp.employer}.employd.eth`}
                      target="_blank"
                      className="on-hover-underline"
                    >
                      <p className="company text-capitalize">{exp.employer}</p>
                    </Link>
                    <p className="period">
                      {exp.startMonth}/{exp.startYear} - {exp.endMonth}/
                      {exp.endYear}
                    </p>
                  </div>

                  <p>{exp.description}</p>
                  {getAttestationBadge(exp.attestationStatus)}
                </div>
              );
            })}
          </section>

          {/* Portfolio Section */}
          {/* <section className="card">
          <h2>Portfolio</h2>
          <div className="portfolio-grid">
            {user.portfolio.map((project, index) => (
              <div key={index} className="portfolio-item">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section> */}
        </main>

        {/* Sidebar */}
        <aside>
          <div className="card skills-container">
            <h2>Skills</h2>
            {user?.skills && user?.skills?.length ? (
              <div className="skills-grid">
                {user?.skills?.map(
                  (skill: { label: string; value: string }, index: number) => (
                    <span key={index} className="skill-tag">
                      {skill.label}
                    </span>
                  )
                )}
              </div>
            ) : (
              <p>User has not added skills</p>
            )}

            <div className="mt-30">
              <h2>Socials</h2>
              <div className="social-links">
                {user?.socials?.twitter ? (
                  <Link
                    href={user?.socials?.twitter}
                    className="social-link"
                    target="_blank"
                  >
                    <i className="bi bi-twitter"></i>
                  </Link>
                ) : null}
                {user?.socials?.linkedIn ? (
                  <Link
                    href={user?.socials?.linkedIn}
                    className="social-link"
                    target="_blank"
                  >
                    <i className="bi bi-linkedin"></i>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default WorkExperience;

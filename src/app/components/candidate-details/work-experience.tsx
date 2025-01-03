import { contract } from "@/context";
import roles from "@/data/roles";
import React from "react";
import { useReadContract } from "thirdweb/react";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/dashboard/images/icon/user.png";
import company from "@/assets/dashboard/images/icon/company.png";

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
      "function getUserExperiences(address user) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus)[])",
    params: [user?.address!]
  });

  if (isPending && user.user_type === "talent") return <h5>Loading...</h5>;

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

  const getFoundedDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

    // Extract components
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }); // Get full month name
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  const avatarPlaceholder =
    user.user_type === "talent" ? (user.image ? user.image : avatar) : company;

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <div className="profile-image-container">
          <Image
            src={avatarPlaceholder}
            alt="Profile"
            className="profile-image"
            height={120}
            width={120}
          />
        </div>
        <div className="profile-title">
          <h1>{user.user_type === "talent" ? user.name : user.company_name}</h1>
          <p>
            {user.user_type === "talent" ? user?.bio : user.company_description}
          </p>
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
            <p>
              {user.user_type === "talent"
                ? user.about || "-"
                : user.company_details?.about || "-"}
            </p>
          </section>

          {/* Experience Section */}
          {user.user_type === "talent" && (
            <section className="card">
              <h2>Experience</h2>
              {experiences?.map((experience: any, index: number) => {
                return (
                  <div key={index} className="experience-item">
                    <h3>{experience?.role}</h3>
                    <div className="d-flex align-items-center gap-3">
                      <Link
                        href={`/${experience.employerEnsName}.employd.eth`}
                        target="_blank"
                        className="on-hover-underline"
                      >
                        <p className="company text-capitalize">
                          {experience.employerEnsName}
                        </p>
                      </Link>
                      <p className="period">
                        {experience.startMonth}/{experience.startYear} -{" "}
                        {experience.endMonth === "N/A" ? (
                          "Present"
                        ) : (
                          <>
                            {experience.endMonth}/{experience.endYear}
                          </>
                        )}
                      </p>
                    </div>

                    <p>{experience.description}</p>
                    {getAttestationBadge(experience.attestationStatus)}
                  </div>
                );
              })}
            </section>
          )}

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
          {user.user_type === "talent" ? (
            <div className="card skills-container">
              <h2>Skills</h2>
              {user?.skills && user?.skills?.length ? (
                <div className="skills-grid">
                  {user?.skills?.map(
                    (
                      skill: { label: string; value: string },
                      index: number
                    ) => (
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
                <h2>Social</h2>
                <div className="social-links">
                  {!user.socials || !Object.keys(user.socials)?.length ? (
                    <p>-</p>
                  ) : null}
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
          ) : (
            <div className="card">
              <h2>Company Details</h2>
              <div className="meta-data-list">
                {/* <div className="meta-data-item">
                  <span className="meta-data-label">Location:</span>
                  <div className="meta-data-content">
                    {employer.location.city}, {employer.location.country}
                  </div>
                </div> */}

                <div className="meta-data-item">
                  <span className="meta-data-label">Size:</span>
                  <div className="meta-data-content">
                    {user.company_details?.company_size || "-"}
                  </div>
                </div>

                <div className="meta-data-item">
                  <span className="meta-data-label">Founded:</span>
                  <div className="meta-data-content">
                    {user.company_details?.founded_date
                      ? getFoundedDate(user.company_details?.founded_date)
                      : "-"}
                  </div>
                </div>
                {/* 
        <div className="meta-data-item">
          <span className="meta-data-label">Phone:</span>
          <div className="meta-data-content">
            {employer.contact.phones.map((phone, index) => (
              <React.Fragment key={phone}>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                {index < employer.contact.phones.length - 1 && ", "}
              </React.Fragment>
            ))}
          </div>
        </div>
 */}
                <div className="meta-data-item">
                  <span className="meta-data-label">Category:</span>
                  <div className="meta-data-content">
                    {user.company_details?.category || "-"}
                  </div>
                </div>
                <div className="meta-data-item">
                  <span className="meta-data-label">Social:</span>
                  <div className="social-links mt-0">
                    {!user?.company_details?.twitter &&
                    !user?.company_details?.linkedin ? (
                      <p>-</p>
                    ) : null}

                    {user?.company_details?.twitter ? (
                      <Link
                        href={user?.company_details?.twitter}
                        className="social-link"
                        target="_blank"
                      >
                        <i className="bi bi-twitter"></i>
                      </Link>
                    ) : null}
                    {user?.company_details?.linkedin ? (
                      <Link
                        href={user?.company_details?.linkedin}
                        className="social-link"
                        target="_blank"
                      >
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* <button className="contact-button">Send Message</button> */}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default WorkExperience;

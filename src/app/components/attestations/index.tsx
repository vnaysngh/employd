"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useActiveAccount, useProfiles } from "thirdweb/react";
import { statusConfig, useStateContext } from "@/context";
import { client } from "@/config/thirdwebClient";
import QRCode from "react-qr-code";
import briefCase from "@/assets/dashboard/images/briefcase.svg";
import company from "@/assets/dashboard/images/company.svg";
import calendar from "@/assets/dashboard/images/calendar.svg";
import clock from "@/assets/dashboard/images/clock.svg";

const Attestations = ({
  experience,
  loading,
  txHash,
  error,
  signExperience
}: {
  experience: any;
  loading: boolean;
  txHash: any;
  error: any;
  signExperience: (
    id: number,
    seeker: string,
    isEmployerNotRegistered: boolean
  ) => void;
}) => {
  const [copied, setCopied] = useState(false);
  const account = useActiveAccount();
  const { data: profiles } = useProfiles({
    client
  });
  const getStatusBadge = () => {
    if (!experience.attestationStatus) return null;
    const status =
      statusConfig[experience.attestationStatus as keyof typeof statusConfig];
    return status ? (
      <div className={`status-badge ${status.class}`}>
        <Image src={status.icon} alt={status.text} height={16} width={16} />
        <span>{status.text}</span>
      </div>
    ) : null;
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  /*   const isEmployerNotRegistered =
    profiles?.[0]?.details.email === experience.employerEmail &&
    !experience?.employerEnsName;

    const formatDate = (month, year) => {
      return month === "N/A" ? "Present" : `${month}/${year}`;
    }; */

  const getStatusTag = () => {
    switch (experience.attestationStatus) {
      case 2:
        return (
          <div className="status-tag verified">
            <i className="bi bi-shield-check"></i>
            <span>Attested</span>
          </div>
        );
      case 1:
        return (
          <div className="status-tag pending">
            <i className="bi bi-hourglass-split"></i>
            <span>Pending</span>
          </div>
        );
      default:
        return (
          <div className="status-tag unsigned">
            <i className="bi bi-exclamation-circle"></i>
            <span>Unsigned</span>
          </div>
        );
    }
  };

  return (
    <div className="attestation-container">
      <div className="attestation-card">
        <div className="attestation-header">
          <div className="status-bar">
            <div className="attestation-id">
              {/* <i className="bi bi-hash"></i> */}
              <span>Experience #{experience.id}</span>
            </div>
            {getStatusTag()}
          </div>
        </div>

        <div className="main-content">
          {/* Parties Section */}
          <div className="parties-section">
            <div className="party attestee">
              <div>
                <div className="party-avatar">
                  {experience?.seekerName[0].toUpperCase()}
                </div>
                <div className="party-info">
                  <span className="party-type">Attestee</span>
                  <h3>{experience?.seekerName}</h3>
                  <span className="ens-name">
                    {experience?.seekerEnsName}.employd.eth
                  </span>
                </div>
              </div>
            </div>

            <div className="connection">
              <div className="connection-line"></div>
              {/*  <div className="connection-icon">
                <i className="bi bi-arrow-down-circle-fill"></i>
              </div> */}
            </div>

            <div className="party attester">
              <div>
                <div className="party-avatar employer">
                  {experience?.employerName[0]?.toUpperCase()}
                </div>
                <div className="party-info">
                  <span className="party-type">Attester</span>
                  <h3>{experience?.employerName}</h3>
                  <span className="ens-name">
                    {experience?.employerEnsName
                      ? `${experience.employerEnsName}.employd.eth`
                      : "Not Registered"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="details-section">
            <div className="detail-grid">
              <div className="detail-item">
                <Image src={briefCase} alt="briefCase" height={24} width={24} />
                <div className="detail-content">
                  <label>Role</label>
                  <p>{experience?.role}</p>
                </div>
              </div>

              <div className="detail-item">
                <Image src={company} alt="briefCase" height={24} width={24} />
                <div className="detail-content">
                  <label>Company</label>
                  <p>{experience?.employerName}</p>
                </div>
              </div>

              <div className="detail-item">
                <Image src={calendar} alt="briefCase" height={24} width={24} />
                <div className="detail-content">
                  <label>Duration</label>
                  <p>
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
              </div>

              <div className="detail-item">
                <Image src={clock} alt="briefCase" height={24} width={24} />
                <div className="detail-content">
                  <label>Type</label>
                  <p>
                    {experience?.employmentType === "full-time"
                      ? "Full-Time"
                      : "Part-Time"}
                  </p>
                </div>
              </div>
            </div>

            <div className="description-box">
              <label>
                {/* <i className="bi bi-card-text"></i> */}
                Description
              </label>
              <p>{experience?.description || "-"}</p>
            </div>
          </div>
        </div>

        {/* Action Section */}
        {(experience?.employerAddress?.toLowerCase() ===
          account?.address?.toLowerCase() ||
          (profiles?.[0]?.details.email === experience.employerEmail &&
            !experience?.employerEnsName)) &&
          experience.attestationStatus !== 2 && (
            <div className="action-section">
              <button
                className={`sign-button ${loading ? "loading" : ""}`}
                onClick={() =>
                  signExperience(
                    experience.id,
                    experience.seekerAddress,
                    !experience?.employerEnsName
                  )
                }
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="bi bi-arrow-repeat spin"></i>
                    Signing...
                  </>
                ) : !experience?.employerEnsName ? (
                  <>
                    <i className="bi bi-pen-fill"></i>
                    Claim and Sign Experience
                  </>
                ) : (
                  <>
                    <i className="bi bi-pen-fill"></i>
                    Sign Experience
                  </>
                )}
              </button>
              {error && !txHash && <p className="error-message">{error}</p>}
              {txHash && experience.attestationStatus !== 2 && (
                <p className="success-message">
                  <i className="bi bi-check-circle-fill"></i>
                  Transaction submitted
                </p>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Attestations;

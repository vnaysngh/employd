"use client";
import React, { useState } from "react";
import roles from "@/data/roles";
import Link from "next/link";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useActiveAccount } from "thirdweb/react";
import { statusConfig } from "@/context";

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
  signExperience: (id: bigint, seeker: string) => void;
}) => {
  const [copied, setCopied] = useState(false);
  const account = useActiveAccount();
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

  return (
    <div className={`attestation-container dashboard-body`}>
      <div className="position-relative">
        <div className="glass-card">
          <div className="header">
            <div className="attestation-id-container">
              {getStatusBadge()}
              <div>
                <CopyToClipboard
                  text={experience?.id?.toString()}
                  onCopy={handleCopyLink}
                >
                  <button className="copy-button">
                    <span className="id-label">ID:</span>
                    <span className="id-number">#{experience?.id}</span>
                    {copied && <i className="bi bi-check-lg"></i>}
                  </button>
                </CopyToClipboard>
              </div>
            </div>

            <h1>Experience Attestation</h1>
            <div className="users">
              <Link
                href={`/${experience.seeker}.employd.eth`}
                target="_blank"
                className="user"
              >
                <div className="avatar">
                  {experience?.seekerName[0].toUpperCase()}
                </div>
                <span>{experience?.seekerEnsName}.employd.eth</span>
              </Link>
              <div className="connection-line" />
              <Link
                href={`/${experience.employerEnsName}.employd.eth`}
                target="_blank"
                className="user"
              >
                <div className="avatar employer">
                  {experience?.employerEnsName[0]?.toUpperCase()}
                </div>
                <span>{experience?.employerEnsName}.employd.eth</span>
              </Link>
            </div>
          </div>

          <div className="content">
            <div className="info-grid">
              <div className="info-item">
                <label>Title</label>
                <h3>{experience?.role}</h3>
              </div>
              <div className="info-item">
                <label>Company</label>
                <h3 className="text-capitalize">{experience?.employerName}</h3>
              </div>
              <div className="info-item">
                <label>Duration</label>
                <h3>
                  {experience.startMonth}/{experience.startYear} -{" "}
                  {experience.endMonth === "N/A" ? (
                    "Present"
                  ) : (
                    <>
                      {experience.endMonth}/{experience.endYear}
                    </>
                  )}
                </h3>
              </div>
              <div className="info-item">
                <label>Employment Type</label>
                <h3>
                  {experience?.employmentType === "full-time"
                    ? "Full-Time"
                    : "Part-Time"}
                </h3>
              </div>
            </div>

            <div className="description">
              <label>Description</label>
              <p>{experience?.description || "-"}</p>
            </div>
          </div>

          {experience?.employerAddress.toLowerCase() ===
            account?.address.toLowerCase() &&
          experience.attestationStatus !== 2 ? (
            <div className="actions">
              {!txHash && (
                <button
                  className={`sign-button ${loading ? "loading" : ""}`}
                  onClick={() =>
                    signExperience(experience.id, experience.seekerAddress)
                  }
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Signing...
                    </>
                  ) : (
                    "Sign Attestation"
                  )}
                </button>
              )}

              {error && !txHash && <div className="error-message">{error}</div>}
              {txHash && experience.attestationStatus !== 2 && (
                <div className="success-message">Transaction submitted</div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Attestations;

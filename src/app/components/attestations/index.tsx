"use client";
import React, { useState } from "react";
import roles from "@/data/roles";
import Link from "next/link";
import Image from "next/image";
import Attested from "@/assets/dashboard/images/icon/checked.png";
import AttestedPending from "@/assets/dashboard/images/icon/pending.png";
import Rejected from "@/assets/dashboard/images/icon/rejected-new.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  signExperience: (id: bigint) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const getStatusBadge = () => {
    if (!experience.attestationStatus) return null;
    const statusConfig = {
      1: { icon: AttestedPending, text: "Pending", class: "pending" },
      2: { icon: Attested, text: "Attested", class: "success" },
      3: { icon: Rejected, text: "Rejected", class: "rejected" }
    };

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
                    <span className="id-number">
                      #
                      {`${experience?.id
                        ?.toString()
                        .slice(0, 4)}...${experience?.id
                        ?.toString()
                        .slice(-4)}`}
                    </span>
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
                  {experience.seeker[0].toUpperCase()}
                </div>
                <span>{experience.seeker}.employd.eth</span>
              </Link>
              <div className="connection-line" />
              <Link
                href={`/${experience.employer}.employd.eth`}
                target="_blank"
                className="user"
              >
                <div className="avatar employer">
                  {experience.employer[0].toUpperCase()}
                </div>
                <span>{experience.employer}.employd.eth</span>
              </Link>
            </div>
          </div>

          <div className="content">
            <div className="info-grid">
              <div className="info-item">
                <label>Title</label>
                <h3>{roles[experience?.role as keyof typeof roles]}</h3>
              </div>
              <div className="info-item">
                <label>Company</label>
                <h3 className="text-capitalize">{experience?.employer}</h3>
              </div>
              <div className="info-item">
                <label>Duration</label>
                <h3>
                  {experience?.startMonth}/{experience?.startYear} -{" "}
                  {experience?.endMonth}/{experience?.endYear}
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

          <div className="actions">
            {experience.attestationStatus === 2 ? (
              <div className="success-badge">
                <Image src={Attested} alt="Attested" height={20} width={20} />
                Attested Successfully
              </div>
            ) : (
              !txHash && (
                <button
                  className={`sign-button ${loading ? "loading" : ""}`}
                  onClick={() => signExperience(experience.id)}
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
              )
            )}

            {error && !txHash && <div className="error-message">{error}</div>}
            {txHash && experience.attestationStatus !== 2 && (
              <div className="success-message">Transaction submitted</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attestations;

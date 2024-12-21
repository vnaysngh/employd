"use client";
import React, { useEffect, useState } from "react";
import roles from "@/data/roles";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import Attested from "@/assets/dashboard/images/icon/checked.png";
import AttestedPending from "@/assets/dashboard/images/icon/pending.png";
import Rejected from "@/assets/dashboard/images/icon/rejected-new.png";

// import TransactionComponent from "../dashboard/transaction/attest";

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

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className={`attestation-container dashboard-body`}>
        <div className="position-relative">
          <div className="d-flex justify-content-between align-items-center mb-20 mt-30">
            <div className="w-100">
              <div className="d-flex gap-2">
                <div>
                  {!experience.attestationStatus ? (
                    "Not Initiated"
                  ) : experience.attestationStatus === 1 ? (
                    <Image
                      src={AttestedPending}
                      alt="attestation-icon"
                      height={48}
                      width={48}
                    />
                  ) : experience.attestationStatus === 2 ? (
                    <Image
                      src={Attested}
                      alt="attestation-icon"
                      height={48}
                      width={48}
                    />
                  ) : (
                    <Image
                      src={Rejected}
                      alt="attestation-icon"
                      height={48}
                      width={48}
                    />
                  )}
                </div>
                {/*  <CopyToClipboard
                        text={experience?.id}
                        onCopy={handleCopyLink}
                      >
                        <span className="on-hover-underline attestation-id">
                          {`#${experience?.id
                            ?.toString()
                            .slice(0, 4)}...${experience?.id
                            ?.toString()
                            .slice(-4)}`}
                        </span>
                      </CopyToClipboard>
                      {copied && <i className="bi bi-check"></i>} */}
                <div>
                  <h2 className={`main-title`}>
                    <div className="d-flex gap-2">Experience Attestation</div>
                  </h2>
                  <div>
                    <label htmlFor="" className="text-secondary">
                      By{" "}
                      <Link
                        target="_blank"
                        href={`/${experience.seeker}.employd.eth`}
                      >
                        <span className="text-decoration-underline">
                          {experience.seeker}.employd.eth
                        </span>
                      </Link>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="" className="text-secondary">
                      From{" "}
                      <Link
                        target="_blank"
                        href={`/${experience.employer}.employd.eth`}
                      >
                        <span className="text-decoration-underline">
                          {experience.employer}.employd.eth
                        </span>
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* <TransactionComponent experienceId={experience.id} /> */}
          </div>

          <div className="card-box border-20">
            <div className="accordion dash-accordion-one" id="accordionTwo">
              <div className="accordion-item pt-30 pb-30">
                <div
                  id="collapseOneA"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOneA"
                  data-bs-parent="#accordionTwo"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Title*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <div className="attestation-item">
                            {roles[experience?.role as keyof typeof roles]}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Company*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <div className="attestation-item text-capitalize">
                            {experience?.employer}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Duration*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="row">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <div className="attestation-item">
                              {experience?.startMonth}/{experience?.startYear} -
                              {experience?.endMonth}/{experience?.endYear}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Employment Type*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <div className="attestation-item">
                                {experience?.employmentType === "full-time"
                                  ? "Full-Time"
                                  : "Part-Time"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="">Description</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <div className="attestation-item">
                            {experience?.description || "-"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {experience.attestationStatus === 2 ? (
                      <div className="success-text">Attested</div>
                    ) : null}

                    {!txHash && experience.attestationStatus !== 2 && (
                      <div className="d-flex">
                        <button
                          className="tx-btn mb-0"
                          onClick={() => signExperience(experience.id)}
                          disabled={loading}
                        >
                          Sign
                        </button>
                      </div>
                    )}

                    {error && <div className="subname-error">{error}</div>}

                    {txHash && (
                      <div className="success-text">Transaction submitted.</div>
                    )}

                    {loading && (
                      <div className="loading-text">
                        Processing your transaction...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attestations;

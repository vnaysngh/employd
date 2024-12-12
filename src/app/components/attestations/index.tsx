"use client";
import React, { useEffect, useState } from "react";
import roles from "@/data/roles";
import Link from "next/link";
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
  return (
    <>
      <div className={`attestation-container dashboard-body`}>
        <div className="position-relative">
          <div className="d-flex justify-content-between align-items-center mb-20 mt-30">
            <div>
              <h2 className={`main-title`}>Attestation Request</h2>
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
              <div>
                <label htmlFor="" className="text-secondary">
                  To{" "}
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
            {/* <TransactionComponent experienceId={experience.id} /> */}
          </div>

          <div className="card-box border-20">
            <div className="accordion dash-accordion-one" id="accordionTwo">
              <div className="accordion-item pt-30">
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
                          <label htmlFor="">Skills</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <div className="attestation-item">
                            {experience?.skills?.join(" , ")}
                          </div>
                        </div>
                      </div>
                    </div>

                    {!txHash && (
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

                    {error && (
                      <div className="subname-error mb-10">{error}</div>
                    )}

                    {txHash && (
                      <div className="success-text mb-20">
                        Transaction submitted.
                      </div>
                    )}

                    {loading && (
                      <div className="loading-text mb-10">
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

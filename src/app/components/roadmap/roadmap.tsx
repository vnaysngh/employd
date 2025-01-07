"use client";
import React, { useState } from "react";
import Image from "next/image";
import roadmap from "@/assets/images/assets/roadmap.png";
const roadmapPhases = [
  {
    title: "Launch MVP on testnet",
    description:
      "Deploy the MVP on testnet to showcase decentralized attestations and gather feedback."
  },
  {
    title: "Attestation Explorer (on testnet)",
    description:
      "Allow users to search and view verified attestations on testnet for better transparency."
  },
  {
    title: "Update Attestations (on testnet)",
    description:
      "Enable users to update their attestations for accuracy and flexibility."
  },
  {
    title: "Launch on Mainnet",
    description:
      "Go live on mainnet with the decentralized attestation platform."
  },
  {
    title: "Web3 Resume for talents",
    description:
      "Showcase on-chain activity, NFTs, and skills in a verified digital resume."
  },
  {
    title: "Job Marketplace",
    description:
      "Connect talents and employers through verified attestations for trust-based hiring."
  }
];

const Roadmap = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 order-lg-last">
            <div className="ps-lg-4 wow fadeInRight">
              <div className="title-one">
                <h2 className="fw-600">Roadmap</h2>
              </div>

              <div className="mt-40 md-mt-20 mb-40 md-mb-20 justify-content-center">
                <div className="roadmap">
                  <div className="roadmap-grid">
                    {roadmapPhases.map((phase, index) => (
                      <div key={index} className="roadmap-phase">
                        <h4 className="roadmap-phase-number">
                          Phase {index + 1}
                        </h4>
                        <h3 className="roadmap-phase-title">{phase.title}</h3>
                        <p className="roadmap-phase-description">
                          {phase.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-8 m-auto order-lg-first">
            <div className="img-data position-relative me-xl-5 md-mt-20">
              <div className="row align-items-center gx-xl-5">
                <Image src={roadmap} alt="shape" className="lazy-img" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-bottom pb-50 lg-pb-20 mt-90 lg-mt-30">
          <div className="row justify-content-center">
            {/* <CounterOne /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

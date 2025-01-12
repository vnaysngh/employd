"use client";
import React, { useState } from "react";
import Image from "next/image";
import roadmap from "@/assets/images/assets/roadmap.png";
const roadmapPhases = [
  {
    phase: "Q1 Jan 2025",
    title: "Launch MVP on testnet",
    description:
      "Deploy the MVP to showcase decentralized attestations and gather feedback."
  },
  {
    phase: "Q1 Jan 2025",
    title: "Attestation Explorer ",
    description:
      "Allow users to search and view verified attestations for better transparency."
  },
  {
    phase: "Q1 Feb 2025",
    title: "Update Attestations",
    description:
      "Enable users to update their attestations for accuracy and flexibility."
  },
  {
    phase: "Q1 Mar 2025",
    title: "Launch on Mainnet",
    description: "Go live on mainnet with the platform."
  },
  {
    phase: "Q1 April 2025",
    title: "Real-Time Messaging & Notifications",
    description:
      "Add messaging and smart alerts for seamless communication between talents and employers."
  },
  {
    phase: "Q1 April 2025",
    title: "Web3 Resume for talents",
    description:
      "Showcase on-chain activity, NFTs, and skills in a verified digital resume."
  },
  {
    phase: "Q1 May 2025",
    title: "Job Marketplace",
    description:
      "Connect talents and employers through verified attestations for trust-based hiring."
  },
  {
    phase: "Q3 July 2025",
    title: "Batch Attestations for Employers",
    description:
      "Allow employers to issue multiple attestations in one go, simplifying team verifications."
  },
  {
    phase: "Q3 Sep 2025",
    title: "Insights Dashboard for Users",
    description: "Offer analytics for tracking progress and hiring trends."
  },
  {
    phase: "Q4  Oct 2025",
    title: "Collaborative Peer Attestations",
    description: "Enable users to validate each other's skills and experiences."
  },
  {
    phase: "Q1 2026",
    title: "Open-Source Initiative",
    description:
      "Make the platform open source to encourage contributions and transparency."
  }
];

const Roadmap = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80">
      <div className="container">
        <div className="row align-items-center">
          <div className="ps-lg-4 wow fadeInRight">
            <div className="title-one">
              <h2 className="fw-600 text-center">Roadmap</h2>
            </div>

            <div className="mt-40 md-mt-20 mb-40 md-mb-20 justify-content-center">
              <div className="roadmap">
                <div className="roadmap-grid" style={{ maxWidth: "none" }}>
                  <div className="row align-items-center">
                    {roadmapPhases.map((phase, index) => (
                      <div className="col-lg-4 col-md-4" key={index}>
                        <div key={index} className="roadmap-phase">
                          <h4
                            className="roadmap-phase-number"
                            // style={{ color: "rgb(44, 45, 48)" }}
                          >
                            {phase.phase}
                          </h4>
                          <h3 className="roadmap-phase-title">{phase.title}</h3>
                          <p className="roadmap-phase-description">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

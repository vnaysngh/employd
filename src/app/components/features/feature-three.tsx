"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import attested from "@/assets/dashboard/images/icon/attested-landing.png";
import { Inter, Poppins } from "next/font/google";
const poppins = Poppins({ weight: "700", subsets: ["latin"] });

const FeatureThree = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-last">
            <div className="ps-lg-4 wow fadeInRight">
              <div className="title-one">
                <h2 className={`${poppins.className}`}>
                  Empower Your Career with Attestations
                </h2>
              </div>
              <p className="mt-40 md-mt-20 mb-40 md-mb-20 color-secondary">
                Leverage blockchain-based attestation to verify your skills,
                roles, and achievements. Build a tamper-proof professional
                identity that employers trust.
              </p>
              <ul className="list-style-one style-none">
                <li>Verified attestations from peers and employers</li>
                <li>Build trust with a tamper-proof professional record</li>
                <li>Expand your professional network effortlessly</li>
              </ul>
              <Link href="/auth" className="btn-five mt-70 md-mt-30">
                Launch App
              </Link>
            </div>
          </div>
          <div className="col-lg-5 col-md-8 m-auto order-lg-first">
            <div className="img-data position-relative me-xl-5 md-mt-20">
              <div className="row align-items-center gx-xl-5 w-75">
                <Image src={attested} alt="shape" className="lazy-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="pb-50 lg-pb-20 mt-90 lg-mt-30">
          <div className="row justify-content-center">
            {/* <CounterOne /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureThree;

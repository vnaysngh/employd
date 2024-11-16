"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import DashboardResume from "@/app/components/dashboard/candidate/dashboard-resume";
import Header from "@/layouts/headers/header";
import Attestations from "@/app/components/attestations";

const CandidateDashboardResumePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

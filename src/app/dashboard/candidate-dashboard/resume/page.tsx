"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import DashboardResume from "@/app/components/dashboard/candidate/dashboard-resume";
import Header from "@/layouts/headers/header";

const CandidateDashboardResumePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <DashboardResume />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

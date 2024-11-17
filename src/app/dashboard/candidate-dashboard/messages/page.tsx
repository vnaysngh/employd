"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import DashboardMessage from "@/app/components/dashboard/candidate/dashboard-message";
import Header from "@/layouts/headers/header";

const CandidateDashboardMessagesPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <DashboardMessage />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardMessagesPage;

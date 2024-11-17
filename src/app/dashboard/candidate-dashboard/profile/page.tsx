"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import DashboardProfileArea from "@/app/components/dashboard/candidate/dashboard-profile-area";
import Header from "@/layouts/headers/header";

const CandidateProfilePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <DashboardProfileArea />
      </div>
    </Wrapper>
  );
};

export default CandidateProfilePage;

"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import DashboardResume from "@/app/components/dashboard/candidate/dashboard-resume";
import Header from "@/layouts/headers/header";

const CandidateDashboardResumePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <DashboardResume setIsOpenSidebar={setIsOpenSidebar} />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;
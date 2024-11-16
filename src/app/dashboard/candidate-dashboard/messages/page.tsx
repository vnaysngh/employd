"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import DashboardMessage from "@/app/components/dashboard/candidate/dashboard-message";
import Header from "@/layouts/headers/header";

const CandidateDashboardMessagesPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />

        <DashboardMessage setIsOpenSidebar={setIsOpenSidebar} />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardMessagesPage;

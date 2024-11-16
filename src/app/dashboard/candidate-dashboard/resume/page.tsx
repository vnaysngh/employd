"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import DashboardResume from "@/app/components/dashboard/candidate/dashboard-resume";
import Header from "@/layouts/headers/header";

const CandidateDashboardResumePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        {/* <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        /> */}
        {/* aside end  */}
        <Header />

        {/* Resume area start */}
        <DashboardResume setIsOpenSidebar={setIsOpenSidebar} />
        {/* Resume area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

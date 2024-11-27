"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import DashboardProfileArea from "@/app/components/dashboard/candidate/dashboard-profile-area";
import Header from "@/layouts/headers/header";
import EmployProfileArea from "@/app/components/dashboard/employ/profile-area";
import EmployAside from "@/app/components/dashboard/employ/aside";

const CandidateProfilePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />

        <EmployProfileArea setIsOpenSidebar={setIsOpenSidebar} />
      </div>
    </Wrapper>
  );
};

export default CandidateProfilePage;

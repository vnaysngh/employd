"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import dynamic from "next/dynamic";
// Dynamically import the component with SSR disabled
const AddExperience = dynamic(
  () => import("@/app/components/dashboard/candidate/add-experience"),
  {
    ssr: false
  }
);

// Dynamically import the component with SSR disabled
const CandidateAside = dynamic(
  () => import("@/app/components/dashboard/candidate/aside"),
  {
    ssr: false
  }
);

const CandidateDashboardResumePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* <Header /> */}
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />

        <AddExperience setIsOpenSidebar={setIsOpenSidebar} />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

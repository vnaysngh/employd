"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import dynamic from "next/dynamic";

// Dynamically import the component with SSR disabled
const CandidateAttestation = dynamic(
  () => import("@/app/components/dashboard/employ/candidate-attestation"),
  {
    ssr: false
  }
);

const EmployerDashboardInvite = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* profile area start */}
        <CandidateAttestation setIsOpenSidebar={setIsOpenSidebar} />
        {/* profile area end */}
      </div>
    </Wrapper>
  );
};

export default EmployerDashboardInvite;

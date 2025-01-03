"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import dynamic from "next/dynamic";

// Dynamically import the component with SSR disabled
const CandidateWeb3Resume = dynamic(
  () => import("@/app/components/dashboard/candidate/web3-resume"),
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

const CandidateProfilePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />

        <CandidateWeb3Resume setIsOpenSidebar={setIsOpenSidebar} />
      </div>
    </Wrapper>
  );
};

export default CandidateProfilePage;

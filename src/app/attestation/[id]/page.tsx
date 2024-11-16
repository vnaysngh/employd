"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import DashboardResume from "@/app/components/dashboard/candidate/dashboard-resume";
import Header from "@/layouts/headers/header";
import Attestations from "@/app/components/attestations";
import { useParams, usePathname } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/abis/experience.json";

const CandidateDashboardResumePage = () => {
  const params = useParams();
  const { address } = useAccount();

  const experience: any = useReadContract({
    abi,
    address: "0xc91405FDC892BF969ac63A189E1DdC8dF811D80F",
    functionName: "experiences",
    args: [params?.id!],
    blockTag: "pending"
  });

  console.log(experience.data);

  if (!experience || !experience.data) return;
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <Attestations experience={experience.data} />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

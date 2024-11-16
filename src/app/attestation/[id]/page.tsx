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

  const experience: any = useReadContract({
    abi,
    address: "0xC47B4f2A6C2788c05B559078a8e30a5697377a58",
    functionName: "getExperienceById",
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

"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import Attestations from "@/app/components/attestations";
import { useParams } from "next/navigation";
import { useReadContract } from "wagmi";
import abi from "@/abis/experience.json";

const CandidateDashboardResumePage = () => {
  const params = useParams();

  const experience: any = useReadContract({
    abi,
    address: "0x354305dc55B9351a6A99dAD46C278c6150026ed0",
    functionName: "getExperienceById",
    args: [params.id!],
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

"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import Attestations from "@/app/components/attestations";
import { useParams } from "next/navigation";
import { useReadContract } from "thirdweb/react";
import { contract } from "@/context";
const CandidateDashboardResumePage = () => {
  const params: { id: string } = useParams();

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getExperienceById(uint256 experienceId) view returns ((uint256 id, address owner, string role, string seeker, string employer, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string[] skills, uint8 attestationStatus, address attestationFromAddress, string attestationFromEns))",
    params: [BigInt(params?.id!)]
  });

  console.log(data);
  if (isPending) return <h3>Loading</h3>;
  if (!data) return <h3>Something Went Wrong</h3>;
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <Attestations experience={data} />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

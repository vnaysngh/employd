"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import Attestations from "@/app/components/attestations";
import { useParams } from "next/navigation";
import { useReadContract } from "thirdweb/react";
import { contract, useStateContext } from "@/context";
const CandidateDashboardResumePage = () => {
  const params: { id: string } = useParams();
  const { attestExperience } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleSignExperience = async (id: bigint) => {
    if (txHash) {
      setTxHash(null);
    } else {
      setLoading(true);
      try {
        const response = await attestExperience(id);
        if (response.transactionHash) {
          setTxHash(response);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getExperienceById(uint256 experienceId) view returns ((uint256 id, address owner, string role, string seeker, string employer, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, string[] skills, uint8 attestationStatus, address attestationFromAddress, string attestationFromEns))",
    params: [BigInt(params?.id!)]
  });

  if (isPending) return <h3>Loading</h3>;
  if (!data) return <h3>Something Went Wrong</h3>;
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <Attestations
          experience={data}
          loading={loading}
          txHash={txHash}
          error={error}
          signExperience={handleSignExperience}
        />
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

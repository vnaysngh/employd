"use client";
import React, { useEffect, useState } from "react";
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

  const handleSignExperience = async (id: bigint, seeker: string) => {
    if (txHash) {
      setTxHash(null);
    } else {
      setLoading(true);
      try {
        const response = await attestExperience(id, seeker);
        console.log(response, "response");
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
      "function getExperienceById(uint32 experienceId) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus))",
    params: [Number(params?.id!)]
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

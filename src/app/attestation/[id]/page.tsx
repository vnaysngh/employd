"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/layouts/wrapper";
import Attestations from "@/app/components/attestations";
import { useParams } from "next/navigation";
import { useReadContract } from "thirdweb/react";
import { contract, useStateContext } from "@/context";
import HeaderThree from "@/layouts/headers/header";
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

  const { data, isPending, isError } = useReadContract({
    contract,
    method:
      "function getExperienceById(uint32 experienceId) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus))",
    params: [Number(params?.id!)]
  });

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <HeaderThree />

        {isPending ? (
          <h3>Loading</h3>
        ) : isError ? (
          <h3>Something went wrong</h3>
        ) : !isPending && !data ? (
          <h3>Attestation data not found</h3>
        ) : (
          <Attestations
            experience={data}
            loading={loading}
            txHash={txHash}
            error={error}
            signExperience={handleSignExperience}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;

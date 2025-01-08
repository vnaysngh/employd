"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/layouts/wrapper";
import Attestations from "@/app/components/attestations";
import { useParams } from "next/navigation";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract, useStateContext } from "@/context";
import HeaderThree from "@/layouts/headers/header";
import Loader from "@/app/loading";

interface WorkerRequest {
  signature: {
    message: {
      name: string;
      owner: string;
      addresses?: Record<string, string | undefined> | undefined;
      texts?: Record<string, string | undefined> | undefined;
      contenthash?: string | undefined;
    };
    hash: string;
  };
}

const CandidateDashboardResumePage = () => {
  const params: { id: string } = useParams();
  const { attestExperience, registerEmployerToExperience } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const account = useActiveAccount();

  const nameData: WorkerRequest["signature"]["message"] = {
    name: `Claim Experience`, // Candidate's ENS name
    owner: account?.address! // Candidate's wallet address
  };

  const handleSignMessage = async () => {
    if (!account) return null;

    setLoading(true);
    try {
      const response = await account.signMessage({
        message: JSON.stringify(nameData)
      });
      return response;
    } catch (error) {
      console.error("Error signing message:", error);
      return null;
    }
  };

  const registerAndSignExperience = async (id: any, seeker: string) => {
    try {
      const messageSignature = await handleSignMessage();
      if (!messageSignature) {
        setError("Message signing failed.");
        return null;
      }

      const registrationResponse = await registerEmployerToExperience(id);
      if (!registrationResponse.transactionHash) {
        setError(
          registrationResponse.message || "Employer registration failed."
        );
        return null;
      }

      const attestationResponse = await attestExperience(id, seeker);

      if (attestationResponse.transactionHash) {
        return attestationResponse;
      } else {
        setError(attestationResponse.message || "Attestation failed.");
        return null;
      }
    } catch (error) {
      console.error("Error in registration or attestation:", error);
      setError(
        "Something went wrong during employer registration or attestation."
      );
      return null;
    }
  };

  const signExperienceDirectly = async (id: any, seeker: string) => {
    try {
      const attestationResponse = await attestExperience(id, seeker);

      if (attestationResponse.transactionHash) {
        return attestationResponse;
      } else {
        setError(attestationResponse.message || "Attestation failed.");
        return null;
      }
    } catch (error) {
      console.error("Error in direct attestation:", error);
      setError("Something went wrong during attestation.");
      return null;
    }
  };

  const handleSignExperience = async (
    id: any,
    seeker: string,
    isEmployerNotRegistered: boolean
  ) => {
    if (txHash) {
      setTxHash(null);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      let response;

      if (isEmployerNotRegistered) {
        response = await registerAndSignExperience(id, seeker);
      } else {
        response = await signExperienceDirectly(id, seeker);
      }

      if (response?.transactionHash) {
        setTxHash(response);
      } else {
        // Ensure loading stays true until an error occurs or is set explicitly
        throw new Error(
          "Signing process failed without a valid transaction hash."
        );
      }
    } catch (error) {
      console.error("Error handling experience signing:", error);
      setError("An unexpected error occurred.");
    } finally {
      // Only stop loading if there's an error or signing has completed
      setLoading(false);
    }
  };

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getExperienceById(uint32 experienceId) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus, uint8 employerStatus, string employerEmail))",
    params: [Number(params?.id!)]
  });

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <HeaderThree />

        {isPending ? (
          <Loader />
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

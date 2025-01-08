"use client";
import React, { useEffect } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import CandidateItem from "./candidate-item";
import { useActiveAccount, useProfiles, useReadContract } from "thirdweb/react";
import { contract } from "@/context";
import { client } from "@/config/thirdwebClient";
import Loader from "@/app/loading";
// import SPIndexService from "@/app/signprotocol/signClient";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateAttestation = ({ setIsOpenSidebar }: IProps) => {
  const account = useActiveAccount();
  const { data: profiles } = useProfiles({
    client
  });

  const { data: attestations, isPending } = useReadContract({
    contract,
    method:
      "function getEmployerExperiences(address employer) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus, uint8 employerStatus, string employerEmail)[])",
    params: [account?.address!]
  });

  const { data: attestationClaims, isPending: isLoading } = useReadContract({
    contract,
    method:
      "function getExperiencesByEmail(string email) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus, uint8 employerStatus, string employerEmail)[])",
    params: [profiles?.[0]?.details.email!]
  });

  // Combine the two arrays into a mutable array
  const totalAttestations = [
    ...Array.from(attestations || []),
    ...Array.from(attestationClaims || [])
  ];

  /* const getSchema = async () => {
    const schemaList = await SPIndexService.queryAttestationList({
      page: 1,
      schemaId: "onchain_evm_84532_0x4ff"
    });
    console.log(schemaList);
  };

  useEffect(() => {
    getSchema();
  }, []); */

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Attestations</h2>
        </div>

        <div className="wrapper">
          {isPending && <Loader />}

          {!isPending && !isLoading && !totalAttestations?.length && (
            <div className="candidate-profile-card list-layout mb-25 cursor-pointer">
              <h3>You haven’t received any attestations yet.</h3>
            </div>
          )}

          {totalAttestations?.length > 0 && (
            <div>
              {totalAttestations.map((item: any) => (
                <CandidateItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateAttestation;

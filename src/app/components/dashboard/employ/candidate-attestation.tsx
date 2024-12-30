"use client";
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import CandidateItem from "./candidate-item";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/context";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateAttestation = ({ setIsOpenSidebar }: IProps) => {
  const account = useActiveAccount();

  const { data: attestations, isPending } = useReadContract({
    contract,
    method:
      "function getEmployerExperiences(address employer) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus)[])",
    params: [account?.address!]
  });

  // if (isPending) return <h3>Loading...</h3>;

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Attestations</h2>
        </div>

        <div className="wrapper">
          {isPending ? (
            <h3>Loading...</h3>
          ) : !isPending && (!attestations || !attestations?.length) ? (
            <h3>No attestations</h3>
          ) : (
            <>
              {attestations.map((item: any) => (
                <CandidateItem key={item.id} item={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateAttestation;

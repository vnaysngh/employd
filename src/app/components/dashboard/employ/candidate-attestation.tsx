"use client";
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import candidate_data from "@/data/candidate-data";
import CandidateItem from "./candidate-item";
// import EmployShortSelect from "./short-select";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateAttestation = ({ setIsOpenSidebar }: IProps) => {
  const candidate_items = candidate_data.slice(0, 4);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Attestations</h2>
        </div>

        <div className="wrapper">
          {candidate_items.map((item) => (
            <CandidateItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateAttestation;

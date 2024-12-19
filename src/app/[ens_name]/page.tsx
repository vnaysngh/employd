import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CandidateDetailsArea from "../components/candidate-details/candidate-details-area";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Candidate Details v1"
};

const CandidateProfileDetailsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <CandidateDetailsArea />
      </div>
    </Wrapper>
  );
};

export default CandidateProfileDetailsPage;

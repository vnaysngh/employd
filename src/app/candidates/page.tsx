import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CandidateV1Area from "../components/candidate/candidate-v1-area";

export const metadata: Metadata = {
  title: "Candidates"
};

const CandidatePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />

        <CandidateV1Area />
      </div>
    </Wrapper>
  );
};

export default CandidatePage;

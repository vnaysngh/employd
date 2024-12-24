import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CompanyV1Area from "../components/company/company-v1-area";

export const metadata: Metadata = {
  title: "Company v1"
};

const CompanyV1Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <Header />
        <CompanyV1Area />
      </div>
    </Wrapper>
  );
};

export default CompanyV1Page;

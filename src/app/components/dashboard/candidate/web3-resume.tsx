"use client";
import React from "react";
import DashboardHeader from "./dashboard-header";
import WIP from "@/assets/images/assets/work-in-progress.png";
import Image from "next/image";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Web3Resume = ({ setIsOpenSidebar }: IProps) => {
  return (
    <div className={`dashboard-body position-relative`}>
      <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
      <h2 className="main-title mb-20">My Web3 Resume</h2>

      <div className="border-20 mt-40 d-flex justify-content-center m-auto">
        <Image src={WIP} alt="work-in-progress" style={{ height: "auto" }} />
      </div>
    </div>
  );
};

export default Web3Resume;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CandidateProfileSlider from "./candidate-profile-slider";
import avatar from "@/assets/images/candidates/img_01.jpg";
import Skills from "./skills";
import WorkExperience from "./work-experience";
import CandidateBio from "./bio";
import { useParams } from "next/navigation";
import { useStateContext } from "@/context";

/* const candidate = {
  name: "Vinay Singh",
  title: "Frontend Engineer",
  bio: "Passionate frontend engineer with expertise in building modern web applications and blockchain solutions.",
  wallet: "0x758D...5CB2",
  email: "schilled.xyz@gmail.com",
  experience: [
    {
      company: "Mudrexx",
      role: "Frontend Engineer",
      period: "Dec 2019 - Sep 2024",
      description:
        "Built algos and coinsets. Led frontend development initiatives and implemented blockchain solutions."
    }
  ],
  skills: [
    "React",
    "JavaScript",
    "TypeScript",
    "Web3",
    "Smart Contracts",
    "CSS3",
    "HTML5"
  ],
  portfolio: [
    {
      title: "DeFi Dashboard",
      description: "A comprehensive dashboard for DeFi portfolio management"
    },
    {
      title: "NFT Marketplace",
      description: "Digital marketplace for crypto collectibles and NFTs"
    }
  ]
}; */

const CandidateDetailsArea = () => {
  const params: { ens_name: string } = useParams();
  const { getUserDetailsByEns } = useStateContext();
  const [error, setError] = useState(false);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const ensRegex = /^([\w-]+)\.employd\.eth$/;

  const match = useMemo(
    () => params.ens_name.match(ensRegex),
    [params.ens_name]
  );

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await getUserDetailsByEns(match?.[1]);
      if (response) {
        setUser(response);
      } else {
        console.error(response);
        setError(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!match) return;
    getUserDetails();
  }, [match]);

  if (!match) return <h3 className="">User does not exist</h3>;

  if (loading) return <h3>Loading</h3>;

  if (!user && !loading) return <h3>User not found</h3>;

  return (
    <section className="candidates-profile pt-150 pb-150 lg-pb-80">
      <WorkExperience user={user} />
    </section>
  );
};

export default CandidateDetailsArea;

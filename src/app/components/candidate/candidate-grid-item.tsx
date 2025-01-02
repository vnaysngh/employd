import React from "react";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/dashboard/images/icon/company.png";
import logo from "@/assets/images/assets/letter-stamp.png";
import { useReadContract } from "thirdweb/react";
import { contract } from "@/context";

const CandidateGridItem = ({ item }: { item: any }) => {
  const { data: attestations, isPending } = useReadContract({
    contract: contract,
    method:
      "function getUserExperienceIds(address user) view returns (uint32[])",
    params: [item.address!]
  });

  return (
    <div className={`company-grid-layout mb-30`}>
      <div className="d-flex justify-content-between mb-10  ">
        <div className="category">{item?.role || "Others"}</div>
        {/* Attestation badge */}
        <div className="attestation-count">
          <Image src={logo} height={12} width={12} alt="logo" />
          <span>{attestations?.length || 0}</span>
        </div>
      </div>
      <div className="position-relative">
        <div className="company-logo rounded-circle">
          <Image
            src={item?.image || avatar}
            alt="image"
            className="lazy-img rounded-circle"
            height={80}
            width={80}
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <Link href={`/${item.ens_name}.employd.eth`}>
          <h5 className="mb-0">
            {item.name}
            <div className="ens-name mt-5">@{item.ens_name}</div>
          </h5>
        </Link>
      </div>

      {/* ENS name */}
      {/*  <div>
        <span>{item.ens_name || "company.employd.eth"}</span>
      </div> */}

      <div className="company-description">{item.company_description}</div>

      {/*  <ul className="cadidate-skills style-none d-flex flex-wrap">
        {item?.skills?.slice(0, 3).map((s: any, i: number) => (
          <li key={i}>{s?.label}</li>
        ))}
      </ul> */}
      <div className="social-links mt-0 gap-2">
        {item?.socials?.twitter ? (
          <Link
            href={item?.socials?.twitter}
            target="_blank"
            className="social-icon"
          >
            <i className="bi bi-twitter"></i>
          </Link>
        ) : null}
        {item?.socials?.linkedin ? (
          <Link
            href={item?.socials?.linkedin}
            target="_blank"
            className="social-icon"
          >
            <i className="bi bi-linkedin"></i>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CandidateGridItem;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/dashboard/images/icon/company.png";
import logo from "@/assets/images/assets/letter-stamp.png";

const CompanyGridItem = ({ item }: { item: any }) => {
  return (
    <div className={`company-grid-layout mb-30`}>
      <div className="d-flex justify-content-between mb-10  ">
        <div className="category">
          {item?.company_details?.category || "Others"}
        </div>
        {/* Attestation badge */}
        {/*  <div className="attestation-count">
          <Image src={logo} height={12} width={12} alt="logo" />
          <span>{item.attestations_count || 0}</span>
        </div> */}
      </div>
      <Link
        href={`/${item.ens_name}.employd.eth`}
        className="on-hover-underline"
      >
        <div className="position-relative">
          <div className="company-logo rounded-circle">
            <Image
              src={
                item?.image ||
                item?.user_login_details?.details?.picture ||
                avatar
              }
              alt="image"
              className="lazy-img rounded-circle"
              height={80}
              width={80}
            />
          </div>
        </div>
      </Link>

      <Link
        href={`/${item.ens_name}.employd.eth`}
        className="on-hover-underline"
      >
        <div className="d-flex gap-2">
          <h5 className="mb-0">
            {item.company_name}
            <div className="ens-name mt-5">@{item.ens_name}</div>
          </h5>
        </div>
      </Link>

      {/* ENS name */}
      {/*  <div>
        <span>{item.ens_name || "company.employd.eth"}</span>
      </div> */}

      <div className="company-description">{item.company_description}</div>

      <div className="social-links mt-0 gap-2">
        {item?.company_details?.twitter ? (
          <Link
            href={item?.company_details?.twitter}
            target="_blank"
            className="social-icon"
          >
            <i className="bi bi-twitter"></i>
          </Link>
        ) : null}
        {item?.company_details?.website ? (
          <Link
            href={item?.company_details?.website}
            target="_blank"
            className="social-icon"
          >
            <i className="bi bi-globe"></i>
          </Link>
        ) : null}
        {item?.company_details?.linkedin ? (
          <Link
            href={item?.company_details?.linkedin}
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

export default CompanyGridItem;

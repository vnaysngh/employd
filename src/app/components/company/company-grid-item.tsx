import React from "react";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/dashboard/images/icon/company.png";

const CompanyGridItem = ({ item }: { item: any }) => {
  console.log(item);
  return (
    <div
      className={`company-grid-layout ${item.isFav ? "favourite" : ""} mb-30`}
    >
      <Link
        href="/company-details"
        className="company-logo me-auto ms-auto rounded-circle"
      >
        <Image
          src={item?.image || avatar}
          alt="image"
          className="lazy-img rounded-circle"
          height={80}
          width={80}
        />
      </Link>
      <h5 className="text-center">
        <Link href="/company-details" className="company-name tran3s">
          {item.company_name}
        </Link>
      </h5>
      <div className="row gx-2 pt-25 sm-pt-10">
        {/* <div className="col-md-6"> */}
        <Link
          href={`/${item.ens_name}.employd.eth`}
          className="profile-btn tran3s w-100 mt-5"
          style={{ maxWidth: "80%", margin: "0 auto" }}
        >
          View Profile
        </Link>
        {/* </div> */}
        {/*  <div className="col-md-6">
          <Link
            href="/candidate-profile-v1"
            className="msg-btn tran3s w-100 mt-5"
          >
            Message
          </Link>
        </div> */}
      </div>
      {/* <p className="text-center mb-auto">{item.location}</p> */}
      {/* <div className="bottom-line d-flex"> */}
      {/* <Link href="/company-details">{item.vacancy} Vacancy</Link>
        <Link href="/company-details">
          <i className="bi bi-bookmark-dash"></i> Save
        </Link> */}
      {/* </div> */}
    </div>
  );
};

export default CompanyGridItem;

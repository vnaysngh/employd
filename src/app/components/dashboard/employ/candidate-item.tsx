import React from "react";
import avatar from "@/assets/dashboard/images/icon/user.png";
import Image from "next/image";
import { statusConfig } from "@/context";
import { useRouter } from "next/navigation";

const CandidateItem = ({ item }: { item: any }) => {
  const status =
    statusConfig[item.attestationStatus as keyof typeof statusConfig];

  const router = useRouter();

  const handleNavigateAttestation = () => {
    router.push(`/attestation/${item.id}`);
  };

  return (
    <div
      className="candidate-profile-card list-layout mb-25 cursor-pointer"
      onClick={handleNavigateAttestation}
    >
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          <a href="#" className="rounded-circle">
            <Image
              src={avatar}
              alt="image"
              className="lazy-img rounded-circle"
              style={{ height: "auto" }}
            />
          </a>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <a href="#" className="tran3s">
                    {item?.seekerName}
                  </a>
                </h4>
                <div className="candidate-post">{item?.role}</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Duration</span>
                <div>
                  {item.startMonth}/{item.startYear} - {item.endMonth}/
                  {item.endYear}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Employment Type</span>
                <div>{item.employmentType}</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Status</span>
                <div className={`attestation-status ${status.class}`}>
                  {status?.text}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`candidate-description style-none d-flex align-items-center mt-10`}
          >
            {item.description || ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateItem;

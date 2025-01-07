"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import nav_1 from "@/assets/dashboard/images/icon/icon_48.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
// import nav_4 from "@/assets/dashboard/images/icon/icon_47.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_41.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_45.svg";
// import nav_6 from "@/assets/dashboard/images/icon/icon_46.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_49.svg";
import { Inter, Titan_One } from "next/font/google";
import avatar from "@/assets/dashboard/images/icon/user.png";
import logo from "@/assets/images/assets/letter-stamp.png";
import { contract, useStateContext } from "@/context";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const inter = Inter({ weight: "700", subsets: ["latin"] });

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/employ-dashboard/attestation",
    title: "Attestation"
  },
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/employ-dashboard/profile",
    title: "My Profile"
  },
  {
    id: 4,
    icon: nav_3,
    icon_active: nav_3,
    link: "/dashboard/employ-dashboard/submit-job",
    title: "Submit Job"
  }
  /*   {
    id: 3,
    icon: nav_4,
    icon_active: nav_4,
    link: "/dashboard/employ-dashboard/jobs",
    title: "My Jobs"
  },
 ,
  {
    id: 5,
    icon: nav_6,
    icon_active: nav_6,
    link: "/dashboard/employ-dashboard/saved-candidate",
    title: "People"
  }, */
  /*   {
    id: 6,
    icon: nav_5,
    icon_active: nav_5,
    link: "/dashboard/employ-dashboard/invite",
    title: "Invite"
  } */
];

const nav_data_2: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_7,
    icon_active: nav_7,
    link: "/candidates",
    title: "Candidates"
  },
  {
    id: 2,
    icon: nav_1,
    icon_active: nav_1,
    link: "/companies",
    title: "Companies"
  }
];

// props type
type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const pathname = usePathname();
  const { isUserRegistered } = useStateContext();
  const account = useActiveAccount();

  const { data: attestations, isPending } = useReadContract({
    contract,
    method:
      "function getEmployerExperiences(address employer) view returns ((uint32 id, address owner, string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, address seekerAddress, uint8 attestationStatus, uint8 employerStatus, string employerEmail)[])",
    params: [account?.address!]
  });

  console.log(attestations, "attestations");
  const isPendingAttestation =
    attestations && attestations.length
      ? attestations.some((attestation) => attestation.attestationStatus === 1)
      : [];

  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="sidebar-inner">
            {/* Logo Section */}
            <div className="sidebar-logo d-md-block d-flex align-items-center justify-content-between">
              <Link href="/auth" className="d-flex align-items-center">
                <Image src={logo} alt="logo" priority height={36} width={36} />
                <div className={`logo-name ${inter.className}`}>Employd</div>
              </Link>
              <button
                onClick={() => setIsOpenSidebar(false)}
                className="close-btn d-block d-md-none"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* User Profile Section */}
            <div className="user-profile">
              <div className="user-avatar-wrapper">
                <Image
                  src={
                    isUserRegistered?.image ||
                    isUserRegistered?.user_login_details?.details?.picture ||
                    avatar
                  }
                  alt="avatar"
                  className="user-avatar"
                  width={64}
                  height={64}
                />
              </div>
              <div className="user-info">
                <Link
                  href={`/${isUserRegistered?.ens_name}.employd.eth`}
                  className="on-hover-underline"
                >
                  <button className="user-name">
                    {isUserRegistered?.ens_name}.employd.eth
                  </button>
                </Link>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="sidebar-nav">
              <nav className="dashboard-main-nav">
                <ul className="style-none">
                  {nav_data.map((m) => {
                    const isActive = pathname === m.link;
                    return (
                      <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                        <Link
                          href={m.link}
                          className={`d-flex w-100 align-items-center ${
                            isActive ? "active" : ""
                          }`}
                        >
                          {/* <Image
                            src={isActive ? m.icon_active : m.icon}
                            alt="icon"
                            height={20}
                            width={20}
                            className="lazy-img"
                          /> */}

                          <span>
                            {m.title}{" "}
                            {isPendingAttestation &&
                              m.title === "Attestation" && (
                                <span style={{ color: "red" }}>&#x2022;</span>
                              )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <nav className="dashboard-main-nav mt-20">
              <ul className="style-none">
                {nav_data_2.map((m) => {
                  const isActive = pathname === m.link;
                  return (
                    <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                      <Link
                        href={m.link}
                        className={`d-flex w-100 align-items-center ${
                          isActive ? "active" : ""
                        }`}
                        target="_blank"
                      >
                        {/* <Image
                          src={isActive ? m.icon_active : m.icon}
                          alt="icon"
                          height={20}
                          width={20}
                          className="lazy-img"
                        /> */}
                        <span>{m.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          {/*           <div className="profile-complete-status">
            <div className="progress-value fw-500">87%</div>
            <div className="progress-line position-relative">
              <div className="inner-line" style={{ width: "80%" }}></div>
            </div>
            <p>Profile Complete</p>
          </div>

          <a href="#" className="d-flex w-100 align-items-center logout-btn">
            <Image src={logout} alt="icon" className="lazy-img" />
            <span>Logout</span>
          </a> */}
        </div>
      </aside>
    </>
  );
};

export default EmployAside;

"use client";
// import "bootstrap/js/dist/collapse";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import avatar from "@/assets/dashboard/images/avatar_03.jpg";
import { Chango } from "next/font/google";
import { useStateContext } from "@/context";

const chango = Chango({ weight: "400", subsets: ["latin"] });

// nav data
export const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  /*   {
    id: 1,
    icon: nav_1,
    icon_active: nav_1,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard"
  }, */
  {
    id: 1,
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Resume"
  },
  /*   {
    id: 2,
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/candidate-dashboard/experience",
    title: "Resume"
  }, */
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3,
    link: "/dashboard/candidate-dashboard/experience",
    title: "Add Experience"
  },
  {
    id: 4,
    icon: nav_4,
    icon_active: nav_4,
    link: "/dashboard/candidate-dashboard/messages",
    title: "Messages"
  }
];
// props type
type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const pathname = usePathname();
  const { isUserRegistered } = useStateContext();
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="sidebar-inner">
            {/* Logo Section */}
            <div className="sidebar-logo d-md-block d-flex align-items-center justify-content-between">
              <Link href="/" className="d-flex align-items-center">
                <div className={`logo-name ${chango.className} m-auto`}>
                  EMPLOYD
                </div>
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
                  src={avatar}
                  alt="avatar"
                  className="user-avatar"
                  style={{ height: "auto" }}
                />
                <span className="online-indicator"></span>
              </div>
              <div className="user-info">
                <button className="user-name">
                  {isUserRegistered?.ens_name}.employd.eth
                </button>
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
                          <Image
                            src={isActive ? m.icon_active : m.icon}
                            alt="icon"
                            height={20}
                            width={20}
                            className="lazy-img"
                          />
                          <span>{m.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          {/*   <a href="#" className="d-flex w-100 align-items-center logout-btn">
            <Image src={logout} alt="icon" className="lazy-img" />
            <span>Logout</span>
          </a> */}
        </div>
      </aside>
      {/* LogoutModal star */}
      {/* <LogoutModal/> */}
      {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;

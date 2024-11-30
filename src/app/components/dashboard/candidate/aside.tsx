"use client";
import "bootstrap/js/dist/collapse";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";

import { Chango } from "next/font/google";

const chango = Chango({ weight: "400", subsets: ["latin"] });

// nav data
export const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard"
  },
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Profile"
  },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3,
    link: "/dashboard/candidate-dashboard/resume",
    title: "Resume"
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
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
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
          <div className="user-data">
            {/*             <div className="user-avatar online position-relative rounded-circle">
              <Image
                src={avatar}
                alt="avatar"
                className="lazy-img"
                style={{ height: "auto" }}
              />
            </div> */}
            <div className="user-name-data">
              <button className="user-name">vinaysingh.employd.eth</button>
            </div>
          </div>
          <nav className="dasboard-main-nav">
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

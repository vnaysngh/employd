"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_41.svg";
import { Chango } from "next/font/google";
import { useStateContext } from "@/context";

const chango = Chango({ weight: "400", subsets: ["latin"] });

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  /*  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1,
    link: "/dashboard/employ-dashboard",
    title: "Dashboard"
  }, */
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/employ-dashboard/profile",
    title: "My Profile"
  },
  // {
  //   id: 3,
  //   icon: nav_3,
  //   icon_active: nav_3,
  //   link: "/dashboard/employ-dashboard/jobs",
  //   title: "My Jobs"
  // },
  {
    id: 4,
    icon: nav_4,
    icon_active: nav_4,
    link: "/dashboard/employ-dashboard/messages",
    title: "Messages"
  },
  {
    id: 5,
    icon: nav_5,
    icon_active: nav_5,
    link: "/dashboard/employ-dashboard/invite",
    title: "Invite"
  }
];
// props type
type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
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
            {/*  <div className="user-avatar online position-relative rounded-circle">
               <Image
                src={avatar}
                alt="avatar"
                className="lazy-img"
                style={{ height: "auto" }}
              />
            </div> */}
            <div className="user-name-data">
              <button className="user-name">
                {/* {isUserRegistered.ens_name}.employd.eth */}
              </button>
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
                        alt=""
                        className="lazy-img"
                      />
                      <span>{m.title}</span>
                    </Link>
                  </li>
                );
              })}
              {/*  <li>
                <a
                  href="#"
                  className="d-flex w-100 align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <Image src={nav_8} alt="icon" className="lazy-img" />
                  <span>Delete Account</span>
                </a>
              </li> */}
            </ul>
          </nav>
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

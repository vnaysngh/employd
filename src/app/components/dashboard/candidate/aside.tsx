"use client";
// import "bootstrap/js/dist/collapse";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import nav_1 from "@/assets/dashboard/images/icon/icon_48.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_44.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_49.svg";
import avatar from "@/assets/dashboard/images/icon/user.png";
import { Chango } from "next/font/google";
import logo from "@/assets/dashboard/images/icon/logo.png";
import { useStateContext } from "@/context";
import supabase from "@/supabase";
import { useActiveAccount } from "thirdweb/react";

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
    icon: nav_2,
    icon_active: nav_2,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Profile"
  },
  {
    id: 2,
    icon: nav_3,
    icon_active: nav_3,
    link: "/dashboard/candidate-dashboard/resume",
    title: "My Resume"
  },
  {
    id: 3,
    icon: nav_5,
    icon_active: nav_5,
    link: "/dashboard/candidate-dashboard/experience",
    title: "Add Experience"
  }
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

const CandidateAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const account = useActiveAccount();
  const pathname = usePathname();
  const [isUserRegistered, setIsUserRegistered] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfRegisteredUser = async () => {
      setLoading(true);
      try {
        let { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("address", account?.address);

        if (error) console.error(error);
        else {
          if (data && data.length) {
            setIsUserRegistered(data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch names:", error);
      } finally {
        setLoading(false);
      }
    };

    if (account?.address) checkIfRegisteredUser();
  }, [account?.address]);

  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="sidebar-inner">
            {/* Logo Section */}
            <div className="sidebar-logo d-md-block d-flex align-items-center justify-content-between">
              <Link href="/" className="d-flex align-items-center">
                <div
                  className={`logo-name d-flex align-items-center ${chango.className} m-auto`}
                >
                  EMPL <Image src={logo} height={24} width={24} alt="logo" /> YD
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
                  src={isUserRegistered?.image || avatar}
                  alt="avatar"
                  className="user-avatar"
                  width={64}
                  height={64}
                />
                {/* <span className="online-indicator"></span> */}
              </div>
              {isUserRegistered ? (
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
              ) : null}
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

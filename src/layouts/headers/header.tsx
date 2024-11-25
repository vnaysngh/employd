"use client";
import React from "react";
import Link from "next/link";
import useSticky from "@/hooks/use-sticky";
import { WalletComponents } from "./component/wallet";
import { nav_data } from "@/app/components/dashboard/candidate/aside";
import { usePathname } from "next/navigation";
import { Chango, Dela_Gothic_One } from "next/font/google";
import { useActiveAccount } from "thirdweb/react";
const chango = Chango({ weight: "400", subsets: ["latin"] });
const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const { sticky } = useSticky();
  const account = useActiveAccount();
  const pathname = usePathname();

  return (
    <>
      <header
        className={`theme-main-menu bg-white menu-overlay menu-style-one sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <div className={`logo-name ${chango.className}`}>EMPLOYD</div>
                </Link>
              </div>
              {account?.address && (
                <div className="right-widget ms-auto order-lg-3">
                  <ul className="d-flex align-items-center style-none header-list ul-header-list">
                    {/* {nav_data.map((m) => {
                      const isActive = pathname === m.link;
                      return (
                        <li key={m.id}>
                          <Link
                            href={m.link}
                            className={`${
                              dela.className
                            } d-flex w-100 align-items-center ${
                              isActive ? "active" : ""
                            }`}
                          >
                            <span>{m.title}</span>
                          </Link>
                        </li>
                      );
                    })} */}
                    <li>
                      <WalletComponents />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

"use client";
import React from "react";
import Link from "next/link";
import useSticky from "@/hooks/use-sticky";
import { WalletComponents } from "./component/wallet";
import { nav_data } from "@/app/components/dashboard/candidate/aside";
import { usePathname } from "next/navigation";
import { Chango } from "next/font/google";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
const chango = Chango({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const { sticky } = useSticky();
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
              <div className="right-widget ms-auto order-lg-3">
                <ul className="d-flex align-items-center style-none header-list ul-header-list">
                  {/*    {account?.address && (
                    <>
                      {nav_data.map((m) => {
                        const isActive = pathname === m.link;
                        return (
                          <li key={m.id}>
                            <Link
                              href={m.link}
                              className={`d-flex w-100 align-items-center ${
                                isActive ? "active" : ""
                              }`}
                            >
                              <span>{m.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </>
                  )} */}
                  <li>
                    <ConnectButton
                      client={client}
                      detailsButton={{
                        className: "tw-connected-details",
                        style: { fontSize: "16px" }
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

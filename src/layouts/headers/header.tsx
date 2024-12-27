"use client";
import React from "react";
import Link from "next/link";
import useSticky from "@/hooks/use-sticky";
import { WalletComponents } from "./component/wallet";
import { nav_data } from "@/app/components/dashboard/candidate/aside";
import { usePathname, useRouter } from "next/navigation";
import { Chango } from "next/font/google";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
import { baseSepolia } from "thirdweb/chains";

const chango = Chango({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const { sticky } = useSticky();
  const router = useRouter();

  return (
    <>
      <header
        className={`theme-main-menu bg-white menu-overlay menu-style-one sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
        <div className="inner-content position-relative w-100">
          <div className="top-header w-100">
            <div className="d-flex align-items-center">
              <div
                className="logo order-lg-0"
                style={{ background: "#8570e4" }}
              >
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
                  <li className="me-0">
                    <ConnectButton
                      client={client}
                      detailsButton={{
                        className: "tw-connected-details",
                        style: { fontSize: "16px" }
                      }}
                      accountAbstraction={{
                        chain: baseSepolia, // the chain where your smart accounts will be or is deployed
                        sponsorGas: true // enable or disable sponsored transactions
                      }}
                      theme="light"
                      onDisconnect={() => {
                        router.push("/");
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

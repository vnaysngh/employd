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
  const account = useActiveAccount();
  return (
    <>
      <header
        className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
        <div className="inner-content position-relative w-100">
          <div className="top-header w-100">
            <div className="d-flex align-items-center">
              <div
                className="logo order-lg-0"
                style={{ background: "#4d80e6" }}
              >
                <Link href="/" className="d-flex align-items-center">
                  <div className={`logo-name ${chango.className}`}>EMPLOYD</div>
                </Link>
              </div>
              <div className="right-widget ms-auto order-lg-3">
                <ul className="d-flex align-items-center style-none header-list ul-header-list">
                  <li className="">
                    <Link href="/jobs" className="me-2 tran3s">
                      Jobs
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/companies" className="me-2 tran3s">
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link href="/candidates" className="me-2">
                      Candidates
                    </Link>
                  </li>
                  {account?.address ? (
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
                  ) : null}
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

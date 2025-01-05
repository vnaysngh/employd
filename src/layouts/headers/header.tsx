"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/assets/letter-stamp.png";
import useSticky from "@/hooks/use-sticky";
import { Titan_One } from "next/font/google";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
import { baseSepolia } from "thirdweb/chains";
import { useRouter } from "next/navigation";

const titan = Titan_One({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const router = useRouter();
  const account = useActiveAccount();
  return (
    <>
      <header className={`theme-main-menu sticky-menu`}>
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo order-lg-0">
                <Link href="/auth" className="d-flex align-items-center">
                  <Image
                    src={logo}
                    alt="logo"
                    priority
                    height={40}
                    width={40}
                  />
                  <div className={`logo-name ${titan.className}`}>EMPLOYD</div>
                </Link>
              </div>

              {account?.address ? (
                <div className="right-widget ms-auto ms-xl-5 order-lg-3">
                  <ul className="d-flex align-items-center style-none">
                    <li className="d-lg-block ms-4">
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
                          router.push("/auth");
                        }}
                      />
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="right-widget ms-auto ms-xl-5 order-lg-3">
                  <ul className="d-flex align-items-center style-none">
                    <li className="d-lg-block ms-4">
                      <Link href="/auth" className="btn-five">
                        Launch App
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <nav className="navbar navbar-expand-lg p0  ms-3 ms-lg-auto order-lg-2">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          {/* <Image src={logo} alt="logo" width="100"priority style={{height:'auto'}} /> */}
                        </Link>
                      </div>
                    </li>
                    {/* <li className="nav-item">
                      <Link href="/jobs" className="nav-link">
                        Jobs
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link href="/companies" className="nav-link">
                        Companies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/candidates" className="nav-link">
                        Candidates
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* login modal start */}
      {/* <LoginModal/> */}
      {/* login modal end */}
    </>
  );
};

export default Header;

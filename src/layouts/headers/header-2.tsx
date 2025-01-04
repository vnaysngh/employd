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

const HeaderTwo = () => {
  const { sticky } = useSticky();
  const account = useActiveAccount();
  const router = useRouter();
  return (
    <>
      <header
        className={`theme-main-menu sticky-menu ${sticky ? "fixed" : ""}`}
      >
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

              {/* <div className="right-widget ms-auto ms-xl-5 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  <li className="d-none d-lg-block ms-4">
                    <Link href="/auth" className="btn-five">
                      Launch App
                    </Link>
                  </li>
                </ul>
              </div> */}
              <nav className="navbar navbar-expand-lg p0  ms-3 ms-lg-auto order-lg-2">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
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
                            router.push("/auth");
                          }}
                        />
                      </li>
                    ) : null}
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

export default HeaderTwo;

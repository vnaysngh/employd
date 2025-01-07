"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/assets/letter-stamp.png";
import useSticky from "@/hooks/use-sticky";
import { Inter, Titan_One } from "next/font/google";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
import { baseSepolia } from "thirdweb/chains";
import { useRouter } from "next/navigation";

const inter = Inter({ weight: "700", subsets: ["latin"] });

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
                    height={36}
                    width={36}
                  />
                  <div className={`logo-name ${inter.className}`}>Employd</div>
                </Link>
              </div>

              <div className="right-widget ms-auto ms-xl-5 order-lg-3">
                <ul className="d-flex align-items-center style-none">
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

"use client";
import React from "react";
import Link from "next/link";
// import LoginModal from "@/app/components/common/popup/login-modal";
import useSticky from "@/hooks/use-sticky";
import { useAccount } from "wagmi";
import { WalletComponents } from "./component/wallet";
import { usePathname } from "next/navigation";
import { Chango } from "next/font/google";
const chango = Chango({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const { sticky } = useSticky();
  const { address } = useAccount();
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
              {address && (
                <div className="right-widget ms-auto order-lg-3">
                  <ul className="d-flex align-items-center style-none header-list ul-header-list">
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

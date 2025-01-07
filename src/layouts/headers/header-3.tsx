"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/assets/letter-stamp.png";
import useSticky from "@/hooks/use-sticky";
import { Titan_One } from "next/font/google";
import LoginModal from "@/app/components/common/popup/login-modal";

const titan = Titan_One({ weight: "400", subsets: ["latin"] });

const HeaderThree = () => {
  const { sticky } = useSticky();
  return (
    <>
      <header
        className={`theme-main-menu sticky-menu ${sticky ? "fixed" : ""}`}
      >
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
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

              <div className="right-widget ms-auto ms-xl-5 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  {/* <li className="d-lg-block ms-4">
                    <Link href="/auth" className="btn-five">
                      Launch App
                    </Link>
                  </li> */}
                  <li>
                    <a
                      href="#"
                      className="btn-five"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Login
                    </a>
                  </li>
                </ul>
              </div>
              <nav className="navbar navbar-expand-lg p0  ms-3 ms-lg-auto order-lg-2">
                {/*  <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button> */}
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          {/* <Image src={logo} alt="logo" width="100"priority style={{height:'auto'}} /> */}
                        </Link>
                      </div>
                    </li>
                    {/*  <li className="nav-item">
                      <Link href="/jobs" className="nav-link">
                        Jobs
                      </Link>
                    </li> */}
                    <li className="nav-item dropdown">
                      <Link href="/companies" className="nav-link">
                        Companies
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
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

      <LoginModal />
    </>
  );
};

export default HeaderThree;

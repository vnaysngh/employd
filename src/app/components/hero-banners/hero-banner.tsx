import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import main_img from "@/assets/images/assets/ils_01.svg";
import shape from "@/assets/images/assets/ils_01_02.svg";
import tree_img from "@/assets/images/assets/ils_01_01.svg";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

const HeroBannerThree = () => {
  return (
    <div className="hero-banner-three position-relative pt-80 md-pt-80 xs-pt-40 pb-80 lg-pb-20">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-12 text-center">
              <div className="banner-header">
                <h1
                  className={`wow fadeInUp ${poppins.className}`}
                  data-wow-delay="0.4s"
                >
                  Verified by Blockchain. Trusted by Networks.
                </h1>
                <p
                  className="header-description mt-35 md-mt-30 mb-30 md-mb-20 pe-xl-5 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  Build a Web3-powered professional identity with verified
                  experiences and skills, all on-chain.
                </p>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                  <Link
                    href="/auth"
                    className="btn-five wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    Launch App
                  </Link>
                  <Link
                    href="https://x.com/employd_xyz"
                    className="btn-outline wow fadeInUp"
                    data-wow-delay="0.6s"
                    target="_blank"
                  >
                    Learn more
                  </Link>
                </div>
                {/* <div
                className="d-flex flex-wrap align-items-center mt-70 lg-mt-50 md-mt-40 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div className="partner-title">Trusted by:</div>
                <Image
                  src={media_1}
                  alt="media-img"
                  className="lazy-img ms-2 me-4"
                />
                <Image
                  src={media_2}
                  alt="media-img"
                  className="lazy-img me-4"
                />
                <Image src={media_3} alt="media-img" className="lazy-img" />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerThree;

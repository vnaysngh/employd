"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CandidateProfileSlider from "./candidate-profile-slider";
import avatar from "@/assets/images/candidates/img_01.jpg";
import Skills from "./skills";
import WorkExperience from "./work-experience";
import CandidateBio from "./bio";
import { useParams } from "next/navigation";
import { useStateContext } from "@/context";

/* const candidate = {
  name: "Vinay Singh",
  title: "Frontend Engineer",
  bio: "Passionate frontend engineer with expertise in building modern web applications and blockchain solutions.",
  wallet: "0x758D...5CB2",
  email: "schilled.xyz@gmail.com",
  experience: [
    {
      company: "Mudrexx",
      role: "Frontend Engineer",
      period: "Dec 2019 - Sep 2024",
      description:
        "Built algos and coinsets. Led frontend development initiatives and implemented blockchain solutions."
    }
  ],
  skills: [
    "React",
    "JavaScript",
    "TypeScript",
    "Web3",
    "Smart Contracts",
    "CSS3",
    "HTML5"
  ],
  portfolio: [
    {
      title: "DeFi Dashboard",
      description: "A comprehensive dashboard for DeFi portfolio management"
    },
    {
      title: "NFT Marketplace",
      description: "Digital marketplace for crypto collectibles and NFTs"
    }
  ]
}; */

const CandidateDetailsArea = () => {
  const params: { ens_name: string } = useParams();
  const { getUserDetailsByEns } = useStateContext();
  const [error, setError] = useState(false);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const ensRegex = /^([\w-]+)\.employd\.eth$/;

  const match = useMemo(
    () => params.ens_name.match(ensRegex),
    [params.ens_name]
  );

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await getUserDetailsByEns(match?.[1]);
      if (response) {
        setUser(response);
      } else {
        console.error(response);
        setError(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!match) return;
    getUserDetails();
  }, [match]);

  if (!match) return <h3 className="">User does not exist</h3>;

  if (loading) return <h3>Loading</h3>;

  if (!user && !loading) return <h3>User not found</h3>;

  return (
    <>
      {user?.user_type === "talent" ? (
        <section className="candidates-profile pt-150 pb-150 lg-pb-80">
          <WorkExperience user={user} />
        </section>
      ) : (
        <section className="company-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
          <div className="container">
            <div className="row">
              <div className="col-xxl-3 col-xl-4 order-xl-last">
                <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
                  <Image
                    src={avatar}
                    alt="logo"
                    className="lazy-img m-auto logo"
                  />
                  <div className="text-md text-dark text-center mt-15 mb-20 lg-mb-10">
                    Adobe Inc.
                  </div>
                  <div className="text-center">
                    <a
                      href="#"
                      className="website-btn-two tran3s"
                      target="_blank"
                    >
                      Visit our website
                    </a>
                  </div>

                  <div className="border-top mt-35 lg-mt-20 pt-25">
                    <ul className="job-meta-data row style-none">
                      <li className="col-12">
                        <span>Location: </span>
                        <div>Spain, Barcelona </div>
                      </li>
                      <li className="col-12">
                        <span>Size:</span>
                        <div>7000-8000, Worldwide</div>
                      </li>
                      <li className="col-12">
                        <span>Email: </span>
                        <div>
                          <a href="#">company@inquery.com</a>
                        </div>
                      </li>
                      <li className="col-12">
                        <span>Founded: </span>
                        <div>13 Jan, 1997</div>
                      </li>
                      <li className="col-12">
                        <span>Phone:</span>
                        <div>
                          <a href="#">(990) 234 112 779,</a>{" "}
                          <a href="#">+770 723801870</a>
                        </div>
                      </li>
                      <li className="col-12">
                        <span>Category: </span>
                        <div>Technology, Product, Agency</div>
                      </li>
                      <li className="col-12">
                        <span>Social: </span>
                        <div>
                          <a href="#" className="me-3">
                            <i className="bi bi-instagram"></i>
                          </a>
                          <a href="#" className="me-3">
                            <i className="bi bi-twitter"></i>
                          </a>
                          <a href="#">
                            <i className="bi bi-linkedin"></i>
                          </a>
                        </div>
                      </li>
                    </ul>

                    <a
                      href="#"
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-25"
                    >
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xxl-9 col-xl-8 order-xl-first">
                <div className="details-post-data me-xxl-5 pe-xxl-4">
                  <h3>Overview</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Mauris vitae ultricies leo integer malesuada nunc
                    vel risus commodo. Vulputate odio ut enim blandit. Nibh
                    ipsum consequat nisl vel pretium lectus quam.
                  </p>
                  <p>
                    {" "}
                    Nulla at volutpat diam ut. Lobortis feugiat vivamus at augue
                    eget arcu. Urna condimentum mattis pellentesque id nibh
                    tortor id aliquet. Dignissim cras tincidunt lobortis
                    feugiat. Est sit amet facilisis magna etiam tempor. Eu augue
                    ut lectus arcu bibendum at varius vel pharetra. Vel
                    facilisis volutpat est velit egestas dui id. Ut pharetra sit
                    amet aliquam. Elit at imperdiet dui accumsan sit amet nulla
                    facilisi morbi. Tellus in metus vulputate eu scelerisque
                    felis imperdiet proin. Magna fringilla urna porttitor
                    rhoncus. Et odio pellentesque diam volutpat. Congue eu
                    consequat ac felis donec et odio pellentesque diam. Accumsan
                    in nisl nisi scelerisque eu ultrices vitae auctor eu.{" "}
                  </p>
                  <p>
                    Felis eget velit aliquet sagittis id. Massa placerat duis
                    ultricies lacus sed turpis tincidunt id. Vel eros donec ac
                    odio tempor orci dapibus ultrices. Ipsum consequat nisl vel
                    pretium lectus quam. Dignissim sodales ut eu sem.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CandidateDetailsArea;

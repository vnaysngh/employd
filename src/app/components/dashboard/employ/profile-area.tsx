"use client";
import React from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import icon from "@/assets/dashboard/images/icon/icon_16.svg";
import DashboardHeader from "../candidate/dashboard-header";
import { Lexend } from "next/font/google";
const lexend_500 = Lexend({ weight: "500", subsets: ["latin"] });

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployProfileArea = ({ setIsOpenSidebar }: IProps) => {
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className={`main-title mb-20 ${lexend_500.className}`}>Profile</h2>

        <div className="card-box card-box-employer border-20">
          {/* <div className="user-avatar-setting d-flex align-items-center mb-30">
            <Image src={avatar} alt="avatar" className="lazy-img user-img" />
            <div className="upload-btn position-relative tran3s ms-4 me-3">
              Upload new photo
              <input
                type="file"
                id="uploadImg"
                name="uploadImg"
                placeholder=""
              />
            </div>
            <button className="delete-btn tran3s">Delete</button>
          </div> */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Employer Name*</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Email*</label>
                <input type="email" placeholder="companyinc@gmail.com" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Website*</label>
                <input type="text" placeholder="http://somename.come" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Founded Date*</label>
                <input type="date" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Size*</label>
                <input type="text" placeholder="700" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Phone Number*</label>
                <input type="tel" placeholder="+880 01723801729" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Category*</label>
                <input type="text" placeholder="Account, Finance, Marketing" />
              </div>
            </div>
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">About Company*</label>
            <textarea className="size-lg" placeholder=""></textarea>
            {/*  <div className="alert-text">
              Brief description for your company. URLs are hyperlinked.
            </div> */}
          </div>
        </div>

        <div className="card-box card-box-employer border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Twitter</label>
            <input type="text" placeholder="https://twitter.com/" />
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">LinkedIn</label>
            <input type="text" placeholder="https://linkedin.com/" />
          </div>
          {/*  <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </a> */}
        </div>
        <div className="button-group d-inline-flex align-items-center mt-30">
          <a href="#" className="dash-btn-two tran3s me-3">
            Save
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmployProfileArea;

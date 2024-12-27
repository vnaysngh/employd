"use client";
import React, { useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Lexend } from "next/font/google";
import { useStateContext } from "@/context";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployerInvite = ({ setIsOpenSidebar }: IProps) => {
  const [copied, setCopied] = useState(false);
  const [emailList, setEmailList] = useState<any>([]);
  const [email, setEmail] = useState("");
  const { isUserRegistered } = useStateContext();

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleAddEmail = () => {
    if (email.trim() !== "" && !emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail("");
    }
  };

  const handleSendInvites = () => {
    if (email) {
      alert(`Invites sent to: ${emailList.join(", ")}`);
      setEmailList([]); // Clear the email list after sending
    } else {
      alert("No emails to send invites to!");
    }
  };

  return (
    <div className="dashboard-body invite-section">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className={`main-title mb-20`}>
          Invite Employees to Join the Platform
        </h2>

        <div className="card-box card-box-employer border-20">
          <div className="subtitle">Share Invite Link</div>
          <div className="invite-link-container">
            <div className="invite-link">
              {`https://employd.xyz/invite?company=${isUserRegistered?.ens_name}`}
            </div>
            <CopyToClipboard
              text={`https://employd.xyz/invite?company=${isUserRegistered?.ens_name}`}
              onCopy={handleCopyLink}
            >
              <button className="copy-btn d-flex align-items-center">
                Copy Link
                {copied && <i className="bi bi-check-lg"></i>}
              </button>
            </CopyToClipboard>
          </div>
        </div>

        {/* <div className="card-box card-box-employer border-20 mt-40">
          <div className="subtitle">Send Invite via Email</div>
          <div className="invite-link-container row align-items-center">
            <div className="col-lg-6">
              <input
                type="email"
                placeholder="Enter employee email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <button onClick={handleCopyLink} className="copy-btn">
                Send Invite
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EmployerInvite;

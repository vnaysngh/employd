"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
// notification item
function NotificationItem({
  icon,
  main,
  time,
  isUnread
}: {
  icon: StaticImageData;
  main: string;
  time: string;
  isUnread: boolean;
}) {
  return (
    <li className={`d-flex align-items-center ${isUnread ? "unread" : ""}`}>
      <Image src={icon} alt="icon" className="lazy-img icon" />
      <div className="flex-fill ps-2">
        <h6>You have {main} new mails</h6>
        <span className="time">{time} hours ago</span>
      </div>
    </li>
  );
}
// props type
type IProps = {
  setIsOpenSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardHeader = ({ setIsOpenSidebar }: IProps) => {
  // handle click to open
  const handleOpen = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(true);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="d-flex align-items-center justify-content-end">
        <button
          onClick={handleOpen}
          className="dash-mobile-nav-toggler d-block d-md-none me-auto"
        >
          <span></span>
        </button>
        <div className=" ms-2 ms-md-5 me-4">
          <form action="#" className="search-form">
            <input type="text" placeholder="Search here.." />
          </form>
        </div>
        <div className="ms-2">
          <ConnectButton
            client={client}
            detailsButton={{
              className: "tw-connected-details",
              style: { fontSize: "16px" }
            }}
            autoConnect
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

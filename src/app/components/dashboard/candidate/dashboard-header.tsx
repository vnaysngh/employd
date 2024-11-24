"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import notifi from "@/assets/dashboard/images/icon/icon_11.svg";
import notify_icon_1 from "@/assets/dashboard/images/icon/icon_36.svg";
import notify_icon_2 from "@/assets/dashboard/images/icon/icon_37.svg";
import notify_icon_3 from "@/assets/dashboard/images/icon/icon_38.svg";
import search from "@/assets/dashboard/images/icon/icon_10.svg";
import { WalletComponents } from "@/layouts/headers/component/wallet";
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

        <div>
          <WalletComponents />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

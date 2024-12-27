"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
import SelectUser from "./select-user";
import { useStateContext } from "@/context";
import { useRouter } from "next/navigation";
import { baseSepolia } from "thirdweb/chains";
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

  const { users } = useStateContext();
  const router = useRouter();

  const userOptions =
    users && users.length
      ? users.map((user: any) => ({
          label: user.user_type === "talent" ? user.name : user.company_name,
          value: user.ens_name
        }))
      : [];

  return (
    <header className="dashboard-header">
      <div className="d-flex align-items-center justify-content-end">
        <button
          onClick={handleOpen}
          className="dash-mobile-nav-toggler d-block d-md-none me-auto"
        >
          <span></span>
        </button>
        <div className="search-form ms-2 ms-md-5 me-4">
          <SelectUser
            onChange={(value) => {
              router.push(`/${value.value}.employd.eth`);
            }}
            options={userOptions}
          />
        </div>
        <div className="ms-2">
          <ConnectButton
            client={client}
            detailsButton={{
              className: "tw-connected-details",
              style: { fontSize: "16px" }
            }}
            autoConnect
            accountAbstraction={{
              chain: baseSepolia, // the chain where your smart accounts will be or is deployed
              sponsorGas: true // enable or disable sponsored transactions
            }}
            theme="light"
            onDisconnect={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

import React from "react";
import Image from "next/image";
import icon from "@/assets/dashboard/images/icon/icon_28.svg";
import { Dela_Gothic_One, Josefin_Sans } from "next/font/google";
const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"] });

const EmailReadPanel = ({
  requests,
  selected,
  handleChatSelect
}: {
  requests: any[];
  selected: any;
  handleChatSelect: (item: object) => void;
}) => {
  return requests.map((messageItem) => {
    return (
      <div
        className="email-read-panel"
        onClick={() => handleChatSelect(messageItem)}
        key={messageItem.chatId}
      >
        <div
          className={`email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4 ${
            messageItem?.chatId === selected?.chatId && "selected"
          }`}
        >
          <div className="email-short-preview position-relative">
            <div className="d-flex align-items-center justify-content-between">
              <div className="sender-name">vinaysingh.employed.eth</div>
              <div className="date">Aug 22</div>
            </div>
            <div className={`mail-sub ${dela.className}`}>
              Attestation Request
            </div>
            <div className="mail-text">
              Hello, I hope you’re doing well. I’m reaching out to kindly
              request...
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default EmailReadPanel;

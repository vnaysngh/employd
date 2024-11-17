import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon_5 from "@/assets/dashboard/images/icon/icon_26.svg";
import icon_6 from "@/assets/dashboard/images/icon/icon_27.svg";
import icon_8 from "@/assets/dashboard/images/icon/icon_29.svg";
import icon_9 from "@/assets/dashboard/images/icon/icon_30.svg";
import EmailReadPanel from "./email-read-panel";
import { Dela_Gothic_One, Lexend } from "next/font/google";
import { useStateContext } from "@/context";
import formatTimestamp from "@/utils/formatTimeStamp";

const lexend = Lexend({ weight: "400", subsets: ["latin"] });
const lexend_700 = Lexend({ weight: "700", subsets: ["latin"] });
const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"] });

const DashboardMessage = () => {
  const { signer, initializePushAPI, pushUser } = useStateContext();
  const [chats, setChats] = useState<any[]>([]);
  const [messageRequests, setMessageRequests] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>();

  useEffect(() => {
    if (signer) {
      initializePushAPI();
    }
  }, [signer]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await pushUser.chat.list("CHATS");
        setChats(chats);
      } catch (err) {
        console.log(err);
      }

      try {
        const requests = await pushUser.chat.list("REQUESTS", { limit: 10 });
        setMessageRequests(requests);
        if (requests.length) setSelectedChat(requests[0]);
      } catch (err) {
        console.log(err);
      }
    };

    if (pushUser) fetchChats();
  }, [pushUser]);

  const handleChatSelect = (message: any) => {
    setSelectedChat(message);
  };

  if (!chats.length && !messageRequests.length) return <div>No Messages</div>;

  return (
    <div className={`dashboard-body ${lexend.className} `}>
      <div className="position-relative">
        <div className="row gx-0 align-items-center">
          <div className="col-lg-4">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className={` main-title m0 ${dela.className}`}>Messages</h2>
            </div>
          </div>
        </div>

        <div className="bg-white card-box p0 mt-30">
          <div className="message-wrapper">
            <div className="row gx-0">
              <div className="col-lg-4">
                <div className="message-sidebar">
                  <EmailReadPanel
                    requests={messageRequests}
                    selected={selectedChat}
                    handleChatSelect={handleChatSelect}
                  />
                </div>
              </div>
              {selectedChat && selectedChat.chatId ? (
                <div className="col-lg-8">
                  <div className="open-email-container">
                    <div className="email-header divider d-flex justify-content-between ps-4 pe-4 ps-xxl-5 pe-xxl-5">
                      <div className="sender-info d-flex align-items-center">
                        <Image
                          src={selectedChat.profilePicture}
                          alt="logo"
                          height={100}
                          width={100}
                          priority
                          className="lazy-img logo"
                        />
                        <div className="ps-3">
                          <div className="sender-name">
                            vinaysingh.employd.eth
                          </div>
                          <div className="sender-email">
                            {selectedChat?.intentSentBy.split(":")[1]}
                          </div>
                        </div>
                      </div>
                      <div className="email-info">
                        <div className="time">
                          {formatTimestamp(selectedChat.intentTimestamp)}
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <button className="delete-email">
                            <Image
                              src={icon_8}
                              alt="icon"
                              className="lazy-img"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="email-body divider">
                      <div className="ps-4 pe-4 ps-xxl-5 pe-xxl-5">
                        <h2>Request for Attestation</h2>
                        <p>
                          Hello, I hope you’re doing well. I’m reaching out to
                          kindly request your assistance with verifying my role
                          and contributions during my time at [Company Name].
                        </p>
                        <p>Here’s what I’d need from you:</p>
                        <ul className="style-none mb-30">
                          <li>- Confirmation of my role and tenure</li>
                          <li>
                            - A brief comment or endorsement on my contributions
                          </li>
                        </ul>
                        <p>
                          You can provide this attestation securely through the
                          following link:
                        </p>
                        <p>
                          <a
                            href={selectedChat?.msg.messageContent}
                            className={`${lexend_700.className} text-decoration-underline`}
                            target="_blank"
                          >
                            Click here to attest
                          </a>
                        </p>
                        <p>
                          I truly appreciate your time and support. If you have
                          any questions or need further details, please feel
                          free to reach out to me directly.
                        </p>
                        <p>Thank you!</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessage;

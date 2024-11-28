"use client";
import React from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";

const Homepage = () => {
  const account = useActiveAccount();

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <div className="wallet-connect-wrapper">
          {!account?.address ? (
            <div className="wallet-connect-container">
              <div className="d-flex justify-center wallet-connect-button">
                <WalletComponents />
              </div>
              <div className="mt-10 text-center connect-wallet-text">
                Start by connecting your wallet
              </div>
            </div>
          ) : (
            <NameSelector />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Homepage;

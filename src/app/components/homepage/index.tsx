"use client";
import React from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";

const Homepage = () => {
  const account = useActiveAccount();

  return (
    <div className="main-page-wrapper">
      <div className="wallet-connect-wrapper">
        <div className="wallet-connect-container">
          {!account?.address ? (
            <>
              <div className="d-flex justify-center wallet-connect-button">
                <WalletComponents />
              </div>
              <div className="mt-5 text-center connect-wallet-text">
                Start by connecting your wallet
              </div>
            </>
          ) : (
            <NameSelector />
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

"use client";
import React, { useEffect, useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import { useAccount } from "wagmi";
import NameSelector from "./name-selector";

const Homepage = () => {
  const { address } = useAccount();

  return (
    <div className="main-page-wrapper">
      <div className="wallet-connect-wrapper">
        <div className="wallet-connect-container">
          {!address ? (
            <>
              <div className="d-flex justify-center">
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

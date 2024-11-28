"use client";
import React, { useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";

const Homepage = () => {
  const account = useActiveAccount();
  const [loginType, setLoginType] = useState<string | null>(null);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <div className="wallet-connect-wrapper">
          {!account?.address ? (
            <div className="wallet-connect-container">
              <div className="d-flex justify-center wallet-connect-button">
                <WalletComponents
                  text="Sign in"
                  userType="login"
                  setLoginType={setLoginType}
                />
              </div>
              <div className="dropdown mt-10">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign up
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <WalletComponents
                    text="Talent"
                    userType="talent-signup"
                    connectModalText="Talent Sign up"
                    setLoginType={setLoginType}
                  />
                  <WalletComponents
                    text="Employer"
                    userType="employer-signup"
                    connectModalText="Employer Sign up"
                    setLoginType={setLoginType}
                  />
                </ul>
              </div>
            </div>
          ) : (
            <NameSelector loginType={loginType} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Homepage;

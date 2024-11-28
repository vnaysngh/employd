"use client";
import React, { useEffect, useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";
import { useStateContext } from "@/context";

const Homepage = () => {
  const account = useActiveAccount();
  const [loginType, setLoginType] = useState<string | null>(null);
  const { createUser } = useStateContext();

  useEffect(() => {
    const onConnect = async () => {
      setLoginType(loginType);
      try {
        const response = await createUser(loginType, account?.address!);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    if (loginType && account?.address) onConnect();
  }, [loginType, account]);

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
                    userType="talent"
                    setLoginType={setLoginType}
                    connectModalText="Talent Sign up"
                  />
                  <WalletComponents
                    text="Employer"
                    userType="employer"
                    setLoginType={setLoginType}
                    connectModalText="Employer Sign up"
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

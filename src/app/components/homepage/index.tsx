"use client";
import React, { useEffect, useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";
import { useStateContext } from "@/context";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const account = useActiveAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<string | null>(null);
  const [user, setUser] = useState<any[] | null>(null);
  const { createUser, isUserRegistered } = useStateContext();

  useEffect(() => {
    const onConnect = async () => {
      if (isUserRegistered) {
        setLoginType("login");
        setUser(isUserRegistered);
      } else {
        setLoginType(loginType);
        try {
          const response = await createUser(loginType, account?.address!);
          if (response && response.length) setUser(response[0]);
        } catch (err) {
          console.log(err);
        }
      }
    };

    if (loginType && account?.address) onConnect();
  }, [loginType, account, isUserRegistered]);

  useEffect(() => {
    const getUser = () => {
      setUser(isUserRegistered);
    };

    if (account?.address && isUserRegistered) {
      setLoading(true);
      setLoginType(null);
      if (isUserRegistered.isOnboarded) {
        isUserRegistered.user_type === "talent"
          ? router.push("/dashboard/candidate-dashboard/resume")
          : router.push("/dashboard/employer-dashboard/profile");
      } else {
        getUser();
      }
      setLoading(false);
    }
  }, [account, isUserRegistered]);

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
                <WalletComponents
                  text="Sign up as Talent"
                  userType="talent"
                  setLoginType={setLoginType}
                  connectModalText="Talent Sign up"
                />
                <WalletComponents
                  text="Sign up as Employer"
                  userType="employer"
                  setLoginType={setLoginType}
                  connectModalText="Employer Sign up"
                />
                {/* <button
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
                </ul> */}
              </div>
            </div>
          ) : account.address && user ? (
            <NameSelector user={user} />
          ) : (
            "Something went wrong"
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Homepage;

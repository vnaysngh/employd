"use client";
import React, { useEffect, useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";
import { useStateContext } from "@/context";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";
import { inAppWallet } from "thirdweb/wallets";
// import { client } from "@/config/thirdwebClient";

// const wallet = inAppWallet();

const Homepage = () => {
  const account = useActiveAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { createUser, isUserRegistered } = useStateContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const [userType, setUserType] = useState(null);

  /* const connectWallet = async () => {
    const account = await wallet.connect({
      client,
      strategy: "google"
    });

    console.log(account);
  };

  useEffect(() => {
    connectWallet();
  }, []); */

  useEffect(() => {
    const onConnect = async () => {
      if (loginType !== "login") {
        setLoading(true);
        try {
          const response = await createUser(loginType, account?.address!);
          if (response && response.length) {
            setLoginType(null);
            setUser(response[0]);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (loginType && account?.address) onConnect();
  }, [loginType, account]);

  useEffect(() => {
    if (account?.address && isUserRegistered) {
      setLoading(true);
      setLoginType("login");
      if (isUserRegistered.isOnboarded) {
        isUserRegistered.user_type === "talent"
          ? router.push("/dashboard/candidate-dashboard/experience")
          : router.push("/dashboard/employ-dashboard/profile");
      } else {
        setUser(isUserRegistered);
      }
      setLoading(false);
    }
  }, [account, isUserRegistered]);

  console.log(account);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <div className="wallet-connect-wrapper">
          {loading ? (
            <Loader />
          ) : !account?.address ? (
            <div className="auth-container">
              <div className="auth-card">
                <div className="auth-header">
                  <h2>Get Started</h2>
                  <p>Choose how you'd like to continue</p>
                </div>

                <div className="d-flex justify-content-center wallet-connect-button">
                  <WalletComponents
                    text={"Sign in"}
                    userType="login"
                    setLoginType={setLoginType}
                  />
                </div>

                <div className="auth-divider">
                  <span>or sign up as</span>
                </div>

                <div className="dropdown justify-content-center  mt-10">
                  <WalletComponents
                    text={
                      <div className="user-type-button">
                        <h3>Talent</h3>
                        <p>Find opportunities</p>
                      </div>
                    }
                    userType="talent"
                    setLoginType={setLoginType}
                    connectModalText="Talent Sign up"
                  />
                  <WalletComponents
                    text={
                      <div className="user-type-button">
                        <h3>Employer</h3>
                        <p>Post jobs & hire</p>
                      </div>
                    }
                    userType="employer"
                    setLoginType={setLoginType}
                    connectModalText="Employer Sign up"
                  />
                </div>
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

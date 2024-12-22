"use client";
import React, { useEffect, useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import { useActiveAccount } from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";
import { useStateContext } from "@/context";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";

const Homepage = () => {
  const account = useActiveAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { createUser, isUserRegistered } = useStateContext();

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

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <div className="wallet-connect-wrapper">
          {loading ? (
            <Loader />
          ) : !account?.address ? (
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

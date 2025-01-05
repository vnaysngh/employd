"use client";
import React, { useEffect, useState } from "react";
import { WalletComponents } from "@/layouts/headers/component/wallet";
import NameSelector from "./name-selector";
import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
  useProfiles
} from "thirdweb/react";
import Wrapper from "@/layouts/wrapper";
import { table, useStateContext } from "@/context";
import Loader from "@/app/loading";
import { client } from "@/config/thirdwebClient";
import supabase from "@/supabase";
import { useRouter, useSearchParams } from "next/navigation";

const Homepage = () => {
  const account = useActiveAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { createUser } = useStateContext();
  const [userNotRegistered, setUserNotRegistered] = useState(false);
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const searchParams = useSearchParams();

  const { data: profiles } = useProfiles({
    client
  });

  useEffect(() => {
    const onConnect = async () => {
      if (loginType !== "login") {
        setLoading(true);
        try {
          const referrer = searchParams.get("referrer");

          const response = await createUser(
            loginType,
            profiles?.[0]?.details?.email || "",
            account?.address!,
            profiles?.[0] ?? null,
            referrer ?? ""
          );
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

    if (loginType && account?.address && profiles?.[0]) onConnect();
  }, [loginType, account?.address, profiles]);

  useEffect(() => {
    const checkIfRegisteredUser = async () => {
      setLoading(true);
      try {
        let { data, error } = await supabase
          .from(table)
          .select("*")
          .eq("address", account?.address);

        if (error) console.error(error);
        else {
          if (data && data.length) {
            setLoading(true);
            if (data[0].isOnboarded) {
              data[0].user_type === "talent"
                ? router.push("/dashboard/candidate-dashboard/experience")
                : router.push("/dashboard/employ-dashboard/profile");
            } else {
              setUser(data[0]);
            }
            setLoading(false);
          } else {
            if (loginType === "login") {
              setUserNotRegistered(true);
              setTimeout(() => {
                setUserNotRegistered(false);
              }, 5000);
              if (wallet) disconnect(wallet);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch names:", error);
      } finally {
        setLoading(false);
      }
    };

    if (account?.address) checkIfRegisteredUser();
  }, [account?.address]);

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
                    isBgGreen
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
                {userNotRegistered && (
                  <div className="subname-error mt-20 text-center">
                    User not registered
                  </div>
                )}
              </div>
            </div>
          ) : account.address && user ? (
            <NameSelector user={user} />
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Homepage;

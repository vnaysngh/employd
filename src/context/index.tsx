"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useContext, createContext, useEffect, useState } from "react";
// import { Config, useConnectorClient, useWriteContract } from "wagmi";
import abi from "@/abis/experience.json";
import supabase from "@/supabase";
import { Signer } from "ethers";
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useActiveAccount } from "thirdweb/react";
import { UserType } from "@/app/components/homepage/name-selector";
const StateContext = createContext<any>({});

export const StateContextProvider = ({ children }: { children: any }) => {
  // const { writeContractAsync } = useWriteContract();
  const account = useActiveAccount();
  const [names, setNames] = useState<UserType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [signer, setSigner] = useState<Signer>();
  const [pushUser, setPushUser] = useState<PushAPI>();
  const [isUserRegistered, setIsUserRegistered] = useState<any[] | null>(null);
  /*   useEffect(() => {
    const connectWallet = async () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== undefined &&
        address
      ) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = new JsonRpcSigner(provider, address);
          // setProvider(provider);
          setSigner(signer);
        } catch (error) {
          console.error("User rejected request", error);
        }
      } else {
        console.error("Metamask not found");
      }
    };

    if (address) connectWallet();
  }, [address, chainId]); */

  // useEffect(() => {
  const initializePushAPI = async () => {
    /* if (!pushUser || !address) {
      const user = await PushAPI.initialize(signer, {
        env: ENV.STAGING
      });

      // Check for errors in userAlice's initialization and handle them if any
      if (user.errors.length > 0) {
        // Handle Errors Here
      } else {
        setPushUser(user);
      }
    } */
  };

  useEffect(() => {
    const isUserRegistered = async () => {
      try {
        let { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("address", account?.address);

        if (data && data.length) setIsUserRegistered(data[0]);

        console.log(data, error);
      } catch (error) {
        console.error("Failed to fetch names:", error);
      }
    };

    if (account?.address) isUserRegistered();
  }, [account]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let { data, error } = await supabase.from("users").select("*");

        if (data) setUsers(data);
        else console.log(error);
      } catch (error) {
        console.error("Failed to fetch names:", error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getNames = async () => {
      const domain = "vinaysingh.eth";
      const address = "0x0B95ec21579aee6Ef7b712976bD86689D68b5A08";

      try {
        const response = await fetch(
          `/api/subnames?domain=${encodeURIComponent(
            domain
          )}&address=${encodeURIComponent(address)}`,
          { method: "GET" }
        );

        const data = await response.json();
        if (!response.ok) {
          console.error("Error fetching names:", data.error);
        } else {
          console.log("Fetched names:", data.names);
          setNames(data.names);
        }
      } catch (error) {
        console.error("Failed to fetch names:", error);
      }
    };

    getNames();
  }, [account]);

  const createUser = async (user_type: string, address: string) => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          user_type,
          address
        }
      ])
      .select();

    if (error) console.log(error);
    else return data;
  };

  const updateUserDetails = async ({
    body,
    address
  }: {
    body: any;
    address: string;
  }) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...body,
        isOnboarded: true
      })
      .eq("address", address)
      .select();

    if (error) console.error(error);
    else return data;
  };

  const createUserEns = async (ens_name: string, address: string) => {
    const { data, error } = await supabase
      .from("users")
      .update({ ens_name })
      .eq("address", address)
      .select();

    if (error) console.log(error);
    else return data;
  };

  const addUserExperienceToResume = (data: any) => {};

  return (
    <StateContext.Provider
      value={{
        names,
        isUserRegistered,
        signer,
        pushUser,
        initializePushAPI,
        createUser,
        createUserEns,
        updateUserDetails,
        addUserExperienceToResume
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

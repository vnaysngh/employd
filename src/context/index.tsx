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
  const [signer, setSigner] = useState<Signer>();
  const [pushUser, setPushUser] = useState<PushAPI>();
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
    const getUsers = async () => {
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
        console.log(data);
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

    getUsers();
  }, []);

  const createUser = async (subname: string) => {
    /*  const { data, error } = await supabase
      .from("employd-names")
      .insert([
        {
          subname,
          ens_name: "employd.eth",
          address
        }
      ])
      .select();

    if (error) console.log(error);
    else console.log(data); */
  };

  const addUserExperienceToResume = (data: any) => {};

  return (
    <StateContext.Provider
      value={{
        names,
        signer,
        pushUser,
        initializePushAPI,
        createUser,
        addUserExperienceToResume
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import type { Account, Chain, Client, Transport } from "viem";
import { useContext, createContext, useMemo, useEffect, useState } from "react";
import {
  Config,
  useAccount,
  useConnectorClient,
  useWriteContract
} from "wagmi";
import abi from "@/abis/experience.json";
import { getConfig } from "@/wallet/wagmi";
import { baseSepolia } from "wagmi/chains";
import supabase from "@/supabase";
import { Signer } from "ethers";
import { JsonRpcProvider } from "ethers";
import Web3 from "web3";
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
const StateContext = createContext<any>({});

export const StateContextProvider = ({ children }: { children: any }) => {
  const { writeContractAsync } = useWriteContract();
  const { address, chainId } = useAccount();
  const [users, setUsers] = useState<any>([]);
  const [signer, setSigner] = useState<Signer>();
  const [pushUser, setPushUser] = useState<PushAPI>();
  console.log(address, "address");
  useEffect(() => {
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
  }, [address, chainId]);

  // useEffect(() => {
  const initializePushAPI = async () => {
    if (!pushUser || !address) {
      const user = await PushAPI.initialize(signer, {
        env: ENV.STAGING
      });

      // Check for errors in userAlice's initialization and handle them if any
      if (user.errors.length > 0) {
        // Handle Errors Here
      } else {
        setPushUser(user);
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase.from("employd-users").select("*");
      if (error) alert("error fetching users");
      setUsers(data);
      // if (error) console.log(error);
      // console.log(data);
    };

    getUsers();
  }, []);

  const createUser = async (subname: string) => {
    const { data, error } = await supabase
      .from("employd-users")
      .insert([
        {
          subname,
          ens_name: "employd.eth",
          address
        }
      ])
      .select();

    if (error) console.log(error);
    else console.log(data);
  };

  const addUserExperienceToResume = (data: any) => {};

  return (
    <StateContext.Provider
      value={{
        users,
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

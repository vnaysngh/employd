"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useContext, createContext, useMemo, useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { Signer } from "ethers";

const windowObj: any = window;

const StateContext = createContext<any>({});

export const StateContextProvider = ({ children }: { children: any }) => {
  const { writeContractAsync } = useWriteContract();
  const { address, chainId } = useAccount();
  const [users, setUsers] = useState<any>([]);
  const [signer, setSigner] = useState<Signer>();
  useEffect(() => {
    const connectWallet = async () => {
      if (typeof windowObj.ethereum !== undefined && address) {
        try {
          const provider = new BrowserProvider(windowObj.ethereum);
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

  const addUserExperienceToResume = (data: any) => {};

  return (
    <StateContext.Provider
      value={{
        users,
        signer,
        addUserExperienceToResume
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

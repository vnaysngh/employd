"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useContext, createContext, useEffect, useState } from "react";
// import { Config, useConnectorClient, useWriteContract } from "wagmi";
import abi from "@/abis/experience.json";
import supabase from "@/supabase/index";
import { Signer } from "ethers";
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useActiveAccount } from "thirdweb/react";
import { UserType } from "@/app/components/homepage/name-selector";
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client } from "@/config/thirdwebClient";
import { baseSepolia } from "thirdweb/chains";
import { FormData } from "@/app/components/dashboard/candidate/add-experience";
import Attested from "@/assets/dashboard/images/icon/checked.png";
import AttestedPending from "@/assets/dashboard/images/icon/pending.png";
import Rejected from "@/assets/dashboard/images/icon/rejected-new.png";

export const statusConfig = {
  1: { icon: AttestedPending, text: "Pending", class: "pending" },
  2: { icon: Attested, text: "Attested", class: "success" },
  3: { icon: Rejected, text: "Rejected", class: "rejected" }
};

const StateContext = createContext<any>({});

export const contract = getContract({
  client,
  address: "0x8f9134a6d3cda515adbfeF7AeEb53D16bd7cDc09",
  chain: baseSepolia,
  abi: abi as any
});

export const StateContextProvider = ({ children }: { children: any }) => {
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const account = useActiveAccount();
  const [names, setNames] = useState<UserType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [signer, setSigner] = useState<Signer>();
  const [pushUser, setPushUser] = useState<PushAPI>();
  const [isUserRegistered, setIsUserRegistered] = useState<any>(null);
  const [employers, setEmployers] = useState<any>([]);
  const [talents, setTalents] = useState<any>([]);
  const [userOnboarded, setUserOnboarded] = useState(false);

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
    const getEmployers = async () => {
      try {
        let { data: employers, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_type", "employer");

        if (error) {
          console.error(error);
        } else {
          if (employers && employers.length) {
            setEmployers(employers);
          }
        }
      } catch (error) {
        console.error("Failed to fetch employers:", error);
      }
    };

    getEmployers();
  }, []);

  const createJob = async (jobs: any[]) => {
    try {
      let { data, error } = await supabase
        .from("users")
        .update({
          jobs
        })
        .eq("address", account?.address)
        .eq("user_type", "employer")
        .select();

      if (error) {
        console.error(error);
      } else return data;
    } catch (error) {
      console.error("Failed to fetch employers:", error);
    }
  };

  useEffect(() => {
    const getTalents = async () => {
      try {
        let { data: talents, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_type", "talent");

        if (error) {
          console.error(error);
        } else {
          if (talents && talents.length) {
            setTalents(talents);
          }
        }
      } catch (error) {
        console.error("Failed to fetch talents:", error);
      }
    };

    getTalents();
  }, []);

  useEffect(() => {
    const checkIfRegisteredUser = async () => {
      try {
        let { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("address", account?.address);
        if (error) console.error(error);
        else {
          if (data && data.length) setIsUserRegistered(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch names:", error);
      }
    };

    if (account?.address) checkIfRegisteredUser();
  }, [account?.address, userOnboarded]);

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

  const createUser = async (
    user_type: string,
    email: string,
    address: string
  ) => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          user_type,
          email,
          address
        }
      ])
      .select();

    if (error) console.log(error);
    else return data;
  };

  const createEmployer = async (
    user_type: string,
    company_name: string,
    ens_name: string
  ) => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          user_type,
          company_name,
          ens_name
        }
      ])
      .select();

    if (error) console.log(error);
    else return data;
  };

  const getUserDetails = async (address: string) => {
    if (!address) return null;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("address", address);

      if (error) {
        console.error("Error fetching user details:", error);
        return null;
      }

      return data?.length ? data[0] : null;
    } catch (error) {
      console.error("Unexpected error fetching user details:", error);
      return null;
    }
  };

  const getUserDetailsByEns = async (ens: string) => {
    if (!ens) return null;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("ens_name", ens);

      if (error) {
        console.error("Error fetching user details:", error);
        return null;
      }

      return data?.length ? data[0] : null;
    } catch (error) {
      console.error("Unexpected error fetching user details:", error);
      return null;
    }
  };

  const getEmployerDetails = async (ens_name: string) => {
    if (!ens_name) return null;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("ens_name", ens_name);

      if (error) {
        console.error("Error fetching user details:", error);
        return null;
      }

      return data?.length ? data[0] : null;
    } catch (error) {
      console.error("Unexpected error fetching user details:", error);
      return null;
    }
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
    else {
      setUserOnboarded(true);
      return data;
    }
  };

  const updateCandidateSkills = async ({
    body,
    address
  }: {
    body: any;
    address: string;
  }) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...body
      })
      .eq("address", address)
      .select();

    if (error) console.error(error);
    else return data;
  };

  const updateEmployerDetails = async (body: any) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...body
      })
      .eq("address", account?.address!)
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

  const addUserExperienceToResume = async (
    formData: FormData,
    newEmployerEnsName?: string
  ) => {
    if (!isUserRegistered || !isUserRegistered.address) return;
    const { newEmployer, currentlyWorking } = formData;
    const params: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ] = [
      formData.role.label,
      isUserRegistered.name,
      isUserRegistered.ens_name,
      newEmployer ? newEmployer : formData.company.label,
      newEmployerEnsName ? newEmployerEnsName : formData.company.value,
      formData.startMonth.value,
      formData.startYear.value,
      currentlyWorking ? "N/A" : formData.endMonth.value,
      currentlyWorking ? "N/A" : formData.endYear.value,
      formData.employmentType.label,
      formData.description,
      newEmployer ? "" : formData.company.address
    ];
    const transaction = prepareContractCall({
      contract,
      method:
        "function addExperience(string _role, string _seekerName, string _seekerEnsName, string _employerName, string _employerEnsName, string _startMonth, string _startYear, string _endMonth, string _endYear, string _employmentType, string _description, address _employerAddress) returns (uint256)",
      params
    });
    return sendTransaction(transaction)
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  const requestAttestation = async (
    experienceId: any,
    employerAddress: string
  ) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function chooseEmployerForAttestation(uint32 experienceId, address employerAddress)",
      params: [experienceId, employerAddress]
    });
    return sendTransaction(transaction)
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  const attestExperience = async (experienceId: any, seeker: string) => {
    const transaction = prepareContractCall({
      contract,
      method: "function signAttestation(uint32 experienceId, address seeker)",
      params: [experienceId, seeker]
    });
    return sendTransaction(transaction)
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  return (
    <StateContext.Provider
      value={{
        users,
        names,
        attestExperience,
        employers,
        talents,
        getUserDetails,
        getUserDetailsByEns,
        isUserRegistered,
        signer,
        pushUser,
        initializePushAPI,
        createUser,
        createJob,
        createEmployer,
        createUserEns,
        updateUserDetails,
        updateCandidateSkills,
        updateEmployerDetails,
        getEmployerDetails,
        addUserExperienceToResume,
        requestAttestation
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

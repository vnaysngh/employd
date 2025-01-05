"use client";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useContext, createContext, useEffect, useState } from "react";
// import { Config, useConnectorClient, useWriteContract } from "wagmi";
import abi from "@/abis/experience.json";
import supabase from "@/supabase/index";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
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
  0: { icon: AttestedPending, text: "Not Initiated", class: "not-initiated" },
  1: { icon: AttestedPending, text: "Pending", class: "pending" },
  2: { icon: Attested, text: "Attested", class: "success" },
  3: { icon: Rejected, text: "Rejected", class: "rejected" }
};

const StateContext = createContext<any>({});

export const contract = getContract({
  client,
  address: "0x551cAa3B771cE5cdf92f941093e64E5e27Af84f3",
  chain: baseSepolia,
  abi: abi as any
});

export const table = "users";

export const StateContextProvider = ({ children }: { children: any }) => {
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const account = useActiveAccount();
  const [names, setNames] = useState<UserType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isUserRegistered, setIsUserRegistered] = useState<any>(null);
  const [employers, setEmployers] = useState<any>([]);
  const [talents, setTalents] = useState<any>([]);
  const [userOnboarded, setUserOnboarded] = useState(false);
  const { data } = useAutoConnect({
    client
  });

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
          .from(table)
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
        .from(table)
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
      console.error("Failed to create job", error);
    }
  };

  useEffect(() => {
    const getTalents = async () => {
      try {
        let { data: talents, error } = await supabase
          .from(table)
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
          .from(table)
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
        let { data, error } = await supabase.from(table).select("*");

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
      const domain = "employd.eth";
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
    address: string,
    user_login_details: any,
    referrer: string
  ) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          user_type,
          email,
          address,
          user_login_details,
          referrer
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
      .from(table)
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
        .from(table)
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
        .from(table)
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
        .from(table)
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
      .from(table)
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
      .from(table)
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
      .from(table)
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
      .from(table)
      .update({ ens_name })
      .eq("address", address)
      .select();

    if (error) console.log(error);
    else return data;
  };

  const addUserExperienceToResume = async (formData: FormData) => {
    if (!isUserRegistered || !isUserRegistered.address) return;
    const {
      role,
      company,
      startMonth,
      startYear,
      endMonth,
      endYear,
      currentlyWorking,
      newEmployer,
      newEmployerEmail,
      employmentType,
      description
    } = formData;

    const input = {
      role: role.label,
      seekerName: isUserRegistered.name,
      seekerEnsName: isUserRegistered.ens_name,
      employerName: newEmployer ? newEmployer : company.label,
      employerEnsName: newEmployer ? "" : company.value,
      startMonth: startMonth.value,
      startYear: startYear.value,
      endMonth: currentlyWorking ? "N/A" : endMonth.value,
      endYear: currentlyWorking ? "N/A" : endYear.value,
      employmentType: employmentType.label,
      description: description,
      employerAddress: newEmployer
        ? ""
        : company.address
        ? company.address
        : "",
      employerEmail: newEmployer ? newEmployerEmail : company.email
    };

    const transaction = prepareContractCall({
      contract,
      method:
        "function addExperience((string role, string seekerName, string seekerEnsName, string employerName, string employerEnsName, string startMonth, string startYear, string endMonth, string endYear, string employmentType, string description, address employerAddress, string employerEmail) input) returns (uint32)",
      params: [input]
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

  const registerEmployerToExperience = async (experienceId: any) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function assignEmployerToExperience(uint32 experienceId, address employerAddress, string employerEnsName)",
      params: [experienceId, account?.address!, isUserRegistered.ens_name]
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
        account,
        users,
        names,
        attestExperience,
        employers,
        talents,
        getUserDetails,
        getUserDetailsByEns,
        registerEmployerToExperience,
        isUserRegistered,
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

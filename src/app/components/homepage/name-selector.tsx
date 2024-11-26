"use client";
import { useStateContext } from "@/context";
import { useDebounce } from "@/hooks/useDebouce";
import React, { useEffect, useMemo, useState } from "react";
import NameStone, {
  AuthenticationError,
  NetworkError,
  TextRecords,
  CoinTypes
} from "namestone-sdk";
import { useActiveAccount } from "thirdweb/react";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/app/loader";

// Initialize the NameStone instance
const ns = new NameStone(process.env.NEXT_PUBLIC_NAMESTONE_APIKEY);

interface WorkerRequest {
  signature: {
    message: {
      name: string;
      owner: string;
      addresses?: Record<string, string | undefined> | undefined;
      texts?: Record<string, string | undefined> | undefined;
      contenthash?: string | undefined;
    };
    hash: string;
  };
}

type UserType = {
  address: string;
  coin_types: object;
  contenthash: any;
  created_at: string;
  domain: string;
  name: string;
  text_records: object;
};

const NameSelector = () => {
  const [subname, setSubname] = useState("poookie-popeye");
  const [userSubnames, setUserSubnames] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { names } = useStateContext();
  const router = useRouter();
  const account = useActiveAccount();
  useEffect(() => {
    if (names) {
      const userSubnames = names.map((user: UserType) => user.name);
      setUserSubnames(userSubnames);
    }
  }, [names]);

  const debouncedName = useDebounce(subname, 500);

  const nameData: WorkerRequest["signature"]["message"] = {
    name: `${debouncedName}.employd.eth`,
    owner: account?.address!,
    addresses: {
      "2147492101": account?.address!
    }
  };

  const handleSignMessage = async (e: any) => {
    e.preventDefault();
    if (!account) return;
    try {
      const response = await account.signMessage({
        message: JSON.stringify(nameData)
      });

      if (response) setSubnameOffchain();

      console.log(response, "response");
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e: any) => {
    setSubname(e.target.value);
  };

  const setSubnameOffchain = async () => {
    // Define the coin types
    const coinTypes: CoinTypes = {
      "2147492101": account?.address!
    };

    const payload = {
      name: debouncedName,
      domain: "vinaysingh.eth",
      address: account?.address,
      coin_types: coinTypes
    };

    setLoading(true);

    try {
      const response = await fetch("/api/subnames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error setting subname:", data.error);
        setError(data.error);
      } else {
        console.log("Name set successfully:", data);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          router.push("/dashboard/candidate-dashboard/resume");
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to call API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = () => {
    // Replace this with your random name generation logic
    const randomNames = ["cool-fox", "blue-tiger", "bold-eagle", "mighty-lion"];
    setSubname(randomNames[Math.floor(Math.random() * randomNames.length)]);
  };

  const isNameTaken = userSubnames.includes(debouncedName);

  console.log(isNameTaken, loading);

  return (
    <div className="name-selector-wrapper">
      {/* <ChatComponent /> */}
      <h2 className="title">Choose a unique name</h2>
      <p className="subtitle">
        This is the identifier linked to your addresses.
      </p>
      <div className="subdomain-wrapper">
        <input
          type="text"
          className={`input-field ${isNameTaken && "error-border"}`}
          value={subname}
          onChange={handleInputChange}
          placeholder="Enter subname"
        />
        <span className="suffix">.employd.eth</span>
        <span className="refresh-icon" onClick={handleRandomize}>
          ↻
        </span>
      </div>

      {(isNameTaken || error) && (
        <div className="subname-error mt-10">
          {" "}
          {error ? error : "The username is not available"}
        </div>
      )}

      {success && (
        <div className="success-text mt-10">Username created successfully.</div>
      )}

      {loading && (
        <div className="loading-text mt-10">
          Creating unique name for you. Please wait...
        </div>
      )}

      <div className="d-flex justify-center">
        <button
          className="confirm-button"
          disabled={isNameTaken || loading || success}
          onClick={handleSignMessage}
        >
          Confirm name
        </button>
      </div>
    </div>
  );
};

export default NameSelector;

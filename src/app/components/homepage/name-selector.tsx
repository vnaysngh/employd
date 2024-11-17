"use client";
import { useStateContext } from "@/context";
import { useDebounce } from "@/hooks/useDebouce";
import { FundButton } from "@coinbase/onchainkit/fund";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance, useSignMessage } from "wagmi";
import NameStone, { CoinTypes } from "namestone-sdk";

// Initialize the NameStone instance
const ns = new NameStone(process.env.NEXT_PUBLIC_NAMESTONE_APIKEY);

// Define the coin types
const coinTypes: CoinTypes = {
  "2147483785": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
  "2147492101": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
  "2147525809": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
  "2147483658": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
};

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
  id: number;
  created_at: string;
  address: string;
  subname: string;
  ens_name: string;
};

const NameSelector = () => {
  const [subname, setSubname] = useState("poookie-popeye");
  const [userSubnames, setUserSubnames] = useState<string[]>([]);
  const { users, createUser } = useStateContext();
  const { data, signMessage } = useSignMessage();
  const { address } = useAccount();
  const [userType, setUserType] = useState("");
  // const router = useRouter();

  const ethBalance = useBalance({
    address
  });

  console.log(ethBalance);

  const debouncedName = useDebounce(subname, 500);

  const nameData: WorkerRequest["signature"]["message"] = {
    name: `${debouncedName}.employd.eth`,
    owner: address!,
    addresses: {
      "2147492101": address
    }
  };

  useEffect(() => {
    if (users) {
      const userSubnames = users.map((user: UserType) => user.subname);
      setUserSubnames(userSubnames);
    }
  }, [users]);

  const handleInputChange = (e: any) => {
    setSubname(e.target.value);
  };

  useEffect(() => {
    const setSubnameOffchain = async () => {
      const response = await createUser(subname);
      console.log(response, "create user response");
      if (response) {
        // router.push("/dashboard/candidate-dashboard/resume");
      }
    };

    if (data) {
      setSubnameOffchain();
    }
  }, [data]);

  const handleRandomize = () => {
    // Replace this with your random name generation logic
    const randomNames = ["cool-fox", "blue-tiger", "bold-eagle", "mighty-lion"];
    setSubname(randomNames[Math.floor(Math.random() * randomNames.length)]);
  };

  const isNameTaken = userSubnames.includes(debouncedName);
  const isLowBalance =
    Number(ethBalance.data?.formatted) < 0.01 && userType === "employer";

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
      <div className="row mt-20">
        <div className="skills-options d-flex justify-content-between">
          <button
            key={"user"}
            className={`skill-btn ${userType === "user" ? "selected" : ""}`}
            onClick={() => setUserType("user")}
          >
            User
          </button>
          <button
            key={"employer"}
            className={`skill-btn ${userType === "employer" ? "selected" : ""}`}
            onClick={() => setUserType("employer")}
          >
            Employer
          </button>
        </div>
      </div>
      {isLowBalance && (
        <>
          <div className="low-balance-error mt-10">
            A minimum wallet balance of 0.01 ETH is required to create an
            employer account. This ensures fair use of our Web3 platform and
            prevents potential exploitation, without charging any fees for
            onboarding. You can buy crypto from here.
            <FundButton className="fund-button" text="Fund Using Coinbase" />
          </div>
        </>
      )}

      {isNameTaken && (
        <div className="subname-error mt-10">The ENS is not available</div>
      )}

      <div className="d-flex justify-center">
        <button
          className="confirm-button"
          disabled={isNameTaken || isLowBalance}
          onClick={(e) => {
            e.preventDefault();
            signMessage({ message: JSON.stringify(nameData) });
          }}
        >
          Confirm name →
        </button>
      </div>
    </div>
  );
};

export default NameSelector;

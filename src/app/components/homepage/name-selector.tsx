"use client";
import { useStateContext } from "@/context";
import { useDebounce } from "@/hooks/useDebouce";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

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
  const [subname, setSubname] = useState("lime-vulture");
  const [userSubnames, setUserSubnames] = useState<string[]>([]);
  const { users, createUser } = useStateContext();
  const { data, signMessage } = useSignMessage();
  const { address } = useAccount();
  // const router = useRouter();

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
      {isNameTaken && (
        <div className="subname-error mt-10">The ENS is not available</div>
      )}

      <div className="d-flex justify-center">
        <button
          className="confirm-button"
          disabled={isNameTaken}
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
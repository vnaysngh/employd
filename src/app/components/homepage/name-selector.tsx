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
import { useActiveAccount, useLinkProfile, useProfiles } from "thirdweb/react";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/app/loading";
import { client } from "@/config/thirdwebClient";

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

export type UserType = {
  address: string;
  coin_types: object;
  contenthash: any;
  created_at: string;
  domain: string;
  name: string;
  text_records: object;
};

const NameSelector = ({ user }: { user: any }) => {
  const [subname, setSubname] = useState("poookie-popeye");
  const [userSubnames, setUserSubnames] = useState<string[]>([]);
  const [isUserEnsRegistered, setIsUserEnsRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { names, createUserEns } = useStateContext();
  const account = useActiveAccount();
  useEffect(() => {
    if (names) {
      const userSubnames = names.map((user: UserType) => user.name);
      setUserSubnames(userSubnames);
    }
  }, [names]);

  useEffect(() => {
    if (account?.address && user) {
      setIsUserEnsRegistered(user.ens_name);
    }
  }, [account, names]);

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

      if (response) setEnsName();

      console.log(response, "response");
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e: any) => {
    setSubname(e.target.value);
  };

  const setEnsName = async () => {
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
        const response = await createUserEns(debouncedName, account?.address);
        console.log(response);
        if (response && response.length) {
          setSuccess(true);
          setError(false);
          setIsUserEnsRegistered(true);
        }
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

  return (
    <div
      className={`wallet-connect-container ${
        isUserEnsRegistered ? "w-50" : ""
      }`}
    >
      {isUserEnsRegistered && user ? (
        <Stepper userType={user.user_type} />
      ) : (
        <div className="name-selector-wrapper">
          {/* <ChatComponent /> */}
          <h2 className="title">Choose a unique name</h2>
          <p className="subtitle">
            This is the identifier linked to your addresses.
          </p>
          <div className="subdomain-wrapper">
            <input
              type="text"
              className={`input-field text-center ${
                isNameTaken && "error-border"
              }`}
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
              {error ? error : "The username is not available"}
            </div>
          )}

          {success && (
            <div className="success-text mt-10">
              Username created successfully.
            </div>
          )}

          {loading && (
            <div className="loading-text mt-10">
              Creating unique name for you. Please wait...
            </div>
          )}

          <div className="d-flex justify-center mt-20">
            <button
              className="confirm-button"
              disabled={isNameTaken || loading || success}
              onClick={handleSignMessage}
            >
              Confirm name
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Stepper = ({ userType }: { userType: string }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userUpdate, setUserUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    name: "",
    company_description: ""
  });
  const [formDataTalent, setFormDataTalent] = useState({
    name: "",
    role: ""
  });
  const router = useRouter();
  const account = useActiveAccount();
  const { updateUserDetails } = useStateContext();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (userType === "talent") {
      setFormDataTalent({ ...formDataTalent, [name]: value });
    } else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = userType === "talent" ? formDataTalent : formData;
    const isEmpty = Object.values(body).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
    if (!isEmpty) {
      console.error("fields are empty");
      return;
    }
    setLoading(true);
    try {
      const response = await updateUserDetails({
        body,
        address: account?.address
      });
      if (response && response.length) {
        userType === "talent"
          ? router.push("/dashboard/candidate-dashboard/experience")
          : router.push("/dashboard/employ-dashboard/profile");
      }
    } catch (error) {
      console.error("Failed to call API:", error);
    } finally {
      setLoading(false);
    }
  };

  /*   const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };
 */
  const steps =
    userType === "talent"
      ? [
          {
            label: "What’s your name?",
            description:
              "Help your teammates to recognise and connect with you more easily.",
            content: (
              <input
                type="text"
                name="name"
                className="input-field"
                value={formDataTalent.name}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                placeholder="Enter your name"
              />
            )
          },
          {
            label: "Select your primary role",
            description:
              "Help your teammates to recognise and connect with you more easily.",
            content: (
              <input
                type="text"
                name="role"
                className="input-field"
                value={formDataTalent.role}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                placeholder="Enter your name"
              />
            )
          }
        ]
      : [
          {
            label: "What’s the name of your company or team?",
            description:
              "This will be the identity that helps others recognize your organization.",
            content: (
              <input
                type="text"
                name="company_name"
                className="input-field"
                value={formData.company_name}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                placeholder="What’s the name of your company or team?"
              />
            )
          },
          {
            label: "What’s your name?",
            description:
              "Help your teammates to recognise and connect with you more easily.",
            content: (
              <input
                type="text"
                name="name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                placeholder="Enter your name"
              />
            )
          },
          {
            label: "One sentence summary of your product",
            description: "Describe what your company does in just a few words",
            content: (
              <input
                name="company_description"
                className="input-field"
                value={formData.company_description}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                placeholder="Write about the company"
              />
            )
          }
          /*           {
            label: `Who else is on the ${formData.company_name} team?`,
            description: "Add colleagues by email",
            content: (
              <input
                type="text"
                className="input-field"
                name="invitePeople"
                value={formData.invitePeople}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter email addresses to invite"
              />
            )
          } */
        ];

  return (
    <div className="stepper-container name-selector-wrapper">
      <div className="stepper">
        Step {currentStep} of {steps.length}
      </div>
      <form onSubmit={handleSubmit} className="step-content">
        <h2 className="title text-start">{steps[currentStep - 1].label}</h2>
        <p className="subtitle text-start">
          {steps[currentStep - 1].description}
        </p>
        <p className="subtitle">{steps[currentStep - 1].content}</p>
        <div className="buttons">
          {currentStep > 1 && (
            <button type="button" onClick={handleBack} className="back-btn">
              Back
            </button>
          )}
          {currentStep < steps.length ? (
            <button type="button" className="next-btn" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              Submit
            </button>
          )}
        </div>
      </form>
      {loading && (
        <div className="loading-text mt-10">
          Updating details. Please wait...
        </div>
      )}
      {userUpdate && (
        <div className="success-text mt-10">User details updated.</div>
      )}
    </div>
  );
};

export default NameSelector;

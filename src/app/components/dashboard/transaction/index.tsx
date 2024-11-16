"use client";
import { useCallback } from "react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import abi from "@/abis/experience.json";
import { FormData } from "../candidate/dashboard-resume";

export default function TransactionComponent(formData: FormData) {
  const {
    role,
    company,
    startMonth,
    startYear,
    endMonth,
    endYear,
    employmentType,
    skills,
    responsibilities
  } = formData;
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  const clickContractAddress = "0xC47B4f2A6C2788c05B559078a8e30a5697377a58";

  const contracts = [
    {
      address: clickContractAddress as any,
      abi: abi as any,
      functionName: "addExperience",
      args: [
        role,
        company,
        startMonth.value,
        startYear.value,
        endMonth.value,
        endYear.value,
        employmentType.value,
        responsibilities,
        skills
      ]
    }
  ];

  const openTxOnBlockscout = (data: any) => {
    window.open(
      `https://base-sepolia.blockscout.com/tx/${data.transactionHash}`,
      "_blank"
    );
  };

  return (
    <Transaction
      chainId={84532}
      contracts={contracts}
      onStatus={handleOnStatus}
      className="cb-tx-button"
    >
      <TransactionButton
        text="Save"
        successOverride={{
          text: "View Transaction",
          onClick: openTxOnBlockscout
        }}
      />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}

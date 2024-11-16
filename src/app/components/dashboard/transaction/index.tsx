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
    description
  } = formData;
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  const clickContractAddress = "0xb84D7f33C10F9dc661B9566c15e81918f630DE65";

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
        description
      ]
    }
  ];

  return (
    <Transaction
      chainId={84532}
      contracts={contracts}
      onStatus={handleOnStatus}
      className="cb-tx-button"
    >
      <TransactionButton text="Save" />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}

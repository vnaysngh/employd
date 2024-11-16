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
import { useStateContext } from "@/context";

export default function TransactionComponent({
  employerAddress,
  experienceId,
  attestationStatus,
  setShowSuccess
}: {
  employerAddress: string;
  experienceId: number;
  attestationStatus: number;
  setShowSuccess: (item: boolean) => void;
}) {
  const { initializePushAPI } = useStateContext();
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    if (status.statusName === "success") {
      setShowSuccess(true);
    }
  }, []);

  const clickContractAddress = "0xC47B4f2A6C2788c05B559078a8e30a5697377a58";
  const contracts = [
    {
      address: clickContractAddress as any,
      abi: abi as any,
      functionName: "chooseEmployerForAttestation",
      args: [experienceId, employerAddress]
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
        text={
          attestationStatus === 1
            ? "Sent for Attestation. Awaiting Approval"
            : "Request Attestation"
        }
        successOverride={{
          text: "View Transaction",
          onClick: openTxOnBlockscout
        }}
        // disabled={attestationStatus === 1}
      />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}

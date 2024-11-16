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

  const clickContractAddress = "0xc91405FDC892BF969ac63A189E1DdC8dF811D80F";
  const contracts = [
    {
      address: clickContractAddress as any,
      abi: abi as any,
      functionName: "chooseEmployerForAttestation",
      args: [experienceId, employerAddress]
    }
  ];

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

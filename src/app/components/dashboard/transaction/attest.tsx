"use client";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel
} from "@coinbase/onchainkit/transaction";
import abi from "@/abis/experience.json";

export default function TransactionComponent({
  experienceId
}: {
  experienceId: any;
}) {
  const clickContractAddress = "0x354305dc55B9351a6A99dAD46C278c6150026ed0";
  const contracts = [
    {
      address: clickContractAddress as any,
      abi: abi as any,
      functionName: "signAttestation",
      args: [experienceId]
    }
  ];

  const openTxOnBlockscout = (data: any) => {
    window.open(
      `https://base-sepolia.blockscout.com/tx/${data.transactionHash}`,
      "_blank"
    );
  };

  return (
    <Transaction chainId={84532} contracts={contracts} className="cb-tx-button">
      <TransactionButton
        text={"Attest"}
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

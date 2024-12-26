"use client";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/config/thirdwebClient";
import { ConnectButton } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email"]
    }
  })
];

export function WalletComponents({
  text,
  userType,
  setLoginType,
  connectModalText
}: {
  text: string | React.ReactNode;
  userType: string;
  setLoginType: (type: string | null) => void;
  connectModalText?: string;
}) {
  return (
    <ConnectButton
      wallets={wallets}
      client={client}
      connectButton={{
        label: text,
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          color: "#333",
          height: "auto",
          minWidth: "165px"
        }
      }}
      connectModal={{
        title: connectModalText,
        showThirdwebBranding: false
      }}
      onConnect={() => setLoginType(userType)}
      autoConnect
      accountAbstraction={{
        chain: baseSepolia, // the chain where your smart accounts will be or is deployed
        sponsorGas: true // enable or disable sponsored transactions
      }}
      theme="light"
    />
  );
}

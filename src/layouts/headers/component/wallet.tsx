"use client";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/config/thirdwebClient";
import { ConnectButton } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";

/* const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "discord", "facebook", "email"]
    }
  })
]; */

export function WalletComponents({
  text,
  userType,
  setLoginType,
  connectModalText
}: {
  text: string;
  userType: string;
  setLoginType: (type: string) => void;
  connectModalText?: string;
}) {
  return (
    <ConnectButton
      // wallets={wallets}
      client={client}
      connectButton={{
        label: text
      }}
      connectModal={{
        title: connectModalText,
        showThirdwebBranding: false
      }}
      // accountAbstraction={{
      //   chain: baseSepolia, // the chain where your smart accounts will be or is deployed
      //   sponsorGas: true // enable or disable sponsored transactions
      // }}
      // detailsButton={{
      //   className: "tw-connected-details",
      //   style: { fontSize: "16px" }
      // }}
      onConnect={() => setLoginType(userType)}
      autoConnect
    />
  );
}

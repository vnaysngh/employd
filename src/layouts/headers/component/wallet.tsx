"use client";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/config/thirdwebClient";
import { ConnectButton } from "thirdweb/react";

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
      detailsButton={{
        className: "tw-connected-details",
        style: { fontSize: "16px" }
      }}
      onConnect={() => setLoginType(userType)}
      autoConnect
    />
  );
}

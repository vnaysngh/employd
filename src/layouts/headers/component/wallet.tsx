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
  connectModalText,
  isMargin
}: {
  text: string;
  userType: string;
  setLoginType: (type: string) => void;
  isMargin?: boolean;
  connectModalText?: string;
}) {
  return (
    <ConnectButton
      // wallets={wallets}
      client={client}
      connectButton={{
        label: text,
        style: {
          marginRight: isMargin ? 10 : "auto"
        }
      }}
      connectModal={{
        title: connectModalText,
        showThirdwebBranding: false
      }}
      // detailsButton={{
      //   className: "tw-connected-details",
      //   style: { fontSize: "16px" }
      // }}
      onConnect={() => setLoginType(userType)}
      autoConnect
    />
  );
}

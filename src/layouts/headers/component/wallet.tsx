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
  setLoginType: (type: string | null) => void;
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
      onConnect={() => setLoginType(userType)}
      autoConnect
    />
  );
}

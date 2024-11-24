import { client } from "@/config/thirdwebClients";
import { ConnectButton } from "thirdweb/react";

export function WalletComponents() {
  return (
    <ConnectButton
      client={client}
      signInButton={{
        style: {
          fontFamily: "Lexend"
        }
      }}
    />
  );
}

import { client } from "@/config/thirdwebClients";
import { ConnectButton } from "thirdweb/react";

export function WalletComponents() {
  return (
    <ConnectButton
      client={client}
      detailsButton={{
        className: "tw-connected-details",
        style: { fontSize: "16px" }
      }}
    />
  );
}

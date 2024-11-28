import { client } from "@/config/thirdwebClient";
import { ConnectButton } from "thirdweb/react";

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
      client={client}
      connectButton={{
        label: text
      }}
      connectModal={{
        title: connectModalText
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

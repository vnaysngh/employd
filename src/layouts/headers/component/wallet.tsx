import {
  ConnectWallet,
  Wallet,
  WalletDropdownDisconnect
} from "@coinbase/onchainkit/wallet";
import { Address, Avatar, Name, Identity } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { useAccount } from "wagmi";

export function WalletComponents() {
  const { address } = useAccount();
  return (
    <>
      {!address ? (
        <Wallet>
          <ConnectWallet
            className={`cb-wallet-connect`}
            text="Login with Coinbase"
          >
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
        </Wallet>
      ) : (
        <>
          {/* {address} */}
          <WalletDropdownDisconnect className="cb-wallet-disconnect" />
        </>
      )}
    </>
  );
}

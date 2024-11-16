import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains"; // add baseSepolia for testing
import { coinbaseWallet } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [base, baseSepolia], // add baseSepolia for testing
    connectors: [
      coinbaseWallet({
        appName: "OnchainKit",
        preference: "all",
        version: "4"
      })
    ],
    storage: createStorage({
      storage: cookieStorage
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http() // add baseSepolia for testing
    }
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}

import "@coinbase/onchainkit/styles.css";
import "./globals.scss";
import { Providers } from "@/wallet/provider";
import type { Metadata } from "next";
// import { EB_Garamond } from "next/font/google";
// import localFont from "next/font/local";
import { Chango, Josefin_Sans, Varela_Round } from "next/font/google";
import { StateContextProvider } from "@/context";

const varelaRound = Varela_Round({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "employd",
  description:
    "A decentralized job portal for verified work credentials through on-chain attestations"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${varelaRound.className}`}
      >
        <Providers>
          <StateContextProvider>{children}</StateContextProvider>
        </Providers>
      </body>
    </html>
  );
}

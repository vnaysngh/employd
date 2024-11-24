import "./globals.scss";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { Lexend, Varela_Round } from "next/font/google";
import { StateContextProvider } from "@/context";

const lexend = Lexend({ weight: "300", subsets: ["latin"] });

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
      <body suppressHydrationWarning={true} className={`${lexend.className}`}>
        <ThirdwebProvider>
          <StateContextProvider>{children}</StateContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

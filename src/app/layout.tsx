import "./globals.scss";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { Poppins } from "next/font/google";
import { StateContextProvider } from "@/context";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "employd",
  description:
    "Building the future of work with blockchain-verified professional networks."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true} className={`${poppins.className}`}>
        <ThirdwebProvider>
          <StateContextProvider>{children}</StateContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

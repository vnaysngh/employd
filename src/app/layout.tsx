import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";

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
      ></body>
    </html>
  );
}

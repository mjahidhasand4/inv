import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FunFlee",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
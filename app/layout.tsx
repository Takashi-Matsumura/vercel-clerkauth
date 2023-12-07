import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen ">
          <Nav />
          <div className="flex flex-col items-center justify-between p-4">
            {children}
          </div>
          <footer className="flex justify-center items-center pt-10">
            Copyright
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

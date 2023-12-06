"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <nav className="flex items-center justify-between w-full p-5 border-b-2">
      <Link href="/">
        <h3>Next.js Auth Tutorial</h3>
      </Link>
      <ul className="flex items-center justify-between space-x-4">
        {isLoaded && user && <UserButton afterSignOutUrl="/" />}
      </ul>
    </nav>
  );
}

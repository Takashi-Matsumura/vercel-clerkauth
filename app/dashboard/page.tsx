"use client";

import React from "react";
import Link from "next/link";
import DateNav from "../components/DateNav";

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <DateNav />

      <div className="flex items-center space-x-10">
        <Link href="/camera">
          <button className="bg-green-600 text-white hover:bg-green-900 px-5 py-2 w-32 h-20">
            Begin
          </button>
        </Link>
        <Link href="/camera">
          <button className="bg-orange-600 text-white hover:bg-orange-900 px-5 py-2 w-32 h-20">
            End
          </button>
        </Link>
      </div>

      <div className="flex flex-col w-full border items-center pb-52">
        today plan
      </div>
    </div>
  );
}

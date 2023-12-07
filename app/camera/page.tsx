import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1>Camera page</h1>
      <Link href="/dashboard">
        <button className="bg-black text-white rounded-full hover:bg-blue-900 px-5 py-2 w-32">
          Cancel
        </button>
      </Link>
    </div>
  );
}

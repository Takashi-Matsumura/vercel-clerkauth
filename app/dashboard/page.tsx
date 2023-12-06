import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1>Dashboard page</h1>

      <div className="flex items-center space-x-10">
        <Link href="/camera">
          <button className="bg-green-600 text-white rounded-3xl hover:bg-green-900 px-5 py-2 w-32">
            Begin
          </button>
        </Link>
        <Link href="/camera">
          <button className="bg-orange-600 text-white rounded-3xl hover:bg-orange-900 px-5 py-2 w-32">
            End
          </button>
        </Link>
      </div>

      <div className="flex flex-col border items-center px-10 pb-52">
        today's plan
      </div>
    </div>
  );
}

import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <main>
      <div className="flex flex-col justify-center items-center space-y-7">
        <h1>Next.js Auth Tutorial</h1>
        <Image src="/next.svg" alt="Next.js logo" width="200" height="200" />
        <Link href="/sign-in">
          <button className="bg-black text-white rounded-xl hover:bg-blue-900 px-5 py-2 w-32">
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}

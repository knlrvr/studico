'use client'

import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";



export default function Home() {

  return (
    <main className="flex flex-col pt-24 px-4">

      <Unauthenticated>
        <p>Unauthenticated Home Page</p>
      </Unauthenticated>

      <Authenticated>
        <p>Authenticated Home Page</p>

        <Link href='/dashboard'>Go to dashboard</Link>
      </Authenticated>
    </main>
  );
}

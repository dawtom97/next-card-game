"use client";

import { Toaster } from "sonner";

// pages/index.tsx

export default function Home() {

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-10">Hello</h1>
      <Toaster richColors position="top-center" />
    </div>
  )
}

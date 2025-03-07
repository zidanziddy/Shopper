"use client";  // ✅ Make this a Client Component

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

"use client";

import type { ReactNode } from "react";
import Menu from "@/components/Menu";
import { MenuProvider } from "@/app/hooks/menuContext";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <MenuProvider>
      <main className="min-h-screen">{children}</main>
      <Menu />
    </MenuProvider>
  );
}

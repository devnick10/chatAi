"use client";

import ClientGuard from "@/components/clientGuard";
import DashboardLayoutContent from "./dashabordLayoutContent";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientGuard>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ClientGuard>
  );
}

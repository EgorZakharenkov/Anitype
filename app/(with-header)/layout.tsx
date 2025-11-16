import { Header } from "@/components/header";
import { ReactNode } from "react";
import { FallingLeavesClient } from "@/components/falling-leaves/falling-leaves-client";

export default function LayoutWithHeader({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <Header />
      {children}
      <FallingLeavesClient />
    </div>
  );
}

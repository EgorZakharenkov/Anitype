import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { FallingLeavesClient } from "@/components/layout/FallingLeaves/falling-leaves-client";

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

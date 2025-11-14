"use client";
import dynamic from "next/dynamic";

export const FallingLeavesClient = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => null,
});

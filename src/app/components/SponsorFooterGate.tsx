"use client";

import { usePathname } from "next/navigation";

type Props = { children: React.ReactNode };

export default function SponsorFooterGate({ children }: Props) {
  const pathname = usePathname();
  if (pathname?.startsWith("/sample")) return null;
  return children;
}

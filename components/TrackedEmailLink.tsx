"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { trackContact } from "@/lib/meta-events";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function TrackedEmailLink({
  href,
  children,
  className,
  style,
}: Props) {
  const pathname = usePathname() ?? "";
  return (
    <a
      href={href}
      onClick={() => {
        try {
          trackContact(pathname);
        } catch {
          // Never block navigation.
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

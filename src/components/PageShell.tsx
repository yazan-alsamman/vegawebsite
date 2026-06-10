import type { ReactNode } from "react";
import PageBackground from "./PageBackground";

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PageBackground />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

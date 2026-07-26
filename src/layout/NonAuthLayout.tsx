import type { ReactNode } from "react";

interface NonAuthLayoutProps {
  children: ReactNode;
}

export const NonAuthLayout = ({ children }: NonAuthLayoutProps) => {
  return <div style={{ minHeight: "100vh", padding: 24 }}>{children}</div>;
};

import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div style={{ minHeight: "100vh", padding: 24 }}>{children}</div>;
};

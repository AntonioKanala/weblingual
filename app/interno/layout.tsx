import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel interno · Clínica Lingual",
  robots: { index: false, follow: false },
};

export default function InternoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]"
      style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}

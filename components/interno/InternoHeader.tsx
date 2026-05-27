import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export function InternoHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/interno/agenda" className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A96E]">
            Clínica Lingual
          </span>
          <span className="text-sm font-semibold text-[#1A1A1A]">Panel interno · Evaluaciones</span>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}

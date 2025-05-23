"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    href: "/challenges",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#fff"/><path d="M8 14h12M14 8v12" stroke="#44743A" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    label: "Challenges",
  },
  {
    href: "/statistieken",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#fff"/><path d="M9 19V9m5 10V9m5 10V9" stroke="#44743A" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    label: "Statistieken",
  },
  {
    href: "/evenementen",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#fff"/><rect x="8" y="10" width="12" height="10" rx="2" fill="#44743A"/><path d="M10 8v2m8-2v2" stroke="#44743A" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    label: "Evenementen",
  },
  {
    href: "/sponsoren",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#fff"/><path d="M14 8l5 8H9l5-8zm0 2.5L11.5 16h5L14 10.5z" fill="#44743A"/></svg>
    ),
    label: "Sponsoren",
  },
  {
    href: "/feedback",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#fff"/><path d="M10 12h8M10 16h5" stroke="#44743A" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    label: "Feedback",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-20 bg-[#44743A] rounded-tr-3xl rounded-br-3xl h-screen max-h-screen sticky top-0 flex flex-col items-center">
      <div className="mb-12 mt-2">
        {/* Logo als link naar home */}
        <Link href="/">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M24 8l8 14H16l8-14zm0 3.5L18.5 22h11L24 11.5z" fill="#fff"/></svg>
        </Link>
      </div>
      <nav className="flex flex-col gap-8 flex-1 justify-center">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center group ${pathname === item.href ? "text-yellow-400" : "text-white"}`}>
            <span className={`transition-all ${pathname === item.href ? "scale-110" : "opacity-80 group-hover:opacity-100"}`}>{item.icon}</span>
            <span className="sr-only">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto mb-4">
        <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#fff"/><path d="M18 14H10m0 0l4-4m-4 4l4 4" stroke="#44743A" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </div>
    </aside>
  );
} 
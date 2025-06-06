"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const sidebarItems = [
  {
    href: "/challenges",
    icon: (
      <Image
        src="/Challenges.png"
        alt="Challenges"
        width={28}
        height={28}
        priority
      />
    ),
    label: "Challenges",
  },
  {
    href: "/statistieken",
    icon: (
      <Image
        src="/Stats.png"
        alt="Statistieken"
        width={28}
        height={28}
        priority
      />
    ),
    label: "Statistieken",
  },
  {
    href: "/evenementen",
    icon: (
      <Image
        src="/Events.png"
        alt="Evenementen"
        width={28}
        height={28}
        priority
      />
    ),
    label: "Evenementen",
  },
  {
    href: "/sponsoren",
    icon: (
      <Image
        src="/Sponsors.png"
        alt="Sponsoren"
        width={28}
        height={28}
        priority
      />
    ),
    label: "Sponsoren",
  },
  {
    href: "/feedback",
    icon: (
      <Image
        src="/Feedback.png"
        alt="Feedback"
        width={28}
        height={28}
        priority
      />
    ),
    label: "Feedback",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-20 bg-[#44743A] h-screen max-h-screen sticky top-0 flex flex-col items-center">
      <div className="mb-12 mt-6">
        {/* Logo als link naar home */}
        <Link href="/">
          <Image src="/Logo.png" alt="Logo" width={36} height={36} priority />
        </Link>
      </div>
      <nav className="flex flex-col gap-8 flex-1 justify-center">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center group ${
              pathname === item.href ? "text-yellow-400" : "text-white"
            }`}
          >
            <span
              className={`transition-all ${
                pathname === item.href
                  ? "scale-110"
                  : "opacity-80 group-hover:opacity-100"
              }`}
            >
              {item.icon}
            </span>
            <span className="sr-only">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto mb-4">
        <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
          <rect width="28" height="28" rx="8" fill="#fff" />
          <path
            d="M18 14H10m0 0l4-4m-4 4l4 4"
            stroke="#44743A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </aside>
  );
}

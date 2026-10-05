import { BRAND } from "../brand";

export function LogoMark({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M4 6a2 2 0 0 1 2-2h11.2a2 2 0 0 1 1.4.6l9.8 9.8a2 2 0 0 1 0 2.8l-11 11a2 2 0 0 1-2.8 0L4.6 18.4A2 2 0 0 1 4 17V6Z" fill="currentColor" />
      <circle cx="11" cy="11" r="2.6" className="fill-paper" />
      <path d="M17 4 28.4 15.4" stroke="#b4532a" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className = "" }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-display text-2xl font-medium tracking-tight">{BRAND.name}</span>
    </span>
  );
}

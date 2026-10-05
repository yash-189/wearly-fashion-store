import { BRAND } from "../brand";
import { LogoMark } from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-paper-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-medium">
            <LogoMark size={22} />
            {BRAND.name}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{BRAND.tagline}</p>
        </div>
        <p className="text-xs text-ink-faint">
          Demo store · Product data from{" "}
          <a href="https://dummyjson.com" className="underline underline-offset-4 hover:text-ink">
            DummyJSON
          </a>
        </p>
      </div>
    </footer>
  );
}

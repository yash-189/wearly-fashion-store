import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, setCartOpen } from "../features/cart/cartSlice";
import { BagIcon, SearchIcon } from "./Icons";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const count = useSelector(selectCartCount);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) setQuery("");
  }, [location.pathname]);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search/${encodeURIComponent(q)}`);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md transition-colors ${
        scrolled ? "border-paper-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:gap-8 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          <Link to="/" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <a href="/#catalog" className="transition-colors hover:text-ink">
            New in
          </a>
        </nav>

        <form onSubmit={submit} className="ml-auto flex-1 sm:max-w-xs" role="search">
          <label className="group flex h-10 items-center gap-2 rounded-full border border-paper-line bg-white px-4 transition-colors focus-within:border-ink">
            <SearchIcon className="shrink-0 text-ink-faint group-focus-within:text-ink" width={18} height={18} />
            <span className="sr-only">Search products</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full border-0 bg-transparent p-0 text-sm placeholder:text-ink-faint focus:ring-0"
            />
          </label>
        </form>

        <button
          onClick={() => dispatch(setCartOpen(true))}
          className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-dim"
          aria-label={`Open cart, ${count} items`}
        >
          <BagIcon />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white animate-fade-in">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

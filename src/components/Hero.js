import { useSelector } from "react-redux";
import { selectProductList } from "../features/items/itemSlice";
import { ArrowIcon } from "./Icons";

const FEATURED = ["womens-dresses", "womens-bags", "mens-shoes"];

export default function Hero() {
  const products = useSelector(selectProductList);
  const picks = FEATURED.map((c) => products.find((p) => p.category === c));

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-8 pt-10 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-16 lg:gap-16 lg:px-8">
      <div>
        <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tightest sm:text-6xl lg:text-7xl">
          New in
          <br />
          for autumn
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          Dresses, shirts, shoes and bags for everyday wear.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#catalog"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Shop now
            <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-sm text-ink-soft">Free shipping over $150</p>
        </div>
      </div>

      <div className="grid h-[360px] grid-cols-2 grid-rows-2 gap-3 sm:h-[460px] sm:gap-4">
        {picks.map((p, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-3xl ${
              i === 0 ? "row-span-2 bg-[#ece4d8]" : i === 1 ? "bg-paper-dim" : "bg-[#e6e1d9]"
            }`}
          >
            {p ? (
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-contain p-6 mix-blend-multiply animate-fade-in"
              />
            ) : (
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

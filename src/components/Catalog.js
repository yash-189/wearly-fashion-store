import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchitems } from "../features/items/api";
import { selectItemError, selectItemStatus, selectProductList } from "../features/items/itemSlice";
import { SORTS, formatCategory } from "../utils/format";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

export default function Catalog({ query = "", title, subtitle }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const status = useSelector(selectItemStatus);
  const error = useSelector(selectItemError);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? products.filter((p) => p.title.toLowerCase().includes(q)) : products;
  }, [products, query]);

  const categories = useMemo(() => [...new Set(matches.map((p) => p.category))], [matches]);

  const visible = useMemo(() => {
    const list = category === "all" ? matches : matches.filter((p) => p.category === category);
    return [...list].sort(SORTS[sort].fn);
  }, [matches, category, sort]);

  const loading = status === "loading" && products.length === 0;

  return (
    <section id="catalog" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-ink-soft">{subtitle}</p>}
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border-paper-line bg-white py-2 pl-4 pr-9 text-sm text-ink focus:border-ink focus:ring-0"
          >
            {Object.entries(SORTS).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {categories.length > 1 && (
        <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                category === c
                  ? "border-ink bg-ink text-paper"
                  : "border-paper-line bg-white text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c === "all" ? "All" : formatCategory(c)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {loading && Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}
        {!loading && visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {status === "error" && products.length === 0 && (
        <div className="mx-auto max-w-sm py-16 text-center">
          <p className="font-display text-2xl">Couldn't load products</p>
          <p className="mt-2 text-sm text-ink-soft">{error}</p>
          <button
            onClick={() => dispatch(fetchitems())}
            className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper hover:bg-accent"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && status !== "error" && visible.length === 0 && (
        <div className="mx-auto max-w-sm py-16 text-center">
          <p className="font-display text-2xl">Nothing found</p>
          <p className="mt-2 text-sm text-ink-soft">Try a different search or browse all products.</p>
        </div>
      )}
    </section>
  );
}

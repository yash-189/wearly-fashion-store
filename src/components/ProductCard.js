import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { formatCategory, formatPrice } from "../utils/format";
import { StarIcon } from "./Icons";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-dim">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <button
          onClick={() => dispatch(addToCart(product))}
          className="absolute inset-x-3 bottom-3 rounded-full bg-ink py-2.5 text-sm font-medium text-paper transition-all duration-300 hover:bg-accent sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus:translate-y-0 sm:focus:opacity-100"
        >
          Add to bag
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-ink-faint">{formatCategory(product.category)}</p>
          <h3 className="mt-1 truncate text-[15px] font-medium">{product.title}</h3>
        </div>
        <p className="shrink-0 text-[15px] font-medium tabular-nums">{formatPrice(product.price)}</p>
      </div>

      <div className="mt-1.5 flex items-center gap-1 text-ink-soft" aria-label={`Rated ${product.rate} out of 5`}>
        <StarIcon filled className="text-accent" />
        <span className="text-xs tabular-nums">{product.rate?.toFixed(1)}</span>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-dim">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
      <div className="mt-4 h-3 w-1/3 rounded bg-paper-dim" />
      <div className="mt-2 h-4 w-2/3 rounded bg-paper-dim" />
    </div>
  );
}

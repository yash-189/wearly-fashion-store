import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { StarIcon } from "../components/Icons";
import { addToCart } from "../features/cart/cartSlice";
import { fetchSingleItem } from "../features/items/api";
import { selectDetailStatus, selectProductList, selectSingleItem } from "../features/items/itemSlice";
import { formatCategory, formatPrice } from "../utils/format";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector(selectSingleItem);
  const status = useSelector(selectDetailStatus);
  const products = useSelector(selectProductList);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchSingleItem(id));
    setActive(0);
    setQty(1);
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const product = item && String(item.id) === id ? item : null;

  const related = useMemo(
    () =>
      product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : [],
    [products, product]
  );

  if (status === "error") {
    return (
      <div className="mx-auto max-w-sm px-4 py-24 text-center">
        <p className="font-display text-3xl">Product not found</p>
        <Link to="/" className="mt-6 inline-block text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
          Back to the shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8" aria-hidden>
        <div className="aspect-square animate-pulse rounded-3xl bg-paper-dim" />
        <div className="space-y-4 pt-6">
          <div className="h-4 w-1/4 rounded bg-paper-dim" />
          <div className="h-10 w-3/4 rounded bg-paper-dim" />
          <div className="h-6 w-1/5 rounded bg-paper-dim" />
          <div className="h-24 w-full rounded bg-paper-dim" />
        </div>
      </div>
    );
  }

  const add = () => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="text-sm text-ink-faint" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/?category=${product.category}`} className="hover:text-ink">
            {formatCategory(product.category)}
          </Link>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-paper-dim">
            <img
              src={product.images[active]}
              alt={product.title}
              className="h-full w-full object-contain p-10 mix-blend-multiply"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.slice(0, 5).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={active === i}
                  className={`h-20 w-20 overflow-hidden rounded-xl bg-paper-dim ring-offset-2 ring-offset-paper transition ${
                    active === i ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-contain p-2 mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:pt-4">
          {product.brand && <p className="text-sm text-ink-soft">{product.brand}</p>}
          <h1 className="mt-1 font-display text-4xl font-medium tracking-tight sm:text-5xl">{product.title}</h1>

          <div className="mt-4 flex items-center gap-4">
            <p className="text-2xl tabular-nums">{formatPrice(product.price)}</p>
            <span className="flex items-center gap-1 text-sm text-ink-soft">
              <StarIcon filled className="text-accent" />
              {product.rate.toFixed(1)}
              {product.reviews.length > 0 && <span>({product.reviews.length} reviews)</span>}
            </span>
          </div>

          <p className="mt-6 max-w-prose leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex h-12 items-center rounded-full border border-paper-line bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-12 w-12 rounded-full text-ink-soft hover:text-ink"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock || 10, q + 1))}
                className="h-12 w-12 rounded-full text-ink-soft hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={add}
              disabled={product.stock === 0}
              className="h-12 flex-1 rounded-full bg-ink text-sm font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {product.stock === 0 ? "Out of stock" : "Add to bag"}
            </button>
          </div>
          {product.stock > 0 && product.stock < 10 && (
            <p className="mt-3 text-sm text-accent">Only {product.stock} left</p>
          )}

          <dl className="mt-10 divide-y divide-paper-line border-y border-paper-line text-sm">
            {[
              ["Shipping", product.shipping],
              ["Returns", product.returns],
              ["Warranty", product.warranty],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      {product.reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-medium">Reviews</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {product.reviews.map((r, i) => (
              <li key={i} className="rounded-2xl border border-paper-line bg-white p-5">
                <div className="flex gap-0.5 text-accent" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, n) => (
                    <StarIcon key={n} filled={n < r.rating} />
                  ))}
                </div>
                <p className="mt-3">{r.comment}</p>
                <p className="mt-3 text-xs text-ink-faint">{r.reviewerName}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-medium">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

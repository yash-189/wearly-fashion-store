import { Link, Navigate, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/format";

export default function OrderConfirmedPage() {
  const { state: order } = useLocation();

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight">Thanks, {order.name}</h1>
      <p className="mt-3 text-ink-soft">
        Your order <span className="font-medium text-ink">{order.number}</span> is confirmed.
      </p>

      <ul className="mt-10 divide-y divide-paper-line rounded-3xl bg-paper-dim px-6 text-left">
        {order.lines.map((l) => (
          <li key={l.id} className="flex items-center gap-4 py-4">
            <img src={l.image} alt="" className="h-12 w-12 rounded-lg bg-white object-contain p-1" />
            <p className="flex-1 truncate text-sm">
              {l.title} <span className="text-ink-faint">× {l.qty}</span>
            </p>
            <p className="text-sm tabular-nums">{formatPrice(l.price * l.qty)}</p>
          </li>
        ))}
        <li className="flex justify-between py-4 font-medium">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </li>
      </ul>

      <Link
        to="/"
        className="mt-10 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        Continue shopping
      </Link>
    </div>
  );
}

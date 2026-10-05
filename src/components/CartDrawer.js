import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartLines,
  selectCartOpen,
  selectCartTotal,
  setCartOpen,
  setQty,
} from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";
import { BagIcon, CloseIcon } from "./Icons";

const FREE_SHIPPING = 150;

export default function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(selectCartOpen);
  const lines = useSelector(selectCartLines);
  const total = useSelector(selectCartTotal);
  const close = () => dispatch(setCartOpen(false));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && dispatch(setCartOpen(false));
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dispatch]);

  if (!open) return null;

  const remaining = Math.max(0, FREE_SHIPPING - total);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="absolute inset-0 bg-ink/30 animate-fade-in" onClick={close} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between border-b border-paper-line px-6 py-5">
          <h2 className="font-display text-2xl font-medium">Your bag</h2>
          <button onClick={close} className="rounded-full p-2 hover:bg-paper-dim" aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <BagIcon width={40} height={40} className="text-ink-faint" />
            <p className="font-display text-xl">Your bag is empty</p>
            <button onClick={close} className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-paper-line px-6 py-4">
              <p className="text-sm text-ink-soft">
                {remaining > 0 ? (
                  <>
                    Add <span className="font-medium text-ink">{formatPrice(remaining)}</span> for free shipping
                  </>
                ) : (
                  "You've unlocked free shipping"
                )}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-dim">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-paper-line overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-5">
                  <div className="h-24 w-20 shrink-0 rounded-xl bg-paper-dim">
                    <img src={l.image} alt="" className="h-full w-full object-contain p-2 mix-blend-multiply" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="truncate text-sm font-medium">{l.title}</p>
                      <p className="text-sm tabular-nums">{formatPrice(l.price * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-paper-line">
                        <button
                          onClick={() => dispatch(setQty({ id: l.id, qty: l.qty - 1 }))}
                          className="h-8 w-8 rounded-full text-ink-soft hover:text-ink"
                          aria-label={`Decrease ${l.title}`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                        <button
                          onClick={() => dispatch(setQty({ id: l.id, qty: l.qty + 1 }))}
                          className="h-8 w-8 rounded-full text-ink-soft hover:text-ink"
                          aria-label={`Increase ${l.title}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(l.id))}
                        className="text-xs text-ink-faint underline-offset-4 hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-paper-line px-6 py-5">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span className="font-medium tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">Taxes and shipping calculated at checkout.</p>
              <button className="mt-4 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent">
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

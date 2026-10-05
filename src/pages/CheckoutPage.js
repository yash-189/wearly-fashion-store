import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, selectCartLines, selectCartTotal } from "../features/cart/cartSlice";
import { FREE_SHIPPING, SHIPPING_FEE, formatPrice } from "../utils/format";

const FIELDS = [
  { name: "email", label: "Email", type: "email", autoComplete: "email", span: 2 },
  { name: "firstName", label: "First name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", autoComplete: "family-name" },
  { name: "address", label: "Address", autoComplete: "street-address", span: 2 },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "postcode", label: "Postcode", autoComplete: "postal-code" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", span: 2 },
];

const validate = (values) => {
  const errors = {};
  for (const f of FIELDS) if (!values[f.name]?.trim()) errors[f.name] = `Enter your ${f.label.toLowerCase()}`;
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email";
  if (values.phone && !/^[\d\s+()-]{7,}$/.test(values.phone)) errors.phone = "Enter a valid phone number";
  return errors;
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lines = useSelector(selectCartLines);
  const subtotal = useSelector(selectCartTotal);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-sm px-4 py-24 text-center">
        <p className="font-display text-3xl">Your bag is empty</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-accent">
          Continue shopping
        </Link>
      </div>
    );
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const order = {
        number: `WR-${Date.now().toString().slice(-6)}`,
        name: values.firstName,
        lines,
        total,
      };
      dispatch(clearCart());
      navigate("/order-confirmed", { replace: true, state: order });
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-medium tracking-tight">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        <form onSubmit={onSubmit} noValidate className="space-y-10">
          <fieldset>
            <legend className="text-lg font-medium">Contact and delivery</legend>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {FIELDS.map((f) => (
                <div key={f.name} className={f.span === 2 ? "col-span-2" : "col-span-2 sm:col-span-1"}>
                  <label htmlFor={f.name} className="text-sm text-ink-soft">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    value={values[f.name] ?? ""}
                    onChange={onChange}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                    className={`mt-1 h-12 w-full rounded-xl border bg-white px-4 focus:ring-0 ${
                      errors[f.name] ? "border-accent focus:border-accent" : "border-paper-line focus:border-ink"
                    }`}
                  />
                  {errors[f.name] && (
                    <p id={`${f.name}-error`} className="mt-1 text-sm text-accent">
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg font-medium">Payment</legend>
            <label className="mt-4 flex items-center gap-3 rounded-xl border border-ink bg-white p-4">
              <input type="radio" checked readOnly className="h-4 w-4 accent-ink" />
              <span>
                <span className="block font-medium">Pay on delivery</span>
                <span className="text-sm text-ink-soft">This is a demo store, so no payment is taken.</span>
              </span>
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={placing}
            className="h-14 w-full rounded-full bg-ink text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
          >
            {placing ? "Placing order..." : `Place order · ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-paper-dim p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-medium">Order summary</h2>
          <ul className="mt-4 divide-y divide-paper-line">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-4 py-4">
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white">
                  <img src={l.image} alt="" className="h-full w-full object-contain p-1.5" />
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] text-paper">
                    {l.qty}
                  </span>
                </div>
                <p className="flex-1 truncate text-sm">{l.title}</p>
                <p className="text-sm tabular-nums">{formatPrice(l.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-paper-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-paper-line pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

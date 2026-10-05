const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (value) => price.format(value);

export const formatCategory = (slug = "") =>
  slug
    .split("-")
    .map((w) => (w === "womens" ? "Women's" : w === "mens" ? "Men's" : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

export const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  rating: { label: "Top rated", fn: (a, b) => b.rate - a.rate },
};

export const FREE_SHIPPING = 150;
export const SHIPPING_FEE = 9.99;

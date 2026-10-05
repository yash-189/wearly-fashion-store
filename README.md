# Wearly

A fashion storefront built with React, Redux Toolkit and Tailwind CSS. You can browse products, filter and sort them, search, and add items to a shopping bag. Product data comes from the free [DummyJSON](https://dummyjson.com) API.

![Wearly mockup](docs/mockup.jpg)

## Features

- Category filters, sorting by price or rating, and a responsive product grid
- Search from the header
- Shopping bag drawer with quantity controls, subtotal and a free shipping progress bar, saved in localStorage
- Skeleton loaders, error state with retry, and empty search results
- Keyboard support (Esc closes the bag), focus rings, ARIA labels and reduced motion support
- 2-column grid and scrollable filter chips on mobile

## Screenshots

| Home | Catalog |
|---|---|
| ![Home](docs/home.jpg) | ![Catalog](docs/catalog.jpg) |

| Shopping bag | Search |
|---|---|
| ![Bag](docs/cart.jpg) | ![Search](docs/search.jpg) |

<img src="docs/mobile.jpg" width="260" alt="Mobile" />

## Design

Headings use Fraunces and body text uses Inter. Colors are a warm off-white, a near-black ink and one rust accent, set as Tailwind theme tokens. The logo is a price tag drawn as an inline SVG.

## Tech stack

React 18 · Redux Toolkit · React Router 6 · Tailwind CSS · Axios

## Structure

```
src/
├── features/
│   ├── items/      # product thunks (createAsyncThunk) and slice
│   └── cart/       # cart slice, persisted to localStorage
├── components/     # Navbar, Hero, Catalog, ProductCard, CartDrawer, Logo
├── pages/          # Home, Search
├── utils/          # price and category formatting, sort options
└── brand.js        # store name and tagline
```

- API responses are mapped to a single product shape in `features/items/api.js`, so the UI doesn't depend on the API format.
- Filtering and sorting are derived with `useMemo`, so nothing is duplicated in the Redux store.

## Run locally

```bash
npm install
npm start
```

No API key is needed. To use another backend, set `REACT_APP_API_URL`.

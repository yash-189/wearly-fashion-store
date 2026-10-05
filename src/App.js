import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { fetchitems } from "./features/items/api";
import { selectProductList } from "./features/items/itemSlice";
import CheckoutPage from "./pages/CheckoutPage";
import Home from "./pages/Home";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";

function Layout() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchitems());
  }, [dispatch, products.length]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search/:searchTerm", element: <SearchPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-confirmed", element: <OrderConfirmedPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

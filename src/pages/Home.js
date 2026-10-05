import Catalog from "../components/Catalog";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Catalog title="All products" subtitle="Women's and men's clothing, shoes and accessories." />
    </>
  );
}

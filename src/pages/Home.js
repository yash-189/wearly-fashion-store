import Catalog from "../components/Catalog";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Catalog title="The edit" subtitle="Hand-picked pieces across women's and men's fashion." />
    </>
  );
}

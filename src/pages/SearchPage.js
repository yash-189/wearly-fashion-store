import { useParams } from "react-router-dom";
import Catalog from "../components/Catalog";

export default function SearchPage() {
  const { searchTerm = "" } = useParams();

  return <Catalog query={searchTerm} title={`Results for “${searchTerm}”`} />;
}

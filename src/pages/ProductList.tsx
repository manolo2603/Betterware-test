import { useEffect } from "react";
import { useProductsStore } from "../store/productsStore";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";

export function ProductList() {
  const products = useProductsStore((state) => state.products);
  const status = useProductsStore((state) => state.status);
  const error = useProductsStore((state) => state.error);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (status === "idle" || status === "loading") {
    return <Loader label="Cargando productos..." />;
  }

  if (status === "error") {
    return (
      <ErrorState
        message={error ?? undefined}
        onRetry={() => fetchProducts(true)}
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Productos</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

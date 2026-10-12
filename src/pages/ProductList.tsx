import { Input, Select, SelectItem } from "@heroui/react";
import { ALL_CATEGORIES, useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { SearchIcon } from "../components/icons";

export function ProductList() {
  const {
    status,
    error,
    search,
    setSearch,
    category,
    setCategory,
    categoryOptions,
    filteredProducts,
    retry,
  } = useProducts();

  if (status === "idle" || status === "loading") {
    return <Loader label="Cargando productos..." />;
  }

  if (status === "error") {
    return <ErrorState message={error ?? undefined} onRetry={retry} />;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Productos</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          isClearable
          placeholder="Buscar por nombre"
          value={search}
          onValueChange={setSearch}
          onClear={() => setSearch("")}
          startContent={<SearchIcon />}
          className="w-full sm:max-w-xs"
          aria-label="Buscar productos"
        />
        <Select
          items={categoryOptions}
          selectedKeys={[category]}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0];
            setCategory(value ? String(value) : ALL_CATEGORIES);
          }}
          className="w-full sm:max-w-xs"
          aria-label="Filtrar por categoria"
        >
          {(option) => (
            <SelectItem
              key={option.key}
              className={option.key === ALL_CATEGORIES ? undefined : "capitalize"}
            >
              {option.label}
            </SelectItem>
          )}
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-12 text-center text-default-500">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

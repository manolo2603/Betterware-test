import { useEffect, useMemo, useState } from "react";
import { useProductsStore } from "../store/productsStore";

export const ALL_CATEGORIES = "all";

export function useProducts() {
  const products = useProductsStore((state) => state.products);
  const categories = useProductsStore((state) => state.categories);
  const status = useProductsStore((state) => state.status);
  const error = useProductsStore((state) => state.error);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const fetchCategories = useProductsStore((state) => state.fetchCategories);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const categoryOptions = useMemo(
    () => [
      { key: ALL_CATEGORIES, label: "Todas las categorias" },
      ...categories.map((item) => ({ key: item, label: item })),
    ],
    [categories]
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === ALL_CATEGORIES || product.category === category;
      const matchesSearch = product.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return {
    status,
    error,
    search,
    setSearch,
    category,
    setCategory,
    categoryOptions,
    filteredProducts,
    retry: () => fetchProducts(true),
  };
}

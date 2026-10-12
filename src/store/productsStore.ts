import { create } from "zustand";
import { getCategories, getProducts } from "../api/products";
import type { Product } from "../types/product";

type Status = "idle" | "loading" | "success" | "error";

type ProductsState = {
  products: Product[];
  categories: string[];
  status: Status;
  error: string | null;
  fetchProducts: (force?: boolean) => Promise<void>;
  fetchCategories: () => Promise<void>;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  status: "idle",
  error: null,
  fetchProducts: async (force = false) => {
    const { status, products } = get();
    if (status === "loading") return;
    if (!force && products.length > 0) return;

    set({ status: "loading", error: null });
    try {
      const data = await getProducts();
      set({ products: data, status: "success" });
    } catch {
      set({
        status: "error",
        error: "No se pudieron cargar los productos",
      });
    }
  },
  fetchCategories: async () => {
    if (get().categories.length > 0) return;
    try {
      const data = await getCategories();
      set({ categories: data });
    } catch {
      set({ categories: [] });
    }
  },
}));

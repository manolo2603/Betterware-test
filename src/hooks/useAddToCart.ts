import { addToast } from "@heroui/react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem);

  return (product: Product) => {
    addItem(product);
    addToast({
      title: "Agregado al carrito",
      description: product.title,
      color: "success",
    });
  };
}

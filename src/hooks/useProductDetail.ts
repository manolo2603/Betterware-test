import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { getProductById } from "../api/products";
import type { Product } from "../types/product";

export function useProductDetail(id: string | undefined) {
  const productId = Number(id);
  const cached = useProductsStore((state) =>
    state.products.find((product) => product.id === productId)
  );

  const [fetched, setFetched] = useState<Product>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (cached || Number.isNaN(productId)) return;

    let active = true;
    getProductById(productId)
      .then((data) => {
        if (active) setFetched(data);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [productId, cached]);

  const product = cached ?? fetched;
  const hasError = Number.isNaN(productId) || failed;

  return { product, hasError };
}

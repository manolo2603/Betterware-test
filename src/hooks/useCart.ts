import { useCartStore } from "../store/cartStore";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    items,
    totalItems,
    totalPrice,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
}

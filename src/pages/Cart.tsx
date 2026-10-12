import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { useCart } from "../hooks/useCart";
import { CartItemRow } from "../components/CartItemRow";
import { CheckoutModal } from "../components/CheckoutModal";
import { formatPrice } from "../utils/format";

export function Cart() {
  const { items, totalItems, totalPrice } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Tu carrito esta vacio</h1>
        <p className="text-default-500">Agrega productos para verlos aqui.</p>
        <Button as={Link} to="/" color="primary">
          Ver productos
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Carrito</h1>

      <div className="flex flex-col">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-4 sm:items-end">
        <div className="flex items-center justify-between gap-8">
          <span className="text-default-600">Productos: {totalItems}</span>
          <span className="text-xl font-bold">
            Total: {formatPrice(totalPrice)}
          </span>
        </div>
        <Button
          color="primary"
          size="lg"
          className="w-full sm:w-auto"
          onPress={() => setIsCheckoutOpen(true)}
        >
          Checkout
        </Button>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </section>
  );
}

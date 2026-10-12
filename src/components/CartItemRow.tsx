import { Button, Image } from "@heroui/react";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/format";
import { TrashIcon } from "./icons";
import type { CartItem } from "../types/product";

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-3 border-b border-default-200 py-4 sm:gap-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-medium bg-white p-2">
        <Image
          src={item.image}
          alt={item.title}
          radius="none"
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-medium">{item.title}</h3>
        <p className="text-xs capitalize text-default-500">{item.category}</p>
        <p className="mt-1 font-bold text-primary">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          aria-label="Disminuir cantidad"
          isDisabled={item.quantity <= 1}
          onPress={() => decreaseQuantity(item.id)}
        >
          -
        </Button>
        <span className="w-6 text-center font-medium">{item.quantity}</span>
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          aria-label="Aumentar cantidad"
          onPress={() => increaseQuantity(item.id)}
        >
          +
        </Button>
      </div>

      <div className="hidden w-24 text-right font-semibold sm:block">
        {formatPrice(item.price * item.quantity)}
      </div>

      <Button
        isIconOnly
        size="sm"
        variant="light"
        color="danger"
        aria-label="Eliminar producto"
        onPress={() => removeItem(item.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}

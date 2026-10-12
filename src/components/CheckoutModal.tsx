import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  addToast,
} from "@heroui/react";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/format";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const handleConfirm = () => {
    clearCart();
    onClose();
    addToast({
      title: "Compra confirmada",
      description: "Gracias por tu compra",
      color: "success",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Resumen de compra</ModalHeader>
        <ModalBody>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="min-w-0 flex-1 truncate">
                  {item.quantity} x {item.title}
                </span>
                <span className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-default-200 pt-4">
            <span className="text-default-600">Productos: {totalItems}</span>
            <span className="font-bold">Total: {formatPrice(totalPrice)}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleConfirm}>
            Confirmar compra
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

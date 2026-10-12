import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  addToast,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/format";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    addToast({
      title: "Agregado al carrito",
      description: product.title,
      color: "success",
    });
  };

  return (
    <Card className="h-full" shadow="sm">
      <CardBody className="flex flex-col gap-3">
        <div className="flex items-center justify-center rounded-medium bg-white p-4">
          <Image
            src={product.image}
            alt={product.title}
            radius="none"
            className="h-44 w-auto object-contain"
          />
        </div>
        <Chip size="sm" variant="flat" color="secondary" className="capitalize">
          {product.category}
        </Chip>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-primary">
          {formatPrice(product.price)}
        </p>
      </CardBody>
      <CardFooter className="flex gap-2">
        <Button
          variant="bordered"
          className="flex-1"
          onPress={() => navigate(`/product/${product.id}`)}
        >
          Ver detalle
        </Button>
        <Button color="primary" className="flex-1" onPress={handleAddToCart}>
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}

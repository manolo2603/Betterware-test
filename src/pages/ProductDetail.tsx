import { useNavigate, useParams } from "react-router-dom";
import { Button, Chip, Image } from "@heroui/react";
import { useProductDetail } from "../hooks/useProductDetail";
import { useAddToCart } from "../hooks/useAddToCart";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { ArrowLeftIcon } from "../components/icons";
import { formatPrice } from "../utils/format";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, hasError } = useProductDetail(id);
  const addToCart = useAddToCart();

  if (hasError) {
    return (
      <ErrorState
        message="No se pudo cargar el producto"
        onRetry={() => navigate(0)}
      />
    );
  }

  if (!product) {
    return <Loader label="Cargando producto..." />;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-6">
      <Button
        variant="light"
        className="mb-4"
        startContent={<ArrowLeftIcon />}
        onPress={() => navigate("/")}
      >
        Regresar al listado
      </Button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-large bg-white p-6">
          <Image
            src={product.image}
            alt={product.title}
            radius="none"
            className="max-h-96 w-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Chip variant="flat" color="secondary" className="capitalize">
            {product.category}
          </Chip>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="leading-relaxed text-default-600">
            {product.description}
          </p>
          <Button
            color="primary"
            size="lg"
            className="mt-2 w-full sm:w-auto"
            onPress={() => addToCart(product)}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </section>
  );
}

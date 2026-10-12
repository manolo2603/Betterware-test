import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Chip, Image, addToast } from "@heroui/react";
import { useProductsStore } from "../store/productsStore";
import { useCartStore } from "../store/cartStore";
import { getProductById } from "../api/products";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { ArrowLeftIcon } from "../components/icons";
import { formatPrice } from "../utils/format";
import type { Product } from "../types/product";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const cached = useProductsStore((state) =>
    state.products.find((product) => product.id === productId)
  );
  const addItem = useCartStore((state) => state.addItem);

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

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    addToast({
      title: "Agregado al carrito",
      description: product.title,
      color: "success",
    });
  };

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
            onPress={handleAddToCart}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </section>
  );
}

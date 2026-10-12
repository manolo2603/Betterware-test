import {
  Badge,
  Button,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { CartIcon } from "./icons";

export function Navbar() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <HeroNavbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <Link to="/" className="text-inherit font-bold">
          Mini e-commerce
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Badge
          color="danger"
          content={totalItems}
          isInvisible={totalItems === 0}
          shape="circle"
        >
          <Button
            isIconOnly
            variant="light"
            aria-label="Ver carrito"
            onPress={() => navigate("/cart")}
          >
            <CartIcon />
          </Button>
        </Badge>
      </NavbarContent>
    </HeroNavbar>
  );
}

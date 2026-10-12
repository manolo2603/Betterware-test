import { Route, Routes, useParams } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProductList } from "./pages/ProductList";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";

function ProductDetailRoute() {
  const { id } = useParams();
  return <ProductDetail key={id} />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetailRoute />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;

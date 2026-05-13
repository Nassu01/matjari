import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/layout/header/Navbar";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/layout/home/Home.jsx";
import Panier from "./pages/panier/Panier";
import Order from "./pages/panier/Order";
import Favorite from "./pages/favorite/Favorite";
import Shop from "./pages/shop/Shop";

export default function App() {
  const cartCount = useSelector((state) => state.cart?.totalQuantity ?? 0);
  const location = useLocation();
  const usesAppShell = ["/shop", "/cart", "/checkout", "/order", "/favorite"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {usesAppShell && <Navbar cartCount={cartCount} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Panier />} />
        <Route path="/checkout" element={<Order />} />
        <Route path="/order" element={<Order />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/privacy" element={<Home />} />
        <Route path="/terms" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {usesAppShell && <Footer />}
    </div>
  );
}

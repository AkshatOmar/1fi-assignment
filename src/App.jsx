import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import BottomNav from "./components/Layout/BottomNav";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import "./styles/index.css";
import "./styles/components.css";

// Lightweight placeholder for nav items not yet in scope
function Placeholder({ icon, title, subtitle }) {
  return (
    <div className="blank-tab page-content">
      <span className="blank-tab__icon">{icon}</span>
      <h1 className="blank-tab__title">{title}</h1>
      <p className="blank-tab__subtitle">{subtitle}</p>
    </div>
  );
}

// Hides BottomNav on the product detail page to give full screen
function BottomNavWrapper() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith("/shop/marketplace/");
  if (isProductPage) return null;
  return <BottomNav />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bottom nav routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/emi-dues"
          element={
            <Placeholder
              icon="₹"
              title="EMI Dues"
              subtitle="Your upcoming EMI payments and due dates will appear here."
            />
          }
        />
        <Route
          path="/limit"
          element={
            <Placeholder
              icon="📊"
              title="Limit"
              subtitle="Your available investment-backed spending limit will be shown here."
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Placeholder
              icon="👤"
              title="Profile"
              subtitle="Your account details and settings will appear here."
            />
          }
        />

        {/* Marketplace product detail */}
        <Route path="/shop/marketplace/:id" element={<ProductPage />} />
      </Routes>

      {/* Persistent bottom nav */}
      <BottomNavWrapper />
    </BrowserRouter>
  );
}

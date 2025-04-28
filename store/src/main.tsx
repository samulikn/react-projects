import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/CartProvider.tsx";
import { ProductsProvider } from "./context/ProductsProvider.tsx";
import { UserProvider } from "./context/AuthProvider.tsx";
import { OrdersProvider } from "./context/OrderProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </StrictMode>
);

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import { useState } from "react";

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <div className="flex flex-col h-screen">
      <Header viewCart={viewCart} setViewCart={setViewCart} />
        {pageContent}
      <Footer viewCart={viewCart} />
    </div>
  );

  return content;
}

export default App;

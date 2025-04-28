import Layout from "./components/Layout";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Missing from "./components/Missing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import MyAccount from "./components/MyAccount";
import RequireAuth from "./components/RequireAuth";

function App() {
  // const [viewCart, setViewCart] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(true);
  // const [user, setUser] = useState<String | null>("");

  // const pageContent = viewCart ? <Cart /> : <ProductList />;

  // const content = (
  //   <div className="flex flex-col h-screen">
  //     <Header viewCart={viewCart} setViewCart={setViewCart} />
  //     {pageContent}
  //     <Footer viewCart={viewCart} />
  //   </div>
  // );
  // return content;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout isLogged={isLogged} setIsLogged={setIsLogged} />}
        >
          <Route index element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>

          <Route element={<RequireAuth />}>
            <Route path="myaccount" element={<MyAccount />}></Route>
          </Route>

          <Route path="*" element={<Missing />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

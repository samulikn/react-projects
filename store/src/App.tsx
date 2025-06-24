import Layout from "./components/Layout";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Missing from "./components/Missing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyAccount from "./components/MyAccount";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>

            <Route element={<RequireAuth />}>
              <Route path="myaccount" element={<MyAccount />}></Route>
            </Route>
          </Route>

          <Route path="*" element={<Missing />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import "bootstrap-icons/font/bootstrap-icons.css";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Nav() {
  const { auth } = useAuth();
  const username = auth.name;

  const { totalItems } = useCart();

  const user = auth.accessToken ? (
    <span className="pl-1 text-base md:inline hover:text-teal-700">
      {username}
    </span>
  ) : null;

  const account = user ? "/myaccount" : "/login";

  return (
    <div className="inline-flex justify-end gap-8 text-xl flex-norap">
      <Link to={account}>
        <i className="bi bi-person hover:text-teal-700"> {username}</i>
      </Link>
      <Link to="/cart">
        <div className="inline-flex hover:text-teal-700">
          <i className="bi bi-cart3 cursor-pointer"></i>
          <p className="pl-1">
            Cart: <span>{totalItems}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Nav;

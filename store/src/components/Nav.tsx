import "bootstrap-icons/font/bootstrap-icons.css";
import useCart from "../hooks/useCart";
import { Link, useParams } from "react-router-dom";

type PropsType = {
  isLogged: boolean;
};

function Nav({ isLogged }: PropsType) {
  const { user } = useParams();

  const { totalItems } = useCart();

  const testUser: UserDataType = {
    firstname: "Nata",
    lastName: "Shobotova",
    dateOfBirth: "1986-11-08",
    email: "samulikn@ukr.net",
  };

  type UserDataType = {
    firstname: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
  };

  const userData = isLogged ? testUser : null;

  const username = isLogged ? (
    <span className="pl-1 text-base hidden md:inline hover:text-teal-700">
      {userData?.firstname}
    </span>
  ) : null;

  const account = isLogged ? "/myaccount" : "/login";

  return (
    <div className="inline-flex justify-end gap-8 text-xl flex-norap">
      <Link to={account}>
        <i className="bi bi-person hover:text-teal-700">{username}</i>
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

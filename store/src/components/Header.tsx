import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
  const content = (
    <header className="h-1/7 bg-[#2c2e3d] text-white px-10 py-3 flex justify-between space-x-4 items-center">
      <Link to="/">
        <h1 className="text-xl cursor-pointer hover:text-teal-700">
          Bakehouse
        </h1>
      </Link>
      <Nav />
    </header>
  );

  return content;
};

export default Header;

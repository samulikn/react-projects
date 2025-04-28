import Nav from "./Nav";
import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from 'react-router-dom';

type PropsType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isLogged, setIsLogged }: PropsType) => {

  const content = (
    <header className="h-1/7 bg-[#2c2e3d] text-white px-10 py-3 flex justify-between space-x-4 items-center">
      <Link to="/">
        <h1 className="text-xl cursor-pointer hover:text-teal-700">
          Bakehouse
        </h1>
      </Link>
      <Nav isLogged={isLogged} />
    </header>
  );

  return content;
};

export default Header;

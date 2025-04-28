import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

type PropsType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ isLogged, setIsLogged }: PropsType) => {
  return (
    <div className="flex flex-col h-screen">
      <Header isLogged={isLogged} setIsLogged={setIsLogged} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

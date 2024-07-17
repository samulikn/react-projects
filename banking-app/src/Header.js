import logo from "./wheat.png";
import "./App.css";

function Header() {
  return (
    <header className="Header">
      <div className="title-logo">
        <img src={logo} alt="logo" />
        <h1>Bank App</h1>
      </div>
      <hr />
    </header>
  );
}

export default Header;

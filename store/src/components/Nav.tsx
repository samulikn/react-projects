import "bootstrap-icons/font/bootstrap-icons.css";
import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Nav({ viewCart, setViewCart }: PropsType) {
  const { totalItems } = useCart();

  const item = viewCart ? (
    <i className="bi bi-shop" onClick={() => setViewCart(false)}></i>
  ) : (
    <i className="bi bi-cart3" onClick={() => setViewCart(true)}></i>
  );

  return (
    <div className="flex justify-end gap-2 text-xl">
      <nav>{item}</nav>
      <p>Cart: {totalItems}</p>
    </div>
  );
}

export default Nav;

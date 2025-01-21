import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

function Footer({ viewCart }: PropsType) {
  const year: number = new Date().getFullYear();

  const { totalItems, totalPrice } = useCart();

  const content = viewCart ? (
    <p className="text-center">Shopping Cart &copy; {year}</p>
  ) : (
    <>
      <p>Total items: {totalItems}</p>
      <p>TotalPrice: {totalPrice}</p>
      <p className="text-center">Shopping Cart &copy; {year}</p>
    </> 
  );
  return <footer className="h-1/7 mt-20 bg-[#2c2e3d] text-white px-8 py-2">{content}</footer>;
}

export default Footer;

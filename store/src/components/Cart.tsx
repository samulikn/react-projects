import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { AxiosError } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ORDER_URL = "/orders";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>();
  const [error, setError] = useState<string>("");

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const { auth } = useAuth();
  const email = auth.email;

  const axiosPrivate = useAxiosPrivate();

  const onSubmitOrder = async (): Promise<void> => {
    if (auth) {
      try {
        const response = await axiosPrivate.post(
          ORDER_URL,
          JSON.stringify({ email, total: totalPrice, items: cart })
        );
        setOrderId(response.data);
        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
        setConfirm(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 400) {
            setError("Invalid data.");
          } else {
            console.error(err);
          }
        }
      }
    }
  };

  const totalPriceEUR: string = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);

  const content = confirm ? (
    <>
      <h2 className="m-16 mb-auto text-center text-4xl">
        Thank you for order!
      </h2>
      <p className="mx-auto mt-10 text-3xl">
        Your order <span className="text-[#0D707D]"># {orderId}</span>
      </p>
    </>
  ) : (
    <div className="mb-auto">
      <h2 className="ml-16 my-7 text-4xl text-[#0D707D] font-light">
        Shopping Cart:
      </h2>
      <ul className="mt-4 mx-auto flex flex-col w-11/12">
        {cart.map((item) => {
          return (
            <CartItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="mt-10 mr-8 flex flex-col items-end text-xl sm:text-2xl">
        <p>Total items: {totalItems}</p>
        <p>Total price: {totalPriceEUR}</p>
        <button
          disabled={!totalItems}
          onClick={onSubmitOrder}
          className="mt-4 px-4 py-1.5 border-solid border-2 rounded-2xl 
                    bg-[#2C2E3D] text-white active:opacity-45 hover:bg-teal-800"
        >
          Checkout
        </button>
        <p aria-disabled={!error} className="text-red-600">
          {error}
        </p>
      </div>
      <p className="text-center">
        You should{" "}
        <Link to="/login" className="text-lg underline text-teal-800">
          Login
        </Link>{" "}
        or{" "}
        <Link to="/register" className="text-lg underline text-teal-800">
          Register
        </Link>{" "}
        before checkout.
      </p>
    </div>
  );

  return <main className="mb-auto flex flex-col">{content}</main>;
}

export default Cart;

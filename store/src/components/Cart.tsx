import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import CartItem from "./CartItem";
import { axiosPrivate } from "../api/axios";

const ORDER_URL = "/orders";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>();

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const { auth } = useAuth();
  const email = auth.email;

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
        console.error(err);
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
          className="mt-4 px-4 py-1.5 border-solid border-2 rounded-2xl bg-[#2C2E3D] text-white active:bg-teal-800"
        >
          Checkout
        </button>
      </div>
    </div>
  );

  return <main className="mb-auto flex flex-col">{content}</main>;
}

export default Cart;

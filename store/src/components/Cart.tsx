import useCart from "../hooks/useCart";
import { useState } from "react";
import CartItem from "./CartItem";

function Cart() {
  const [confirm, setConfirm] = useState(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
    console.log(cart, totalPrice, totalItems);
  };

  const content = confirm ? (
    <h2 className="m-16 mb-auto text-center text-4xl">Thank you for order.</h2>
  ) : (
    <div className="mb-auto">
      <h2 className="ml-16 my-7 text-4xl text-[#0D707D] font-light">Shopping Cart:</h2>
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
        <p>Total price: {totalPrice}</p>
        <button disabled={!totalItems} onClick={onSubmitOrder}
                className="mt-4 px-4 py-1.5 border-solid border-2 rounded-2xl bg-[#2C2E3D] text-white active:bg-teal-800">
          Checkout
        </button>
      </div>
    </div>
  );

  return (
    <main className="mb-auto flex flex-col">
      {content}
    </main>
  );
}

export default Cart;

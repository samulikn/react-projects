import { ReactElement } from "react";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

export default function ProductList() {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let content: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    content = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return (
    <main className="flex-grow">
      <h2 className="my-5 pl-16 font-light text-4xl text-[#0D707D]">Most Popular</h2>
      <div
        className="mb-auto mx-auto flex flex-col gap-10 w-11/12
                        sm:flex-row sm:flex-wrap"
      >
        {content}
      </div>
    </main>
  );
}

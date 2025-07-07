import { ReactElement } from "react";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

export default function ProductList(): ReactElement | ReactElement[] {
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
      <h2 className="my-5 pl-16 font-light text-4xl text-[#0D707D]">
        Most Popular
      </h2>
      <div className="mb-auto mx-auto w-11/12">
        <div
          className="sm:justify-center-safe flex flex-col
                        sm:flex-row flex-wrap"
        >
          {content}
        </div>
      </div>
    </main>
  );
}

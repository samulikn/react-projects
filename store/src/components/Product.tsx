import React, { ReactElement, memo } from "react";
import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

function Product({
  product,
  dispatch,
  REDUCER_ACTIONS,
}: PropsType): ReactElement {
  const img: string = new URL(`../images/${product.sku}.jpeg`, import.meta.url)
    .href;
  // console.log(img);

  const addToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const content = (
    <article className="p-4 mx-auto sm:mx-5 mb-4 max-w-[280px] flex flex-col justify-end shadow-lg rounded-xl">
      <div className="pb-3 self-center flex justify-center">
        <img src={img} alt={product.name} className="max-h-full max-w-full" />
      </div>
      <h3 className="pl-3 mt-1 md:text-2xl text-sm uppercase font-bold mb-2 text-slate-900">
        {product.name}
      </h3>
      <p className="pl-3 font-bold text-xl mb-2">
        {new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)}
      </p>
      <button
        className="py-1 px-4 bg-[#2c2e3d] text-white text-sm rounded-full self-center cursor-pointer active:bg-teal-800"
        onClick={addToCart}
      >
        ADD TO CART<i className="bi bi-cart3 pl-2"></i>
      </button>
    </article>
  );

  return content;
}

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;

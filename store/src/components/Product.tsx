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

  const addToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const content: ReactElement | ReactElement[] = (
    <article className="p-4 sm:mx-5 m-4 basis-[280px] h-[600px] flex flex-col shadow-lg rounded-xl">
      <div className="pb-3 w-full my-auto">
        <img src={img} alt={product.name} className="" />
      </div>
      <div className="basis-1/3 flex flex-col justify-end">
        <h3 className="pl-3 mt-1 flex-grow md:text-2xl text-sm uppercase font-bold mb-2 text-slate-900">
          {product.name}
        </h3>
        <p className="pl-3 flex-grow text-lg text-gray-500">
          {product.description}
        </p>
        <p className="pl-3 font-bold text-xl mb-2">
          {new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}
        </p>
        <button
          className="py-1 px-4 bg-[#2c2e3d] text-white text-sm rounded-full active:opacity-45 hover:bg-teal-800"
          onClick={addToCart}
        >
          ADD TO CART<i className="bi bi-cart3 pl-2"></i>
        </button>
      </div>
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

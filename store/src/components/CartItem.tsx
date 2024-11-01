import { memo } from "react";

import {
  CartItemType,
  ReducerAction,
  ReducerActionType,
} from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

function CartItem({ item, dispatch, REDUCER_ACTIONS }: PropsType) {
  const img: string = new URL(`../images/${item.sku}.jpeg`, import.meta.url)
    .href;

  const itemSubtotal: number = item.qty * item.price;

  const qtyItemIncrease = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: item,
    });
  };

  const qtyItemDecrease = () => {
    dispatch({
      type: REDUCER_ACTIONS.DELETE,
      payload: item,
    });
  };

  const removeItem = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  const content = (
    <li className="mb-2 mx-auto w-full gap-2 flex flex-wrap items-center justify-end border-b-2 border-gray-50">
      <img src={img} alt={item.name} className="w-8" />
      <div className="sm:pl-4 w-3/12 flex-grow sm:text-2xl">{item.name}</div>
      <div className="sm:pl-6 1/6 text-right sm:text-2xl">
        {new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(item.price)}
      </div>
      <button
        className="sm:pl-6 w-1/12 sm:text-2xl text-right"
        onClick={qtyItemDecrease}
      >
        ⊖
      </button>
      <div className="w-1/12 text-center sm:text-2xl">{item.qty}</div>
      <button
        className="sm:pr-6 w-1/12 sm:text-2xl text-left"
        onClick={qtyItemIncrease}
      >
        ⊕
      </button>
      <button className="sm:px-4 w-1/12" onClick={removeItem}>
        ❌
      </button>
      <div className="w-3/12 sm:w-2/12 px-2 sm:text-2xl text-right">
        {new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(itemSubtotal)}
      </div>
    </li>
  );

  return content;
}

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartItem = memo<typeof CartItem>(CartItem, areItemsEqual);

export default MemoizedCartItem;

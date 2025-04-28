import { CartItemType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  expanded: boolean;
};

function OrderItem({ item, expanded }: PropsType) {
  //retrive order by id and logged user:

  const img: string = new URL(`../images/${item.sku}.jpeg`, import.meta.url)
    .href;

  const content = (
    <>
      <li className="flex items-stretch basis-52 min-w-52 snap-center">
        <img src={img} alt={item.name} className="w-8/12 self-center" />
        <div className="pl-2 flex flex-col justify-end">
          <div className="mb-auto snap-center">{item.name}</div>
          <div className="font-bold">
            {new Intl.NumberFormat("nl-NL", {
              style: "currency",
              currency: "EUR",
            }).format(item.price)}
          </div>
          <div className="">Qty: {item.qty}</div>
        </div>
      </li>
    </>
  );

  return expanded ? content : null;
}

export default OrderItem;

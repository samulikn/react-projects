import { ReactElement, useState } from "react";
import { OrderPropType } from "../context/OrderProvider";
import OrderItem from "./OrderItem";
import "bootstrap-icons/font/bootstrap-icons.css";

type PropsType = {
  order: OrderPropType;
};

function Order({ order }: PropsType): ReactElement {
  const [expanded, setExpanded] = useState<boolean>(false);

  let [date] = order.orderDate.split("\t")[0];
  let [day, month, year] = [date.slice(-2), date.slice(4, 6), date.slice(0, 4)];
  // let formatedDate = new Date(+year, +month - 1, +day).toDateString();
  const orderDate = new Intl.DateTimeFormat("en-EN", {
    dateStyle: "full",
    // timeStyle: "short",
  }).format(new Date(+year, +month - 1, +day));

  let totalSum = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(order.total);

  const content = order ? (
    <div className="mb-5 flex flex-col">
      <p className="mt-1.5 font-bold">{order.status}</p>
      <div className="flex gap-12">
        <p>{orderDate}</p>
        <p>{totalSum}</p>
      </div>
      <div className="flex gap-20">
        <p className="text-gray-500">Order num: {order.orderId}</p>
        {expanded ? (
          <i className="bi bi-dash" onClick={() => setExpanded(false)}></i>
        ) : (
          <i
            className="bi bi-plus-lg font-bold"
            onClick={() => setExpanded(true)}
          ></i>
        )}
      </div>
      <div className="flex gap-2 justify-start overflow-x-auto">
        {order.items.map((item) => (
          <OrderItem key={item.sku} item={item} expanded={expanded} />
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );

  return content;
}

export default Order;

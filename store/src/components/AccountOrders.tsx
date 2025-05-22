import { ReactElement, useEffect, useState } from "react";
import Order from "./Order";
import { OrderPropType } from "../context/OrderProvider";
import useOrders from "../hooks/useOrders";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AxiosError } from "axios";

const ORDERS_URL = "/orders/";

function AccountOrders() {
  const [message, setMessage] = useState<string>("");
  const [visibleOrders, setVisibleOrders] = useState<OrderPropType[]>([]);

  const { auth } = useAuth();
  const user = auth.email;
  const { orders, setOrders } = useOrders();
  const axiosPrivate = useAxiosPrivate();

  const ordersFrom = 0;
  const ordersTo = 2;

  useEffect(() => {
    setMessage("");
    const getOrders = async (): Promise<void> => {
      try {
        const response = await axiosPrivate.get<OrderPropType[]>(
          ORDERS_URL + encodeURIComponent(user)
        );
        setOrders(response?.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 406) {
            setMessage("No orders yet.");
          } else {
            console.error(err);
          }
        }
      }
    };
    getOrders();
  }, [user]);

  useEffect(() => {
    setVisibleOrders(orders.slice(ordersFrom, ordersTo));
  }, [orders, ordersTo]);

  let content: ReactElement | ReactElement[] = !message ? (
    <p className="m-4">Loading...</p>
  ) : (
    <p>{message}</p>
  );

  if (visibleOrders?.length) {
    content = visibleOrders.map((order) => {
      return <Order key={order.orderId} order={order} />;
    });
  }

  return (
    <div>
      <h3 className="mt-6 mb-2 ml-5 text-left text-xl  text-teal-800">
        Orders:
      </h3>
      <ul className="mx-5">{content}</ul>
    </div>
  );
  // }
}

export default AccountOrders;

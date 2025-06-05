import { ReactElement, useEffect, useState } from "react";
import Order from "./Order";
import { OrderPropType } from "../context/OrderProvider";
import useOrders from "../hooks/useOrders";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AxiosError } from "axios";

const ORDERS_URL = "/orders/";

function AccountOrders(): ReactElement | ReactElement[] {
  const [message, setMessage] = useState<string>("");

  const { auth } = useAuth();
  const user = auth.email;
  const { orders, setOrders } = useOrders();
  const axiosPrivate = useAxiosPrivate();

  let count: number = 2; // load 2 more orders

  useEffect(() => {
    setMessage("");
    const now: string = new Date().toISOString();

    const getOrders = async (): Promise<void> => {
      try {
        const response = await axiosPrivate.get<OrderPropType[]>(
          ORDERS_URL +
            encodeURIComponent(user) +
            "/" +
            encodeURIComponent(now) +
            "/" +
            encodeURIComponent(count)
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

  const handleLoadMore = async (): Promise<void> => {
    const orderDate: Date = orders[orders.length - 1].orderDate;
    try {
      const response = await axiosPrivate.get<OrderPropType[]>(
        ORDERS_URL +
          encodeURIComponent(user) +
          "/" +
          encodeURIComponent(orderDate.toString()) +
          "/" +
          encodeURIComponent(count)
      );
      setOrders(orders.concat(response?.data));
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 406) {
          setMessage("No more orders.");
        } else {
          console.error(err);
        }
      }
    }
  };

  let content: ReactElement | ReactElement[] = !message ? (
    <p className="m-4">Loading...</p>
  ) : (
    <p>{message}</p>
  );

  if (orders?.length) {
    content = orders.map((order) => {
      return <Order key={order.orderId} order={order} />;
    });
  }

  return (
    <section>
      <h3 className="mt-6 mb-2 ml-5 text-left text-xl  text-teal-800">
        Order History:
      </h3>
      <ul className="mx-5">{content}</ul>
      <button
        type="button"
        hidden={!orders.length}
        onClick={handleLoadMore}
        className="ml-14 px-4 py-1 border-2 border-solid rounded-xl bg-gray-300"
      >
        Load more...
      </button>
    </section>
  );
}

export default AccountOrders;

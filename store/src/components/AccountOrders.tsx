import { ReactElement, useEffect } from "react";
import Order from "./Order";
import { OrderPropType } from "../context/OrderProvider";
import useOrders from "../hooks/useOrders";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AxiosError } from "axios";

const ORDERS_URL = "/orders/";

function AccountOrders() {
  const { auth } = useAuth();
  const user = auth.email;
  const { orders, setOrders } = useOrders();
  const axiosPrivate = useAxiosPrivate();
  let noOrders = "";

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axiosPrivate.get<OrderPropType[]>(
          ORDERS_URL + encodeURIComponent(user)
        );
        setOrders(response?.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 406) {
            noOrders = "No orders yet.";
          } else {
            console.error(err);
          }
        }
      }
    };
    getOrders();
  }, [auth]);

  // useEffect(() => {
  //   const fetchData = async (): Promise<OrderPropType[]> => {
  //     const data = await fetch(
  //       "http://localhost:5000/orders/" + encodeURIComponent(user)
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .catch((err) => {
  //         if (err instanceof Error) console.log(err.message);
  //       });
  //     return data;
  //   };

  //   fetchData().then((orders) => {
  //     // console.log(orders)
  //     setOrders(orders);
  //   });
  // }, [user]);

  let content: ReactElement | ReactElement[] = (
    <p className="m-4">Loading...</p>
  );

  if (orders?.length) {
    content = orders.map((order) => {
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

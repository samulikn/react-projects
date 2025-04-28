import { ReactElement, useEffect } from "react";
import Order from "./Order";
import { OrderPropType } from "../context/OrderProvider";
import useOrders from "../hooks/useOrders";
import useAuth from "../hooks/useAuth";

function AccountOrders() {
  const { auth } = useAuth();
  const user = auth.email;
  const { orders, setOrders } = useOrders();

    useEffect(() => {
    const fetchData = async (): Promise<OrderPropType[]> => {
      const data = await fetch("http://localhost:5000/orders/" + encodeURIComponent(user))
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };

    fetchData().then((orders) => {
      console.log("auth user", user);
      console.log("User orders", orders)

      setOrders(orders)});
  }, [user]);

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

import { createContext, useState, ReactElement } from "react";
import { CartItemType } from "./CartProvider";
// import useAuth from "../hooks/useAuth";

export type OrderPropType = {
  email: string;
  orderDate: string;
  orderId: number;
  total: number;
  items: CartItemType[];
  status: string;
};

const initOrdersState: OrderPropType[] = [];

export type UseOrdersContextType = { orders: OrderPropType[];
  setOrders: (orders: OrderPropType[]) => void;
 };

const initOrdersContext: UseOrdersContextType = {
  orders: [],
  setOrders: () => {}
};

const OrdersContext = createContext<UseOrdersContextType>(initOrdersContext);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const OrdersProvider = ({ children }: ChildrenType) => {
  // const { auth } = useAuth();
  // const user = auth.email;

  const [orders, setOrders] = useState<OrderPropType[]>(initOrdersState);

  // useEffect(() => {
  //   const fetchData = async (): Promise<OrderPropType[]> => {
  //     const data = await fetch("http://localhost:5000/orders/" + encodeURIComponent(user))
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .catch((err) => {
  //         if (err instanceof Error) console.log(err.message);
  //       });
  //     return data;
  //   };

  //   fetchData().then((orders) => {
  //     console.log("auth user", user);
  //     console.log("User orders", orders)

  //     setOrders(orders)});
  // }, [user]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;

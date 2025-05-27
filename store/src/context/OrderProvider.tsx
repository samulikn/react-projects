import { createContext, useState, ReactElement } from "react";
import { CartItemType } from "./CartProvider";

export type OrderPropType = {
  email: string;
  orderDate: Date;
  orderId: number;
  total: number;
  items: CartItemType[];
  status: string;
};

const initOrdersState: OrderPropType[] = [];

export type UseOrdersContextType = {
  orders: OrderPropType[];
  setOrders: (orders: OrderPropType[]) => void;
};

const initOrdersContext: UseOrdersContextType = {
  orders: [],
  setOrders: () => {},
};

const OrdersContext = createContext<UseOrdersContextType>(initOrdersContext);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const OrdersProvider = ({ children }: ChildrenType) => {
  const [orders, setOrders] = useState<OrderPropType[]>(initOrdersState);

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;

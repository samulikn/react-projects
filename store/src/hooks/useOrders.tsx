import { useContext } from "react";
import { UseOrdersContextType } from "../context/OrderProvider";
import OrdersContext from "../context/OrderProvider";


const useOrders = (): UseOrdersContextType => {
    return useContext(OrdersContext)
}

export default useOrders;
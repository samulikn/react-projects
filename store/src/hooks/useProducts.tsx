import { useContext } from "react";
import { UseProductsContextType } from "../context/ProductsProvider";
import ProductsContext from "../context/ProductsProvider";


const useProducts = (): UseProductsContextType => {
    return useContext(ProductsContext)
}

export default useProducts;
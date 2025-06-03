import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  description: string;
  price: number;
};

const initProductsState: ProductType[] = [];

export type UseProductsContextType = { products: ProductType[] };

const initProductsContext: UseProductsContextType = { products: [] };

const ProductsContext =
  createContext<UseProductsContextType>(initProductsContext);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType) => {
  const [products, setProducts] = useState<ProductType[]>(initProductsState);

  useEffect(() => {
    const fetchData = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:5000/products")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };

    fetchData().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;

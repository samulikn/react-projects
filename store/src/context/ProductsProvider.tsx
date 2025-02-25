import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initProductsState: ProductType[] = [
  //     {
  //         "sku": "item0001",
  //         "name": "White bread",
  //         "price": 2.99
  //     },
  //     {
  //         "sku": "item0002",
  //         "name": "Whole wheat bread",
  //         "price": 2.89
  //     },
  //     {
  //         "sku": "item0003",
  //         "name": "Banana bread",
  //         "price": 3.05
  //     }
];

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

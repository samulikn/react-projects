import useLocalStorage, { LocalStoragePropTypes } from "./useLocalStorage";
import { CartItemType } from "../context/CartProvider";

const useStorageCart = ({
  key,
  initValue,
}: LocalStoragePropTypes): [CartItemType[], (value: CartItemType[]) => void] => {

  const [value, setValue] = useLocalStorage({ key, initValue });

  const storageCart = (value: CartItemType[]): void => {
    setValue(value);
  };

  return [value, storageCart];
}

export default useStorageCart;

import Nav from "./Nav";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const content = (
    <header className="h-1/7 bg-[#2c2e3d] text-white px-14 py-3 flex justify-between gap-8 items-center">
      <h1 className="text-xl">Bakehouse</h1>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );

  return content;
};

export default Header;

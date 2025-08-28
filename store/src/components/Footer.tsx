function Footer() {
  const year: number = new Date().getFullYear();

  const content = <p className="text-center">Shopping Cart &copy; {year}</p>;

  return (
    <footer className="h-1/7 mt-20 bg-[#2c2e3d] text-white px-8 py-2">
      {content}
    </footer>
  );
}

export default Footer;

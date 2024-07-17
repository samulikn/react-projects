function Footer() {
  const today = new Date();
  return (
    <footer className="Footer">
      <hr />
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
}

export default Footer;
